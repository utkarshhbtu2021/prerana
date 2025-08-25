// import React, { useEffect, useState } from 'react';
// import { User } from '../../types';
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext';
// import { API_ENDPOINTS } from '../../utils/apiConfig';

// interface WelcomeSectionProps {
//   user: User;
// }

// const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user }) => {
//   const { token } = useAuth();
//   const [stats, setStats] = useState({
//     gamesCompleted: user.gamesCompleted || 0,
//     totalScore: user.totalScore || 0,
//     streakDays: user.streak || 0, // Use streak from login API initially
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserMatrix = async () => {
//       if (token) {
//         setIsLoading(true);
//         try {
//           const response = await axios.get(API_ENDPOINTS.GET_USER_MATRIX, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setStats((prev) => ({
//             gamesCompleted: response.data.data.totalCompletedQuiz || 0,
//             totalScore: response.data.data.totalScore || 0,
//             // 🚨 streakDays ko overwrite mat karo, login API se aaya prev value use karo
//             streakDays: prev.streakDays,
//           }));
//         } catch (err) {
//           console.error('Failed to fetch user matrix:', err);
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };
//     fetchUserMatrix();
//   }, [token]);

//   return (
//     <div className="bg-white rounded-2xl shadow-lg border-4 border-purple-600 p-6 mb-8">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
//         {/* Left - User Info */}
//         <div className="lg:col-span-2">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Welcome, {user.firstName} {user.lastName}! 🎉
//           </h2>
//           <div className="flex flex-wrap items-center gap-4 text-gray-600">
//             <span className="flex items-center space-x-2">
//               <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//               <span>Class: {user.class}</span>
//             </span>
//             <span className="flex items-center space-x-2">
//               <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//               <span>Location: {user.stateOrUnionTerritory || 'N/A'}</span>
//             </span>
//           </div>
//         </div>

//         {/* Right - Stats */}
//         <div className="grid grid-cols-3 gap-4">
//           <StatCard
//             title="Games Completed"
//             value={stats.gamesCompleted}
//             icon="🎮"
//             color="bg-blue-500"
//           />
//           <StatCard
//             title="Total Score"
//             value={stats.totalScore}
//             icon="⭐"
//             color="bg-yellow-500"
//           />
//           <StatCard
//             title="Streak Days"
//             value={stats.streakDays}
//             icon="🔥"
//             color="bg-red-500"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard: React.FC<{
//   title: string;
//   value: number;
//   icon: string;
//   color: string;
// }> = ({ title, value, icon, color }) => {
//   return (
//     <div className="text-center">
//       <div
//         className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white text-xl mx-auto mb-2`}
//       >
//         {icon}
//       </div>
//       <div className="text-2xl font-bold text-gray-800">{value}</div>
//       <div className="text-xs text-gray-600 leading-tight">{title}</div>
//     </div>
//   );
// };

// export default WelcomeSection;


// src/components/Dashboard/WelcomeSection.tsx
import React from 'react';
import { User } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface WelcomeSectionProps {
  user: User;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user }) => {
  const { stats } = useAuth();

  return (
    <div className="bg-white rounded-2xl shadow-lg border-4 border-purple-600 p-6 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Left - User Info */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {user.firstName} {user.lastName}! 🎉
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Class: {user.class}</span>
            </span>
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Location: {user.stateOrUnionTerritory || 'N/A'}</span>
            </span>
          </div>
        </div>

        {/* Right - Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="Games Completed" value={stats.gamesCompleted} icon="🎮" color="bg-blue-500" />
          <StatCard title="Total Score" value={stats.totalScore} icon="⭐" color="bg-yellow-500" />
          <StatCard title="Streak Days" value={stats.streakDays} icon="🔥" color="bg-red-500" />
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: number; icon: string; color: string }> = ({
  title,
  value,
  icon,
  color,
}) => {
  return (
    <div className="text-center">
      <div
        className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white text-xl mx-auto mb-2`}
      >
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-600 leading-tight">{title}</div>
    </div>
  );
};

export default WelcomeSection;
