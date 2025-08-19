import React from 'react';
import { Trophy, RotateCcw, ArrowLeft } from 'lucide-react';
import { PreranaValue } from '../../types';

interface QuizResultsProps {
  isOpen: boolean;
  onClose: () => void;
  value: PreranaValue | null;
  results: {
    score: number;
    correct: number;
    incorrect: number;
    unanswered: number;
    totalQuestions: number;
  } | null;
  onRetake: () => void;
  attempts?: number;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  isOpen,
  onClose,
  value,
  results,
  onRetake,
  attempts = 1
}) => {
  if (!isOpen || !value || !results) return null;

  const isGradient = value.color.includes('gradient');
  const canRetake = attempts < 3;

  const getScoreMessage = () => {
    if (results.score >= 90) return { message: 'Outstanding Performance! 🌟', color: 'text-green-600' };
    if (results.score >= 75) return { message: 'Great Job! 👍', color: 'text-blue-600' };
    if (results.score >= 60) return { message: 'Good Effort! 📚', color: 'text-yellow-600' };
    return { message: 'Keep Learning! 💪', color: 'text-red-600' };
  };

  const scoreMessage = getScoreMessage();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full">
        {/* Header */}
        <div className="text-center p-6 border-b">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border-4"
            style={{
              background: isGradient ? value.color : value.color,
              borderColor: isGradient ? '#6C1DC6' : value.color
            }}
          >
             <img src={value.icon} alt={value.title} className="w-10 h-10" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{value.title}</h2>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className={`text-lg font-semibold ${scoreMessage.color}`}>
              {scoreMessage.message}
            </span>
          </div>
        </div>

        {/* Results */}
        <div className="p-6">
          {/* Score Circle */}
          <div className="text-center mb-6">
            <div className="relative inline-flex items-center justify-center w-32 h-32 mx-auto">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`${results.score >= 75 ? 'text-green-500' : results.score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${results.score}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-3xl font-bold text-gray-800">{results.score}%</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{results.correct}</div>
              <div className="text-sm text-green-800">Correct</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{results.incorrect}</div>
              <div className="text-sm text-red-800">Incorrect</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{results.unanswered}</div>
              <div className="text-sm text-gray-800">Unanswered</div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {canRetake && (
              <button
                onClick={onRetake}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Re-take Quiz (Attempt {attempts + 1}/3)</span>
              </button>
            )}
            
            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          {!canRetake && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Maximum attempts reached (3/3)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizResults;