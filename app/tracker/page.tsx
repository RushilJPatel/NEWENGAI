'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '../components/Logo';
import { FaComments, FaClipboardList, FaPencilAlt, FaCalendarAlt, FaBook, FaPlus, FaTimes, FaCheck, FaEdit, FaTrash, FaCalendar, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

interface Checklist {
  personalEssay: {
    brainstorm: boolean;
    firstDraft: boolean;
    revised: boolean;
    proofread: boolean;
    submitted: boolean;
  };
  supplements: {
    outlined: boolean;
    drafted: boolean;
    revised: boolean;
    submitted: boolean;
  };
  recommendations: {
    teachersAsked: boolean;
    bragSheetProvided: boolean;
    followedUp: boolean;
    submitted: boolean;
  };
  transcript: {
    requested: boolean;
    reviewed: boolean;
    sent: boolean;
  };
  testScores: {
    scoresSent: boolean;
    confirmed: boolean;
  };
  documents: {
    activityList: boolean;
    honorsList: boolean;
    additionalInfo: boolean;
  };
  financial: {
    fafsa: boolean;
    cssProfile: boolean;
    schoolFinancialForm: boolean;
  };
  submission: {
    applicationReviewed: boolean;
    feeWaiverApplied: boolean;
    submitted: boolean;
    confirmationReceived: boolean;
    portalCreated: boolean;
  };
}

interface Application {
  id: string;
  collegeName: string;
  deadline: string;
  type: 'Early Action' | 'Early Decision' | 'Regular Decision' | 'Rolling' | 'ED2';
  status: 'Not Started' | 'In Progress' | 'Submitted' | 'Accepted' | 'Denied' | 'Waitlisted' | 'Deferred';
  requirements: {
    personalEssay: boolean;
    recommendations: number;
    supplements: number;
    transcript: boolean;
    testScores: 'Required' | 'Optional' | 'Test-Blind';
  };
  checklist: Checklist;
  notes: string;
  importantDates: {
    transcriptDeadline?: string;
    recommendationDeadline?: string;
    testScoreDeadline?: string;
    financialAidDeadline?: string;
  };
}

export default function ApplicationTracker() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showCollegeModal, setShowCollegeModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [colleges, setColleges] = useState<any[]>([]);
  const [collegeSearch, setCollegeSearch] = useState('');
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [formData, setFormData] = useState<Application>({
    id: '',
    collegeName: '',
    deadline: '',
    type: 'Regular Decision',
    status: 'Not Started',
    requirements: {
      personalEssay: true,
      recommendations: 2,
      supplements: 0,
      transcript: true,
      testScores: 'Optional'
    },
    checklist: {
      personalEssay: { brainstorm: false, firstDraft: false, revised: false, proofread: false, submitted: false },
      supplements: { outlined: false, drafted: false, revised: false, submitted: false },
      recommendations: { teachersAsked: false, bragSheetProvided: false, followedUp: false, submitted: false },
      transcript: { requested: false, reviewed: false, sent: false },
      testScores: { scoresSent: false, confirmed: false },
      documents: { activityList: false, honorsList: false, additionalInfo: false },
      financial: { fafsa: false, cssProfile: false, schoolFinancialForm: false },
      submission: { applicationReviewed: false, feeWaiverApplied: false, submitted: false, confirmationReceived: false, portalCreated: false }
    },
    notes: '',
    importantDates: {}
  });

  const defaultChecklist: Checklist = {
    personalEssay: { brainstorm: false, firstDraft: false, revised: false, proofread: false, submitted: false },
    supplements: { outlined: false, drafted: false, revised: false, submitted: false },
    recommendations: { teachersAsked: false, bragSheetProvided: false, followedUp: false, submitted: false },
    transcript: { requested: false, reviewed: false, sent: false },
    testScores: { scoresSent: false, confirmed: false },
    documents: { activityList: false, honorsList: false, additionalInfo: false },
    financial: { fafsa: false, cssProfile: false, schoolFinancialForm: false },
    submission: { applicationReviewed: false, feeWaiverApplied: false, submitted: false, confirmationReceived: false, portalCreated: false }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    
    const saved = localStorage.getItem('college_applications');
    if (saved) {
      const apps = JSON.parse(saved);
      // Ensure all apps have checklist
      const appsWithChecklists = apps.map((app: Application) => ({
        ...app,
        checklist: app.checklist || defaultChecklist,
        importantDates: app.importantDates || {}
      }));
      setApplications(appsWithChecklists);
    }
  }, [status, router]);

  useEffect(() => {
    if (applications.length > 0) {
      localStorage.setItem('college_applications', JSON.stringify(applications));
    }
  }, [applications]);

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Not Started': 'bg-gray-100 text-gray-700',
      'In Progress': 'bg-yellow-100 text-yellow-700',
      'Submitted': 'bg-blue-100 text-blue-700',
      'Accepted': 'bg-green-100 text-green-700',
      'Denied': 'bg-red-100 text-red-700',
      'Waitlisted': 'bg-purple-100 text-purple-700',
      'Deferred': 'bg-orange-100 text-orange-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Early Action': 'bg-green-100 text-green-700 border-green-300',
      'Early Decision': 'bg-purple-100 text-purple-700 border-purple-300',
      'Regular Decision': 'bg-blue-100 text-blue-700 border-blue-300',
      'Rolling': 'bg-gray-100 text-gray-700 border-gray-300',
      'ED2': 'bg-primary-100 text-primary-700 border-primary-300'
    };
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const calculateChecklistProgress = (checklist: Checklist) => {
    const allItems = [
      ...Object.values(checklist.personalEssay),
      ...Object.values(checklist.supplements),
      ...Object.values(checklist.recommendations),
      ...Object.values(checklist.transcript),
      ...Object.values(checklist.testScores),
      ...Object.values(checklist.documents),
      ...Object.values(checklist.financial),
      ...Object.values(checklist.submission)
    ];
    const completed = allItems.filter(Boolean).length;
    return { completed, total: allItems.length, percentage: (completed / allItems.length) * 100 };
  };

  const toggleChecklistItem = (appId: string, category: keyof Checklist, item: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          checklist: {
            ...app.checklist,
            [category]: {
              ...app.checklist[category],
              [item]: !app.checklist[category][item as keyof typeof app.checklist[typeof category]]
            }
          }
        };
      }
      return app;
    }));
  };

  const loadColleges = async (search: string = '') => {
    try {
      const response = await fetch(`/api/colleges-database?q=${search}`);
      const data = await response.json();
      setColleges(data.colleges || []);
    } catch (error) {
      console.error('Error loading colleges:', error);
    }
  };

  const addFromDatabase = (college: any) => {
    const deadline = college.deadlines.RD || college.deadlines.EA || college.deadlines.ED || college.deadlines.REA || '2026-01-15';
    const appType = college.applicationTypes.includes('Regular Decision') ? 'Regular Decision' :
                    college.applicationTypes.includes('Early Action') ? 'Early Action' :
                    college.applicationTypes.includes('Early Decision') ? 'Early Decision' :
                    'Regular Decision';
    
    setFormData({
      id: Date.now().toString(),
      collegeName: college.name,
      deadline: deadline.includes('January') ? '2026-01-15' : 
                deadline.includes('November') ? '2025-11-01' :
                deadline.includes('December') ? '2025-12-15' : '2026-01-15',
      type: appType as any,
      status: 'Not Started',
      requirements: {
        personalEssay: college.requirements.personalEssay,
        recommendations: college.requirements.recommendations,
        supplements: college.requirements.supplementalEssays,
        transcript: college.requirements.transcript,
        testScores: college.testPolicy === 'Required' ? 'Required' : 
                   college.testPolicy === 'Test-Blind' ? 'Test-Blind' : 'Optional'
      },
      checklist: defaultChecklist,
      notes: college.notes || '',
      importantDates: {
        transcriptDeadline: deadline.includes('November') ? '2025-11-01' : '2026-01-15',
        recommendationDeadline: deadline.includes('November') ? '2025-10-20' : '2025-12-15',
        testScoreDeadline: deadline.includes('November') ? '2025-11-01' : '2026-01-15',
        financialAidDeadline: '2025-10-01'
      }
    });
    setShowCollegeModal(false);
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingApp(null);
    setFormData({
      id: Date.now().toString(),
      collegeName: '',
      deadline: '',
      type: 'Regular Decision',
      status: 'Not Started',
      requirements: {
        personalEssay: true,
        recommendations: 2,
        supplements: 0,
        transcript: true,
        testScores: 'Optional'
      },
      checklist: defaultChecklist,
      notes: '',
      importantDates: {}
    });
    setShowModal(true);
  };

  const openEditModal = (app: Application) => {
    setEditingApp(app);
    setFormData(app);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.collegeName || !formData.deadline) {
      alert('Please fill in college name and deadline');
      return;
    }

    if (editingApp) {
      setApplications(prev => prev.map(app => app.id === editingApp.id ? formData : app));
    } else {
      setApplications(prev => [...prev, formData]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      setApplications(prev => prev.filter(app => app.id !== id));
    }
  };

  const handleStatusUpdate = (id: string, newStatus: Application['status']) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const getAllDeadlines = () => {
    const deadlines: { date: string; college: string; type: string; color: string }[] = [];
    
    applications.forEach(app => {
      // Main deadline
      deadlines.push({
        date: app.deadline,
        college: app.collegeName,
        type: 'Application Due',
        color: 'bg-red-500'
      });

      // Important dates
      if (app.importantDates.transcriptDeadline) {
        deadlines.push({
          date: app.importantDates.transcriptDeadline,
          college: app.collegeName,
          type: 'Transcript Due',
          color: 'bg-blue-500'
        });
      }
      if (app.importantDates.recommendationDeadline) {
        deadlines.push({
          date: app.importantDates.recommendationDeadline,
          college: app.collegeName,
          type: 'Recommendations Due',
          color: 'bg-purple-500'
        });
      }
      if (app.importantDates.testScoreDeadline && app.requirements.testScores !== 'Test-Blind') {
        deadlines.push({
          date: app.importantDates.testScoreDeadline,
          college: app.collegeName,
          type: 'Test Scores Due',
          color: 'bg-green-500'
        });
      }
      if (app.importantDates.financialAidDeadline) {
        deadlines.push({
          date: app.importantDates.financialAidDeadline,
          college: app.collegeName,
          type: 'FAFSA/CSS Due',
          color: 'bg-yellow-500'
        });
      }
    });

    return deadlines.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const stats = {
    total: applications.length,
    inProgress: applications.filter(a => a.status === 'In Progress').length,
    submitted: applications.filter(a => a.status === 'Submitted').length,
    accepted: applications.filter(a => a.status === 'Accepted').length
  };

  // Auth loading check disabled
  // if (status === 'loading') {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-2xl font-bold text-primary-600 flex items-center gap-2">
              <Logo size={32} />
              <span>College Compass</span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600">
                <FaComments /> AI Chat
              </Link>
              <Link href="/tracker" className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-600 rounded-lg font-semibold">
                <FaClipboardList /> Tracker
              </Link>
              <Link href="/essays" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600">
                <FaPencilAlt /> Essays
              </Link>
              <Link href="/timeline" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600">
                <FaCalendarAlt /> Timeline
              </Link>
              <Link href="/resources" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600">
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

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <FaClipboardList className="text-primary-600" /> Application Tracker
          </h1>
          <p className="text-gray-600">Track applications, checklists, and deadlines all in one place</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">{stats.total}</div>
            <div className="text-gray-600">Total Applications</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">{stats.inProgress}</div>
            <div className="text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{stats.submitted}</div>
            <div className="text-gray-600">Submitted</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{stats.accepted}</div>
            <div className="text-gray-600">Accepted</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={() => {
              loadColleges();
              setShowCollegeModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-all shadow-lg"
          >
            <FaBook /> Browse College Database
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-all shadow-lg"
          >
            <FaPlus /> Add Custom Application
          </button>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-lg"
          >
            <FaCalendar /> {showCalendar ? 'Hide' : 'Show'} Calendar View
          </button>
        </div>

        {/* Calendar View */}
        {showCalendar && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaCalendar className="text-green-600" /> Deadline Calendar
            </h2>
            <div className="space-y-3">
              {getAllDeadlines().map((deadline, idx) => {
                const daysLeft = getDaysUntilDeadline(deadline.date);
                const isPast = daysLeft < 0;
                const isUrgent = daysLeft <= 7 && daysLeft >= 0;

                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                      isPast ? 'bg-gray-100 border-gray-300 opacity-50' :
                      isUrgent ? 'bg-red-50 border-red-500' : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${deadline.color}`}></div>
                      <div>
                        <div className="font-semibold text-gray-800">{deadline.college}</div>
                        <div className="text-sm text-gray-600">{deadline.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        isPast ? 'text-gray-500' :
                        isUrgent ? 'text-red-600' : 'text-gray-800'
                      }`}>
                        {new Date(deadline.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className={`text-sm ${isPast ? 'text-gray-500' : isUrgent ? 'text-red-600' : 'text-gray-600'}`}>
                        {isPast ? 'Past' : `${daysLeft} days left`}
                      </div>
                    </div>
                  </div>
                );
              })}
              {getAllDeadlines().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No deadlines yet. Add applications to see your calendar!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Applications List */}
        <div className="space-y-6">
          {applications.map(app => {
            const daysLeft = getDaysUntilDeadline(app.deadline);
            const isUrgent = daysLeft <= 7 && daysLeft >= 0;
            const isPast = daysLeft < 0;
            const progress = calculateChecklistProgress(app.checklist);
            const isExpanded = expandedApp === app.id;

            return (
              <div key={app.id} className={`bg-white rounded-xl shadow-lg p-6 border-2 ${isUrgent ? 'border-red-500' : 'border-gray-200'}`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{app.collegeName}</h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${getTypeColor(app.type)}`}>
                        {app.type}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-700">Checklist Progress</span>
                        <span className="text-sm font-bold text-primary-600">{Math.round(progress.percentage)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${progress.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{progress.completed} of {progress.total} tasks complete</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className={`text-3xl font-bold ${isUrgent ? 'text-red-600' : isPast ? 'text-gray-400' : 'text-gray-800'}`}>
                      {isPast ? 'PAST' : `${daysLeft} days`}
                    </div>
                    <div className="text-sm text-gray-600">Deadline: {new Date(app.deadline).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Quick Requirements */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                  <div className={`p-3 rounded-lg border-2 ${app.requirements.personalEssay ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300'}`}>
                    <div className="font-semibold text-sm text-gray-700">Personal Essay</div>
                    <div className="text-xs text-gray-600">{app.requirements.personalEssay ? '✓ Required' : 'Not Required'}</div>
                  </div>
                  <div className={`p-3 rounded-lg border-2 ${app.requirements.recommendations > 0 ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300'}`}>
                    <div className="font-semibold text-sm text-gray-700">Recommendations</div>
                    <div className="text-xs text-gray-600">{app.requirements.recommendations} required</div>
                  </div>
                  <div className={`p-3 rounded-lg border-2 ${app.requirements.supplements > 0 ? 'bg-yellow-50 border-yellow-500' : 'bg-gray-50 border-gray-300'}`}>
                    <div className="font-semibold text-sm text-gray-700">Supplements</div>
                    <div className="text-xs text-gray-600">{app.requirements.supplements} essays</div>
                  </div>
                  <div className={`p-3 rounded-lg border-2 ${app.requirements.transcript ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300'}`}>
                    <div className="font-semibold text-sm text-gray-700">Transcript</div>
                    <div className="text-xs text-gray-600">{app.requirements.transcript ? '✓ Required' : 'Not Required'}</div>
                  </div>
                  <div className={`p-3 rounded-lg border-2 ${
                    app.requirements.testScores === 'Required' ? 'bg-blue-50 border-blue-500' : 
                    app.requirements.testScores === 'Optional' ? 'bg-gray-50 border-gray-300' : 
                    'bg-red-50 border-red-300'
                  }`}>
                    <div className="font-semibold text-sm text-gray-700">Test Scores</div>
                    <div className="text-xs text-gray-600">{app.requirements.testScores}</div>
                  </div>
                </div>

                {/* Expand/Collapse Button */}
                <button
                  onClick={() => setExpandedApp(isExpanded ? null : app.id)}
                  className="w-full mb-4 px-4 py-2 bg-primary-100 text-primary-700 font-semibold rounded-lg hover:bg-primary-200 transition-all"
                >
                  {isExpanded ? '▼ Hide Detailed Checklists' : '▶ Show Detailed Checklists'}
                </button>

                {/* Detailed Checklists */}
                {isExpanded && (
                  <div className="space-y-4 mb-4 bg-gray-50 p-4 rounded-lg">
                    {/* Personal Essay Checklist */}
                    {app.requirements.personalEssay && (
                      <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <FaPencilAlt className="text-green-600" /> Personal Essay Checklist
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(app.checklist.personalEssay).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => toggleChecklistItem(app.id, 'personalEssay', key)}>
                              {value ? <FaCheckCircle className="text-green-500 text-xl" /> : <FaRegCircle className="text-gray-400 text-xl" />}
                              <span className={`${value ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                {key === 'brainstorm' ? 'Brainstorm topics and outline' :
                                 key === 'firstDraft' ? 'Complete first draft' :
                                 key === 'revised' ? 'Revise and edit (get feedback)' :
                                 key === 'proofread' ? 'Final proofread' :
                                 'Submit in application'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Supplemental Essays */}
                    {app.requirements.supplements > 0 && (
                      <div className="bg-white p-4 rounded-lg border-2 border-yellow-200">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <FaPencilAlt className="text-yellow-600" /> Supplemental Essays ({app.requirements.supplements}) Checklist
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(app.checklist.supplements).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => toggleChecklistItem(app.id, 'supplements', key)}>
                              {value ? <FaCheckCircle className="text-green-500 text-xl" /> : <FaRegCircle className="text-gray-400 text-xl" />}
                              <span className={`${value ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                {key === 'outlined' ? 'Outline all supplemental essays' :
                                 key === 'drafted' ? 'Complete all drafts' :
                                 key === 'revised' ? 'Revise all supplements' :
                                 'Submit all supplements'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    {app.requirements.recommendations > 0 && (
                      <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <FaClipboardList className="text-purple-600" /> Recommendations ({app.requirements.recommendations}) Checklist
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(app.checklist.recommendations).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => toggleChecklistItem(app.id, 'recommendations', key)}>
                              {value ? <FaCheckCircle className="text-green-500 text-xl" /> : <FaRegCircle className="text-gray-400 text-xl" />}
                              <span className={`${value ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                {key === 'teachersAsked' ? `Ask ${app.requirements.recommendations} teachers (6 weeks early!)` :
                                 key === 'bragSheetProvided' ? 'Provide brag sheet & resume' :
                                 key === 'followedUp' ? 'Follow up 2 weeks before deadline' :
                                 'Confirm submitted in portal'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Transcript */}
                    {app.requirements.transcript && (
                      <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <FaClipboardList className="text-blue-600" /> Transcript Checklist
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(app.checklist.transcript).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => toggleChecklistItem(app.id, 'transcript', key)}>
                              {value ? <FaCheckCircle className="text-green-500 text-xl" /> : <FaRegCircle className="text-gray-400 text-xl" />}
                              <span className={`${value ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                {key === 'requested' ? 'Request from counselor' :
                                 key === 'reviewed' ? 'Review for accuracy' :
                                 'Confirm sent to college'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Test Scores */}
                    {app.requirements.testScores !== 'Test-Blind' && (
                      <div className="bg-white p-4 rounded-lg border-2 border-primary-200">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <FaClipboardList className="text-primary-600" /> Test Scores Checklist ({app.requirements.testScores})
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(app.checklist.testScores).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => toggleChecklistItem(app.id, 'testScores', key)}>
                              {value ? <FaCheckCircle className="text-green-500 text-xl" /> : <FaRegCircle className="text-gray-400 text-xl" />}
                              <span className={`${value ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                {key === 'scoresSent' ? 'Send official scores (College Board/ACT)' :
                                 'Confirm received in portal'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Documents */}
                    <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <FaClipboardList className="text-orange-600" /> Application Documents
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(app.checklist.documents).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => toggleChecklistItem(app.id, 'documents', key)}>
                            {value ? <FaCheckCircle className="text-green-500 text-xl" /> : <FaRegCircle className="text-gray-400 text-xl" />}
                            <span className={`${value ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                              {key === 'activityList' ? 'Complete Activities List (10 max)' :
                               key === 'honorsList' ? 'List Honors & Awards (5 max)' :
                               'Additional Information (if needed)'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Financial Aid */}
                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <FaClipboardList className="text-green-600" /> Financial Aid Checklist
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(app.checklist.financial).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => toggleChecklistItem(app.id, 'financial', key)}>
                            {value ? <FaCheckCircle className="text-green-500 text-xl" /> : <FaRegCircle className="text-gray-400 text-xl" />}
                            <span className={`${value ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                              {key === 'fafsa' ? 'Complete FAFSA (opens Oct 1)' :
                               key === 'cssProfile' ? 'Complete CSS Profile (if required)' :
                               'School-specific financial form'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Submission */}
                    <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <FaClipboardList className="text-red-600" /> Final Submission Checklist
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(app.checklist.submission).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => toggleChecklistItem(app.id, 'submission', key)}>
                            {value ? <FaCheckCircle className="text-green-500 text-xl" /> : <FaRegCircle className="text-gray-400 text-xl" />}
                            <span className={`${value ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                              {key === 'applicationReviewed' ? 'Review ENTIRE application before submit' :
                               key === 'feeWaiverApplied' ? 'Apply fee waiver (if eligible)' :
                               key === 'submitted' ? '🎉 SUBMIT APPLICATION!' :
                               key === 'confirmationReceived' ? 'Save confirmation email' :
                               'Create applicant portal account'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes */}
                {app.notes && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <div className="font-semibold text-sm text-blue-900 mb-1">📝 Notes</div>
                    <div className="text-sm text-blue-800">{app.notes}</div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusUpdate(app.id, e.target.value as Application['status'])}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold cursor-pointer"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Denied">Denied</option>
                    <option value="Waitlisted">Waitlisted</option>
                    <option value="Deferred">Deferred</option>
                  </select>
                  <button
                    onClick={() => openEditModal(app)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 border-2 border-red-300"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {applications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="flex justify-center mb-4">
              <FaClipboardList className="text-6xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No applications yet</h3>
            <p className="text-gray-600 mb-6">Start tracking your college applications with detailed checklists!</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  loadColleges();
                  setShowCollegeModal(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700"
              >
                <FaBook /> Browse Colleges
              </button>
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700"
              >
                <FaPlus /> Add Application
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal - (keeping previous modal code) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8">
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingApp ? 'Edit Application' : 'Add New Application'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                {/* College Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    College Name *
                  </label>
                  <input
                    type="text"
                    value={formData.collegeName}
                    onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                    placeholder="e.g., Stanford University"
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Deadline *
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  />
                </div>

                {/* Important Dates */}
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Document Deadlines</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Transcript Deadline</label>
                      <input
                        type="date"
                        value={formData.importantDates.transcriptDeadline || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          importantDates: { ...formData.importantDates, transcriptDeadline: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-primary-600 focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Recommendation Deadline</label>
                      <input
                        type="date"
                        value={formData.importantDates.recommendationDeadline || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          importantDates: { ...formData.importantDates, recommendationDeadline: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-primary-600 focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Test Score Deadline</label>
                      <input
                        type="date"
                        value={formData.importantDates.testScoreDeadline || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          importantDates: { ...formData.importantDates, testScoreDeadline: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-primary-600 focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Financial Aid Deadline</label>
                      <input
                        type="date"
                        value={formData.importantDates.financialAidDeadline || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          importantDates: { ...formData.importantDates, financialAidDeadline: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-primary-600 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Application Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Application['type'] })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  >
                    <option value="Early Action">Early Action</option>
                    <option value="Early Decision">Early Decision</option>
                    <option value="Regular Decision">Regular Decision</option>
                    <option value="Rolling">Rolling</option>
                    <option value="ED2">ED2</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Application['status'] })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Denied">Denied</option>
                    <option value="Waitlisted">Waitlisted</option>
                    <option value="Deferred">Deferred</option>
                  </select>
                </div>

                {/* Requirements */}
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Requirements</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.requirements.personalEssay}
                        onChange={(e) => setFormData({
                          ...formData,
                          requirements: { ...formData.requirements, personalEssay: e.target.checked }
                        })}
                        className="w-5 h-5"
                      />
                      <label className="text-sm font-medium text-gray-700">Personal Essay Required</label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Recommendations
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        value={formData.requirements.recommendations}
                        onChange={(e) => setFormData({
                          ...formData,
                          requirements: { ...formData.requirements, recommendations: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Supplemental Essays
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={formData.requirements.supplements}
                        onChange={(e) => setFormData({
                          ...formData,
                          requirements: { ...formData.requirements, supplements: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.requirements.transcript}
                        onChange={(e) => setFormData({
                          ...formData,
                          requirements: { ...formData.requirements, transcript: e.target.checked }
                        })}
                        className="w-5 h-5"
                      />
                      <label className="text-sm font-medium text-gray-700">Transcript Required</label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Test Scores Policy
                      </label>
                      <select
                        value={formData.requirements.testScores}
                        onChange={(e) => setFormData({
                          ...formData,
                          requirements: { ...formData.requirements, testScores: e.target.value as 'Required' | 'Optional' | 'Test-Blind' }
                        })}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                      >
                        <option value="Required">Required</option>
                        <option value="Optional">Test-Optional</option>
                        <option value="Test-Blind">Test-Blind</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                    rows={3}
                    placeholder="Add any additional notes about this application..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700"
                  >
                    <FaCheck /> {editingApp ? 'Save Changes' : 'Add Application'}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* College Browser Modal - (keeping previous) */}
      {showCollegeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Browse College Database
                </h2>
                <button
                  onClick={() => setShowCollegeModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <input
                  type="text"
                  value={collegeSearch}
                  onChange={(e) => {
                    setCollegeSearch(e.target.value);
                    loadColleges(e.target.value);
                  }}
                  placeholder="Search colleges by name or location..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none text-lg"
                />
              </div>

              {/* College Cards */}
              <div className="grid md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                {colleges.map((college) => (
                  <div key={college.id} className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg p-5 border-2 border-primary-200 hover:border-primary-400 transition-all">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{college.name}</h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-700">📍 {college.location}</p>
                      <p className="text-sm text-gray-700">🎯 Admission Rate: {college.admissionRate}</p>
                      <p className="text-sm text-gray-700">📊 Test Policy: {college.testPolicy}</p>
                      <p className="text-sm text-gray-700">📝 Essays: {college.requirements.supplementalEssays} supplements</p>
                    </div>
                    <button
                      onClick={() => addFromDatabase(college)}
                      className="w-full px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all"
                    >
                      Add to Tracker
                    </button>
                  </div>
                ))}
              </div>

              {colleges.length === 0 && (
                <div className="text-center py-12 text-gray-600">
                  <p className="text-lg">Loading colleges...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
