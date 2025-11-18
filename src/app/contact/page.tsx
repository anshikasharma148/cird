"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, User, MapPin, Sparkles, ArrowRight, Send } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Check if WebGL is available
function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}

// Error boundary implementation for WebGL errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 3D Animated Contact Icons
function ContactIcon3D({ position, color, icon }: { position: [number, number, number]; color: string; icon: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[0.5, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.2}
          speed={1}
          roughness={0}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  const particleCount = 1500;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#60a5fa" opacity={0.6} transparent />
    </points>
  );
}

function Contact3DBackground() {
  const [webGLAvailable, setWebGLAvailable] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setWebGLAvailable(isWebGLAvailable());
  }, []);

  // Fallback when WebGL is not available
  const fallbackBackground = (
    <div className="absolute inset-0 -z-10 opacity-30">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-900/50 to-indigo-950/50"></div>
    </div>
  );

  if (!webGLAvailable || hasError) {
    return fallbackBackground;
  }

  return (
    <ErrorBoundary
      fallback={fallbackBackground}
      onError={() => setHasError(true)}
    >
      <div className="absolute inset-0 -z-10 opacity-30">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 75 }}
          gl={{ 
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false
          }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
          <ContactIcon3D position={[-2, 2, 0]} color="#3b82f6" icon="mail" />
          <ContactIcon3D position={[2, 2, 0]} color="#06b6d4" icon="user" />
          <ParticleField />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden">
        {/* 3D Background */}
        <Contact3DBackground />

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-950/80 via-blue-900/80 to-indigo-950/80 backdrop-blur-sm relative overflow-hidden">
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          <div className="container mx-auto px-8 md:px-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-2 mb-6"
              >
                <Sparkles className="w-5 h-5 text-blue-400" />
                <Badge className="bg-blue-600/90 backdrop-blur-md text-white border border-blue-400/50 px-6 py-2 shadow-lg shadow-blue-900/50">
                  Get in Touch
                </Badge>
                <Sparkles className="w-5 h-5 text-blue-400" />
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Contact <span className="text-white">Us</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Have questions or want to collaborate? Reach out to us through the contact information below.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* General Support Email */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="perspective-1000"
              >
                <Card className="bg-white/95 backdrop-blur-xl border-2 border-blue-200/50 shadow-2xl shadow-blue-900/30 h-full relative overflow-hidden group hover:border-blue-400 transition-all duration-300">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardHeader className="relative z-10">
                    <motion.div
                      className="flex items-center gap-3 mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all duration-300">
                        <Mail className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-slate-900 font-bold">General Support</CardTitle>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-slate-600 mb-6 text-lg">For general inquiries and support</p>
                    <motion.a
                      href="mailto:support@cird.co.in"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg break-all group/link transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      support@cird.co.in
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </motion.a>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Coordinator Email */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="perspective-1000"
              >
                <Card className="bg-white/95 backdrop-blur-xl border-2 border-cyan-200/50 shadow-2xl shadow-cyan-900/30 h-full relative overflow-hidden group hover:border-cyan-400 transition-all duration-300">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardHeader className="relative z-10">
                    <motion.div
                      className="flex items-center gap-3 mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-500/50 transition-all duration-300">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-slate-900 font-bold">Coordinator</CardTitle>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <motion.a
                      href="mailto:coordinator@cird.co.in"
                      className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold text-lg break-all group/link transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      coordinator@cird.co.in
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </motion.a>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <ContactForm />
            </motion.div>

            {/* Location Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="bg-gradient-to-br from-white/10 via-blue-500/10 to-indigo-500/10 backdrop-blur-xl border-2 border-blue-400/30 shadow-2xl shadow-blue-900/30 relative overflow-hidden group">
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <CardContent className="pt-8 pb-8 relative z-10">
                  <motion.div
                    className="flex items-center justify-center gap-3 mb-6"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="p-3 rounded-xl bg-blue-500/20 backdrop-blur-sm">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Location</h3>
                  </motion.div>
                  <p className="text-gray-200 text-lg leading-relaxed">
                    Centre for Industrial Research and Development (CIRD)
                    <br />
                    <span className="text-blue-200">Jaypee University of Engineering and Technology (JUET)</span>
                    <br />
                    Guna, Madhya Pradesh, India
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
  );
}

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }
  
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
  
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <Card className="bg-white/95 backdrop-blur-xl border-2 border-blue-200/50 shadow-2xl shadow-blue-900/30 relative overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
            <Send className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-3xl text-slate-900 font-bold">Send us a Message</CardTitle>
        </div>
        <p className="text-slate-600 text-lg">Fill out the form below and we'll get back to you as soon as possible.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-slate-700 font-semibold block">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="bg-white border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-slate-700 font-semibold block">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-white border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="subject" className="text-slate-700 font-semibold block">
              Subject <span className="text-red-500">*</span>
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              className="bg-white border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              placeholder="What is this regarding?"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-slate-700 font-semibold block">
              Message <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="bg-white border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
              placeholder="Tell us more about your inquiry..."
            />
          </div>
          
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 border-2 border-green-200 rounded-lg text-green-800"
            >
              ✓ Message sent successfully! We'll get back to you soon.
            </motion.div>
          )}
          
          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-800"
            >
              ✗ {errorMessage}
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Send Message
                <Send className="w-5 h-5" />
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
