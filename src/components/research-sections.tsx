"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Bot, 
  Cpu, 
  Brain, 
  Microscope, 
  Zap, 
  Target, 
  Award,
  ArrowRight,
  CircuitBoard,
  Database,
  Cog
} from "lucide-react";
import Link from "next/link";

export function AboutSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#e1b382]/30 to-[#e1b382]/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232563eb' fill-opacity='0.02'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-3 sm:mb-4 bg-[#2d545e] text-white border border-[#12343b] px-4 sm:px-6 py-1.5 sm:py-2 shadow-lg text-xs sm:text-sm">
                About CIRD
              </Badge>
            </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-[#2d545e] mb-4 sm:mb-5 lg:mb-6 px-4">
            Centre for Industrial Research and Development
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#2d545e] max-w-4xl mx-auto leading-relaxed px-4">
            An Industry–Academia interface established at Jaypee University of Engineering and Technology (JUET), Guna.
          </p>
        </motion.div>

        <div className="mb-8 sm:mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white backdrop-blur-md rounded-xl p-5 sm:p-6 lg:p-8 border border-[#c89666] shadow-lg"
          >
            <p className="text-sm sm:text-base lg:text-lg text-[#2d545e] leading-relaxed">
              The Centre for Industrial Research and Development (CIRD) is an Industry–Academia interface 
              established by the Jaypee Universities at Jaypee University of Engineering and Technology (JUET), Guna. 
              The centre aims to facilitate research translation, technology development, intellectual property (IPR) management, 
              R&D collaboration, technology transfer and commercialization, and mentoring.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2d545e] mb-4 sm:mb-5 lg:mb-6">Innovation & Entrepreneurship</h3>
            <p className="text-sm sm:text-base lg:text-lg text-[#2d545e] mb-4 sm:mb-5 lg:mb-6 leading-relaxed">
              CIRD has adopted several programs to enrich the entrepreneurial ecosystem and technology 
              commercialization efforts at the Institute.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Badge variant="secondary" className="bg-[#e1b382] text-[#2d545e] border-[#c89666] text-xs sm:text-sm">
                Innovation
              </Badge>
              <Badge variant="secondary" className="bg-[#e1b382] text-[#2d545e] border-[#c89666] text-xs sm:text-sm">
                Entrepreneurship
              </Badge>
              <Badge variant="secondary" className="bg-[#e1b382] text-[#2d545e] border-[#c89666] text-xs sm:text-sm">
                Commercialization
              </Badge>
              <Badge variant="secondary" className="bg-[#e1b382] text-[#2d545e] border-[#c89666] text-xs sm:text-sm">
                Technology Transfer
              </Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white backdrop-blur-md rounded-xl p-5 sm:p-6 lg:p-8 border border-[#c89666] shadow-lg"
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2d545e] mb-4 sm:mb-5 lg:mb-6">R&D Partnership</h3>
            <p className="text-sm sm:text-base lg:text-lg text-[#2d545e] leading-relaxed">
              Projects addressing technologies at the core and aims at the development of proprietary knowledge 
              in a process, product, software, designs, specific/generic algorithm etc.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
              <Badge variant="secondary" className="bg-[#e1b382] text-[#2d545e] border-[#c89666] text-xs sm:text-sm">
                Research
              </Badge>
              <Badge variant="secondary" className="bg-[#e1b382] text-[#2d545e] border-[#c89666] text-xs sm:text-sm">
                Development
              </Badge>
              <Badge variant="secondary" className="bg-[#e1b382] text-[#2d545e] border-[#c89666] text-xs sm:text-sm">
                Partnership
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function XBracketProject() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#e1b382]/20 to-[#e1b382]/10 relative overflow-hidden">
      {/* Animated background elements */}
        <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-3 sm:mb-4 bg-[#c89666] text-white border border-[#2d545e] px-4 sm:px-6 py-1.5 sm:py-2 shadow-lg text-xs sm:text-sm">
                🏆 Featured Project
              </Badge>
            </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-[#2d545e] mb-4 sm:mb-5 lg:mb-6 px-4">
            X-BRACKET <span className="text-[#12343b]">POST</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#2d545e] max-w-4xl mx-auto leading-relaxed px-4">
            A groundbreaking collaboration between CIRD and Jaiprakash Power Ventures Limited (JPVL) 
            that resulted in a patented equipment design, showcasing engineering excellence and 
            intellectual property innovation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {[
            {
              title: "Industry Partnership",
              description: "CIRD jPVL Collaboration",
              content: "A successful collaboration between CIRD at JUET and Jaiprakash Power Ventures Limited, demonstrating the power of industry-academia partnerships in driving innovation.",
              icon: Target,
              color: "bg-white"
            },
            {
              title: "Patent Registration",
              description: "Government of India Certified",
              content: "The X-BRACKET POST design was officially registered and certified by the Patent Office of the Government of India, showcasing engineering excellence.",
              icon: Award,
              color: "bg-white"
            },
            {
              title: "Intellectual Property",
              description: "Engineering Excellence",
              content: "This project exemplifies our commitment to creating valuable intellectual property through innovative engineering solutions and research.",
              icon: Zap,
              color: "bg-white"
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="bg-white border-[#c89666] hover:border-[#2d545e] transition-all duration-300 hover:shadow-xl shadow-md h-full">
                <CardHeader>
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <div className={`p-2 rounded-lg bg-[#2d545e] flex-shrink-0`}>
                      <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg lg:text-xl text-[#2d545e]">{card.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm sm:text-base text-[#2d545e]">{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-[#2d545e] leading-relaxed">{card.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CIRDEntities() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-950 to-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-blue-600 text-white border border-blue-500 px-6 py-2 shadow-lg shadow-blue-900/30">
                🏢 Research Entities
              </Badge>
            </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            CIRD <span className="text-white">Entities</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our specialized divisions working on cutting-edge research and development across 
            multiple technological domains.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* CDC Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl shadow-lg group">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-blue-600 group-hover:scale-110 transition-transform duration-300">
                    <Cog className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-slate-900 group-hover:text-blue-700 transition-colors">
                      CDC - Control Development Centre
                    </CardTitle>
                    <CardDescription className="text-slate-600 text-lg">
                      Advanced Control Systems Research
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  The Control Development Centre focuses on developing sophisticated control systems 
                  and automation solutions for industrial applications. Our research spans from basic 
                  control theory to advanced AI-driven control mechanisms.
                </p>
                <div className="space-y-3">
                  <h4 className="text-slate-900 font-semibold mb-3">Key Focus Areas:</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-slate-700">Software Development & Programming</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-slate-700">Robotics Development & Automation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-slate-700">VLSI Design & Microelectronics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-slate-700">Artificial Intelligence & Machine Learning</span>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/entities/cdc">
                    <Button 
                      className="mt-6 bg-blue-600 text-white hover:bg-blue-700 border border-blue-500 shadow-lg shadow-blue-900/30"
                      size="sm"
                    >
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* MTL Lab (Mechanical Testing Lab) Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-white border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl shadow-lg group">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-blue-600 group-hover:scale-110 transition-transform duration-300">
                    <Microscope className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-slate-900 group-hover:text-blue-700 transition-colors">
                      MTL Lab (Mechanical Testing Lab)
                    </CardTitle>
                    <CardDescription className="text-slate-600 text-lg">
                      Specialized Research Laboratory
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  The MTL Lab (Mechanical Testing Lab) is a specialized research facility dedicated to advanced technological 
                  research and development. Our lab focuses on cutting-edge technologies and innovative 
                  solutions for modern industrial challenges.
                </p>
                <div className="space-y-3">
                  <h4 className="text-slate-900 font-semibold mb-3">Key Focus Areas:</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-slate-700">Advanced Materials Research</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-slate-700">Technology Innovation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-slate-700">Laboratory Testing & Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-slate-700">Research & Development</span>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/entities/mtl">
                    <Button 
                      className="mt-6 bg-blue-600 text-white hover:bg-blue-700 border border-blue-500 shadow-lg shadow-blue-900/30"
                      size="sm"
                    >
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
