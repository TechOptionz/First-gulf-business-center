// Shared field validators for the site's forms. Each returns an error
// message or an empty string when the value is valid.

const NAME_PATTERN = /^[\p{L}][\p{L}'’.\- ]*$/u;
// Practical email check: one @, a real domain with a TLD, no spaces.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export function validateName(value: string): string {
  const name = value.trim();
  if (!name) return "Please enter your full name";
  if (name.length < 3) return "Name must be at least 3 characters";
  if (name.length > 60) return "Name must be under 60 characters";
  if (!NAME_PATTERN.test(name))
    return "Name can only contain letters, spaces, hyphens and apostrophes";
  return "";
}

export function validateEmail(value: string): string {
  const email = value.trim();
  if (!email) return "Please enter your email address";
  if (!EMAIL_PATTERN.test(email))
    return "Please enter a valid email address (e.g. name@company.ae)";
  return "";
}

export function validatePhone(value: string): string {
  const phone = value.trim();
  if (!phone) return "Please enter your phone or WhatsApp number";
  // Allow digits with an optional leading +, plus common separators.
  if (!/^\+?[0-9 ()\-.]+$/.test(phone))
    return "Phone number can only contain digits, spaces and + ( ) -";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15)
    return "Please enter a valid phone number (e.g. +971 50 000 0000)";
  return "";
}

export function validateMessage(value: string): string {
  const message = value.trim();
  if (!message) return "Please enter your message";
  if (message.length < 10) return "Message must be at least 10 characters";
  return "";
}

export function validateTourDate(value: string): string {
  if (!value) return "Please select a preferred date";
  const selected = new Date(`${value}T23:59:59`);
  if (Number.isNaN(selected.getTime())) return "Please select a valid date";
  if (selected < new Date()) return "Please choose today or a future date";
  return "";
}

export function validateCompany(value: string): string {
  const company = value.trim();
  if (!company) return ""; // optional field
  if (company.length < 2) return "Company name must be at least 2 characters";
  if (company.length > 80) return "Company name must be under 80 characters";
  return "";
}
