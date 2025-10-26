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
  Cogs
} from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }}></div>
      
      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 px-6 py-2">
            About CIRD
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Centre for Industrial Research and Development
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            An Industry–Academia interface established by Jaypee University of Engineering and Technology (JUET), Guna.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              To pioneer breakthrough technologies that transform industries and create sustainable 
              solutions for tomorrow's challenges. We combine cutting-edge research with practical 
              implementation to drive technological advancement.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                Innovation
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                Research
              </Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                Development
              </Badge>
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                Excellence
              </Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 shadow-2xl border border-slate-600"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Research Focus Areas</h3>
            <div className="space-y-4">
              {[
                { icon: Code, text: "Software Development & AI", color: "text-cyan-400" },
                { icon: Bot, text: "Robotics & Automation", color: "text-purple-400" },
                { icon: Cpu, text: "VLSI & Microelectronics", color: "text-green-400" },
                { icon: Brain, text: "Machine Learning & Neural Networks", color: "text-yellow-400" },
                { icon: CircuitBoard, text: "IoT & Embedded Systems", color: "text-pink-400" },
                { icon: Database, text: "Data Science & Analytics", color: "text-blue-400" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-gray-300">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function XBracketProject() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white border-0 px-6 py-2">
            🏆 Featured Project
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            X-BRACKET <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">POST</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A groundbreaking collaboration between CIRD and Jaiprakash Power Ventures Limited (JPVL) 
            that resulted in a patented equipment design, showcasing engineering excellence and 
            intellectual property innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Industry Partnership",
              description: "CIRD jPVL Collaboration",
              content: "A successful collaboration between CIRD at JUET and Jaiprakash Power Ventures Limited, demonstrating the power of industry-academia partnerships in driving innovation.",
              icon: Target,
              color: "from-blue-500 to-cyan-500"
            },
            {
              title: "Patent Registration",
              description: "Government of India Certified",
              content: "The X-BRACKET POST design was officially registered and certified by the Patent Office of the Government of India, showcasing engineering excellence.",
              icon: Award,
              color: "from-green-500 to-emerald-500"
            },
            {
              title: "Intellectual Property",
              description: "Engineering Excellence",
              content: "This project exemplifies our commitment to creating valuable intellectual property through innovative engineering solutions and research.",
              icon: Zap,
              color: "from-purple-500 to-pink-500"
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${card.color}`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{card.title}</CardTitle>
                  </div>
                  <CardDescription className="text-cyan-300">{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{card.content}</p>
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
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-6 py-2">
            🏢 Research Entities
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            CIRD <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Entities</span>
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
            <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 group">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:scale-110 transition-transform duration-300">
                    <Cogs className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white group-hover:text-purple-300 transition-colors">
                      CDC - Control Development Centre
                    </CardTitle>
                    <CardDescription className="text-purple-300 text-lg">
                      Advanced Control Systems Research
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  The Control Development Centre focuses on developing sophisticated control systems 
                  and automation solutions for industrial applications. Our research spans from basic 
                  control theory to advanced AI-driven control mechanisms.
                </p>
                <div className="space-y-3">
                  <h4 className="text-white font-semibold mb-3">Key Focus Areas:</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Software Development & Programming</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Robotics Development & Automation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                    <span className="text-gray-300">VLSI Design & Microelectronics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Artificial Intelligence & Machine Learning</span>
                  </div>
                </div>
                <Button 
                  className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                  size="sm"
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* MTL Lab Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 group">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
                    <Microscope className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white group-hover:text-purple-300 transition-colors">
                      MTL Lab
                    </CardTitle>
                    <CardDescription className="text-purple-300 text-lg">
                      Specialized Research Laboratory
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  The MTL Lab is a specialized research facility dedicated to advanced technological 
                  research and development. Our lab focuses on cutting-edge technologies and innovative 
                  solutions for modern industrial challenges.
                </p>
                <div className="space-y-3">
                  <h4 className="text-white font-semibold mb-3">Key Focus Areas:</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Advanced Materials Research</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Technology Innovation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Laboratory Testing & Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Research & Development</span>
                  </div>
                </div>
                <Button 
                  className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                  size="sm"
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
