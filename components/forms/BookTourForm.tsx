"use client";

import React, { useState } from "react";
import { CheckCircle2, Calendar, Clock, Phone, Mail, User, Building, Building2, Briefcase, Users2, ArrowRight, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  sanitizeEmail,
  sanitizeName,
  sanitizePhone,
  validateCompany,
  validateEmail,
  validateName,
  validatePhone,
  validateTourDate,
} from "@/lib/validation";

const FIELD_VALIDATORS: Record<string, (value: string) => string> = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
  company: validateCompany,
  date: validateTourDate,
};

// Characters each field simply refuses to hold, applied on every keystroke.
const FIELD_SANITIZERS: Record<string, (value: string) => string> = {
  name: sanitizeName,
  email: sanitizeEmail,
  phone: sanitizePhone,
};

interface BookTourFormProps {
  defaultWorkspace?: string;
  className?: string;
}

const SERVICE_GROUPS = [
  {
    label: "Workspace",
    icon: Building2,
    options: [
      { id: "coworking", label: "Coworking Space", desc: "Hot / Dedicated Desks" },
      { id: "virtual-office", label: "Virtual Office", desc: "EJARI & Estidama" },
      { id: "freezone-office", label: "Freezone Serviced Office", desc: "Private Executive Suite" },
    ],
  },
  {
    label: "Business Consultancy",
    icon: Briefcase,
    options: [
      { id: "business-setup-pro", label: "Business Setup & PRO", desc: "Trade License, Visas & PRO" },
      { id: "corporate-solutions", label: "Corporate Solutions", desc: "Admin, IT & Accounting" },
      { id: "trademark-registration", label: "Trademark Registration", desc: "Brand & IP Protection" },
    ],
  },
];

const SERVICE_OPTIONS = SERVICE_GROUPS.flatMap((group) => group.options);

export default function BookTourForm({
  defaultWorkspace = "coworking",
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
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const selectedService = SERVICE_OPTIONS.find((option) => option.id === workspace);

  const handleFieldChange = (field: string, rawValue: string) => {
    // Characters the field does not accept are dropped as they are typed
    // or pasted, rather than being taken and then complained about.
    const value = FIELD_SANITIZERS[field]
      ? FIELD_SANITIZERS[field](rawValue)
      : rawValue;
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Live feedback once the field has been visited: errors clear as the
    // user fixes them and reappear if the value becomes invalid again.
    if (touched[field] && FIELD_VALIDATORS[field]) {
      setErrors((prev) => ({ ...prev, [field]: FIELD_VALIDATORS[field](value) }));
    }
  };

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (FIELD_VALIDATORS[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: FIELD_VALIDATORS[field](formData[field as keyof typeof formData] as string),
      }));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    for (const [field, validator] of Object.entries(FIELD_VALIDATORS)) {
      const message = validator(formData[field as keyof typeof formData] as string);
      if (message) errs[field] = message;
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched({ name: true, email: true, phone: true, company: true, date: true });
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
            <span className="text-charcoal-600 font-medium">Service:</span>
            <span className="font-bold text-right">{selectedService?.label ?? workspace.replace(/-/g, " ")}</span>
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
              setErrors({});
              setTouched({});
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
      noValidate
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

      {/* Workspace / Service Selector */}
      <div className="mb-8">
        <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-3">
          Select Workspace or Service <span className="text-maroon-700">*</span>
        </label>
        <div className="space-y-5">
          {SERVICE_GROUPS.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.label}>
                <div className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-charcoal-600">
                  <GroupIcon className="w-4 h-4 text-brass-700" />
                  {group.label}
                </div>
                <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-3">
                  {group.options.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setWorkspace(item.id)}
                      className={`flex min-h-[44px] min-w-0 flex-col rounded-sm border p-4 text-left transition-[border-color,box-shadow] duration-200 cursor-pointer ${
                        workspace === item.id
                          ? "border-maroon-800 bg-maroon-50/70 shadow-sm ring-2 ring-maroon-800"
                          : "border-cream-300 hover:border-brass-400 bg-white"
                      }`}
                    >
                      <div className="min-w-0 text-base font-bold leading-snug text-charcoal-950">{item.label}</div>
                      <div className="mt-1 min-w-0 text-sm leading-snug text-charcoal-700">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
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
              maxLength={60}
              autoComplete="name"
              placeholder="e.g. Tariq Mansoor"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              onBlur={() => handleFieldBlur("name")}
              aria-invalid={!!errors.name}
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
              maxLength={100}
              autoComplete="email"
              placeholder="tariq@company.ae"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              onBlur={() => handleFieldBlur("email")}
              aria-invalid={!!errors.email}
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
              maxLength={20}
              autoComplete="tel"
              inputMode="tel"
              placeholder="+971 50 000 0000"
              value={formData.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              onBlur={() => handleFieldBlur("phone")}
              aria-invalid={!!errors.phone}
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
              maxLength={80}
              autoComplete="organization"
              placeholder="e.g. Al Mansoor Holding"
              value={formData.company}
              onChange={(e) => handleFieldChange("company", e.target.value)}
              onBlur={() => handleFieldBlur("company")}
              aria-invalid={!!errors.company}
              className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                errors.company ? "border-red-600" : "border-[#E2DAD0]"
              }`}
            />
          </div>
          {errors.company && <p className="text-sm text-red-600 font-semibold mt-1.5">{errors.company}</p>}
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
              onChange={(e) => handleFieldChange("date", e.target.value)}
              onBlur={() => handleFieldBlur("date")}
              aria-invalid={!!errors.date}
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
