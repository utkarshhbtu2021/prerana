import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { API_ENDPOINTS } from '../../utils/apiConfig';
import { Quiz, PreranaValue } from '../../types';

// Mapping for colors and icons based on quiz names (extended to all 9 values)
const quizConfig: { [key: string]: { color: string; icon: string } } = {
  'SATYANISHTHA AUR SHUCHITA': { color: '#46B3F6', icon: 'images/icons/value-icon-4.svg' },
  'KARUNA AUR SEVA': { color: '#F18483', icon: 'images/icons/value-icon-3.svg' },
  'SWABHIMAN AUR VINAY': { color: '#00007C', icon: 'images/icons/value-icon-1.svg' },
  'SHAURYA AUR SAHAS': { color: '#A92121', icon: 'images/icons/value-icon-2.svg' },
  'PARISHRAM AUR SAMARPAN': { color: '#F7AD41', icon: 'images/icons/value-icon-5.svg' },
  'VIVIDHTA AUR EKTA': { color: 'linear-gradient(45deg, #3F64B5, #EDE73B, #DC3737)', icon: 'images/icons/value-icon-6.svg' },
  'JIGNASA AUR NAVACHAAR': { color: '#B701F4', icon: 'images/icons/value-icon-7.svg' },
  'SHRADDHA AUR VISHWAS': { color: '#E9BD36', icon: 'images/icons/value-icon-8.svg' },
  'SWATANTRATA AUR KARTAVYA': { color: '#2D6C3E', icon: 'images/icons/value-icon-9.svg' },
};

interface GameSectionProps {
  onPlayGame: (value: PreranaValue) => void; // Updated to expect PreranaValue
}

const GameSection: React.FC<GameSectionProps> = ({ onPlayGame }) => {
  const { token } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzesAndProgress = async () => {
      if (!token) return;
      setIsLoading(true);
      try {
        const quizzesResponse = await axios.get(API_ENDPOINTS.GET_QUIZZES, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedQuizzes = quizzesResponse.data.data.items || [];

        const progressResponse = await axios.get(API_ENDPOINTS.GET_USER_MATRIX, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const progressData = progressResponse.data.data.badges || [];

        const updatedQuizzes = fetchedQuizzes.map((quiz: Quiz) => {
          const config = quizConfig[quiz.name as keyof typeof quizConfig] || { color: '#f3f4f6', icon: '/path/to/default-icon.png' };
          const progress = progressData.find((b: any) => b.valueId === quiz._id);
          return {
            ...quiz,
            completed: progress?.completed || false,
            score: progress?.score || 0,
            color: config.color,
            icon: config.icon,
          };
        });

        setQuizzes(updatedQuizzes);
      } catch (err) {
        setError('Failed to fetch quizzes or progress. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzesAndProgress();
  }, [token]);

  const handlePlayGame = (quiz: Quiz) => {
    const preranaValue: PreranaValue = {
      id: quiz._id, // Ensure id is set to quiz._id
      title: quiz.name,
      name:quiz.name,
      subtitle: quiz.subtitle,
      description: quiz.description,
      color: quiz.color || '#f3f4f6',
      icon: quiz.icon || '/path/to/default-icon.png',
      completed: quiz.completed || false,
      score: quiz.score || 0,
    };
    onPlayGame(preranaValue); // Pass the PreranaValue object
  };

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
        {quizzes.map((quiz, index) => (
          <GameCard
            key={quiz._id}
            quiz={quiz as Quiz & { color: string; icon: string }}
            onPlay={handlePlayGame}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}

      {isLoading && <div className="text-center py-8">Loading quizzes...</div>}
      {error && <div className="text-center py-8 text-red-600">{error}</div>}
    </div>
  );
};

const GameCard: React.FC<{
  quiz: Quiz & { color: string; icon: string };
  onPlay: (value: Quiz) => void;
  delay: number;
}> = ({ quiz, onPlay, delay }) => {
  const isGradient = quiz.color.includes('gradient');

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group animate-fade-in-up innerValueCard"
      style={{ background: isGradient ? quiz.color : quiz.color, animationDelay: `${delay}ms` }}
    >
      {/* Content */}
      <div className="px-4">
        <h4 className="font-medium mb-2 font-bebas title ">
          {quiz.name}
        </h4>
        <div className="cardAction flex items-center justify-between">
          <button
            onClick={() => onPlay(quiz)}
            className="u-button transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Play className="w-3 h-3" />
            <span>Play Now</span>
          </button>
      
          <div
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl border-4 group-hover:scale-110 transition-transform u-icon"
          >
            <img src={quiz.icon} alt={quiz.name} className="w-10 h-10" />
          </div>
        </div>

        {/* Progress indicator (if completed) */}
        {quiz.completed && (
          <div className="mt-2 text-xs text-green-600 font-medium">
            ✓ Completed • Score: {quiz.score}%
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




