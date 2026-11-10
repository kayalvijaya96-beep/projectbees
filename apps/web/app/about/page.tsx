import Link from 'next/link';
import { ProjectBeeLogo } from '@projectbee/ui';
import { BookOpen, Award, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3 border-b border-slate-200 pb-8">
        <ProjectBeeLogo size="lg" className="mx-auto" showTagline />
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          About ProjectBee
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Empowering Indian school students to understand science concepts through hands-on, curriculum-aligned working models.
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" /> Our Mission
          </h2>
          <p>
            School projects should spark scientific curiosity, not parental panic before exhibition deadlines. ProjectBee was created by <strong>YugaYatra Retail (OPC) Private Limited</strong> to provide students with thoroughly tested, curriculum-aligned science working models, 3D anatomical aids, and educational charts. We help students learn the underlying physics, chemistry, and biology through tactile demonstration rather than rote memorization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> CBSE &amp; ICSE Focus
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every project kit is indexed by academic class (1 to 12) and aligned with the NCERT/CBSE and CISCE science syllabus, ensuring students are well prepared for laboratory practicals and viva voce questions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> Stress-Free Cash on Delivery
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We eliminate online payment friction with 100% Cash on Delivery across Bengaluru and expanding nationwide, backed by WhatsApp order confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
