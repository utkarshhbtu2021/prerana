export const API_ENDPOINTS = {
  LOGIN: 'https://prerana-game-db.onrender.com/api/auth/login',
  REGISTER: 'https://prerana-game-db.onrender.com/api/auth/register',
  GET_QUIZZES: 'https://prerana-game-db.onrender.com/api/quizzes',
  GET_QUESTIONS: (quizId: string) => `https://prerana-game-db.onrender.com/api/questions/quiz/${quizId}`,
  SUBMIT_QUIZ: 'https://prerana-game-db.onrender.com/api/quiz-attempts',
  GET_USER_MATRIX: 'https://prerana-game-db.onrender.com/api/users/matrix',
};