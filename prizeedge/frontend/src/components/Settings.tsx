import React, { useState } from 'react';
import { LiveClock } from './LiveClock';

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    soundEnabled: true,
    autoRefresh: true,
    showLiveClock: true,
    highConfidenceOnly: false,
    sportsUpdates: {
      nba: true,
      nfl: true,
      cbb: true,
      nhl: true,
    }
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateSportSetting = (sport: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      sportsUpdates: {
        ...prev.sportsUpdates,
        [sport]: value
      }
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          ⚙️ Settings
        </h1>
        <p className="text-gray-400 text-lg">
          Customize your PrizeEdge experience
        </p>
      </div>

      {/* Live Clock Section */}
      {settings.showLiveClock && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-yellow-400 mb-4">Central Time Zone</h2>
          <div className="flex justify-center">
            <LiveClock />
          </div>
        </div>
      )}

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notifications */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-400 mb-4">🔔 Notifications</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-gray-400 text-sm">Get alerts for high-confidence picks</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => updateSetting('notifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-medium">Sound Effects</p>
                <p className="text-gray-400 text-sm">Play sounds for notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) => updateSetting('soundEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-400 mb-4">🎨 Display</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-medium">Show Live Clock</p>
                <p className="text-gray-400 text-sm">Display real-time Central Time</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showLiveClock}
                  onChange={(e) => updateSetting('showLiveClock', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-medium">High Confidence Only</p>
                <p className="text-gray-400 text-sm">Show picks with 85%+ confidence</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.highConfidenceOnly}
                  onChange={(e) => updateSetting('highConfidenceOnly', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Sports Updates */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-400 mb-4">⚽ Sports Updates</h2>
          <div className="space-y-4">
            {Object.entries(settings.sportsUpdates).map(([sport, enabled]) => (
              <div key={sport} className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{sport.toUpperCase()}</p>
                  <p className="text-gray-400 text-sm">Enable {sport.toUpperCase()} updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => updateSportSetting(sport, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Data & Performance */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-400 mb-4">📊 Data & Performance</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-medium">Auto Refresh</p>
                <p className="text-gray-400 text-sm">Automatically update predictions</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoRefresh}
                  onChange={(e) => updateSetting('autoRefresh', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-yellow-400 mb-4">ℹ️ About</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-medium">App Version</p>
              <p className="text-gray-400 text-sm">Version 1.0.0 (Build 100)</p>
            </div>
            <span className="text-gray-400">📱</span>
          </div>
          
          <div className="pt-4 border-t border-gray-700">
            <h3 className="text-white font-medium mb-2">Privacy & Legal</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              This application is for entertainment and educational purposes only. 
              Sports analytics involve inherent uncertainty and risk. Please gamble responsibly 
              and within your means. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-400 mb-4">🚀 Support & Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-lg transition-colors">
            Contact Support
          </button>
          <button className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-4 rounded-lg transition-colors">
            Help Center
          </button>
        </div>
      </div>
    </div>
  );
};