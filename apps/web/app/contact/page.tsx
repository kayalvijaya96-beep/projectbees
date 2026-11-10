import { Mail, Phone, MapPin, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const faqs = [
    {
      q: 'Do the science models come completely assembled?',
      a: 'Yes! Our Working Science Models and 3D Anatomical models arrive fully assembled, calibrated, and tested. They include a laminated educational guide explaining the scientific principle, formulas, and common viva questions.',
    },
    {
      q: 'How does Cash on Delivery (COD) work?',
      a: 'When you place an order, you enter your address and parent phone number. We send a quick 6-digit WhatsApp OTP to confirm the contact number. Once verified, we dispatch your project kit. You simply pay the delivery agent in cash upon package arrival.',
    },
    {
      q: 'Can I order a model for a different class than my default profile?',
      a: 'Absolutely. While ProjectBee personalizes your default view according to your selected board and class, our search and catalogue filters let you browse and order any kit across Classes 1 through 12.',
    },
    {
      q: 'How long does delivery take in Bengaluru?',
      a: 'Orders within Bengaluru are typically delivered within 2 to 3 school working days. We also offer priority courier dispatch for urgent exhibition deadlines.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact Us &amp; FAQs
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Have a question about a science model or order? We are here to help school students &amp; parents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
          <Mail className="w-6 h-6 text-amber-500" />
          <h3 className="font-bold text-slate-900 text-sm">Email Support</h3>
          <p className="text-xs text-slate-500">For order inquiries &amp; curriculum questions</p>
          <a href="mailto:support@projectbee.in" className="text-xs font-semibold text-amber-600 block hover:underline">
            support@projectbee.in
          </a>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
          <Phone className="w-6 h-6 text-amber-500" />
          <h3 className="font-bold text-slate-900 text-sm">WhatsApp Helpline</h3>
          <p className="text-xs text-slate-500">Mon-Sat 9:00 AM – 7:00 PM IST</p>
          <span className="text-xs font-semibold text-slate-900 block">+91 80000 00000</span>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
          <MapPin className="w-6 h-6 text-amber-500" />
          <h3 className="font-bold text-slate-900 text-sm">Office &amp; Fulfilment</h3>
          <p className="text-xs text-slate-500">YugaYatra Retail (OPC) Private Limited</p>
          <span className="text-xs text-slate-700 block">Bengaluru, Karnataka 560038</span>
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" /> Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm">{faq.q}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
