import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../App';
import LiveClock from '../components/LiveClock';

const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    soundEnabled: true,
    autoRefresh: true,
    darkMode: true,
    showLiveClock: true,
    highConfidenceOnly: false,
    sportsUpdates: {
      nba: true,
      nfl: true,
      cbb: true,
      nhl: true,
    }
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const toggleSportUpdate = (sport: string) => {
    setSettings(prev => ({
      ...prev,
      sportsUpdates: {
        ...prev.sportsUpdates,
        [sport]: !prev.sportsUpdates[sport as keyof typeof prev.sportsUpdates]
      }
    }));
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle: string,
    value: boolean,
    onToggle: () => void
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Icon name={icon} size={24} color={Colors.accent} style={styles.settingIcon} />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: Colors.secondary, true: Colors.accent }}
        thumbColor={value ? Colors.text : Colors.textSecondary}
      />
    </View>
  );

  const renderActionItem = (
    icon: string,
    title: string,
    subtitle: string,
    onPress: () => void,
    color: string = Colors.text
  ) => (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
      <View style={styles.actionInfo}>
        <Icon name={icon} size={24} color={color} style={styles.actionIcon} />
        <View style={styles.actionText}>
          <Text style={[styles.actionTitle, { color }]}>{title}</Text>
          <Text style={styles.actionSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚙️ Settings</Text>
        <Text style={styles.headerSubtitle}>
          Customize your PrizeEdge experience
        </Text>
      </View>

      {/* Live Clock Section */}
      {settings.showLiveClock && (
        <View style={styles.clockSection}>
          <Text style={styles.sectionTitle}>Central Time</Text>
          <View style={styles.clockContainer}>
            <LiveClock size="large" />
          </View>
        </View>
      )}

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Notifications</Text>
        {renderSettingItem(
          'notifications',
          'Push Notifications',
          'Get alerts for high-confidence picks',
          settings.notifications,
          () => toggleSetting('notifications')
        )}
        {renderSettingItem(
          'volume-high',
          'Sound Effects',
          'Play sounds for notifications',
          settings.soundEnabled,
          () => toggleSetting('soundEnabled')
        )}
      </View>

      {/* Display */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Display</Text>
        {renderSettingItem(
          'moon',
          'Dark Mode',
          'Use dark theme (man cave style)',
          settings.darkMode,
          () => toggleSetting('darkMode')
        )}
        {renderSettingItem(
          'time',
          'Show Live Clock',
          'Display real-time Central Time',
          settings.showLiveClock,
          () => toggleSetting('showLiveClock')
        )}
      </View>

      {/* Data & Updates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Data & Updates</Text>
        {renderSettingItem(
          'refresh',
          'Auto Refresh',
          'Automatically update predictions',
          settings.autoRefresh,
          () => toggleSetting('autoRefresh')
        )}
        {renderSettingItem(
          'star',
          'High Confidence Only',
          'Show picks with 85%+ confidence',
          settings.highConfidenceOnly,
          () => toggleSetting('highConfidenceOnly')
        )}
      </View>

      {/* Sports Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚽ Sports Updates</Text>
        {Object.entries(settings.sportsUpdates).map(([sport, enabled]) => (
          <View key={sport} style={styles.sportSetting}>
            <Text style={styles.sportText}>
              {sport.toUpperCase()} Updates
            </Text>
            <Switch
              value={enabled}
              onValueChange={() => toggleSportUpdate(sport)}
              trackColor={{ false: Colors.secondary, true: Colors.accent }}
              thumbColor={enabled ? Colors.text : Colors.textSecondary}
            />
          </View>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚀 Actions</Text>
        {renderActionItem(
          'sync',
          'Refresh Data Now',
          'Manually update all predictions',
          () => {
            Alert.alert(
              'Data Refresh',
              'Refreshing predictions from all sources...',
              [{ text: 'OK' }]
            );
          },
          Colors.info
        )}
        {renderActionItem(
          'analytics',
          'View Analytics',
          'See your pick performance stats',
          () => {
            Alert.alert(
              'Analytics',
              'Performance analytics coming soon! Track your win rate, average confidence, and ROI.',
              [{ text: 'OK' }]
            );
          }
        )}
        {renderActionItem(
          'help-circle',
          'Help & Support',
          'Get help with the app',
          () => {
            Alert.alert(
              'Help & Support',
              'Contact us at support@prizeedge.com or visit our help center.',
              [
                { text: 'Email Support', onPress: () => Linking.openURL('mailto:support@prizeedge.com') },
                { text: 'Cancel', style: 'cancel' }
              ]
            );
          }
        )}
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ About</Text>
        {renderActionItem(
          'information-circle',
          'App Version',
          'Version 1.0.0 (Build 100)',
          () => {}
        )}
        {renderActionItem(
          'shield-checkmark',
          'Privacy Policy',
          'View our privacy policy',
          () => {
            Alert.alert(
              'Privacy Policy',
              'This app is for entertainment and educational purposes only. We do not guarantee winning outcomes in gambling.',
              [{ text: 'OK' }]
            );
          }
        )}
        {renderActionItem(
          'document-text',
          'Terms of Service',
          'Read our terms and conditions',
          () => {
            Alert.alert(
              'Terms of Service',
              'By using this app, you acknowledge that sports betting involves risk. This app provides analytics and does not guarantee outcomes.',
              [{ text: 'OK' }]
            );
          }
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          PrizeEdge Professional Sports Analytics
        </Text>
        <Text style={styles.footerSubtext}>
          Powered by advanced AI algorithms
        </Text>
        <Text style={styles.disclaimer}>
          Disclaimer: This app is for entertainment purposes only. 
          Sports betting involves risk. Please gamble responsibly.
        </Text>
      </View>
    </ScrollView>
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
  clockSection: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    alignItems: 'center',
  },
  clockContainer: {
    marginTop: 10,
  },
  section: {
    margin: 20,
    marginBottom: 0,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.accent,
    padding: 20,
    paddingBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.secondary,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  sportSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.secondary,
  },
  sportText: {
    fontSize: 16,
    color: Colors.text,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.secondary,
  },
  actionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    marginRight: 15,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.accent,
    textAlign: 'center',
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  disclaimer: {
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
    fontStyle: 'italic',
  },
});

export default SettingsScreen;