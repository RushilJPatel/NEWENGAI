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
    'Junior Year - Fall': [
      { id: '1', title: 'Take PSAT', description: 'Practice for SAT and qualify for National Merit', completed: false, month: 'October' },
      { id: '2', title: 'Start College Research', description: 'Create initial list of 15-20 colleges', completed: false, month: 'September-November' },
      { id: '3', title: 'Meet with Counselor', description: 'Discuss college plans and course selection', completed: false, month: 'November' }
    ],
    'Junior Year - Spring': [
      { id: '4', title: 'Take SAT/ACT', description: 'First official test attempt', completed: false, month: 'March-May' },
      { id: '5', title: 'Visit Colleges', description: 'Tour 3-5 schools during spring break', completed: false, month: 'March-April' },
      { id: '6', title: 'AP Exams', description: 'Prepare and take AP exams', completed: false, month: 'May' },
      { id: '7', title: 'Plan Summer Activities', description: 'Secure internship, job, or volunteer position', completed: false, month: 'April-May' }
    ],
    'Junior Summer': [
      { id: '8', title: 'Retake SAT/ACT', description: 'Improve scores if needed', completed: false, month: 'June-August' },
      { id: '9', title: 'Start College Essay', description: 'Brainstorm and draft Common App essay', completed: false, month: 'July-August' },
      { id: '10', title: 'Finalize College List', description: 'Narrow down to 8-12 schools', completed: false, month: 'July-August' },
      { id: '11', title: 'Create Common App Account', description: 'Set up application portal', completed: false, month: 'August' }
    ],
    'Senior Year - Fall': [
      { id: '12', title: 'Request Recommendations', description: 'Ask 2-3 teachers (by mid-September)', completed: false, month: 'August-September' },
      { id: '13', title: 'Complete Applications', description: 'Fill out all application forms', completed: false, month: 'September-November' },
      { id: '14', title: 'Write Supplemental Essays', description: 'Complete all school-specific essays', completed: false, month: 'October-November' },
      { id: '15', title: 'Submit Early Action/Decision', description: 'Submit EA/ED apps by Nov 1', completed: false, month: 'November 1' },
      { id: '16', title: 'Complete FAFSA', description: 'Submit financial aid application', completed: false, month: 'October-December' }
    ],
    'Senior Year - Winter': [
      { id: '17', title: 'Submit Regular Decision', description: 'Submit RD apps by Jan 1', completed: false, month: 'January 1' },
      { id: '18', title: 'Check Application Status', description: 'Verify all materials received', completed: false, month: 'January' },
      { id: '19', title: 'Send Mid-Year Grades', description: 'Counselor submits mid-year report', completed: false, month: 'January-February' },
      { id: '20', title: 'Await EA/ED Decisions', description: 'Receive early decisions', completed: false, month: 'December-January' }
    ],
    'Senior Year - Spring': [
      { id: '21', title: 'Receive Decisions', description: 'Regular decision notifications', completed: false, month: 'March-April' },
      { id: '22', title: 'Visit Admitted Schools', description: 'Attend admitted student days', completed: false, month: 'April' },
      { id: '23', title: 'Compare Financial Aid', description: 'Review and negotiate offers', completed: false, month: 'April' },
      { id: '24', title: 'Make Final Decision', description: 'Commit to a school by May 1', completed: false, month: 'May 1' },
      { id: '25', title: 'Send Deposit', description: 'Submit enrollment deposit', completed: false, month: 'May 1' }
    ]
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

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

