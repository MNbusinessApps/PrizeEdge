import React from 'react';

interface Filters {
  sport: string;
  confidence: string;
  minEdge: number;
}

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-yellow-400 mb-4">Filter Picks</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sport Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Sport</label>
          <select 
            value={filters.sport}
            onChange={(e) => updateFilter('sport', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
          >
            <option value="all">All Sports</option>
            <option value="nba">NBA Basketball</option>
            <option value="nfl">NFL Football</option>
            <option value="cbb">College Basketball</option>
            <option value="nhl">NHL Hockey</option>
          </select>
        </div>

        {/* Confidence Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Confidence</label>
          <select 
            value={filters.confidence}
            onChange={(e) => updateFilter('confidence', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
          >
            <option value="all">All Levels</option>
            <option value="high">High (85%+)</option>
            <option value="medium">Medium (75-85%)</option>
          </select>
        </div>

        {/* Minimum Edge Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Min Edge: {filters.minEdge}%
          </label>
          <input 
            type="range"
            min="0"
            max="30"
            value={filters.minEdge}
            onChange={(e) => updateFilter('minEdge', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button 
            onClick={() => onFiltersChange({ sport: 'all', confidence: 'all', minEdge: 0 })}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};