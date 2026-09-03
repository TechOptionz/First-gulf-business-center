// Server-only mail transport. Importing this from a client component is a
// build error, which is what keeps RESEND_API_KEY off the browser bundle.
import "server-only";
import { Resend } from "resend";

/**
 * Built lazily and cached. Constructing at module scope would make a missing
 * key crash the build rather than surface as a 500 on the one route that
 * needs it.
 */
let client: Resend | null = null;

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

/** Which mailbox a message goes out from. */
export type SenderKey = "enquiries" | "bookings";

/**
 * The visible sender. Must sit on the domain verified in Resend, otherwise
 * every send is rejected. Read per call rather than at module scope so the
 * environment is always the one the request sees.
 */
function resolveFrom(sender: SenderKey): string {
  if (sender === "bookings") {
    return (
      process.env.RESEND_BOOKING_FROM_EMAIL ??
      "First Gulf Business Center <bookings@firstgulfbusiness.ae>"
    );
  }
  return (
    process.env.RESEND_FROM_EMAIL ??
    "First Gulf Business Center <no-reply@firstgulfbusiness.ae>"
  );
}

export interface EnquiryEmail {
  subject: string;
  /** Rendered mail body. */
  html: string;
  /** Fallback for clients that will not show HTML. */
  text: string;
  /** The visitor's address, so the owner can reply straight from the inbox. */
  replyTo: string;
  /** Defaults to the general enquiries mailbox. */
  from?: SenderKey;
}

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed" };

/**
 * Sends one enquiry. Never throws and never returns provider detail: callers
 * map the reason onto a status code, and the client is told nothing beyond
 * "it failed".
 */
export async function sendEnquiry(email: EnquiryEmail): Promise<SendResult> {
  const resend = getClient();
  const to = process.env.CONTACT_TO_EMAIL;

  if (!resend || !to) {
    // Logged server-side only. Names the missing variable without printing
    // any value.
    console.error(
      "[email] Not configured. Missing:",
      [!resend && "RESEND_API_KEY", !to && "CONTACT_TO_EMAIL"]
        .filter(Boolean)
        .join(", ")
    );
    return { ok: false, reason: "not_configured" };
  }

  try {
    const { error } = await resend.emails.send({
      from: resolveFrom(email.from ?? "enquiries"),
      to,
      replyTo: email.replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });

    if (error) {
      console.error("[email] Resend rejected the send:", error);
      return { ok: false, reason: "send_failed" };
    }

    return { ok: true };
  } catch (cause) {
    console.error("[email] Transport threw:", cause);
    return { ok: false, reason: "send_failed" };
  }
}
