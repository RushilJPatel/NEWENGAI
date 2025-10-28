'use client';

import { useState } from 'react';
import { FaGraduationCap, FaLightbulb, FaMapMarkerAlt, FaClock, FaHeart, FaTrophy, FaDollarSign } from 'react-icons/fa';

interface OnboardingData {
  currentGrade: string;
  targetColleges: string[];
  intendedMajor: string;
  careerAspirations: string;
  currentGPA: string;
  apCoursesTaken: string[];
  strongestSubjects: string[];
  academicInterests: string[];
  hobbies: string[];
  extracurriculars: string[];
  preferredLocation: string[];
  studyTimePerDay: string;
  homeworkLoad: string;
  learningStyle: string;
  challenges: string[];
  goals: string[];
  financialAidNeeded: boolean;
  athleticInterest: boolean;
  athleticSport?: string;
}

interface OnboardingFormProps {
  onComplete: (data: OnboardingData) => void;
  onClose: () => void;
}

export default function OnboardingForm({ onComplete, onClose }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  const [formData, setFormData] = useState<OnboardingData>({
    currentGrade: '',
    targetColleges: [],
    intendedMajor: '',
    careerAspirations: '',
    currentGPA: '',
    apCoursesTaken: [],
    strongestSubjects: [],
    academicInterests: [],
    hobbies: [],
    extracurriculars: [],
    preferredLocation: [],
    studyTimePerDay: '',
    homeworkLoad: '',
    learningStyle: '',
    challenges: [],
    goals: [],
    financialAidNeeded: false,
    athleticInterest: false,
  });

  const updateField = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof OnboardingData, item: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateField(field, newArray);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onComplete(formData);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-accent-600 text-white p-6 z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">🎓 Let's Build Your College Plan</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl">&times;</button>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm">Step {step} of {totalSteps}</div>
            <div className="flex-1 mx-4 bg-white bg-opacity-30 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
            <div className="text-sm">{Math.round((step / totalSteps) * 100)}%</div>
          </div>
        </div>

        <div className="p-8">
          {/* Step 1: Academic Background */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaGraduationCap className="text-primary-600" /> Academic Background
              </h3>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  What grade are you currently in? *
                </label>
                <select
                  value={formData.currentGrade}
                  onChange={(e) => updateField('currentGrade', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                >
                  <option value="">Select grade</option>
                  <option value="8th">8th Grade</option>
                  <option value="9th">9th Grade (Freshman)</option>
                  <option value="10th">10th Grade (Sophomore)</option>
                  <option value="11th">11th Grade (Junior)</option>
                  <option value="12th">12th Grade (Senior)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  What's your current GPA? *
                </label>
                <select
                  value={formData.currentGPA}
                  onChange={(e) => updateField('currentGPA', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                >
                  <option value="">Select GPA range</option>
                  <option value="4.0+">4.0+ (All A's)</option>
                  <option value="3.7-3.9">3.7-3.9 (Mostly A's)</option>
                  <option value="3.3-3.6">3.3-3.6 (A's and B's)</option>
                  <option value="3.0-3.2">3.0-3.2 (Mostly B's)</option>
                  <option value="2.7-2.9">2.7-2.9 (B's and C's)</option>
                  <option value="below-2.7">Below 2.7</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  What AP/IB/Honors courses have you taken or are you currently taking?
                </label>
                <input
                  type="text"
                  value={formData.apCoursesTaken.join(', ')}
                  onChange={(e) => updateField('apCoursesTaken', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                  placeholder="e.g., AP Calculus AB, AP US History, IB Biology"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple courses with commas</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  What are your strongest subjects? (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Math', 'Science', 'English/Literature', 'History', 'Foreign Languages', 'Computer Science', 'Arts', 'Music'].map(subject => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => toggleArrayItem('strongestSubjects', subject)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        formData.strongestSubjects.includes(subject)
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: College & Career Aspirations */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaLightbulb className="text-primary-600" /> College & Career Goals
              </h3>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  What type of colleges interest you? *
                </label>
                <input
                  type="text"
                  value={formData.targetColleges.join(', ')}
                  onChange={(e) => updateField('targetColleges', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                  placeholder="e.g., Ivy League, UC System, MIT, Stanford, State Schools, Liberal Arts Colleges"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">You can list specific schools or types of schools</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  What major or field of study interests you? *
                </label>
                <input
                  type="text"
                  value={formData.intendedMajor}
                  onChange={(e) => updateField('intendedMajor', e.target.value)}
                  placeholder="e.g., Computer Science, Engineering, Pre-Med, Business, Undecided"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  What are your career aspirations? *
                </label>
                <textarea
                  value={formData.careerAspirations}
                  onChange={(e) => updateField('careerAspirations', e.target.value)}
                  placeholder="Describe your dream career or what you're passionate about pursuing..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  What academic interests excite you? (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['STEM', 'Business & Entrepreneurship', 'Arts & Humanities', 'Medicine & Healthcare', 'Law & Government', 'Education', 'Engineering', 'Social Sciences', 'Environmental Studies', 'Technology & Innovation'].map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleArrayItem('academicInterests', interest)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all text-sm ${
                        formData.academicInterests.includes(interest)
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location & Environment */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary-600" /> Location Preferences
              </h3>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Where would you prefer to go to college? (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Stay in my home state', 'Northeast', 'Southeast', 'Midwest', 'Southwest', 'West Coast', 'Urban/City', 'Suburban', 'Rural/Small Town', 'Near home (within 2 hours)', 'Anywhere in the US', 'International'].map(location => (
                    <button
                      key={location}
                      type="button"
                      onClick={() => toggleArrayItem('preferredLocation', location)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all text-sm ${
                        formData.preferredLocation.includes(location)
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Do you need financial aid or scholarships? *
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => updateField('financialAidNeeded', true)}
                    className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all font-semibold ${
                      formData.financialAidNeeded
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('financialAidNeeded', false)}
                    className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all font-semibold ${
                      !formData.financialAidNeeded
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Time Management */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaClock className="text-primary-600" /> Time & Study Habits
              </h3>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  How much time do you currently spend on homework/studying per day? *
                </label>
                <select
                  value={formData.studyTimePerDay}
                  onChange={(e) => updateField('studyTimePerDay', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                >
                  <option value="">Select time range</option>
                  <option value="less-than-1">Less than 1 hour</option>
                  <option value="1-2">1-2 hours</option>
                  <option value="2-3">2-3 hours</option>
                  <option value="3-4">3-4 hours</option>
                  <option value="more-than-4">More than 4 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  How would you describe your current homework load? *
                </label>
                <select
                  value={formData.homeworkLoad}
                  onChange={(e) => updateField('homeworkLoad', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                >
                  <option value="">Select load level</option>
                  <option value="light">Light - I have plenty of free time</option>
                  <option value="moderate">Moderate - Manageable but busy</option>
                  <option value="heavy">Heavy - Very busy with little free time</option>
                  <option value="overwhelming">Overwhelming - Struggling to keep up</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  What's your learning style? *
                </label>
                <select
                  value={formData.learningStyle}
                  onChange={(e) => updateField('learningStyle', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                >
                  <option value="">Select learning style</option>
                  <option value="visual">Visual - I learn best by seeing</option>
                  <option value="auditory">Auditory - I learn best by listening</option>
                  <option value="kinesthetic">Kinesthetic - I learn best by doing</option>
                  <option value="reading-writing">Reading/Writing - I learn best through text</option>
                  <option value="mixed">Mixed - I use multiple styles</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 5: Hobbies & Extracurriculars */}
          {step === 5 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaHeart className="text-primary-600" /> Interests & Activities
              </h3>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  What are your hobbies and interests outside of school?
                </label>
                <input
                  type="text"
                  value={formData.hobbies.join(', ')}
                  onChange={(e) => updateField('hobbies', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                  placeholder="e.g., Reading, Coding, Photography, Gaming, Music, Art"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple hobbies with commas</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  What extracurricular activities are you involved in?
                </label>
                <input
                  type="text"
                  value={formData.extracurriculars.join(', ')}
                  onChange={(e) => updateField('extracurriculars', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                  placeholder="e.g., Debate Team, Robotics Club, Student Government, Volunteer Work"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple activities with commas</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Are you interested in playing college sports? *
                </label>
                <div className="flex gap-4 mb-3">
                  <button
                    type="button"
                    onClick={() => updateField('athleticInterest', true)}
                    className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all font-semibold ${
                      formData.athleticInterest
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('athleticInterest', false)}
                    className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all font-semibold ${
                      !formData.athleticInterest
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    No
                  </button>
                </div>
                {formData.athleticInterest && (
                  <input
                    type="text"
                    value={formData.athleticSport || ''}
                    onChange={(e) => updateField('athleticSport', e.target.value)}
                    placeholder="Which sport(s)?"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  />
                )}
              </div>
            </div>
          )}

          {/* Step 6: Challenges & Goals */}
          {step === 6 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaTrophy className="text-primary-600" /> Challenges & Goals
              </h3>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  What challenges are you facing in your college prep journey? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    'Time management',
                    'Choosing the right courses',
                    'Maintaining GPA',
                    'Test anxiety (SAT/ACT)',
                    'Extracurricular balance',
                    'Essay writing',
                    'College selection',
                    'Financial concerns',
                    'Lack of guidance',
                    'Staying motivated'
                  ].map(challenge => (
                    <button
                      key={challenge}
                      type="button"
                      onClick={() => toggleArrayItem('challenges', challenge)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                        formData.challenges.includes(challenge)
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                      }`}
                    >
                      {challenge}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  What are your main goals? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    'Get into my dream college',
                    'Maximize scholarship opportunities',
                    'Build a strong academic record',
                    'Develop leadership skills',
                    'Explore career paths',
                    'Improve test scores',
                    'Create a balanced schedule',
                    'Stand out in applications'
                  ].map(goal => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleArrayItem('goals', goal)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                        formData.goals.includes(goal)
                          ? 'bg-accent-600 text-white border-accent-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-accent-400'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Review & Confirm */}
          {step === 7 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">📋 Review Your Profile</h3>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <ProfileItem label="Current Grade" value={formData.currentGrade} />
                <ProfileItem label="Current GPA" value={formData.currentGPA} />
                <ProfileItem label="Target Colleges" value={formData.targetColleges.join(', ')} />
                <ProfileItem label="Intended Major" value={formData.intendedMajor} />
                <ProfileItem label="Career Aspirations" value={formData.careerAspirations} />
                <ProfileItem label="Study Time/Day" value={formData.studyTimePerDay} />
                <ProfileItem label="Strongest Subjects" value={formData.strongestSubjects.join(', ')} />
                <ProfileItem label="Academic Interests" value={formData.academicInterests.join(', ')} />
                <ProfileItem label="Preferred Locations" value={formData.preferredLocation.join(', ')} />
                <ProfileItem label="Financial Aid Needed" value={formData.financialAidNeeded ? 'Yes' : 'No'} />
              </div>

              <div className="bg-primary-50 border-2 border-primary-300 rounded-lg p-6">
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong className="text-primary-800">Ready to build your personalized 4-year college plan?</strong>
                  <br /><br />
                  Based on your profile, I'll create a customized academic roadmap that aligns with your target colleges,
                  career aspirations, and learning style. This includes course recommendations, extracurricular suggestions,
                  timeline planning, and test prep strategies.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Back
          </button>

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all font-bold shadow-lg"
            >
              Generate My 4-Year Plan 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-sm font-bold text-gray-600">{label}</div>
      <div className="text-gray-800">{value || 'Not specified'}</div>
    </div>
  );
}

