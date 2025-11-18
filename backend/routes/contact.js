import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CIRD Contact Form" <${process.env.SMTP_USER}>`,
      to: "cird@juetguna.in",
      replyTo: email,
      subject: `New Contact Form: ${subject}`,
      html: `
        <h3>New Inquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b><br>${message}</p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
