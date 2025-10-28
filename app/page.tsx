'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import './globals.css';
import Logo from './components/Logo';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect directly to dashboard (auth disabled for now)
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <Logo size={80} />
        </div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          College Compass
        </h1>
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
