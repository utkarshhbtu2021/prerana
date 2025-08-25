
// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import axios from 'axios';
// import { API_ENDPOINTS } from '../utils/apiConfig';
// import { AuthResponse } from '../types'; // Assume this type exists or define it

// interface AuthContextType {
//   user: any | null;
//   login: (username: string, password: string) => Promise<void>;
//   logout: () => void;
//   isAuthenticated: boolean;
//   token: string | null;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<any | null>(null);
//   const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

//   const login = async (username: string, password: string) => {
//     try {
//       const response = await axios.post<AuthResponse>(API_ENDPOINTS.LOGIN, {
//         userName: username, // Match Swagger's field name
//         password: password, // Will be "12345" as per backend
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const { user: userData, token: authToken } = response.data.data;
//       setUser(userData);
//       setToken(authToken);
//       localStorage.setItem('user', JSON.stringify(userData));
//       localStorage.setItem('token', authToken);
//     } catch (error: any) {
//       console.error('Login failed:', error.response?.data || error.message);
//       throw new Error(error.response?.data?.message || 'Invalid credentials');
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//   };

//   const isAuthenticated = !!user && !!token;

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated, token }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within an AuthProvider');
//   return context;
// };


import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../utils/apiConfig";
import { AuthResponse } from "../types"; // <- apna type

interface AuthContextType {
  user: any | null;
  token: string | null;
  stats: {
    gamesCompleted: number;
    totalScore: number;
    streakDays: number;
  };
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshUserMatrix: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null
  );
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [stats, setStats] = useState({ gamesCompleted: 0, totalScore: 0, streakDays: 0 });

  // ✅ Login
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post<AuthResponse>(
        API_ENDPOINTS.LOGIN,
        { userName: username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { user: userData, token: authToken } = response.data.data;
      setUser(userData);
      setToken(authToken);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", authToken);

      // ✅ Login ke baad hi stats fetch karo
      await refreshUserMatrix(authToken);
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Invalid credentials");
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setStats({ gamesCompleted: 0, totalScore: 0, streakDays: 0 });
  };

  // ✅ Refresh User Matrix
  const refreshUserMatrix = useCallback(
    async (customToken?: string) => {
      const activeToken = customToken || token;
      if (!activeToken) return;
      try {
        const response = await axios.get(API_ENDPOINTS.GET_USER_MATRIX, {
          headers: { Authorization: `Bearer ${activeToken}` },
        });
        setStats({
          gamesCompleted: response.data.data.totalCompletedQuiz || 0,
          totalScore: response.data.data.totalScore || 0,
          streakDays: response.data.data.streak || response.data.data.streakDays || 0,
        });
      } catch (err) {
        console.error("Failed to fetch user matrix:", err);
      }
    },
    [token]
  );

  useEffect(() => {
    if (token) {
      refreshUserMatrix();
    }
  }, [token, refreshUserMatrix]);

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, stats, login, logout, isAuthenticated, refreshUserMatrix }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
