'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EssayWordCounter() {
  const { status } = useSession();
  const router = useRouter();
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(text.length);
  }, [text]);

  const getStatus = (count: number, max: number) => {
    const percentage = (count / max) * 100;
    if (percentage > 100) return { color: 'red', text: 'Over limit!' };
    if (percentage > 90) return { color: 'orange', text: 'Almost at limit' };
    if (percentage > 70) return { color: 'yellow', text: 'Good progress' };
    return { color: 'green', text: 'Keep writing' };
  };

  const commonAppStatus = getStatus(wordCount, 650);
  const ucPIQStatus = getStatus(wordCount, 350);
  const coalitionStatus = getStatus(wordCount, 650);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
        {/* Consistent Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-2xl font-bold text-indigo-600 flex items-center">
              🎓 <span className="ml-2">College Planner AI</span>
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
        </div>
      </nav>

      <div className="container mx-auto max-w-5xl p-4 sm:p-8">
        <Link href="/resources" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6">
          ← Back to Resources
        </Link>

        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10">
          <div className="flex items-center mb-6">
            <span className="text-6xl mr-4">✍️</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Essay Word Counter</h1>
              <p className="text-gray-600 mt-2">Track your word count for college application essays</p>
            </div>
          </div>

          {/* Word Limits Reference */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-blue-900">Common App</h3>
              <div className="text-3xl font-bold text-blue-600">650</div>
              <p className="text-sm text-blue-700">words maximum</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
              <h3 className="font-bold text-purple-900">UC PIQs</h3>
              <div className="text-3xl font-bold text-purple-600">350</div>
              <p className="text-sm text-purple-700">words each (4 essays)</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <h3 className="font-bold text-green-900">Coalition App</h3>
              <div className="text-3xl font-bold text-green-600">500-650</div>
              <p className="text-sm text-green-700">words</p>
            </div>
          </div>

          {/* Text Area */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Paste or type your essay here:
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y font-serif text-base leading-relaxed"
              placeholder="Start writing your college essay here..."
            />
          </div>

          {/* Count Display */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2 opacity-90">Word Count</h3>
              <div className="text-5xl font-bold">{wordCount}</div>
              <p className="mt-2 text-sm opacity-90">words</p>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2 opacity-90">Character Count</h3>
              <div className="text-5xl font-bold">{charCount}</div>
              <p className="mt-2 text-sm opacity-90">characters (with spaces)</p>
            </div>
          </div>

          {/* Status for Different Applications */}
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-2 ${
              commonAppStatus.color === 'red' ? 'bg-red-50 border-red-300' :
              commonAppStatus.color === 'orange' ? 'bg-orange-50 border-orange-300' :
              commonAppStatus.color === 'yellow' ? 'bg-yellow-50 border-yellow-300' :
              'bg-green-50 border-green-300'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Common App Essay (650 words max)</h3>
                <span className="font-semibold">{wordCount} / 650</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    commonAppStatus.color === 'red' ? 'bg-red-500' :
                    commonAppStatus.color === 'orange' ? 'bg-orange-500' :
                    commonAppStatus.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((wordCount / 650) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm mt-1 font-medium">{commonAppStatus.text}</p>
            </div>

            <div className={`p-4 rounded-lg border-2 ${
              ucPIQStatus.color === 'red' ? 'bg-red-50 border-red-300' :
              ucPIQStatus.color === 'orange' ? 'bg-orange-50 border-orange-300' :
              ucPIQStatus.color === 'yellow' ? 'bg-yellow-50 border-yellow-300' :
              'bg-green-50 border-green-300'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">UC PIQ Essay (350 words max each)</h3>
                <span className="font-semibold">{wordCount} / 350</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    ucPIQStatus.color === 'red' ? 'bg-red-500' :
                    ucPIQStatus.color === 'orange' ? 'bg-orange-500' :
                    ucPIQStatus.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((wordCount / 350) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm mt-1 font-medium">{ucPIQStatus.text}</p>
            </div>

            <div className={`p-4 rounded-lg border-2 ${
              coalitionStatus.color === 'red' ? 'bg-red-50 border-red-300' :
              coalitionStatus.color === 'orange' ? 'bg-orange-50 border-orange-300' :
              coalitionStatus.color === 'yellow' ? 'bg-yellow-50 border-yellow-300' :
              'bg-green-50 border-green-300'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Coalition App (500-650 words)</h3>
                <span className="font-semibold">{wordCount} / 650</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    coalitionStatus.color === 'red' ? 'bg-red-500' :
                    commonAppStatus.color === 'orange' ? 'bg-orange-500' :
                    coalitionStatus.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((wordCount / 650) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm mt-1 font-medium">{coalitionStatus.text}</p>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
            <h3 className="font-bold text-indigo-900 mb-2">💡 Essay Writing Tips:</h3>
            <ul className="text-sm text-indigo-800 space-y-1">
              <li>• Aim for 90-100% of the word limit to show thoroughness</li>
              <li>• Quality over quantity - every word should add value</li>
              <li>• Going slightly over (650→655) is usually fine, but don't push it</li>
              <li>• UC PIQs are STRICT at 350 words - they cut off anything over</li>
              <li>• Use this tool to track as you write and edit</li>
            </ul>
          </div>

          {/* Link to Essay Hub */}
          <div className="mt-6 text-center">
            <Link href="/essays" className="inline-block px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">
              View Essay Prompts & Tips →
            </Link>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

