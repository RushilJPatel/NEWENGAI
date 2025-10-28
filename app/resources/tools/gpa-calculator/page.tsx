'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
  type: 'regular' | 'honors' | 'ap';
}

export default function GPACalculator() {
  const { status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'English 11', grade: '', credits: 1, type: 'regular' }
  ]);
  const [unweightedGPA, setUnweightedGPA] = useState<number | null>(null);
  const [weightedGPA, setWeightedGPA] = useState<number | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: `Course ${courses.length + 1}`,
      grade: '',
      credits: 1,
      type: 'regular'
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculateGPA = () => {
    let totalUnweightedPoints = 0;
    let totalWeightedPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.grade && gradePoints[course.grade] !== undefined) {
        const basePoints = gradePoints[course.grade];
        const credits = course.credits;

        // Unweighted GPA
        totalUnweightedPoints += basePoints * credits;

        // Weighted GPA
        let weightedPoints = basePoints;
        if (course.type === 'honors') {
          weightedPoints += 0.5;
        } else if (course.type === 'ap') {
          weightedPoints += 1.0;
        }
        totalWeightedPoints += weightedPoints * credits;

        totalCredits += credits;
      }
    });

    if (totalCredits > 0) {
      setUnweightedGPA(parseFloat((totalUnweightedPoints / totalCredits).toFixed(3)));
      setWeightedGPA(parseFloat((totalWeightedPoints / totalCredits).toFixed(3)));
    } else {
      setUnweightedGPA(null);
      setWeightedGPA(null);
    }
  };

  const clearAll = () => {
    setCourses([{ id: '1', name: 'Course 1', grade: '', credits: 1, type: 'regular' }]);
    setUnweightedGPA(null);
    setWeightedGPA(null);
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 sm:p-8">
      <div className="container mx-auto max-w-6xl">
        <Link href="/resources" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6">
          ← Back to Resources
        </Link>

        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10">
          <div className="flex items-center mb-6">
            <span className="text-6xl mr-4">📊</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">GPA Calculator</h1>
              <p className="text-gray-600 mt-2">Calculate weighted and unweighted GPA for college applications</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
            <h3 className="font-bold text-blue-900 mb-2">How to Use:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>1. Add all your courses using the "+ Add Course" button</li>
              <li>2. Enter your letter grade for each course (A, B+, etc.)</li>
              <li>3. Select course type: Regular, Honors (+0.5), or AP (+1.0)</li>
              <li>4. Set credits (usually 1.0 for full-year, 0.5 for semester)</li>
              <li>5. Click "Calculate GPA" to see your results!</li>
            </ul>
          </div>

          {/* Course List */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Courses</h2>
            
            <div className="space-y-3 mb-4">
              {courses.map((course, index) => (
                <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 bg-gray-50 rounded-lg items-center">
                  <div className="md:col-span-4">
                    <label className="block text-xs text-gray-600 mb-1">Course Name</label>
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., AP Calculus"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-600 mb-1">Grade</label>
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select</option>
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="B-">B-</option>
                      <option value="C+">C+</option>
                      <option value="C">C</option>
                      <option value="C-">C-</option>
                      <option value="D+">D+</option>
                      <option value="D">D</option>
                      <option value="D-">D-</option>
                      <option value="F">F</option>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs text-gray-600 mb-1">Course Type</label>
                    <select
                      value={course.type}
                      onChange={(e) => updateCourse(course.id, 'type', e.target.value as 'regular' | 'honors' | 'ap')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="regular">Regular</option>
                      <option value="honors">Honors (+0.5)</option>
                      <option value="ap">AP/IB (+1.0)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-600 mb-1">Credits</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      max="2"
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="md:col-span-1 flex items-end justify-center">
                    <button
                      onClick={() => removeCourse(course.id)}
                      disabled={courses.length === 1}
                      className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove course"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={addCourse}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
              >
                + Add Course
              </button>
              <button
                onClick={clearAll}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="mb-8">
            <button
              onClick={calculateGPA}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Calculate GPA
            </button>
          </div>

          {/* Results */}
          {(unweightedGPA !== null || weightedGPA !== null) && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-2 opacity-90">Unweighted GPA</h3>
                <div className="text-6xl font-bold">{unweightedGPA?.toFixed(3)}</div>
                <p className="mt-4 text-sm opacity-90">Out of 4.0 scale (no bonus for honors/AP)</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-2 opacity-90">Weighted GPA</h3>
                <div className="text-6xl font-bold">{weightedGPA?.toFixed(3)}</div>
                <p className="mt-4 text-sm opacity-90">With honors (+0.5) and AP (+1.0) bonuses</p>
              </div>
            </div>
          )}

          {/* GPA Scale Reference */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-4">GPA Scale Reference</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-sm">
              {Object.entries(gradePoints).map(([grade, points]) => (
                <div key={grade} className="bg-white p-2 rounded text-center border">
                  <div className="font-bold text-indigo-600">{grade}</div>
                  <div className="text-gray-600">{points.toFixed(1)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <h3 className="font-bold text-yellow-900 mb-2">💡 Tips for College Applications:</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Most colleges recalculate GPA using only core academic courses (no PE, electives)</li>
              <li>• Some schools only look at unweighted GPA; others consider weighted</li>
              <li>• An upward trend (improving grades) is looked upon favorably</li>
              <li>• Course rigor matters! Taking challenging courses shows academic ambition</li>
              <li>• A 3.5+ unweighted GPA is competitive for most schools</li>
              <li>• Top 20 schools typically want 3.9+ unweighted with rigorous courses</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

