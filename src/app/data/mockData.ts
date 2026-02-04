import { Student, Event, StudentEvent, Submission } from '@/app/types';

export const initialStudents: Student[] = [
  { id: 's1', name: 'Bhawesh joshi', email: 'emily.chen@college.edu', year: '3rd Year', totalPoints: 450 },
  { id: 's2', name: 'Rahul Sharma', email: 'michael.r@college.edu', year: '2nd Year', totalPoints: 380 },
  { id: 's3', name: 'Priya Rai', email: 'sarah.t@college.edu', year: '4th Year', totalPoints: 520 },
  { id: 's4', name: 'Amit Patel', email: 'david.kim@college.edu', year: '1st Year', totalPoints: 290 },
  { id: 's5', name: 'Devkaran', email: 'jessica.p@college.edu', year: '3rd Year', totalPoints: 410 },
  { id: 's6', name: 'Piyush', email: 'alex.j@college.edu', year: '2nd Year', totalPoints: 340 },
  { id: 's7', name: 'Deepanshu', email: 'olivia.m@college.edu', year: '4th Year', totalPoints: 480 },
  { id: 's8', name: 'Raj shristava', email: 'daniel.lee@college.edu', year: '3rd Year', totalPoints: 360 },
];

export const initialEvents: Event[] = [
  {
    id: 'e1',
    name: 'Spring Hackathon 2026',
    description: '48-hour coding marathon to build innovative solutions for real-world problems.',
    participationPoints: 50,
    winningPoints: 150,
    category: 'hackathon',
  },
  {
    id: 'e2',
    name: 'Data Science Competition',
    description: 'Analyze datasets and present insights using advanced analytics techniques.',
    participationPoints: 40,
    winningPoints: 120,
    category: 'competition',
  },
  {
    id: 'e3',
    name: 'Inter-College Basketball Tournament',
    description: 'Represent your college in the annual basketball championship.',
    participationPoints: 30,
    winningPoints: 100,
    category: 'sports',
  },
  {
    id: 'e4',
    name: 'Annual Cultural Fest',
    description: 'Showcase your artistic talents in music, dance, drama, and visual arts.',
    participationPoints: 25,
    winningPoints: 80,
    category: 'cultural',
  },
  {
    id: 'e5',
    name: 'Innovation Challenge',
    description: 'Present your innovative ideas to solve campus-wide challenges.',
    participationPoints: 45,
    winningPoints: 130,
    category: 'competition',
  },
  {
    id: 'e6',
    name: 'Debate Championship',
    description: 'Engage in thought-provoking debates on contemporary issues.',
    participationPoints: 35,
    winningPoints: 110,
    category: 'competition',
  },
];

export const initialStudentEvents: StudentEvent[] = [
  { studentId: 's1', eventId: 'e1', status: 'participated', pointsCollected: true },
  { studentId: 's1', eventId: 'e2', status: 'won', pointsCollected: true },
  { studentId: 's1', eventId: 'e3', status: 'participated', pointsCollected: false },
  { studentId: 's2', eventId: 'e4', status: 'participated', pointsCollected: true },
  { studentId: 's3', eventId: 'e1', status: 'won', pointsCollected: true },
];

export const initialSubmissions: Submission[] = [];
