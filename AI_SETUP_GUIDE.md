# 🚀 AI Integration & Chat History Setup Guide

## Overview
This guide will help you set up the enhanced AI system with:
- ✅ Comprehensive onboarding form for users
- ✅ Chat history backup (Premium feature)
- ✅ Personalized 4-year college plan generation
- ✅ MongoDB integration for data persistence

---

## 📋 Prerequisites

1. **MongoDB Database** - You'll need a MongoDB database (free tier available at MongoDB Atlas)
2. **Gemini API Key** - Already set up, but verify it's in your environment
3. **NextAuth Configuration** - Should already be configured

---

## 🔧 Step 1: Set Up MongoDB

### Option A: MongoDB Atlas (Recommended - Free Tier Available)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (M0 Sandbox - FREE)
4. Click "Connect" on your cluster
5. Choose "Connect your application"
6. Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/`)
7. Replace `<password>` with your actual password

### Option B: Local MongoDB

If you prefer local development:
```bash
# Install MongoDB locally
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
mongod
```

---

## 🔑 Step 2: Configure Environment Variables

You need to update your `.env.local` file (create it if it doesn't exist):

```env
# API Keys
GEMINI_API_KEY=your_actual_gemini_api_key_here

# MongoDB Connection
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/college-compass?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Stripe (for premium features - if not set up yet, you can skip for now)
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
```

### Important Notes:
- **NEVER commit `.env.local` to git** - It's already in `.gitignore`
- Replace all `your_xxx_here` placeholders with actual values
- Keep these credentials secure!

---

## 🏃 Step 3: Install Dependencies

The dependencies have already been installed, but verify:

```bash
npm install
```

This should include:
- `mongoose` (MongoDB integration)
- `@google/generative-ai` (Gemini AI)
- `next-auth` (Authentication)

---

## 🎯 Step 4: Run the Application

```bash
npm run dev
```

The app should start on `http://localhost:3000`

---

## ✨ Features Implemented

### 1. **Comprehensive Onboarding Form**
- 7-step wizard collecting:
  - Academic background (grade, GPA, courses)
  - College & career aspirations
  - Location preferences
  - Time management & study habits
  - Hobbies & extracurriculars
  - Challenges & goals
  - Profile review

### 2. **Chat History (Premium Feature)**
- **Free Tier**: 10 daily messages, no history saving
- **Basic/Premium Tier**: 
  - Unlimited messages
  - Save unlimited conversations
  - Resume chats anytime
  - Access history across devices

### 3. **Personalized 4-Year Plans**
- AI generates custom plans based on:
  - User's profile data
  - Target colleges
  - Current GPA and grade level
  - Study time availability
  - Learning style
  - Career aspirations

### 4. **Database Schema**
- **UserProfile**: Stores all onboarding data
- **ChatHistory**: Stores conversations with metadata

---

## 🧪 Testing the Flow

### Test 1: New User Onboarding
1. Sign in as a new user
2. Onboarding form should appear automatically
3. Fill out all 7 steps
4. Click "Generate My 4-Year Plan"
5. Verify welcome message with profile summary appears

### Test 2: Chat Functionality
1. Ask: "Create my complete 4-year high school plan"
2. AI should generate personalized plan using your profile
3. Verify courses, extracurriculars, and timeline are relevant

### Test 3: Chat History (Premium Only)
1. Have a conversation (multiple messages)
2. Click "Save Chat" button
3. Start a new conversation
4. Click "Chat History"
5. Load the previous conversation
6. Verify all messages are restored

### Test 4: Free Tier Limitations
1. Sign in as free tier user
2. Verify message counter shows "X/10"
3. Send messages and watch counter increment
4. Try to save chat → should see upgrade prompt

---

## 🚀 Deploying to Vercel

### Step 1: Commit Changes to Git

```bash
git add .
git commit -m "feat: Add AI overhaul with onboarding, chat history, and personalized plans"
git push origin main
```

### Step 2: Update Environment Variables on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add all variables from `.env.local`:
   - `GEMINI_API_KEY`
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (change to your production URL)
   - Stripe keys (if using)

### Step 3: Deploy

```bash
# Option 1: Using Vercel CLI
vercel --prod

# Option 2: Automatic deployment
# Just push to GitHub - Vercel will auto-deploy
git push origin main
```

### Step 4: Verify Production Deployment

1. Visit your production URL
2. Test the onboarding flow
3. Test chat functionality
4. Test chat history (if premium)

---

## 📊 Database Management

### View Your Data (MongoDB Atlas)

1. Go to your MongoDB Atlas dashboard
2. Click "Collections"
3. You'll see two collections:
   - `userprofiles` - All user profile data
   - `chathistories` - All saved conversations

### Backup Your Data

MongoDB Atlas provides automatic backups, but you can also:
```bash
# Manual backup
mongodump --uri="your_mongodb_uri"

# Restore backup
mongorestore --uri="your_mongodb_uri" dump/
```

---

## 🐛 Troubleshooting

### Issue: "MONGODB_URI not defined"
**Solution**: Ensure `.env.local` exists and has the correct MongoDB URI

### Issue: "Cannot connect to MongoDB"
**Solution**: 
1. Check your MongoDB cluster is running
2. Verify connection string is correct
3. Ensure IP address is whitelisted (Atlas → Network Access)

### Issue: "Gemini API error"
**Solution**: 
1. Verify `GEMINI_API_KEY` is set correctly
2. Check API quota/limits at Google AI Studio
3. Ensure Gemini API is enabled

### Issue: Onboarding form doesn't appear
**Solution**: 
1. Check browser console for errors
2. Verify you're signed in
3. Clear browser cache and try again

### Issue: Chat history not saving
**Solution**:
1. Verify user has Basic/Premium tier
2. Check MongoDB connection
3. Look for errors in browser console

---

## 🎨 Customization

### Modify Onboarding Questions

Edit `app/components/OnboardingForm.tsx`:
- Add/remove steps
- Change question options
- Adjust form layout

### Adjust AI Prompt

Edit `app/api/chat/route.ts`:
- Modify `systemPrompt` to change AI behavior
- Add more profile context
- Adjust tone/style

### Change Premium Features

Edit `app/dashboard/page.tsx`:
- Modify `MESSAGE_LIMITS` for different tiers
- Add new premium features
- Adjust paywall logic

---

## 📚 API Routes Created

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/profile` | GET | Load user profile |
| `/api/profile` | POST | Save user profile |
| `/api/chat-history` | GET | Get all conversations |
| `/api/chat-history` | POST | Save conversation |
| `/api/chat-history/[id]` | GET | Load specific conversation |
| `/api/chat-history/[id]` | DELETE | Delete conversation |
| `/api/chat` | POST | Send message to AI |

---

## 🎉 You're All Set!

Your AI system is now fully configured with:
- ✅ Comprehensive user profiling
- ✅ Personalized 4-year plan generation
- ✅ Chat history backup (Premium)
- ✅ MongoDB integration
- ✅ Enhanced AI responses

Users will now get a tailored experience based on their unique profile!

---

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Check server logs: `npm run dev`
3. Verify all environment variables are set
4. Review MongoDB connection logs
5. Test API routes individually using tools like Postman

Happy coding! 🚀

