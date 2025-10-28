# 🧭 College Compass - Your Complete College Planning Platform

**College Compass** is a comprehensive AI-powered web application that guides high school students through every step of their college journey - from freshman year planning to acceptance day!

## ✨ Key Features

### 🤖 AI Advisor Chat
- **24/7 AI College Counselor** powered by Google Gemini AI
- Personalized advice for course selection, college choices, and applications
- Access to comprehensive college requirements database
- Conversational interface with chat history

### 📋 Application Tracker (FULLY FUNCTIONAL!)
- **Track all your college applications** in one organized dashboard
- **Browse 16+ Pre-Loaded Colleges** from our database:
  - Stanford, MIT, Harvard, Yale, Princeton
  - UC Berkeley, UCLA, Columbia, UPenn, Duke
  - Northwestern, Caltech, Cornell, USC, Carnegie Mellon, Georgia Tech
- **Automatic Information Pre-Fill** from college database
- **Visual Progress Tracking** with countdown timers
- **Requirements Checklist**: Essays, recommendations, transcripts, test scores
- **Status Updates**: Not Started → In Progress → Submitted → Accepted
- **Add Custom Colleges** or pick from database
- **Persistent Storage** - all data saved locally

### 📅 Grade-Based Timeline
- **Adaptive Timeline** that changes based on YOUR grade level
- **Freshman (9th)**: Foundation building, exploring interests
- **Sophomore (10th)**: Increasing rigor, PSAT prep, college research
- **Junior (11th)**: CRITICAL YEAR - testing, recommendations, visits
- **Senior (12th)**: APPLICATIONS - EA/ED Nov 1, RD Jan 1-15, decisions April/May
- **Interactive Checklist** - mark tasks complete, track progress
- **Current Deadlines** synced to 2025-2026 academic year
- **localStorage persistence** - never lose your progress

### ✍️ Essay Hub
- **All 7 Common App Prompts** (2025-2026)
- **Unique writing tips** for each prompt
- **Strategy guides** for different essay types
- Direct link to AI brainstorming
- Writing best practices and examples

### 📚 Resources Library (67+ Resources!)
- **16 Comprehensive Guides**: Applications, FAFSA, test prep, campus visits, interviews, etc.
- **16 Helpful Tools**: Net price calculator, GPA calculator, scholarship search, etc.
- **16 Video Tutorials**: Essay writing, interviews, test strategies, etc.
- **19 Essential Links**: Common App, FAFSA, CSS Profile, College Board, UC Application, etc.
- All resources are **categorized and searchable**

### 📊 College Database
- **16 Top Colleges** with complete information:
  - Admission rates, GPA ranges, test score ranges
  - Application deadlines (EA, ED, RD, REA)
  - Essay requirements and counts
  - Test policies (Required, Optional, Test-Blind)
  - Financial aid policies
  - Top majors and special notes
- **Searchable by name or location**
- **One-click add to Application Tracker**

## 🚀 Live Features

### Application Tracker Features:
1. **Add from Database** - Browse 16 pre-loaded colleges
2. **Custom Applications** - Add any college manually
3. **Edit Everything** - Update deadlines, requirements, notes
4. **Status Management** - Dropdown to change status instantly
5. **Requirement Cards** - Visual tracking of essays, recs, transcripts
6. **Deadline Countdown** - See days remaining (RED for urgent!)
7. **Quick Stats** - Total, In Progress, Submitted, Accepted counts
8. **Delete Applications** - With confirmation prompt
9. **Persistent Storage** - Saved in browser localStorage

### Timeline Features:
1. **Grade Selector** - Choose 9th, 10th, 11th, or 12th grade
2. **Seasonal Breakdown** - Fall, Winter, Spring, Summer tasks
3. **Completion Tracking** - Click tasks to mark complete
4. **Progress Bars** - Visual progress per section and overall
5. **Urgent Markers** - Critical sections highlighted
6. **Current Dates** - October 2025 through May 2026
7. **Saved Progress** - localStorage persistence

## 🎨 Design Features

- **Professional Logo**: Custom SVG compass logo
- **React Icons**: Professional Font Awesome icons throughout
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful UI**: Gradient backgrounds, smooth transitions, modern cards
- **Consistent Navigation**: Logo-based navigation across all pages
- **Mobile Bottom Nav**: Easy thumb-friendly navigation on phones

## 📁 Project Structure

```
college-compass/
├── app/
│   ├── components/
│   │   └── Logo.tsx                    # Custom compass logo
│   ├── api/
│   │   ├── auth/[...nextauth]/        # Authentication
│   │   ├── chat/                      # AI chatbot endpoint
│   │   ├── colleges-database/         # College info API
│   │   └── [other APIs]/             # Course data, etc.
│   ├── dashboard/                     # AI Chat page
│   ├── tracker/                       # Application Tracker ✨
│   ├── timeline/                      # Grade-based Timeline ✨
│   ├── essays/                        # Essay Hub with prompts
│   ├── resources/                     # 67+ Resources ✨
│   ├── login/                         # Auth page
│   └── page.tsx                       # Landing/redirect
├── data/
│   ├── colleges_database.json         # 16 colleges with full info ✨
│   ├── college_requirements.json      # Requirements by school type
│   ├── high_school_courses.json       # Course catalog
│   └── essay_prompts.json            # Common App prompts
├── public/
│   └── favicon.ico
└── README.md                          # You are here!
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini AI (1.5 Pro)
- **Auth**: NextAuth.js
- **Icons**: React Icons (Font Awesome)
- **Deployment**: Vercel
- **Data**: JSON files + localStorage

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Gemini API key (free from Google AI Studio)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/college-compass.git
cd college-compass
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:

```env
# Get free API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your-secret-key-change-in-production

# Your app URL
NEXTAUTH_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:3000`

6. **Login** (Demo Mode)
- Use ANY email and password
- Currently in demo mode (no real authentication)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel

1. Push your code to GitHub
2. Connect to Vercel: https://vercel.com/new
3. Add environment variables in Vercel dashboard
4. Deploy!

## 💾 Data Persistence

- **Application Tracker**: Saved to `localStorage` as `college_applications`
- **Timeline Progress**: Saved to `localStorage` as `timeline_tasks` and `timeline_grade`
- **All data is client-side** - no database required!

## 🎓 How to Use

### For Freshmen (9th Grade):
1. Go to **Timeline** → Select "9th Grade"
2. Start with Fall tasks: adjust to high school, join clubs
3. Use **AI Chat** to ask about course selection
4. Check **Resources** for study tips

### For Sophomores (10th Grade):
1. **Timeline** → "10th Grade"
2. Take PSAT 10 (October)
3. Start researching colleges in **Resources**
4. Plan junior year courses with **AI Chat**

### For Juniors (11th Grade) - MOST IMPORTANT YEAR!
1. **Timeline** → "11th Grade" - FOLLOW CLOSELY!
2. Take PSAT/NMSQT in October (scholarships!)
3. Take SAT/ACT in Oct/Nov/Dec and again in Spring
4. Ask teachers for recommendations in MAY
5. Use **Essay Hub** to brainstorm topics
6. Add colleges to **Tracker** from database
7. **AI Chat**: "Create a 4-year schedule for MIT"

### For Seniors (12th Grade) - CRUNCH TIME!
1. **Timeline** → "12th Grade" - DON'T MISS DEADLINES!
2. Open **Application Tracker**
3. Click "Browse College Database" - add your schools
4. Complete **FAFSA** October 1st
5. Submit **EA/ED** by November 1st
6. Submit **UC Apps** by November 30th
7. Submit **RD** by January 1-15
8. Use **Essay Hub** for all prompts
9. Track everything in **Tracker**
10. Update status as you submit!

## 🆕 What's New in This Version

### Application Tracker:
- ✅ Fully functional add/edit/delete
- ✅ 16 colleges pre-loaded in database
- ✅ Browse and auto-fill college info
- ✅ Status dropdown (Not Started → Accepted)
- ✅ Requirement cards with visual indicators
- ✅ Countdown timers with urgency markers
- ✅ Notes field for each application
- ✅ Stats dashboard (Total, In Progress, etc.)

### Timeline:
- ✅ Grade-based timeline (9th-12th)
- ✅ Seasonal task breakdown
- ✅ Interactive checkboxes
- ✅ Progress tracking per section
- ✅ localStorage persistence
- ✅ Current 2025-2026 dates

### Branding:
- ✅ Renamed to "College Compass"
- ✅ Custom SVG compass logo
- ✅ Professional icons throughout
- ✅ Consistent navigation

### Resources:
- ✅ 67 total resources
- ✅ 16 guides fully functional
- ✅ All with detailed descriptions

## 📝 Notes

- **Demo Authentication**: Currently accepts any email/password. In production, implement proper user management.
- **Data Storage**: All data is client-side (localStorage). For production, consider a backend database.
- **College Data**: 16 colleges included. Easily expandable by adding to `colleges_database.json`

## 🤝 Contributing

Contributions welcome! This is a learning project built for helping students.

## 📄 License

MIT License - feel free to use for your own college planning!

## 🎯 Roadmap

- [ ] Real user authentication with database
- [ ] Cloud storage for applications
- [ ] More colleges in database (200+)
- [ ] Scholarship tracker
- [ ] Recommendation request tracker
- [ ] Mobile app version
- [ ] Parent/counselor dashboard

---

**Built with ❤️ to help students navigate the college process**

🧭 **College Compass** - Navigate Your Future
