'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

const guidesContent: {[key: string]: any} = {
  'financial-aid': {
    title: 'Financial Aid & FAFSA Complete Guide',
    icon: '💰',
    sections: [
      {
        title: 'FAFSA (Free Application for Federal Student Aid)',
        content: `Opens **October 1st** every year for the following academic year. Must be completed EVERY year you're in college.`,
        subsections: [
          { title: 'What You Need', content: 'Social Security number, driver\'s license, tax returns (yours and parents\'), W-2 forms, records of untaxed income, bank statements, investment records' },
          { title: 'Expected Family Contribution (EFC)', content: 'Formula calculates how much your family can contribute. Lower EFC = more aid eligibility.' },
          { title: 'Types of Federal Aid', content: '• Pell Grants (don\'t repay)\n• Direct Subsidized Loans (no interest while in school)\n• Direct Unsubsidized Loans (interest accrues)\n• Work-Study programs' }
        ]
      },
      {
        title: 'CSS Profile',
        content: 'Required by 400+ private colleges for **institutional aid**. More detailed than FAFSA.',
        subsections: [
          { title: 'Cost', content: '$25 application fee + $16 per school (waivers available for low-income)' },
          { title: 'What\'s Different', content: 'Asks about home equity, retirement accounts, family businesses - gives fuller financial picture' },
          { title: 'Schools That Require It', content: 'Most private schools (Harvard, Stanford, MIT, Duke, etc.) Check each school\'s financial aid page!' }
        ]
      }
    ]
  },
  'test-prep': {
    title: 'SAT/ACT Test Prep Strategy Guide',
    icon: '📝',
    sections: [
      {
        title: 'Test-Optional vs Test-Blind',
        subsections: [
          { title: 'Test-Optional', content: 'You CAN submit scores, but don\'t have to. If scores help, submit them!' },
          { title: 'Test-Blind', content: 'Won\'t look at scores AT ALL (UCs, Cal States)' },
          { title: 'When to Submit', content: 'Submit if your score is at or above the school\'s 50th percentile' }
        ]
      },
      {
        title: 'SAT vs ACT - Which to Take?',
        subsections: [
          { title: 'SAT', content: '1600 points. Reading, Writing, Math (with/without calculator). Evidence-based questions.' },
          { title: 'ACT', content: '36 points. English, Math, Reading, Science. Faster pace, more straightforward questions.' },
          { title: 'Take Both!', content: 'Try practice tests of each. Many students score better on one. All colleges accept both equally.' }
        ]
      },
      {
        title: 'Study Strategy',
        content: 'Start 3-6 months before test date. Take 6-8 full practice tests under real conditions.',
        subsections: [
          { title: 'Free Resources', content: 'Khan Academy (SAT official partner), ACT Academy, Official practice tests from College Board/ACT' },
          { title: 'Study Schedule', content: '10 hours/week for 3 months OR 5 hours/week for 6 months. Consistency > cramming!' },
          { title: 'Score Improvement', content: 'Most students improve 100-200 points SAT (2-4 points ACT) with focused prep' }
        ]
      }
    ]
  },
  'campus-visits': {
    title: 'Campus Visit Checklist & Questions',
    icon: '🏫',
    sections: [
      {
        title: 'Before You Visit',
        subsections: [
          { title: 'Schedule Tour', content: 'Book official campus tour AND info session 2-4 weeks ahead' },
          { title: 'Research First', content: 'Know basic facts so you can ask deeper questions' },
          { title: 'Visit When', content: 'During school year when students are there. Avoid breaks!' }
        ]
      },
      {
        title: 'What to Do During Your Visit',
        content: 'Go beyond the official tour!',
        subsections: [
          { title: 'Sit in on a Class', content: 'Email professors ahead to ask permission. See teaching style and class size.' },
          { title: 'Eat in Dining Hall', content: 'Food quality matters for 4 years! Talk to students.' },
          { title: 'Walk Around Alone', content: 'Get a feel for campus. Do YOU feel comfortable here?' },
          { title: 'Visit Dorms', content: 'See where you\'d actually live. Check out common areas.' },
          { title: 'Check Library', content: 'Study spaces, hours, resources. You\'ll spend a LOT of time here.' }
        ]
      },
      {
        title: 'Questions to Ask Current Students',
        subsections: [
          { title: 'Academics', content: '• How hard is it to get into classes you want?\n• How accessible are professors?\n• What\'s the workload like?\n• Do people collaborate or compete?' },
          { title: 'Social Life', content: '• What do you do on weekends?\n• Greek life - how dominant?\n• What surprised you most?\n• If you could do it over, would you choose this school again?' },
          { title: 'Practical', content: '• How\'s the career center?\n• Do you feel safe on campus?\n• Is the surrounding area walkable?\n• What do you wish you knew before coming?' }
        ]
      }
    ]
  }
};

export default function GuidePage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const guide = guidesContent[slug];

  if (!guide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-8">
        <div className="container mx-auto max-w-4xl">
          <Link href="/resources" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6">
            ← Back to Resources
          </Link>
          <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Guide Coming Soon!</h1>
            <p className="text-gray-600 mb-6">This guide is currently being developed. Check back soon!</p>
            <Link href="/dashboard" className="inline-block px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">
              Chat with AI for Help →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-8">
      <div className="container mx-auto max-w-4xl">
        <Link href="/resources" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6">
          ← Back to Resources
        </Link>

        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10">
          <div className="flex items-center mb-6">
            <span className="text-6xl mr-4">{guide.icon}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">{guide.title}</h1>
              <p className="text-gray-600 mt-2">Complete guide with everything you need to know</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {guide.sections?.map((section: any, idx: number) => (
              <div key={idx} className="mb-8">
                <h2 className="text-2xl font-bold text-indigo-600 mb-4">{section.title}</h2>
                {section.content && (
                  <p className="mb-4 whitespace-pre-line">{section.content}</p>
                )}
                {section.subsections?.map((sub: any, subIdx: number) => (
                  <div key={subIdx} className="mb-4 bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">{sub.title}</h3>
                    <p className="whitespace-pre-line">{sub.content}</p>
                  </div>
                ))}
              </div>
            ))}

            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-2">Need Personalized Advice?</h3>
              <p className="mb-4">Our AI can answer specific questions about YOUR situation!</p>
              <Link href="/dashboard" className="inline-block px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100">
                Chat with AI Advisor →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

