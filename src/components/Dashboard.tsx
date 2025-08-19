import React, { useState } from 'react';
import Header from './Header';
import WelcomeSection from './Dashboard/WelcomeSection';
import GameSection from './Dashboard/GameSection';
import Sidebar from './Dashboard/Sidebar';
import QuizModal from './Quiz/QuizModal';
import QuizAssessment from './Quiz/QuizAssessment';
import QuizResults from './Quiz/QuizResults';
import { useAuth } from '../context/AuthContext';
import { PreranaValue, Question } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedValue, setSelectedValue] = useState<PreranaValue | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [quizResults, setQuizResults] = useState<any>(null);
  const [attempts, setAttempts] = useState(1);

  const handlePlayGame = (value: PreranaValue) => {
    setSelectedValue(value);
    setShowQuizModal(true);
  };

  const handleStartQuiz = (questions: Question[]) => {
    setQuizQuestions(questions);
    setShowQuizModal(false);
    setShowAssessment(true);
  };

  const handleQuizComplete = (results: any) => {
    setQuizResults(results);
    setShowAssessment(false);
    setShowResults(true);
  };

  const handleRetakeQuiz = () => {
    setAttempts(attempts + 1);
    setShowResults(false);
    setShowAssessment(true);
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setSelectedValue(null);
    setQuizResults(null);
    setAttempts(1);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen dashboardView">
      <Header />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto  px-4">
          <WelcomeSection user={user} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <GameSection onPlayGame={handlePlayGame} />
            <Sidebar />
          </div>
        </div>
      </main>

      {/* Quiz Modals */}
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        value={selectedValue}
        onStartQuiz={handleStartQuiz}
      />

      <QuizAssessment
        isOpen={showAssessment}
        onClose={() => setShowAssessment(false)}
        value={selectedValue}
        questions={quizQuestions}
        onComplete={handleQuizComplete}
      />

      <QuizResults
        isOpen={showResults}
        onClose={handleCloseResults}
        value={selectedValue}
        results={quizResults}
        onRetake={handleRetakeQuiz}
        attempts={attempts}
      />
    </div>
  );
};

export default Dashboard;