export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  class: string;
  age: number;
  state: string;
  gamesCompleted: number;
  totalScore: number;
  streakDays: number;
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