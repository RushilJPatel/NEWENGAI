'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '../components/Logo';
import { FaComments, FaClipboardList, FaPencilAlt, FaCalendarAlt, FaBook, FaLightbulb } from 'react-icons/fa';

interface EssayPrompt {
  id: string;
  year: string;
  text: string;
  tips: string[];
}

export default function EssayHub() {
  const { data: session } = useSession();
  const router = useRouter();
  const [prompts, setPrompts] = useState<EssayPrompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<EssayPrompt | null>(null);

  useEffect(() => {
    // Auth temporarily disabled
    // if (status === 'unauthenticated') {
    //   router.push('/login');
    // }
    loadPrompts();
  }, []); // Auth disabled, removed dependencies

  const loadPrompts = async () => {
    // Mock data - in production, load from API
    setPrompts([
      {
        id: '1',
        year: '2025-2026',
        text: 'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.',
        tips: [
          'Start with a specific moment or scene that captures your background/identity',
          'Avoid generic statements - be vulnerable and deeply personal',
          'Connect your background to HOW you think, not just what you do',
          'Show evolution: How has your understanding of this identity changed over time?',
          'End by tying it to your future: How will this shape your college experience?',
          'Common topics: cultural identity, family background, LGBTQ+ identity, unique talent, socioeconomic challenges'
        ]
      },
      {
        id: '2',
        year: '2025-2026',
        text: 'The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?',
        tips: [
          'Pick a real failure - not a humble-brag (e.g., "I got a B+")',
          'Spend MORE time on reflection than describing the failure',
          'Show specific actions you took to overcome or learn from it',
          'Avoid: blaming others, making excuses, or being overly dramatic',
          'Best approach: academic setback, competition loss, rejection, family challenge',
          'Demonstrate resilience through concrete examples of what you changed'
        ]
      },
      {
        id: '3',
        year: '2025-2026',
        text: 'Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?',
        tips: [
          'Pick a belief YOU held, not just something you debated with someone',
          'Show your thought process: What evidence made you question it?',
          'Be nuanced - avoid political rants or overly controversial topics',
          'Great examples: changing views on education, religion, social issues, family traditions',
          'Include what prompted the questioning (book, experience, conversation)',
          'Show intellectual humility - it\'s okay if your new view evolved further'
        ]
      },
      {
        id: '4',
        year: '2025-2026',
        text: 'Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?',
        tips: [
          'The "surprising" part is key - should be unexpected kindness',
          'Focus on small, specific acts (not "my mom always supports me")',
          'Show how it changed your behavior or perspective',
          'Pay it forward: How did you show gratitude or help others?',
          'Good examples: teacher who stayed late, stranger\'s kindness, sibling\'s sacrifice',
          'Avoid: sounding entitled or not connecting it to personal growth'
        ]
      },
      {
        id: '5',
        year: '2025-2026',
        text: 'Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.',
        tips: [
          'Focus on the SPARK that led to growth, not just listing achievements',
          'Can be a small moment (realization) or big event (winning/losing something)',
          'Show a clear before/after: Who were you before vs. after?',
          'Examples: leadership failure that taught you, conversation that shifted perspective, project that revealed passion',
          'Be specific about what understanding changed',
          'Spend 40% on event, 60% on the growth/reflection'
        ]
      },
      {
        id: '6',
        year: '2025-2026',
        text: 'Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?',
        tips: [
          'This is the "why this major?" essay in disguise',
          'Show DEPTH: specific aspects, not surface-level interest',
          'Include resources you seek out: specific books, YouTubers, professors, online courses',
          'Explain the WHY: What about this topic fascinates you intellectually?',
          'Connect to broader questions or future goals',
          'Examples: specific CS topic, historical era, mathematical concept, design principle'
        ]
      },
      {
        id: '7',
        year: '2025-2026',
        text: 'Share an essay on any topic of your choice. It can be one you\'ve already written, one that responds to a different prompt, or one of your own design.',
        tips: [
          'Only use this if your story truly doesn\'t fit the other 6 prompts',
          'You STILL need intro, body, reflection, and conclusion',
          'Creative topics: unique hobby, family tradition, philosophical question, unusual experience',
          'Don\'t just submit a creative writing piece - it must reveal WHO you are',
          'Structure is still important even with freedom',
          'Ask yourself: Could this fit prompts 1-6? If yes, use those instead for clarity'
        ]
      }
    ]);
  };

  // Auth loading check disabled
  // if (status === 'loading') {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  // }

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
              <Link href="/essays" className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-semibold">
                <FaPencilAlt /> Essays
              </Link>
              <Link href="/timeline" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600">
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

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <FaPencilAlt className="text-indigo-600" /> Essay Hub
          </h1>
          <p className="text-gray-600">Common App prompts, writing tips, and examples to craft your perfect essay</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Prompts List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Common App Prompts</h2>
              <p className="text-sm text-gray-600 mb-4">2025-2026 Academic Year • 650 words max</p>
              <div className="space-y-3">
                {prompts.map((prompt, idx) => (
                  <button
                    key={prompt.id}
                    onClick={() => setSelectedPrompt(prompt)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedPrompt?.id === prompt.id
                        ? 'bg-indigo-100 border-2 border-indigo-600'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="font-bold text-gray-800">Prompt {idx + 1}</div>
                    <div className="text-sm text-gray-600 mt-1 line-clamp-2">{prompt.text}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-500">
                <div className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <FaLightbulb /> Pro Tip
                </div>
                <div className="text-sm text-green-800">
                  Ask our AI chatbot to help brainstorm ideas for any prompt!
                </div>
                <Link
                  href="/dashboard"
                  className="mt-3 block text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-semibold"
                >
                  Chat with AI
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {selectedPrompt ? (
              <>
                {/* Selected Prompt Details */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Prompt {prompts.findIndex(p => p.id === selectedPrompt.id) + 1}</h2>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                      650 words max
                    </span>
                  </div>
                  <div className="text-lg text-gray-700 leading-relaxed mb-6 p-4 bg-gray-50 rounded-lg">
                    {selectedPrompt.text}
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FaLightbulb className="text-yellow-500" /> Writing Tips
                    </h3>
                    <ul className="space-y-3">
                      {selectedPrompt.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-600 mr-3 text-xl">✓</span>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Writing Guidelines */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-8 border-2 border-purple-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">📝 Essay Writing Guidelines</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">1. Start with a Hook</h4>
                      <p className="text-gray-700 text-sm">Begin with something that grabs attention - a vivid scene, surprising statement, or compelling question.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">2. Show, Don't Tell</h4>
                      <p className="text-gray-700 text-sm">Use specific examples and details. Instead of "I learned leadership," describe the moment you led.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">3. Be Authentic</h4>
                      <p className="text-gray-700 text-sm">Write in your own voice. Don't try to sound overly academic or use vocabulary you wouldn't normally use.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">4. Focus on Growth</h4>
                      <p className="text-gray-700 text-sm">Show how experiences shaped you. Reflection and self-awareness are key.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">5. Edit Ruthlessly</h4>
                      <p className="text-gray-700 text-sm">Every word counts. Cut unnecessary words, vary sentence length, and read aloud.</p>
                    </div>
                  </div>
                </div>

                {/* Example Essay Snippets */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">📖 Strong Opening Examples</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <p className="text-gray-700 italic mb-2">"I've spent 300 hours in a kitchen that doesn't exist..."</p>
                      <p className="text-sm text-gray-600">Immediately raises curiosity - what does this mean?</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <p className="text-gray-700 italic mb-2">"The first time I failed, I was seven years old..."</p>
                      <p className="text-sm text-gray-600">Sets up a story arc about growth and resilience</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <p className="text-gray-700 italic mb-2">"My grandmother's hands tell stories in a language I can't speak..."</p>
                      <p className="text-sm text-gray-600">Poetic, visual, hints at cultural heritage</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="flex justify-center mb-4">
                  <FaPencilAlt className="text-6xl text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Select a Prompt to Get Started</h3>
                <p className="text-gray-600">Choose from the Common App prompts on the left to see detailed tips and examples</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

