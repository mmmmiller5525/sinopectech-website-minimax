// 询盘邮件通知
import { Resend } from "resend";

export type InquiryEmailPayload = {
  name?: string; company?: string; email: string; phone?: string; product?: string; message: string;
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderEmail(p: InquiryEmailPayload): string {
  const rows = [
    ["Name", p.name], ["Company", p.company], ["Email", p.email],
    ["Phone / WhatsApp", p.phone], ["Product of Interest", p.product], ["Message", p.message],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:8px 12px;background:#fdf6f0;color:#9c3d14;font-weight:600;border:1px solid #fae8d8">${k}</td><td style="padding:8px 12px;border:1px solid #fae8d8">${escapeHtml(String(v))}</td></tr>`)
    .join("");
  return `<div style="font-family:Inter,system-ui,sans-serif;max-width:640px;margin:0 auto"><h2 style="color:#9c3d14;margin:0 0 16px">新询盘 / New Inquiry</h2><p style="color:#6b6259;margin:0 0 16px">Sinopectech 网站收到一条新询盘：</p><table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table><p style="color:#6b6259;font-size:12px;margin-top:24px">Sent from sinopectechlimited.com · ${new Date().toISOString()}</p></div>`;
}

export async function sendInquiryEmail(payload: InquiryEmailPayload): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFY_TO || "cherryshi2012@126.com";
  const from = process.env.INQUIRY_FROM || "Sinopec Website <noreply@resend.dev>";
  console.log("[email-debug] apiKey=", apiKey ? "set" : "MISSING", "to=", to, "from=", from);
  if (!apiKey) { console.warn("[email] RESEND_API_KEY not set, skip"); return { ok: true }; }
  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({ from, to, replyTo: payload.email, subject: `[Inquiry] ${payload.name || "Anonymous"} — ${payload.product || "General"}`, html: renderEmail(payload) });
    console.log("[email-debug] resend result:", JSON.stringify(result));
    if (result.error) return { ok: false, error: result.error.message };
    return { ok: true, error: `id=${result.data?.id}` };
  } catch (e: any) { console.error("[email] threw:", e); return { ok: false, error: e?.message || "send failed" }; }
}
