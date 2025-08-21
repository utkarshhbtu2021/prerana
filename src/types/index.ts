// export interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   class: string;
//   age: number;
//   state: string;
//   gamesCompleted: number;
//   totalScore: number;
//   streakDays: number;
// }

// export interface PreranaValue {
//   id: string;
//   title: string;
//   subtitle: string;
//   description: string;
//   color: string;
//   icon: string;
//   completed?: boolean;
//   score?: number;
//   attempts?: number;
// }

// export interface Question {
//   id: string;
//   question: string;
//   options: string[];
//   correctAnswer: number;
//   level: 'Understanding' | 'Beginner' | 'Advance';
//   time: number;
// }

// export interface Quiz {
//   valueId: string;
//   questions: Question[];
//   totalScore: number;
//   timeLimit: number;
// }

// export interface Badge {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
//   earned: boolean;
// }

// export interface TopPerformer {
//   rank: number;
//   name: string;
//   class: string;
//   score: number;
// }



export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  class: string;
  age: number;
  state: string;
  gamesCompleted: number;
  totalScore: number;
  streakDays: number; // Maps to "streak" in API
  badges?: Badge[]; // For medals on dashboard
  role?: string;
  lastLogin?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      userName: string;
      class: string;
      age: number;
      favoriteQuestion: string;
      answer: string;
      stateOrUnionTerritory: string;
      rememberMe: boolean;
      password: string;
      role: string;
      streak: number;
      createdAt: string;
      updatedAt: string;
      lastLogin?: string;
    };
    token: string;
  };
}

export interface PreranaValue {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  icon: string;
  completed?: boolean;
  score?: number;
  attempts?: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  level: 'Understanding' | 'Beginner' | 'Advance';
  time: number;
}

export interface Quiz {
  valueId: string;
  questions: Question[];
  totalScore: number;
  timeLimit: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
}

export interface TopPerformer {
  rank: number;
  name: string;
  class: string;
  score: number;
}