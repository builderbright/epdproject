import { useState } from 'react';
import { Student, Event, StudentEvent, Submission } from '@/app/types';
import { Trophy, Calendar, History, LogOut, Award, CheckCircle } from 'lucide-react';

interface StudentDashboardProps {
  currentStudent: Student;
  allStudents: Student[];
  events: Event[];
  studentEvents: StudentEvent[];
  onLogout: () => void;
  onParticipate: (eventId: string) => void;
  onSubmitProof: (eventId: string, claimType: 'participated' | 'won', file: File) => void;
}

export function StudentDashboard({
  currentStudent,
  allStudents,
  events,
  studentEvents,
  onLogout,
  onParticipate,
  onSubmitProof,
}: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'announcements' | 'history'>('leaderboard');
  const [participateModal, setParticipateModal] = useState<string | null>(null);
  const [proofModal, setProofModal] = useState<{ eventId: string; claimType: 'participated' | 'won' } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Sort students by points for leaderboard
  const sortedStudents = [...allStudents].sort((a, b) => b.totalPoints - a.totalPoints);
  const currentRank = sortedStudents.findIndex(s => s.id === currentStudent.id) + 1;

  // Get student's participated events
  const myEvents = studentEvents.filter(se => se.studentId === currentStudent.id);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmitProof = () => {
    if (proofModal && selectedFile) {
      onSubmitProof(proofModal.eventId, proofModal.claimType, selectedFile);
      setProofModal(null);
      setSelectedFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <span className="text-lg">{currentStudent.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-xl text-gray-900">{currentStudent.name}</h2>
                <p className="text-sm text-gray-500">{currentStudent.year} • Rank #{currentRank}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-2xl text-blue-600">{currentStudent.totalPoints}</span>
                </div>
                <p className="text-xs text-gray-500">Total Points</p>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm w-fit">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-md transition ${
              activeTab === 'leaderboard'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span>Leaderboard</span>
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-md transition ${
              activeTab === 'announcements'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Announcements</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-md transition ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <History className="w-5 h-5" />
            <span>History</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-4 text-right text-xs text-gray-500 uppercase tracking-wider">
                      Total Points
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedStudents.map((student, index) => (
                    <tr
                      key={student.id}
                      className={student.id === currentStudent.id ? 'bg-blue-50' : 'hover:bg-gray-50'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {index < 3 ? (
                            <Trophy
                              className={`w-6 h-6 ${
                                index === 0
                                  ? 'text-yellow-500'
                                  : index === 1
                                  ? 'text-gray-400'
                                  : 'text-amber-700'
                              }`}
                            />
                          ) : (
                            <span className="text-gray-600 font-medium">{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                            {student.name.charAt(0)}
                          </div>
                          <span className="text-gray-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {student.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-blue-600 font-semibold">{student.totalPoints}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((event) => {
              const categoryColors = {
                hackathon: 'bg-purple-100 text-purple-700',
                competition: 'bg-blue-100 text-blue-700',
                sports: 'bg-green-100 text-green-700',
                cultural: 'bg-pink-100 text-pink-700',
              };

              return (
                <div key={event.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg text-gray-900">{event.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs ${categoryColors[event.category]}`}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-4">
                      <div>
                        <p className="text-xs text-gray-500">Participation</p>
                        <p className="text-blue-600 font-semibold">{event.participationPoints} pts</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Winning</p>
                        <p className="text-blue-600 font-semibold">{event.winningPoints} pts</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setParticipateModal(event.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition"
                  >
                    Participate
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {myEvents.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No participation history yet</p>
                <p className="text-sm text-gray-400 mt-2">Start participating in events to build your portfolio!</p>
              </div>
            ) : (
              myEvents.map((se) => {
                const event = events.find(e => e.id === se.eventId);
                if (!event) return null;

                const points = se.status === 'won' ? event.winningPoints : event.participationPoints;

                return (
                  <div key={`${se.studentId}-${se.eventId}`} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg text-gray-900 mb-1">{event.name}</h3>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className={`px-2 py-1 rounded ${
                            se.status === 'won' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {se.status === 'won' ? 'Winner' : 'Participated'}
                          </span>
                          <span className="text-gray-600">{points} points</span>
                        </div>
                      </div>
                      <div>
                        {se.pointsCollected ? (
                          <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm">Collected</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setProofModal({ eventId: se.eventId, claimType: se.status })}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                          >
                            Collect Points
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Participate Modal */}
      {participateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl text-gray-900 mb-4">Event Registration</h3>
            <p className="text-gray-600 mb-6">
              Confirm your participation in this event. You'll be able to submit proof and collect points after the event.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  onParticipate(participateModal);
                  setParticipateModal(null);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setParticipateModal(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Proof Modal */}
      {proofModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl text-gray-900 mb-4">Submit Proof</h3>
            <p className="text-gray-600 mb-4">
              Upload a certificate, screenshot, or document as proof of your {proofModal.claimType === 'won' ? 'win' : 'participation'}.
            </p>
            <div className="mb-6">
              <label className="block text-sm text-gray-700 mb-2">Upload File</label>
              <input
                type="file"
                onChange={handleFileSelect}
                accept="image/*,.pdf"
                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              />
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-2">Selected: {selectedFile.name}</p>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleSubmitProof}
                disabled={!selectedFile}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setProofModal(null);
                  setSelectedFile(null);
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
