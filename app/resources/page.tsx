'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '../components/Logo';
import { FaComments, FaClipboardList, FaPencilAlt, FaCalendarAlt, FaBook, FaSignOutAlt, FaRobot } from 'react-icons/fa';

export default function Resources() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const resources = {
    guides: [
      { 
        title: 'Complete Guide to College Applications', 
        description: 'Step-by-step walkthrough from choosing schools to submitting applications. Covers Common App, UC system, and more.', 
        icon: '📖', 
        category: 'guide',
        url: '/resources/guides/applications',
        content: 'Learn about application types (EA, ED, RD), how to create a balanced college list, filling out the Common App, requesting transcripts, and submitting applications on time.'
      },
      { 
        title: 'Financial Aid & FAFSA Complete Guide', 
        description: 'Everything you need to know about paying for college - FAFSA, CSS Profile, scholarships, and loans.', 
        icon: '💰', 
        category: 'guide',
        url: '/resources/guides/financial-aid',
        content: 'Opens Oct 1 annually. Learn about grants, work-study, federal loans, parent PLUS loans, merit scholarships, need-based aid, and how to compare financial aid packages.'
      },
      { 
        title: 'SAT/ACT Test Prep Strategy Guide', 
        description: 'Proven study tips, test-taking strategies, and timeline for standardized testing.', 
        icon: '📝', 
        category: 'guide',
        url: '/resources/guides/test-prep',
        content: 'Test-optional doesn\'t mean test-blind. Learn when to submit scores, how to prep effectively, best practice resources (Khan Academy, official tests), and score improvement strategies.'
      },
      { 
        title: 'Campus Visit Checklist & Questions', 
        description: 'What to look for during visits and essential questions to ask current students and admissions.', 
        icon: '🏫', 
        category: 'guide',
        url: '/resources/guides/campus-visits',
        content: 'Tour checklist: sit in on a class, eat in dining hall, walk around campus alone, visit dorms, check library, ask about internships, career services, class sizes, and student life.'
      },
      { 
        title: 'Essay Writing Masterclass', 
        description: 'From brainstorming to final draft - how to write essays that stand out to admissions officers.', 
        icon: '✍️', 
        category: 'guide',
        url: '/essays',
        content: 'Show don\'t tell, be specific, avoid clichés, write in your authentic voice, focus on growth, have 3-5 people proofread, and never plagiarize. Start in summer!'
      },
      { 
        title: 'Letters of Recommendation Guide', 
        description: 'How to choose recommenders, when to ask, and what makes a strong letter.', 
        icon: '✉️', 
        category: 'guide',
        url: '/resources/guides/recommendations',
        content: 'Ask junior year teachers who know you well (ideally from core subjects). Give them a "brag sheet" with your accomplishments, goals, and specific examples. Ask 6 weeks before deadline.'
      },
      { 
        title: 'Creating Your College List', 
        description: 'Build a balanced list with reach, target, and safety schools that actually fit you.', 
        icon: '📋', 
        category: 'guide',
        url: '/resources/guides/college-list',
        content: 'Apply to 8-12 schools: 3-4 reach, 3-4 target, 2-3 safety. Consider location, size, cost, majors, campus culture, career outcomes, and graduate school placement.'
      },
      { 
        title: 'Interview Preparation Guide', 
        description: 'Ace your alumni or admissions interviews with preparation tips and common questions.', 
        icon: '🎤', 
        category: 'guide',
        url: '/resources/guides/interviews',
        content: 'Common questions: Why this school? Tell me about yourself. What do you do for fun? Greatest challenge? Questions for interviewer? Be authentic, prepared, and enthusiastic!'
      },
      { 
        title: 'AP & Honors Course Selection Strategy', 
        description: 'How many AP classes should you take? Which ones matter most for your target colleges?', 
        icon: '🎓', 
        category: 'guide',
        url: '/resources/guides/ap-honors',
        content: 'Balance rigor with GPA. Top colleges want 5-8 APs total. Take AP in subjects related to your major. Junior year is crucial. Don\'t overload - quality over quantity!'
      },
      { 
        title: 'Extracurricular Activities Guide', 
        description: 'Quality beats quantity! How to build a compelling activities list that shows leadership and passion.', 
        icon: '⚡', 
        category: 'guide',
        url: '/resources/guides/extracurriculars',
        content: 'Focus on 3-5 meaningful activities showing depth, not breadth. Demonstrate impact, leadership, and commitment over time. Create a "spike" in your area of interest.'
      },
      { 
        title: 'College Major Selection Guide', 
        description: 'Undecided is OK! How to explore majors, understand career paths, and make an informed choice.', 
        icon: '🎯', 
        category: 'guide',
        url: '/resources/guides/majors',
        content: 'Most students change majors! Research career outcomes, take intro courses, talk to professionals, consider double majors, and explore interdisciplinary programs.'
      },
      { 
        title: 'Demonstrated Interest & Yield Protection', 
        description: 'Learn how colleges track interest and why it matters for admissions - especially for matches and safeties.', 
        icon: '👀', 
        category: 'guide',
        url: '/resources/guides/demonstrated-interest',
        content: 'Open emails, attend virtual events, visit campus, interview, apply early, engage with reps. Some schools track heavily, others don\'t. Research each school\'s policy!'
      },
      { 
        title: 'Transfer Application Guide', 
        description: 'Considering transferring? Complete guide to transfer admissions, credit transfers, and timing.', 
        icon: '🔄', 
        category: 'guide',
        url: '/resources/guides/transfer',
        content: 'Transfer after freshman or sophomore year. Need strong college GPA (3.5+), compelling reason, course prerequisites. Some schools love transfers (Cornell), others rarely accept them.'
      },
      { 
        title: 'Gap Year Planning Guide', 
        description: 'Is a gap year right for you? How to plan, when to apply, and making the most of time off.', 
        icon: '🌍', 
        category: 'guide',
        url: '/resources/guides/gap-year',
        content: 'Apply senior year, defer enrollment. Use time for work, travel, service, internships, or personal projects. Popular options: AmeriCorps, work abroad, research, skill-building.'
      },
      { 
        title: 'Early Decision vs Early Action Strategy', 
        description: 'ED, EA, REA, ED2 - understand the differences and choose the right strategy for YOU.', 
        icon: '⚡', 
        category: 'guide',
        url: '/resources/guides/early-decision',
        content: 'ED is binding, increases odds but commits you. EA is non-binding. REA restricts other early apps. ED2 gives second chance. Only do ED if it\'s your clear #1 and finances work!'
      },
      { 
        title: 'Waitlist Strategy & Acceptance Tips', 
        description: 'Got waitlisted? Here\'s how to maximize your chances of getting off the waitlist.', 
        icon: '⏳', 
        category: 'guide',
        url: '/resources/guides/waitlist',
        content: 'Send LOCI (Letter of Continued Interest), update achievements, get extra rec, demonstrate fit. But commit to another school by May 1! Waitlist acceptances come May-July.'
      }
    ],
    tools: [
      { 
        title: 'Net Price Calculator', 
        description: 'Calculate your estimated cost of attendance at any college based on financial aid.', 
        icon: '🧮', 
        category: 'tool',
        url: 'https://collegecost.ed.gov/net-price',
        content: 'Every college website has a net price calculator. Enter family income, assets, and student info to get estimated aid and actual cost.'
      },
      { 
        title: 'GPA Calculator (Weighted & Unweighted)', 
        description: 'Calculate your high school GPA on both 4.0 and weighted scales.', 
        icon: '📊', 
        category: 'tool',
        url: '/resources/tools/gpa-calculator',
        content: 'Unweighted: A=4.0, B=3.0, C=2.0. Weighted: honors +0.5, AP +1.0. Calculate cumulative GPA for college apps.'
      },
      { 
        title: 'College Search & Comparison Tool', 
        description: 'Search 4,000+ colleges and compare acceptance rates, costs, majors, and more.', 
        icon: '🔍', 
        category: 'tool',
        url: 'https://www.niche.com/colleges/search/',
        content: 'Filter by location, size, majors, cost, SAT scores, acceptance rate, and campus culture to find your perfect fit colleges.'
      },
      { 
        title: 'Essay Word Counter', 
        description: 'Track word count for Common App (650 words) and supplemental essays.', 
        icon: '✍️', 
        category: 'tool',
        url: '/resources/tools/essay-counter',
        content: 'Common App: 650 words max. UC PIQs: 350 words each. Coalition: 500-650 words. Use this tool to stay within limits!'
      },
      { 
        title: 'Scholarship Search Engine', 
        description: 'Search thousands of scholarships based on your profile, interests, and achievements.', 
        icon: '💎', 
        category: 'tool',
        url: 'https://www.scholarships.com',
        content: 'Apply to local and national scholarships. Start searching junior year. Watch deadlines carefully - some are in fall of senior year!'
      },
      { 
        title: 'SAT/ACT Score Converter', 
        description: 'Convert between SAT and ACT scores to compare and decide which test to submit.', 
        icon: '🔄', 
        category: 'tool',
        url: 'https://www.act.org/content/act/en/products-and-services/the-act/scores/act-sat-concordance.html',
        content: 'SAT 1600 scale vs ACT 36 scale. Colleges accept both equally - submit your better score!'
      },
      { 
        title: 'Application Deadline Tracker', 
        description: 'Track all your deadlines: EA (Nov 1), UC (Nov 30), RD (Jan 1-15), FAFSA, CSS Profile.', 
        icon: '📅', 
        category: 'tool',
        url: '/tracker',
        content: 'Use our built-in tracker to manage all deadlines, requirements, and submission status in one place!'
      },
      { 
        title: 'College Matching Quiz', 
        description: 'Answer questions about preferences to get personalized college recommendations.', 
        icon: '🎯', 
        category: 'tool',
        url: 'https://bigfuture.collegeboard.org/college-search',
        content: 'Discover colleges you might not have considered based on your academic profile, interests, location preferences, and budget.'
      },
      { 
        title: 'AP Credit Policy Checker', 
        description: 'Check which colleges accept your AP scores and how much credit you get.', 
        icon: '🏆', 
        category: 'tool',
        url: 'https://apstudents.collegeboard.org/getting-credit-placement/search-policies',
        content: 'Not all colleges give the same credit! Some require 4+, others accept 3+. Check before deciding which APs to take.'
      },
      { 
        title: 'Common Data Set Browser', 
        description: 'Access detailed admissions statistics that colleges report annually.', 
        icon: '📈', 
        category: 'tool',
        url: '/dashboard',
        content: 'Find exact acceptance rates, SAT ranges, class rank percentiles, and more. Search "[college name] common data set" on Google.'
      },
      { 
        title: 'Major to Career Mapper', 
        description: 'See what careers graduates from each major actually pursue.', 
        icon: '💼', 
        category: 'tool',
        url: 'https://www.bls.gov/ooh/',
        content: 'Bureau of Labor Statistics shows salary, growth, and requirements for 800+ careers. Connect majors to real job outcomes.'
      },
      { 
        title: 'College Essay Topic Brainstorm Tool', 
        description: 'Answer questions to find your best essay topics and stories.', 
        icon: '💭', 
        category: 'tool',
        url: '/essays',
        content: 'Stuck on what to write about? Use guided prompts to uncover meaningful experiences you might have overlooked.'
      },
      { 
        title: 'Financial Aid Appeal Letter Generator', 
        description: 'Get help writing appeals when aid packages aren\'t enough.', 
        icon: '📝', 
        category: 'tool',
        url: '/dashboard',
        content: 'If circumstances changed or you have better offers, you can appeal! Learn what to include and how to write professionally.'
      },
      { 
        title: 'Supplemental Essay Database', 
        description: 'Browse all supplemental prompts for 500+ colleges in one place.', 
        icon: '📚', 
        category: 'tool',
        url: 'https://www.collegeessayguy.com/supplemental-essay-prompts',
        content: 'Plan ahead! See what essays you\'ll need to write before applying. Many schools ask "Why us?" and community questions.'
      },
      { 
        title: 'College Debt Calculator', 
        description: 'Calculate monthly loan payments and see if your degree is worth the debt.', 
        icon: '💵', 
        category: 'tool',
        url: 'https://studentaid.gov/loan-simulator/',
        content: 'See how much you\'ll pay monthly for 10, 20, or 25 years. Compare salary expectations vs debt burden.'
      },
      { 
        title: 'Virtual College Tour Platform', 
        description: 'Take 360° tours of college campuses from your phone or computer.', 
        icon: '🌐', 
        category: 'tool',
        url: 'https://www.youvisit.com/collegesearch/',
        content: 'Can\'t visit in person? Virtual tours show dorms, dining halls, classrooms, and campus life at 1,000+ schools.'
      }
    ],
    videos: [
      { 
        title: 'How to Write a Stand-Out College Essay', 
        description: '15-min video: Admissions officers share what makes essays memorable.', 
        icon: '🎥', 
        category: 'video',
        platform: 'YouTube',
        content: 'Real examples of successful essays, common mistakes to avoid, and how to find your unique story. Topics: show don\'t tell, specificity, authenticity.'
      },
      { 
        title: 'College Interview Tips from Admissions', 
        description: '10-min guide: How to ace your alumni or admissions interview.', 
        icon: '🎬', 
        category: 'video',
        platform: 'YouTube',
        content: 'What interviewers look for, common questions, how to prepare, dress code, following up with thank-you notes, and turning it into a conversation.'
      },
      { 
        title: 'Choosing Your Major: Complete Guide', 
        description: '20-min deep dive: Find the right path without limiting yourself.', 
        icon: '📹', 
        category: 'video',
        platform: 'YouTube',
        content: 'Most students change majors! Learn about popular majors, job outcomes, combining interests, and how to explore majors through courses and internships.'
      },
      { 
        title: 'Understanding Financial Aid Packages', 
        description: '12-min explanation: Decode your aid offers and compare schools.', 
        icon: '🎞️', 
        category: 'video',
        platform: 'YouTube',
        content: 'Grants vs loans, work-study, merit vs need-based aid, calculating true cost, negotiating aid, and red flags in packages.'
      },
      { 
        title: 'Day in the Life: College Student Edition', 
        description: 'Multiple 10-min videos: See what college life is really like at different schools.', 
        icon: '📺', 
        category: 'video',
        platform: 'YouTube',
        content: 'Classes, dorms, dining, studying, clubs, social life, and balancing everything. Search "[college name] day in the life" on YouTube.'
      },
      { 
        title: 'FAFSA Step-by-Step Tutorial 2025-2026', 
        description: '25-min walkthrough: Complete your FAFSA correctly and on time.', 
        icon: '💻', 
        category: 'video',
        platform: 'Federal Student Aid',
        content: 'Creating FSA ID, gathering tax documents, reporting income and assets, listing schools, dependency status, and common errors to avoid.'
      },
      { 
        title: 'College Admissions: What Matters Most', 
        description: '18-min insider view: Former admissions officers reveal the process.', 
        icon: '🎓', 
        category: 'video',
        platform: 'YouTube',
        content: 'Holistic review explained: GPA, course rigor, test scores, essays, activities, recommendations, demonstrated interest, and institutional priorities.'
      },
      { 
        title: 'Campus Tour Virtual Experiences', 
        description: 'Interactive 360° tours: Explore campuses from anywhere.', 
        icon: '🌐', 
        category: 'video',
        platform: 'College Websites',
        content: 'Most colleges offer virtual tours. Check CampusReel.com and YouVisit.com for student-made tours. See dorms, dining halls, libraries, and more!'
      },
      { 
        title: 'Common App Tutorial: Step-by-Step', 
        description: '30-min walkthrough: Complete the Common App without mistakes.', 
        icon: '📋', 
        category: 'video',
        platform: 'YouTube',
        content: 'Screen recording showing EVERY section: personal info, family, education, activities (with examples), honors, essay, supplements, recommenders.'
      },
      { 
        title: 'How to Ask for Letters of Recommendation', 
        description: '8-min guide: The RIGHT way to ask teachers and avoid awkwardness.', 
        icon: '✉️', 
        category: 'video',
        platform: 'YouTube',
        content: 'When to ask (spring junior year!), who to ask, how to ask professionally, what to provide (brag sheet), and how to follow up/thank them.'
      },
      { 
        title: 'Understanding College Admission Statistics', 
        description: '15-min breakdown: What acceptance rates really mean and how to interpret data.', 
        icon: '📊', 
        category: 'video',
        platform: 'YouTube',
        content: 'Overall vs major-specific rates, EA vs RD rates, yield rates, waitlist acceptance rates, and how demographics affect your odds.'
      },
      { 
        title: 'SAT Reading & Writing Strategies', 
        description: '45-min masterclass: Proven techniques to boost your score by 100+ points.', 
        icon: '📖', 
        category: 'video',
        platform: 'Khan Academy / YouTube',
        content: 'Reading: annotation techniques, time management, trap answers. Writing: grammar rules, question types, and punctuation patterns.'
      },
      { 
        title: 'SAT Math Problem Solving Techniques', 
        description: '40-min tutorial: Common question types and how to solve them fast.', 
        icon: '🔢', 
        category: 'video',
        platform: 'Khan Academy / YouTube',
        content: 'Algebra, geometry, data analysis, and advanced math. Calculator vs no-calculator strategies. Plug-in and backsolving methods.'
      },
      { 
        title: 'Building Your Extracurricular Profile', 
        description: '18-min guide: Create meaningful ECs that colleges actually care about.', 
        icon: '🌟', 
        category: 'video',
        platform: 'YouTube',
        content: 'Depth vs breadth, demonstrating leadership, starting projects, research opportunities, and avoiding resume padding. Real examples shown.'
      },
      { 
        title: 'Negotiating Financial Aid Offers', 
        description: '12-min expert advice: How to ask for more money (and actually get it).', 
        icon: '💰', 
        category: 'video',
        platform: 'YouTube',
        content: 'Who can negotiate (depends on school), what to say in your letter, comparing offers, and when need-based vs merit aid matters.'
      },
      { 
        title: 'First-Generation College Student Guide', 
        description: '20-min comprehensive overview: Everything first-gen students need to know.', 
        icon: '🎓', 
        category: 'video',
        platform: 'YouTube',
        content: 'Unique challenges, special programs, QuestBridge, application fee waivers, finding mentors, and resources specifically for first-gen students.'
      }
    ],
    links: [
      { 
        title: 'Common Application', 
        description: 'Apply to 1,000+ colleges with one application. Opens August 1st annually.', 
        url: 'https://www.commonapp.org', 
        icon: '🔗', 
        category: 'link',
        details: 'Most popular application platform. Includes: personal info, activities, honors, essay (650 words), and school-specific supplements.'
      },
      { 
        title: 'FAFSA - Free Application for Federal Student Aid', 
        description: 'Required for federal aid, state aid, and most college aid. Opens October 1st.', 
        url: 'https://studentaid.gov/fafsa', 
        icon: '💵', 
        category: 'link',
        details: 'File every year! Even if you think you won\'t qualify. Required for loans, grants, and work-study. Deadline varies by state (some as early as March).'
      },
      { 
        title: 'CSS Profile', 
        description: 'Required by 400+ colleges for institutional aid. More detailed than FAFSA.', 
        url: 'https://cssprofile.collegeboard.org', 
        icon: '📄', 
        category: 'link',
        details: 'Opens October 1st. Costs $25 + $16 per school (waivers available). Required by most private colleges for their own financial aid.'
      },
      { 
        title: 'College Board - SAT, AP, BigFuture', 
        description: 'Register for SAT, send scores, search colleges, and access free test prep.', 
        url: 'https://www.collegeboard.org', 
        icon: '📚', 
        category: 'link',
        details: 'Free SAT prep with Khan Academy partnership. Send 4 free score reports with each test. Score choice available. AP scores sent separately.'
      },
      { 
        title: 'ACT Test Registration', 
        description: 'Register for ACT, send scores, and access official practice tests.', 
        url: 'https://www.act.org', 
        icon: '📖', 
        category: 'link',
        details: 'Different from SAT! Science section, faster pace. Take both to see which suits you better. SuperScore available at many colleges.'
      },
      { 
        title: 'Coalition Application', 
        description: 'Alternative to Common App accepted by 150+ colleges. Includes collaboration tools.', 
        url: 'https://www.coalitionforcollegeaccess.org', 
        icon: '🤝', 
        category: 'link',
        details: 'Virtual locker to store materials, collaboration space for essay feedback, and some unique prompts. Used by many public universities.'
      },
      { 
        title: 'UC Application System', 
        description: 'Apply to all 9 UC campuses with one application. Deadline: November 30th.', 
        url: 'https://admission.universityofcalifornia.edu/apply', 
        icon: '🐻', 
        category: 'link',
        details: 'Separate from Common App. 4 PIQs (350 words each), no letters of rec, test-blind, due Nov 30. $80/campus ($70 per campus for CA residents).'
      },
      { 
        title: 'Niche - College Rankings & Reviews', 
        description: 'Student reviews, rankings, and detailed college profiles with real student perspectives.', 
        url: 'https://www.niche.com', 
        icon: '⭐', 
        category: 'link',
        details: 'See what students actually think! Rankings by category: best dorms, food, party schools, academics, diversity, and more.'
      },
      { 
        title: 'Federal Student Aid - Loans & Grants', 
        description: 'Official government site for understanding loans, grants, and repayment.', 
        url: 'https://studentaid.gov', 
        icon: '🏛️', 
        category: 'link',
        details: 'Learn about: Pell Grants, Direct Subsidized/Unsubsidized Loans, PLUS Loans, work-study, loan forgiveness, and repayment plans.'
      },
      { 
        title: 'Scholarships.com - Scholarship Database', 
        description: 'Search 3.7 million scholarships worth $19 billion. Free to use.', 
        url: 'https://www.scholarships.com', 
        icon: '💰', 
        category: 'link',
        details: 'Create profile to get matched with scholarships. Also try: Fastweb, Cappex, Bold.org. Apply to many - even small ones add up!'
      },
      { 
        title: 'Khan Academy - Free SAT Prep', 
        description: 'Official SAT prep partnership. Personalized practice based on your PSAT scores.', 
        url: 'https://www.khanacademy.org/sat', 
        icon: '📝', 
        category: 'link',
        details: 'Completely free! Links to your College Board account. Practice questions, full-length tests, and personalized recommendations.'
      },
      { 
        title: 'College Scorecard - Compare Costs & Outcomes', 
        description: 'Government database comparing costs, graduation rates, debt, and earnings by college.', 
        url: 'https://collegescorecard.ed.gov', 
        icon: '📊', 
        category: 'link',
        details: 'See real data: average cost after aid, graduation rates, typical debt, earnings 2 years and 10 years after graduation.'
      },
      { 
        title: 'QuestBridge - For High-Achieving Low-Income Students', 
        description: 'Full scholarships to top colleges for students with financial need.', 
        url: 'https://www.questbridge.org', 
        icon: '🌉', 
        category: 'link',
        details: 'Match to full-ride scholarships at 50+ top schools. Application due in Sept/Oct. Income typically <$65k. 4.0 GPA preferred.'
      },
      { 
        title: 'College Confidential Forums', 
        description: 'Ask questions and connect with students, parents, and counselors.', 
        url: 'https://www.collegeconfidential.com', 
        icon: '💬', 
        category: 'link',
        details: 'Forums for every college, admissions advice, results threads (see who got in where), and "chance me" discussions.'
      },
      { 
        title: 'U.S. News College Rankings', 
        description: 'Comprehensive rankings by category, major, and specialty programs.', 
        url: 'https://www.usnews.com/best-colleges', 
        icon: '🏅', 
        category: 'link',
        details: 'National universities, liberal arts, regional, and by-major rankings. See methodology and compare schools side-by-side.'
      },
      { 
        title: 'Cappex - Scholarship & College Search', 
        description: 'Match with colleges and scholarships based on your profile.', 
        url: 'https://www.cappex.com', 
        icon: '🎯', 
        category: 'link',
        details: 'Get matched to scholarships and colleges. See your admission chances. Request info from schools. Free personality quiz.'
      },
      { 
        title: 'Posse Foundation - Leadership Scholarships', 
        description: 'Full-tuition scholarships for students with leadership potential.', 
        url: 'https://www.possefoundation.org', 
        icon: '👥', 
        category: 'link',
        details: 'Nominate yourself through your school. Attend in cohorts of 10. Partner schools include top universities. Due Aug/Sept.'
      },
      { 
        title: 'College Board Opportunity Scholarships', 
        description: 'Win scholarships just for taking steps in the college process.', 
        url: 'https://opportunity.collegeboard.org', 
        icon: '🎁', 
        category: 'link',
        details: 'Free money for completing FAFSA, applying to colleges, etc. $40k grand prizes. Open to class of 2026.'
      },
      { 
        title: 'Naviance / Scoir - Your School\'s Platform', 
        description: 'Most high schools use these for transcripts, college research, and applications.', 
        url: '/dashboard', 
        icon: '🏫', 
        category: 'link',
        details: 'Check with your counselor! See scattergrams (who got in from your school), request transcripts, and track deadlines.'
      }
    ]
  };

  const filteredResources = {
    guides: activeCategory === 'all' || activeCategory === 'guide' ? resources.guides : [],
    tools: activeCategory === 'all' || activeCategory === 'tool' ? resources.tools : [],
    videos: activeCategory === 'all' || activeCategory === 'video' ? resources.videos : [],
    links: activeCategory === 'all' || activeCategory === 'link' ? resources.links : []
  };

  // Auth loading check disabled
  // if (status === 'loading') {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Consistent Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-2xl font-bold text-primary-600 flex items-center gap-2">
              <Logo size={32} />
              <span>College Compass</span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors">
                <FaComments /> AI Chat
              </Link>
              <Link href="/tracker" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors">
                <FaClipboardList /> Tracker
              </Link>
              <Link href="/essays" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors">
                <FaPencilAlt /> Essays
              </Link>
              <Link href="/timeline" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors">
                <FaCalendarAlt /> Timeline
              </Link>
              <Link href="/resources" className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-600 rounded-lg font-semibold">
                <FaBook /> Resources
              </Link>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-inset">
        <div className="flex justify-around py-2">
          <Link href="/dashboard" className="flex flex-col items-center text-xs text-gray-600 py-2">
            <FaComments className="text-xl mb-1" />
            <span>Chat</span>
          </Link>
          <Link href="/tracker" className="flex flex-col items-center text-xs text-gray-600 py-2">
            <FaClipboardList className="text-xl mb-1" />
            <span>Tracker</span>
          </Link>
          <Link href="/essays" className="flex flex-col items-center text-xs text-gray-600 py-2">
            <FaPencilAlt className="text-xl mb-1" />
            <span>Essays</span>
          </Link>
          <Link href="/timeline" className="flex flex-col items-center text-xs text-gray-600 py-2">
            <FaCalendarAlt className="text-xl mb-1" />
            <span>Timeline</span>
          </Link>
          <Link href="/resources" className="flex flex-col items-center text-xs text-primary-600 font-semibold py-2 bg-primary-50">
            <FaBook className="text-xl mb-1" />
            <span>Resources</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 max-w-7xl pb-20 md:pb-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <FaBook className="text-primary-600" /> Resources Library
          </h1>
          <p className="text-sm sm:text-base text-gray-600">Comprehensive guides, tools, videos, and links for your college journey</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">{resources.guides.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Guides</div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600">{resources.tools.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Tools</div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600">{resources.videos.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Videos</div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md text-center">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600">{resources.links.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Links</div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'all', label: 'All', fullLabel: 'All Resources', count: resources.guides.length + resources.tools.length + resources.videos.length + resources.links.length },
            { id: 'guide', label: 'Guides', fullLabel: 'Guides', count: resources.guides.length },
            { id: 'tool', label: 'Tools', fullLabel: 'Tools', count: resources.tools.length },
            { id: 'video', label: 'Videos', fullLabel: 'Videos', count: resources.videos.length },
            { id: 'link', label: 'Links', fullLabel: 'Links', count: resources.links.length }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="sm:hidden">{cat.label} ({cat.count})</span>
              <span className="hidden sm:inline">{cat.fullLabel} ({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Guides Section */}
        {filteredResources.guides.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">📖 Comprehensive Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredResources.guides.map((resource: any, idx: number) => {
                const cardContent = (
                  <div className="flex items-start">
                    <div className="text-3xl sm:text-5xl mr-3 sm:mr-4 group-hover:scale-110 transition-transform flex-shrink-0">{resource.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-primary-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">{resource.description}</p>
                      <p className="text-xs sm:text-sm text-gray-500 italic">{resource.content}</p>
                      <div className="mt-3 sm:mt-4 text-primary-600 text-sm sm:text-base font-semibold hover:text-primary-700 flex items-center">
                        {resource.url ? 'Read Full Guide' : 'Ask AI'} <span className="ml-2">→</span>
                      </div>
                    </div>
                  </div>
                );

                if (resource.url) {
                  return (
                    <Link key={idx} href={resource.url} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-2xl transition-all cursor-pointer group border-l-4 border-blue-500 block">
                      {cardContent}
                    </Link>
                  );
                }
                
                return (
                  <div key={idx} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-2xl transition-all cursor-pointer group border-l-4 border-blue-500">
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tools Section */}
        {filteredResources.tools.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">🛠️ Helpful Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredResources.tools.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target={resource.url?.startsWith('http') ? '_blank' : '_self'}
                  rel={resource.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-2xl transition-all border-2 border-accent-200 group"
                >
                  <div className="flex items-start">
                    <div className="text-3xl sm:text-5xl mr-3 sm:mr-4 group-hover:scale-110 transition-transform flex-shrink-0">{resource.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-accent-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">{resource.description}</p>
                      <p className="text-xs sm:text-sm text-gray-500 italic">{resource.content}</p>
                      <div className="mt-3 sm:mt-4 text-purple-600 text-sm sm:text-base font-semibold flex items-center">
                        Use Tool <span className="ml-2">→</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Videos Section */}
        {filteredResources.videos.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">🎥 Video Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredResources.videos.map((resource, idx) => (
                <div key={idx} className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-2xl transition-all cursor-pointer border-2 border-blue-200 group">
                  <div className="flex items-start">
                    <div className="text-3xl sm:text-5xl mr-3 sm:mr-4 group-hover:scale-110 transition-transform flex-shrink-0">{resource.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">{resource.description}</p>
                      <p className="text-xs sm:text-sm text-gray-500 italic mb-2">{resource.content}</p>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{resource.platform}</span>
                      <button className="mt-3 sm:mt-4 text-blue-600 text-sm sm:text-base font-semibold hover:text-blue-700 flex items-center">
                        Watch Video <span className="ml-2">▶</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Important Links Section */}
        {filteredResources.links.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">🔗 Essential Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredResources.links.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-2xl transition-all border-2 border-green-200 group"
                >
                  <div className="flex items-start">
                    <div className="text-3xl sm:text-5xl mr-3 sm:mr-4 group-hover:scale-110 transition-transform flex-shrink-0">{resource.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-green-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">{resource.description}</p>
                      <p className="text-xs sm:text-sm text-gray-500 italic mb-2">{resource.details}</p>
                      <div className="text-green-600 text-sm sm:text-base font-semibold flex items-center">
                        Visit Website <span className="ml-2">↗</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Ask AI Section */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg sm:rounded-xl shadow-2xl p-6 sm:p-8 text-white text-center">
          <div className="flex justify-center mb-3 sm:mb-4">
            <FaRobot className="text-4xl sm:text-6xl" />
          </div>
          <h3 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">Need Personalized Guidance?</h3>
          <p className="text-base sm:text-xl mb-4 sm:mb-6 opacity-90">Our AI chatbot can answer specific questions about YOUR situation!</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-primary-600 font-bold text-base sm:text-lg rounded-lg hover:bg-gray-100 transition-all shadow-lg transform hover:scale-105"
          >
            <FaComments /> Chat with AI Now
          </Link>
        </div>
      </div>
    </div>
  );
}
