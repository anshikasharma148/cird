"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Microscope, Cpu, Brain, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
      </div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-20 left-10 text-cyan-400"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Microscope size={40} />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-16 text-purple-400"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        <Cpu size={35} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 left-20 text-green-400"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
      >
        <Brain size={45} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-10 text-yellow-400"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        <Zap size={30} />
      </motion.div>

      <div className="relative z-10 text-center px-8 md:px-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 px-6 py-2 text-sm font-medium">
            Advanced Research & Development
          </Badge>
        </motion.div>

        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Centre for Industrial Research and Development
        </motion.h1>

        <motion.h2
          className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 text-cyan-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="block sm:inline">Industry–Academia Interface</span>
          <span className="block sm:inline sm:ml-2">| Jaypee Universities at Jaypee University of Engineering and Technology (JUET), Guna</span>
        </motion.h2>
        
        <motion.div
          className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-lg font-semibold text-white text-center">
            MoU Signed Between JUET and JPVL
          </p>
          <p className="text-sm text-gray-300 text-center mt-1">
            Technical Professional Consultancy Projects under the MoU
          </p>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-6 max-w-5xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Facilitating research translation, technology development, intellectual property (IPR) management, 
          R&D collaboration, technology transfer and commercialization, and mentoring.
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
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
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explore Research
            <ArrowRight className="ml-2" size={20} />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
          >
            View Projects
          </Button>
        </motion.div>

        {/* Research Stats */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">15+</div>
            <div className="text-sm text-gray-400">Research Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">5</div>
            <div className="text-sm text-gray-400">Patents Filed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
            <div className="text-sm text-gray-400">Publications</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">3</div>
            <div className="text-sm text-gray-400">Research Centers</div>
          </div>
        </motion.div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
    </section>
  );
}
