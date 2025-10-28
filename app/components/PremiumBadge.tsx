import { FaCrown, FaStar, FaLock } from 'react-icons/fa';

interface PremiumBadgeProps {
  tier: 'free' | 'basic' | 'premium';
  locked?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function PremiumBadge({ tier, locked = false, size = 'sm' }: PremiumBadgeProps) {
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  if (locked) {
    return (
      <span className={`inline-flex items-center gap-1 ${sizes[size]} bg-secondary-200 text-secondary-700 rounded-full font-semibold`}>
        <FaLock className="text-xs" /> Locked
      </span>
    );
  }

  if (tier === 'free') {
    return (
      <span className={`inline-flex items-center gap-1 ${sizes[size]} bg-secondary-100 text-secondary-600 rounded-full font-semibold`}>
        🆓 Free
      </span>
    );
  }

  if (tier === 'basic') {
    return (
      <span className={`inline-flex items-center gap-1 ${sizes[size]} bg-primary-100 text-primary-700 rounded-full font-semibold`}>
        <FaStar className="text-xs" /> Basic
      </span>
    );
  }

  if (tier === 'premium') {
    return (
      <span className={`inline-flex items-center gap-1 ${sizes[size]} bg-gradient-to-r from-accent-500 to-primary-600 text-white rounded-full font-semibold shadow-md`}>
        <FaCrown className="text-xs" /> Premium
      </span>
    );
  }

  return null;
}

