// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

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
        {
          role: "system",
          content: `
🧩 Centre for Industrial Research and Development (CIRD)
Jaypee University of Engineering and Technology (JUET), Guna

🏛️ About CIRD
The Centre for Industrial Research and Development (CIRD) is an Industry–Academia interface established by the Jaypee Universities at Jaypee University of Engineering and Technology (JUET), Guna.
It aims to facilitate research translation, support technology development, manage Intellectual Property Rights (IPR), enable R&D collaboration and technology transfer, promote commercialization and mentorship programs.

🚀 Innovation & Entrepreneurship
CIRD has adopted several programs to enrich the entrepreneurial ecosystem and support technology commercialization at JUET.

🤝 R&D Partnership
CIRD executes projects that focus on the core technologies and aim at developing proprietary knowledge in processes, products, software, designs, and specific/generic algorithms.

🎯 Aim
“CIRD aims to serve as an effective interface between academia and industry to foster, promote, and sustain the commercialization of science and technology for mutual growth and societal benefit.”

🌍 Mission
“To be a dynamic interface with industry, fostering innovation, research collaboration, and sustainable commercialization of science and technology for mutual benefit.”
Through this mission, CIRD facilitates knowledge transfer, innovation-driven entrepreneurship, and linkages with industry, government, and community.

📘 Brief Overview
CIRD was established at JUET, Guna, to enhance the University’s engagement with industry and promote collaborative R&D.
It was conceived under the leadership of the University’s management as a catalyst to bridge the gap between academic research and industrial application.
CIRD now operates as a vital center for consultancy projects, joint R&D programs, technology development, and innovation ecosystem enrichment.
It significantly contributes to JUET’s mission of societal and industrial advancement.

👥 Coordination Committee
Coordinator & Incharge: Dr. Dhananjay R. Mishra
Members: Dr. Pankaj Dumka, Dr. Gaurav Saxena, Dr. Amit Kumar Srivastava, Dr. Dharmendra Kumar Shukla

🧑‍💻 Team Members (CDC)
Dr. Amit Kumar Srivastava, Er. Anshika Sharma, Er. Nitesh Pandey, Er. Saswat Shukla

🧪 Mechanical Testing Lab
Dr. Dharmendra Kumar Shukla, R.S. Chauhan, K.K. Purohit, Bhanu Pratap Arya

🧩 Completed Projects (Gist)
BA01/PP/A — Climate Control Methodology, Bottom Ash (BA) Utilization in Mortar & Concrete
JUET: Dr. D.K. Shukla, Dr. Dhananjay R. Mishra
Industry: Sh. Nadeem Ahmed, Sh. Ishtiaque Ahmed (JPVL)

BA02/PP/A — Reduction in Cycle and Non-Cycle Water Consumption
JUET: Dr. Pankaj Dumka, Dr. Manoj Dubey, Dr. Dhananjay R. Mishra
Industry: Shri H.S. Saini, Shri Ashok Kumar Singh

BA03/PP/A — DCS Upgradation
JUET: Dr. Dhananjay R. Mishra, Dr. Amit Kumar Srivastava, Dr. Gaurav Saxena
Industry: Shri Rakesh K. Singh, Shri Navin Tinguria, Balachandran M.

BA05/PP/A — Early Warning System
JUET: Dr. Neeraj Jain, Dr. Vivek Kumar Singh, Dr. Dhananjay R. Mishra
Industry: Sh. Amit Jauhari (HQ), Sh. V.K. Sharma

🔧 Ongoing Projects
BA01/PP/B — Utilization of Bottom Ash in Concrete and Mortar
BA01/PP/C — Utilization of Bottom Ash in Pavers and Bricks
BA03/PP/B — Monitoring & Control System for Coal Handling Plant
BA06/PP/A — Conversion of JBTPP Sub-Critical to Supercritical Unit
BA08/PP/A — SF-6 Gas Monitoring System (GIS)
BA04/PP/A — Conditional Monitoring Technologies
BA07/PP/A — Early Warning Systems (EWS)
BA07/PP/B — Automatic Weather Station (AWS)
BA07/PP/C — Automatic Public Warning System (APWS)
BA09/PP/A — Automatic Reservoir Monitoring and Control System (ARMAC) – VHPHEP
BA09/PP/B — Automatic Reservoir Monitoring and Control System (ARMAC) – Bina
All ongoing projects led by Dr. Dhananjay R. Mishra and Dr. Amit Kumar Srivastava with industry officers: Sh. Amit Jauhari, Sh. V.S. Yadav.

🧾 Grants Received (Patents from IP India)
Granted Patents:
1. Lateral Force Resistance Interlocking Brick (420914-001)
2. Seismic-Resistant Interlocking Brick (420909-001)
3. Rail-Guided Inspection Robot (420930-001)
4. Master Troughing Idler with Vertical Hydraulic Drive Without Support Idler (420974-001)
5. Inspection Robot (420905-001)
6. Monumental Block With Perforations (420913-001)
7. Master Troughing Idler with Parallel Hydraulic Drive (420940-001)
8. Master Troughing Idler with Bottom Mechanical Drive (420961-001)
9. Interlocking Brick (420892-001)
10. Brick (420908-001)
11. Paver Blocks for Monuments (420912-001)
12. Brick with Rectangular Locking System (420907-001)
13. Buildings Grade Paver Block (420906-001)
14. Buildings Block (420911-001)
15. Interlocking Block (420915-001)
Applications under review: several designs & patents pending at IP India.

🧩 Extracted Note (JPVL/JUs/Note/10, dated 12-01-2024)
Purpose: Approval of revised JUET team members associated with JPVL projects.
Highlights:
- Team reconstitution done during quarterly review to accelerate progress.
- Updated listings match ongoing project references (BA01–BA06).

⚙️ When answering questions:
- Only use this verified CIRD data.
- If asked something beyond this context, respond politely that you can only provide information about CIRD, JUET Guna, its projects, patents, team, or mission.
- Always reply formally and concisely.
- Do not make up new facts or external data.
`,
        },
        ...(context ? [{ role: "system", content: context }] : []),
        { role: "user", content: question },
      ],
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
 * /health — Simple uptime route for monitoring
 */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "CIRD backend is alive ✅" });
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
