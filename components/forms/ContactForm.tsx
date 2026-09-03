"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, ArrowRight, Loader2, Mail, Phone, User, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  sanitizeEmail,
  sanitizeName,
  sanitizePhone,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
} from "@/lib/validation";

const FIELD_VALIDATORS: Record<string, (value: string) => string> = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
  message: validateMessage,
};

// Characters each field simply refuses to hold, applied on every keystroke.
const FIELD_SANITIZERS: Record<string, (value: string) => string> = {
  name: sanitizeName,
  email: sanitizeEmail,
  phone: sanitizePhone,
};

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  service: "Office Space Inquiry",
  message: "",
};

/** idle -> sending -> sent, or to error with what was typed left intact. */
type Status = "idle" | "sending" | "sent" | "error";

const GENERIC_ERROR =
  "Sorry, we could not send your message just now. Please try again, or call us on +971 52 790 0335.";

export default function ContactForm({ className }: { className?: string }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  // Bots fill in every field they can parse, including the one people cannot see.
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  // Held separately so the thank-you can still greet the sender by name
  // after the form itself has been cleared.
  const [sentName, setSentName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const sending = status === "sending";
  const successRef = useRef<HTMLDivElement>(null);

  // The confirmation panel is much shorter than the form it replaces, so on a
  // long page it can land off-screen and read as "nothing happened". Bring it
  // into view and move focus to it, which also puts a screen reader there.
  useEffect(() => {
    if (status !== "sent") return;
    const node = successRef.current;
    if (!node) return;
    node.focus({ preventScroll: true });
    // scrollIntoView's own `behavior` overrides the CSS rule, so the
    // reduced-motion preference has to be read here too.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }, [status]);

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
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched({ name: true, email: true, phone: true, message: true });
      setStatus("idle");
      setFormError("");
      return;
    }

    setErrors({});
    setFormError("");
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website: honeypot }),
      });

      // A non-JSON body (a proxy error page, say) must not throw past the
      // catch and put a raw failure in front of the visitor.
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        // Field errors come from the server re-running the same validators.
        if (payload && typeof payload.fields === "object" && payload.fields) {
          setErrors(payload.fields as Record<string, string>);
          setTouched({ name: true, email: true, phone: true, message: true });
        }
        setFormError(GENERIC_ERROR);
        setStatus("error");
        return;
      }

      setSentName(formData.name);
      setFormData(EMPTY_FORM);
      setHoneypot("");
      setTouched({});
      setStatus("sent");
    } catch {
      // Network failure, offline, request blocked. The underlying error is
      // logged nowhere the visitor can see and never rendered.
      setFormError(GENERIC_ERROR);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        // scroll-mt clears the sticky header, which would otherwise cover the
        // top of the panel once it is scrolled to.
        className="bg-white border-2 border-brass-400 p-8 rounded-sm text-center shadow-luxury scroll-mt-28 focus:outline-none"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-maroon-50 text-maroon-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-maroon-200">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h4 className="font-serif text-2xl font-bold text-charcoal-950 mb-2">
          Message Sent Successfully!
        </h4>
        <p className="text-base text-charcoal-800 mb-6 leading-relaxed">
          Thank you, <strong className="text-maroon-900">{sentName}</strong>. Our team will review your inquiry and respond within 2 business hours.
        </p>
        <Button
          variant="secondary"
          size="md"
          onClick={() => {
            setStatus("idle");
            setErrors({});
            setTouched({});
            setFormError("");
            setFormData(EMPTY_FORM);
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
      noValidate
      className={`bg-white border border-[#E2DAD0] p-6 sm:p-10 rounded-sm shadow-card ${className || ""}`}
    >
      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950 mb-2">
        Send Us a Message
      </h3>
      <p className="text-sm sm:text-base text-charcoal-700 mb-8">
        Have questions regarding office spaces, EJARI certificates, or business setup? Fill out the form below.
      </p>

      {/* Off-screen honeypot: hidden from people and from the tab order, but
          not from the bots that fill in every input they can parse. */}
      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor="contact-website">Website (leave this field blank)</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="space-y-5 mb-8">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2"
          >
            Your Name <span className="text-maroon-700">*</span>
          </label>
          <div className="relative">
            <User className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              maxLength={60}
              autoComplete="name"
              placeholder="e.g. Noushad Ellikkal"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              onBlur={() => handleFieldBlur("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                errors.name ? "border-red-600" : "border-[#E2DAD0]"
              }`}
            />
          </div>
          {errors.name && (
            <p id="contact-name-error" className="text-sm text-red-600 font-semibold mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="contact-email"
              className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2"
            >
              Email Address <span className="text-maroon-700">*</span>
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                maxLength={100}
                autoComplete="email"
                inputMode="email"
                placeholder="name@domain.com"
                value={formData.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                onBlur={() => handleFieldBlur("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                  errors.email ? "border-red-600" : "border-[#E2DAD0]"
                }`}
              />
            </div>
            {errors.email && (
              <p id="contact-email-error" className="text-sm text-red-600 font-semibold mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-phone"
              className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2"
            >
              Phone Number <span className="text-maroon-700">*</span>
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-charcoal-500 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                maxLength={20}
                autoComplete="tel"
                inputMode="tel"
                placeholder="+971 52 000 0000"
                value={formData.phone}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                onBlur={() => handleFieldBlur("phone")}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                className={`w-full pl-11 pr-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
                  errors.phone ? "border-red-600" : "border-[#E2DAD0]"
                }`}
              />
            </div>
            {errors.phone && (
              <p id="contact-phone-error" className="text-sm text-red-600 font-semibold mt-1">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="contact-service"
            className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2"
          >
            Subject / Area of Interest
          </label>
          <select
            id="contact-service"
            name="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 text-base text-charcoal-950 bg-cream-50/70 border border-[#E2DAD0] rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all cursor-pointer font-medium"
          >
            <option value="Coworking Space">Coworking Space (Hot / Dedicated Desk)</option>
            <option value="Virtual Office EJARI">Virtual Office (EJARI &amp; Estidama)</option>
            <option value="Freezone Serviced Office">Freezone Serviced Office Space</option>
            <option value="Business Setup &amp; PRO">Business Setup &amp; PRO Services</option>
            <option value="Corporate Solutions">Corporate Solutions &amp; IT Infrastructure</option>
            <option value="Trademark Registration">Trademark Registration</option>
            <option value="Other Inquiries">General / Other Inquiries</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-900 mb-2"
          >
            Your Message <span className="text-maroon-700">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            maxLength={2000}
            placeholder="How can First Gulf Business Center assist you?"
            value={formData.message}
            onChange={(e) => handleFieldChange("message", e.target.value)}
            onBlur={() => handleFieldBlur("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`w-full p-4 text-base text-charcoal-950 bg-cream-50/70 border rounded-sm focus:outline-none focus:ring-2 focus:ring-maroon-800 focus:bg-white transition-all ${
              errors.message ? "border-red-600" : "border-[#E2DAD0]"
            }`}
          />
          {errors.message && (
            <p id="contact-message-error" className="text-sm text-red-600 font-semibold mt-1">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* Announces the in-flight state to a screen reader. The sent and error
          states carry their own roles, so this only covers "sending". */}
      <div aria-live="polite" role="status" className="sr-only">
        {sending ? "Sending your message" : ""}
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

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={sending}
        icon={sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
      >
        {sending ? "Sending..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
