import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockBadges, topPerformers } from '../../data/mockData';

const Sidebar: React.FC = () => {
  return (
    <div className="lg:col-span-5 space-y-6">
      {/* Badges Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Badges Earned</h3>
          <div className="flex space-x-2">
            <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {mockBadges.slice(0, 4).map((badge, index) => (
            <div
              key={badge.id}
              className={`p-4 rounded-lg text-center transition-all duration-300 ${
                badge.earned
                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border border-yellow-200'
                  : 'bg-gray-50 border border-gray-200 opacity-60'
              }`}
            >
              <div className="text-2xl mb-2">{badge.earned ? badge.icon : '🔒'}</div>
              <div className="text-xs font-semibold text-gray-800 mb-1">{badge.title}</div>
              <div className="text-xs text-gray-600">{badge.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Top Performers</h3>
        
        <div className="space-y-3">
          {topPerformers.map((performer, index) => (
            <div
              key={performer.rank}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                }`}>
                  {performer.rank}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{performer.name}</div>
                  <div className="text-xs text-gray-600">{performer.class}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-gray-800">{performer.score}</div>
                <button className="text-xs text-purple-600 hover:text-purple-800 hover:underline">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <button className="text-sm text-purple-600 hover:text-purple-800 hover:underline font-semibold">
            View Full Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;