'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '../components/Logo';
import { FaComments, FaClipboardList, FaPencilAlt, FaCalendarAlt, FaBook, FaCheckCircle, FaRegCircle, FaGraduationCap } from 'react-icons/fa';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  month: string;
}

type GradeLevel = '9' | '10' | '11' | '12';

export default function Timeline() {
  const { data: session } = useSession();
  const router = useRouter();
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('12');
  const [tasks, setTasks] = useState<{ [grade: string]: { [key: string]: Task[] } }>({});

  const gradeTimelines = {
    '9': {
      'Fall - Freshman Year': [
        { id: '9-1', title: 'Adjust to High School', description: 'Focus on strong grades and time management', completed: false, month: 'September-October' },
        { id: '9-2', title: 'Join Clubs & Activities', description: 'Explore extracurriculars that interest you', completed: false, month: 'September' },
        { id: '9-3', title: 'Build Study Habits', description: 'Establish good homework routines and organizational skills', completed: false, month: 'September-November' },
        { id: '9-4', title: 'Meet with Counselor', description: 'Introduce yourself and discuss 4-year plan', completed: false, month: 'October' },
        { id: '9-5', title: 'Consider Honors Courses', description: 'Talk to teachers about honors options for next year', completed: false, month: 'November' }
      ],
      'Winter - Freshman Year': [
        { id: '9-6', title: 'Maintain Strong GPA', description: 'Aim for As and Bs - freshman year counts!', completed: false, month: 'December-February' },
        { id: '9-7', title: 'Seek Leadership Roles', description: 'Look for opportunities in clubs you enjoy', completed: false, month: 'January' },
        { id: '9-8', title: 'Start Reading Habit', description: 'Read challenging books to build vocabulary', completed: false, month: 'December-February' },
        { id: '9-9', title: 'Explore Interests', description: 'Try new activities to find your passions', completed: false, month: 'January-February' }
      ],
      'Spring - Freshman Year': [
        { id: '9-10', title: 'Plan Sophomore Schedule', description: 'Choose courses for next year (consider 1-2 APs)', completed: false, month: 'March' },
        { id: '9-11', title: 'Find Summer Activities', description: 'Look for camps, jobs, or volunteer opportunities', completed: false, month: 'March-April' },
        { id: '9-12', title: 'Build Teacher Relationships', description: 'Participate in class and ask questions', completed: false, month: 'April-May' },
        { id: '9-13', title: 'Reflect on Year', description: 'What activities do you want to continue?', completed: false, month: 'May' }
      ],
      'Summer After Freshman Year': [
        { id: '9-14', title: 'Productive Summer', description: 'Job, volunteer, camp, or academic program', completed: false, month: 'June-August' },
        { id: '9-15', title: 'Read for Fun', description: 'Continue building vocabulary and knowledge', completed: false, month: 'June-August' },
        { id: '9-16', title: 'Visit a College', description: 'Tour local universities to get inspired', completed: false, month: 'July' },
        { id: '9-17', title: 'Prep for Sophomore Year', description: 'Get ready for increased academic rigor', completed: false, month: 'August' }
      ]
    },
    '10': {
      'Fall - Sophomore Year': [
        { id: '10-1', title: 'Excel in Harder Classes', description: 'Maintain strong GPA with increased rigor', completed: false, month: 'September-November' },
        { id: '10-2', title: 'Deepen Extracurriculars', description: 'Show commitment and seek leadership', completed: false, month: 'September' },
        { id: '10-3', title: 'PSAT 10 (Optional)', description: 'Practice test - good for prep and scholarships', completed: false, month: 'October' },
        { id: '10-4', title: 'Meet with Counselor', description: 'Discuss junior year course selection', completed: false, month: 'October' },
        { id: '10-5', title: 'Research Colleges', description: 'Start learning about different types of schools', completed: false, month: 'November' }
      ],
      'Winter - Sophomore Year': [
        { id: '10-6', title: 'Consider SAT/ACT Prep', description: 'Start light preparation if interested', completed: false, month: 'December-February' },
        { id: '10-7', title: 'Maintain Activities', description: 'Continue showing dedication to commitments', completed: false, month: 'December-February' },
        { id: '10-8', title: 'Build Academic Skills', description: 'Focus on writing, critical thinking, analysis', completed: false, month: 'January-February' },
        { id: '10-9', title: 'Explore Career Interests', description: 'Job shadowing or informational interviews', completed: false, month: 'January' }
      ],
      'Spring - Sophomore Year': [
        { id: '10-10', title: 'Plan Junior Schedule', description: 'Choose 2-4 AP/Honors courses strategically', completed: false, month: 'March' },
        { id: '10-11', title: 'Take AP Exams (if taking AP classes)', description: 'Prep for any APs you\'re currently taking', completed: false, month: 'May' },
        { id: '10-12', title: 'Plan Summer Activities', description: 'Summer programs, jobs, or meaningful projects', completed: false, month: 'March-April' },
        { id: '10-13', title: 'Start College List', description: 'Make preliminary list of 15-20 colleges', completed: false, month: 'April' },
        { id: '10-14', title: 'Strengthen Leadership', description: 'Run for club officer positions', completed: false, month: 'April-May' }
      ],
      'Summer After Sophomore Year': [
        { id: '10-15', title: 'Meaningful Summer Experience', description: 'Competitive program, research, or deep commitment', completed: false, month: 'June-August' },
        { id: '10-16', title: 'College Tours', description: 'Visit 5-10 colleges of different types', completed: false, month: 'June-August' },
        { id: '10-17', title: 'SAT/ACT Prep', description: 'Serious test prep before junior year', completed: false, month: 'June-August' },
        { id: '10-18', title: 'Start Essay Brainstorming', description: 'Think about potential topics', completed: false, month: 'August' }
      ]
    },
    '11': {
      'Fall - Junior Year (CRITICAL!)': [
        { id: '11-1', title: 'Crush Your Classes', description: 'Most important year for GPA!', completed: false, month: 'September-December' },
        { id: '11-2', title: 'Lead Extracurriculars', description: 'Demonstrate impact and leadership', completed: false, month: 'September-December' },
        { id: '11-3', title: 'PSAT/NMSQT', description: 'Qualifies for National Merit Scholarships!', completed: false, month: 'October' },
        { id: '11-4', title: 'SAT/ACT (First Attempt)', description: 'Take in October, November, or December', completed: false, month: 'October-December' },
        { id: '11-5', title: 'Refine College List', description: 'Research fit, majors, and requirements', completed: false, month: 'September-November' },
        { id: '11-6', title: 'College Visits', description: 'Visit top choice schools if possible', completed: false, month: 'October-November' },
        { id: '11-7', title: 'Build Teacher Relationships', description: 'These will be your recommenders!', completed: false, month: 'September-December' }
      ],
      'Winter - Junior Year': [
        { id: '11-8', title: 'Maintain Strong Grades', description: 'Don\'t let senioritis start early!', completed: false, month: 'January-March' },
        { id: '11-9', title: 'SAT/ACT (Second Attempt)', description: 'Improve your score', completed: false, month: 'March' },
        { id: '11-10', title: 'Start Essay Drafts', description: 'Begin Common App essay brainstorming', completed: false, month: 'February-March' },
        { id: '11-11', title: 'Attend College Fairs', description: 'Meet representatives and ask questions', completed: false, month: 'February' },
        { id: '11-12', title: 'Financial Aid Research', description: 'Learn about costs, scholarships, FAFSA', completed: false, month: 'January-March' }
      ],
      'Spring - Junior Year': [
        { id: '11-13', title: 'Plan Senior Schedule', description: 'Stay rigorous - colleges will see this!', completed: false, month: 'March' },
        { id: '11-14', title: 'Take AP Exams', description: 'Prepare thoroughly - scores matter!', completed: false, month: 'May' },
        { id: '11-15', title: 'SAT/ACT (Final Attempt)', description: 'Last chance for scores', completed: false, month: 'May-June' },
        { id: '11-16', title: 'Ask for Recommendations', description: 'Request from 2-3 teachers BEFORE summer', completed: false, month: 'May' },
        { id: '11-17', title: 'Create Resume/Brag Sheet', description: 'List all activities, honors, experiences', completed: false, month: 'April-May' },
        { id: '11-18', title: 'Narrow College List', description: 'Finalize list of 8-12 schools', completed: false, month: 'May' }
      ],
      'Summer Before Senior Year': [
        { id: '11-19', title: 'Work on Essays', description: 'Complete Common App essay and supplements', completed: false, month: 'June-August' },
        { id: '11-20', title: 'Final College Visits', description: 'Visit top choices and interview if offered', completed: false, month: 'June-July' },
        { id: '11-21', title: 'Fill Out Applications', description: 'Complete Common App forms and activities section', completed: false, month: 'July-August' },
        { id: '11-22', title: 'Research Scholarships', description: 'Find and prepare for scholarship opportunities', completed: false, month: 'June-August' },
        { id: '11-23', title: 'Prep Application Materials', description: 'Transcript requests, test score sends, portfolio', completed: false, month: 'August' }
      ]
    },
    '12': {
      'Fall - Senior Year (CRUNCH TIME!)': [
        { id: '12-1', title: 'Request Recommendations (if not done)', description: 'Ask teachers ASAP - they\'re busy!', completed: false, month: 'September' },
        { id: '12-2', title: 'Finalize College List', description: 'Confirm 8-12 schools: reach, target, safety', completed: false, month: 'September' },
        { id: '12-3', title: 'Complete Common App', description: 'Fill out all forms, activities, essay', completed: false, month: 'September-October' },
        { id: '12-4', title: 'Write Supplemental Essays', description: 'School-specific essays (Why Us? etc.)', completed: false, month: 'September-October' },
        { id: '12-5', title: 'Request Transcripts', description: 'Ask counselor to send to colleges', completed: false, month: 'October' },
        { id: '12-6', title: 'Complete FAFSA', description: 'Opens October 1st - submit early!', completed: false, month: 'October' },
        { id: '12-7', title: 'CSS Profile (if needed)', description: 'For private school financial aid', completed: false, month: 'October' },
        { id: '12-8', title: 'Submit EA/ED Applications', description: 'DEADLINE: November 1st', completed: false, month: 'November 1' },
        { id: '12-9', title: 'Submit UC Applications', description: 'DEADLINE: November 30th', completed: false, month: 'November 30' }
      ],
      'Winter - Senior Year': [
        { id: '12-10', title: 'Submit Regular Decision Apps', description: 'DEADLINES: January 1-15', completed: false, month: 'January 1-15' },
        { id: '12-11', title: 'Check Application Portals', description: 'Verify all materials received', completed: false, month: 'January' },
        { id: '12-12', title: 'Complete Interviews', description: 'Alumni or admissions interviews', completed: false, month: 'December-February' },
        { id: '12-13', title: 'Receive EA/ED Decisions', description: 'Mid-December results', completed: false, month: 'December 15' },
        { id: '12-14', title: 'Send Mid-Year Grades', description: 'Counselor sends first semester transcript', completed: false, month: 'January-February' },
        { id: '12-15', title: 'Apply to More Scholarships', description: 'Local and national opportunities', completed: false, month: 'January-February' },
        { id: '12-16', title: 'Maintain Grades!', description: 'Avoid senioritis - offers can be rescinded', completed: false, month: 'January-March' }
      ],
      'Spring - Senior Year (DECISION TIME!)': [
        { id: '12-17', title: 'Receive Regular Decisions', description: 'Most come late March', completed: false, month: 'March 20-April 1' },
        { id: '12-18', title: 'Compare Financial Aid Offers', description: 'Calculate true cost of each school', completed: false, month: 'April 1-15' },
        { id: '12-19', title: 'Visit Admitted Schools', description: 'Attend accepted student days', completed: false, month: 'April 1-25' },
        { id: '12-20', title: 'Make Final Decision', description: 'Choose your college!', completed: false, month: 'April 25-30' },
        { id: '12-21', title: 'Submit Enrollment Deposit', description: 'DEADLINE: May 1st', completed: false, month: 'May 1' },
        { id: '12-22', title: 'Decline Other Offers', description: 'Free up spots for waitlisted students', completed: false, month: 'May 1-5' },
        { id: '12-23', title: 'Submit Housing Forms', description: 'Dorm preferences and roommate surveys', completed: false, month: 'May' },
        { id: '12-24', title: 'Send Final Transcript', description: 'After graduation - maintain good grades!', completed: false, month: 'June' }
      ],
      'Summer After Senior Year': [
        { id: '12-25', title: 'Attend Orientation', description: 'Register for classes, meet people', completed: false, month: 'June-July' },
        { id: '12-26', title: 'Complete Housing Registration', description: 'Finalize dorm and roommate', completed: false, month: 'June' },
        { id: '12-27', title: 'Buy Supplies', description: 'Dorm essentials, school supplies', completed: false, month: 'July-August' },
        { id: '12-28', title: 'Complete Health Forms', description: 'Immunizations and health insurance', completed: false, month: 'June-July' },
        { id: '12-29', title: 'Connect with Roommate', description: 'Coordinate who brings what', completed: false, month: 'July-August' },
        { id: '12-30', title: 'Prepare to Move In', description: 'Get excited for college!', completed: false, month: 'August' }
      ]
    }
  };

  useEffect(() => {
    // Auth temporarily disabled
    // if (status === 'unauthenticated') {
    //   router.push('/login');
    // }
    // Load saved grade level and progress
    const savedGrade = localStorage.getItem('timeline_grade');
    const savedTasks = localStorage.getItem('timeline_tasks');
    
    if (savedGrade) {
      setGradeLevel(savedGrade as GradeLevel);
    }
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Initialize with default tasks
      const initialTasks: any = {};
      Object.keys(gradeTimelines).forEach(grade => {
        initialTasks[grade] = gradeTimelines[grade as GradeLevel];
      });
      setTasks(initialTasks);
    }
  }, []); // Auth disabled, removed dependencies

  // Save to localStorage whenever grade or tasks change
  useEffect(() => {
    localStorage.setItem('timeline_grade', gradeLevel);
    if (Object.keys(tasks).length > 0) {
      localStorage.setItem('timeline_tasks', JSON.stringify(tasks));
    }
  }, [gradeLevel, tasks]);

  const toggleTask = (sectionKey: string, taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [gradeLevel]: {
        ...prev[gradeLevel],
        [sectionKey]: prev[gradeLevel][sectionKey].map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      }
    }));
  };

  const getSectionProgress = (sectionTasks: Task[]) => {
    const completed = sectionTasks.filter(t => t.completed).length;
    const total = sectionTasks.length;
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  const currentTasks = tasks[gradeLevel] || gradeTimelines[gradeLevel];
  const totalTasks = Object.values(currentTasks).flat().length;
  const completedTasks = Object.values(currentTasks).flat().filter(t => t.completed).length;
  const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Auth loading check disabled
  // if (status === 'loading') {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  // }

  const gradeLevelNames = {
    '9': 'Freshman (9th Grade)',
    '10': 'Sophomore (10th Grade)',
    '11': 'Junior (11th Grade)',
    '12': 'Senior (12th Grade)'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
              <Logo size={32} />
              <span>College Compass</span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600">
                <FaComments /> AI Chat
              </Link>
              <Link href="/tracker" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600">
                <FaClipboardList /> Tracker
              </Link>
              <Link href="/essays" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600">
                <FaPencilAlt /> Essays
              </Link>
              <Link href="/timeline" className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-semibold">
                <FaCalendarAlt /> Timeline
              </Link>
              <Link href="/resources" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600">
                <FaBook /> Resources
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <FaCalendarAlt className="text-indigo-600" /> College Application Timeline
          </h1>
          <p className="text-gray-600">Your personalized roadmap based on your grade level</p>
        </div>

        {/* Grade Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FaGraduationCap className="text-2xl text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">Select Your Grade Level</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['9', '10', '11', '12'] as GradeLevel[]).map(grade => (
              <button
                key={grade}
                onClick={() => setGradeLevel(grade)}
                className={`p-4 rounded-lg border-2 transition-all text-center ${
                  gradeLevel === grade
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold shadow-md'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300'
                }`}
              >
                <div className="text-3xl font-bold mb-1">{grade}th</div>
                <div className="text-sm">{grade === '9' ? 'Freshman' : grade === '10' ? 'Sophomore' : grade === '11' ? 'Junior' : 'Senior'}</div>
              </button>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <p className="text-blue-800 font-semibold">Currently viewing: {gradeLevelNames[gradeLevel]}</p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Progress</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Overall Completion</span>
            <span className="text-2xl font-bold text-indigo-600">{Math.round(overallProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedTasks} of {totalTasks} tasks completed</p>
        </div>

        {/* Timeline Sections */}
        <div className="space-y-8">
          {Object.entries(currentTasks).map(([section, sectionTasks]) => {
            const progress = getSectionProgress(sectionTasks);
            const isUrgent = section.includes('CRUNCH') || section.includes('CRITICAL') || section.includes('DECISION');
            
            return (
              <div key={section} className={`bg-white rounded-xl shadow-lg p-6 ${isUrgent ? 'border-4 border-red-500' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-2xl font-bold ${isUrgent ? 'text-red-600' : 'text-gray-800'}`}>
                    {isUrgent && '⚠️ '}{section}
                  </h2>
                  <span className="text-lg font-semibold text-indigo-600">
                    {progress.completed}/{progress.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
                <div className="space-y-3">
                  {sectionTasks.map(task => (
                    <div
                      key={task.id}
                      className={`flex items-start p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        task.completed
                          ? 'bg-green-50 border-green-300'
                          : 'bg-gray-50 border-gray-200 hover:border-indigo-300'
                      }`}
                      onClick={() => toggleTask(section, task.id)}
                    >
                      <div className={`flex-shrink-0 mr-4 text-2xl ${
                        task.completed ? 'text-green-500' : 'text-gray-400'
                      }`}>
                        {task.completed ? <FaCheckCircle /> : <FaRegCircle />}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold text-lg ${task.completed ? 'text-gray-600 line-through' : 'text-gray-800'}`}>
                          {task.title}
                        </h3>
                        <p className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-600'}`}>
                          {task.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">📅 {task.month}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Help CTA */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Need Personalized Guidance?</h3>
          <p className="text-xl mb-6 opacity-90">Our AI advisor can help you create a custom plan based on your goals!</p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-all shadow-lg transform hover:scale-105"
          >
            Chat with AI Advisor →
          </Link>
        </div>
      </div>
    </div>
  );
}
