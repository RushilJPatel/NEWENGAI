'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '../components/Logo';
import { useSubscription } from '../providers/SubscriptionProvider';
import { loadStripe } from '@stripe/stripe-js';
import { FaComments, FaClipboardList, FaPencilAlt, FaCalendarAlt, FaBook, FaCheck, FaCrown, FaStar, FaRocket, FaSignOutAlt, FaCog, FaSpinner } from 'react-icons/fa';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function BillingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { tier, isPaywallActive, setPaywallActive, upgradeTo } = useSubscription();
  const [showTestControls, setShowTestControls] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const plans = [
    {
      name: 'Free',
      tier: 'free' as const,
      price: '$0',
      period: 'forever',
      description: 'Get started with college planning basics',
      features: [
        'Basic AI chat support',
        'View application timeline',
        'Access to resource library',
        'Track up to 3 colleges',
        'Basic essay prompts',
      ],
      limitations: [
        'Limited AI responses',
        'No custom schedules',
        'No essay review',
      ],
      icon: FaBook,
      color: 'secondary',
      recommended: false,
    },
    {
      name: 'Basic',
      tier: 'basic' as const,
      price: '$9.99',
      period: 'per month',
      priceId: 'price_basic_monthly', // Replace with your actual Stripe Price ID
      description: 'Perfect for serious college applicants',
      features: [
        'Everything in Free',
        'Advanced AI chat with history',
        'Track up to 10 colleges',
        'Custom 4-year schedule generator',
        'All essay prompts & tips',
        'Application deadline reminders',
        'College requirements database',
      ],
      limitations: [
        'No essay review',
        'Standard support',
      ],
      icon: FaStar,
      color: 'primary',
      recommended: true,
    },
    {
      name: 'Premium',
      tier: 'premium' as const,
      price: '$19.99',
      period: 'per month',
      priceId: 'price_premium_monthly', // Replace with your actual Stripe Price ID
      description: 'Complete college planning suite with priority support',
      features: [
        'Everything in Basic',
        'Unlimited AI chat conversations',
        'Unlimited college tracking',
        'AI essay review & feedback',
        'Personalized recommendations',
        'Custom timeline & reminders',
        'Priority support (24/7)',
        'Early access to new features',
        'Premium resource library',
        'One-on-one consultation (monthly)',
      ],
      limitations: [],
      icon: FaCrown,
      color: 'accent',
      recommended: false,
    },
  ];

  const handleSelectPlan = async (selectedTier: 'free' | 'basic' | 'premium', priceId?: string) => {
    // DEMO MODE - No actual payments processed
    setLoading(selectedTier);
    
    setTimeout(() => {
      upgradeTo(selectedTier);
      setLoading(null);
      
      if (selectedTier === 'free') {
        alert('✅ Demo: Switched to Free plan!\n\nNote: This is a demonstration. No actual payment or downgrade occurred.');
      } else {
        alert(`✅ Demo: Upgraded to ${selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} plan!\n\nNote: This is a demonstration. No actual payment was processed.\n\nIn production, this would:\n• Redirect to Stripe checkout\n• Process payment of ${selectedTier === 'basic' ? '$9.99' : '$19.99'}/month\n• Activate premium features\n• Send confirmation email`);
      }
    }, 1500);

    // REAL STRIPE INTEGRATION (Currently disabled for demo)
    /*
    if (selectedTier === 'free') {
      if (confirm('Are you sure you want to downgrade to the free plan?')) {
        upgradeTo('free');
        alert('Downgraded to Free plan.');
      }
      return;
    }

    if (!priceId) {
      alert('Payment system not configured. Price ID missing.');
      return;
    }

    setLoading(selectedTier);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, tier: selectedTier }),
      });

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Stripe redirect error:', error);
          alert('Payment failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
    */
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex items-center justify-center">
        <div className="text-2xl text-secondary-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Header */}
      <header className="bg-white border-b border-secondary-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Logo size={32} />
            <h1 className="text-2xl font-bold text-secondary-800">College Compass</h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-all">
              <FaComments /> Chat
            </Link>
            <Link href="/tracker" className="flex items-center gap-2 px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-all">
              <FaClipboardList /> Tracker
            </Link>
            <Link href="/essays" className="flex items-center gap-2 px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-all">
              <FaPencilAlt /> Essays
            </Link>
            <Link href="/timeline" className="flex items-center gap-2 px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-all">
              <FaCalendarAlt /> Timeline
            </Link>
            <Link href="/resources" className="flex items-center gap-2 px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-all">
              <FaBook /> Resources
            </Link>
            <Link href="/billing" className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all">
              <FaCrown /> Billing
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex items-center gap-2 px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-all"
            >
              <FaSignOutAlt />
            </button>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* DEMO MODE NOTICE */}
        <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="text-xl font-bold text-yellow-900 mb-2">Demo Mode - No Real Payments</h3>
              <p className="text-yellow-800 mb-2">
                This billing page demonstrates how College Compass <strong>could</strong> generate revenue. 
                No actual payments are processed when you select a plan.
              </p>
              <p className="text-sm text-yellow-700">
                <strong>In production:</strong> Real payments would be processed through Stripe, 
                subscriptions would be managed, and premium features would be restricted based on your tier.
              </p>
            </div>
          </div>
        </div>

        {/* Current Plan Banner */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-2 border-primary-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-secondary-800 mb-2">Your Current Plan</h2>
              <p className="text-xl text-secondary-600">
                You're on the <span className="font-bold text-primary-600">{tier.toUpperCase()}</span> plan
              </p>
              <p className="text-sm text-secondary-500 mt-2">
                {isPaywallActive ? '🔒 Paywall Active' : '🔓 Paywall Inactive (Testing Mode)'}
              </p>
            </div>
            <button
              onClick={() => setShowTestControls(!showTestControls)}
              className="flex items-center gap-2 px-6 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-all"
            >
              <FaCog /> Test Controls
            </button>
          </div>

          {/* Testing Controls (Collapsible) */}
          {showTestControls && (
            <div className="mt-6 p-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
              <h3 className="text-lg font-bold text-yellow-800 mb-4">🧪 Testing Controls (Admin Only)</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPaywallActive}
                      onChange={(e) => setPaywallActive(e.target.checked)}
                      className="w-5 h-5 text-primary-600"
                    />
                    <span className="text-secondary-700 font-semibold">
                      Enable Paywall (Toggle feature restrictions)
                    </span>
                  </label>
                  <p className="text-sm text-secondary-600 ml-8 mt-1">
                    When OFF: All features accessible regardless of plan (for testing)<br/>
                    When ON: Features restricted based on subscription tier
                  </p>
                </div>
                <div className="pt-4 border-t border-yellow-300">
                  <p className="text-sm font-semibold text-secondary-700 mb-2">Quick Plan Switch:</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => upgradeTo('free')}
                      className={`px-4 py-2 rounded-lg font-semibold ${tier === 'free' ? 'bg-primary-600 text-white' : 'bg-white text-secondary-700 border border-secondary-300'}`}
                    >
                      Free
                    </button>
                    <button
                      onClick={() => upgradeTo('basic')}
                      className={`px-4 py-2 rounded-lg font-semibold ${tier === 'basic' ? 'bg-primary-600 text-white' : 'bg-white text-secondary-700 border border-secondary-300'}`}
                    >
                      Basic
                    </button>
                    <button
                      onClick={() => upgradeTo('premium')}
                      className={`px-4 py-2 rounded-lg font-semibold ${tier === 'premium' ? 'bg-primary-600 text-white' : 'bg-white text-secondary-700 border border-secondary-300'}`}
                    >
                      Premium
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary-800 mb-4">Choose Your Plan</h2>
          <p className="text-xl text-secondary-600">Unlock your full potential with College Compass</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = tier === plan.tier;
            const colorClasses = {
              secondary: 'border-secondary-300 hover:border-secondary-400',
              primary: 'border-primary-400 hover:border-primary-500 ring-4 ring-primary-100',
              accent: 'border-accent-400 hover:border-accent-500',
            };

            return (
              <div
                key={plan.tier}
                className={`relative bg-white rounded-2xl shadow-xl p-8 border-2 transition-all ${
                  colorClasses[plan.color]
                } ${isCurrentPlan ? 'ring-4 ring-green-200 border-green-400' : ''}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      RECOMMENDED
                    </span>
                  </div>
                )}
                {isCurrentPlan && (
                  <div className="absolute -top-4 right-4">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      CURRENT
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <Icon className={`text-5xl mx-auto mb-4 text-${plan.color}-600`} />
                  <h3 className="text-2xl font-bold text-secondary-800 mb-2">{plan.name}</h3>
                  <div className="mb-3">
                    <span className="text-4xl font-bold text-secondary-900">{plan.price}</span>
                    <span className="text-secondary-600">/{plan.period}</span>
                  </div>
                  <p className="text-secondary-600">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-secondary-700">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, idx) => (
                    <div key={idx} className="flex items-start gap-3 opacity-50">
                      <span className="text-secondary-400 mt-1">✗</span>
                      <span className="text-secondary-600 line-through">{limitation}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.tier, (plan as any).priceId)}
                  disabled={isCurrentPlan || loading === plan.tier}
                  className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                    isCurrentPlan
                      ? 'bg-secondary-200 text-secondary-500 cursor-not-allowed'
                      : `bg-${plan.color}-600 text-white hover:bg-${plan.color}-700 shadow-lg hover:shadow-xl`
                  }`}
                >
                  {loading === plan.tier && <FaSpinner className="animate-spin" />}
                  {isCurrentPlan ? 'Current Plan' : loading === plan.tier ? 'Processing...' : `Choose ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-secondary-800 mb-6 text-center">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-secondary-800 mb-2">Can I cancel anytime?</h4>
              <p className="text-secondary-600">Yes! Cancel anytime with no penalties. Your access continues until the end of your billing period.</p>
            </div>
            <div>
              <h4 className="font-bold text-secondary-800 mb-2">What payment methods do you accept?</h4>
              <p className="text-secondary-600">We accept all major credit cards, PayPal, and bank transfers. (Mock billing - not implemented yet)</p>
            </div>
            <div>
              <h4 className="font-bold text-secondary-800 mb-2">Can I upgrade or downgrade later?</h4>
              <p className="text-secondary-600">Absolutely! You can change your plan at any time. Upgrades take effect immediately, and downgrades at the next billing cycle.</p>
            </div>
            <div>
              <h4 className="font-bold text-secondary-800 mb-2">Is there a student discount?</h4>
              <p className="text-secondary-600">Yes! We offer 20% off for verified students. Contact support@collegecompass.com with your student ID.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

