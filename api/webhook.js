// Stripe Webhook Handler — Vercel Serverless Function
// Receives Stripe events → appends to Alexandria ledger (JSONL)
// Verifies Stripe-Signature header using STRIPE_WEBHOOK_SECRET

const fs = require("fs");
const path = require("path");
const https = require("https");
const crypto = require("crypto");

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const ALEXANDRIA_LEDGER = "/Volumes/NSExternal/ALEXANDRIA/ledger/stripe_events.jsonl";
const NS_LEDGER_URL = process.env.NS_URL
  ? `${process.env.NS_URL}/receipts/stripe`
  : null;

function verifyStripeSignature(rawBody, sigHeader, secret) {
  if (!secret || !sigHeader) return !secret; // pass if no secret configured
  try {
    const parts = Object.fromEntries(sigHeader.split(",").map(p => p.split("=")));
    const ts = parts.t;
    const sig = parts.v1;
    const payload = `${ts}.${rawBody}`;
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  } catch (_) {
    return false;
  }
}

function appendToLedger(entry) {
  try {
    const line = JSON.stringify(entry) + "\n";
    // Try SSD ledger (only works if running locally or with SSD mount)
    const dir = path.dirname(ALEXANDRIA_LEDGER);
    if (fs.existsSync(dir)) {
      fs.appendFileSync(ALEXANDRIA_LEDGER, line);
    }
  } catch (_) {
    // SSD not mounted (Vercel edge) — event still forwarded to NS below
  }
}

async function forwardToNS(entry) {
  if (!NS_LEDGER_URL) return;
  const body = JSON.stringify({ stream: "operational", event: entry });
  const url = new URL(NS_LEDGER_URL);
  return new Promise((resolve) => {
    const req = https.request(
      { hostname: url.hostname, port: url.port || 443, path: url.pathname,
        method: "POST", headers: { "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body) } },
      (res) => { res.resume(); resolve(); }
    );
    req.on("error", resolve);
    req.write(body);
    req.end();
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  let rawBody = "";
  for await (const chunk of req) rawBody += chunk;

  // Verify Stripe signature
  const sigHeader = req.headers["stripe-signature"] || "";
  if (WEBHOOK_SECRET && !verifyStripeSignature(rawBody, sigHeader, WEBHOOK_SECRET)) {
    return res.status(400).json({ error: "invalid_signature" });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (_) {
    return res.status(400).json({ error: "invalid_json" });
  }

  const entry = {
    ts_utc: new Date().toISOString(),
    stripe_event_id: event.id || null,
    event_type: event.type || "unknown",
    livemode: event.livemode || false,
    data: event.data?.object
      ? {
          id: event.data.object.id,
          amount: event.data.object.amount_total ?? event.data.object.amount,
          currency: event.data.object.currency,
          customer_email: event.data.object.customer_details?.email
            ?? event.data.object.receipt_email ?? null,
          status: event.data.object.status ?? event.data.object.payment_status,
        }
      : {},
  };

  // Append to Alexandria ledger (local SSD) + forward to NS (if configured)
  appendToLedger(entry);
  await forwardToNS(entry);

  console.log(`[stripe-webhook] ${entry.event_type} id=${entry.stripe_event_id}`);
  return res.status(200).json({ received: true });
};
