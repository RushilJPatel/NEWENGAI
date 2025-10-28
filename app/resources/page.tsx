'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Resources() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const resources = {
    guides: [
      { title: 'Complete Guide to College Applications', description: 'Step-by-step walkthrough of the entire process', icon: '📖', category: 'guide' },
      { title: 'Financial Aid & FAFSA Guide', description: 'Everything you need to know about paying for college', icon: '💰', category: 'guide' },
      { title: 'SAT/ACT Prep Strategy', description: 'Study tips and test-taking strategies', icon: '📝', category: 'guide' },
      { title: 'Campus Visit Checklist', description: 'What to look for and questions to ask', icon: '🏫', category: 'guide' }
    ],
    tools: [
      { title: 'College Cost Calculator', description: 'Estimate 4-year cost of attendance', icon: '🧮', category: 'tool' },
      { title: 'GPA Calculator', description: 'Calculate weighted and unweighted GPA', icon: '📊', category: 'tool' },
      { title: 'Essay Word Counter', description: 'Track your essay word count', icon: '✍️', category: 'tool' },
      { title: 'Scholarship Finder', description: 'Search thousands of scholarships', icon: '🔍', category: 'tool' }
    ],
    videos: [
      { title: 'How to Write a Compelling Essay', description: 'Video tutorial with examples', icon: '🎥', category: 'video' },
      { title: 'College Interview Tips', description: 'Ace your admissions interview', icon: '🎬', category: 'video' },
      { title: 'Choosing Your Major', description: 'Find the right path for you', icon: '📹', category: 'video' },
      { title: 'Financial Aid Explained', description: 'Understanding your aid package', icon: '🎞️', category: 'video' }
    ],
    links: [
      { title: 'Common Application', description: 'Apply to 900+ colleges', url: 'https://www.commonapp.org', icon: '🔗', category: 'link' },
      { title: 'FAFSA', description: 'Free Application for Federal Student Aid', url: 'https://studentaid.gov/fafsa', icon: '🔗', category: 'link' },
      { title: 'College Board', description: 'SAT, AP, and college search', url: 'https://www.collegeboard.org', icon: '🔗', category: 'link' },
      { title: 'Niche', description: 'College rankings and reviews', url: 'https://www.niche.com', icon: '🔗', category: 'link' }
    ]
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
              <Link href="/tracker" className="px-4 py-2 text-gray-600 hover:text-indigo-600">
                📋 Tracker
              </Link>
              <Link href="/essays" className="px-4 py-2 text-gray-600 hover:text-indigo-600">
                ✍️ Essays
              </Link>
              <Link href="/timeline" className="px-4 py-2 text-gray-600 hover:text-indigo-600">
                📅 Timeline
              </Link>
              <Link href="/resources" className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-semibold">
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

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📚 Resources Library</h1>
          <p className="text-gray-600">Curated guides, tools, videos, and links to help you succeed</p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {['all', 'guide', 'tool', 'video', 'link'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}s
            </button>
          ))}
        </div>

        {/* Guides Section */}
        {(activeCategory === 'all' || activeCategory === 'guide') && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">📖 Comprehensive Guides</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.guides.map((resource, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer group">
                  <div className="flex items-start">
                    <div className="text-5xl mr-4 group-hover:scale-110 transition-transform">{resource.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600">{resource.description}</p>
                      <button className="mt-4 text-indigo-600 font-semibold hover:text-indigo-700">
                        Read Guide →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tools Section */}
        {(activeCategory === 'all' || activeCategory === 'tool') && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🛠️ Helpful Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.tools.map((resource, idx) => (
                <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer border-2 border-purple-200 group">
                  <div className="flex items-start">
                    <div className="text-5xl mr-4 group-hover:scale-110 transition-transform">{resource.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600">{resource.description}</p>
                      <button className="mt-4 text-purple-600 font-semibold hover:text-purple-700">
                        Use Tool →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Section */}
        {(activeCategory === 'all' || activeCategory === 'video') && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🎥 Video Tutorials</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.videos.map((resource, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer border-2 border-blue-200 group">
                  <div className="flex items-start">
                    <div className="text-5xl mr-4 group-hover:scale-110 transition-transform">{resource.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600">{resource.description}</p>
                      <button className="mt-4 text-blue-600 font-semibold hover:text-blue-700">
                        Watch Video →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Important Links Section */}
        {(activeCategory === 'all' || activeCategory === 'link') && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🔗 Important Links</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.links.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all border-2 border-green-200 group"
                >
                  <div className="flex items-start">
                    <div className="text-5xl mr-4 group-hover:scale-110 transition-transform">{resource.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{resource.description}</p>
                      <div className="text-green-600 font-semibold flex items-center">
                        Visit Website →
                        <span className="ml-2 text-xs">🔗</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Ask AI Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-2xl p-8 text-white text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h3 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h3>
          <p className="text-xl mb-6 opacity-90">Ask our AI chatbot anything about college planning!</p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
          >
            Chat with AI Now
          </Link>
        </div>
      </div>
    </div>
  );
}

