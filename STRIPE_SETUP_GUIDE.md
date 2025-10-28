# 💳 Stripe Payment Integration Guide

## Complete Setup Instructions for Monetizing College Compass

---

## 📋 **Prerequisites**

- Stripe account (sign up at https://stripe.com)
- College Compass app deployed or running locally
- Access to your Vercel environment variables (for production)

---

## 🚀 **Step 1: Create Stripe Account & Get API Keys**

1. **Sign up for Stripe:** https://dashboard.stripe.com/register
2. **Navigate to Developers → API keys**
3. **Copy your keys:**
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

⚠️ **Important:** Use **test keys** for development, **live keys** for production only!

---

## 💰 **Step 2: Create Products & Prices in Stripe**

### Option A: Via Stripe Dashboard (Recommended for Beginners)

1. Go to **Products** → **Add Product**
2. Create **TWO products:**

#### **Product 1: College Compass Basic**
   - **Name:** College Compass Basic
   - **Description:** Advanced college planning features
   - **Price:** $9.99 / month
   - **Billing:** Recurring, Monthly
   - **Copy the Price ID** (starts with `price_...`)

#### **Product 2: College Compass Premium**
   - **Name:** College Compass Premium  
   - **Description:** Complete college planning suite with AI review
   - **Price:** $19.99 / month
   - **Billing:** Recurring, Monthly
   - **Copy the Price ID** (starts with `price_...`)

### Option B: Via Stripe CLI (Advanced)

```bash
# Create Basic Plan
stripe products create \
  --name="College Compass Basic" \
  --description="Advanced college planning features"

stripe prices create \
  --product=prod_XXX \
  --unit-amount=999 \
  --currency=usd \
  --recurring[interval]=month

# Create Premium Plan  
stripe products create \
  --name="College Compass Premium" \
  --description="Complete college planning suite"

stripe prices create \
  --product=prod_YYY \
  --unit-amount=1999 \
  --currency=usd \
  --recurring[interval]=month
```

---

## 🔐 **Step 3: Set Up Environment Variables**

Update your `.env.local` file:

```env
# Existing variables
GEMINI_API_KEY=your_gemini_api_key_here
NEXTAUTH_SECRET=your-secret-key-change-in-production-560465868
NEXTAUTH_URL=http://localhost:3000

# NEW Stripe Variables
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
NEXT_PUBLIC_URL=http://localhost:3000
```

### For Production (Vercel):
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add all the above variables
4. Use **live keys** (`pk_live_...` and `sk_live_...`) for production
5. Set `NEXT_PUBLIC_URL` to your actual domain (e.g., `https://your-app.vercel.app`)

---

## 🔗 **Step 4: Update Price IDs in Code**

Open `app/billing/page.tsx` and update the price IDs around line 55 and 79:

```typescript
{
  name: 'Basic',
  tier: 'basic' as const,
  price: '$9.99',
  period: 'per month',
  priceId: 'price_YOUR_BASIC_PRICE_ID', // ← Replace this
  // ...
},
{
  name: 'Premium',
  tier: 'premium' as const,
  price: '$19.99',
  period: 'per month',
  priceId: 'price_YOUR_PREMIUM_PRICE_ID', // ← Replace this
  // ...
}
```

---

## 🎣 **Step 5: Set Up Webhooks (For Production)**

Webhooks allow Stripe to notify your app about payment events.

### Local Testing (Development):
1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Run: `stripe login`
3. Forward events: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Copy the **webhook signing secret** (starts with `whsec_`)
5. Add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

### Production (Vercel):
1. Go to Stripe Dashboard → **Developers → Webhooks**
2. Click **Add Endpoint**
3. Set **Endpoint URL:** `https://your-app.vercel.app/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Copy the **Signing secret** and add to Vercel environment variables

---

## ✅ **Step 6: Test the Payment Flow**

### Test Mode (Development):

1. **Start your app:** `npm run dev`
2. **Navigate to:** `http://localhost:3000/billing`
3. **Click "Choose Basic" or "Choose Premium"**
4. **Use Stripe test card:** `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
5. **Complete payment** → You'll be redirected to success page!

### Production Testing:

Same flow, but use **real credit cards** (charges will be real!).

---

## 📊 **Revenue Tracking**

### Monitor Payments in Stripe Dashboard:
- **Home:** Overview of revenue, customers, subscriptions
- **Payments:** All successful/failed payments
- **Customers:** Manage subscriber accounts
- **Subscriptions:** Track MRR (Monthly Recurring Revenue)
- **Reports:** Download financial statements

### Key Metrics to Track:
- **MRR (Monthly Recurring Revenue)**
- **Churn Rate** (cancellations)
- **Customer Lifetime Value (LTV)**
- **Conversion Rate** (free → paid)

---

## 💡 **Next Steps: Enhancing the System**

### 1. **Add Database Integration**
Currently, subscription data is stored in localStorage. For production:
- Set up database (PostgreSQL, MongoDB, Firebase)
- Store user subscription tier, status, Stripe customer ID
- Update subscription on webhook events

### 2. **Enforce Paywalls**
In `app/providers/SubscriptionProvider.tsx`:
```typescript
setPaywallActive(true); // Enable this when ready to restrict features
```

### 3. **Add Cancel/Upgrade Flows**
- Allow users to cancel subscriptions
- Enable upgrades/downgrades between tiers
- Prorate charges automatically

### 4. **Email Notifications**
- Send payment confirmations
- Alert users before subscription renewals
- Notify about failed payments

### 5. **Analytics Integration**
- Connect Stripe to Google Analytics
- Track conversion funnels
- A/B test pricing

---

## 🎯 **Pricing Strategy Tips**

### Current Pricing:
- **Free:** $0 (3 colleges, limited features)
- **Basic:** $9.99/month (10 colleges, schedule generator)
- **Premium:** $19.99/month (unlimited, AI review)

### Optimization Ideas:
1. **Annual Plans:** Offer yearly subscriptions at 20% discount
   - Basic: $99/year (save $20)
   - Premium: $199/year (save $40)

2. **Student Discount:** 20-30% off with .edu email verification

3. **Free Trial:** 7-day or 14-day free trial for Premium

4. **Lifetime Deal:** One-time payment ($299-$499) for early adopters

5. **Add-ons:** Extra services (essay review sessions, consultations)

---

## 📈 **Projected Revenue**

### Conservative (1,000 users):
- Free: 700 users → $0
- Basic: 250 users × $9.99 → $2,497.50/mo
- Premium: 50 users × $19.99 → $999.50/mo
- **Total MRR: $3,497/month ($41,964/year)**

### Growth Target (5,000 users):
- Free: 3,000 users → $0
- Basic: 1,500 users × $9.99 → $14,985/mo
- Premium: 500 users × $19.99 → $9,995/mo
- **Total MRR: $24,980/month ($299,760/year)**

### At Scale (20,000 users):
- Free: 12,000 users → $0
- Basic: 6,000 users × $9.99 → $59,940/mo
- Premium: 2,000 users × $19.99 → $39,980/mo
- **Total MRR: $99,920/month ($1,199,040/year)** 🚀

---

## 🆘 **Troubleshooting**

### Error: "No such price"
- Double-check price IDs in `billing/page.tsx`
- Ensure you're using test/live keys correctly

### Webhook not working:
- Verify endpoint URL is correct
- Check webhook signing secret
- Review webhook logs in Stripe Dashboard

### Payment succeeded but user not upgraded:
- Implement database persistence
- Handle webhook events properly
- Update subscription state on `checkout.session.completed`

---

## 📚 **Resources**

- **Stripe Docs:** https://stripe.com/docs
- **Stripe Testing:** https://stripe.com/docs/testing
- **Stripe CLI:** https://stripe.com/docs/stripe-cli
- **Webhooks Guide:** https://stripe.com/docs/webhooks

---

## ✅ **Checklist**

- [ ] Created Stripe account
- [ ] Created Basic and Premium products
- [ ] Copied Price IDs
- [ ] Updated `.env.local` with all keys
- [ ] Updated price IDs in `billing/page.tsx`
- [ ] Tested payment flow with test card
- [ ] Set up webhooks (production)
- [ ] Deployed to Vercel with live keys
- [ ] Tested live payment
- [ ] Monitoring revenue in Stripe Dashboard

---

**Your College Compass is now ready to generate income! 💰🎓**

