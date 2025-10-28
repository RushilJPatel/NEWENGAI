'use client';

import { useState, useEffect } from 'react';
import './globals.css';

interface Course {
  id: string;
  name: string;
  prerequisites: string[];
  category: string;
  keywords?: string[];
}

interface College {
  id: string;
  name: string;
  rank: number;
  requiredCourses: string[];
  electiveOptions: string[];
}

export default function CollegePlannerAI() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [interests, setInterests] = useState('');
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [collegesRes, coursesRes] = await Promise.all([
        fetch('/api/colleges'),
        fetch('/api/courses')
      ]);
      const collegesData = await collegesRes.json();
      const coursesData = await coursesRes.json();
      setColleges(collegesData.colleges || []);
      setAllCourses(coursesData.courses || []);
      setDataLoaded(true);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleCollegeChange = (collegeId: string) => {
    const college = colleges.find(c => c.id === collegeId);
    setSelectedCollege(college || null);
    setCompletedCourses([]);
    setRecommendations(null);
  };

  const toggleCourse = (courseId: string) => {
    setCompletedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleGetRecommendations = async () => {
    if (!selectedCollege) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collegeId: selectedCollege.id,
          completedCourses,
          interests
        })
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCourseById = (id: string) => allCourses.find(c => c.id === id);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            🧠 College Planner AI
          </h1>
          <p className="text-xl text-gray-600">
            Plan your CS degree efficiently with AI-powered recommendations
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          
          {/* Step 1: Select College */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Select Your College
            </h2>
            <select
              value={selectedCollege?.id || ''}
              onChange={(e) => handleCollegeChange(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none text-lg"
            >
              <option value="">Choose a Top 20 CS College...</option>
              {colleges.map(college => (
                <option key={college.id} value={college.id}>
                  #{college.rank} - {college.name}
                </option>
              ))}
            </select>
          </section>

          {selectedCollege && (
            <>
              {/* Step 2: Mark Completed Courses */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                  Mark Completed Courses
                </h2>
                
                {/* Required Courses */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Core Required Courses</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedCollege.requiredCourses.map(courseId => {
                      const course = getCourseById(courseId);
                      if (!course) return null;
                      const isCompleted = completedCourses.includes(courseId);
                      return (
                        <button
                          key={courseId}
                          onClick={() => toggleCourse(courseId)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            isCompleted 
                              ? 'bg-green-50 border-green-500 shadow-md' 
                              : 'bg-gray-50 border-gray-300 hover:border-indigo-400'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-bold text-gray-800">{course.id}</div>
                              <div className="text-sm text-gray-600">{course.name}</div>
                            </div>
                            {isCompleted && <span className="text-green-600 text-xl">✓</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Elective Options */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Elective Options</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedCollege.electiveOptions.map(courseId => {
                      const course = getCourseById(courseId);
                      if (!course) return null;
                      const isCompleted = completedCourses.includes(courseId);
                      return (
                        <button
                          key={courseId}
                          onClick={() => toggleCourse(courseId)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            isCompleted 
                              ? 'bg-green-50 border-green-500 shadow-md' 
                              : 'bg-gray-50 border-gray-300 hover:border-purple-400'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-bold text-gray-800">{course.id}</div>
                              <div className="text-sm text-gray-600">{course.name}</div>
                            </div>
                            {isCompleted && <span className="text-green-600 text-xl">✓</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Step 3: Enter Interests */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                  Enter Your Interests
                </h2>
                <textarea
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="e.g., artificial intelligence, machine learning, cybersecurity, web development, data science..."
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none text-lg h-32 resize-none"
                />
              </section>

              {/* Get Recommendations Button */}
              <div className="text-center">
                <button
                  onClick={handleGetRecommendations}
                  disabled={loading || completedCourses.length === 0}
                  className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? '🔄 Getting Recommendations...' : '🚀 Get AI Recommendations'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Results */}
        {recommendations && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Next Courses */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                📚 Recommended Next Courses
              </h2>
              {recommendations.nextCourses && recommendations.nextCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendations.nextCourses.map((course: Course) => (
                    <div key={course.id} className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-300">
                      <div className="font-bold text-xl text-blue-900">{course.id}</div>
                      <div className="text-gray-700 mb-2">{course.name}</div>
                      {course.prerequisites.length > 0 && (
                        <div className="text-sm text-gray-600">
                          Prerequisites: {course.prerequisites.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-lg">Great job! You've completed all prerequisites for advanced courses. Check out the elective recommendations below! 🎉</p>
              )}
            </div>

            {/* AI Elective Suggestions */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                🤖 AI-Powered Elective Suggestions
              </h2>
              {recommendations.aiSuggestion && (
                <div className="mb-6 p-4 bg-white rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line">{recommendations.aiSuggestion}</p>
                </div>
              )}
              {recommendations.suggestedElectives && recommendations.suggestedElectives.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendations.suggestedElectives.map((course: Course) => (
                    <div key={course.id} className="p-5 bg-white rounded-lg border-2 border-purple-300 shadow-md">
                      <div className="font-bold text-xl text-purple-900">{course.id}</div>
                      <div className="text-gray-700">{course.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

