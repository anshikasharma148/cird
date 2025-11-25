"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Microscope, Cpu, Brain, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/home/hero-image.jpg"
          alt="CIRD Hero Background"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        {/* Overlay for better text readability while keeping image visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-900/40 to-indigo-950/50"></div>
      </div>

      {/* Animated Background Elements with Glass Effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        {/* Subtle animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-20 left-10 text-white opacity-30"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Microscope size={40} />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-16 text-white opacity-30"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        <Cpu size={35} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 left-20 text-white opacity-30"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
      >
        <Brain size={45} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-10 text-white opacity-30"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        <Zap size={30} />
      </motion.div>

      <div className="relative z-10 text-center px-8 md:px-16 max-w-6xl mx-auto w-full flex flex-col items-center">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="whitespace-nowrap">Centre for Industrial Research and Development</span>
        </motion.h1>

        <motion.h2
          className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="block sm:inline">Industry–Academia Interface</span>
          <span className="block sm:inline sm:ml-2">| Jaypee Universities at Jaypee University of Engineering and Technology (JUET), Guna</span>
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-white mb-6 max-w-5xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Facilitating research translation, technology development, intellectual property (IPR) management, 
          R&D collaboration, technology transfer and commercialization, and mentoring.
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-white mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <strong className="text-white">Mission:</strong> "To be a dynamic interface with industry, fostering innovation, 
          research collaboration, and sustainable commercialization of science and technology for mutual benefit."
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/research">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl shadow-blue-900/50 transition-all duration-300"
              >
                Explore Research
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/research">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/80 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg shadow-white/10"
              >
                View Projects
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Research Stats */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">15+</div>
            <div className="text-sm text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Research Projects</div>
          </div>
          <Link href="/patents" className="text-center hover:scale-105 transition-transform duration-200 cursor-pointer group">
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] group-hover:text-blue-300 transition-colors">10</div>
            <div className="text-sm text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] group-hover:text-blue-200 transition-colors">Patents Filed</div>
          </Link>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">50+</div>
            <div className="text-sm text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Publications</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">3</div>
            <div className="text-sm text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Research Centers</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
