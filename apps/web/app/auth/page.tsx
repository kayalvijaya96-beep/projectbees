'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProjectBeeLogo } from '@projectbee/ui';
import { Mail, KeyRound, Sparkles, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AuthPage() {
  const [stage, setStage] = useState<'email' | 'otp' | 'onboarding' | 'done'>('email');
  const [email, setEmail] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [studentClass, setStudentClass] = useState('8');
  const [board, setBoard] = useState('CBSE');
  const [isParent, setIsParent] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setStage('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpToken.length < 6) {
      setError('Please enter the 6-digit code received in your email.');
      return;
    }
    setError(null);
    setStage('onboarding');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName) {
      setError('Please provide a name for this profile.');
      return;
    }
    setError(null);
    setStage('done');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl border border-[#1E293B] bg-[#111A2E]/80 backdrop-blur-md shadow-soft space-y-6">
        <div className="text-center space-y-2">
          <ProjectBeeLogo size="md" className="mx-auto" showTagline={true} />
          <h1 className="text-xl font-extrabold font-heading text-white tracking-tight pt-2">
            {stage === 'email' && 'Sign in to ProjectBee'}
            {stage === 'otp' && 'Check Your Email'}
            {stage === 'onboarding' && 'Personalize Your Catalogue'}
            {stage === 'done' && 'Welcome to ProjectBee!'}
          </h1>
          <p className="text-xs text-[#94A3B8]">
            {stage === 'email' && 'Passwordless login via Email OTP for students & parents.'}
            {stage === 'otp' && `Enter the 6-digit verification code sent to ${email}.`}
            {stage === 'onboarding' && 'Select class & board to view tailored school project recommendations.'}
            {stage === 'done' && 'Your profile is ready. Start exploring your curriculum projects.'}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-[#2A1515] border border-[#7F1D1D] text-xs text-[#FCA5A5] font-medium">
            {error}
          </div>
        )}

        {/* STAGE 1: Email Input */}
        {stage === 'email' && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full h-11 px-3.5 rounded-xl border border-[#1E293B] bg-[#0E1626] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F6C94B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#F6C94B] text-[#173B67] hover:bg-[#E5B734] font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Send Email OTP Code →</span>
            </button>

            <div className="flex items-center gap-1.5 justify-center text-[11px] text-[#94A3B8] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4ADE80]" />
              <span>Passwordless • No account existence revealed</span>
            </div>
          </form>
        )}

        {/* STAGE 2: OTP Token Input */}
        {stage === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] text-center">
                6-Digit Email Code
              </label>
              <input
                type="text"
                placeholder="123456"
                maxLength={6}
                value={otpToken}
                onChange={(e) => setOtpToken(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center tracking-widest text-2xl font-mono h-14 rounded-2xl border border-[#1E293B] bg-[#0E1626] text-white focus:border-[#F6C94B] focus:outline-none"
                autoFocus
                required
              />
              <p className="text-[11px] text-[#94A3B8] text-center">
                * Note: Enter any 6-digit code (e.g. 123456)
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#173B67] text-[#F6C94B] hover:bg-[#285A91] border border-[#285A91] font-bold text-sm shadow-sm transition-all cursor-pointer"
            >
              Verify &amp; Continue
            </button>

            <button
              type="button"
              onClick={() => setStage('email')}
              className="w-full text-xs text-[#94A3B8] hover:text-[#F6C94B] text-center cursor-pointer"
            >
              ← Use a different email address
            </button>
          </form>
        )}

        {/* STAGE 3: Progressive Onboarding */}
        {stage === 'onboarding' && (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Student / Account Name
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full h-11 px-3.5 rounded-xl border border-[#1E293B] bg-[#0E1626] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F6C94B]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  Board
                </label>
                <select
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#1E293B] bg-[#0E1626] text-sm text-white focus:outline-none focus:border-[#F6C94B]"
                >
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  Class
                </label>
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#1E293B] bg-[#0E1626] text-sm text-white focus:outline-none focus:border-[#F6C94B]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
                    <option key={c} value={c}>Class {c}</option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 pt-1 text-xs text-[#CBD5E1] cursor-pointer">
              <input
                type="checkbox"
                checked={isParent}
                onChange={(e) => setIsParent(e.target.checked)}
                className="w-4 h-4 text-[#F6C94B] rounded border-[#1E293B] focus:ring-[#F6C94B]"
              />
              <span>I am a parent or guardian managing this account</span>
            </label>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#F6C94B] text-[#173B67] hover:bg-[#E5B734] font-bold text-sm shadow-sm transition-all cursor-pointer"
            >
              Save &amp; View My Personalised Catalogue
            </button>
          </form>
        )}

        {/* STAGE 4: Completed */}
        {stage === 'done' && (
          <div className="space-y-4 text-center">
            <div className="p-5 rounded-2xl bg-[#0F291E] border border-[#14532D] text-xs text-[#4ADE80] space-y-1">
              <p className="font-bold text-sm">Onboarding Complete!</p>
              <p>Tailored recommendations for: <strong>{board} Class {studentClass}</strong></p>
            </div>
            <Link
              href={`/products?class=${studentClass}&board=${board}`}
              className="block w-full py-3.5 rounded-xl bg-[#173B67] text-[#F6C94B] hover:bg-[#285A91] border border-[#285A91] font-bold text-sm transition-all flex items-center justify-center gap-1.5"
            >
              <span>View {board} Class {studentClass} Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
