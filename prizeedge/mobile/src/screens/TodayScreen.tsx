import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LiveClock from '../components/LiveClock';
import { Colors } from '../../App';

// Types
interface Prediction {
  prop_id: string;
  player_name: string;
  team: string;
  sport: string;
  stat_type: string;
  line_value: number;
  prediction: 'OVER' | 'UNDER';
  confidence: number;
  reasoning: string;
  market_value: number;
  edge_percentage: number;
  posted_at: string;
}

// Theme
const appColors = {
  primary: '#1a1a1a',
  secondary: '#2c2c2c',
  accent: '#d4af37',
  surface: '#383838',
  text: '#ffffff',
  textSecondary: '#cccccc',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  info: '#17a2b8',
};

const TodayScreen: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch predictions from backend
  const fetchPredictions = async () => {
    try {
      const response = await fetch('http://localhost:8000/v1/predictions/today');
      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      // Use mock data for demo
      setPredictions(MOCK_PREDICTIONS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
    
    // Set up periodic refresh every 5 seconds
    const interval = setInterval(() => {
      fetchPredictions();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const openPredictionDetail = (prediction: Prediction) => {
    setSelectedPrediction(prediction);
    setModalVisible(true);
  };

  const getSportIcon = (sport: string) => {
    switch (sport.toLowerCase()) {
      case 'nba': return '🏀';
      case 'nfl': return '🏈';
      case 'cbb': return '🏀';
      case 'nhl': return '🏒';
      default: return '🏆';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return appColors.success;
    if (confidence >= 0.8) return appColors.info;
    if (confidence >= 0.7) return appColors.warning;
    return appColors.danger;
  };

  const renderPredictionCard = ({ item }: { item: Prediction }) => (
    <TouchableOpacity 
      style={styles.predictionCard}
      onPress={() => openPredictionDetail(item)}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{getSportIcon(item.sport)} {item.player_name}</Text>
          <Text style={styles.teamName}>{item.team}</Text>
        </View>
        <View style={styles.confidenceContainer}>
          <View style={[styles.confidenceBadge, { backgroundColor: getConfidenceColor(item.confidence) }]}>
            <Text style={styles.confidenceText}>{Math.round(item.confidence * 100)}%</Text>
          </View>
        </View>
      </View>

      {/* Line Info */}
      <View style={styles.lineInfo}>
        <View style={styles.statContainer}>
          <Text style={styles.statType}>{item.stat_type}</Text>
          <Text style={styles.lineValue}>{item.line_value}</Text>
        </View>
        <View style={styles.predictionContainer}>
          <Text style={[styles.prediction, { color: item.prediction === 'OVER' ? appColors.success : appColors.danger }]}>
            {item.prediction}
          </Text>
          <Text style={styles.edge}>+{Math.round(item.edge_percentage * 100)}% Edge</Text>
        </View>
      </View>

      {/* Reasoning Preview */}
      <Text style={styles.reasoningPreview}>
        {item.reasoning.substring(0, 120)}...
      </Text>

      {/* Action Button */}
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => openPredictionDetail(item)}
      >
        <Text style={styles.actionButtonText}>View Full Analysis</Text>
        <Icon name="chevron-forward" size={16} color={appColors.accent} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏆 Today's Analytics</Text>
        <LiveClock />
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{predictions.length}</Text>
          <Text style={styles.statLabel}>Live Picks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {predictions.filter(p => p.confidence >= 0.85).length}
          </Text>
          <Text style={styles.statLabel}>High Analysis Score</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {predictions.length > 0 ? Math.round((predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length) * 100) : 0}%
          </Text>
          <Text style={styles.statLabel}>Avg Analysis Score</Text>
        </View>
      </View>

      {/* Predictions List */}
      <FlatList
        data={predictions}
        renderItem={renderPredictionCard}
        keyExtractor={(item) => item.prop_id}
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={fetchPredictions}
            tintColor={appColors.accent}
          />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Prediction Detail Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedPrediction && (
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color={appColors.text} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Analysis Details</Text>
            </View>

            {/* Modal Content */}
            <ScrollView style={styles.modalContent}>
              {/* Player Info */}
              <View style={styles.modalPlayerInfo}>
                <Text style={styles.modalPlayerName}>
                  {getSportIcon(selectedPrediction.sport)} {selectedPrediction.player_name}
                </Text>
                <Text style={styles.modalTeam}>{selectedPrediction.team}</Text>
                <Text style={styles.modalSport}>{selectedPrediction.sport.toUpperCase()}</Text>
              </View>

              {/* Prediction Details */}
              <View style={styles.modalPrediction}>
                <View style={styles.modalLineInfo}>
                  <Text style={styles.modalStatType}>{selectedPrediction.stat_type}</Text>
                  <Text style={styles.modalLineValue}>{selectedPrediction.line_value}</Text>
                </View>
                <View style={styles.modalPredictionResult}>
                  <Text style={[
                    styles.modalPredictionText, 
                    { color: selectedPrediction.prediction === 'OVER' ? appColors.success : appColors.danger }
                  ]}>
                    {selectedPrediction.prediction}
                  </Text>
                  <Text style={styles.modalConfidence}>
                    Confidence: {Math.round(selectedPrediction.confidence * 100)}%
                  </Text>
                </View>
              </View>

              {/* Reasoning */}
              <View style={styles.reasoningSection}>
                <Text style={styles.reasoningTitle}>🤖 AI Reasoning</Text>
                <Text style={styles.reasoningText}>{selectedPrediction.reasoning}</Text>
              </View>

              {/* Edge Analysis */}
              <View style={styles.edgeSection}>
                <Text style={styles.edgeTitle}>💎 Market Edge</Text>
                <Text style={styles.edgeValue}>+{Math.round(selectedPrediction.edge_percentage * 100)}%</Text>
                <Text style={styles.edgeDescription}>
                  This pick has a significant edge over the current market
                </Text>
              </View>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
};

// Mock data for demo
const MOCK_PREDICTIONS: Prediction[] = [
  {
    prop_id: "pp-001",
    player_name: "LeBron James",
    team: "LAL",
    sport: "nba",
    stat_type: "Points",
    line_value: 24.5,
    prediction: "OVER",
    confidence: 0.89,
    reasoning: "James averages 25.2 PPG at home vs Lakers. Lakers offense runs through James in home games, +2.3% usage rate vs road. Line seems low for current season trends.",
    market_value: -110,
    edge_percentage: 0.23,
    posted_at: "2025-10-30T13:20:00Z"
  },
  {
    prop_id: "pp-002",
    player_name: "Jusuf Nurkic",
    team: "PHX",
    sport: "nba",
    stat_type: "Rebounds + Assists",
    line_value: 8.5,
    prediction: "OVER",
    confidence: 0.91,
    reasoning: "Nurkic has hit this line in 8 of last 10 games vs weak interior defenses. Suns lack secondary rebounding options, forcing Nurkic into more opportunities.",
    market_value: -105,
    edge_percentage: 0.27,
    posted_at: "2025-10-30T13:20:00Z"
  },
  {
    prop_id: "pp-003",
    player_name: "Josh Allen",
    team: "BUF",
    sport: "nfl",
    stat_type: "Passing Yards",
    line_value: 285.5,
    prediction: "OVER",
    confidence: 0.87,
    reasoning: "Allen averages 298 pass yards at home vs teams ranked 25+ in pass defense. Jets defense allows 7.8 yards per attempt, 32nd in league.",
    market_value: -110,
    edge_percentage: 0.18,
    posted_at: "2025-10-30T13:20:00Z"
  },
  {
    prop_id: "pp-004",
    player_name: "Derrick Henry",
    team: "BAL",
    sport: "nfl",
    stat_type: "Rushing Yards",
    line_value: 92.5,
    prediction: "OVER",
    confidence: 0.85,
    reasoning: "Henry rushed for 102+ yards in 3 of last 4 vs Browns. Browns defense gives up 4.7 YPC to RBs, Henry +15% more carries vs Browns historically.",
    market_value: -115,
    edge_percentage: 0.19,
    posted_at: "2025-10-30T13:20:00Z"
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.primary,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: appColors.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: appColors.accent,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: appColors.surface,
    margin: 20,
    borderRadius: 12,
    padding: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: appColors.accent,
  },
  statLabel: {
    fontSize: 12,
    color: appColors.textSecondary,
    marginTop: 4,
  },
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  predictionCard: {
    backgroundColor: appColors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: appColors.accent + '20',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColors.text,
    marginBottom: 4,
  },
  teamName: {
    fontSize: 14,
    color: appColors.accent,
    fontWeight: '600',
  },
  confidenceContainer: {
    alignItems: 'center',
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 45,
    alignItems: 'center',
  },
  confidenceText: {
    color: appColors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  lineInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statContainer: {
    alignItems: 'flex-start',
  },
  statType: {
    fontSize: 14,
    color: appColors.textSecondary,
    marginBottom: 4,
  },
  lineValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: appColors.text,
  },
  predictionContainer: {
    alignItems: 'flex-end',
  },
  prediction: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  edge: {
    fontSize: 12,
    color: appColors.accent,
    fontWeight: '600',
  },
  reasoningPreview: {
    fontSize: 14,
    color: appColors.textSecondary,
    lineHeight: 20,
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.accent,
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    color: appColors.primary,
    fontWeight: 'bold',
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: appColors.primary,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: appColors.secondary,
  },
  closeButton: {
    padding: 8,
    marginRight: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: appColors.accent,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalPlayerInfo: {
    marginBottom: 30,
  },
  modalPlayerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: appColors.text,
    marginBottom: 8,
  },
  modalTeam: {
    fontSize: 18,
    color: appColors.accent,
    marginBottom: 4,
  },
  modalSport: {
    fontSize: 14,
    color: appColors.textSecondary,
    fontWeight: '600',
  },
  modalPrediction: {
    backgroundColor: appColors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  modalLineInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalStatType: {
    fontSize: 16,
    color: appColors.textSecondary,
  },
  modalLineValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: appColors.text,
  },
  modalPredictionResult: {
    alignItems: 'center',
  },
  modalPredictionText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalConfidence: {
    fontSize: 16,
    color: appColors.accent,
    fontWeight: '600',
  },
  reasoningSection: {
    backgroundColor: appColors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  reasoningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: appColors.text,
    marginBottom: 12,
  },
  reasoningText: {
    fontSize: 14,
    color: appColors.textSecondary,
    lineHeight: 22,
  },
  edgeSection: {
    backgroundColor: appColors.secondary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  edgeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: appColors.text,
    marginBottom: 8,
  },
  edgeValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: appColors.success,
    marginBottom: 8,
  },
  edgeDescription: {
    fontSize: 14,
    color: appColors.textSecondary,
    textAlign: 'center',
  },
});

export default TodayScreen;