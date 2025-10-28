'use client';

import Link from 'next/link';
import { FaCrown, FaLock, FaArrowRight } from 'react-icons/fa';
import { useSubscription } from '../providers/SubscriptionProvider';

interface UpgradePromptProps {
  feature: string;
  requiredTier: 'basic' | 'premium';
  inline?: boolean;
}

export default function UpgradePrompt({ feature, requiredTier, inline = false }: UpgradePromptProps) {
  const { tier } = useSubscription();

  const tierNames = {
    basic: 'Basic',
    premium: 'Premium',
  };

  const tierPrices = {
    basic: '$9.99/month',
    premium: '$19.99/month',
  };

  if (inline) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary-100 to-accent-100 border-2 border-primary-300 rounded-lg">
        <FaLock className="text-primary-600" />
        <span className="text-sm font-semibold text-primary-800">
          {tierNames[requiredTier]} Feature
        </span>
        <Link
          href="/billing"
          className="text-sm text-primary-600 hover:text-primary-800 underline"
        >
          Upgrade
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-200 rounded-xl p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-white p-4 rounded-full shadow-lg">
          <FaCrown className="text-5xl text-primary-600" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-secondary-800 mb-2">
        Unlock {feature}
      </h3>
      
      <p className="text-secondary-600 mb-6 max-w-md mx-auto">
        This feature is available on the <span className="font-bold text-primary-600">{tierNames[requiredTier]}</span> plan.
        Upgrade now to access {feature.toLowerCase()} and many more premium features!
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
        <Link
          href="/billing"
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all shadow-lg"
        >
          <FaCrown /> Upgrade to {tierNames[requiredTier]} <FaArrowRight />
        </Link>
      </div>

      <p className="text-sm text-secondary-500">
        Starting at {tierPrices[requiredTier]} • Cancel anytime
      </p>
    </div>
  );
}

