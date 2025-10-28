'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '../components/Logo';
import PremiumBadge from '../components/PremiumBadge';
import { useSubscription } from '../providers/SubscriptionProvider';
import { FaClipboardList, FaPencilAlt, FaCalendarAlt, FaBook, FaPlus, FaPaperPlane, FaGraduationCap, FaBullseye, FaDollarSign, FaFileAlt, FaUniversity, FaSignOutAlt, FaCrown } from 'react-icons/fa';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { tier, hasAccess } = useSubscription();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your College Planning AI Assistant!\n\nI can help you with:\n• Create custom 4-year high school schedules based on your target colleges\n• College recommendations and requirements\n• Application process and essays\n• Financial aid and scholarships\n• SAT/ACT prep strategies\n• Major selection and career planning\n• Timeline and deadlines\n\n**Try asking me:**\n\"Create a 4-year schedule for me targeting [college name]\"\n\"What courses should I take to apply to [college type]?\"\n\nWhat colleges are you interested in?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          userMessage: input
        })
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Create a 4-year schedule for me targeting MIT",
    "I want to apply to UC schools - what courses should I take?",
    "Plan my schedule for Ivy League colleges",
    "What makes a good college essay?",
    "How do I choose the right college?",
    "Tell me about financial aid and scholarships"
  ];

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex items-center justify-center">
        <div className="text-2xl text-secondary-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Logo size={32} />
              <h1 className="text-2xl font-bold text-secondary-800">College Compass</h1>
            </div>
            <p className="text-sm text-secondary-600 mb-2">Hey {session?.user?.name || session?.user?.email}!</p>
            <PremiumBadge tier={tier} size="md" />
          </div>

          {/* Quick Navigation */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Quick Access</h3>
            <div className="space-y-2">
              <Link href="/tracker" className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-all text-sm">
                <FaClipboardList /> Application Tracker
              </Link>
              <Link href="/essays" className="flex items-center gap-2 px-4 py-2 bg-accent-50 text-accent-700 rounded-lg hover:bg-accent-100 transition-all text-sm">
                <FaPencilAlt /> Essay Hub
              </Link>
              <Link href="/timeline" className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-all text-sm">
                <FaCalendarAlt /> Timeline
              </Link>
              <Link href="/resources" className="flex items-center gap-2 px-4 py-2 bg-accent-50 text-accent-700 rounded-lg hover:bg-accent-100 transition-all text-sm">
                <FaBook /> Resources
              </Link>
              <Link href="/billing" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all text-sm shadow-md">
                <FaCrown /> Billing & Plans
              </Link>
            </div>
          </div>

          <button
            onClick={() => {
              setMessages([{
                id: Date.now().toString(),
                role: 'assistant',
                content: "Hi! I'm your College Planning AI Assistant!\n\nI can help you with:\n• Create custom 4-year high school schedules based on your target colleges\n• College recommendations and requirements\n• Application process and essays\n• Financial aid and scholarships\n• SAT/ACT prep strategies\n• Major selection and career planning\n• Timeline and deadlines\n\n**Try asking me:**\n\"Create a 4-year schedule for me targeting [college name]\"\n\"What courses should I take to apply to [college type]?\"\n\nWhat colleges are you interested in?",
                timestamp: new Date()
              }]);
            }}
            className="flex items-center justify-center gap-2 w-full mb-4 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-semibold"
          >
            <FaPlus /> New Conversation
          </button>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Quick Topics</h3>
            <div className="space-y-2">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(question)}
                  className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 transition-all"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-accent-100 text-accent-700 rounded-lg hover:bg-accent-200 transition-all font-semibold"
            >
              <FaCalendarAlt /> Application Timeline
            </button>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                          className={`max-w-3xl px-6 py-4 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-primary-600 text-white'
                              : 'bg-white text-secondary-800 shadow-md'
                          }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center mb-2">
                      <Logo size={24} className="mr-2" />
                      <span className="font-semibold text-sm">College Advisor AI</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-primary-200' : 'text-secondary-400'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-3xl px-6 py-4 rounded-2xl bg-white text-secondary-800 shadow-md">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🤖</span>
                    <span className="text-gray-600">Thinking...</span>
                    <div className="ml-3 flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-3">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about college planning..."
                  className="flex-1 px-4 py-3 border-2 border-secondary-300 rounded-lg focus:border-primary-600 focus:outline-none resize-none"
                  rows={2}
                  disabled={loading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading || !input.trim()}
                  className="flex items-center gap-2 px-8 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane /> Send
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Modal */}
        {showTimeline && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">📅 College Application Timeline</h2>
                <button
                  onClick={() => setShowTimeline(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <TimelineSection
                  title="Junior Year (Grade 11)"
                  items={[
                    "Fall: Take PSAT, start exploring colleges",
                    "Winter: Begin college research, attend college fairs",
                    "Spring: Take SAT/ACT, visit campuses",
                    "Summer: Work on college essay, create college list"
                  ]}
                />
                <TimelineSection
                  title="Senior Year Fall (August - December)"
                  items={[
                    "August: Finalize college list, request recommendations",
                    "September: Complete Common App, start applications",
                    "October: Submit Early Action/Early Decision apps",
                    "November: Complete remaining applications",
                    "December: Submit regular decision apps (most due Jan 1)"
                  ]}
                />
                <TimelineSection
                  title="Senior Year Spring (January - May)"
                  items={[
                    "January-March: Complete FAFSA and financial aid forms",
                    "March-April: Receive admission decisions",
                    "April: Visit accepted schools, compare financial aid",
                    "May 1: Submit enrollment deposit (National Decision Day)"
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-indigo-600 mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

