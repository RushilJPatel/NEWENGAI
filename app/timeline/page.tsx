'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  month: string;
}

export default function Timeline() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
    'NOW - October 2025': [
      { id: '1', title: 'Request Recommendations', description: 'Ask 2-3 teachers NOW if applying early (due by Oct 20)', completed: false, month: 'October 15, 2025' },
      { id: '2', title: 'Complete Applications', description: 'Fill out all Common App forms', completed: false, month: 'October 15-25, 2025' },
      { id: '3', title: 'Write Supplemental Essays', description: 'Complete all school-specific essays for EA/ED', completed: false, month: 'October 20-30, 2025' },
      { id: '4', title: 'Complete FAFSA', description: 'FAFSA opens October 1st - submit ASAP', completed: false, month: 'October 1-31, 2025' },
      { id: '5', title: 'CSS Profile (if needed)', description: 'Submit CSS Profile for private schools', completed: false, month: 'October 15-31, 2025' }
    ],
    'November 2025 - URGENT': [
      { id: '6', title: 'Submit Early Action/Decision', description: 'DEADLINE: November 1, 2025 - TONIGHT if Oct 31!', completed: false, month: 'November 1, 2025' },
      { id: '7', title: 'UC Applications Due', description: 'DEADLINE: November 30, 2025 for all UC schools', completed: false, month: 'November 30, 2025' },
      { id: '8', title: 'Check Application Status', description: 'Verify all materials submitted and received', completed: false, month: 'November 5-10, 2025' },
      { id: '9', title: 'Start Regular Decision Apps', description: 'Begin non-EA/ED applications', completed: false, month: 'November 10-30, 2025' }
    ],
    'December 2025': [
      { id: '10', title: 'Submit More Applications', description: 'Complete additional regular decision apps', completed: false, month: 'December 1-20, 2025' },
      { id: '11', title: 'Await EA/ED Decisions', description: 'Decisions release mid-December', completed: false, month: 'December 15, 2025' },
      { id: '12', title: 'Send Mid-Year Grades', description: 'Request counselor to send after semester ends', completed: false, month: 'December 20-31, 2025' },
      { id: '13', title: 'Finalize RD List', description: 'Adjust list based on EA/ED results', completed: false, month: 'December 16-31, 2025' }
    ],
    'January 2026': [
      { id: '14', title: 'Submit Regular Decision', description: 'MOST DEADLINES: January 1-15, 2026', completed: false, month: 'January 1-15, 2026' },
      { id: '15', title: 'Check Application Status', description: 'Verify all RD materials received', completed: false, month: 'January 10-20, 2026' },
      { id: '16', title: 'Update Schools on Achievements', description: 'Send updates on new awards/accomplishments', completed: false, month: 'January 15-31, 2026' },
      { id: '17', title: 'Interviews', description: 'Complete alumni or admissions interviews', completed: false, month: 'January-February 2026' }
    ],
    'February-March 2026': [
      { id: '18', title: 'Send Mid-Year Report', description: 'Counselor submits mid-year grades', completed: false, month: 'February 1-15, 2026' },
      { id: '19', title: 'Review Financial Aid Awards', description: 'Check student portals for aid packages', completed: false, month: 'March 1-31, 2026' },
      { id: '20', title: 'Start Receiving Decisions', description: 'Regular decisions release late March', completed: false, month: 'March 20-31, 2026' },
      { id: '21', title: 'Plan Campus Visits', description: 'Schedule admitted student day visits', completed: false, month: 'March 25-31, 2026' }
    ],
    'April 2026 - DECISION TIME': [
      { id: '22', title: 'Receive All Decisions', description: 'Most decisions by early April', completed: false, month: 'April 1-5, 2026' },
      { id: '23', title: 'Visit Admitted Schools', description: 'Attend admitted student days (book now!)', completed: false, month: 'April 5-25, 2026' },
      { id: '24', title: 'Compare Financial Aid', description: 'Review and negotiate offers if needed', completed: false, month: 'April 1-25, 2026' },
      { id: '25', title: 'Make Final Decision', description: 'DEADLINE: May 1, 2026 - National Decision Day', completed: false, month: 'April 28, 2026' }
    ],
    'May 2026 - COMMIT!': [
      { id: '26', title: 'Submit Enrollment Deposit', description: 'FINAL DEADLINE: May 1, 2026', completed: false, month: 'May 1, 2026' },
      { id: '27', title: 'Decline Other Offers', description: 'Withdraw from waitlists and other schools', completed: false, month: 'May 1-5, 2026' },
      { id: '28', title: 'Submit Housing Forms', description: 'Complete housing applications', completed: false, month: 'May 5-15, 2026' },
      { id: '29', title: 'Register for Orientation', description: 'Sign up for summer orientation', completed: false, month: 'May 10-31, 2026' }
    ]
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    // Load saved progress from localStorage
    const saved = localStorage.getItem('timeline_progress');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, [status, router]);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (Object.keys(tasks).length > 0) {
      localStorage.setItem('timeline_progress', JSON.stringify(tasks));
    }
  }, [tasks]);

  const toggleTask = (sectionKey: string, taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const getSectionProgress = (sectionTasks: Task[]) => {
    const completed = sectionTasks.filter(t => t.completed).length;
    const total = sectionTasks.length;
    return { completed, total, percentage: (completed / total) * 100 };
  };

  const totalTasks = Object.values(tasks).flat().length;
  const completedTasks = Object.values(tasks).flat().filter(t => t.completed).length;
  const overallProgress = (completedTasks / totalTasks) * 100;

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
              <Link href="/tracker" className="px-4 py-2 text-gray-600 hover:text-indigo-600">
                📋 Tracker
              </Link>
              <Link href="/essays" className="px-4 py-2 text-gray-600 hover:text-indigo-600">
                ✍️ Essays
              </Link>
              <Link href="/timeline" className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-semibold">
                📅 Timeline
              </Link>
              <Link href="/resources" className="px-4 py-2 text-gray-600 hover:text-indigo-600">
                📚 Resources
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📅 College Application Timeline</h1>
          <p className="text-gray-600">Stay on track with this comprehensive checklist for your college journey</p>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Overall Progress</h2>
            <span className="text-3xl font-bold text-indigo-600">{Math.round(overallProgress)}%</span>
          </div>
          <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="mt-4 text-gray-600 text-center">
            {completedTasks} of {totalTasks} tasks completed
          </div>
        </div>

        {/* Timeline Sections */}
        <div className="space-y-8">
          {Object.entries(tasks).map(([sectionKey, sectionTasks]) => {
            const progress = getSectionProgress(sectionTasks);
            return (
              <div key={sectionKey} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{sectionKey}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      {progress.completed}/{progress.total}
                    </span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {sectionTasks.map(task => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        task.completed
                          ? 'bg-green-50 border-green-500'
                          : 'bg-gray-50 border-gray-300 hover:border-indigo-400'
                      }`}
                      onClick={() => toggleTask(sectionKey, task.id)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                              task.completed
                                ? 'bg-green-500 border-green-500'
                                : 'bg-white border-gray-300'
                            }`}
                          >
                            {task.completed && <span className="text-white text-sm">✓</span>}
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className={`font-bold ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                {task.title}
                              </h4>
                              <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                                {task.description}
                              </p>
                            </div>
                            <span className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                              task.completed
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {task.month}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-lg p-8 border-2 border-yellow-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Pro Tips</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-yellow-600 mr-3 text-xl">⭐</span>
              <span className="text-gray-700">Start early! Don't wait until senior year to begin your college search.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-3 text-xl">⭐</span>
              <span className="text-gray-700">Keep a folder (digital or physical) with all college materials in one place.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-3 text-xl">⭐</span>
              <span className="text-gray-700">Set reminders for all important deadlines in your phone or calendar.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-3 text-xl">⭐</span>
              <span className="text-gray-700">Ask for recommendation letters at least 4-6 weeks before deadlines.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-3 text-xl">⭐</span>
              <span className="text-gray-700">Have multiple people proofread your essays before submitting.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

