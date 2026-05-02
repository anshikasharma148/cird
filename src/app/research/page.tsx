"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Bot, 
  Cpu, 
  CircuitBoard, 
  Database,
  Microscope,
  Zap,
  Target,
  ArrowRight,
  CheckCircle,
  Clock,
  Award
} from "lucide-react";
import Link from "next/link";
import { patents as patentsData } from "@/data/patents";
import { InternalLinksSection } from "@/components/seo/internal-links";

export default function ResearchPage() {
  const broaderAreas = [
    {
      code: "BA01",
      title: "Climate control Methodology, Bottom Ash (BA) Utilization in Mortar and Concrete",
      icon: Target,
      color: "bg-white",
      status: "Active"
    },
    {
      code: "BA02", 
      title: "Reduction in Cycle and non-cycle water consumption",
      icon: Zap,
      color: "bg-white",
      status: "Active"
    },
    {
      code: "BA03",
      title: "(DCS) & (CHP) Cost of power reduction- specific areas and methodologies/technologies",
      icon: Cpu,
      color: "bg-white",
      status: "Active"
    },
    {
      code: "BA04",
      title: "Conditional Monitoring Technologies",
      icon: CircuitBoard,
      color: "bg-white",
      status: "Active"
    },
    {
      code: "BA05",
      title: "Early Warning System",
      icon: Database,
      color: "bg-white",
      status: "Active"
    },
    {
      code: "BA06",
      title: "Studies on possible conversion of JBTPP sub-critical supercritical unit",
      icon: Microscope,
      color: "bg-white",
      status: "Active"
    },
    {
      code: "Software Development & AI",
      title: "Advanced software engineering, AI-driven development, and intelligent systems",
      icon: Code,
      color: "bg-white",
      status: "Active"
    },
    {
      code: "Robotics & Industrial Automation",
      title: "Autonomous systems, robotic automation, and intelligent control mechanisms",
      icon: Bot,
      color: "bg-white",
      status: "Active"
    },
    {
      code: "IoT & Embedded Systems",
      title: "Internet of Things, sensor networks, and embedded system design",
      icon: CircuitBoard,
      color: "bg-white",
      status: "Active"
    }
  ];

  const completedProjects = [
    {
      id: "BA01/PP/A",
      title: "Climate control Methodology, Bottom Ash (BA) Utilization in Mortar and Concrete",
      team: [
        "Dr. D. K. Shukla, Assistant Professor (SG), Civil, JUET, Guna",
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Sh. Nadeem Ahmed, Nodal officers, JNSTPP, JPVL",
        "Shri Ishtiaque Ahmed, Nodal officers, JBTPP, JPVL"
      ],
      status: "Completed"
    },
    {
      id: "BA02/PP/A",
      title: "Reduction in Cycle and non-cycle water consumption",
      team: [
        "Dr. Pankaj Dumka, Assistant Professor (SG), MECH, JUET, Guna",
        "Dr. Manoj Dubey, Assistant Professor (SG), MECH, JUET, Guna",
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Shri H. S. Saini, Nodal officers, JBTPP, JPVL",
        "Shri Ashok Kumar Singh, Nodal officers, JNSTPP, JPVL"
      ],
      status: "Completed"
    },
    {
      id: "BA03/PP/A",
      title: "DCS Upgradation",
      team: [
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Dr. Amit Kumar Srivastava, Assistant Professor (SG), CSE, JUET, Guna",
        "Dr. Gaurav Saxena, Assistant Professor (SG), CSE, JUET, Guna",
        "Shri Rakesh K. Singh, Nodal officers, JBTPP, JPVL",
        "Shri Navin Tinguria, Nodal officers, JNSTPP, JPVL",
        "Balachandran M., Nodal officers, JPVL"
      ],
      status: "Completed"
    },
    {
      id: "BA05/PP/A",
      title: "Early Warning System",
      team: [
        "Dr. Neeraj Jain, JIIT, Noida",
        "Dr. Vivek Kumar Singh, JIIT, Noida",
        "Dr. Dhananjay R. Mishra, JUET, Guna",
        "Sh. Amit Jauhari (HQ), JPVL",
        "Sh. V K Sharma, VPHEP, JPVL"
      ],
      status: "Completed"
    }
  ];

  const ongoingProjects = [
    {
      id: "BA01/PP/B",
      title: "Problems and Remedies of Bottom Ash Replacement with Sand",
      team: [
        "Dr. D. K. Shukla, Assistant Professor (SG), Civil, JUET, Guna",
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Sh. Nadeem Ahmed, Nodal officers, JNSTPP, JPVL",
        "Shri Ishtiaque Ahmed, Nodal officers, JBTPP, JPVL"
      ],
      status: "Ongoing",
      link: "/projects/ba01-pp-b"
    },
    {
      id: "BA01/PP/C",
      title: "Bottom Ash Replacement in Pavers and Bricks",
      team: [
        "Dr. D. K. Shukla, Assistant Professor (SG), Civil, JUET, Guna",
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Sh. Nadeem Ahmed, Nodal officers, JNSTPP, JPVL",
        "Shri Ishtiaque Ahmed, Nodal officers, JBTPP, JPVL"
      ],
      status: "Ongoing",
      link: "/projects/ba01-pp-c"
    },
    {
      id: "BA03/PP/B",
      title: "Monitoring & Control System for Coal Handling Plant (CHP)",
      team: [
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Dr. Amit Kumar Srivastava, Assistant Professor (SG), CSE, JUET, Guna",
        "Shri Rakesh K. Singh, Nodal officers, JBTPP, JPVL",
        "Shri Navin Tinguria, Nodal officers, JNSTPP, JPVL",
        "Balachandran M., Nodal officers, JPVL"
      ],
      status: "Ongoing",
      link: "/projects/ba03-pp-b"
    },
    {
      id: "BA06/PP/A",
      title: "Studies on possible conversion of JBTPP sub-critical to supercritical unit",
      team: [
        "Prof. PMV Subba Rao, IIT, Delhi",
        "Dr. Pankaj Dumka, JUET, Guna",
        "Dr. Dhananjay R. Mishra, JUET, Guna",
        "Sh. M.K.V Rama Rao, CTO, JPVL"
      ],
      status: "Ongoing"
    },
    {
      id: "BA08/PP/A",
      title: "SF-6 Gas Monitoring System (GIS)",
      team: [
        "Dr. Amit Kumar Srivastava, Assistant Professor (SG), CSE, JUET, Guna",
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Sh. Amit Jauhari (HQ), JPVL",
        "Sh. V. S. Yadav, VPHEP, JPVL"
      ],
      status: "Ongoing"
    },
    {
      id: "BA04/PP/A",
      title: "Conditional Monitoring Technologies",
      team: [
        "Dr. Gaurav Saxena, Assistant Professor (SG), CSE, JUET, Guna",
        "Dr. Rohit Mishra, Assistant Professor (SG), MECH, JUET, Guna",
        "Dr. Dhananjay R Mishra, Associate Professor, MECH, JUET, Guna",
        "Sh. Ashok Kumar Singh, JNSTPP, JPVL",
        "Sh. Arup Kumar Ghosh, JBTPP, JPVL"
      ],
      status: "Ongoing"
    },
    {
      id: "BA07/PP/A",
      title: "Early Warning Systems (EWS)",
      team: [
        "Dr. Amit Kumar Srivastava, Assistant Professor (SG), CSE, JUET, Guna",
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Sh. Amit Jauhari (HQ), JPVL",
        "Sh. V. S. Yadav, VPHEP, JPVL"
      ],
      status: "Ongoing",
      link: "/projects/ba07-pp-a"
    },
    {
      id: "BA07/PP/B",
      title: "Automatic Weather Station (AWS)",
      team: [
        "Dr. Amit Kumar Srivastava, Assistant Professor (SG), CSE, JUET, Guna",
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Sh. Amit Jauhari (HQ), JPVL",
        "Sh. V. S. Yadav, VPHEP, JPVL"
      ],
      status: "Ongoing",
      link: "/projects/ba07-pp-b"
    },
    {
      id: "BA07/PP/C",
      title: "Automatic Public Warning System (APWS)",
      team: [
        "Dr. Amit Kumar Srivastava, Assistant Professor (SG), CSE, JUET, Guna",
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Sh. Amit Jauhari (HQ), JPVL",
        "Sh. V. S. Yadav, VPHEP, JPVL"
      ],
      status: "Ongoing"
    },
    {
      id: "BA09/PP/A",
      title: "Automatic Reservoir Monitoring and Control System (ARMAC) for VHPHEP",
      team: [
        "Dr. Amit Kumar Srivastava, Assistant Professor (SG), CSE, JUET, Guna",
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Sh. Amit Jauhari (HQ), JPVL",
        "Sh. V. S. Yadav, VPHEP, JPVL"
      ],
      status: "Ongoing"
    },
    {
      id: "BA09/PP/B",
      title: "Automatic Reservoir Monitoring and Control System (ARMAC) for Bina",
      team: [
        "Dr. Amit Kumar Srivastava, Assistant Professor (SG), CSE, JUET, Guna",
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Sh. Amit Jauhari (HQ), JPVL",
        "Sh. V. S. Yadav, VPHEP, JPVL"
      ],
      status: "Ongoing"
    }
  ];

  const patents = [
    "Lateral Force Resistance Interlocking Brick (420914-001)",
    "Seismic-Resistant Interlocking Brick (420909-001)",
    "Rail-Guided Inspection Robot (420930-001)",
    "Master Troughing Idler with Vertical Hydraulic Drive Without Support Idler (420974-001)",
    "Inspection Robot (420905-001)",
    "Monumental Block With Perforations (420913-001)",
    "Master Troughing Idler with Parallel Hydraulic drive(420940-001)",
    "Master troughing Idler with bottom mechanical drive with horizontal gear assembly and without support idler (420961-001)",
    "Interlocking Brick (420892-001)",
    "Brick (420908-001)",
    "Paver Blocks for Monuments (420912-001)",
    "Brick with Rectangular Locking System (420907-001)",
    "Buildings Grade Paver Block (420906-001)",
    "Buildings Block (420911-001)",
    "Interlocking Block (420915-001)",
    "N1", "N2", "N3"
  ];

  // Function to extract design number from patent string and find matching patent
  const getPatentLink = (patentString: string): string | null => {
    // Skip placeholder items
    if (patentString === "N1" || patentString === "N2" || patentString === "N3") {
      return null;
    }
    
    // Extract design number from string like "Title (420914-001)"
    const match = patentString.match(/\((\d+-\d+)\)/);
    if (!match) return null;
    
    const designNumber = match[1];
    // Check if patent exists in patents data by design number
    const patent = patentsData.find(p => p.designNumber === designNumber);
    if (patent) {
      // Link to patents page with search query to filter to this patent
      return `/patents?search=${encodeURIComponent(designNumber)}`;
    }
    
    // If not found by design number, try to match by title
    const titleMatch = patentString.match(/^([^(]+)/);
    if (titleMatch) {
      const title = titleMatch[1].trim();
      const patentByTitle = patentsData.find(p => 
        p.title.toLowerCase().includes(title.toLowerCase()) || 
        title.toLowerCase().includes(p.title.toLowerCase())
      );
      if (patentByTitle) {
        return `/patents?search=${encodeURIComponent(patentByTitle.designNumber)}`;
      }
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - teal (distinct from About blue), same treatment as About */}
      <section className="pt-36 sm:pt-40 pb-20 bg-[#00695C] relative overflow-hidden">
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
              Research & Development
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Our <span className="text-[#FF9800]">Research</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Cutting-edge research and development across multiple technological domains,
              driving innovation and creating practical solutions for industry challenges.
            </p>
            {/* Project Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">14</div>
                <div className="text-sm text-[#FF9800]">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">4</div>
                <div className="text-sm text-[#FF9800]">Completed Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">11</div>
                <div className="text-sm text-[#FF9800]">Ongoing Projects</div>
              </div>
              <Link href="/patents" className="text-center hover:scale-105 transition-transform duration-200 cursor-pointer group">
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-[#FF9800] transition-colors">18</div>
                <div className="text-sm text-[#FF9800] group-hover:text-white transition-colors">Patents Filed</div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Broader Areas - CIRD theme */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">Domains</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A237E] mt-2 mb-4">
              Broader Areas
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-[#FF9800] to-[#1A237E]" />
            <p className="text-lg text-[#37474F] max-w-3xl mx-auto mt-4 leading-relaxed">
              Our research spans across multiple domains, addressing critical challenges in industry and technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {broaderAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <Card className="bg-white border-slate-200 hover:border-[#1A237E]/30 transition-all duration-300 group h-full shadow-sm hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 rounded-xl bg-[#1A237E] group-hover:scale-105 transition-transform duration-300">
                          <area.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <Badge className="bg-[#FF9800]/15 text-[#1A237E] border-[#FF9800]/40 mb-2">
                            {area.code}
                          </Badge>
                          <CardTitle className="text-xl text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
                            {area.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-[#FF9800]/15 text-[#1A237E] border-[#FF9800]/40">
                          {area.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Completed Projects - CIRD theme */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">Delivered</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A237E] mt-2 mb-4">
              Completed Projects
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-[#FF9800]" />
            <p className="text-lg text-[#37474F] max-w-3xl mx-auto mt-4 leading-relaxed">
              Successfully completed research projects under the MoU between JUET and JPVL.
            </p>
          </motion.div>

          <div className="space-y-6">
            {completedProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border-slate-200 hover:border-[#1A237E]/20 transition-all duration-300 shadow-sm hover:shadow-md">
                  <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <Badge className="bg-[#1A237E]/10 text-[#1A237E] border-[#1A237E]/30">
                        {project.id}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 border-green-300 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-[#1A237E] mb-4">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-[#1A237E] font-semibold mb-3">Project Team:</h4>
                      {project.team.map((member, memberIndex) => (
                        <div key={memberIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#FF9800] rounded-full shrink-0" />
                          <span className="text-[#37474F] text-sm">{member}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Projects - CIRD theme */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">Active</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A237E] mt-2 mb-4">
              Ongoing Projects
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-[#FF9800] to-[#1A237E]" />
            <p className="text-lg text-[#37474F] max-w-3xl mx-auto mt-4 leading-relaxed">
              Currently active research projects under the MoU between JUET and JPVL.
            </p>
          </motion.div>

          <div className="space-y-6">
            {ongoingProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border-slate-200 hover:border-[#1A237E]/20 transition-all duration-300 shadow-sm hover:shadow-md">
                  <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <Badge className="bg-[#1A237E]/10 text-[#1A237E] border-[#1A237E]/30">
                        {project.id}
                      </Badge>
                      <Badge className="bg-amber-100 text-amber-800 border-amber-300 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-[#1A237E] mb-4">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-[#1A237E] font-semibold mb-3">Project Team:</h4>
                      {project.team.map((member, memberIndex) => (
                        <div key={memberIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#FF9800] rounded-full shrink-0" />
                          <span className="text-[#37474F] text-sm">{member}</span>
                        </div>
                      ))}
                    </div>
                    {project.link && (
                      <div className="mt-6">
                        <Link href={project.link}>
                          <Button className="w-full bg-[#1A237E] text-white hover:bg-[#0D47A1] border-0 shadow-md">
                            Know More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinksSection
        eyebrow="Related Sections"
        title="Continue Exploring CIRD"
        description="Use these pages to drill down from project overviews into patents, labs, and deployment-focused systems."
        links={[
          {
            href: "/patents",
            title: "Patents and Designs",
            description: "Map research outcomes to registered IP and downloadable documents.",
          },
          {
            href: "/projects/ba03-pp-b",
            title: "CHP Monitoring Project",
            description: "Read the detailed implementation of the coal handling plant system.",
          },
          {
            href: "/projects/ba07-pp-a",
            title: "Early Warning System Project",
            description: "View the project page for EWS architecture and outcomes.",
          },
          {
            href: "/projects/ba07-pp-b",
            title: "Automatic Weather Station",
            description: "Explore weather monitoring and data collection initiatives.",
          },
          {
            href: "/entities/cdc",
            title: "Control Development Centre",
            description: "See the primary lab behind automation and monitoring development.",
          },
          {
            href: "/entities/mtl",
            title: "Mechanical Testing Lab",
            description: "Review testing and validation capabilities used across projects.",
          },
        ]}
      />

      {/* Patents Section - CIRD dark blue band */}
      <section className="py-16 sm:py-20 bg-[#1A237E]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Patents <span className="text-[#FF9800]">Granted</span>
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Intellectual property rights granted by IP India for our innovative research and development work.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {patents.map((patent, index) => {
                const patentLink = getPatentLink(patent);
                const isLinkable = patentLink !== null;

                const content = (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    whileHover={isLinkable ? { scale: 1.02, y: -2 } : {}}
                    className={`flex items-center p-3 rounded-lg border border-white/20 bg-white/5 transition-all ${
                      isLinkable ? "hover:border-[#FF9800]/60 hover:bg-white/10 cursor-pointer" : ""
                    }`}
                  >
                    <Award className="w-5 h-5 text-[#FF9800] mr-3 flex-shrink-0" />
                    <span className="text-white text-sm">{patent}</span>
                  </motion.div>
                );

                if (isLinkable && patentLink) {
                  return (
                    <Link key={index} href={patentLink}>
                      {content}
                    </Link>
                  );
                }
                return content;
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
