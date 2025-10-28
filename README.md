# 🎓 College Planner AI - Your Personal College Advisor

An intelligent AI-powered chatbot that helps high school students plan their entire college journey. Get personalized 4-year high school schedules based on your target colleges, step-by-step application guidance, and answers to all your college-related questions!

## ✨ Key Features

### 🤖 AI Chatbot Advisor
- **Chat with AI** about anything college-related
- Get instant answers to college planning questions
- Personalized advice based on your goals

### 📚 Custom 4-Year High School Schedules
- **Tailored to ANY US College** - MIT, Stanford, Ivy League, UC System, State Schools, and more
- Automatically adjusts course rigor based on college selectivity
- Includes specific course recommendations with prerequisites
- Explains WHY each course matters for your target schools

###Examples:
- "Create a 4-year schedule for me targeting MIT"
- "I want to apply to UC Berkeley - what courses should I take?"
- "Plan my schedule for Ivy League schools"
- "What classes do I need for Georgia Tech engineering?"

### 📝 Comprehensive College Guidance
- Step-by-step college application process
- Essay writing tips and brainstorming
- Financial aid and scholarship advice
- SAT/ACT preparation strategies
- Interview preparation
- Campus visit recommendations
- Timeline and deadline management

### 🔐 Secure & Personalized
- User authentication system
- Save conversation history
- Track your progress

## 🏫 Supported College Types

The AI has knowledge of requirements for:
- **Highly Selective Engineering** (MIT, Caltech, etc.)
- **Ivy League** (Harvard, Yale, Princeton, etc.)
- **UC System** (Berkeley, UCLA, etc.)
- **Top Engineering Schools** (Georgia Tech, Purdue, UIUC)
- **Business Schools** (Wharton, Ross, Stern)
- **Liberal Arts Colleges** (Williams, Amherst, Swarthmore)
- **State Universities** - Any public university
- **AND MORE!** - Just ask about any college!

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **NextAuth.js** - Secure authentication
- **Google Gemini AI** - Powerful conversational AI
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Beautiful, responsive UI
- **JSON Database** - Fast data access for 37+ courses and college requirements

## 📋 Prerequisites

- Node.js 18.17 or later ([Download](https://nodejs.org/))
- **Gemini API key** (FREE - get it from [Google AI Studio](https://makersuite.google.com/app/apikey))
- Vercel account (optional, for deployment)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Gemini AI API Key (Required for chatbot)
GEMINI_API_KEY=your_gemini_api_key_here

# NextAuth Secret (Required for authentication)
NEXTAUTH_SECRET=your-secret-key-change-in-production
```

⚠️ **Important:** Never commit your `.env.local` file!

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

### 4. How to Use

1. **Sign Up/Login** - Create an account
2. **Start Chatting** - Ask any college-related question
3. **Get Your Schedule** - Ask the AI to create a 4-year plan for your target colleges
4. **Get Guidance** - Ask about essays, applications, financial aid, etc.

## 💬 Example Questions to Ask the AI

### Schedule Planning:
- "Create a 4-year schedule for me targeting MIT"
- "I want to apply to UC schools - what courses should I take?"
- "Plan my schedule for Ivy League colleges"  
- "What classes should I take for a pre-med track?"
- "I'm interested in business schools like Wharton - help me plan"

### Application Help:
- "How do I start the college application process?"
- "What makes a good college essay?"
- "When should I take the SAT/ACT?"
- "How do I choose the right college for me?"
- "Tell me about financial aid and scholarships"
- "How do I prepare for college interviews?"

### Course Advice:
- "Should I take AP Calculus AB or BC?"
- "Is 4 years of foreign language necessary?"
- "What science classes do engineering schools want to see?"
- "How many AP courses should I take?"

## 📁 Project Structure

```
college-planner-ai/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # Authentication
│   │   ├── chat/                 # AI Chatbot API (Main feature!)
│   │   ├── colleges-search/      # College search
│   │   ├── generate-schedule/    # Schedule generation
│   │   └── ...other APIs
│   ├── dashboard/                # Main chat interface
│   ├── login/                    # Login page
│   └── ...other pages
├── data/
│   ├── college_requirements.json # College requirements database
│   ├── high_school_courses.json  # 37+ high school courses
│   ├── major_tracks.json         # Major track data
│   └── ...other data files
├── types/
│   └── next-auth.d.ts           # TypeScript definitions
├── .env.local                   # Environment variables (DO NOT COMMIT)
└── README.md                    # This file
```

## 🌐 Deploy to Vercel

### Method 1: GitHub + Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "College Planner AI"
git push origin main
```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - **Add Environment Variables:**
     - `GEMINI_API_KEY` = your API key
     - `NEXTAUTH_SECRET` = your secret key
   - Deploy! 🚀

### Method 2: Vercel CLI

```bash
vercel
# Add environment variables when prompted
vercel --prod
```

## 🎯 How It Works

1. **AI Context**: The chatbot has access to a database of college requirements and high school courses
2. **Smart Recommendations**: Based on your target colleges, the AI suggests appropriate courses
3. **Conversation Memory**: The AI remembers your conversation for context-aware responses
4. **Customization**: Every schedule is personalized to your goals and interests

## 🔒 Privacy & Security

- All chats are private to your account
- Authentication handled by NextAuth.js
- API keys stored securely in environment variables
- No student data is shared or sold

## 📚 Future Enhancements

- 💾 **Database Integration** - PostgreSQL for persistent chat history
- 📊 **Progress Dashboard** - Visual tracking of completed courses
- 🗓️ **Semester Planning** - Break down by fall/spring semesters
- 👥 **Counselor Tools** - Features for school counselors
- 📱 **Mobile App** - Native iOS/Android apps
- 🎓 **College Matching** - AI-powered college recommendations
- 💰 **Scholarship Finder** - Database of scholarships with AI matching

## 🐛 Troubleshooting

### Chatbot not responding?
- Verify `GEMINI_API_KEY` is correct in `.env.local`
- Check API quota at [Google AI Studio](https://makersuite.google.com/)
- Make sure you've run `npm install`

### Build errors?
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Login issues?
- Ensure `NEXTAUTH_SECRET` is set
- Try clearing browser cookies

## 📝 License

This project is open source and free to use!

## 🙏 Acknowledgments

- Built with ❤️ for high school students planning their future
- Powered by Google Gemini AI
- Inspired by the need for accessible college planning resources

---

**Ready to plan your college journey? Let's get started! 🚀🎓**

*Ask your AI advisor: "Create a 4-year schedule for me targeting [your dream college]"*
