"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMsg("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setMsg("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000814] text-white py-20 px-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#001d3d] p-8 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#003566] text-white outline-none"
              placeholder="Your Full Name"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#003566] text-white outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Subject</label>
            <input
              required
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#003566] text-white outline-none"
              placeholder="What is this about?"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Message</label>
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 rounded bg-[#003566] text-white outline-none"
              placeholder="Write your message here..."
            />
          </div>

          {msg && (
            <p className="text-center text-yellow-300 font-semibold">{msg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-semibold"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
