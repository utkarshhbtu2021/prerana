import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Dashboard /> : <Homepage />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </AuthProvider>
  );
}

export default App;