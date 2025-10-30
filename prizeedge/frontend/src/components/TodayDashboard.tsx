import React, { useEffect, useState } from 'react';
import { PredictionCard } from './PredictionCard';
import { StatsOverview } from './StatsOverview';
import { FilterPanel } from './FilterPanel';

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

const TodayDashboard: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sport: 'all',
    confidence: 'all',
    minEdge: 0
  });

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
    
    // Set up periodic refresh every 10 seconds
    const interval = setInterval(() => {
      fetchPredictions();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Filter predictions based on current filters
  const filteredPredictions = predictions.filter(pred => {
    if (filters.sport !== 'all' && pred.sport !== filters.sport) return false;
    if (filters.confidence === 'high' && pred.confidence < 0.85) return false;
    if (filters.confidence === 'medium' && (pred.confidence < 0.75 || pred.confidence >= 0.85)) return false;
    if (pred.edge_percentage < filters.minEdge) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          🏆 Elite Sports Analytics
        </h1>
        <p className="text-gray-400 text-lg">
          Professional data-driven insights for today's sports props
        </p>
      </div>

      {/* Stats Overview */}
      <StatsOverview predictions={predictions} />

      {/* Filter Panel */}
      <FilterPanel filters={filters} onFiltersChange={setFilters} />

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPredictions.map((prediction) => (
          <PredictionCard key={prediction.prop_id} prediction={prediction} />
        ))}
      </div>

      {/* Empty State */}
      {filteredPredictions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            No predictions match your filters
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}

      {/* Update Indicator */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString('en-US', { 
            timeZone: 'America/Chicago',
            timeStyle: 'medium'
          })} CT
        </p>
      </div>
    </div>
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
    reasoning: "James averages 25.2 PPG at home vs teams with poor interior defense. Lakers offense runs through James in home games, +2.3% usage rate vs road games. Current line appears conservative based on recent performance trends and matchup factors.",
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
    reasoning: "Nurkic has hit this line in 8 of last 10 games vs teams ranked 20+ in pace. Suns lack secondary rebounding options, forcing Nurkic into more opportunities. Opponent allows 12.3 RPG to centers, Nurkic averages 9.2 R+A vs slow-paced teams.",
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
    reasoning: "Allen averages 298 pass yards at home vs teams ranked 25+ in pass defense efficiency. Jets defense allows 7.8 YPA (32nd in league) and has given up 300+ yards in 3 of last 5 vs playoff-caliber QBs. Weather conditions favor passing game.",
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
    reasoning: "Henry rushed for 102+ yards in 3 of last 4 vs Browns. Browns defense gives up 4.7 YPC to RBs (bottom 10), Henry historically +15% more carries vs Browns defensive front. Ravens committed to run game in positive game script scenarios.",
    market_value: -115,
    edge_percentage: 0.19,
    posted_at: "2025-10-30T13:20:00Z"
  },
  {
    prop_id: "pp-005",
    player_name: "Cooper Flagg",
    team: "Duke",
    sport: "cbb",
    stat_type: "Points",
    line_value: 18.5,
    prediction: "OVER",
    confidence: 0.92,
    reasoning: "Flagg scoring 21.3 PPG in ACC play vs teams ranked 50+ in defensive efficiency. Syracuse allows 22.1 PPG to opposing forwards, Flagg +14% field goal rate vs zone defense. Duke's pace of play favors high-scoring forwards in conference play.",
    market_value: -110,
    edge_percentage: 0.25,
    posted_at: "2025-10-30T13:20:00Z"
  },
  {
    prop_id: "pp-006",
    player_name: "Connor McDavid",
    team: "EDM",
    sport: "nhl",
    stat_type: "Points",
    line_value: 1.5,
    prediction: "OVER",
    confidence: 0.88,
    reasoning: "McDavid has 2+ points in 6 of last 8 vs Sharks. Sharks allow 2.1 power play goals per game (bottom 5), McDavid 85% PPTOI + Sharks penalty situation favorable. Historical matchup data shows McDavid 2.3 avg points vs Sharks defensive system.",
    market_value: -125,
    edge_percentage: 0.21,
    posted_at: "2025-10-30T13:20:00Z"
  }
];

export { TodayDashboard };