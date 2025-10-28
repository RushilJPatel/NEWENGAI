# 🤖 Gemini API Setup Guide

## Error You're Seeing

```
[GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent: [404 Not Found]
```

This means the Gemini API isn't properly configured. Let's fix it!

---

## ✅ Step-by-Step Fix

### Step 1: Enable the Gemini API

1. **Go to Google AI Studio**: Visit [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   
2. **Create or Select Your Project**
   - If you don't have a project, create one
   - Give it a name like "College Compass"

3. **Generate API Key**
   - Click **"Create API Key"**
   - Choose your project
   - Click **"Create API Key in existing project"**
   - Copy the API key (starts with `AIza...`)

4. **IMPORTANT**: Keep this key secure! Never commit it to GitHub.

---

### Step 2: Enable the Generative Language API

1. Go to: [https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com](https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com)

2. Make sure you're in the **correct project** (check top dropdown)

3. Click **"Enable"** button

4. Wait for it to enable (takes a few seconds)

---

### Step 3: Add API Key to Your Environment

#### For Local Development:

1. Open (or create) `.env.local` file in your project root

2. Add your API key:
   ```env
   GEMINI_API_KEY=AIzaSy...your_actual_api_key_here
   ```

3. Save the file

4. Restart your development server:
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart
   npm run dev
   ```

#### For Vercel Deployment:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your API key (starts with `AIza...`)
   - **Environments**: Check Production, Preview, Development
5. Click **Save**
6. Redeploy your project

---

### Step 4: Verify the Model Name

The available Gemini models are:
- ✅ `gemini-pro` — Text generation (recommended, most stable)
- ✅ `gemini-pro-vision` — Image and text input
- ⚠️ `gemini-1.5-pro` — Newer model (may need specific SDK version)
- ⚠️ `gemini-1.5-flash` — Faster variant (may need specific SDK version)

**I've already updated your code to use `gemini-pro`** which is the most reliable model.

---

## 🧪 Test Your Setup

### Test 1: Check API Key Format

Your API key should:
- Start with `AIza`
- Be about 39 characters long
- Not contain spaces or quotes

**Example**: `AIzaSyC1234567890abcdefghijklmnopqrstuvwx`

### Test 2: Test the API Directly

Run this in your terminal (replace `YOUR_API_KEY`):

```bash
curl -X POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY \
  -H 'Content-Type: application/json' \
  -d '{
    "contents": [{
      "parts": [{"text": "Hello"}]
    }]
  }'
```

If it works, you'll see a JSON response with generated text.

### Test 3: Test in Your App

1. Make sure your server is running: `npm run dev`
2. Go to `http://localhost:3000`
3. Sign in
4. Try sending a message to the AI
5. If it works, you'll get a response!

---

## 🐛 Troubleshooting

### Issue 1: "API Key not found"

**Solution**:
1. Check `.env.local` exists in project root
2. Verify the variable is named exactly: `GEMINI_API_KEY`
3. No quotes around the key
4. Restart the dev server

### Issue 2: "403 Forbidden"

**Solution**:
- Your API key doesn't have permissions
- Go back to [Google AI Studio](https://makersuite.google.com/app/apikey)
- Delete the old key
- Create a new one
- Update `.env.local`

### Issue 3: "Model not found" or "404"

**Solution**:
- The model name is wrong or not available
- I've updated the code to use `gemini-pro` (most stable)
- Pull the latest changes: `git pull origin main`

### Issue 4: "Quota exceeded"

**Solutions**:
- You've hit the free tier limit (60 requests per minute)
- Wait a minute and try again
- Or upgrade to paid tier at [Google Cloud Console](https://console.cloud.google.com)

### Issue 5: Still getting errors?

1. **Check your API key is correct**:
   ```bash
   # In your project directory
   cat .env.local
   # Should show: GEMINI_API_KEY=AIza...
   ```

2. **Verify the API is enabled**:
   - Go to [API Dashboard](https://console.cloud.google.com/apis/dashboard)
   - Look for "Generative Language API"
   - Should show "Enabled"

3. **Check browser console**:
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for error messages

4. **Check server logs**:
   - Look at your terminal where `npm run dev` is running
   - Check for error messages

---

## 🔒 Security Best Practices

### ✅ DO:
- Store API key in `.env.local`
- Add `.env.local` to `.gitignore` (already done)
- Use environment variables on Vercel
- Rotate keys periodically

### ❌ DON'T:
- Commit API keys to GitHub
- Share API keys publicly
- Use API keys in client-side code
- Hardcode keys in your files

---

## 💰 Pricing & Limits

### Free Tier (Default):
- **60 requests per minute**
- **1,500 requests per day**
- No credit card required

This is usually enough for development and small apps!

### Paid Tier:
- Higher rate limits
- Priority support
- More models available

For most college planning apps, the **free tier is sufficient**!

---

## ✅ Checklist

Before testing, make sure:

- [ ] API key created at Google AI Studio
- [ ] Generative Language API enabled in Google Cloud
- [ ] `GEMINI_API_KEY` added to `.env.local`
- [ ] `.env.local` file is in project root (not in a subfolder)
- [ ] Development server restarted after adding key
- [ ] No quotes around the API key in `.env.local`
- [ ] API key starts with `AIza`

---

## 📊 Check Your Usage

Monitor your API usage at:
- [Google AI Studio - Usage](https://makersuite.google.com/app/apikey)
- [Google Cloud Console - APIs](https://console.cloud.google.com/apis/dashboard)

You can see:
- Total requests made
- Requests per day/minute
- Any errors or rejections

---

## 🎉 Success!

Once everything is set up, your AI will:
- ✅ Respond to student questions
- ✅ Generate personalized 4-year plans
- ✅ Provide college planning advice
- ✅ Use student profile data for better responses

---

## 🆘 Still Need Help?

If you're still having issues:

1. **Share the exact error message** from:
   - Browser console (F12 → Console)
   - Terminal/server logs

2. **Verify these commands work**:
   ```bash
   # Check if .env.local exists
   ls .env.local
   
   # Check if API key is set
   cat .env.local | grep GEMINI
   ```

3. **Try the curl test** from Step "Test 2" above

4. **Check the API status**: [Google Cloud Status](https://status.cloud.google.com/)

---

## 📚 Additional Resources

- [Google AI Studio](https://makersuite.google.com/app/apikey)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Google Cloud Console](https://console.cloud.google.com/)
- [API Pricing](https://ai.google.dev/pricing)

---

**Quick Start** (TL;DR):

```bash
# 1. Get API key from: https://makersuite.google.com/app/apikey
# 2. Add to .env.local:
echo "GEMINI_API_KEY=your_key_here" > .env.local

# 3. Restart server
npm run dev

# 4. Test in your app!
```

You're all set! 🚀

