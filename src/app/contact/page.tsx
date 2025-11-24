"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, Loader2, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-slate-800 rounded-lg flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
    </div>
  ),
});

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

        {/* Contact Email Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 flex justify-center"
        >
          <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-white mb-4 text-center">Contact on:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href="mailto:support@cird.co.in"
                className="text-blue-400 hover:text-blue-300 font-semibold text-lg transition-colors duration-200 flex items-center justify-center group/link"
              >
                <Mail className="w-5 h-5 mr-2 group-hover/link:translate-x-1 transition-transform" />
                support@cird.co.in
              </a>
              <a
                href="mailto:coordinator@cird.co.in"
                className="text-blue-400 hover:text-blue-300 font-semibold text-lg transition-colors duration-200 flex items-center justify-center group/link"
              >
                <Mail className="w-5 h-5 mr-2 group-hover/link:translate-x-1 transition-transform" />
                coordinator@cird.co.in
              </a>
            </CardContent>
          </Card>
        </motion.div>

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

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-br from-white/10 via-blue-950/30 to-indigo-950/30 backdrop-blur-md border-2 border-blue-500/30 shadow-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 group">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <CardHeader className="bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 border-b border-white/20 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl text-white flex items-center mb-2">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <MapPin className="w-8 h-8 mr-3 text-blue-400 drop-shadow-lg" />
                    </motion.div>
                    Our Location
                  </CardTitle>
                  <p className="text-gray-200 mt-2 text-lg">
                    Find us at <span className="font-semibold text-blue-300">Jaypee University of Engineering and Technology</span>, Guna
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-200 font-medium">Live Map</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 relative z-10">
              <div className="w-full h-[500px] md:h-[600px] relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <MapComponent />
                </div>
                {/* Decorative corner accents */}
                <div className="absolute top-4 left-4 w-20 h-20 border-t-2 border-l-2 border-blue-400/30 rounded-tl-lg pointer-events-none z-20" />
                <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-indigo-400/30 rounded-tr-lg pointer-events-none z-20" />
                <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-purple-400/30 rounded-bl-lg pointer-events-none z-20" />
                <div className="absolute bottom-4 right-4 w-20 h-20 border-b-2 border-r-2 border-blue-400/30 rounded-br-lg pointer-events-none z-20" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
