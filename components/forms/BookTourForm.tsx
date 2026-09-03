"use client";

import React, { useState } from "react";
import { CheckCircle2, Calendar, Clock, Phone, Mail, MapPin, ShieldCheck, User, Building, Building2, Briefcase, Users2, ArrowRight, Loader2, Zap, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import MapLink from "@/components/ui/MapLink";
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
    id: "workspace",
    label: "Workspace",
    icon: Building2,
    options: [
      { id: "coworking", label: "Coworking Space", desc: "Hot / Dedicated Desks" },
      { id: "virtual-office", label: "Virtual Office", desc: "EJARI & Estidama" },
      { id: "freezone-office", label: "Freezone Serviced Office", desc: "Private Executive Suite" },
    ],
  },
  {
    id: "consultancy",
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

/** Preselects the incoming service inside whichever group owns it. */
function initialServices(optionId: string): Record<string, string> {
  const group = SERVICE_GROUPS.find((entry) =>
    entry.options.some((option) => option.id === optionId)
  );
  return group ? { [group.id]: optionId } : {};
}

// Reassurance strip under the submit button - three evenly sized columns so
// the items keep the same rhythm whatever the label lengths are.
const BOOKING_ASSURANCES = [
  { icon: MapPin, label: "2nd Floor, Madina Mall, Offices 2–20 & 2–21, Dubai", href: true },
  { icon: ShieldCheck, label: "No obligation • Confidential" },
  { icon: Zap, label: "Instant confirmation" },
];

/** Must match the first <option> below, or the select shows one time and
 *  state reports another. */
const DEFAULT_TIME = "09:00 AM";
const TEAM_SIZES = ["1 Person", "2-5 People", "6-12 People", "13-25 People", "25+ Enterprise"];
const DEFAULT_TEAM_SIZE = TEAM_SIZES[0];

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  date: "",
  time: DEFAULT_TIME,
  notes: "",
  needEjari: false,
  needBusinessSetup: false,
};

/** idle -> sending -> sent, or to error with the booking details still filled. */
type Status = "idle" | "sending" | "sent" | "error";

/** What the confirmation panel needs after the form itself has been cleared. */
interface SentSummary {
  name: string;
  date: string;
  time: string;
  phone: string;
  services: string[];
}

const GENERIC_ERROR =
  "Sorry, we could not submit your booking just now. Please try again, or call us on +971 52 790 0335.";

export default function BookTourForm({
  defaultWorkspace = "coworking",
  className,
}: BookTourFormProps) {
  // One choice per group, so a visitor can ask about a workspace and a
  // consultancy service in the same booking.
  const [services, setServices] = useState(() => initialServices(defaultWorkspace));
  const [teamSize, setTeamSize] = useState(DEFAULT_TEAM_SIZE);
  const [formData, setFormData] = useState(EMPTY_FORM);
  // Bots fill in every field they can parse, including the one people cannot see.
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState<SentSummary | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const sending = status === "sending";

  // Group order, so the workspace always reads before the consultancy service.
  const selectedServices = SERVICE_GROUPS.map((group) =>
    SERVICE_OPTIONS.find((option) => option.id === services[group.id])
  ).filter((option) => option !== undefined);

  const toggleService = (groupId: string, optionId: string) => {
    setServices((prev) => {
      const next = { ...prev };
      // Clicking the active card clears that group again.
      if (next[groupId] === optionId) delete next[groupId];
      else next[groupId] = optionId;
      return next;
    });
    setErrors((prev) => ({ ...prev, service: "" }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    const errs = validate();
    if (selectedServices.length === 0) {
      errs.service = "Please select at least one workspace or service";
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched({ name: true, email: true, phone: true, company: true, date: true });
      setStatus("idle");
      setFormError("");
      return;
    }

    setErrors({});
    setFormError("");
    setStatus("sending");

    const serviceLabels = selectedServices.map((option) => option.label);

    try {
      const response = await fetch("/api/book-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          teamSize,
          services: serviceLabels,
          website: honeypot,
        }),
      });

      // A non-JSON body (a proxy error page, say) must not throw past the
      // catch and put a raw failure in front of the visitor.
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        // Field errors come from the server re-running the same validators.
        if (payload && typeof payload.fields === "object" && payload.fields) {
          setErrors(payload.fields as Record<string, string>);
          setTouched({ name: true, email: true, phone: true, company: true, date: true });
        }
        setFormError(GENERIC_ERROR);
        setStatus("error");
        return;
      }

      // Snapshot first: the confirmation panel reads from this once the
      // form behind it has been reset.
      setSent({
        name: formData.name,
        date: formData.date,
        time: formData.time,
        phone: formData.phone,
        services: serviceLabels,
      });
      setFormData(EMPTY_FORM);
      setServices(initialServices(defaultWorkspace));
      setTeamSize(DEFAULT_TEAM_SIZE);
      setHoneypot("");
      setTouched({});
      setStatus("sent");
    } catch {
      // Network failure, offline, request blocked. The underlying error is
      // never surfaced to the visitor.
      setFormError(GENERIC_ERROR);
      setStatus("error");
    }
  };

  if (status === "sent" && sent) {
    return (
      <div
        className="bg-white border-2 border-brass-400 p-8 md:p-12 rounded-sm text-center shadow-luxury max-w-xl mx-auto"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-maroon-50 text-maroon-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-maroon-200">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-charcoal-950 mb-3">
          Tour Booking Requested!
        </h3>
        <p className="text-base text-charcoal-800 mb-6 leading-relaxed">
          Thank you, <strong className="text-maroon-900">{sent.name}</strong>. Our senior workspace concierge has received your request for{" "}
          <strong className="text-maroon-900">{sent.date}</strong> at <strong className="text-maroon-900">{sent.time}</strong> at our Madina Mall center.
        </p>

        <div className="bg-cream-100 p-5 rounded-sm border border-[#E2DAD0] text-left text-sm sm:text-base text-charcoal-900 mb-8 space-y-2.5">
          <div className="flex justify-between border-b border-cream-300 pb-2">
            <span className="text-charcoal-600 font-medium">Location:</span>
            <MapLink className="font-bold text-right text-maroon-900 underline decoration-brass-400 underline-offset-2 hover:text-maroon-950">
              2nd Floor, Madina Mall, Offices 2–20 & 2–21, Dubai
            </MapLink>
          </div>
          <div className="flex justify-between border-b border-cream-300 pb-2">
            <span className="text-charcoal-600 font-medium">
              {sent.services.length > 1 ? "Services:" : "Service:"}
            </span>
            <span className="font-bold text-right">{sent.services.join(" + ")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal-600 font-medium">Contact:</span>
            <span className="font-bold">{sent.phone}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            href={`https://wa.me/971527900335?text=Hello%20First%20Gulf%20Business%20Center%2C%20I%20just%20booked%20a%20tour%20under%20name%3A%20${encodeURIComponent(
              sent.name
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
              // The form was already reset on success; this just returns to it.
              setStatus("idle");
              setSent(null);
              setErrors({});
              setTouched({});
              setFormError("");
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

      {/* Off-screen honeypot: hidden from people and from the tab order, but
          not from the bots that fill in every input they can parse. */}
      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor="tour-website">Website (leave this field blank)</label>
        <input
          id="tour-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Workspace / Service Selector. A group of buttons rather than inputs,
          so it is labelled as a group instead of pointing at one control. */}
      <div
        className="mb-8"
        role="group"
        aria-labelledby="tour-service-label"
        aria-describedby={errors.service ? "tour-service-error" : undefined}
      >
        <span
          id="tour-service-label"
          className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-1"
        >
          Select Workspace or Service <span className="text-maroon-700">*</span>
        </span>
        <p className="mb-3 text-sm text-charcoal-600">
          Pick one from each group if you need both - tap a selected card to clear it.
        </p>
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
                  {group.options.map((item) => {
                    const isSelected = services[group.id] === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleService(group.id, item.id)}
                        aria-pressed={isSelected}
                        className={`flex min-h-[44px] min-w-0 flex-col rounded-sm border p-4 text-left transition-[border-color,box-shadow] duration-200 cursor-pointer ${
                          isSelected
                            ? "border-maroon-800 bg-maroon-50/70 shadow-sm ring-2 ring-maroon-800"
                            : "border-cream-300 hover:border-brass-400 bg-white"
                        }`}
                      >
                        <div className="flex min-w-0 items-start justify-between gap-2">
                          <div className="min-w-0 text-base font-bold leading-snug text-charcoal-950">{item.label}</div>
                          {/* Always rendered so selecting a card cannot reflow its title. */}
                          <CheckCircle2
                            aria-hidden
                            className={`mt-0.5 h-4 w-4 shrink-0 ${isSelected ? "text-maroon-800" : "text-transparent"}`}
                          />
                        </div>
                        <div className="mt-1 min-w-0 text-sm leading-snug text-charcoal-700">{item.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {errors.service && (
          <p id="tour-service-error" className="mt-2 text-sm text-red-600 font-semibold">
            {errors.service}
          </p>
        )}
      </div>

      {/* Team Size Selector */}
      <div className="mb-8" role="group" aria-labelledby="tour-team-label">
        <span
          id="tour-team-label"
          className="text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-3 flex items-center gap-2"
        >
          <Users2 className="w-4 h-4 text-brass-700" aria-hidden="true" /> Team Size
        </span>
        <div className="flex flex-wrap gap-2.5">
          {TEAM_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setTeamSize(size)}
              aria-pressed={teamSize === size}
              className={`min-h-[44px] px-4 py-2 text-sm font-bold rounded-sm border transition-colors cursor-pointer ${
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
          <label
            htmlFor="tour-name"
            className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2"
          >
            Full Name <span className="text-maroon-700">*</span>
          </label>
          <div className="relative">
            <User className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              id="tour-name"
              name="name"
              type="text"
              required
              maxLength={60}
              autoComplete="name"
              placeholder="e.g. Tariq Mansoor"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              onBlur={() => handleFieldBlur("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "tour-name-error" : undefined}
              className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                errors.name ? "border-red-600" : "border-[#E2DAD0]"
              }`}
            />
          </div>
          {errors.name && (
            <p id="tour-name-error" className="text-sm text-red-600 font-semibold mt-1.5">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="tour-email"
            className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2"
          >
            Business Email <span className="text-maroon-700">*</span>
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              id="tour-email"
              name="email"
              type="email"
              required
              maxLength={100}
              autoComplete="email"
              inputMode="email"
              placeholder="tariq@company.ae"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              onBlur={() => handleFieldBlur("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "tour-email-error" : undefined}
              className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                errors.email ? "border-red-600" : "border-[#E2DAD0]"
              }`}
            />
          </div>
          {errors.email && (
            <p id="tour-email-error" className="text-sm text-red-600 font-semibold mt-1.5">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="tour-phone"
            className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2"
          >
            Phone / WhatsApp <span className="text-maroon-700">*</span>
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              id="tour-phone"
              name="phone"
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
              aria-describedby={errors.phone ? "tour-phone-error" : undefined}
              className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                errors.phone ? "border-red-600" : "border-[#E2DAD0]"
              }`}
            />
          </div>
          {errors.phone && (
            <p id="tour-phone-error" className="text-sm text-red-600 font-semibold mt-1.5">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label
            htmlFor="tour-company"
            className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2"
          >
            Company Name
          </label>
          <div className="relative">
            <Building className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              id="tour-company"
              name="company"
              type="text"
              maxLength={80}
              autoComplete="organization"
              placeholder="e.g. Al Mansoor Holding"
              value={formData.company}
              onChange={(e) => handleFieldChange("company", e.target.value)}
              onBlur={() => handleFieldBlur("company")}
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? "tour-company-error" : undefined}
              className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                errors.company ? "border-red-600" : "border-[#E2DAD0]"
              }`}
            />
          </div>
          {errors.company && (
            <p id="tour-company-error" className="text-sm text-red-600 font-semibold mt-1.5">
              {errors.company}
            </p>
          )}
        </div>

        {/* Preferred Date */}
        <div>
          <label
            htmlFor="tour-date"
            className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2"
          >
            Preferred Date <span className="text-maroon-700">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              id="tour-date"
              name="date"
              type="date"
              required
              value={formData.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleFieldChange("date", e.target.value)}
              onBlur={() => handleFieldBlur("date")}
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? "tour-date-error" : undefined}
              className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                errors.date ? "border-red-600" : "border-[#E2DAD0]"
              }`}
            />
          </div>
          {errors.date && (
            <p id="tour-date-error" className="text-sm text-red-600 font-semibold mt-1.5">
              {errors.date}
            </p>
          )}
        </div>

        {/* Preferred Time */}
        <div>
          <label
            htmlFor="tour-time"
            className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2"
          >
            Preferred Time
          </label>
          <div className="relative">
            <Clock className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
            <select
              id="tour-time"
              name="time"
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
        <label
          htmlFor="tour-notes"
          className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2"
        >
          Special Inquiries or Move-in Date
        </label>
        <textarea
          id="tour-notes"
          name="notes"
          rows={3}
          maxLength={2000}
          placeholder="Tell us about any specific office configuration, parking needs, or corporate license requirements..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-4 text-base text-charcoal-950 bg-cream-50/70 border border-[#E2DAD0] rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all"
        />
      </div>

      {/* Announces the in-flight state to a screen reader. The sent and error
          states carry their own roles, so this only covers "sending". */}
      <div aria-live="polite" role="status" className="sr-only">
        {sending ? "Submitting your booking request" : ""}
      </div>

      {status === "error" && formError && (
        <div
          role="alert"
          className="flex items-start gap-3 mb-5 p-4 bg-red-50 border border-red-300 rounded-sm"
        >
          <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm sm:text-base text-red-800 font-semibold">{formError}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={sending}
        icon={sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
      >
        {sending ? "Confirming Schedule..." : "Confirm & Book Workspace Tour"}
      </Button>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-4 pt-5 border-t border-cream-200 text-xs sm:text-sm font-medium text-charcoal-700">
        {BOOKING_ASSURANCES.map(({ icon: Icon, label, href }) => {
          const content = (
            <>
              <Icon className="w-4 h-4 shrink-0 text-brass-600" />
              <span>{label}</span>
            </>
          );
          const shared = "flex items-center justify-center gap-2 text-center";
          return href ? (
            <MapLink
              key={label}
              className={`${shared} hover:text-maroon-800 transition-colors`}
            >
              {content}
            </MapLink>
          ) : (
            <div key={label} className={shared}>
              {content}
            </div>
          );
        })}
      </div>
    </form>
  );
}
