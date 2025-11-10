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
  ExternalLink,
  CheckCircle,
  Clock,
  Award
} from "lucide-react";
import Link from "next/link";
import PageLoader from "@/components/page-loader";

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

  return (
    <>
      <PageLoader pageType="research" />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
        
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
            >
              <Badge className="mb-6 bg-blue-600 text-white border border-blue-500 px-6 py-2 shadow-lg shadow-blue-900/30">
                Research & Development
              </Badge>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Our <span className="text-white">Research</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Cutting-edge research and development across multiple technological domains, 
              driving innovation and creating practical solutions for industry challenges.
            </p>
            
            {/* Project Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">14</div>
                <div className="text-sm text-gray-400">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">4</div>
                <div className="text-sm text-gray-400">Completed Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">11</div>
                <div className="text-sm text-gray-400">Ongoing Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">18</div>
                <div className="text-sm text-gray-400">Patents Filed</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Broader Areas */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Broader <span className="text-white">Areas</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Our research spans across multiple domains, addressing critical challenges in industry and technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {broaderAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white border-blue-200 hover:border-blue-400 transition-all duration-300 group h-full shadow-lg hover:shadow-xl">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-3 rounded-xl bg-blue-600 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <area.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <Badge className="bg-blue-100 text-blue-900 border-blue-300 mb-2">
                            {area.code}
                          </Badge>
                          <CardTitle className="text-xl text-slate-900 group-hover:text-blue-700 transition-colors">
                            {area.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-blue-100 text-blue-900 border-blue-300">
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

      {/* Completed Projects */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Completed <span className="text-white">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Successfully completed research projects under the MoU between JUET and JPVL.
            </p>
          </motion.div>

          <div className="space-y-8">
            {completedProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white border-blue-200 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-blue-100 text-blue-900 border-blue-300">
                          {project.id}
                        </Badge>
                        <Badge className="bg-green-100 text-green-900 border-green-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {project.status}
                        </Badge>
                      </div>
                    <CardTitle className="text-xl text-slate-900 mb-4">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-slate-900 font-semibold mb-3">Project Team:</h4>
                      {project.team.map((member, memberIndex) => (
                        <div key={memberIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          <span className="text-slate-700 text-sm">{member}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ongoing <span className="text-white">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Currently active research projects under the MoU between JUET and JPVL.
            </p>
          </motion.div>

          <div className="space-y-8">
            {ongoingProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white border-blue-200 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-blue-100 text-blue-900 border-blue-300">
                          {project.id}
                        </Badge>
                        <Badge className="bg-amber-100 text-amber-900 border-amber-300 flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {project.status}
                        </Badge>
                      </div>
                    <CardTitle className="text-xl text-slate-900 mb-4">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-slate-900 font-semibold mb-3">Project Team:</h4>
                      {project.team.map((member, memberIndex) => (
                        <div key={memberIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          <span className="text-slate-700 text-sm">{member}</span>
                        </div>
                      ))}
                    </div>
                    {project.link && (
                      <div className="mt-6">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link href={project.link}>
                            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 border border-blue-500 shadow-lg shadow-blue-900/30">
                              Know More
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </motion.div>
                      </div>
                    )}
                  </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Patents Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Patents <span className="text-white">Granted</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Intellectual property rights granted by IP India for our innovative research and development work.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patents.map((patent, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all shadow-md hover:shadow-lg"
                >
                  <Award className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{patent}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}