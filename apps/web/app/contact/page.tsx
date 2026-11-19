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
        <span className="text-xs font-bold uppercase tracking-wider text-[#68778A] bg-[#F5F8FC] px-3 py-1 rounded-full border border-[#CBD5E1]">
          We Are Here to Help
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#173B67] tracking-tight">
          Contact Customer &amp; Parent Support
        </h1>
        <p className="text-sm text-[#68778A]">
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
            className="block p-6 rounded-3xl bg-[#ECFDF5] border border-[#A7F3D0] hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#16A34A] text-white rounded-2xl flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base text-[#065F46] group-hover:underline">
                  Instant WhatsApp Assistance
                </h3>
                <p className="text-xs text-[#047857]">
                  +91 98765 43210 • Quick responses for project selection &amp; order tracking
                </p>
              </div>
            </div>
          </a>

          {/* Email Support Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-soft space-y-2">
            <div className="flex items-center gap-3 text-[#173B67]">
              <Mail className="w-5 h-5 text-[#F6C94B]" />
              <h3 className="font-heading font-bold text-base">Email Support</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#263447] font-semibold">support@projectbee.in</p>
            <p className="text-xs text-[#68778A]">We reply within 4 to 6 business hours.</p>
          </div>

          {/* Operating Hours & Address */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-soft space-y-3">
            <div className="flex items-center gap-3 text-[#173B67]">
              <Clock className="w-5 h-5 text-[#F6C94B]" />
              <h3 className="font-heading font-bold text-base">Support Hours</h3>
            </div>
            <p className="text-xs text-[#68778A] leading-relaxed">
              Monday through Saturday: 9:00 AM – 7:00 PM IST.<br />
              Sunday: WhatsApp emergency exhibition assistance available.
            </p>
            <div className="pt-2 border-t border-[#F1F5F9] text-xs text-[#68778A] flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#F6C94B] shrink-0 mt-0.5" />
              <span>YugaYatra Retail (OPC) Private Limited, Indiranagar, Bengaluru, Karnataka 560038</span>
            </div>
          </div>
        </div>

        {/* Contact Inquiry Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-soft">
          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-[#ECFDF5] text-[#16A34A] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#173B67]">
                Thank you for your message!
              </h3>
              <p className="text-xs sm:text-sm text-[#68778A]">
                Our educational support team will get in touch with you at{' '}
                <strong className="text-[#173B67]">{formData.phone || formData.email}</strong> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#173B67] border-b border-[#F1F5F9] pb-3">
                Send us an Inquiry
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#68778A]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Verma"
                    className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-[#F5F8FC] text-sm text-[#263447] focus:outline-none focus:border-[#F6C94B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#68778A]">
                    Mobile / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-[#F5F8FC] text-sm text-[#263447] focus:outline-none focus:border-[#F6C94B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#68778A]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="parent@example.com"
                    className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-[#F5F8FC] text-sm text-[#263447] focus:outline-none focus:border-[#F6C94B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#68778A]">
                    Student Class
                  </label>
                  <select
                    value={formData.studentClass}
                    onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-[#F5F8FC] text-sm text-[#263447] focus:outline-none focus:border-[#F6C94B]"
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
                <label className="block text-xs font-bold uppercase tracking-wider text-[#68778A]">
                  How can we help? (Project topic, syllabus question, or order inquiry)
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the exhibition topic or model you are looking for..."
                  className="w-full p-3.5 rounded-xl border border-[#CBD5E1] bg-[#F5F8FC] text-sm text-[#263447] focus:outline-none focus:border-[#F6C94B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#173B67] text-white hover:bg-[#285A91] font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
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
