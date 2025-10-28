'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSubscription } from '../providers/SubscriptionProvider';
import { FaCrown, FaStar, FaBook, FaChevronDown, FaChevronUp, FaArrowRight } from 'react-icons/fa';

export default function PlanIndicator() {
  const { tier, upgradeTo, isPaywallActive } = useSubscription();
  const [isExpanded, setIsExpanded] = useState(false);

  const tierConfig = {
    free: {
      name: 'Free',
      icon: FaBook,
      color: 'bg-secondary-100 text-secondary-700',
      borderColor: 'border-secondary-300',
      upgradeText: 'Upgrade to unlock all features',
    },
    basic: {
      name: 'Basic',
      icon: FaStar,
      color: 'bg-primary-100 text-primary-700',
      borderColor: 'border-primary-300',
      upgradeText: 'Upgrade to Premium for more',
    },
    premium: {
      name: 'Premium',
      icon: FaCrown,
      color: 'bg-gradient-to-r from-accent-500 to-primary-600 text-white',
      borderColor: 'border-accent-400',
      upgradeText: 'You have full access!',
    },
  };

  const config = tierConfig[tier];
  const Icon = config.icon;
  const canUpgrade = tier !== 'premium';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Button */}
      <div
        className={`${config.color} ${config.borderColor} border-2 rounded-lg shadow-2xl transition-all hover:scale-105 cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="px-4 py-3 flex items-center gap-3">
          <Icon className="text-xl" />
          <div className="text-left">
            <div className="text-xs opacity-75">Current Plan</div>
            <div className="font-bold">{config.name}</div>
          </div>
          {isExpanded ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </div>

      {/* Expanded Menu */}
      {isExpanded && (
        <div className="absolute bottom-full right-0 mb-3 bg-white rounded-xl shadow-2xl border-2 border-secondary-200 p-4 w-80">
          <div className="text-center mb-4">
            <Icon className={`text-4xl mx-auto mb-2 ${tier === 'premium' ? 'text-primary-600' : 'text-secondary-600'}`} />
            <h3 className="font-bold text-lg text-secondary-800">
              {config.name} Plan
            </h3>
            <p className="text-sm text-secondary-600">
              {config.upgradeText}
            </p>
          </div>

          {/* Quick Tier Switch (Demo Mode) */}
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4">
            <p className="text-xs font-semibold text-yellow-800 mb-2">🧪 Demo Mode - Quick Switch:</p>
            <div className="flex gap-2">
              <button
                onClick={() => { upgradeTo('free'); setIsExpanded(false); }}
                className={`flex-1 px-2 py-1 text-xs rounded ${tier === 'free' ? 'bg-secondary-600 text-white' : 'bg-white text-secondary-700 border border-secondary-300'}`}
              >
                Free
              </button>
              <button
                onClick={() => { upgradeTo('basic'); setIsExpanded(false); }}
                className={`flex-1 px-2 py-1 text-xs rounded ${tier === 'basic' ? 'bg-primary-600 text-white' : 'bg-white text-primary-700 border border-primary-300'}`}
              >
                Basic
              </button>
              <button
                onClick={() => { upgradeTo('premium'); setIsExpanded(false); }}
                className={`flex-1 px-2 py-1 text-xs rounded ${tier === 'premium' ? 'bg-gradient-to-r from-accent-600 to-primary-600 text-white' : 'bg-white text-accent-700 border border-accent-300'}`}
              >
                Premium
              </button>
            </div>
          </div>

          {/* Upgrade Button */}
          {canUpgrade && (
            <Link
              href="/billing"
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all shadow-lg"
              onClick={() => setIsExpanded(false)}
            >
              <FaCrown /> View Plans <FaArrowRight />
            </Link>
          )}

          {tier === 'premium' && (
            <Link
              href="/billing"
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-secondary-200 text-secondary-700 font-bold rounded-lg hover:bg-secondary-300 transition-all"
              onClick={() => setIsExpanded(false)}
            >
              Manage Subscription
            </Link>
          )}

          <p className="text-xs text-center text-secondary-500 mt-3">
            {isPaywallActive ? '🔒 Paywall Active' : '🔓 All Features Unlocked'}
          </p>
        </div>
      )}
    </div>
  );
}

