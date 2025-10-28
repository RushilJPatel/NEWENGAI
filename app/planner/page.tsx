'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Course {
  id: string;
  name: string;
  subject: string;
  grade: number;
  credits: number;
  advanced?: boolean;
}

interface Major {
  id: string;
  name: string;
  description: string;
  icon: string;
  recommendedCourses: {
    grade9: string[];
    grade10: string[];
    grade11: string[];
    grade12: string[];
  };
  totalCredits: number;
}

export default function PlannerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [majors, setMajors] = useState<Major[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [schedule, setSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [customizing, setCustomizing] = useState(false);

  // Protect route
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [majorsRes, coursesRes] = await Promise.all([
        fetch('/api/majors'),
        fetch('/api/hs-courses')
      ]);
      const majorsData = await majorsRes.json();
      const coursesData = await coursesRes.json();
      setMajors(majorsData.majors || []);
      setAllCourses(coursesData.courses || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSelectMajor = async (major: Major) => {
    setSelectedMajor(major);
    setLoading(true);
    
    try {
      const response = await fetch('/api/generate-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ majorId: major.id })
      });
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error('Error generating schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCourseById = (id: string) => allCourses.find(c => c.id === id);

  const getGradeSchedule = (grade: number) => {
    if (!schedule || !schedule.schedule) return [];
    const gradeKey = `grade${grade}` as keyof typeof schedule.schedule;
    return schedule.schedule[gradeKey] || [];
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              🎓 High School Planner AI
            </h1>
            <p className="text-gray-600 mt-2">Welcome, {session?.user?.name || session?.user?.email}!</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
          >
            Sign Out
          </button>
        </div>

        {!selectedMajor && (
          <>
            {/* Major Selection */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Choose Your Path 🎯
              </h2>
              <p className="text-gray-600 mb-6">
                Select a major track to generate your personalized 4-year high school plan
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {majors.map(major => (
                  <button
                    key={major.id}
                    onClick={() => handleSelectMajor(major)}
                    className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-indigo-500 hover:shadow-xl transition-all transform hover:-translate-y-1 text-left"
                  >
                    <div className="text-5xl mb-3">{major.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{major.name}</h3>
                    <p className="text-sm text-gray-600">{major.description}</p>
                    <div className="mt-4 text-sm text-indigo-600 font-semibold">
                      {major.totalCredits} total credits
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {selectedMajor && !loading && schedule && (
          <>
            {/* Selected Major Header */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{selectedMajor.icon}</span>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">{selectedMajor.name}</h2>
                    <p className="text-gray-600">{selectedMajor.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedMajor(null);
                    setSchedule(null);
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Change Major
                </button>
              </div>
            </div>

            {/* 4-Year Schedule */}
            <div className="grid lg:grid-cols-2 gap-6">
              {[9, 10, 11, 12].map(grade => {
                const gradeCourses = getGradeSchedule(grade);
                const totalCredits = gradeCourses.reduce((sum: number, courseId: string) => {
                  const course = getCourseById(courseId);
                  return sum + (course?.credits || 0);
                }, 0);

                return (
                  <div key={grade} className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-gray-800">
                        Grade {grade} 🎯
                      </h3>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                        {totalCredits} credits
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {gradeCourses.map((courseId: string) => {
                        const course = getCourseById(courseId);
                        if (!course) return null;
                        
                        return (
                          <div
                            key={courseId}
                            className={`p-4 rounded-lg border-2 ${
                              course.advanced
                                ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="font-bold text-gray-800">
                                  {course.name}
                                  {course.advanced && (
                                    <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-1 rounded">AP</span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-600">{course.subject}</div>
                              </div>
                              <div className="text-sm font-semibold text-gray-700">
                                {course.credits} {course.credits === 1 ? 'credit' : 'credits'}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Suggestions */}
            {schedule.aiSuggestion && (
              <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  🤖 AI-Powered Insights
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{schedule.aiSuggestion}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4 justify-center">
              <button
                onClick={() => window.print()}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg"
              >
                📄 Print Schedule
              </button>
              <button
                onClick={() => alert('Customization coming soon!')}
                className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                ✏️ Customize Schedule
              </button>
            </div>
          </>
        )}

        {loading && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">🤖</div>
            <div className="text-2xl font-bold text-gray-800 mb-2">Generating Your 4-Year Plan...</div>
            <div className="text-gray-600">AI is creating the perfect schedule for you</div>
            <div className="mt-6">
              <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

