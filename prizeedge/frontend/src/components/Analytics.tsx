import React from 'react';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          📊 Analytics Dashboard
        </h1>
        <p className="text-gray-400 text-lg">
          Performance insights and predictive modeling metrics
        </p>
      </div>

      {/* Coming Soon */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
        <div className="text-6xl mb-6">🚧</div>
        <h2 className="text-2xl font-bold text-white mb-4">Advanced Analytics Coming Soon</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-gray-400">
            We're building powerful analytics tools to give you deeper insights into:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-semibold text-white mb-2">Performance Tracking</h3>
              <p className="text-sm text-gray-400">
                Track your pick accuracy, confidence vs. outcomes, and ROI over time
              </p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-white mb-2">Model Accuracy</h3>
              <p className="text-sm text-gray-400">
                Analyze how well our predictions match actual game results
              </p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-white mb-2">Real-time Insights</h3>
              <p className="text-sm text-gray-400">
                Live performance dashboards with minute-by-minute updates
              </p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="font-semibold text-white mb-2">Predictive Models</h3>
              <p className="text-sm text-gray-400">
                Advanced machine learning models for future game predictions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Beta Features Notice */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🔬</div>
          <div>
            <h3 className="text-lg font-semibold text-blue-400">Beta Analytics Features</h3>
            <p className="text-gray-400 text-sm mt-1">
              Sign up for early access to our advanced analytics platform. 
              Get notified when these features become available.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-colors">
            Join Beta Waitlist
          </button>
        </div>
      </div>
    </div>
  );
};