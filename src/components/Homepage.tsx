import React, { useState } from 'react';
import Header from './Header';
import HeroSection from './Homepage/HeroSection';
import ValuesSection from './Homepage/ValuesSection';
import AboutGameSection from './Homepage/AboutGameSection';
import GallerySection from './Homepage/GallerySection';
import Footer from './Homepage/Footer';
import LoginModal from './Modals/LoginModal';
import { useAuth } from '../context/AuthContext';

const Homepage: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleStartGame = () => {
    if (isAuthenticated) {
      // Switch to dashboard view - this would be handled by parent component
      window.location.reload(); // Temporary solution
    } else {
      setShowLoginModal(true);
    }
  };

  const handleExploreValue = (value: any) => {
    if (isAuthenticated) {
      // Navigate to quiz or dashboard
      console.log('Exploring value:', value.title);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="min-h-screen">
      <Header onLoginClick={() => setShowLoginModal(true)} />
      <HeroSection onStartGame={handleStartGame} />
      <ValuesSection onExploreClick={handleExploreValue} />
      <AboutGameSection />
      <GallerySection />
      <Footer />
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default Homepage;