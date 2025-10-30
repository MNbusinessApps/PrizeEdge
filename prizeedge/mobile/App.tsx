import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import TodayScreen from './src/screens/TodayScreen';
import SportsScreen from './src/screens/SportsScreen';
import WatchlistScreen from './src/screens/WatchlistScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Theme - Man Cave / Vegas Luxury Theme
const Colors = {
  primary: '#1a1a1a',     // Deep black
  secondary: '#2c2c2c',   // Charcoal
  accent: '#d4af37',      // Gold accent
  surface: '#383838',     // Dark gray
  text: '#ffffff',        // White text
  textSecondary: '#cccccc', // Light gray
  success: '#28a745',     // Green for wins
  warning: '#ffc107',     // Yellow for attention
  danger: '#dc3545',      // Red for losses
  info: '#17a2b8',        // Blue for info
};

const Drawer = createDrawerNavigator();

// Custom Drawer Component with Man Cave Theme
function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: Colors.secondary }}>
      <SafeAreaView>
        {/* Header */}
        <View style={styles.drawerHeader}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🎯 PrizeEdge</Text>
          </View>
          <Text style={styles.tagline}>Professional Sports Analytics</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => props.navigation.navigate('Today')}
          >
            <Icon name="today" size={24} color={Colors.accent} />
            <Text style={styles.menuText}>Today's Picks</Text>
            <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => props.navigation.navigate('Sports')}
          >
            <Icon name="football" size={24} color={Colors.accent} />
            <Text style={styles.menuText}>Sports</Text>
            <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => props.navigation.navigate('Watchlist')}
          >
            <Icon name="star" size={24} color={Colors.accent} />
            <Text style={styles.menuText}>My Picks</Text>
            <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => props.navigation.navigate('Settings')}
          >
            <Icon name="settings" size={24} color={Colors.accent} />
            <Text style={styles.menuText}>Settings</Text>
            <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.drawerFooter}>
          <Text style={styles.footerText}>Powered by AI Analytics</Text>
          <Text style={styles.versionText}>v1.0.0</Text>
        </View>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.text,
          headerTitleStyle: {
            color: Colors.accent,
            fontWeight: 'bold',
          },
          drawerStyle: {
            backgroundColor: Colors.secondary,
          },
        }}
      >
        <Drawer.Screen 
          name="Today" 
          component={TodayScreen}
          options={{
            headerTitle: "Today's Analytics",
          }}
        />
        <Drawer.Screen 
          name="Sports" 
          component={SportsScreen}
          options={{
            headerTitle: "Sports Lines",
          }}
        />
        <Drawer.Screen 
          name="Watchlist" 
          component={WatchlistScreen}
          options={{
            headerTitle: "My Picks",
          }}
        />
        <Drawer.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            headerTitle: "Settings",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  tagline: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  drawerFooter: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  versionText: {
    fontSize: 10,
    color: Colors.accent,
    fontWeight: 'bold',
  },
});