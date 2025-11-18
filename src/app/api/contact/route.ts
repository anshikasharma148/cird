import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = escapeHtml(name);
    const sanitizedEmail = escapeHtml(email);
    const sanitizedSubject = escapeHtml(subject);
    const sanitizedMessage = escapeHtml(message);

    // Create transporter (using Gmail SMTP or environment variables)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER || email,
      to: "cird@juetguna.in",
      replyTo: email,
      subject: `Contact Form: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Contact Form Submission</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            <p><strong>Subject:</strong> ${sanitizedSubject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${sanitizedMessage.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${sanitizedName}
        Email: ${sanitizedEmail}
        Subject: ${sanitizedSubject}
        
        Message:
        ${sanitizedMessage}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (err: any) {
    console.error("❌ Error in /api/contact:", err);
    return NextResponse.json(
      {
        error: "Failed to send message. Please try again later.",
        details: process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}

