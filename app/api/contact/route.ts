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
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
} from "@/lib/validation";

// Only POST is exported, so every other method gets a 405 from the router.
export async function POST(request: Request) {
  const body = await readJsonBody(request);
  if (!body) {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Answer exactly like a success so the bot has nothing to learn from,
  // but send nothing.
  if (isBot(body)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = field(body, "name");
  const email = field(body, "email");
  const phone = field(body, "phone");
  const service = field(body, "service");
  const message = field(body, "message");

  // The same validators the form uses, re-run here: client-side checks are a
  // convenience, and anything can POST this route directly.
  const errors: Record<string, string> = {};
  for (const [key, error] of Object.entries({
    name: validateName(name),
    email: validateEmail(email),
    phone: validatePhone(phone),
    message: validateMessage(message),
  })) {
    if (error) errors[key] = error;
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fields: errors },
      { status: 400 }
    );
  }

  const doc: EnquiryDoc = {
    heading: "New Website Enquiry",
    subheading: `${name} sent an enquiry through the contact form.`,
    sections: [
      {
        kind: "rows",
        title: "Contact Details",
        rows: [
          ["Name", name],
          ["Email", email],
          ["Phone", phone],
          ["Interested in", service || "Not specified"],
        ],
      },
      { kind: "text", title: "Message", body: message },
    ],
    footer: [
      `Submitted ${dubaiTimestamp()} (Dubai time).`,
      `Reply to this email to respond to ${name} directly.`,
      "Sent from the contact form at firstgulfbusiness.ae",
    ],
  };

  const result = await sendEnquiry({
    subject: `Website enquiry from ${name}${service ? ` — ${service}` : ""}`,
    html: renderHtml(doc),
    text: renderText(doc),
    replyTo: email,
  });

  if (!result.ok) {
    // The reason is deliberately not returned: the client gets a generic
    // failure and the detail stays in the server log.
    return NextResponse.json(
      { error: "We could not send your message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
