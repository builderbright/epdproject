export interface Student {
  id: string;
  name: string;
  email: string;
  year: string;
  totalPoints: number;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  participationPoints: number;
  winningPoints: number;
  category: 'hackathon' | 'competition' | 'sports' | 'cultural';
}

export interface StudentEvent {
  studentId: string;
  eventId: string;
  status: 'participated' | 'won';
  pointsCollected: boolean;
  proofFile?: File | null;
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  eventId: string;
  eventName: string;
  claimType: 'participated' | 'won';
  proofFile: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

export type UserRole = 'student' | 'admin' | null;