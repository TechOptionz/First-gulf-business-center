"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight, Loader2, Mail, Phone, User } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ContactForm({ className }: { className?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Office Space Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your name";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      errs.email = "Please enter a valid email address";
    if (!formData.phone.trim()) errs.phone = "Please enter your phone number";
    if (!formData.message.trim()) errs.message = "Please enter your message";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="bg-white border-2 border-brass-400 p-8 rounded-sm text-center shadow-luxury">
        <div className="w-16 h-16 bg-maroon-50 text-maroon-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-maroon-200">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h4 className="font-serif text-2xl font-bold text-charcoal-950 mb-2">
          Message Sent Successfully!
        </h4>
        <p className="text-base text-charcoal-800 mb-6 leading-relaxed">
          Thank you, <strong className="text-maroon-900">{formData.name}</strong>. Our team will review your inquiry and respond within 2 business hours.
        </p>
        <Button
          variant="secondary"
          size="md"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              service: "Office Space Inquiry",
              message: "",
            });
          }}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white border border-[#E2DAD0] p-6 sm:p-10 rounded-sm shadow-card ${className || ""}`}
    >
      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950 mb-2">
        Send Us a Message
      </h3>
      <p className="text-sm sm:text-base text-charcoal-700 mb-8">
        Have questions regarding office spaces, EJARI certificates, or business setup? Fill out the form below.
      </p>

      <div className="space-y-5 mb-8">
        <div>
          <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2">
            Your Name <span className="text-maroon-700">*</span>
          </label>
          <div className="relative">
            <User className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              required
              placeholder="e.g. Noushad Ellikkal"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                errors.name ? "border-red-600" : "border-[#E2DAD0]"
              }`}
            />
          </div>
          {errors.name && <p className="text-sm text-red-600 font-semibold mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2">
              Email Address <span className="text-maroon-700">*</span>
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                  errors.email ? "border-red-600" : "border-[#E2DAD0]"
                }`}
              />
            </div>
            {errors.email && <p className="text-sm text-red-600 font-semibold mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2">
              Phone Number <span className="text-maroon-700">*</span>
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="tel"
                required
                placeholder="+971 52 000 0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                  errors.phone ? "border-red-600" : "border-[#E2DAD0]"
                }`}
              />
            </div>
            {errors.phone && <p className="text-sm text-red-600 font-semibold mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2">
            Subject / Area of Interest
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border border-[#E2DAD0] rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all cursor-pointer font-medium"
          >
            <option value="Coworking Space">Coworking Space (Hot / Dedicated Desk)</option>
            <option value="Virtual Office EJARI">Virtual Office (EJARI & Estidama)</option>
            <option value="Freezone Serviced Office">Freezone Serviced Office Space</option>
            <option value="Business Setup & PRO">Business Setup & PRO Services</option>
            <option value="Corporate Solutions">Corporate Solutions & IT Infrastructure</option>
            <option value="Trademark Registration">Trademark Registration</option>
            <option value="Other Inquiries">General / Other Inquiries</option>
          </select>
        </div>

        <div>
          <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2">
            Your Message <span className="text-maroon-700">*</span>
          </label>
          <textarea
            required
            rows={4}
            placeholder="How can First Gulf Business Center assist you?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`w-full p-4 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
              errors.message ? "border-red-600" : "border-[#E2DAD0]"
            }`}
          />
          {errors.message && <p className="text-sm text-red-600 font-semibold mt-1">{errors.message}</p>}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={loading}
        icon={loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
      >
        {loading ? "Sending..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
