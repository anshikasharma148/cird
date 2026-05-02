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
  Users,
  Award,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { InternalLinksSection } from "@/components/seo/internal-links";

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
    <div className="min-h-screen bg-white">
      {/* Hero - navy (distinct from About blue, Research teal) */}
      <section className="pt-36 sm:pt-40 pb-20 bg-[#1e3a5f] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge className="mb-6 bg-[#FF9800] text-white border-0 px-6 py-2 shadow-lg">
              Research Entities
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              CIRD <span className="text-[#FF9800]">Entities</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Discover our specialized research divisions and laboratories working on
              cutting-edge technologies across multiple domains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Entities Section - CIRD theme */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          {entities.map((entity, entityIndex) => (
            <motion.div
              key={entityIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: entityIndex * 0.2 }}
              viewport={{ once: true }}
              className="mb-16 lg:mb-20"
            >
              <Card className="bg-white border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#1A237E]/20 transition-all duration-300">
                <CardHeader className="bg-slate-50 border-b border-slate-200 p-6 sm:p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-4 rounded-2xl bg-[#1A237E] shadow-md">
                      {React.createElement(entity.icon, { className: "w-12 h-12 text-white" })}
                    </div>
                    <div>
                      <CardTitle className="text-2xl sm:text-3xl lg:text-4xl text-[#1A237E] mb-1">{entity.title}</CardTitle>
                      <CardDescription className="text-lg text-[#37474F]">{entity.subtitle}</CardDescription>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg text-[#37474F] leading-relaxed">{entity.description}</p>
                </CardHeader>

                <CardContent className="p-6 sm:p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-[#7B1FA2] mb-1">{entity.stats.projects}</div>
                      <div className="text-sm text-[#37474F]">Active Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-[#7B1FA2] mb-1">{entity.stats.patents}</div>
                      <div className="text-sm text-[#37474F]">Patents Filed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-[#7B1FA2] mb-1">{entity.stats.publications}</div>
                      <div className="text-sm text-[#37474F]">Publications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-[#7B1FA2] mb-1">{entity.stats.researchers}</div>
                      <div className="text-sm text-[#37474F]">Researchers</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1A237E] mb-5">Focus Areas</h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      {entity.focusAreas.map((area, areaIndex) => (
                        <motion.div
                          key={areaIndex}
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: areaIndex * 0.08 }}
                          viewport={{ once: true }}
                          className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-[#1A237E]/20 transition-all"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-[#1A237E]">
                              {React.createElement(area.icon, { className: "w-6 h-6 text-white" })}
                            </div>
                            <h4 className="text-lg font-semibold text-[#1A237E]">{area.title}</h4>
                          </div>
                          <p className="text-[#37474F] mb-3 leading-relaxed text-sm sm:text-base">{area.description}</p>
                          <div className="space-y-1.5">
                            <h5 className="text-sm font-semibold text-[#1A237E] mb-2">Key Projects:</h5>
                            {area.projects.map((project, projectIndex) => (
                              <div key={projectIndex} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-[#FF9800] rounded-full shrink-0" />
                                <span className="text-sm text-[#37474F]">{project}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {entity.teamMembers && (
                    <div className="mt-8 pt-8 border-t border-slate-200">
                      <h4 className="text-lg font-semibold text-[#1A237E] mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Team Members
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {entity.teamMembers.map((member, memberIndex) => (
                          <div
                            key={memberIndex}
                            className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100"
                          >
                            <div className="w-2 h-2 bg-[#FF9800] rounded-full shrink-0" />
                            <span className="text-[#37474F] text-sm">{member}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-center">
                    <Link href={entity.title === "CDC - Control Development Centre" ? "/entities/cdc" : "/entities/mtl"}>
                      <Button className="bg-[#1A237E] text-white hover:bg-[#0D47A1] border-0 px-8 py-3 text-base font-semibold rounded-lg shadow-md">
                        Learn More About {entity.title.split(" - ")[0]} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Research Collaboration - CIRD theme */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">Together</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A237E] mt-2 mb-4">
              Research Collaboration
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-[#FF9800]" />
            <p className="text-lg text-[#37474F] max-w-3xl mx-auto mt-4">
              Our entities work together to create synergies and drive innovation across multiple research domains.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: "Interdisciplinary Research", description: "Collaborative projects spanning multiple research areas", icon: Users },
              { title: "Industry Partnerships", description: "Strong collaborations with leading industrial organizations", icon: Award },
              { title: "Innovation Metrics", description: "Measurable impact through patents, publications, and projects", icon: TrendingUp }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border-slate-200 hover:border-[#1A237E]/20 transition-all shadow-sm hover:shadow-md text-center h-full">
                  <CardHeader>
                    <div className="p-4 rounded-2xl bg-[#1A237E] mx-auto mb-4 w-fit">
                      {React.createElement(item.icon, { className: "w-8 h-8 text-white" })}
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-[#1A237E]">{item.title}</CardTitle>
                    <CardDescription className="text-[#37474F] text-base">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinksSection
        eyebrow="Connected Pages"
        title="Explore Linked Entity Resources"
        description="Move from entity overviews to project detail pages, patents, and collaboration entry points."
        links={[
          {
            href: "/entities/cdc",
            title: "CDC Detailed Page",
            description: "Dive deeper into control systems, automation, and software development work.",
          },
          {
            href: "/entities/mtl",
            title: "MTL Detailed Page",
            description: "Review material testing, validation setups, and laboratory capabilities.",
          },
          {
            href: "/research",
            title: "Research Portfolio",
            description: "See how entity workstreams map to active and completed projects.",
          },
          {
            href: "/patents",
            title: "Patents and Designs",
            description: "Track IP outcomes emerging from entity-led project execution.",
          },
          {
            href: "/team",
            title: "Team and Contributors",
            description: "Meet the researchers and engineers associated with each entity.",
          },
          {
            href: "/contact",
            title: "Collaborate With CIRD",
            description: "Discuss partnerships, testing support, and applied R&D opportunities.",
          },
        ]}
      />

      {/* Call to Action */}
      <section className="py-16 sm:py-20 bg-[#1e3a5f] border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Join Our Research Community
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Become part of our innovative research community and contribute to groundbreaking discoveries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/research">
                <Button size="lg" className="bg-[#FF9800] text-white hover:bg-[#F57C00] border-0 px-8 py-4 text-base font-semibold rounded-lg shadow-lg">
                  Explore Research <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/team">
                <Button variant="outline" size="lg" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#1e3a5f] px-8 py-4 text-base font-semibold rounded-lg">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
