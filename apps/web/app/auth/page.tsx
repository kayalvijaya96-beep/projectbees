'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input, ProjectBeeLogo } from '@projectbee/ui';
import { Mail, KeyRound, Sparkles, User, ArrowRight } from 'lucide-react';

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
    // Proceed to progressive onboarding card
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <ProjectBeeLogo size="md" className="mx-auto" />
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {stage === 'email' && 'Sign in to ProjectBee'}
            {stage === 'otp' && 'Check Your Email'}
            {stage === 'onboarding' && 'Personalize Your Catalogue'}
            {stage === 'done' && 'Welcome to ProjectBee!'}
          </h1>
          <p className="text-xs text-slate-500">
            {stage === 'email' && 'Passwordless login via Email OTP for students & parents.'}
            {stage === 'otp' && `Enter the 6-digit verification code sent to ${email}.`}
            {stage === 'onboarding' && 'Select class & board to view tailored school project recommendations.'}
            {stage === 'done' && 'Your profile is ready. Start exploring your curriculum projects.'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        {/* STAGE 1: Email Input */}
        {stage === 'email' && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <Input
              type="email"
              label="Email Address"
              placeholder="parent@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" size="lg" className="w-full font-bold">
              Send Email OTP Code →
            </Button>
            <p className="text-[11px] text-center text-slate-400">
              No password needed. We never reveal account existence.
            </p>
          </form>
        )}

        {/* STAGE 2: OTP Token Input */}
        {stage === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="block text-sm font-medium text-slate-700 text-center">
                6-Digit Email Code
              </label>
              <input
                type="text"
                placeholder="123456"
                maxLength={6}
                value={otpToken}
                onChange={(e) => setOtpToken(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center tracking-widest text-2xl font-mono h-12 rounded-lg border border-slate-300 focus:border-amber-500 focus:outline-none"
                autoFocus
                required
              />
              <p className="text-[11px] text-slate-400 text-center">
                * Local Dev Note: Enter any 6-digit code
              </p>
            </div>
            <Button type="submit" size="lg" className="w-full font-bold">
              Verify &amp; Continue
            </Button>
            <button
              type="button"
              onClick={() => setStage('email')}
              className="w-full text-xs text-slate-500 hover:text-slate-800 text-center"
            >
              ← Use a different email address
            </button>
          </form>
        )}

        {/* STAGE 3: Progressive Onboarding Card */}
        {stage === 'onboarding' && (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <Input
              label="Student / Account Name"
              placeholder="e.g. Aarav Sharma"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 text-left">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Board
                </label>
                <select
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:border-amber-500 focus:outline-none"
                >
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Class
                </label>
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:border-amber-500 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
                    <option key={c} value={c}>Class {c}</option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 pt-1 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isParent}
                onChange={(e) => setIsParent(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded border-slate-300"
              />
              <span>I am a parent or guardian managing this account</span>
            </label>

            <div className="pt-2">
              <Button type="submit" size="lg" className="w-full font-bold">
                Save &amp; View My Catalogue
              </Button>
            </div>
          </form>
        )}

        {/* STAGE 4: Completed */}
        {stage === 'done' && (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
              <p className="font-bold text-sm">Onboarding Complete!</p>
              <p>Catalogue tailored for: <strong>{board} Class {studentClass}</strong></p>
            </div>
            <Link href={`/products?class=${studentClass}&board=${board}`} className="block">
              <Button size="lg" className="w-full font-bold flex items-center justify-center gap-1.5">
                <span>View {board} Class {studentClass} Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

