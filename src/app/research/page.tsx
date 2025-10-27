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

export default function ResearchPage() {
  const broaderAreas = [
    {
      code: "BA01",
      title: "Climate control Methodology, Bottom Ash (BA) Utilization in Mortar and Concrete",
      icon: Target,
      color: "from-cyan-500 to-blue-500",
      status: "Active"
    },
    {
      code: "BA02", 
      title: "Reduction in Cycle and non-cycle water consumption",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      status: "Active"
    },
    {
      code: "BA03",
      title: "(DCS) & (CHP) Cost of power reduction- specific areas and methodologies/technologies",
      icon: Cpu,
      color: "from-purple-500 to-pink-500",
      status: "Active"
    },
    {
      code: "BA04",
      title: "Conditional Monitoring Technologies",
      icon: CircuitBoard,
      color: "from-yellow-500 to-orange-500",
      status: "Active"
    },
    {
      code: "BA05",
      title: "Early Warning System",
      icon: Database,
      color: "from-red-500 to-pink-500",
      status: "Active"
    },
    {
      code: "BA06",
      title: "Studies on possible conversion of JBTPP sub-critical supercritical unit",
      icon: Microscope,
      color: "from-indigo-500 to-purple-500",
      status: "Active"
    },
    {
      code: "Software Development & AI",
      title: "Advanced software engineering, AI-driven development, and intelligent systems",
      icon: Code,
      color: "from-cyan-500 to-blue-500",
      status: "Active"
    },
    {
      code: "Robotics & Industrial Automation",
      title: "Autonomous systems, robotic automation, and intelligent control mechanisms",
      icon: Bot,
      color: "from-purple-500 to-pink-500",
      status: "Active"
    },
    {
      code: "IoT & Embedded Systems",
      title: "Internet of Things, sensor networks, and embedded system design",
      icon: CircuitBoard,
      color: "from-indigo-500 to-purple-500",
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
      title: "Utilization of Bottom Ash in Concrete and Mortar as a Replacement for Fine Aggregate Using Portland Pozzolana Cement (PPC) as Binder",
      team: [
        "Dr. D. K. Shukla, Assistant Professor (SG), Civil, JUET, Guna",
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Sh. Nadeem Ahmed, Nodal officers, JNSTPP, JPVL",
        "Shri Ishtiaque Ahmed, Nodal officers, JBTPP, JPVL"
      ],
      status: "Ongoing"
    },
    {
      id: "BA01/PP/C",
      title: "Utilization of Bottom Ash in Pavers and Bricks as a Replacement for Fine Aggregate Using Portland Pozzolana Cement (PPC) as Binder",
      team: [
        "Dr. D. K. Shukla, Assistant Professor (SG), Civil, JUET, Guna",
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Sh. Nadeem Ahmed, Nodal officers, JNSTPP, JPVL",
        "Shri Ishtiaque Ahmed, Nodal officers, JBTPP, JPVL"
      ],
      status: "Ongoing"
    },
    {
      id: "BA03/PP/B",
      title: "Monitoring and control system for the coal handling plant",
      team: [
        "Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna",
        "Dr. Amit Kumar Srivastava, Assistant Professor (SG), CSE, JUET, Guna",
        "Shri Rakesh K. Singh, Nodal officers, JBTPP, JPVL",
        "Shri Navin Tinguria, Nodal officers, JNSTPP, JPVL",
        "Balachandran M., Nodal officers, JPVL"
      ],
      status: "Ongoing"
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
      status: "Ongoing"
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
      status: "Ongoing"
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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
            <Badge className="mb-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 px-6 py-2">
              Research & Development
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Research</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Cutting-edge research and development across multiple technological domains, 
              driving innovation and creating practical solutions for industry challenges.
            </p>
            
            {/* Project Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">14</div>
                <div className="text-sm text-gray-400">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">4</div>
                <div className="text-sm text-gray-400">Completed Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">11</div>
                <div className="text-sm text-gray-400">Ongoing Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">18</div>
                <div className="text-sm text-gray-400">Patents Filed</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Broader Areas */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Broader <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Areas</span>
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
                <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 hover:border-purple-500/50 transition-all duration-300 group h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${area.color} group-hover:scale-110 transition-transform duration-300`}>
                        <area.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-2">
                          {area.code}
                        </Badge>
                        <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                          {area.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {area.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
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
              Completed <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
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
                <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 hover:border-green-500/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {project.id}
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-white mb-4">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold mb-3">Project Team:</h4>
                      {project.team.map((member, memberIndex) => (
                        <div key={memberIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                          <span className="text-gray-300 text-sm">{member}</span>
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

      {/* Ongoing Projects */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ongoing <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Projects</span>
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
                <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 hover:border-yellow-500/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        {project.id}
                      </Badge>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-white mb-4">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold mb-3">Project Team:</h4>
                      {project.team.map((member, memberIndex) => (
                        <div key={memberIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                          <span className="text-gray-300 text-sm">{member}</span>
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
              Patents <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Granted</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Intellectual property rights granted by IP India for our innovative research and development work.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-8 border border-slate-600"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patents.map((patent, index) => (
                <div key={index} className="flex items-center p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                  <Award className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{patent}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}