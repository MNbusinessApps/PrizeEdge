import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LiveClock } from './components/LiveClock';
import { TodayDashboard } from './components/TodayDashboard';
import { SportsLines } from './components/SportsLines';
import { Analytics } from './components/Analytics';
import { Watchlist } from './components/Watchlist';
import { Settings } from './components/Settings';
import { WebSocketProvider } from './context/WebSocketContext';

// Theme - Vegas Luxury Man Cave
const theme = {
  colors: {
    primary: '#0a0a0a',        // Deep black
    secondary: '#1a1a1a',      // Charcoal
    tertiary: '#2d2d2d',       // Dark gray
    surface: '#3a3a3a',        // Medium gray
    accent: '#d4af37',         // Gold
    accentSecondary: '#00ccff', // Electric blue
    text: '#ffffff',           // White
    textSecondary: '#cccccc',   // Light gray
    success: '#00ff88',        // Green
    warning: '#ffaa00',        // Orange
    danger: '#ff4444',         // Red
    info: '#00ccff',           // Blue
  },
  gradients: {
    gold: 'linear-gradient(135deg, #d4af37 0%, #ffed4e 100%)',
    darkGold: 'linear-gradient(135deg, #b8941f 0%, #d4af37 100%)',
    neonBlue: 'linear-gradient(135deg, #00ccff 0%, #0088ff 100%)',
  }
};

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          {/* Header */}
          <header className="bg-gray-900 border-b border-yellow-500/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <Link to="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">🎯</span>
                    </div>
                    <span className="text-xl font-bold text-yellow-400">PrizeEdge</span>
                  </Link>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-8">
                  <Link 
                    to="/" 
                    className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Today's Picks
                  </Link>
                  <Link 
                    to="/sports" 
                    className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sports Lines
                  </Link>
                  <Link 
                    to="/watchlist" 
                    className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    My Picks
                  </Link>
                  <Link 
                    to="/analytics" 
                    className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Analytics
                  </Link>
                  <Link 
                    to="/settings" 
                    className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Settings
                  </Link>
                </nav>

                {/* Live Clock */}
                <LiveClock />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<TodayDashboard />} />
              <Route path="/sports" element={<SportsLines />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 border-t border-yellow-500/20 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  PrizeEdge Professional Sports Analytics Platform
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Powered by advanced data analytics • For entertainment purposes only
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </WebSocketProvider>
  );
}

export default App;