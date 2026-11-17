export default function CancellationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Cancellation &amp; Return Policy
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Effective Date: November 2026 | YugaYatra Retail (OPC) Private Limited
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Order Cancellation Before Dispatch</h2>
          <p>
            Because ProjectBee orders are fulfilled via Cash on Delivery, customers may cancel an order free of charge at any time before the courier handover occurs. You can cancel your order directly from your order tracking screen or by messaging our WhatsApp support helpline.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Transit Damage &amp; Defective Items Replacement</h2>
          <p>
            We take utmost care in packaging delicate science projects, acrylic parts, and glassware. If an item arrives with broken components, fluid leakage, or manufacturing defect:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Notify us within <strong>48 hours</strong> of package delivery by emailing <a href="mailto:support@projectbee.in" className="text-amber-600 underline">support@projectbee.in</a> or contacting our WhatsApp helpline with a photo of the defect.</li>
            <li>We will dispatch a <strong>free replacement part or complete model</strong> immediately without dispute.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Non-Returnable Items</h2>
          <p>
            Due to curriculum exhibition timing and the nature of one-off school assignments, custom-cut foam models and laminated charts that have been written on or customized cannot be returned once delivered in good condition.
          </p>
        </section>
      </div>
    </div>
  );
}

