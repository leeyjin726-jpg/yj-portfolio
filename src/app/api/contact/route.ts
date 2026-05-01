import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body: {
    name?: string;
    email?: string;
    message?: string;
    type?: string;
    website?: string; // honeypot field
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, message, type, website } = body;

  // Honeypot check: bots fill hidden fields, humans leave them empty
  if (website) {
    return NextResponse.json({ success: true }); // silently succeed to fool bots
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.CONTACT_EMAIL ?? process.env.RESEND_FROM_EMAIL ?? "hello@example.com";

  try {
    await resend.emails.send({
      from: `TTIYONG.ART <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${type ? `[${type}] ` : ""}${name}님의 문의`,
      text: `이름: ${name}\n이메일: ${email}\n문의유형: ${type ?? "기타"}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
