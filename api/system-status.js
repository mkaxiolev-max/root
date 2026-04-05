export default async function handler(req, res) {
  // Public canonical status for ROOT product
  const status = {
    product: "ROOT",
    version: "1.0.0",
    status: "live",
    timestamp: new Date().toISOString(),
    endpoints: {
      landing: "https://root-jade-kappa.vercel.app",
      checkout: "https://root-jade-kappa.vercel.app/api/checkout",
      health: "https://root-jade-kappa.vercel.app/api/system-status",
    },
    stripe: {
      mode: process.env.STRIPE_SECRET_KEY?.startsWith("sk_live") ? "live" : "test",
      products_configured: !!(process.env.STRIPE_PRICE_ID_ROOT_PRO),
      webhook_configured: !!(process.env.STRIPE_WEBHOOK_SECRET),
    },
    ring_5: {
      stripe_live_keys: process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_") || false,
      stripe_price_ids: !!(process.env.STRIPE_PRICE_ID_ROOT_PRO && process.env.STRIPE_PRICE_ID_ROOT_AUTO),
      dns_cutover: false,  // manual — root.axiolev.com CNAME pending
    },
    launch_ready: false,  // flips to true when ring_5 all clear
  };
  status.launch_ready = Object.values(status.ring_5).every(Boolean);
  res.status(200).json(status);
}
