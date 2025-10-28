# 🧠 College Planner AI

An intelligent web application that helps CS students plan their degree efficiently with AI-powered course recommendations.

## ✨ Features

- 🎓 **Top 20 CS Colleges** - Choose from the best computer science programs
- 📚 **Course Tracking** - Mark completed courses and see your progress
- 🤖 **AI-Powered Recommendations** - Get personalized elective suggestions using Google Gemini AI
- 🎯 **Smart Prerequisites** - Automatically suggests next courses based on what you've completed
- 🎨 **Beautiful UI** - Modern, responsive design with Tailwind CSS
- ⚡ **Fast & Efficient** - Built with Next.js 14 for optimal performance
- ☁️ **Cloud Ready** - Deploy to Vercel in minutes

## 🛠️ Technologies Used

- **Next.js 14** - React framework with API routes
- **React 18** - JavaScript library for building UIs
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Beautiful, responsive styling
- **Google Gemini AI** - Intelligent course recommendations
- **JSON Data Store** - Simple, fast data management

## 📋 Prerequisites

Before you begin, make sure you have:
- Node.js 18.17 or later installed ([Download here](https://nodejs.org/))
- A text editor (VS Code recommended)
- A **Gemini API key** (free - get it from [Google AI Studio](https://makersuite.google.com/app/apikey))
- A GitHub account (optional, for deployment)
- A Vercel account (optional, free - sign up at [vercel.com](https://vercel.com))

## 🚀 Getting Started

### 1. Install Dependencies

First, install all the required packages:

```bash
npm install
```

### 2. Set Up Gemini AI API Key

1. Get a **free** API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env.local` file in the root directory (or rename `.env.example` to `.env.local`)
3. Add your API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

⚠️ **Important:** Never commit your `.env.local` file to Git!

### 3. Run the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your app!

### 4. How to Use

1. **Select a College** - Choose from Top 20 CS programs
2. **Mark Completed Courses** - Click on courses you've finished
3. **Enter Interests** - Type your interests (e.g., "AI, machine learning, cybersecurity")
4. **Get Recommendations** - Click the button to receive AI-powered suggestions!

## 🌐 Deploy to Vercel

Vercel is the easiest way to deploy your Next.js app. It's **completely FREE** for personal projects!

### Method 1: Deploy with GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "College Planner AI"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" and sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - **⚠️ IMPORTANT:** Add your environment variable:
     - Go to "Environment Variables"
     - Add: `GEMINI_API_KEY` = `your_actual_api_key`
   - Click "Deploy"
   - Wait 1-2 minutes and your app is live! 🎉

3. **Your app is now live!**
   - Vercel will give you a URL like: `https://college-planner-ai.vercel.app`
   - Every time you push to GitHub, Vercel automatically redeploys!

### Method 2: Deploy with Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts and add environment variables:**
   ```bash
   vercel env add GEMINI_API_KEY
   ```

4. **Deploy again to use the env variable:**
   ```bash
   vercel --prod
   ```

## 📁 Project Structure

```
college-planner-ai/
├── app/
│   ├── api/
│   │   ├── colleges/
│   │   │   └── route.ts     # Colleges API endpoint
│   │   ├── courses/
│   │   │   └── route.ts     # Courses API endpoint
│   │   └── recommend/
│   │       └── route.ts     # AI Recommendation API (Gemini)
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main College Planner UI
├── data/
│   ├── courses.json         # Course prerequisites data
│   └── college_curriculums.json  # Top 20 colleges data
├── .env.local               # API keys (DO NOT COMMIT)
├── .env.example             # Example environment variables
├── package.json             # Dependencies
└── README.md                # This file
```

## 🎨 Customization

### Add More Colleges

Edit `data/college_curriculums.json` to add more schools:

```json
{
  "id": "your-college",
  "name": "Your College Name",
  "rank": 21,
  "requiredCourses": ["CS101", "CS102"],
  "electiveOptions": ["AI101", "SEC101"]
}
```

### Add More Courses

Edit `data/courses.json` to add courses:

```json
{
  "id": "CS999",
  "name": "Advanced Topics",
  "prerequisites": ["CS201"],
  "category": "core",
  "keywords": ["advanced", "research"]
}
```

### Customize UI Colors

Edit `app/page.tsx` and change Tailwind classes:
- `bg-indigo-600` → Change to `bg-blue-600`, `bg-red-600`, etc.
- `from-purple-600` → Change gradient colors

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Kill the process using port 3000 and try again
npx kill-port 3000
npm run dev
```

### Installation errors?
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Deployment issues?
- Make sure all files are committed to Git
- Check that your `package.json` has all dependencies
- Verify you're using Node.js 18.17 or later

## 🚀 Future Enhancements

Ideas to make College Planner AI even better:

- 💾 **User Accounts** - Save progress with authentication
- 📊 **Progress Visualization** - Interactive graphs showing degree completion
- 🔄 **Course Comparison** - Compare curriculums across colleges
- 📅 **Semester Planning** - Plan out your entire academic schedule
- 🎓 **Graduation Tracker** - Track requirements for graduation
- 📱 **Mobile App** - React Native version
- 🗣️ **AI Chat** - Chat with AI about course selection
- 📈 **Career Paths** - Link courses to career outcomes

## 📝 License

This project is open source and free to use!

---

**Happy Coding! 💻✨**

Made with ❤️ by a beginner, for beginners

