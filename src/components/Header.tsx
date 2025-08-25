// src/components/Header.tsx
import React, { useEffect, useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const [isFixed, setIsFixed] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isFixed ? "header-fixed" : "bg-transparent"
      } header`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Left: Logos */}
          <div className="flex items-center headerLogos">
            <div className="ministry-logo">
              <img 
                src="/images/logos/ministary-logo.png" 
                alt="Ministry of Education Logo" 
                className="object-contain"
              />
            </div>
            <div className="prerana-logo">
              <img 
                src="/images/logos/prerana-logo.png" 
                alt="Prerana Logo" 
                className="object-contain"
              />
            </div> 
          </div>

          {/* Right: Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 backdrop-blur-sm rounded-full px-4 py-2 themeButton"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.firstName}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold themeButton space-x-2 flex items-center justify-center"
              >
                <User className="w-4 h-4" />
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm rounded-lg mt-2 p-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-800 hover:text-purple-600 transition-colors">Home</a>
              <a href="#" className="text-gray-800 hover:text-purple-600 transition-colors">About</a>
              <a href="#" className="text-gray-800 hover:text-purple-600 transition-colors">Contact</a>
              {!isAuthenticated && (
                <button
                  onClick={onLoginClick}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full font-semibold text-left flex items-center justify-center space-x-2"
                >
                   <User className="w-4 h-4" />
                  Login
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;