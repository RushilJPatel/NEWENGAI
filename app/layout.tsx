import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from './providers/SessionProvider';
import { SubscriptionProvider } from './providers/SubscriptionProvider';

export const metadata: Metadata = {
  title: 'College Compass',
  description: 'Your AI-powered guide to college planning, applications, and success',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <SubscriptionProvider>{children}</SubscriptionProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

