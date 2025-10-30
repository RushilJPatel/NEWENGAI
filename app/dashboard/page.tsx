'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '../components/Logo';
import PremiumBadge from '../components/PremiumBadge';
import OnboardingForm from '../components/OnboardingForm';
import { useSubscription } from '../providers/SubscriptionProvider';
import { FaClipboardList, FaPencilAlt, FaCalendarAlt, FaBook, FaPlus, FaPaperPlane, FaGraduationCap, FaBullseye, FaDollarSign, FaFileAlt, FaUniversity, FaSignOutAlt, FaCrown, FaSave, FaHistory, FaTrash } from 'react-icons/fa';

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
  const [messageCount, setMessageCount] = useState(0);
  const MESSAGE_LIMITS = { free: 10, basic: Infinity, premium: Infinity };
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [conversationId, setConversationId] = useState<string>('');
  const [conversationTitle, setConversationTitle] = useState('New Conversation');
  const [chatHistories, setChatHistories] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [savingChat, setSavingChat] = useState(false);
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

  // Load user profile and check if onboarding is completed
  useEffect(() => {
    if (session?.user?.email) {
      loadUserProfile();
      if (tier !== 'free') {
        loadChatHistories();
      }
    }
  }, [session, tier]);

  const loadUserProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      if (data.profile) {
        setUserProfile(data.profile);
        if (!data.profile.onboardingCompleted) {
          setShowOnboarding(true);
        }
      } else {
        // New user, show onboarding
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  // Load chat histories from localStorage
  const loadChatHistories = () => {
    try {
      const saved = localStorage.getItem('chatHistories');
      if (saved) {
        const histories = JSON.parse(saved);
        setChatHistories(histories);
      }
    } catch (error) {
      console.error('Error loading chat histories:', error);
    }
  };

  const handleOnboardingComplete = (data: any) => {
    setUserProfile(data);
    setShowOnboarding(false);
    // Start a new conversation with the profile data
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Great! I've got your profile. I'm ready to help you build your personalized 4-year college plan!\n\nBased on your information:\n- Grade: ${data.currentGrade}\n- Target Colleges: ${data.targetColleges.join(', ')}\n- Intended Major: ${data.intendedMajor}\n- Current GPA: ${data.currentGPA}\n\nI can now create a customized academic roadmap tailored specifically to your goals!\n\n**To get started, try asking:**\n- "Create my complete 4-year high school plan"\n- "What courses should I take to get into ${data.targetColleges[0] || 'my target colleges'}?"\n- "Help me plan my schedule for next year"\n\nWhat would you like to work on first?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  // Save conversation to localStorage
  const saveConversation = () => {
    if (tier === 'free') {
      alert('Chat history saving is a Premium feature!\n\nUpgrade to Basic or Premium to:\n✓ Save unlimited conversations\n✓ Resume chats anytime\n✓ Never lose your planning sessions\n\nVisit the Billing page to upgrade!');
      return;
    }

    if (messages.length <= 1) {
      alert('No messages to save yet!');
      return;
    }

    setSavingChat(true);
    try {
      const title = conversationTitle === 'New Conversation' 
        ? messages[1]?.content.substring(0, 50) + '...' || 'Untitled Chat'
        : conversationTitle;

      const id = conversationId || `conv_${Date.now()}`;

      // Get existing histories
      const saved = localStorage.getItem('chatHistories');
      const histories = saved ? JSON.parse(saved) : [];

      // Find if conversation already exists
      const existingIndex = histories.findIndex((h: any) => h.conversationId === id);

      const chatData = {
        conversationId: id,
        title: title,
        messages: messages,
        lastActive: new Date().toISOString(),
        createdAt: existingIndex >= 0 ? histories[existingIndex].createdAt : new Date().toISOString()
      };

      if (existingIndex >= 0) {
        // Update existing
        histories[existingIndex] = chatData;
      } else {
        // Add new
        histories.unshift(chatData);
      }

      // Keep only last 50 conversations
      const limitedHistories = histories.slice(0, 50);
      localStorage.setItem('chatHistories', JSON.stringify(limitedHistories));

      setConversationId(id);
      setConversationTitle(title);
      loadChatHistories();
      alert('✓ Conversation saved successfully!');
    } catch (error) {
      console.error('Error saving conversation:', error);
      alert('Failed to save conversation. Please try again.');
    } finally {
      setSavingChat(false);
    }
  };

  // Load conversation from localStorage
  const loadConversation = (convId: string) => {
    try {
      const saved = localStorage.getItem('chatHistories');
      if (saved) {
        const histories = JSON.parse(saved);
        const conversation = histories.find((h: any) => h.conversationId === convId);
        
        if (conversation) {
          setMessages(conversation.messages);
          setConversationId(convId);
          setConversationTitle(conversation.title);
          setShowHistory(false);
          
          // Update last active time
          conversation.lastActive = new Date().toISOString();
          localStorage.setItem('chatHistories', JSON.stringify(histories));
        }
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
      alert('Failed to load conversation');
    }
  };

  // Delete conversation from localStorage
  const deleteConversation = (convId: string) => {
    if (!confirm('Are you sure you want to delete this conversation?')) return;
    
    try {
      const saved = localStorage.getItem('chatHistories');
      if (saved) {
        const histories = JSON.parse(saved);
        const filtered = histories.filter((h: any) => h.conversationId !== convId);
        localStorage.setItem('chatHistories', JSON.stringify(filtered));
        loadChatHistories();
        alert('✓ Conversation deleted');
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      alert('Failed to delete conversation');
    }
  };

  // Load and manage daily message count for free tier
  useEffect(() => {
    if (tier === 'free') {
      const stored = localStorage.getItem('ai_message_count');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          const lastDate = new Date(data.date);
          const today = new Date();
          
          // Check if it's a new day (reset counter)
          if (lastDate.toDateString() !== today.toDateString()) {
            setMessageCount(0);
            localStorage.setItem('ai_message_count', JSON.stringify({ count: 0, date: today.toISOString() }));
          } else {
            setMessageCount(data.count);
          }
        } catch (e) {
          setMessageCount(0);
        }
      } else {
        localStorage.setItem('ai_message_count', JSON.stringify({ count: 0, date: new Date().toISOString() }));
      }
    }
  }, [tier]);

  // Save message count to localStorage whenever it changes
  useEffect(() => {
    if (tier === 'free' && messageCount > 0) {
      localStorage.setItem('ai_message_count', JSON.stringify({ count: messageCount, date: new Date().toISOString() }));
    }
  }, [messageCount, tier]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    // Check message limits for free tier
    if (tier === 'free' && messageCount >= MESSAGE_LIMITS.free && !hasAccess('unlimited_chat')) {
      alert(`Free plan limit reached!\n\nYou've used all ${MESSAGE_LIMITS.free} daily AI messages.\n\nUpgrade to Basic ($9.99/mo) for unlimited chat and more features!\n\nVisit the Billing page to upgrade.`);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Increment message count for free tier
    if (tier === 'free') {
      setMessageCount(prev => prev + 1);
    }

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
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Logo size={48} />
              <h1 className="text-3xl font-bold text-secondary-800">College Compass</h1>
            </div>
            <p className="text-base text-secondary-600 mb-3">Hey {session?.user?.name || session?.user?.email}!</p>
            <PremiumBadge tier={tier} size="lg" />
          </div>

          {/* Message Counter (Free Tier Only) */}
          {tier === 'free' && (
            <div className="mb-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-5">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-800">
                  {messageCount}/{MESSAGE_LIMITS.free}
                </div>
                <div className="text-sm text-yellow-700 font-semibold mb-3">
                  Daily AI Messages
                </div>
                {messageCount >= MESSAGE_LIMITS.free * 0.8 && (
                  <Link
                    href="/billing"
                    className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                  >
                    <FaCrown /> Get Unlimited
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Quick Navigation */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Quick Access</h3>
            <div className="space-y-3">
              <Link href="/tracker" className="flex items-center gap-3 px-5 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-all text-base font-semibold">
                <FaClipboardList className="text-lg" /> Application Tracker
              </Link>
              <Link href="/essays" className="flex items-center gap-3 px-5 py-3 bg-accent-50 text-accent-700 rounded-lg hover:bg-accent-100 transition-all text-base font-semibold">
                <FaPencilAlt className="text-lg" /> Essay Hub
              </Link>
              <Link href="/timeline" className="flex items-center gap-3 px-5 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-all text-base font-semibold">
                <FaCalendarAlt className="text-lg" /> Timeline
              </Link>
              <Link href="/resources" className="flex items-center gap-3 px-5 py-3 bg-accent-50 text-accent-700 rounded-lg hover:bg-accent-100 transition-all text-base font-semibold">
                <FaBook className="text-lg" /> Resources
              </Link>
              <Link href="/billing" className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all text-base font-bold shadow-md">
                <FaCrown className="text-lg" /> Billing & Plans
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
              setConversationId('');
              setConversationTitle('New Conversation');
            }}
            className="flex items-center justify-center gap-3 w-full mb-6 px-6 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-bold text-base shadow-lg"
          >
            <FaPlus className="text-lg" /> New Conversation
          </button>

          {tier !== 'free' && (
            <>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center justify-center gap-3 w-full mb-4 px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-all font-semibold text-base"
              >
                <FaHistory className="text-lg" /> Chat History ({chatHistories.length})
              </button>

              <button
                onClick={saveConversation}
                disabled={savingChat || messages.length <= 1}
                className="flex items-center justify-center gap-3 w-full mb-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaSave className="text-lg" /> {savingChat ? 'Saving...' : 'Save Chat'}
              </button>
            </>
          )}

          {!userProfile?.onboardingCompleted && (
            <button
              onClick={() => setShowOnboarding(true)}
              className="flex items-center justify-center gap-3 w-full mb-6 px-6 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all font-bold text-base shadow-lg"
            >
              <FaGraduationCap className="text-lg" /> Complete Your Profile
            </button>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Topics</h3>
            <div className="space-y-2">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(question)}
                  className="w-full text-left px-4 py-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 transition-all font-medium"
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
                          className={`max-w-4xl px-8 py-6 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-primary-600 text-white'
                              : 'bg-white text-secondary-800 shadow-lg'
                          }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center mb-3">
                      <Logo size={32} className="mr-2" />
                      <span className="font-bold text-base">College Advisor AI</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-base leading-relaxed">{message.content}</div>
                  <div className={`text-sm mt-3 ${message.role === 'user' ? 'text-primary-200' : 'text-secondary-400'}`}>
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
                  className="flex-1 px-6 py-4 text-base border-2 border-secondary-300 rounded-xl focus:border-primary-600 focus:outline-none resize-none"
                  rows={3}
                  disabled={loading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading || !input.trim()}
                  className="flex items-center gap-2 px-10 py-4 text-base bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  <FaPaperPlane className="text-lg" /> Send
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>

        {/* Onboarding Modal */}
        {showOnboarding && (
          <OnboardingForm
            onComplete={handleOnboardingComplete}
            onClose={() => setShowOnboarding(false)}
          />
        )}

        {/* Chat History Modal */}
        {showHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <FaHistory /> Your Chat History
                </h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {chatHistories.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No saved conversations yet. Start chatting and click "Save Chat" to preserve your conversations!</p>
              ) : (
                <div className="space-y-3">
                  {chatHistories.map((chat: any) => (
                    <div key={chat.conversationId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                      <button
                        onClick={() => loadConversation(chat.conversationId)}
                        className="flex-1 text-left"
                      >
                        <div className="font-semibold text-gray-800">{chat.title}</div>
                        <div className="text-sm text-gray-500">
                          Last active: {new Date(chat.lastActive).toLocaleDateString()}
                        </div>
                      </button>
                      <button
                        onClick={() => deleteConversation(chat.conversationId)}
                        className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

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
      <h3 className="text-xl font-bold text-primary-600 mb-3">{title}</h3>
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

