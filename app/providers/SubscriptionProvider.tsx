'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type SubscriptionTier = 'free' | 'basic' | 'premium';

interface SubscriptionContextType {
  tier: SubscriptionTier;
  isPaywallActive: boolean;
  setPaywallActive: (active: boolean) => void;
  hasAccess: (feature: string) => boolean;
  upgradeTo: (tier: SubscriptionTier) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Feature access configuration
const FEATURE_ACCESS = {
  free: [
    'basic_chat',
    'view_timeline',
    'view_resources',
    'track_3_colleges',
  ],
  basic: [
    'basic_chat',
    'advanced_chat',
    'view_timeline',
    'view_resources',
    'track_10_colleges',
    'essay_prompts',
    'schedule_generator',
  ],
  premium: [
    'basic_chat',
    'advanced_chat',
    'unlimited_chat',
    'view_timeline',
    'custom_timeline',
    'view_resources',
    'premium_resources',
    'track_unlimited_colleges',
    'essay_prompts',
    'essay_review',
    'schedule_generator',
    'personalized_recommendations',
    'priority_support',
  ],
};

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<SubscriptionTier>('premium'); // Start with premium for testing
  const [isPaywallActive, setPaywallActive] = useState(false); // Paywall OFF for testing

  useEffect(() => {
    // Load subscription from localStorage
    const savedTier = localStorage.getItem('subscription_tier') as SubscriptionTier;
    const savedPaywallState = localStorage.getItem('paywall_active');
    
    if (savedTier) {
      setTier(savedTier);
    }
    if (savedPaywallState !== null) {
      setPaywallActive(savedPaywallState === 'true');
    }
  }, []);

  useEffect(() => {
    // Save subscription to localStorage
    localStorage.setItem('subscription_tier', tier);
    localStorage.setItem('paywall_active', isPaywallActive.toString());
  }, [tier, isPaywallActive]);

  const hasAccess = (feature: string): boolean => {
    // If paywall is not active, grant access to everything
    if (!isPaywallActive) {
      return true;
    }

    // Check if the user's tier includes this feature
    return FEATURE_ACCESS[tier].includes(feature);
  };

  const upgradeTo = (newTier: SubscriptionTier) => {
    setTier(newTier);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        tier,
        isPaywallActive,
        setPaywallActive,
        hasAccess,
        upgradeTo,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

