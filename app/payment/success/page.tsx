'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Logo from '../../components/Logo';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Just show success message (demo mode)
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-xl text-secondary-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-12 text-center">
        <div className="flex justify-center mb-6">
          <Logo size={80} />
        </div>
        
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-8xl text-green-500" />
        </div>

        <h1 className="text-4xl font-bold text-secondary-800 mb-4">
          Payment Successful! 🎉
        </h1>

        <p className="text-xl text-secondary-600 mb-8">
          Welcome to College Compass Premium! Your subscription has been activated.
        </p>

        <div className="bg-primary-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-primary-800 mb-3">What's Next?</h3>
          <ul className="text-left space-y-2 text-secondary-700">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <span>Access all premium features immediately</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <span>Unlimited AI chat with full history</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <span>Track unlimited college applications</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <span>AI essay review and personalized recommendations</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <span>Check your email for receipt and details</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all shadow-lg"
          >
            Get Started <FaArrowRight />
          </Link>
          <Link
            href="/billing"
            className="flex items-center gap-2 px-8 py-4 bg-secondary-200 text-secondary-700 font-bold rounded-lg hover:bg-secondary-300 transition-all"
          >
            View Billing
          </Link>
        </div>

        <p className="text-sm text-secondary-500 mt-8">
          Session ID: {sessionId || 'N/A'}
        </p>
      </div>
    </div>
  );
}

