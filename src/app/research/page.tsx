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
  CircuitBoard, 
  Database,
  Microscope,
  Zap,
  Target,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export default function ResearchPage() {
  const researchAreas = [
    {
      title: "Software Development",
      description: "Advanced software engineering, AI-driven development, and modern programming paradigms",
      icon: Code,
      color: "from-cyan-500 to-blue-500",
      projects: ["AI-Powered Code Generation", "Microservices Architecture", "Cloud Computing Solutions"],
      status: "Active"
    },
    {
      title: "Robotics Development",
      description: "Autonomous systems, robotic automation, and intelligent control mechanisms",
      icon: Bot,
      color: "from-purple-500 to-pink-500",
      projects: ["Industrial Automation", "Autonomous Vehicles", "Human-Robot Interaction"],
      status: "Active"
    },
    {
      title: "VLSI Design",
      description: "Very Large Scale Integration, microelectronics, and semiconductor design",
      icon: Cpu,
      color: "from-green-500 to-emerald-500",
      projects: ["ASIC Design", "FPGA Development", "Low-Power Circuits"],
      status: "Active"
    },
    {
      title: "Artificial Intelligence",
      description: "Machine learning, neural networks, and intelligent system development",
      icon: Brain,
      color: "from-yellow-500 to-orange-500",
      projects: ["Deep Learning Models", "Computer Vision", "Natural Language Processing"],
      status: "Active"
    },
    {
      title: "IoT & Embedded Systems",
      description: "Internet of Things, embedded computing, and connected device development",
      icon: CircuitBoard,
      color: "from-pink-500 to-rose-500",
      projects: ["Smart Sensors", "Edge Computing", "Wireless Communication"],
      status: "Active"
    },
    {
      title: "Data Science & Analytics",
      description: "Big data processing, analytics, and data-driven decision making",
      icon: Database,
      color: "from-indigo-500 to-purple-500",
      projects: ["Predictive Analytics", "Data Visualization", "Statistical Modeling"],
      status: "Active"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge className="mb-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 px-6 py-2">
              🔬 Research Areas
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Research <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Excellence</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore our cutting-edge research areas spanning software development, robotics, 
              VLSI design, artificial intelligence, and more. Discover the innovations that 
              shape tomorrow's technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Areas Grid */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Research <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Areas</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Our multidisciplinary research spans across multiple domains, 
              creating innovative solutions for complex industrial challenges.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 group h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${area.color} group-hover:scale-110 transition-transform duration-300`}>
                        {React.createElement(area.icon, { className: "w-8 h-8 text-white" })}
                      </div>
                      <Badge className={`bg-gradient-to-r ${area.color} text-white border-0`}>
                        {area.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl text-white group-hover:text-cyan-300 transition-colors">
                      {area.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-base leading-relaxed">
                      {area.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold mb-3">Key Projects:</h4>
                      {area.projects.map((project, projectIndex) => (
                        <motion.div
                          key={projectIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: projectIndex * 0.1 }}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                          <span className="text-gray-300 text-sm">{project}</span>
                        </motion.div>
                      ))}
                    </div>
                    <Button 
                      className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0"
                      size="sm"
                    >
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Featured <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Highlighting our most impactful research projects and their real-world applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "X-BRACKET POST",
                description: "Patented equipment design developed in collaboration with JPVL",
                category: "Industrial Design",
                status: "Patented",
                icon: Target,
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "AI-Powered Control Systems",
                description: "Intelligent automation solutions for industrial applications",
                category: "Artificial Intelligence",
                status: "Active",
                icon: Brain,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Robotic Automation Platform",
                description: "Advanced robotics system for manufacturing processes",
                category: "Robotics",
                status: "Development",
                icon: Bot,
                color: "from-cyan-500 to-blue-500"
              },
              {
                title: "VLSI Microprocessor Design",
                description: "Low-power, high-performance processor architecture",
                category: "VLSI Design",
                status: "Research",
                icon: Cpu,
                color: "from-yellow-500 to-orange-500"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${project.color} group-hover:scale-110 transition-transform duration-300`}>
                        {React.createElement(project.icon, { className: "w-8 h-8 text-white" })}
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant="secondary" className="bg-slate-600 text-gray-300">
                          {project.category}
                        </Badge>
                        <Badge className={`bg-gradient-to-r ${project.color} text-white border-0`}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-white group-hover:text-green-300 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-base leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white border-0"
                      size="sm"
                    >
                      View Details <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Collaborate With Us
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join our research community and contribute to groundbreaking innovations 
              that shape the future of technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
              >
                Start Collaboration <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 px-8 py-4 text-lg font-semibold rounded-full"
              >
                View Publications
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
