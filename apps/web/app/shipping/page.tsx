export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Shipping &amp; Cash on Delivery (COD) Policy
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Effective Date: November 2026 | YugaYatra Retail (OPC) Private Limited
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Launch Territory: Bengaluru Priority</h2>
          <p>
            ProjectBee initial operations are focused in <strong>Bengaluru, Karnataka</strong>, with priority courier dispatch covering PIN code series <code>560001</code> through <code>560105</code>. Pan-India shipping to Tier 1 and Tier 2 cities is expanding continuously.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Delivery Charges &amp; Free Shipping</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Orders above ₹499:</strong> FREE Delivery anywhere within serviceable PIN codes.</li>
            <li><strong>Orders below ₹499:</strong> Flat ₹50 nominal delivery and handling fee.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Cash on Delivery (COD) Verification Process</h2>
          <p>
            To avoid spurious school project bookings and ensure reliable delivery:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Every COD order requires verification via an automated 6-digit WhatsApp OTP sent to the parent/guardian phone number.</li>
            <li>Once confirmed, the order moves to <code>processing</code> and is packed by our educational specialists.</li>
            <li>Payment is made in physical cash (exact change appreciated) or supported delivery-agent QR scan upon doorstep handover.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Delivery Timelines</h2>
          <p>
            In Bengaluru, orders are typically delivered within <strong>2 to 3 school working days</strong>. For other destinations across India, delivery takes <strong>4 to 7 working days</strong>. Tracking updates are provided via WhatsApp and on your ProjectBee account.
          </p>
        </section>
      </div>
    </div>
  );
}

