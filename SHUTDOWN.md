# ROOT — Pre-Launch Shutdown Documentation
**Date:** 2026-04-05 | **Tag:** `root-prelaunch-v2` | **Status:** RING 5 PENDING

---

## What's live

| Component | Status |
|-----------|--------|
| Landing page | ✅ root-jade-kappa.vercel.app |
| /api/system-status | ✅ launch_ready auto-computes from ring_5 |
| /api/checkout | ✅ Stripe checkout flow wired |
| /api/stripe-webhook | ✅ TypedStateDelta commercial domain |
| zeroguess.dev hub | ✅ 200 |
| ACTIVATION.md | ✅ 5-step Ring 5 guide |
| REVENUE_MODEL.md | ✅ tiers, 30-day MRR ramp |
| LAUNCH_SEQUENCE.md | ✅ in axiolev_runtime |

## Ring 5 — 5 steps to launch

```
[ ] 1. Stripe LLC verify   → dashboard.stripe.com
[ ] 2. Live keys           → STRIPE_SECRET_KEY=sk_live_... in Vercel env
[ ] 3. ROOT price IDs      → STRIPE_PRICE_ID_ROOT_PRO + STRIPE_PRICE_ID_ROOT_AUTO
[ ] 4. YubiKey slot_2      → yubico.com + ENROLL YUBIKEY in Founder Console
[ ] 5. DNS root.axiolev.com → CNAME: name=root, value=cname.vercel-dns.com
```

## Gate
```bash
curl https://root-jade-kappa.vercel.app/api/system-status | python3 -c \
  "import sys,json; d=json.load(sys.stdin); print('launch_ready:', d['launch_ready'])"
```
Expected: `launch_ready: true`

## When ring_5 all clear → LAUNCH_SEQUENCE.md
Day 1: HN Show HN — ROOT deterministic execution receipts
Day 6: HN Show HN — Handrail policy-enforced execution
Day 30 target: $3.9K MRR
