export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  class: string;
  age?: number;
  favoriteQuestion?: string;
  answer?: string;
  stateOrUnionTerritory: string;
  rememberMe?: boolean;
  password?: string;
  role?: string;
  streak?: number;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  __v?: number;
  gamesCompleted?: number;
  totalScore?: number;
}

export interface PreranaValue {
  id: string;
  title: string;
  name: string;
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
  type?: string; // Already included, matches backend
}

export interface TimerRule {
  range: string;
  timeLimitSec: number;
  level: { id: number; name: string };
  _id: string;
}

export interface TimerSystem {
  type: string;
  rules: TimerRule[];
}

export interface Quiz {
  _id: string;
  name: string;
  subtitle: string;
  description: string;
  timerSystem: TimerSystem;
  totalQuestions: number;
  maxScore: number;
  totalMin: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  completed?: boolean;
  score?: number;
  color?: string;
  icon?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
}

export interface TopPerformer {
  _id?: string;
  rank: number;
  name: string;
  class: string;
  score: number;
}

// export interface QuizResults {
//   score: number;
//   correct: number;
//   incorrect: number;
//   unanswered: number;
//   totalQuestions: number;
//   attemptPercentage?: number; // Added for backend response
//   totalAttempts?: number; // Added for backend response
// }

export interface QuizResultsData { // Renamed from QuizResults
  score: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  totalQuestions: number;
  attemptPercentage?: number;
  totalAttempts?: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface QuizResponse {
  success: boolean;
  message: string;
  data: {
    items: Quiz[];
  };
}

export interface QuestionsResponse {
  success: boolean;
  message: string;
  data: Question[];
}

export interface QuizAttemptResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    userId: string;
    quizId: string;
    quizSet: string;
    answers: {
      questionId: string;
      selectedOption: string;
      isCorrect: boolean;
      timeTakenSec: number;
      _id: string;
    }[];
    score: number;
    totalQuestions: number;
    skippedCount: number;
    correctCount: number;
    incorrectCount: number;
    timeTakenSec: number;
    isCompleted: boolean;
    attemptedAt: string;
    createdAt: string;
    updatedAt: string;
    attemptPercentage: number;
    totalAttempts: number;
    __v: number;
  };
}

export interface UserMatrixResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    totalCompletedQuiz: number;
    totalScore: number;
    badges: Badge[];
    topUsers: TopPerformer[];
  };
}