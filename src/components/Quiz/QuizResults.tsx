import React, { useEffect, useState } from 'react';
import { Trophy, RotateCcw, ArrowLeft } from 'lucide-react';
import { PreranaValue, QuizResultsData } from '../../types';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { API_ENDPOINTS } from '../../utils/apiConfig';

interface QuizResultsProps {
  isOpen: boolean;
  onClose: () => void;
  value: PreranaValue | null;
  results: QuizResultsData | null;
  onRetake: () => void;
  attempts?: number;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  isOpen,
  onClose,
  value,
  results,
  onRetake,
  attempts = 1,
}) => {
  const { token } = useAuth();
  const [userMatrix, setUserMatrix] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserMatrix = async () => {
      if (token && isOpen) {
        setIsLoading(true);
        try {
          const response = await axios.get(API_ENDPOINTS.GET_USER_MATRIX, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserMatrix(response.data.data);
        } catch (err) {
          console.error('Failed to fetch user matrix:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUserMatrix();
  }, [token, isOpen]);

  if (!isOpen || !value || !results) return null;

  const isGradient = value.color.includes('gradient');
  const canRetake = attempts < 3;
  const maxScore = results.totalQuestions * 10; // Dynamic max score
  const percentageScore = results.totalQuestions > 0 ? (results.score / maxScore) * 100 : 0;

  const getScoreMessage = () => {
    if (percentageScore >= 90) return { message: 'Outstanding Performance! 🌟', color: 'text-green-600' };
    if (percentageScore >= 75) return { message: 'Great Job! 👍', color: 'text-blue-600' };
    if (percentageScore >= 60) return { message: 'Good Effort! 📚', color: 'text-yellow-600' };
    return { message: 'Keep Learning! 💪', color: 'text-red-600' };
  };

  const scoreMessage = getScoreMessage();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full">
        <div className="text-center p-6 border-b">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border-4"
            style={{
              background: isGradient ? value.color : value.color,
              borderColor: isGradient ? '#6C1DC6' : value.color,
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

        <div className="p-6">
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
                  className={`${percentageScore >= 75 ? 'text-green-500' : percentageScore >= 50 ? 'text-yellow-500' : 'text-red-500'}`}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${percentageScore}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-3xl font-bold text-gray-800">{percentageScore.toFixed(0)}%</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
            </div>
          </div>

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

          {/* {(results.attemptPercentage || results.totalAttempts) && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">Quiz Stats</h4>
              {results.attemptPercentage && (
                <p className="text-sm text-gray-600">Attempt Percentage: {results.attemptPercentage}%</p>
              )}
              {results.totalAttempts && (
                <p className="text-sm text-gray-600">Total Attempts: {results.totalAttempts}</p>
              )}
            </div>
          )}

          {userMatrix && !isLoading && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">Your Progress</h4>
              <p className="text-sm text-gray-600">Total Quizzes Completed: {userMatrix.totalCompletedQuiz}</p>
              <p className="text-sm text-gray-600">Total Score: {userMatrix.totalScore}</p>
            </div>
          )} */}

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