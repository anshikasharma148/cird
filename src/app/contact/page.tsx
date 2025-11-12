"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User, MapPin, Sparkles, ArrowRight } from "lucide-react";
import PageLoader from "@/components/page-loader";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

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
  return (
    <div className="absolute inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <ContactIcon3D position={[-3, 2, 0]} color="#3b82f6" icon="mail" />
        <ContactIcon3D position={[0, -2, 0]} color="#8b5cf6" icon="phone" />
        <ContactIcon3D position={[3, 2, 0]} color="#06b6d4" icon="user" />
        <ParticleField />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageLoader pageType="contact" />
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
            <div className="grid md:grid-cols-3 gap-8 mb-16">
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

              {/* Phone - Dr. Dhananjay */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="perspective-1000"
              >
                <Card className="bg-gradient-to-br from-purple-50/95 to-blue-50/95 backdrop-blur-xl border-2 border-purple-200/50 shadow-2xl shadow-purple-900/30 h-full relative overflow-hidden group hover:border-purple-400 transition-all duration-300">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Special badge for Coordinator */}
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-3 py-1 shadow-lg">
                      Coordinator
                    </Badge>
                  </div>

                  <CardHeader className="relative z-10">
                    <motion.div
                      className="flex items-center gap-3 mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300">
                        <Phone className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-slate-900 font-bold">Phone</CardTitle>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-slate-600 mb-2 text-lg font-semibold">
                      Dr. Dhananjay R. Mishra
                    </p>
                    <p className="text-slate-500 mb-4 text-sm">
                      Coordinator & Incharge of CDC
                    </p>
                    <motion.a
                      href="tel:+919893808251"
                      className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold text-xl transition-colors group/link"
                      whileHover={{ x: 5 }}
                    >
                      +91 9893808251
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
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
                    <p className="text-slate-600 mb-2 text-lg font-semibold">
                      Dr. Dhananjay R. Mishra
                    </p>
                    <p className="text-slate-500 mb-6 text-sm">
                      Coordinator & Incharge of CDC
                    </p>
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
    </>
  );
}
