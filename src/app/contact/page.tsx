"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, Loader2, MapPin } from "lucide-react";
import Image from "next/image";

const inputBase =
  "w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#1A237E] placeholder-slate-400 outline-none focus:border-[#1A237E] focus:ring-2 focus:ring-[#1A237E]/20 transition-all duration-200";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");

      setMsg("Message sent successfully!");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: unknown) {
      setMsg("Error: " + (err instanceof Error ? err.message : "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = msg && !msg.startsWith("Error:");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero - CIRD theme, Contact #263238 (dark grey) */}
      <section className="pt-36 sm:pt-40 pb-14 sm:pb-16 bg-[#263238] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-60" />
        <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block mb-6 bg-[#FF9800] text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Contact <span className="text-[#FF9800]">Us</span>
            </h1>
            <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto">
              We're here to help. Reach out for queries, collaborations, or feedback.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16">
        {/* Contact emails + Form in two columns on large screens */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {/* Left: Contact info + quick emails */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="bg-slate-50 border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-1 w-full bg-[#1A237E]" />
              <CardHeader>
                <CardTitle className="text-lg text-[#1A237E] flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#FF9800]" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a
                  href="mailto:support@cird.co.in"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-[#1A237E]/30 hover:shadow-sm transition-all group"
                >
                  <span className="p-2 rounded-lg bg-[#1A237E] text-white group-hover:bg-[#FF9800] transition-colors">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#37474F] uppercase tracking-wide">Support</p>
                    <p className="text-[#1A237E] font-medium truncate">support@cird.co.in</p>
                  </div>
                </a>
                <a
                  href="mailto:coordinator@cird.co.in"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-[#1A237E]/30 hover:shadow-sm transition-all group"
                >
                  <span className="p-2 rounded-lg bg-[#1A237E] text-white group-hover:bg-[#FF9800] transition-colors">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#37474F] uppercase tracking-wide">Coordinator</p>
                    <p className="text-[#1A237E] font-medium truncate">coordinator@cird.co.in</p>
                  </div>
                </a>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-1 w-full bg-[#FF9800]" />
              <CardHeader>
                <CardTitle className="text-lg text-[#1A237E] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#FF9800]" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#37474F] text-sm leading-relaxed">
                  Jaypee University of Engineering and Technology (JUET), Guna, Madhya Pradesh
                </p>
              </CardContent>
            </Card>
          </motion.aside>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="bg-white border border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <CardTitle className="text-xl text-[#1A237E] flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-[#1A237E] text-white">
                    <MessageSquare className="w-5 h-5" />
                  </span>
                  Send a Message
                </CardTitle>
                <p className="text-[#37474F] text-sm mt-1">
                  Fill out the form and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-[#1A237E]">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-[#1A237E]">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputBase}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-[#1A237E]">
                      Phone <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-[#1A237E]">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-[#1A237E]">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Your message..."
                      className={`${inputBase} resize-none`}
                    />
                  </div>

                  {msg && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
                        isSuccess
                          ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                          : "bg-red-50 border border-red-200 text-red-800"
                      }`}
                    >
                      {isSuccess ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                      <span>{msg}</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#FF9800] hover:bg-[#F57C00] disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Map */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-16 max-w-6xl mx-auto"
        >
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-[#1A237E] text-white">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-[#1A237E]">Our Location</h2>
                  <p className="text-sm text-[#37474F]">JUET, Guna</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                JUET Campus
              </span>
            </div>
            <div className="w-full h-[420px] sm:h-[480px] relative bg-slate-100">
              <Image
                src="/assets/contact/juet-location.png"
                alt="Jaypee University of Engineering and Technology, JUET Guna - Campus location"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1024px"
                priority={false}
              />
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
