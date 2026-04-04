// ROOT Stripe Checkout — Vercel Serverless Function
// POST /api/checkout  body: {email, plan}
// plan: "pro" ($49/mo) | "auto" ($99/mo)
// Returns: {url} for redirect to Stripe Checkout Session
// Returns: {error, pending:true} if Stripe keys not yet live

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const PRICE_IDS = {
  pro:  process.env.STRIPE_PRICE_ID_ROOT_PRO  || "PRICE_ID_ROOT_PRO_PENDING",
  auto: process.env.STRIPE_PRICE_ID_ROOT_AUTO || "PRICE_ID_ROOT_AUTO_PENDING",
};
const SUCCESS_URL = "https://root-jade-kappa.vercel.app?checkout=success";
const CANCEL_URL  = "https://root-jade-kappa.vercel.app?checkout=cancelled";

const isPending = (v) => !v || v.startsWith("PRICE_ID") || v.startsWith("STRIPE_SK");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  let body = "";
  for await (const chunk of req) body += chunk;
  let data;
  try { data = JSON.parse(body); } catch (_) {
    return res.status(400).json({ error: "invalid_json" });
  }

  const { email, plan = "pro" } = data;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "valid_email_required" });
  }
  if (!["pro", "auto"].includes(plan)) {
    return res.status(400).json({ error: "invalid_plan", valid: ["pro", "auto"] });
  }

  // Graceful pending state — keys not yet substituted
  if (isPending(STRIPE_KEY) || isPending(PRICE_IDS[plan])) {
    return res.status(200).json({
      pending: true,
      error:   "stripe_not_configured",
      message: "ROOT is launching soon. We've noted your interest.",
      email,
      plan,
    });
  }

  try {
    const Stripe = require("stripe");
    const stripe  = Stripe(STRIPE_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode:                 "subscription",
      customer_email:       email,
      line_items: [{ price: PRICE_IDS[plan], quantity: 1 }],
      success_url:          SUCCESS_URL,
      cancel_url:           CANCEL_URL,
      metadata:             { product: "root", plan },
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("[checkout] stripe error:", err.message);
    return res.status(500).json({ error: "stripe_error", message: err.message });
  }
};
