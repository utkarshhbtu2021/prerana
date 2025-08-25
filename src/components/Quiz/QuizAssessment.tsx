
// src/components/Dashboard/QuizAssessment.tsx
import React, { useState, useEffect } from 'react';
import { X, Clock, ArrowRight } from 'lucide-react';
import { Question, PreranaValue, QuizResultsData } from '../../types';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

interface QuizAssessmentProps {
  isOpen: boolean;
  onClose: () => void;
  value: PreranaValue | null;
  questions: Question[];
  onComplete: (results: QuizResultsData) => void;
}

interface Answer {
  questionId: string;
  selectedOption: string | null;
  isCorrect: boolean;
  timeTakenSec: number;
}

const QuizAssessment: React.FC<QuizAssessmentProps> = ({
  isOpen,
  onClose,
  value,
  questions,
  onComplete,
}) => {
  const { token, refreshUserMatrix } = useAuth(); // ✅ added refreshUserMatrix
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect' | 'timeout'>('correct');
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (isOpen && questions.length > 0) {
      setCurrentQuestionIndex(0);
      setTimeLeft(questions[0].time || 45);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsAnswered(false);
      setAnswers(
        new Array(questions.length).fill(null).map(() => ({
          questionId: '',
          selectedOption: null,
          isCorrect: false,
          timeTakenSec: 0,
        }))
      );
      setTotalTimeTaken(0);
    }
  }, [isOpen, questions]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback && currentQuestion) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback && currentQuestion) {
      handleTimeout();
    }
  }, [timeLeft, showFeedback, currentQuestion]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!isAnswered && currentQuestion) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleTimeout = () => {
    if (currentQuestion) {
      setIsAnswered(true);
      setFeedbackType('timeout');
      setShowFeedback(true);
      updateAnswers(null, currentQuestion.id, currentQuestion.time || 45);
    }
  };

  const updateAnswers = (answerIndex: number | null, questionId: string, timeTaken: number) => {
    if (currentQuestion) {
      const newAnswers = [...answers];
      const cleanQuestionId = questionId.split('-')[0];
      const selectedOption = answerIndex !== null ? String.fromCharCode(65 + answerIndex) : null;
      const isCorrect = answerIndex !== null && answerIndex === currentQuestion.correctAnswer;

      newAnswers[currentQuestionIndex] = {
        questionId: cleanQuestionId,
        selectedOption,
        isCorrect,
        timeTakenSec: timeTaken,
      };

      setAnswers(newAnswers);
      setTotalTimeTaken(totalTimeTaken + timeTaken);
    }
  };

  const submitQuizAttempt = async (isFinal: boolean) => {
    if (!value || !token || !currentQuestion) return null;

    const correct = answers.filter(a => a.isCorrect).length;
    const incorrect = answers.filter(a => a.selectedOption && !a.isCorrect).length;
    const skipped = answers.filter(a => a.selectedOption === null).length;

    const payload = {
      quizId: value.id,
      quizSet: questions[0]?.type || 'set1',
      answers: answers.filter(a => a.questionId).map(a => ({
        questionId: a.questionId,
        selectedOption: a.selectedOption,
        isCorrect: a.isCorrect,
        timeTakenSec: a.timeTakenSec,
      })),
      score: correct * 10,
      totalQuestions: questions.length,
      skippedCount: skipped,
      correctCount: correct,
      incorrectCount: incorrect,
      timeTakenSec: isFinal
        ? totalTimeTaken
        : answers.reduce((sum, a) => sum + (a.timeTakenSec || 0), 0),
      isCompleted: isFinal,
    };

    try {
      const response = await axios.post(
        'https://prerana-game-db.onrender.com/api/quiz-attempts',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        }
      );
      console.log('Quiz attempt submitted:', response.data);

      refreshUserMatrix(); // ✅ stats update immediately
      return response.data;
    } catch (err: any) {
      console.error('Error submitting quiz attempt:', {
        message: err.response?.data?.message,
        errors: err.response?.data?.errors || err.message,
        status: err.response?.status,
      });
      return null;
    }
  };

  const handleContinue = async () => {
    if (currentQuestion) {
      if (!isAnswered) {
        if (selectedAnswer === null) {
          setIsAnswered(true);
          setFeedbackType('timeout');
          setShowFeedback(true);
          updateAnswers(null, currentQuestion.id, currentQuestion.time || 45);
        } else {
          setIsAnswered(true);
          const timeTaken = (currentQuestion.time || 45) - timeLeft;
          updateAnswers(selectedAnswer, currentQuestion.id, timeTaken);

          setFeedbackType(
            selectedAnswer === currentQuestion.correctAnswer ? 'correct' : 'incorrect'
          );
          setShowFeedback(true);

          await submitQuizAttempt(false);
        }
      } else {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setShowFeedback(false);
          setIsAnswered(false);
          setTimeLeft(questions[currentQuestionIndex + 1].time || 45);
          setSelectedAnswer(null);
        } else {
          const backendResponse = await submitQuizAttempt(true);

          const correct = answers.filter(a => a.isCorrect).length;
          const incorrect = answers.filter(a => a.selectedOption && !a.isCorrect).length;
          const unanswered = answers.filter(a => a.selectedOption === null).length;

          const results: QuizResultsData = backendResponse?.data
            ? {
                score: backendResponse.data.score,
                correct: backendResponse.data.correctCount,
                incorrect: backendResponse.data.incorrectCount,
                unanswered: backendResponse.data.skippedCount,
                totalQuestions: questions.length,
                attemptPercentage: backendResponse.data.attemptPercentage,
                totalAttempts: backendResponse.data.totalAttempts,
              }
            : {
                score: correct * 10,
                correct,
                incorrect,
                unanswered,
                totalQuestions: questions.length,
              };

          onComplete(results);
          onClose();
        }
      }
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Understanding':
        return 'bg-green-100 text-green-800';
      case 'Beginner':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFeedbackMessage = () => {
    switch (feedbackType) {
      case 'correct':
        return {
          message: 'Excellent! You got it right.',
          suggestion: 'Great understanding of this concept. Keep up the good work!',
          bgColor: 'bg-green-50 border-green-200',
          textColor: 'text-green-800',
        };
      case 'incorrect':
        return {
          message:
            'Not quite right. The correct answer is option ' +
            String.fromCharCode(65 + (currentQuestion?.correctAnswer || 0)) +
            '.',
          suggestion: 'Take time to understand this concept better for future questions.',
          bgColor: 'bg-red-50 border-red-200',
          textColor: 'text-red-800',
        };
      case 'timeout':
        return {
          message:
            "Time's up! The correct answer is option " +
            String.fromCharCode(65 + (currentQuestion?.correctAnswer || 0)) +
            '.',
          suggestion: 'Try to manage your time better in upcoming questions.',
          bgColor: 'bg-yellow-50 border-yellow-200',
          textColor: 'text-yellow-800',
        };
    }
  };

  if (!isOpen || !value || questions.length === 0) return null;

  const isGradient = value.color.includes('gradient');
  const feedback = getFeedbackMessage();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* header */}
        <div className="bg-gray-50 p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2"
                style={{
                  background: isGradient ? value.color : value.color,
                  borderColor: isGradient ? '#6C1DC6' : value.color,
                }}
              >
                <img src={value.icon} alt={value.title} className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{value.title}</h2>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>Total Questions: {questions.length}</span>
              <span>Total Points: {questions.length * 10}</span>
              <span>
                Total Time: {questions.reduce((sum, q) => sum + (q.time || 45), 0)}s
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 flex items-center space-x-1 text-sm"
            >
              <X className="w-4 h-4" />
              <span>Quit Quiz</span>
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

        </div>


        

        {/* body */}
        <div className="p-6">
          {currentQuestion ? (
            <>
              {/* question header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Q.{currentQuestionIndex + 1}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
                      currentQuestion.level
                    )}`}
                  >
                    {currentQuestion.level}
                  </span>
                </div>

                {!showFeedback && (
                  <div className="flex items-center space-x-2 text-lg font-bold">
                    <Clock
                      className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'}`}
                    />
                    <span className={timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'}>
                      00:{timeLeft.toString().padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>

              {/* options */}
              <div className="mb-8">
                <p className="text-lg text-gray-800 leading-relaxed mb-6">
                  {currentQuestion.question}
                </p>
                <div className="grid gap-3">
                  {Array.isArray(currentQuestion.options) &&
                    currentQuestion.options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = index === currentQuestion.correctAnswer;
                      const showResult = showFeedback && (isSelected || isCorrect);

                      let buttonClass =
                        'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ';

                      if (showFeedback) {
                        if (isCorrect) {
                          buttonClass += 'bg-green-50 border-green-500 text-green-800';
                        } else if (isSelected && !isCorrect) {
                          buttonClass += 'bg-red-50 border-red-500 text-red-800';
                        } else {
                          buttonClass += 'bg-gray-50 border-gray-200 text-gray-600';
                        }
                      } else if (isSelected) {
                        buttonClass += 'bg-blue-50 border-blue-500 text-blue-800';
                      } else {
                        buttonClass +=
                          'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300';
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={showFeedback}
                          className={buttonClass}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                            <span>{option}</span>
                            {showResult && isSelected && (
                              <span className="ml-auto">{isCorrect ? '✓' : '✗'}</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* feedback */}
              {showFeedback && (
                <div className={`p-4 rounded-lg border ${feedback.bgColor} mb-6`}>
                  <p className={`font-medium ${feedback.textColor} mb-2`}>
                    {feedback.message}
                  </p>
                  <p className={`text-sm ${feedback.textColor} opacity-80`}>
                    {feedback.suggestion}
                  </p>
                </div>
              )}

              {/* next button */}
              <div className="flex justify-end">
                <button
                  onClick={handleContinue}
                  disabled={!showFeedback && selectedAnswer === null}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <span>
                    {showFeedback
                      ? currentQuestionIndex < questions.length - 1
                        ? 'Next Question'
                        : 'Complete Quiz'
                      : 'Continue'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-600">
              No questions available. Please try again later.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAssessment;
