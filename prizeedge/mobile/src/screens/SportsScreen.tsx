import React, { useEffect, useState } from 'react';
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

// Sport data with specific line types
const SPORTS_DATA = [
  {
    id: 'nba',
    name: 'NBA Basketball',
    icon: '🏀',
    displayName: 'Basketball',
    lines: [
      'Points',
      'Rebounds', 
      'Assists',
      'Rebounds + Assists',
      'Steals',
      'Blocks',
      '3-Pointers Made',
      'Field Goals Made',
      'Free Throws Made'
    ],
    color: '#FF6B35',
  },
  {
    id: 'nfl', 
    name: 'NFL Football',
    icon: '🏈',
    displayName: 'Football',
    lines: [
      'Passing Yards',
      'Passing TDs',
      'Rushing Yards', 
      'Rushing TDs',
      'Receiving Yards',
      'Receptions',
      'Carries',
      'Targets',
      'Field Goals Made'
    ],
    color: '#003366',
  },
  {
    id: 'cbb',
    name: 'College Basketball',
    icon: '🏀',
    displayName: 'College Basketball',
    lines: [
      'Points',
      'Rebounds',
      'Assists',
      'Rebounds + Assists', 
      '3-Pointers Made',
      'Steals',
      'Blocks',
      'Field Goals Made'
    ],
    color: '#8B4513',
  },
  {
    id: 'nhl',
    name: 'NHL Hockey',
    icon: '🏒',
    displayName: 'Hockey', 
    lines: [
      'Goals',
      'Assists',
      'Points',
      'Shots',
      'Power Play Points',
      'Faceoffs Won',
      'Time on Ice'
    ],
    color: '#006600',
  }
];

const SportsScreen: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const toggleSport = (sportId: string) => {
    setSelectedSport(selectedSport === sportId ? null : sportId);
  };

  const renderSportItem = ({ item }: { item: typeof SPORTS_DATA[0] }) => {
    const isSelected = selectedSport === item.id;
    
    return (
      <View style={styles.sportContainer}>
        <TouchableOpacity 
          style={[styles.sportHeader, { backgroundColor: item.color }]}
          onPress={() => toggleSport(item.id)}
        >
          <View style={styles.sportHeaderContent}>
            <Text style={styles.sportIcon}>{item.icon}</Text>
            <View style={styles.sportInfo}>
              <Text style={styles.sportName}>{item.displayName}</Text>
              <Text style={styles.sportSubtitle}>{item.lines.length} Line Types</Text>
            </View>
          </View>
          <Icon 
            name={isSelected ? 'chevron-up' : 'chevron-down'} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>

        {isSelected && (
          <View style={styles.linesContainer}>
            <Text style={styles.linesTitle}>Available Lines</Text>
            {item.lines.map((line, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.lineItem}
                onPress={() => Alert.alert(
                  `${item.displayName} - ${line}`, 
                  `This is a ${line.toLowerCase()} prop line for ${item.displayName}. Perfect for your analytics!`
                )}
              >
                <Text style={styles.lineText}>{line}</Text>
                <Icon name="chevron-forward" size={16} color={Colors.accent} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚽ Sports Lines</Text>
        <Text style={styles.headerSubtitle}>
          Professional analysis for every sport
        </Text>
      </View>

      {/* Sports List */}
      <FlatList
        data={SPORTS_DATA}
        renderItem={renderSportItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Info */}
      <View style={styles.bottomInfo}>
        <Text style={styles.bottomText}>
          💎 {SPORTS_DATA.reduce((total, sport) => total + sport.lines.length, 0)} Total Line Types
        </Text>
        <Text style={styles.bottomSubtext}>
          Updated every second with live data
        </Text>
      </View>
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
  listContainer: {
    padding: 20,
  },
  sportContainer: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.accent + '30',
  },
  sportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  sportHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sportIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  sportInfo: {
    flex: 1,
  },
  sportName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  sportSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  linesContainer: {
    backgroundColor: Colors.surface,
    padding: 20,
  },
  linesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.accent,
    marginBottom: 15,
  },
  lineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    marginBottom: 8,
  },
  lineText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  bottomInfo: {
    padding: 20,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.accent,
    marginBottom: 4,
  },
  bottomSubtext: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});

export default SportsScreen;