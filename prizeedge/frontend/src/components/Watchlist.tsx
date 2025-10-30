import React, { useState } from 'react';

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

export const Watchlist: React.FC = () => {
  const [watchlist, setWatchlist] = useState<WatchItem[]>(MOCK_WATCHLIST);

  const removeFromWatchlist = (itemId: string) => {
    setWatchlist(watchlist.filter(item => item.id !== itemId));
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
    if (confidence >= 0.9) return 'text-green-400';
    if (confidence >= 0.8) return 'text-blue-400';
    if (confidence >= 0.7) return 'text-yellow-400';
    return 'text-red-400';
  };

  const totalEdge = watchlist.reduce((sum, item) => sum + item.edge, 0);
  const avgConfidence = watchlist.length > 0 
    ? Math.round((watchlist.reduce((sum, item) => sum + item.confidence, 0) / watchlist.length) * 100) 
    : 0;
  const livePicks = watchlist.filter(item => item.isLive).length;

  if (watchlist.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-2xl font-bold text-gray-400 mb-2">No Picks in Watchlist</h2>
        <p className="text-gray-500">
          Start tracking your favorite picks to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          ⭐ My Picks
        </h1>
        <p className="text-gray-400 text-lg">
          Your tracked high-value opportunities
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-yellow-400">{watchlist.length}</div>
          <div className="text-sm text-gray-400">Total Picks</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-green-400">{livePicks}</div>
          <div className="text-sm text-gray-400">Live Now</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-purple-400">{totalEdge}%</div>
          <div className="text-sm text-gray-400">Total Edge</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-blue-400">{avgConfidence}%</div>
          <div className="text-sm text-gray-400">Avg Confidence</div>
        </div>
      </div>

      {/* Watchlist Items */}
      <div className="space-y-4">
        {watchlist.map((item) => (
          <div key={item.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <span className="mr-2">{getSportIcon(item.sport)}</span>
                  {item.playerName}
                </h3>
                <p className="text-sm text-yellow-400">{item.team} • {item.sport.toUpperCase()}</p>
              </div>
              <button 
                onClick={() => removeFromWatchlist(item.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-400">{item.statType}</p>
                <p className="text-xl font-bold text-white">{item.lineValue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Prediction</p>
                <p className={`text-xl font-bold ${item.prediction === 'OVER' ? 'text-green-400' : 'text-red-400'}`}>
                  {item.prediction}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Edge</p>
                <p className="text-xl font-bold text-yellow-400">+{item.edge}%</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getConfidenceColor(item.confidence)} bg-gray-700`}>
                {Math.round(item.confidence * 100)}% Confidence
              </div>
              {item.isLive && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400">LIVE</span>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-400 mt-3">{item.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
};