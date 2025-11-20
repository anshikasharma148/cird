"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

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
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      setMsg("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const emailCards = [
    {
      email: "support@cird.co.in",
      title: "Support",
      description: "For technical support and general inquiries",
      icon: Mail,
      color: "bg-blue-600",
      delay: 0.1,
    },
    {
      email: "coordinator@cird.co.in",
      title: "Coordinator",
      description: "For coordination and administrative matters",
      icon: MessageSquare,
      color: "bg-indigo-600",
      delay: 0.2,
    },
  ];

  const isSuccess = msg && !msg.startsWith("Error:");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 text-white py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        ></motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-white to-indigo-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with us. We're here to help and answer any questions you might have.
          </p>
        </motion.div>

        {/* Email Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {emailCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: card.delay }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer group">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className={`p-4 rounded-2xl ${card.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <card.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-white mb-1">{card.title}</CardTitle>
                      <p className="text-gray-400 text-sm">{card.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <a
                    href={`mailto:${card.email}`}
                    className="text-blue-400 hover:text-blue-300 font-semibold text-lg transition-colors duration-200 flex items-center group/link"
                  >
                    <Mail className="w-5 h-5 mr-2 group-hover/link:translate-x-1 transition-transform" />
                    {card.email}
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-b border-white/10">
              <CardTitle className="text-3xl text-white flex items-center">
                <MessageSquare className="w-8 h-8 mr-3 text-blue-400" />
                Send us a Message
              </CardTitle>
              <p className="text-gray-300 mt-2">Fill out the form below and we'll get back to you as soon as possible.</p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label className="block mb-2 font-semibold text-gray-200">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <label className="block mb-2 font-semibold text-gray-200">
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                </div>

                {/* Phone Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                >
                  <label className="block mb-2 font-semibold text-gray-200">
                    Phone Number <span className="text-gray-400 text-sm">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    placeholder="+91 1234567890"
                  />
                </motion.div>

                {/* Subject Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block mb-2 font-semibold text-gray-200">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    placeholder="What is this about?"
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label className="block mb-2 font-semibold text-gray-200">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 resize-none"
                    placeholder="Write your message here..."
                  />
                </motion.div>

                {/* Message Status */}
                {msg && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-lg flex items-center space-x-3 ${
                      isSuccess
                        ? "bg-green-500/20 border border-green-500/50 text-green-300"
                        : "bg-red-500/20 border border-red-500/50 text-red-300"
                    }`}
                  >
                    {isSuccess ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <p className="font-semibold">{msg}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
