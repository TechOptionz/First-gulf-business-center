// Shared request handling for the enquiry routes: safe body reading, the
// honeypot check, and the notification mail layout.
//
// An enquiry is described once as an EnquiryDoc and rendered twice: as HTML
// for the inbox, and as plain text for the fallback. Gmail sets plain text in
// a proportional font, so column alignment only survives in the HTML part --
// the text part is kept simple rather than pretending to be a table.
import "server-only";

/** A field the client sent. Anything not a string collapses to "". */
export function field(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

/** Reads a JSON body, returning null on malformed input rather than throwing. */
export async function readJsonBody(
  request: Request
): Promise<Record<string, unknown> | null> {
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * The honeypot is hidden from people but not from bots. Anything in it means
 * the submission is automated, so the caller answers 200 and sends nothing --
 * a bot told it failed just tries again.
 */
export const HONEYPOT_FIELD = "website";

export function isBot(body: Record<string, unknown>): boolean {
  return field(body, HONEYPOT_FIELD).length > 0;
}

/** Submission time in the reader's own timezone, not the server's. */
export function dubaiTimestamp(): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Dubai",
  }).format(new Date());
}

// --- Document model --------------------------------------------------------

export type Row = [label: string, value: string];

export type Section =
  | { kind: "rows"; title: string; rows: Row[] }
  | { kind: "text"; title: string; body: string };

export interface EnquiryDoc {
  /** Coloured banner line at the top of the HTML mail. */
  heading: string;
  /** One line under the heading, e.g. who it is from. */
  subheading: string;
  sections: Section[];
  /** Small print under the rule at the bottom. */
  footer: string[];
}

/** Drops empty rows and whole sections that end up with nothing in them. */
function liveSections(doc: EnquiryDoc): Section[] {
  return doc.sections
    .map((section) =>
      section.kind === "rows"
        ? { ...section, rows: section.rows.filter(([, v]) => v.trim().length > 0) }
        : section
    )
    .filter((section) =>
      section.kind === "rows" ? section.rows.length > 0 : section.body.trim().length > 0
    );
}

// --- Plain-text rendering --------------------------------------------------

/**
 * The fallback part. No padded columns: a proportional font would turn them
 * into ragged whitespace, so each field simply gets its own line.
 */
export function renderText(doc: EnquiryDoc): string {
  const parts: string[] = [doc.heading, "=".repeat(doc.heading.length), "", doc.subheading];

  for (const section of liveSections(doc)) {
    parts.push("", `-- ${section.title} --`);
    if (section.kind === "rows") {
      for (const [label, value] of section.rows) parts.push(`${label}: ${value}`);
    } else {
      parts.push(section.body);
    }
  }

  parts.push("", "-".repeat(48), ...doc.footer);
  return parts.join("\n");
}

// --- HTML rendering --------------------------------------------------------

const BRAND = {
  maroon: "#6B1124",
  maroonDark: "#4A0012",
  brass: "#C5A880",
  cream: "#FAF8F5",
  creamLine: "#E8E2D8",
  ink: "#1C1917",
  muted: "#5D5D5D",
};

/** Escapes text for HTML. Every value in the mail is visitor-supplied. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Turns a visitor's newlines into <br>, after escaping. */
function escMultiline(value: string): string {
  return esc(value).replace(/\r?\n/g, "<br>");
}

/**
 * Table-based layout with inline styles: the only thing that renders
 * consistently across Gmail, Outlook and Apple Mail.
 */
export function renderHtml(doc: EnquiryDoc): string {
  const sections = liveSections(doc)
    .map((section) => {
      const heading = `
        <tr><td style="padding:26px 32px 8px 32px;">
          <div style="font:700 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:1.4px;text-transform:uppercase;color:${BRAND.maroon};">${esc(section.title)}</div>
          <div style="height:2px;width:28px;background:${BRAND.brass};margin-top:7px;"></div>
        </td></tr>`;

      if (section.kind === "text") {
        return `${heading}
        <tr><td style="padding:6px 32px 0 32px;">
          <div style="font:400 15px/1.65 Arial,Helvetica,sans-serif;color:${BRAND.ink};background:${BRAND.cream};border:1px solid ${BRAND.creamLine};border-radius:3px;padding:14px 16px;">${escMultiline(section.body)}</div>
        </td></tr>`;
      }

      // Two columns: a fixed label gutter and the value. Stays readable at
      // phone widths because the label column is narrow and wraps.
      const rows = section.rows
        .map(
          ([label, value]) => `
          <tr>
            <td style="padding:7px 14px 7px 0;font:700 13px/1.5 Arial,Helvetica,sans-serif;color:${BRAND.muted};white-space:nowrap;vertical-align:top;">${esc(label)}</td>
            <td style="padding:7px 0;font:400 15px/1.5 Arial,Helvetica,sans-serif;color:${BRAND.ink};vertical-align:top;">${escMultiline(value)}</td>
          </tr>`
        )
        .join("");

      return `${heading}
        <tr><td style="padding:2px 32px 0 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${rows}</table>
        </td></tr>`;
    })
    .join("");

  const footer = doc.footer
    .map(
      (line) =>
        `<div style="font:400 12px/1.7 Arial,Helvetica,sans-serif;color:${BRAND.muted};">${esc(line)}</div>`
    )
    .join("");

  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(doc.heading)}</title></head>
<body style="margin:0;padding:0;background:#EFEBE6;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(doc.subheading)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#EFEBE6;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:#FFFFFF;border:1px solid ${BRAND.creamLine};border-radius:4px;overflow:hidden;">

        <tr><td style="background:${BRAND.maroonDark};padding:22px 32px;">
          <div style="font:700 17px/1.3 Georgia,'Times New Roman',serif;color:#FFFFFF;">First Gulf Business Center</div>
          <div style="font:400 12px/1.5 Arial,Helvetica,sans-serif;color:${BRAND.brass};letter-spacing:0.6px;margin-top:3px;">${esc(doc.heading)}</div>
        </td></tr>

        <tr><td style="height:3px;background:${BRAND.brass};font-size:0;line-height:0;">&nbsp;</td></tr>

        <tr><td style="padding:24px 32px 0 32px;">
          <div style="font:400 15px/1.6 Arial,Helvetica,sans-serif;color:${BRAND.ink};">${esc(doc.subheading)}</div>
        </td></tr>
${sections}
        <tr><td style="padding:26px 32px 28px 32px;">
          <div style="border-top:1px solid ${BRAND.creamLine};padding-top:14px;">${footer}</div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}
