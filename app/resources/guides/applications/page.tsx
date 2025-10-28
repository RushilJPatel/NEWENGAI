'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ApplicationsGuide() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
        {/* Consistent Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link href="/dashboard" className="text-2xl font-bold text-primary-600 flex items-center">
                🧭 <span className="ml-2">College Compass</span>
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link href="/dashboard" className="px-4 py-2 text-gray-600 hover:text-primary-600">
                  💬 AI Chat
                </Link>
                <Link href="/tracker" className="px-4 py-2 text-gray-600 hover:text-primary-600">
                  📋 Tracker
                </Link>
                <Link href="/essays" className="px-4 py-2 text-gray-600 hover:text-primary-600">
                  ✍️ Essays
                </Link>
                <Link href="/timeline" className="px-4 py-2 text-gray-600 hover:text-primary-600">
                  📅 Timeline
                </Link>
                <Link href="/resources" className="px-4 py-2 bg-primary-100 text-primary-600 rounded-lg font-semibold">
                  📚 Resources
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto max-w-4xl p-4 sm:p-8">
        <Link href="/resources" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          ← Back to Resources
        </Link>

        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10">
          <div className="flex items-center mb-6">
            <span className="text-6xl mr-4">📖</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Complete Guide to College Applications</h1>
              <p className="text-gray-600 mt-2">Everything you need to know from start to finish</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">📋 Application Types</h2>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-lg">Early Decision (ED)</h3>
              <ul className="ml-4">
                <li><strong>Deadline:</strong> November 1 or November 15</li>
                <li><strong>Binding:</strong> You MUST attend if accepted</li>
                <li><strong>Pros:</strong> Higher acceptance rate (often 2x regular)</li>
                <li><strong>Cons:</strong> Can't compare financial aid offers</li>
                <li><strong>Best for:</strong> Your absolute #1 school where finances work</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-lg">Early Action (EA)</h3>
              <ul className="ml-4">
                <li><strong>Deadline:</strong> November 1</li>
                <li><strong>Binding:</strong> NO - You can apply to multiple schools</li>
                <li><strong>Pros:</strong> Early decision, non-binding, shows interest</li>
                <li><strong>Cons:</strong> Slightly lower boost than ED</li>
                <li><strong>Best for:</strong> Top-choice schools where you want flexibility</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-lg">Restrictive/Single-Choice Early Action (REA/SCEA)</h3>
              <ul className="ml-4">
                <li><strong>Schools:</strong> Harvard, Stanford, Yale, Princeton, Notre Dame</li>
                <li><strong>Restriction:</strong> Can't apply EA/ED to other PRIVATE schools</li>
                <li><strong>Can still apply to:</strong> Public school EA, rolling admissions</li>
                <li><strong>Pros:</strong> Shows strong interest, higher acceptance rate</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-lg">Regular Decision (RD)</h3>
              <ul className="ml-4">
                <li><strong>Deadline:</strong> January 1-15 (most common)</li>
                <li><strong>Decision:</strong> Late March / Early April</li>
                <li><strong>Pros:</strong> More time to improve application, compare offers</li>
                <li><strong>Best for:</strong> Most of your applications</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">🎯 Creating a Balanced College List</h2>
            <p className="mb-4">Apply to <strong>8-12 schools</strong> total with this breakdown:</p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-bold text-red-700">3-4 Reach Schools</h3>
                <p className="text-sm">Your stats are below the 25th percentile. Acceptance rate {"<"}15%. Dream schools!</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-700">3-4 Target Schools</h3>
                <p className="text-sm">Your stats are in the middle 50%. You have a good shot. Most likely outcomes.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-700">2-3 Safety Schools</h3>
                <p className="text-sm">Your stats are above 75th percentile. Acceptance rate {">"}50%. Guaranteed admission.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">📝 Common Application Sections</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-bold">1. Profile</h3>
                <p>Personal info, address, citizenship, demographics (optional but helps with diversity initiatives)</p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-bold">2. Family</h3>
                <p>Parent info, siblings, household. Be honest about parent education (first-gen status can help!).</p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-bold">3. Education</h3>
                <p>Current school, GPA (if provided), class rank, honors/AP courses, future plans</p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-bold">4. Testing (Optional for most schools)</h3>
                <p>SAT/ACT scores. Research each school's test policy. Test-optional ≠ test-blind.</p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-bold">5. Activities (10 slots)</h3>
                <p><strong>Most important after grades/scores!</strong> Quality over quantity. Show leadership, impact, and passion.</p>
                <ul className="ml-4 mt-2">
                  <li>List in order of importance TO YOU</li>
                  <li>Include hours/week and weeks/year</li>
                  <li>Describe accomplishments, not just duties</li>
                  <li>Quantify impact when possible</li>
                </ul>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-bold">6. Honors (5 slots)</h3>
                <p>Academic awards, competitions, recognition. Include level (school, state, national, international).</p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-bold">7. Writing (650 words)</h3>
                <p>Your main personal statement. Choose from 7 prompts. This is YOUR story - make it count!</p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-bold">8. Additional Information</h3>
                <p>Explain special circumstances: family hardships, gaps in education, COVID impact, disciplinary issues</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">📅 Timeline</h2>
            
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-3 rounded">
                <strong>Spring Junior Year:</strong> Request letters of recommendation, visit colleges, take SAT/ACT
              </div>
              <div className="bg-gradient-to-r from-green-100 to-green-50 p-3 rounded">
                <strong>Summer Before Senior Year:</strong> Write essays, finalize college list, start Common App
              </div>
              <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-3 rounded">
                <strong>September:</strong> Complete FAFSA (opens Oct 1), ask for transcripts
              </div>
              <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-3 rounded">
                <strong>October:</strong> Finalize EA/ED apps, proofread everything 10 times
              </div>
              <div className="bg-gradient-to-r from-red-100 to-red-50 p-3 rounded">
                <strong>November 1:</strong> EA/ED DEADLINE! Submit before 11:59 PM local time
              </div>
              <div className="bg-gradient-to-r from-primary-100 to-primary-50 p-3 rounded">
                <strong>November 30:</strong> UC System deadline (all 9 UCs)
              </div>
              <div className="bg-gradient-to-r from-primary-100 to-primary-50 p-3 rounded">
                <strong>December-January:</strong> Finish RD apps, send mid-year grades
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">✅ Final Checklist</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-2">
                <li>✓ Application fee paid or waiver requested</li>
                <li>✓ Official test scores sent (if submitting)</li>
                <li>✓ Transcript requested from counselor</li>
                <li>✓ 2-3 letters of recommendation submitted</li>
                <li>✓ Personal statement proofread by 3+ people</li>
                <li>✓ Supplemental essays completed</li>
                <li>✓ FAFSA and/or CSS Profile submitted</li>
                <li>✓ Portal account created for each school</li>
                <li>✓ All materials show as "received" in portals</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
              <p className="mb-4">Our AI can answer specific questions about YOUR application!</p>
              <Link href="/dashboard" className="inline-block px-6 py-3 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100">
                Chat with AI Advisor →
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

