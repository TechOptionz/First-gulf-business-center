"use client";

import React, { useState } from "react";
import { CheckCircle2, Calendar, Clock, Phone, Mail, User, Building, Users2, ArrowRight, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { COMPANY_DETAILS } from "@/data/content";

interface BookTourFormProps {
  defaultWorkspace?: string;
  className?: string;
}

export default function BookTourForm({
  defaultWorkspace = "serviced-office",
  className,
}: BookTourFormProps) {
  const [workspace, setWorkspace] = useState(defaultWorkspace);
  const [teamSize, setTeamSize] = useState("1-3");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: "",
    time: "10:00 AM",
    notes: "",
    needEjari: false,
    needBusinessSetup: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your full name";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      errs.email = "Please enter a valid email address";
    if (!formData.phone.trim())
      errs.phone = "Please enter your phone or WhatsApp number";
    if (!formData.date) errs.date = "Please select a preferred date";
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
    }, 900);
  };

  if (submitted) {
    return (
      <div className="bg-white border-2 border-brass-400 p-8 md:p-12 rounded-sm text-center shadow-luxury max-w-xl mx-auto">
        <div className="w-16 h-16 bg-maroon-50 text-maroon-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-maroon-200">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-charcoal-950 mb-3">
          Tour Booking Requested!
        </h3>
        <p className="text-base text-charcoal-800 mb-6 leading-relaxed">
          Thank you, <strong className="text-maroon-900">{formData.name}</strong>. Our senior workspace concierge has received your request for{" "}
          <strong className="text-maroon-900">{formData.date}</strong> at <strong className="text-maroon-900">{formData.time}</strong> at our Madina Mall center.
        </p>

        <div className="bg-cream-100 p-5 rounded-sm border border-[#E2DAD0] text-left text-sm sm:text-base text-charcoal-900 mb-8 space-y-2.5">
          <div className="flex justify-between border-b border-cream-300 pb-2">
            <span className="text-charcoal-600 font-medium">Location:</span>
            <span className="font-bold text-right">2nd Floor, Madina Mall, Office 2-20, Dubai</span>
          </div>
          <div className="flex justify-between border-b border-cream-300 pb-2">
            <span className="text-charcoal-600 font-medium">Workspace:</span>
            <span className="font-bold capitalize">{workspace.replace(/-/g, " ")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal-600 font-medium">Contact:</span>
            <span className="font-bold">{formData.phone}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            href={`https://wa.me/971527900335?text=Hello%20First%20Gulf%20Business%20Center%2C%20I%20just%20booked%20a%20tour%20under%20name%3A%20${encodeURIComponent(
              formData.name
            )}`}
            target="_blank"
            variant="gold"
            size="md"
          >
            Confirm on WhatsApp Instantly
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                date: "",
                time: "10:00 AM",
                notes: "",
                needEjari: false,
                needBusinessSetup: false,
              });
            }}
          >
            Book Another Tour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white border border-[#E2DAD0] p-6 sm:p-10 rounded-sm shadow-card ${className || ""}`}
    >
      <div className="border-b border-cream-200 pb-6 mb-8">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950 mb-2">
          Schedule an Executive Walkthrough
        </h3>
        <p className="text-base text-charcoal-700 font-normal">
          Experience our premium Dubai workspaces, executive suites, and tenant wellbeing lounge in person.
        </p>
      </div>

      {/* Workspace Type Selector */}
      <div className="mb-8">
        <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-3">
          Select Workspace or Service <span className="text-maroon-700">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "coworking", label: "Coworking Space", desc: "Hot / Dedicated Desks" },
            { id: "virtual-office", label: "Virtual Office", desc: "EJARI & Estidama" },
            { id: "freezone-office", label: "Freezone Serviced Office", desc: "Private Executive Suite" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setWorkspace(item.id)}
              className={`p-4 text-left border rounded-sm transition-all duration-200 cursor-pointer ${
                workspace === item.id
                  ? "border-maroon-800 bg-maroon-50/70 shadow-xs ring-2 ring-maroon-800"
                  : "border-cream-300 hover:border-brass-400 bg-white"
              }`}
            >
              <div className="font-bold text-base text-charcoal-950">{item.label}</div>
              <div className="text-xs sm:text-sm text-charcoal-700 mt-1">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Team Size Selector */}
      <div className="mb-8">
        <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-3 flex items-center gap-2">
          <Users2 className="w-4 h-4 text-brass-700" /> Team Size
        </label>
        <div className="flex flex-wrap gap-2.5">
          {["1 Person", "2-5 People", "6-12 People", "13-25 People", "25+ Enterprise"].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setTeamSize(size)}
              className={`px-4 py-2 text-sm font-bold rounded-sm border transition-colors cursor-pointer ${
                teamSize === size
                  ? "bg-maroon-800 text-white border-maroon-800"
                  : "bg-cream-50 text-charcoal-900 border-cream-300 hover:border-brass-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {/* Full Name */}
        <div>
          <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2">
            Full Name <span className="text-maroon-700">*</span>
          </label>
          <div className="relative">
            <User className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              required
              placeholder="e.g. Tariq Mansoor"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                errors.name ? "border-red-600" : "border-[#E2DAD0]"
              }`}
            />
          </div>
          {errors.name && <p className="text-sm text-red-600 font-semibold mt-1.5">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2">
            Business Email <span className="text-maroon-700">*</span>
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="email"
              required
              placeholder="tariq@company.ae"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                errors.email ? "border-red-600" : "border-[#E2DAD0]"
              }`}
            />
          </div>
          {errors.email && <p className="text-sm text-red-600 font-semibold mt-1.5">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2">
            Phone / WhatsApp <span className="text-maroon-700">*</span>
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="tel"
              required
              placeholder="+971 50 000 0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                errors.phone ? "border-red-600" : "border-[#E2DAD0]"
              }`}
            />
          </div>
          {errors.phone && <p className="text-sm text-red-600 font-semibold mt-1.5">{errors.phone}</p>}
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2">
            Company Name
          </label>
          <div className="relative">
            <Building className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="e.g. Al Mansoor Holding"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border border-[#E2DAD0] rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Preferred Date */}
        <div>
          <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2">
            Preferred Date <span className="text-maroon-700">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="date"
              required
              value={formData.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                errors.date ? "border-red-600" : "border-[#E2DAD0]"
              }`}
            />
          </div>
          {errors.date && <p className="text-sm text-red-600 font-semibold mt-1.5">{errors.date}</p>}
        </div>

        {/* Preferred Time */}
        <div>
          <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2">
            Preferred Time
          </label>
          <div className="relative">
            <Clock className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
            <select
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border border-[#E2DAD0] rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all cursor-pointer font-medium"
            >
              <option value="09:00 AM">09:00 AM (Morning)</option>
              <option value="10:30 AM">10:30 AM (Mid-Morning)</option>
              <option value="12:00 PM">12:00 PM (Noon)</option>
              <option value="02:30 PM">02:30 PM (Afternoon)</option>
              <option value="04:30 PM">04:30 PM (Late Afternoon)</option>
              <option value="06:00 PM">06:00 PM (Evening)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Additional Add-ons */}
      <div className="bg-cream-100/80 p-5 rounded-sm border border-cream-300 mb-8 space-y-3">
        <label className="flex items-center gap-3 text-sm sm:text-base text-charcoal-950 cursor-pointer font-medium">
          <input
            type="checkbox"
            checked={formData.needEjari}
            onChange={(e) => setFormData({ ...formData, needEjari: e.target.checked })}
            className="w-5 h-5 text-maroon-800 rounded-sm border-gray-400 focus:ring-maroon-700"
          />
          <span>I also require <strong>RERA EJARI / DED Estidama</strong> certificate for trade license issuance</span>
        </label>
        <label className="flex items-center gap-3 text-sm sm:text-base text-charcoal-950 cursor-pointer font-medium">
          <input
            type="checkbox"
            checked={formData.needBusinessSetup}
            onChange={(e) => setFormData({ ...formData, needBusinessSetup: e.target.checked })}
            className="w-5 h-5 text-maroon-800 rounded-sm border-gray-400 focus:ring-maroon-700"
          />
          <span>I am interested in <strong>UAE Business Setup, Visa & PRO Services</strong></span>
        </label>
      </div>

      {/* Notes / Special Requests */}
      <div className="mb-8">
        <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2">
          Special Inquiries or Move-in Date
        </label>
        <textarea
          rows={3}
          placeholder="Tell us about any specific office configuration, parking needs, or corporate license requirements..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-4 text-base text-charcoal-950 bg-cream-50/70 border border-[#E2DAD0] rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={loading}
        icon={loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
      >
        {loading ? "Confirming Schedule..." : "Confirm & Book Workspace Tour"}
      </Button>

      <div className="mt-5 flex items-center justify-between text-xs sm:text-sm text-charcoal-700 pt-4 border-t border-cream-200 font-medium">
        <span>📍 2nd Floor, Madina Mall, Dubai</span>
        <span>🔒 No obligation • Confidential</span>
        <span>⚡ Instant confirmation</span>
      </div>
    </form>
  );
}
