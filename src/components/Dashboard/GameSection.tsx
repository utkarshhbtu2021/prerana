import React, { useState } from 'react';
import { Play, Info } from 'lucide-react';
import { preranaValues } from '../../data/mockData';
import { PreranaValue } from '../../types';

interface GameSectionProps {
  onPlayGame: (value: PreranaValue) => void;
}

const GameSection: React.FC<GameSectionProps> = ({ onPlayGame }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="lg:col-span-7 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Ready to Play?</h3>
        <p className="text-gray-600 mb-4">
          Select any value below to start your learning adventure. Each quiz contains 10 carefully crafted questions
          that will test your understanding and practical application of these core values.
        </p>
        <button
          onClick={() => setShowInstructions(true)}
          className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-semibold hover:underline transition-colors"
        >
          <Info className="w-4 h-4" />
          <span>Check Instructions</span>
        </button>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {preranaValues.map((value, index) => (
          <GameCard
            key={value.id}
            value={value}
            onPlay={onPlayGame}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
};

const GameCard: React.FC<{
  value: PreranaValue;
  onPlay: (value: PreranaValue) => void;
  delay: number;
}> = ({ value, onPlay, delay }) => {
  const isGradient = value.color.includes('gradient');

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group animate-fade-in-up innerValueCard"
      style={{ background: isGradient ? value.color : value.color, animationDelay: `${delay}ms` }}
    >
      {/* Header with Icon */}
      

      {/* Content */}
      <div className="px-4">
        <h4 className="font-medium  mb-2 font-bebas title">
          {value.title}
        </h4>
         
      <div className='cardAction flex items-center justify-between'>
        <button
          onClick={() => onPlay(value)}
          className="u-button transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <Play className="w-3 h-3" />
          <span>Play Now</span>
        </button>

        <div 
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl border-4 group-hover:scale-110 transition-transform u-icon" 
           
        >
         <img src={value.icon} alt={value.title} className="w-10 h-10" />
        </div>
      </div>
        {/* Play Button */}
        

        {/* Progress indicator (if completed) */}
        {value.completed && (
          <div className="mt-2 text-xs text-green-600 font-medium">
            ✓ Completed • Score: {value.score}%
          </div>
        )}
      </div>
    </div>
  );
};

const InstructionsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Game Instructions</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6 text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🎯 How to Play</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Select any Prerana value to start the quiz</li>
                <li>Each quiz contains 10 multiple-choice questions</li>
                <li>Questions are categorized into Understanding, Beginner, and Advanced levels</li>
                <li>You have limited time for each question (30s, 45s, or 60s based on difficulty)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">⚡ Scoring System</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Maximum score per quiz: 100 points</li>
                <li>Points awarded based on correct answers and time taken</li>
                <li>Bonus points for quick correct answers</li>
                <li>No negative marking for wrong answers</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🏆 Progress Tracking</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Complete quizzes to earn badges and increase your streak</li>
                <li>Track your performance on the leaderboard</li>
                <li>Retake quizzes up to 3 times to improve your score</li>
                <li>Monitor your overall progress in the dashboard</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">💡 Tips for Success</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-purple-700">
                <li>Read each question carefully before selecting an answer</li>
                <li>Use the full time available to think through your response</li>
                <li>Learn from feedback provided after each question</li>
                <li>Practice regularly to maintain your learning streak</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSection;