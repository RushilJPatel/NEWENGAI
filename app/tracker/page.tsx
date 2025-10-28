'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Application {
  id: string;
  collegeName: string;
  deadline: string;
  type: 'Early Action' | 'Early Decision' | 'Regular Decision' | 'Rolling';
  status: 'Not Started' | 'In Progress' | 'Submitted' | 'Accepted' | 'Rejected' | 'Waitlisted';
  requirements: {
    essay: boolean;
    recommendations: number;
    supplements: number;
    transcript: boolean;
    testScores: boolean;
  };
  notes: string;
}

export default function ApplicationTracker() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      collegeName: 'Stanford University',
      deadline: '2025-01-05',
      type: 'Regular Decision',
      status: 'In Progress',
      requirements: {
        essay: true,
        recommendations: 2,
        supplements: 3,
        transcript: true,
        testScores: false
      },
      notes: 'Focus on entrepreneurship essay'
    },
    {
      id: '2',
      collegeName: 'MIT',
      deadline: '2025-01-01',
      type: 'Regular Decision',
      status: 'Not Started',
      requirements: {
        essay: true,
        recommendations: 2,
        supplements: 5,
        transcript: true,
        testScores: true
      },
      notes: ''
    }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const getStatusColor = (status: Application['status']) => {
    const colors = {
      'Not Started': 'bg-gray-200 text-gray-800',
      'In Progress': 'bg-yellow-200 text-yellow-800',
      'Submitted': 'bg-blue-200 text-blue-800',
      'Accepted': 'bg-green-200 text-green-800',
      'Rejected': 'bg-red-200 text-red-800',
      'Waitlisted': 'bg-purple-200 text-purple-800'
    };
    return colors[status];
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diff = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-2xl font-bold text-indigo-600">
              🎓 College Planner AI
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/dashboard" className="px-4 py-2 text-gray-600 hover:text-indigo-600">
                💬 AI Chat
              </Link>
              <Link href="/tracker" className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-semibold">
                📋 Tracker
              </Link>
              <Link href="/essays" className="px-4 py-2 text-gray-600 hover:text-indigo-600">
                ✍️ Essays
              </Link>
              <Link href="/timeline" className="px-4 py-2 text-gray-600 hover:text-indigo-600">
                📅 Timeline
              </Link>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📋 Application Tracker</h1>
          <p className="text-gray-600">Track your college applications, deadlines, and requirements all in one place</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-indigo-600">{applications.length}</div>
            <div className="text-gray-600">Total Applications</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-yellow-600">
              {applications.filter(a => a.status === 'In Progress').length}
            </div>
            <div className="text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-blue-600">
              {applications.filter(a => a.status === 'Submitted').length}
            </div>
            <div className="text-gray-600">Submitted</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-green-600">
              {applications.filter(a => a.status === 'Accepted').length}
            </div>
            <div className="text-gray-600">Accepted</div>
          </div>
        </div>

        {/* Add Application Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-lg"
          >
            ➕ Add College Application
          </button>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.map(app => {
            const daysUntil = getDaysUntilDeadline(app.deadline);
            const isUrgent = daysUntil <= 14 && daysUntil > 0;
            const isOverdue = daysUntil < 0;

            return (
              <div key={app.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{app.collegeName}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                        {app.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${isOverdue ? 'text-red-600' : isUrgent ? 'text-orange-600' : 'text-gray-800'}`}>
                      {isOverdue ? 'Overdue!' : `${daysUntil} days`}
                    </div>
                    <div className="text-sm text-gray-600">Deadline: {new Date(app.deadline).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Requirements Checklist */}
                <div className="grid md:grid-cols-5 gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${app.requirements.essay ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-50 border-2 border-gray-300'}`}>
                    <div className="text-sm font-semibold text-gray-700">Personal Essay</div>
                    <div className="text-xs text-gray-600">{app.requirements.essay ? '✓ Required' : 'Not required'}</div>
                  </div>
                  <div className={`p-3 rounded-lg ${app.requirements.recommendations > 0 ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-50 border-2 border-gray-300'}`}>
                    <div className="text-sm font-semibold text-gray-700">Recommendations</div>
                    <div className="text-xs text-gray-600">{app.requirements.recommendations} required</div>
                  </div>
                  <div className={`p-3 rounded-lg ${app.requirements.supplements > 0 ? 'bg-yellow-50 border-2 border-yellow-500' : 'bg-gray-50 border-2 border-gray-300'}`}>
                    <div className="text-sm font-semibold text-gray-700">Supplements</div>
                    <div className="text-xs text-gray-600">{app.requirements.supplements} essays</div>
                  </div>
                  <div className={`p-3 rounded-lg ${app.requirements.transcript ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-50 border-2 border-gray-300'}`}>
                    <div className="text-sm font-semibold text-gray-700">Transcript</div>
                    <div className="text-xs text-gray-600">{app.requirements.transcript ? '✓ Required' : 'Not required'}</div>
                  </div>
                  <div className={`p-3 rounded-lg ${app.requirements.testScores ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 border-2 border-gray-300'}`}>
                    <div className="text-sm font-semibold text-gray-700">Test Scores</div>
                    <div className="text-xs text-gray-600">{app.requirements.testScores ? 'Required' : 'Optional'}</div>
                  </div>
                </div>

                {app.notes && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                    <div className="text-sm font-semibold text-gray-700 mb-1">📝 Notes</div>
                    <div className="text-sm text-gray-600">{app.notes}</div>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all text-sm">
                    Update Status
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all text-sm">
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all text-sm">
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {applications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No applications yet</h3>
            <p className="text-gray-600 mb-6">Start tracking your college applications</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
            >
              Add Your First Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

