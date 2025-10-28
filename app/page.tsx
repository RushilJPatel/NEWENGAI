'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import './globals.css';
import Logo from './components/Logo';

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <Logo size={80} />
        </div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          College Compass
        </h1>
        <p className="text-xl text-secondary-600">Loading...</p>
      </div>
    </div>
  );
}
