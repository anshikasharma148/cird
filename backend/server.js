// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import nodemailer from "nodemailer";
import { cirdSystemPrompt } from "./data/cirdSystemPrompt.js"; // ✅ Imported system data

dotenv.config();

const app = express();

// ✅ Configure CORS for both development and production
app.use(
  cors({
    origin: [
      "http://localhost:3001",   // Local development
      "https://cird.co.in",      // Main domain
      "https://www.cird.co.in",  // www subdomain
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// ✅ Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("🔑 OpenAI API Key Loaded:", !!process.env.OPENAI_API_KEY);
console.log("🌍 Environment PORT:", process.env.PORT);

/**
 * /api/chat — Streams ChatGPT responses
 */
app.post("/api/chat", async (req, res) => {
  try {
    const { question, context } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Missing 'question' field in request body." });
    }

    // 🧠 Configure server-sent events (SSE) headers for live streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders(); // Ensures streaming starts immediately

    // 🧩 Chat completion with streaming enabled
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      messages: [
        { role: "system", content: cirdSystemPrompt }, // ✅ Using imported CIRD data
        ...(context ? [{ role: "system", content: context }] : []),
        { role: "user", content: question },
      ],
      max_tokens: 200, // Limit response length to ensure concise answers (5-6 lines)
    });

    // Stream each token as it comes in
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content;
      if (text) res.write(`data: ${text}\n\n`);
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("❌ Error in /api/chat:", err);
    res.status(500).json({
      error: err.message,
      details: err.response?.data || "Unknown error in /api/chat",
    });
  }
});

/**
 * /api/embed — Generate text embeddings for semantic FAQ search
 */
app.post("/api/embed", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: "Missing 'text' field in request body." });

    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    res.json({ embedding: embedding.data[0].embedding });
  } catch (err) {
    console.error("❌ Embedding Error:", err);
    res.status(500).json({
      error: err.message,
      details: err.response?.data || "Unknown error in /api/embed",
    });
  }
});
/**
 * /api/contact — Send contact form email (Enhanced Styled Email)
 */
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: "Name, email, subject, and message are required.",
      });
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Premium Styled Email Template
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; background:#f4f6fa; padding:30px;">
        <div style="
          max-width:600px;
          margin:auto;
          background:white;
          border-radius:12px;
          padding:30px;
          box-shadow:0 4px 20px rgba(0,0,0,0.08);
        ">
          
          <!-- Header -->
          <div style="text-align:center; margin-bottom:30px;">
            <h1 style="
              margin:0;
              font-size:26px;
              background: linear-gradient(90deg, #2563eb, #4f46e5);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            ">
              📩 New Contact Form Submission
            </h1>
            <p style="color:#6b7280; font-size:15px; margin-top:8px;">
              A new message has been received from the CIRD website.
            </p>
          </div>

          <!-- User Info Card -->
          <div style="
            background:#f0f4ff;
            padding:20px;
            border-radius:10px;
            border-left:4px solid #2563eb;
            margin-bottom:25px;
          ">
            <p style="margin:8px 0;"><b>Name:</b> ${name}</p>
            <p style="margin:8px 0;"><b>Email:</b> ${email}</p>
            ${phone ? `<p style="margin:8px 0;"><b>Phone:</b> ${phone}</p>` : ""}
            <p style="margin:8px 0;"><b>Subject:</b> ${subject}</p>
          </div>

          <!-- Message Box -->
          <div style="
            background:white;
            border-radius:10px;
            border:1px solid #e5e7eb;
            padding:20px;
          ">
            <h3 style="
              margin-top:0;
              color:#1e3a8a;
              font-size:18px;
            ">Message:</h3>

            <p style="line-height:1.7; font-size:15px; white-space:pre-line;">
              ${message}
            </p>
          </div>

          <hr style="margin:30px 0; border:none; border-top:1px solid #e5e7eb;" />

          <!-- Footer -->
          <div style="text-align:center; color:#6b7280; font-size:14px;">
            <p>This message was sent via the <b>CIRD Website Contact Form</b>.</p>
          </div>

        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: `"CIRD Website Contact" <support@cird.co.in>`,
      to: "support@cird.co.in",
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: emailHTML,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });

  } catch (err) {
    return res.status(500).json({
      error: "Failed to send message",
      details: err.message,
    });
  }
});

/**
 * /health — Simple uptime route for monitoring
 */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "CIRD backend is alive ✅" });
});

/**
 * 404 handler for undefined routes - return JSON instead of HTML
 */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method,
  });
});

/**
 * Global error handler - ensure all errors return JSON
 */
app.use((err, req, res, next) => {
  console.error("❌ Global error handler:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

/**
 * 🚀 Start the Server
 * Render automatically injects its own PORT (usually 10000)
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ CIRD AI backend running on http://localhost:${PORT}`);
});

/* ------------------------------------------------------------------
   🟢 KEEP-ALIVE SELF-PING (prevents Render from sleeping)
------------------------------------------------------------------- */
if (process.env.RENDER === "true" || process.env.RENDER_EXTERNAL_URL) {
  const axios = await import("axios");
  const url =
    process.env.RENDER_EXTERNAL_URL || "https://cird.onrender.com";

  console.log("🔁 Keep-alive ping enabled for:", url);

  // Ping every 5 minutes to keep backend awake
  setInterval(async () => {
    try {
      await axios.default.get(`${url}/health`);
      console.log("💓 Keep-alive ping sent to", `${url}/health`);
    } catch (err) {
      console.log("⚠️ Keep-alive ping failed:", err.message);
    }
  }, 5 * 60 * 1000);
}
