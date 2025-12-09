"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Cog, 
  Microscope, 
  Code, 
  Bot, 
  Cpu, 
  Brain,
  CircuitBoard,
  Database,
  Zap,
  Target,
  ArrowRight,
  ExternalLink,
  Users,
  Award,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function EntitiesPage() {
  const entities = [
    {
      title: "CDC - Control Development Centre",
      subtitle: "Advanced Control Systems Research",
      description: "The Control Development Centre is our premier research facility dedicated to developing sophisticated control systems and automation solutions for industrial applications. Our research spans from basic control theory to advanced AI-driven control mechanisms.",
      icon: Cog,
      color: "bg-white",
      focusAreas: [
        {
          title: "Software Development",
          description: "Advanced programming, AI-driven development, and modern software engineering",
          icon: Code,
          projects: ["AI Code Generation", "Microservices", "Cloud Solutions"]
        },
        {
          title: "Robotics Development", 
          description: "Autonomous systems, robotic automation, and intelligent control",
          icon: Bot,
          projects: ["Industrial Automation", "Autonomous Vehicles", "Human-Robot Interaction"]
        },
        {
          title: "VLSI Design",
          description: "Very Large Scale Integration and microelectronics design",
          icon: Cpu,
          projects: ["ASIC Design", "FPGA Development", "Low-Power Circuits"]
        },
        {
          title: "Artificial Intelligence",
          description: "Machine learning, neural networks, and intelligent systems",
          icon: Brain,
          projects: ["Deep Learning", "Computer Vision", "NLP"]
        }
      ],
      stats: {
        projects: 12,
        patents: 3,
        publications: 25,
        researchers: 4
      },
      teamMembers: [
        "Dr. Amit Kumar Srivastava",
        "Er. Anshika Sharma", 
        "Er. Nitesh Pandey",
        "Er. Shashwat Shukla"
      ]
    },
    {
      title: "MTL Lab (Mechanical Testing Lab)",
      subtitle: "Specialized Research Laboratory",
      description: "The MTL Lab (Mechanical Testing Lab) is a specialized research facility dedicated to advanced technological research and development. Our lab focuses on cutting-edge technologies and innovative solutions for modern industrial challenges.",
      icon: Microscope,
      color: "bg-white",
      focusAreas: [
        {
          title: "Materials Research",
          description: "Advanced materials, nanotechnology, and material characterization",
          icon: CircuitBoard,
          projects: ["Nanomaterials", "Smart Materials", "Biomaterials"]
        },
        {
          title: "Technology Innovation",
          description: "Emerging technologies and innovative solutions",
          icon: Zap,
          projects: ["IoT Solutions", "Smart Sensors", "Wireless Tech"]
        },
        {
          title: "Laboratory Testing",
          description: "Advanced testing, analysis, and quality assurance",
          icon: Database,
          projects: ["Quality Testing", "Performance Analysis", "Reliability Studies"]
        },
        {
          title: "Research & Development",
          description: "Fundamental research and technology development",
          icon: Target,
          projects: ["Basic Research", "Applied Research", "Technology Transfer"]
        }
      ],
      stats: {
        projects: 8,
        patents: 2,
        publications: 18,
        researchers: 4
      },
      teamMembers: [
        "Dr. Dharmendra Kumar Shukla",
        "R.S. Chauhan",
        "K.K. Purohit", 
        "Bhanu Pratap Arya"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e1b382]/50 to-[#e1b382]/40">
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-[#2d545e] via-[#12343b] to-[#2d545e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e1b382' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
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
            >
              <Badge className="mb-6 bg-[#e1b382] text-[#2d545e] border border-[#c89666] px-6 py-2 shadow-lg">
                🏢 Research Entities
              </Badge>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              CIRD <span className="text-white">Entities</span>
            </h1>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Discover our specialized research divisions and laboratories working on 
              cutting-edge technologies across multiple domains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Entities Section */}
      <section className="py-20 bg-gradient-to-b from-[#e1b382]/50 to-[#e1b382]/40">
        <div className="container mx-auto px-4">
          {entities.map((entity, entityIndex) => (
            <motion.div
              key={entityIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: entityIndex * 0.3 }}
              className="mb-20"
            >
              <Card className="bg-white border-[#c89666] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-[#e1b382]/20 to-[#c89666]/20 border-b border-[#c89666] p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-4 rounded-2xl bg-[#2d545e] shadow-lg`}>
                      {React.createElement(entity.icon, { className: "w-12 h-12 text-white" })}
                    </div>
                    <div>
                      <CardTitle className="text-4xl text-[#2d545e] mb-2">{entity.title}</CardTitle>
                      <CardDescription className="text-xl text-gray-600">{entity.subtitle}</CardDescription>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">{entity.description}</p>
                </CardHeader>

                <CardContent className="p-8">
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#2d545e] mb-2">{entity.stats.projects}</div>
                      <div className="text-sm text-gray-600">Active Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#2d545e] mb-2">{entity.stats.patents}</div>
                      <div className="text-sm text-gray-600">Patents Filed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#2d545e] mb-2">{entity.stats.publications}</div>
                      <div className="text-sm text-gray-600">Publications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#2d545e] mb-2">{entity.stats.researchers}</div>
                      <div className="text-sm text-gray-600">Researchers</div>
                    </div>
                  </div>

                  {/* Focus Areas */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#2d545e] mb-6">Focus Areas</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {entity.focusAreas.map((area, areaIndex) => (
                        <motion.div
                          key={areaIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: areaIndex * 0.1 }}
                          className="bg-white border-[#c89666] rounded-xl p-6 hover:border-[#2d545e] transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          <div className="flex items-center space-x-3 mb-4">
                            <div className={`p-2 rounded-lg bg-[#2d545e]`}>
                              {React.createElement(area.icon, { className: "w-6 h-6 text-white" })}
                            </div>
                            <h4 className="text-xl font-semibold text-[#2d545e]">{area.title}</h4>
                          </div>
                          <p className="text-gray-700 mb-4 leading-relaxed">{area.description}</p>
                          <div className="space-y-2">
                            <h5 className="text-sm font-semibold text-[#2d545e] mb-2">Key Projects:</h5>
                            {area.projects.map((project, projectIndex) => (
                              <div key={projectIndex} className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-[#2d545e] rounded-full"></div>
                                <span className="text-sm text-gray-700">{project}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Team Members */}
                  {entity.teamMembers && (
                    <div className="mt-8 pt-8 border-t border-[#c89666]">
                      <h4 className="text-xl font-semibold text-[#2d545e] mb-4 flex items-center">
                        <Users className="w-6 h-6 mr-2 text-[#2d545e]" />
                        Team Members
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {entity.teamMembers.map((member, memberIndex) => (
                          <motion.div
                            key={memberIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: memberIndex * 0.1 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="flex items-center space-x-3 p-3 bg-white border-[#c89666] rounded-lg hover:border-[#2d545e] transition-all"
                          >
                            <div className="w-2 h-2 bg-[#2d545e] rounded-full"></div>
                            <span className="text-gray-700 text-sm">{member}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={entity.title === "CDC - Control Development Centre" ? "/entities/cdc" : "/entities/mtl"}>
                        <Button 
                          className="bg-[#2d545e] text-white hover:bg-[#12343b] border border-[#12343b] px-8 py-3 text-lg font-semibold rounded-full shadow-xl"
                        >
                          Learn More About {entity.title} <ArrowRight className="ml-2" size={20} />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Research Collaboration */}
      <section className="py-20 bg-gradient-to-b from-[#c89666] to-[#e1b382]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[#2d545e] mb-6">
              Research <span className="text-[#2d545e]">Collaboration</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Our entities work together to create synergies and drive innovation across 
              multiple research domains.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Interdisciplinary Research",
                description: "Collaborative projects spanning multiple research areas",
                icon: Users,
                color: "bg-[#2d545e]"
              },
              {
                title: "Industry Partnerships",
                description: "Strong collaborations with leading industrial organizations",
                icon: Award,
                color: "bg-[#2d545e]"
              },
              {
                title: "Innovation Metrics",
                description: "Measurable impact through patents, publications, and projects",
                icon: TrendingUp,
                color: "bg-[#2d545e]"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-white border-[#c89666] hover:border-[#2d545e] transition-all duration-300 shadow-lg hover:shadow-xl text-center">
                  <CardHeader>
                    <div className={`p-4 rounded-2xl ${item.color} mx-auto mb-4 w-fit`}>
                      {React.createElement(item.icon, { className: "w-8 h-8 text-white" })}
                    </div>
                    <CardTitle className="text-2xl text-[#2d545e]">{item.title}</CardTitle>
                    <CardDescription className="text-gray-700 text-base">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-[#2d545e] to-[#12343b]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Join Our Research Community
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Become part of our innovative research community and contribute to 
              groundbreaking discoveries that shape the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/research">
                  <Button 
                    size="lg" 
                    className="bg-[#e1b382] text-[#2d545e] hover:bg-[#c89666] border border-[#c89666] px-8 py-4 text-lg font-semibold rounded-full shadow-xl"
                  >
                    Explore Research <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/team">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-[#e1b382] bg-transparent text-white hover:bg-[#e1b382]/10 hover:border-[#e1b382] px-8 py-4 text-lg font-semibold rounded-full shadow-lg"
                  >
                    Meet Our Team
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
