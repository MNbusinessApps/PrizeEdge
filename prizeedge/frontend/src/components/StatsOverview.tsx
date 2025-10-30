import React from 'react';

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

interface StatsOverviewProps {
  predictions: Prediction[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ predictions }) => {
  const totalPredictions = predictions.length;
  const highConfidenceCount = predictions.filter(p => p.confidence >= 0.85).length;
  const avgConfidence = totalPredictions > 0 
    ? (predictions.reduce((sum, p) => sum + p.confidence, 0) / totalPredictions) 
    : 0;
  const totalEdge = predictions.reduce((sum, p) => sum + p.edge_percentage, 0);
  const avgEdge = totalPredictions > 0 ? totalEdge / totalPredictions : 0;

  const stats = [
    {
      label: 'Total Picks',
      value: totalPredictions,
      icon: '🎯',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    },
    {
      label: 'High Confidence',
      value: highConfidenceCount,
      icon: '🔥',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      label: 'Avg Confidence',
      value: `${Math.round(avgConfidence * 100)}%`,
      icon: '⚡',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      label: 'Market Edge',
      value: `+${Math.round(avgEdge * 100)}%`,
      icon: '💎',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className={`${stat.bgColor} border border-gray-700 rounded-lg p-6 text-center hover:border-gray-600 transition-colors`}
        >
          <div className="text-3xl mb-2">{stat.icon}</div>
          <div className={`text-2xl font-bold ${stat.color} mb-1`}>
            {stat.value}
          </div>
          <div className="text-sm text-gray-400">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};