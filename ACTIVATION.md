# ROOT — Ring 5 Activation Guide

## Current status: PENDING (5 steps)

### Step 1: Stripe LLC Verification
- Go to: https://dashboard.stripe.com
- Find: "Action required" banner or Business section
- Upload: AXIOLEV Holdings LLC Wyoming registration documents
- Expected: 1-3 business days for verification
- Unlocks: live payment processing

### Step 2: Replace Stripe Keys
After verification approval:
```bash
# In Vercel dashboard → root project → Environment Variables:
STRIPE_SECRET_KEY=sk_live_...      # from dashboard.stripe.com/apikeys
STRIPE_PUBLISHABLE_KEY=pk_live_... # from dashboard.stripe.com/apikeys
```

### Step 3: Create ROOT Price IDs
- Go to: https://dashboard.stripe.com/products
- Create: "ROOT Pro" → $49/month recurring → copy price_live_... ID
- Create: "ROOT Auto" → $99/month recurring → copy price_live_... ID
- Set in Vercel env: STRIPE_PRICE_ID_ROOT_PRO and STRIPE_PRICE_ID_ROOT_AUTO

### Step 4: Set Stripe Webhook Secret
- Go to: https://dashboard.stripe.com/webhooks
- Add endpoint: https://axiolevruntime.vercel.app/api/stripe-webhook (or ngrok URL)
- Copy: whsec_... signing secret
- Set in .env: STRIPE_WEBHOOK_SECRET=whsec_...

### Step 5: DNS Cutover (root.axiolev.com)
- Go to: your domain registrar for axiolev.com
- Add CNAME: name=root, value=cname.vercel-dns.com
- In Vercel dashboard: root project → Domains → add root.axiolev.com

## When all 5 complete
Check: https://root-jade-kappa.vercel.app/api/system-status
Expected: launch_ready: true

Then execute LAUNCH_SEQUENCE.md → Day 1-5 ROOT launch.
