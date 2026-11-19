'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    studentClass: 'Class 8',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F6C94B] bg-[#111A2E] px-3 py-1 rounded-full border border-[#1E293B]">
          We Are Here to Help
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
          Contact Customer &amp; Parent Support
        </h1>
        <p className="text-sm text-[#94A3B8]">
          Need guidance choosing the right science project for your student’s exhibition? Reach out to our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Channels */}
        <div className="lg:col-span-5 space-y-5">
          {/* WhatsApp Card */}
          <a
            href="https://wa.me/919876543210?text=Hello%20ProjectBee%20Team%2C%20I%20need%20assistance%20with%20a%20school%20project"
            target="_blank"
            rel="noreferrer"
            className="block p-6 rounded-3xl bg-[#0F291E] border border-[#14532D] hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#16A34A] text-white rounded-2xl flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base text-[#4ADE80] group-hover:underline">
                  Instant WhatsApp Assistance
                </h3>
                <p className="text-xs text-[#86EFAC]">
                  +91 98765 43210 • Quick responses for project selection &amp; order tracking
                </p>
              </div>
            </div>
          </a>

          {/* Email Support Card */}
          <div className="p-6 rounded-3xl bg-[#111A2E]/80 backdrop-blur-md border border-[#1E293B] shadow-soft space-y-2">
            <div className="flex items-center gap-3 text-white">
              <Mail className="w-5 h-5 text-[#F6C94B]" />
              <h3 className="font-heading font-bold text-base">Email Support</h3>
            </div>
            <p className="text-xs sm:text-sm text-white font-semibold">support@projectbee.in</p>
            <p className="text-xs text-[#94A3B8]">We reply within 4 to 6 business hours.</p>
          </div>

          {/* Operating Hours & Address */}
          <div className="p-6 rounded-3xl bg-[#111A2E]/80 backdrop-blur-md border border-[#1E293B] shadow-soft space-y-3">
            <div className="flex items-center gap-3 text-white">
              <Clock className="w-5 h-5 text-[#F6C94B]" />
              <h3 className="font-heading font-bold text-base">Support Hours</h3>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Monday through Saturday: 9:00 AM – 7:00 PM IST.<br />
              Sunday: WhatsApp emergency exhibition assistance available.
            </p>
            <div className="pt-2 border-t border-[#1E293B] text-xs text-[#94A3B8] flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#F6C94B] shrink-0 mt-0.5" />
              <span>YugaYatra Retail (OPC) Private Limited, Indiranagar, Bengaluru, Karnataka 560038</span>
            </div>
          </div>
        </div>

        {/* Contact Inquiry Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#111A2E]/80 backdrop-blur-md border border-[#1E293B] shadow-soft">
          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-[#0F291E] text-[#4ADE80] border border-[#14532D] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Thank you for your message!
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Our educational support team will get in touch with you at{' '}
                <strong className="text-[#F6C94B]">{formData.phone || formData.email}</strong> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-heading font-bold text-lg text-white border-b border-[#1E293B] pb-3">
                Send us an Inquiry
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Verma"
                    className="w-full h-11 px-3.5 rounded-xl border border-[#1E293B] bg-[#0E1626] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F6C94B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                    Mobile / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full h-11 px-3.5 rounded-xl border border-[#1E293B] bg-[#0E1626] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F6C94B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="parent@example.com"
                    className="w-full h-11 px-3.5 rounded-xl border border-[#1E293B] bg-[#0E1626] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F6C94B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                    Student Class
                  </label>
                  <select
                    value={formData.studentClass}
                    onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#1E293B] bg-[#0E1626] text-sm text-white focus:outline-none focus:border-[#F6C94B]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
                      <option key={c} value={`Class ${c}`}>
                        Class {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  How can we help? (Project topic, syllabus question, or order inquiry)
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the exhibition topic or model you are looking for..."
                  className="w-full p-3.5 rounded-xl border border-[#1E293B] bg-[#0E1626] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#F6C94B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#F6C94B] text-[#173B67] hover:bg-[#E5B734] font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
