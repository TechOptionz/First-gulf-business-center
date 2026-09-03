import { NextResponse } from "next/server";
import { sendEnquiry } from "@/lib/server/email";
import {
  dubaiTimestamp,
  field,
  isBot,
  readJsonBody,
  renderHtml,
  renderText,
  type EnquiryDoc,
} from "@/lib/server/enquiry";
import {
  validateCompany,
  validateEmail,
  validateName,
  validatePhone,
  validateTourDate,
} from "@/lib/validation";

/** Reads a string array, dropping anything that is not a non-empty string. */
function stringList(body: Record<string, unknown>, key: string): string[] {
  const value = body[key];
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

/**
 * "2026-09-08" -> "Tuesday, 8 September 2026". Built from the parts in UTC so
 * the rendered day cannot drift against the server's timezone.
 */
function formatTourDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export async function POST(request: Request) {
  const body = await readJsonBody(request);
  if (!body) {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  if (isBot(body)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = field(body, "name");
  const email = field(body, "email");
  const phone = field(body, "phone");
  const company = field(body, "company");
  const date = field(body, "date");
  const time = field(body, "time");
  const teamSize = field(body, "teamSize");
  const notes = field(body, "notes");
  const services = stringList(body, "services");
  const needEjari = body.needEjari === true;
  const needBusinessSetup = body.needBusinessSetup === true;

  const errors: Record<string, string> = {};
  for (const [key, error] of Object.entries({
    name: validateName(name),
    email: validateEmail(email),
    phone: validatePhone(phone),
    company: validateCompany(company),
    date: validateTourDate(date),
  })) {
    if (error) errors[key] = error;
  }
  if (services.length === 0) {
    errors.service = "Please select at least one workspace or service";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fields: errors },
      { status: 400 }
    );
  }

  const readableDate = formatTourDate(date);

  // Add-ons are listed only when asked for, rather than printing a column
  // of "No" that carries nothing. Rendered as one block so each line keeps a
  // bullet instead of an empty label gutter.
  const addOns = [
    needEjari ? "EJARI / Estidama certificate" : "",
    needBusinessSetup ? "UAE business setup, visa & PRO services" : "",
  ]
    .filter(Boolean)
    .map((label) => `• ${label}`)
    .join("\n");

  const doc: EnquiryDoc = {
    heading: "New Tour Booking Request",
    subheading: `${name} requested a tour on ${readableDate} at ${time}.`,
    sections: [
      {
        kind: "rows",
        title: "Appointment",
        rows: [
          ["Date", readableDate],
          ["Time", time],
          ["Services", services.join("  •  ")],
          ["Team size", teamSize],
        ],
      },
      {
        kind: "rows",
        title: "Visitor",
        rows: [
          ["Name", name],
          ["Email", email],
          ["Phone", phone],
          ["Company", company || "Not provided"],
        ],
      },
      // An empty body drops the whole section.
      { kind: "text", title: "Also Requested", body: addOns },
      { kind: "text", title: "Additional Notes", body: notes },
    ],
    footer: [
      `Submitted ${dubaiTimestamp()} (Dubai time).`,
      `Reply to this email to reach ${name} directly, or call ${phone}.`,
      "Sent from the tour booking form at firstgulfbusiness.ae",
    ],
  };

  const result = await sendEnquiry({
    subject: `Tour booking — ${name}, ${readableDate} at ${time}`,
    html: renderHtml(doc),
    text: renderText(doc),
    replyTo: email,
    // Sends as no-reply@ along with the contact form. A separate bookings@
    // sender is ready in lib/server/email.ts and is the nicer option -- but
    // bookings@ does not exist as a Zoho mailbox (verified: 550 5.1.1 user
    // does not exist), and a From address that bounces raises the spam score
    // on exactly the mail that most needs to arrive. Add `from: "bookings"`
    // here once that mailbox or alias has been created.
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: "We could not submit your booking. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
