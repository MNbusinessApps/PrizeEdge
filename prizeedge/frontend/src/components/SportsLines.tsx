import React, { useState } from 'react';

const SPORTS_DATA = [
  {
    id: 'nba',
    name: 'NBA Basketball',
    icon: '🏀',
    displayName: 'Basketball',
    lines: [
      'Points', 'Rebounds', 'Assists', 'Rebounds + Assists',
      'Steals', 'Blocks', '3-Pointers Made', 'Field Goals Made', 'Free Throws Made'
    ],
    color: '#FF6B35',
  },
  {
    id: 'nfl', 
    name: 'NFL Football',
    icon: '🏈',
    displayName: 'Football',
    lines: [
      'Passing Yards', 'Passing TDs', 'Rushing Yards', 'Rushing TDs',
      'Receiving Yards', 'Receptions', 'Carries', 'Targets', 'Field Goals Made'
    ],
    color: '#003366',
  },
  {
    id: 'cbb',
    name: 'College Basketball',
    icon: '🏀',
    displayName: 'College Basketball',
    lines: [
      'Points', 'Rebounds', 'Assists', 'Rebounds + Assists', 
      '3-Pointers Made', 'Steals', 'Blocks', 'Field Goals Made'
    ],
    color: '#8B4513',
  },
  {
    id: 'nhl',
    name: 'NHL Hockey',
    icon: '🏒',
    displayName: 'Hockey', 
    lines: [
      'Goals', 'Assists', 'Points', 'Shots', 'Power Play Points', 'Faceoffs Won', 'Time on Ice'
    ],
    color: '#006600',
  }
];

export const SportsLines: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const toggleSport = (sportId: string) => {
    setSelectedSport(selectedSport === sportId ? null : sportId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          ⚽ Sports Lines
        </h1>
        <p className="text-gray-400 text-lg">
          Professional analysis for every sport and prop type
        </p>
      </div>

      {/* Sports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SPORTS_DATA.map((sport) => {
          const isSelected = selectedSport === sport.id;
          
          return (
            <div key={sport.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSport(sport.id)}
                className="w-full p-6 text-left hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{sport.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{sport.displayName}</h3>
                      <p className="text-gray-400">{sport.lines.length} Line Types</p>
                    </div>
                  </div>
                  <div className="text-yellow-400">
                    {isSelected ? '−' : '+'}
                  </div>
                </div>
              </button>

              {isSelected && (
                <div className="border-t border-gray-700 p-6">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-4">Available Lines</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {sport.lines.map((line, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-white">{line}</span>
                        <span className="text-yellow-400">→</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Stats */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
        <div className="text-2xl font-bold text-yellow-400 mb-2">
          {SPORTS_DATA.reduce((total, sport) => total + sport.lines.length, 0)} Total Line Types
        </div>
        <p className="text-gray-400">
          Comprehensive coverage across all major sports • Updated every second
        </p>
      </div>
    </div>
  );
};