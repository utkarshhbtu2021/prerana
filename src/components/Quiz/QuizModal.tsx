import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Clock, HelpCircle, Target } from 'lucide-react';
import { PreranaValue, Question } from '../../types';
import { sampleQuestions } from '../../data/mockData';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: PreranaValue | null;
  onStartQuiz: (questions: Question[]) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, value, onStartQuiz }) => {
  if (!isOpen || !value) return null;

  const handleStartQuiz = () => {
    // In a real app, fetch questions based on value.id
    onStartQuiz(sampleQuestions);
  };

  const isGradient = value.color.includes('gradient');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full">
        {/* Header */}
        <div className="p-6 text-center border-b border-gray-100">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border-4"
            style={{
              background: isGradient ? value.color : value.color,
              borderColor: isGradient ? '#6C1DC6' : value.color
            }}
          >
             <img src={value.icon} alt={value.title} className="w-10 h-10" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{value.title}</h2>
          <p className="text-gray-600 font-medium">{value.subtitle}</p>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">{value.description}</p>
        </div>

        {/* Quiz Info */}
        <div className="p-6">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              Progressive Timer System
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-green-100 rounded-lg p-2">
                <div className="font-semibold text-green-800">Understanding</div>
                <div className="text-green-600">30 seconds</div>
              </div>
              <div className="bg-yellow-100 rounded-lg p-2">
                <div className="font-semibold text-yellow-800">Beginner</div>
                <div className="text-yellow-600">45 seconds</div>
              </div>
              <div className="bg-red-100 rounded-lg p-2">
                <div className="font-semibold text-red-800">Advanced</div>
                <div className="text-red-600">60 seconds</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div className="flex flex-col items-center">
              <HelpCircle className="w-8 h-8 text-purple-600 mb-2" />
              <div className="font-semibold text-gray-800">10</div>
              <div className="text-xs text-gray-600">Questions</div>
            </div>
            <div className="flex flex-col items-center">
              <Target className="w-8 h-8 text-blue-600 mb-2" />
              <div className="font-semibold text-gray-800">100</div>
              <div className="text-xs text-gray-600">Max Score</div>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-green-600 mb-2" />
              <div className="font-semibold text-gray-800">10</div>
              <div className="text-xs text-gray-600">Total Min</div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleStartQuiz}
              className="flex-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Start Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;