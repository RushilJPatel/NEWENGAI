import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from './providers/SessionProvider';

export const metadata: Metadata = {
  title: 'College Planner AI',
  description: 'Your AI-powered assistant for college planning, applications, and guidance',
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

