import { useState } from 'react';
import { LoginScreen } from '@/app/components/LoginScreen';
import { StudentDashboard } from '@/app/components/StudentDashboard';
import { AdminDashboard } from '@/app/components/AdminDashboard';
import { UserRole, Student, Event, StudentEvent, Submission } from '@/app/types';
import { initialStudents, initialEvents, initialStudentEvents, initialSubmissions } from '@/app/data/mockData';

function App() {
  const [currentUser, setCurrentUser] = useState<{ role: UserRole; id: string }>({
    role: null,
    id: '',
  });
  
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [studentEvents, setStudentEvents] = useState<StudentEvent[]>(initialStudentEvents);
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);

  const handleLogin = (role: UserRole, userId: string) => {
    setCurrentUser({ role, id: userId });
  };

  const handleLogout = () => {
    setCurrentUser({ role: null, id: '' });
  };

  const handleParticipate = (eventId: string) => {
    if (!currentUser.id) return;

    // Add a new student event participation
    const newParticipation: StudentEvent = {
      studentId: currentUser.id,
      eventId,
      status: 'participated',
      pointsCollected: false,
    };

    setStudentEvents([...studentEvents, newParticipation]);
  };

  const handleSubmitProof = (eventId: string, claimType: 'participated' | 'won', file: File) => {
    if (!currentUser.id) return;

    const student = students.find(s => s.id === currentUser.id);
    const event = events.find(e => e.id === eventId);
    
    if (!student || !event) return;

    const newSubmission: Submission = {
      id: `sub-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      eventId: event.id,
      eventName: event.name,
      claimType,
      proofFile: file.name,
      status: 'pending',
      submittedAt: new Date(),
    };

    setSubmissions([...submissions, newSubmission]);
  };

  const handleCreateAnnouncement = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `e${events.length + 1}`,
    };

    setEvents([...events, newEvent]);
  };

  const handleApproveSubmission = (submissionId: string) => {
    const submission = submissions.find(s => s.id === submissionId);
    if (!submission) return;

    const event = events.find(e => e.id === submission.eventId);
    if (!event) return;

    // Update submission status
    setSubmissions(submissions.map(s =>
      s.id === submissionId ? { ...s, status: 'approved' as const } : s
    ));

    // Update student points
    const pointsToAdd = submission.claimType === 'won'
      ? event.winningPoints
      : event.participationPoints;

    setStudents(students.map(s =>
      s.id === submission.studentId
        ? { ...s, totalPoints: s.totalPoints + pointsToAdd }
        : s
    ));

    // Mark as collected in student events
    setStudentEvents(studentEvents.map(se =>
      se.studentId === submission.studentId && se.eventId === submission.eventId
        ? { ...se, pointsCollected: true, status: submission.claimType === 'won' ? 'won' : 'participated' }
        : se
    ));
  };

  const handleRejectSubmission = (submissionId: string) => {
    setSubmissions(submissions.map(s =>
      s.id === submissionId ? { ...s, status: 'rejected' as const } : s
    ));
  };

  // Get current student data
  const currentStudent = students.find(s => s.id === currentUser.id);

  if (!currentUser.role) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentUser.role === 'student' && currentStudent) {
    return (
      <StudentDashboard
        currentStudent={currentStudent}
        allStudents={students}
        events={events}
        studentEvents={studentEvents}
        onLogout={handleLogout}
        onParticipate={handleParticipate}
        onSubmitProof={handleSubmitProof}
      />
    );
  }

  if (currentUser.role === 'admin') {
    return (
      <AdminDashboard
        allStudents={students}
        events={events}
        submissions={submissions}
        onLogout={handleLogout}
        onCreateAnnouncement={handleCreateAnnouncement}
        onApproveSubmission={handleApproveSubmission}
        onRejectSubmission={handleRejectSubmission}
      />
    );
  }

  return null;
}

export default App;
