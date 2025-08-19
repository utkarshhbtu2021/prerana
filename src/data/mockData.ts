import { PreranaValue, Badge, TopPerformer, Question } from '../types';

export const preranaValues: PreranaValue[] = [
  {
    id: '1',
    title: 'Swabhiman aur Vinay',
    subtitle: 'Self-respect and Humility',
    description: 'Embrace dignity while staying humble and respectful to all.',
    color: '#00007C',
    icon: 'images/icons/value-icon-1.svg'
  },
  {
    id: '2',
    title: 'Shaurya aur Sahas',
    subtitle: 'Valor and Courage',
    description: 'Face challenges with bravery and determination.',
    color: '#A92121',
    icon: 'images/icons/value-icon-2.svg'
  },
  {
    id: '3',
    title: 'Karuna aur Seva',
    subtitle: 'Compassion and Service',
    description: 'Show kindness and dedicate yourself to serving others.',
    color: '#F18483',
    icon: 'images/icons/value-icon-3.svg'
  },
  {
    id: '4',
    title: 'Satyanishtha aur Shuchita',
    subtitle: 'Truthfulness and Purity',
    description: 'Uphold truth and maintain purity in thoughts and actions.',
    color: '#46B3F6',
    icon: 'images/icons/value-icon-4.svg'
  },
  {
    id: '5',
    title: 'Parishram aur Samarpan',
    subtitle: 'Hard Work and Dedication',
    description: 'Commit fully to your goals through persistent effort.',
    color: '#F7AD41',
    icon: 'images/icons/value-icon-5.svg'
  },
  {
    id: '6',
    title: 'Vividhta aur Ekta',
    subtitle: 'Diversity and Unity',
    description: 'Celebrate differences while maintaining unity and harmony.',
    color: 'linear-gradient(45deg, #3F64B5, #EDE73B, #DC3737)',
    icon: 'images/icons/value-icon-6.svg'
  },
  {
    id: '7',
    title: 'Jignasa aur Navachaar',
    subtitle: 'Curiosity and Innovation',
    description: 'Foster curiosity and embrace innovative thinking.',
    color: '#B701F4',
    icon: 'images/icons/value-icon-7.svg'
  },
  {
    id: '8',
    title: 'Shraddha aur Vishwas',
    subtitle: 'Faith and Belief',
    description: 'Maintain faith in yourself and trust in your journey.',
    color: '#E9BD36',
    icon: 'images/icons/value-icon-8.svg'
  },
  {
    id: '9',
    title: 'Swatantrata aur Kartavya',
    subtitle: 'Freedom and Responsibility',
    description: 'Exercise freedom responsibly with awareness of duties.',
    color: '#2D6C3E',
    icon: 'images/icons/value-icon-9.svg'
  }
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Completed your first quiz',
    icon: '🎯',
    earned: true
  },
  {
    id: '2',
    title: 'Scholar',
    description: 'Scored 90% or above in a quiz',
    icon: '🎓',
    earned: true
  },
  {
    id: '3',
    title: 'Dedicated Learner',
    description: 'Completed 5 quizzes',
    icon: '📚',
    earned: false
  },
  {
    id: '4',
    title: 'Perfect Score',
    description: 'Achieved 100% in any quiz',
    icon: '⭐',
    earned: true
  }
];

export const topPerformers: TopPerformer[] = [
  { rank: 1, name: 'Aarav Sharma', class: '10th A', score: 985 },
  { rank: 2, name: 'Priya Singh', class: '11th B', score: 978 },
  { rank: 3, name: 'Rohit Kumar', class: '10th C', score: 965 },
  { rank: 4, name: 'Ananya Gupta', class: '12th A', score: 952 },
  { rank: 5, name: 'Vikram Yadav', class: '11th A', score: 941 }
];

export const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'What does "Swabhiman" primarily represent in Indian culture?',
    options: [
      'Pride in material possessions',
      'Self-respect and dignity',
      'Competition with others',
      'Individual superiority'
    ],
    correctAnswer: 1,
    level: 'Understanding',
    time: 30
  },
  {
    id: '2',
    question: 'How can one practice "Vinay" (Humility) in daily life?',
    options: [
      'By avoiding eye contact with elders',
      'By never expressing opinions',
      'By listening respectfully and acknowledging others',
      'By always agreeing with everyone'
    ],
    correctAnswer: 2,
    level: 'Beginner',
    time: 45
  },
  {
    id: '3',
    question: 'Which scenario best demonstrates the balance of Swabhiman and Vinay?',
    options: [
      'Refusing help even when needed',
      'Standing up for principles while respecting others\' views',
      'Always putting others before yourself',
      'Never questioning authority'
    ],
    correctAnswer: 1,
    level: 'Advance',
    time: 60
  }
];