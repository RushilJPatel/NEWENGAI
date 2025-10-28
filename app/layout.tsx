import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from './providers/SessionProvider';

export const metadata: Metadata = {
  title: 'High School Planner AI',
  description: 'Plan your 4-year high school journey with AI-powered recommendations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

