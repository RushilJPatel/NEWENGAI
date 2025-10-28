# 🚀 Vercel Deployment Instructions

## ⚠️ IMPORTANT: Set Environment Variables First!

Before deploying, you MUST add environment variables to Vercel. The deployment will fail without them.

## 📋 Step-by-Step Deployment

### Step 1: Add Environment Variables to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project **"collegecompass"**
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)
5. Add the following variables:

#### Required Variables:

| Variable Name | Value | Environment |
|--------------|--------|-------------|
| `GEMINI_API_KEY` | Your Gemini API key | Production, Preview, Development |
| `MONGODB_URI` | Your MongoDB connection string | Production, Preview, Development |
| `NEXTAUTH_SECRET` | Your NextAuth secret | Production, Preview, Development |
| `NEXTAUTH_URL` | Your production URL | Production |

#### How to Add Each Variable:

1. Click **"Add New"**
2. Enter the **Key** (e.g., `GEMINI_API_KEY`)
3. Enter the **Value** (your actual key/URI)
4. Select which environments to apply to:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
5. Click **"Save"**

#### Example Values:

```env
# Gemini API Key
GEMINI_API_KEY=AIzaSyC...your_actual_key...

# MongoDB URI (replace with your actual connection string)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/college-compass?retryWrites=true&w=majority

# NextAuth Secret (generate a random string)
NEXTAUTH_SECRET=your-super-secret-random-string-here

# NextAuth URL (your production domain)
NEXTAUTH_URL=https://collegecompass.vercel.app
```

#### 🔒 Security Notes:
- **Never** share these values publicly
- **Never** commit them to git
- Each environment can have different values if needed

---

### Step 2: Get Your MongoDB URI

If you haven't set up MongoDB yet:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create an account
3. Click **"Database"** → **"Connect"**
4. Choose **"Connect your application"**
5. Copy the connection string
6. Replace `<password>` with your actual password
7. Add `/college-compass` before the query parameters

Example:
```
mongodb+srv://username:PASSWORD@cluster.mongodb.net/college-compass?retryWrites=true&w=majority
```

---

### Step 3: Whitelist Vercel IPs in MongoDB (Important!)

MongoDB Atlas blocks connections by default. You need to allow Vercel:

1. In MongoDB Atlas, go to **Security** → **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access From Anywhere"** (for simplicity)
   - Or add Vercel's IP ranges if you prefer tighter security
4. Click **"Confirm"**

---

### Step 4: Redeploy from Vercel Dashboard

After adding environment variables:

1. Go to your **Vercel Dashboard**
2. Select your project
3. Go to **Deployments** tab
4. Find the latest deployment
5. Click the **"⋯"** (three dots) menu
6. Click **"Redeploy"**
7. Check **"Use existing Build Cache"** (optional, for faster builds)
8. Click **"Redeploy"**

---

### Step 5: Deploy from Terminal (Alternative)

If you prefer using the terminal:

```bash
# Make sure you've added env vars first in Vercel Dashboard!

# Deploy to production
vercel --prod

# Or force a new deployment
vercel --prod --force
```

---

## ✅ Verify Deployment

After deployment succeeds:

1. Visit your production URL: `https://collegecompass-xxx.vercel.app`
2. Test the following:
   - ✅ Can you sign in?
   - ✅ Does the onboarding form appear?
   - ✅ Can you complete the onboarding?
   - ✅ Does the AI chat work?
   - ✅ Can premium users save chat history?

---

## 🐛 Common Deployment Issues

### Issue 1: "Please define the MONGODB_URI environment variable"

**Solution**: 
- Environment variables not set in Vercel
- Go to Vercel Dashboard → Settings → Environment Variables
- Add `MONGODB_URI` and redeploy

### Issue 2: "Unable to connect to MongoDB"

**Solutions**:
1. Check MongoDB Atlas is running
2. Verify connection string is correct
3. **Whitelist Vercel IPs** in MongoDB Network Access
4. Check username/password are correct
5. Ensure database name is in the URI

### Issue 3: "NEXTAUTH_URL is not defined"

**Solution**:
- Add `NEXTAUTH_URL` to Vercel environment variables
- Set it to your production URL: `https://your-domain.vercel.app`

### Issue 4: Build succeeds but features don't work

**Solution**:
- Check browser console for errors
- Verify ALL environment variables are set
- Make sure you selected "Production" when adding env vars
- Try a hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

---

## 📊 Monitoring Your Deployment

### Check Deployment Logs:

1. Vercel Dashboard → Your Project
2. Click on the latest deployment
3. View **Build Logs** and **Function Logs**
4. Look for errors or warnings

### Check Database Connections:

1. MongoDB Atlas Dashboard
2. Look at **Metrics** tab
3. Verify connections are being made

---

## 🎯 Post-Deployment Checklist

- [ ] All environment variables added to Vercel
- [ ] MongoDB IP whitelist configured
- [ ] Deployment successful (green checkmark)
- [ ] Production URL is accessible
- [ ] Sign-in works
- [ ] Onboarding form appears for new users
- [ ] AI chat responds correctly
- [ ] Chat history saves (for premium users)
- [ ] Profile data persists across sessions

---

## 🔄 Future Deployments

Once environment variables are set, future deployments are automatic:

```bash
# Just push to GitHub
git add .
git commit -m "Your commit message"
git push origin main

# Vercel will automatically deploy!
```

Or use Vercel CLI:
```bash
vercel --prod
```

---

## 🆘 Still Having Issues?

1. **Check Vercel Build Logs**:
   - Dashboard → Deployments → Click deployment → View Build Logs

2. **Check Function Logs** (Runtime):
   - Dashboard → Deployments → Click deployment → View Function Logs

3. **Check MongoDB Logs**:
   - Atlas Dashboard → Metrics → Connections

4. **Test Locally First**:
   ```bash
   # Make sure it works locally before deploying
   npm run dev
   ```

5. **Clear Vercel Cache**:
   - Redeploy with cache cleared
   - Dashboard → Redeploy → Uncheck "Use existing Build Cache"

---

## 🎉 Success!

Once deployed, your app will have:
- ✅ Personalized onboarding for all users
- ✅ AI-powered 4-year college planning
- ✅ Chat history (Premium feature)
- ✅ Persistent user profiles
- ✅ Scalable MongoDB backend

Congratulations! 🎊

---

## 📝 Quick Reference

**Your Project URL**: https://collegecompass-ifk128rcd-rushils-projects-8100d253.vercel.app

**Vercel Dashboard**: https://vercel.com/rushils-projects-8100d253/collegecompass

**MongoDB Atlas**: https://cloud.mongodb.com

---

**Need help?** Check the AI_SETUP_GUIDE.md for more detailed setup instructions!

