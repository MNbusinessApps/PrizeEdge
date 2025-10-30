import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../App';

interface WatchItem {
  id: string;
  playerName: string;
  team: string;
  sport: string;
  statType: string;
  lineValue: number;
  prediction: 'OVER' | 'UNDER';
  confidence: number;
  edge: number;
  isLive: boolean;
  reason: string;
}

// Mock watchlist data
const MOCK_WATCHLIST: WatchItem[] = [
  {
    id: '1',
    playerName: 'LeBron James',
    team: 'LAL',
    sport: 'nba',
    statType: 'Points',
    lineValue: 24.5,
    prediction: 'OVER',
    confidence: 0.89,
    edge: 23,
    isLive: true,
    reason: 'Home court advantage + usage rate increase'
  },
  {
    id: '2',
    playerName: 'Josh Allen',
    team: 'BUF', 
    sport: 'nfl',
    statType: 'Passing Yards',
    lineValue: 285.5,
    prediction: 'OVER',
    confidence: 0.87,
    edge: 18,
    isLive: true,
    reason: 'Jets defense allows 7.8 YPA'
  },
  {
    id: '3',
    playerName: 'Cooper Flagg',
    team: 'Duke',
    sport: 'cbb',
    statType: 'Points',
    lineValue: 18.5,
    prediction: 'OVER',
    confidence: 0.92,
    edge: 25,
    isLive: false,
    reason: '21.3 PPG vs ACC mid-tier defenses'
  }
];

const WatchlistScreen: React.FC = () => {
  const [watchlist, setWatchlist] = useState<WatchItem[]>(MOCK_WATCHLIST);

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
    if (confidence >= 0.9) return Colors.success;
    if (confidence >= 0.8) return Colors.info;
    if (confidence >= 0.7) return Colors.warning;
    return Colors.danger;
  };

  const removeFromWatchlist = (itemId: string) => {
    Alert.alert(
      'Remove from Watchlist',
      'Are you sure you want to remove this pick from your watchlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setWatchlist(watchlist.filter(item => item.id !== itemId));
          }
        }
      ]
    );
  };

  const renderWatchItem = ({ item }: { item: WatchItem }) => (
    <View style={styles.watchItem}>
      {/* Header */}
      <View style={styles.itemHeader}>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>
            {getSportIcon(item.sport)} {item.playerName}
          </Text>
          <Text style={styles.teamInfo}>{item.team} • {item.sport.toUpperCase()}</Text>
        </View>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => removeFromWatchlist(item.id)}
        >
          <Icon name="trash-outline" size={20} color={Colors.danger} />
        </TouchableOpacity>
      </View>

      {/* Line Info */}
      <View style={styles.lineInfo}>
        <View style={styles.statContainer}>
          <Text style={styles.statType}>{item.statType}</Text>
          <Text style={styles.lineValue}>{item.lineValue}</Text>
        </View>
        <View style={styles.predictionContainer}>
          <Text style={[
            styles.prediction, 
            { color: item.prediction === 'OVER' ? Colors.success : Colors.danger }
          ]}>
            {item.prediction}
          </Text>
          <Text style={styles.edge}>+{item.edge}% Edge</Text>
        </View>
      </View>

      {/* Confidence & Status */}
      <View style={styles.statusContainer}>
        <View style={[styles.confidenceBadge, { backgroundColor: getConfidenceColor(item.confidence) }]}>
          <Text style={styles.confidenceText}>{Math.round(item.confidence * 100)}% Confidence</Text>
        </View>
        {item.isLive && (
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        )}
      </View>

      {/* Reasoning */}
      <Text style={styles.reasonText}>{item.reason}</Text>

      {/* Action Button */}
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => {
          Alert.alert(
            `${item.playerName} Pick`,
            `This ${item.statType.toLowerCase()} prop has ${Math.round(item.confidence * 100)}% confidence based on ${item.reason.toLowerCase()}.`
          );
        }}
      >
        <Text style={styles.actionButtonText}>View Details</Text>
        <Icon name="chevron-forward" size={16} color={Colors.accent} />
      </TouchableOpacity>
    </View>
  );

  const totalEdge = watchlist.reduce((sum, item) => sum + item.edge, 0);
  const avgConfidence = watchlist.length > 0 
    ? Math.round((watchlist.reduce((sum, item) => sum + item.confidence, 0) / watchlist.length) * 100) 
    : 0;
  const livePicks = watchlist.filter(item => item.isLive).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⭐ My Picks</Text>
        <Text style={styles.headerSubtitle}>
          Your tracked high-value opportunities
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{watchlist.length}</Text>
          <Text style={styles.statLabel}>Total Picks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{livePicks}</Text>
          <Text style={styles.statLabel}>Live Now</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalEdge}%</Text>
          <Text style={styles.statLabel}>Total Edge</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{avgConfidence}%</Text>
          <Text style={styles.statLabel}>Avg Confidence</Text>
        </View>
      </View>

      {/* Watchlist */}
      {watchlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🎯</Text>
          <Text style={styles.emptyTitle}>No Picks Yet</Text>
          <Text style={styles.emptySubtitle}>
            Start tracking your favorite picks to see them here
          </Text>
        </View>
      ) : (
        <FlatList
          data={watchlist}
          renderItem={renderWatchItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Bottom CTA */}
      {watchlist.length > 0 && (
        <View style={styles.bottomInfo}>
          <Text style={styles.bottomText}>
            💎 Your picks update in real-time
          </Text>
          <Text style={styles.bottomSubtext}>
            Swipe left on any pick to remove it
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: Colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent + '20',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.accent,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    margin: 20,
    borderRadius: 12,
    padding: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.accent,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  watchItem: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.accent + '20',
  },
  itemHeader: {
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
    color: Colors.text,
    marginBottom: 4,
  },
  teamInfo: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.secondary,
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
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  lineValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  predictionContainer: {
    alignItems: 'flex-end',
  },
  prediction: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  edge: {
    fontSize: 12,
    color: Colors.accent,
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  confidenceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  confidenceText: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.danger,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.text,
    marginRight: 6,
  },
  liveText: {
    color: Colors.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
  reasonText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    marginRight: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomInfo: {
    padding: 20,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.accent,
    marginBottom: 4,
  },
  bottomSubtext: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});

export default WatchlistScreen;