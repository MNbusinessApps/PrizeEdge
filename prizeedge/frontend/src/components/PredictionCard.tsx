import React, { useState } from 'react';

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

interface PredictionCardProps {
  prediction: Prediction;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  const [expanded, setExpanded] = useState(false);

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

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.9) return 'Very High';
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.7) return 'Medium';
    return 'Low';
  };

  return (
    <div className="bg-gray-800 border border-yellow-500/20 rounded-lg p-6 hover:border-yellow-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white flex items-center">
            <span className="mr-2">{getSportIcon(prediction.sport)}</span>
            {prediction.player_name}
          </h3>
          <p className="text-sm text-yellow-400 font-semibold">{prediction.team}</p>
          <p className="text-xs text-gray-400 uppercase tracking-wide">{prediction.sport}</p>
        </div>
        <div className="text-right">
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getConfidenceColor(prediction.confidence)} bg-gray-700`}>
            {Math.round(prediction.confidence * 100)}%
          </div>
          <p className="text-xs text-gray-400 mt-1">{getConfidenceLabel(prediction.confidence)}</p>
        </div>
      </div>

      {/* Line Info */}
      <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">{prediction.stat_type}</p>
            <p className="text-2xl font-bold text-white">{prediction.line_value}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Analysis</p>
            <p className={`text-xl font-bold ${prediction.prediction === 'OVER' ? 'text-green-400' : 'text-red-400'}`}>
              {prediction.prediction}
            </p>
          </div>
        </div>
      </div>

      {/* Edge Indicator */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">Market Edge</span>
        <span className="text-sm font-bold text-yellow-400">+{Math.round(prediction.edge_percentage * 100)}%</span>
      </div>

      {/* Reasoning Preview */}
      <div className="mb-4">
        <p className="text-sm text-gray-300 leading-relaxed">
          {expanded 
            ? prediction.reasoning 
            : `${prediction.reasoning.substring(0, 120)}...`
          }
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-yellow-400 text-sm mt-2 hover:text-yellow-300 transition-colors"
        >
          {expanded ? 'Show Less' : 'Read Full Analysis'}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-2 px-4 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200">
          Add to Watchlist
        </button>
        <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
          <span>📊</span>
        </button>
      </div>

      {/* Live Indicator */}
      <div className="mt-3 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">Live Analysis</span>
        </div>
      </div>
    </div>
  );
};