# 🎓 High School Planner AI

An intelligent web application that helps high school students plan their entire 4-year academic journey with AI-powered recommendations tailored to their chosen major.

## ✨ Features

- 🔐 **User Authentication** - Secure login/signup system
- 📚 **6 Major Tracks** - STEM, Business, Liberal Arts, Health Sciences, Arts & Media, Undecided
- 📅 **4-Year Planning** - Complete course schedules from Grade 9-12
- 🤖 **AI-Powered Guidance** - Personalized recommendations using Google Gemini AI
- 💯 **37+ Courses** - Comprehensive high school curriculum including AP courses
- 🎯 **Smart Prerequisites** - Automatic prerequisite tracking and validation
- 📊 **Credit Tracking** - Monitor credits across all 4 years
- 🖨️ **Print Schedules** - Export your 4-year plan
- 🎨 **Beautiful UI** - Modern, responsive design

## 🚀 Major Tracks Available

1. **STEM** 🔬 - Science, Technology, Engineering, Math
2. **Business & Economics** 💼 - Entrepreneurship and Finance
3. **Liberal Arts & Humanities** 📚 - Writing, History, Social Sciences
4. **Health & Life Sciences** ⚕️ - Pre-Med, Nursing, Health Professions
5. **Arts & Media** 🎨 - Design, Film, Music, Visual Arts
6. **Undecided / Exploratory** 🎓 - Balanced curriculum

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **NextAuth.js** - Authentication system
- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Beautiful styling
- **Google Gemini AI** - Intelligent recommendations
- **JSON Data Store** - Fast data management

## 📋 Prerequisites

- Node.js 18.17 or later ([Download](https://nodejs.org/))
- A **Gemini API key** (free - get it from [Google AI Studio](https://makersuite.google.com/app/apikey))
- A Vercel account (optional, for deployment)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Gemini AI API Key (Required for AI recommendations)
# Get your free API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# NextAuth Secret (Required for authentication)
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your-secret-key-change-in-production
```

⚠️ **Important:** Never commit your `.env.local` file!

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

### 4. How to Use

1. **Sign Up/Login** - Create an account or sign in
2. **Choose Your Major** - Select from 6 major tracks
3. **View 4-Year Plan** - Get a complete schedule from Grade 9-12
4. **Get AI Guidance** - Receive personalized recommendations
5. **Print/Save** - Export your plan for reference

## 📁 Project Structure

```
high-school-planner-ai/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # Authentication
│   │   ├── colleges/            # College data API
│   │   ├── courses/             # Course data API
│   │   ├── generate-schedule/   # Schedule generation
│   │   ├── hs-courses/          # High school courses
│   │   ├── majors/              # Major tracks
│   │   └── recommend/           # AI recommendations
│   ├── login/                   # Login page
│   ├── planner/                 # Main planner UI
│   ├── providers/               # Session provider
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page (redirects)
├── data/
│   ├── courses.json             # College courses
│   ├── college_curriculums.json # College data
│   ├── high_school_courses.json # High school courses
│   └── major_tracks.json        # Major track data
├── types/
│   └── next-auth.d.ts          # NextAuth TypeScript definitions
├── middleware.ts               # Route protection
├── .env.local                  # Environment variables (DO NOT COMMIT)
└── README.md                   # This file
```

## 🌐 Deploy to Vercel

### Method 1: Deploy with GitHub (Recommended)

1. **Push your code to GitHub:**
```bash
git add .
git commit -m "High School Planner AI"
git push origin main
```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - **⚠️ Add Environment Variables:**
     - `GEMINI_API_KEY` = your API key
     - `NEXTAUTH_SECRET` = your secret key
   - Click "Deploy"
   - Live in 2 minutes! 🎉

### Method 2: Deploy with Vercel CLI

```bash
# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add GEMINI_API_KEY
vercel env add NEXTAUTH_SECRET

# Deploy to production
vercel --prod
```

## 🎨 Customization

### Add More Courses

Edit `data/high_school_courses.json`:

```json
{
  "id": "NEW_COURSE",
  "name": "Course Name",
  "subject": "Subject",
  "grade": 10,
  "prerequisites": ["PREREQ_COURSE"],
  "credits": 1,
  "advanced": false
}
```

### Add More Majors

Edit `data/major_tracks.json`:

```json
{
  "id": "your-major",
  "name": "Your Major Name",
  "description": "Description",
  "icon": "🎯",
  "recommendedCourses": {
    "grade9": ["course1", "course2"],
    "grade10": ["course3", "course4"],
    "grade11": ["course5", "course6"],
    "grade12": ["course7", "course8"]
  },
  "totalCredits": 28
}
```

## 🔒 Security Notes

- All authentication is handled by NextAuth.js
- Passwords are never stored in this demo (uses credential provider)
- For production, integrate a real database (PostgreSQL, MongoDB, etc.)
- API keys are protected in `.env.local`
- Routes are protected with middleware

## 📚 API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth authentication |
| `/api/hs-courses` | GET | Get high school courses |
| `/api/majors` | GET | Get major tracks |
| `/api/generate-schedule` | POST | Generate 4-year schedule |
| `/api/colleges` | GET | Get college data (legacy) |
| `/api/courses` | GET | Get college courses (legacy) |

## 🐛 Troubleshooting

### Build Errors?
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Authentication Issues?
- Make sure `NEXTAUTH_SECRET` is set in `.env.local`
- Try clearing cookies and logging in again

### AI Not Working?
- Verify your `GEMINI_API_KEY` is correct
- Check you have API quota remaining at [Google AI Studio](https://makersuite.google.com/)

## 🚀 Future Enhancements

- 💾 **Database Integration** - PostgreSQL/MongoDB for user data
- 📊 **Progress Tracking** - Track completed courses semester by semester
- 🔄 **Course Swapping** - Drag and drop to customize schedules
- 🎓 **College Matching** - Recommend colleges based on your plan
- 📱 **Mobile App** - React Native version
- 🗓️ **Semester View** - Break down by fall/spring semesters
- 👥 **Counselor Dashboard** - Tools for school counselors
- 📈 **GPA Calculator** - Track weighted and unweighted GPA

## 📝 License

This project is open source and free to use!

## 🙏 Credits

Built with ❤️ for high school students planning their future.

---

**Happy Planning! 🎓✨**
