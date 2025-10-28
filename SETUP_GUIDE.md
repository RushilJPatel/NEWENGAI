# 🚀 Quick Setup Guide for College Planner AI

## Step 1: Get Your FREE Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key" or "Create API Key"
3. Copy your API key

## Step 2: Add API Key to Your App

Create a file called `.env.local` in the root folder and add:

```
GEMINI_API_KEY=paste_your_actual_key_here
```

**⚠️ Replace `paste_your_actual_key_here` with your real API key!**

## Step 3: Run the App

```bash
npm run dev
```

Open http://localhost:3000 and enjoy! 🎉

## How to Use the App

1. **Select a College** - Pick from Top 20 CS schools (like MIT, Stanford, etc.)
2. **Mark Completed Courses** - Click on courses you've already taken
3. **Enter Your Interests** - Type what you're interested in (AI, cybersecurity, web dev, etc.)
4. **Get AI Recommendations** - Click the button and get personalized suggestions!

## Deploy to Vercel

### Option 1: With GitHub (Easiest)

```bash
# Push to GitHub
git add .
git commit -m "College Planner AI ready"
git push

# Go to vercel.com → Import your repo → Add GEMINI_API_KEY as environment variable → Deploy!
```

### Option 2: Direct Deploy

```bash
vercel
# Follow prompts and add your GEMINI_API_KEY when asked
```

## Need Help?

- Check the full [README.md](README.md) for detailed instructions
- Make sure your `.env.local` file is in the root directory
- Make sure you ran `npm install` first
- Your API key should start with something like `AIza...`

---

**That's it! You're ready to plan your CS degree with AI! 🧠🎓**

