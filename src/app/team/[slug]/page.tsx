"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Award, GraduationCap, Briefcase, CheckCircle, Clock } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

// Team member detailed data
const teamMemberData: Record<string, any> = {
  "dhananjay-mishra": {
    name: "Dr. Dhananjay R. Mishra",
    designation: "Coordinator & Incharge of CIRD",
    department: "Associate Professor, Mechanical Engineering, JUET, Guna",
    image: "/assets/team/dhananjay-mishra.jpg",
    bio: "Dr. Dhananjay R. Mishra is an Associate Professor in the Mechanical Engineering Department at Jaypee University of Engineering & Technology (JUET), Guna, where he has been a faculty member since July 2012. His expertise lies in renewable energy, focusing on solar thermal technologies, heat transfer, and solar distillation.",
    education: "Ph.D. in Mechanical Engineering",
    experience: "Over 12 years of academic experience with previous positions at Disha Institute of Management & Technology, Shri Shankaracharya College of Engineering, and Rungta College of Engineering & Technology. Also served as Assistant Production Manager at Suprabha Industries Pvt. Ltd.",
    achievements: [
      "Excellence in Applied Research Award in Engineering and Mechanical Engineering (2023)",
      "Frequent reviewer and editor for international engineering and energy journals",
      "Numerous well-cited research articles and patents in solar distillation",
      "Active supervisor for Ph.D. and M.Tech. students"
    ],
    projects: [
      { id: "BA01/PP/A", title: "Bottom Ash Utilization in Mortar and Concrete", status: "completed" },
      { id: "BA02/PP/A", title: "Reduction in Cycle and Non-cycle Water Consumption", status: "completed" },
      { id: "BA03/PP/A", title: "DCS Upgradation", status: "completed" },
      { id: "BA05/PP/A", title: "Early Warning System", status: "completed" },
      { id: "BA01/PP/B", title: "Problems and Remedies of Bottom Ash Replacement with Sand", status: "ongoing" },
      { id: "BA01/PP/C", title: "Bottom Ash Replacement in Pavers and Bricks", status: "ongoing" },
      { id: "BA03/PP/B", title: "Monitoring & Control System for Coal Handling Plant (CHP)", status: "ongoing" },
      { id: "BA06/PP/A", title: "Conversion of JBTPP Sub-critical to Supercritical Unit", status: "ongoing" },
      { id: "BA08/PP/A", title: "SF-6 Gas Monitoring System (GIS)", status: "ongoing" },
      { id: "BA04/PP/A", title: "Conditional Monitoring Technologies", status: "ongoing" },
      { id: "BA07/PP/A", title: "Early Warning Systems (EWS)", status: "ongoing" },
      { id: "BA07/PP/B", title: "Automatic Weather Station (AWS)", status: "ongoing" },
      { id: "BA07/PP/C", title: "Automatic Public Warning System (APWS)", status: "ongoing" },
      { id: "BA09/PP/A", title: "Automatic Reservoir Monitoring and Control System (ARMAC) for VHPHEP", status: "ongoing" },
      { id: "BA09/PP/B", title: "Automatic Reservoir Monitoring and Control System (ARMAC) for Bina", status: "ongoing" }
    ],
    cirdRole: "As the Coordinator & Incharge of CIRD, Dr. Mishra manages multi-crore consultancy projects in collaboration with Jaypee Power Ventures Limited, bridging academic research with industrial applications. He leads strategic initiatives in renewable energy, waste utilization, and industrial automation, ensuring seamless coordination between academia and industry partners."
  },
  "amit-srivastava": {
    name: "Dr. Amit Kumar Srivastava",
    designation: "Coordinator of CIRD",
    department: "Assistant Professor (SG), Computer Science and Engineering, JUET, Guna",
    image: "/assets/team/amit-srivastava.jpg", // Correct
    bio: "Dr. Amit Kumar Srivastava is an Assistant Professor (SG) in the Department of Computer Science and Engineering at Jaypee University of Engineering and Technology (JUET), Guna. With over 12 years of academic experience, he specializes in Artificial Intelligence, Machine Learning, and Computational Intelligence.",
    education: "Ph.D. in Computer Science and Engineering from JUET, Guna | M.Tech in Information Security from MNNIT, Allahabad",
    experience: "Faculty member at JUET since 2012, teaching diverse subjects including Artificial Intelligence, Component-Based Software Engineering, Swarm Intelligence, Operating Systems, Database Management Systems, Soft Computing, and Computational Intelligence.",
    achievements: [
      "Published over 150 design applications and holds three utility patents in Robotics and Artificial Intelligence",
      "Certification in Intellectual Property Rights from WIPO, Geneva",
      "Published several research papers in national and international journals and conferences",
      "Active member of technical program committees for various reputed journals and Scopus-indexed conferences",
      "Successfully guided three M.Tech research scholars",
      "Currently supervising one Ph.D. scholar working on automation of self-driving cars"
    ],
    projects: [
      { id: "BA03/PP/A", title: "DCS Upgradation", status: "completed" },
      { id: "BA03/PP/B", title: "Monitoring & Control System for Coal Handling Plant (CHP)", status: "ongoing" },
      { id: "BA08/PP/A", title: "SF-6 Gas Monitoring System (GIS)", status: "ongoing" },
      { id: "BA07/PP/A", title: "Early Warning Systems (EWS)", status: "ongoing" },
      { id: "BA07/PP/B", title: "Automatic Weather Station (AWS)", status: "ongoing" },
      { id: "BA07/PP/C", title: "Automatic Public Warning System (APWS)", status: "ongoing" },
      { id: "BA09/PP/A", title: "Automatic Reservoir Monitoring and Control System (ARMAC) for VHPHEP", status: "ongoing" },
      { id: "BA09/PP/B", title: "Automatic Reservoir Monitoring and Control System (ARMAC) for Bina", status: "ongoing" }
    ],
    cirdRole: "As Coordinator of CIRD, Dr. Srivastava leads automation and intelligent systems projects, focusing on early warning systems, weather monitoring, and industrial control systems. He provides development support in industrial automation using Siemens products and conducts training workshops on Python Programming, Machine Learning, and Artificial Intelligence."
  },
  "pankaj-dumka": {
    name: "Dr. Pankaj Dumka",
    designation: "Assistant Professor (SG), Mechanical Engineering",
    department: "JUET, Guna",
    image: "/assets/team/pankaj-dumka.png",
    bio: "Dr. Pankaj Dumka is an accomplished academician and researcher in the Department of Mechanical Engineering at Jaypee University of Engineering & Technology (JUET), Guna. With over a decade of teaching and research experience, he specializes in Solar Thermal Applications, Heat Transfer, Thermodynamics, Fluid Mechanics, and Numerical Methods.",
    education: "Ph.D. in Mechanical Engineering from JUET, Guna (2021) | M.Tech in Fluid and Thermal Sciences from IIT Kanpur (2010) | B.Tech in Mechanical Engineering from Inderprastha Engineering College, Ghaziabad (2007)",
    experience: "Extensive research integrating experimental, computational, and mathematical programming approaches to address complex problems in thermal and fluid sciences. Strong proponent of scientific computing, employing Python extensively for modeling, simulation, and numerical problem-solving.",
    achievements: [
      "More than 80 publications in reputed SCI, Scopus-indexed journals including Desalination, Energy, Applied Thermal Engineering, Solar Energy",
      "Author of two books: Numerical Methods Using Python (2022) and Basics of C for Engineers (2023)",
      "Multiple patents in solar distillation and irrigation technologies",
      "Editor of the Journal of Basic & Applied Sciences",
      "Active reviewer for leading international journals including Energy Conversion and Management, Desalination, Applied Thermal Engineering"
    ],
    projects: [
      { id: "BA02/PP/A", title: "Reduction in Cycle and Non-cycle Water Consumption", status: "completed" },
      { id: "BA06/PP/A", title: "Conversion of JBTPP Sub-critical to Supercritical Unit", status: "ongoing" }
    ],
    cirdRole: "Dr. Dumka contributes to CIRD projects focusing on power plant optimization, water consumption reduction, and thermal system efficiency. His expertise in computational methods and thermal sciences enables innovative solutions for industrial applications, particularly in power generation and resource optimization."
  },
  "gaurav-saxena": {
    name: "Dr. Gaurav Saxena",
    designation: "Assistant Professor (SG), Computer Science and Engineering",
    department: "JUET, Guna",
    image: "/assets/team/gaurav-saxena.png",
    bio: "Dr. Gaurav Saxena is an Assistant Professor (Senior Grade) in the Department of Computer Science and Engineering at Jaypee University of Engineering & Technology (JUET), Guna. With over 20 years of academic experience, he specializes in Digital Image Processing, Deep Learning, and Computer Networks.",
    education: "Ph.D. in Digital Image Processing using Deep Learning from MP-State Technological University (RGPV), Bhopal | M.Tech in Electronics & Communication from NIT, Kurukshetra | B.E in Electronics Engineering from RGPV, Bhopal",
    experience: "Joined JUET in 2008 and transitioned to the Computer Science department in 2017. Has supervised multiple postgraduate and undergraduate theses in Computer Science and Electronics Engineering. Currently supervising 2 Ph.D. scholars.",
    achievements: [
      "Published over 25+ research papers in reputed SCI/Scopus/UGC-indexed journals and conferences",
      "Member of various professional bodies like IEEE, IETE, IAENG, IACSIT",
      "Active reviewer and editorial board member for various national and international journals and conferences"
    ],
    projects: [
      { id: "BA03/PP/A", title: "DCS Upgradation", status: "completed" },
      { id: "BA04/PP/A", title: "Conditional Monitoring Technologies", status: "ongoing" }
    ],
    cirdRole: "Dr. Saxena contributes to CIRD's automation and monitoring projects, focusing on condition monitoring technologies and distributed control systems. His expertise in image processing and deep learning enables advanced diagnostic and monitoring solutions for industrial applications."
  },
  "dharmendra-shukla": {
    name: "Dr. Dharmendra Kumar Shukla",
    designation: "Assistant Professor (SG), Civil Engineering",
    department: "JUET, Guna",
    image: "/assets/team/dk-shukla.png", // File is named dk-shukla.png
    bio: "Dr. Dharmendra Kumar Shukla is an Assistant Professor (SG) in the Department of Civil Engineering at Jaypee University of Engineering & Technology (JUET), Guna. His research focuses on Geotechnical Engineering and Cement and Concrete Technology, with particular expertise in sustainable construction materials.",
    education: "Ph.D. in Civil Engineering from JUET, Guna | M.Tech in Geotechnical Engineering from MNNIT, Allahabad | B.E in Civil Engineering from Madhav Institute of Technology and Science, Gwalior",
    experience: "Extensive research in sustainable utilization of industrial waste in construction materials. Successfully supervised three Ph.D. dissertations and completed two research projects on utilization of recycled materials and bottom ash in concrete.",
    achievements: [
      "Published more than 20 research papers in reputed journals and conferences",
      "Successfully supervised 3 Ph.D. dissertations",
      "Completed research projects on Utilization of Recycled Sand from Construction and Demolition Waste and Bottom Ash as Replacement of Fine Aggregate",
      "Editorial Board Member of the JUET Research Journal of Science and Technology",
      "Active organizer, Technical Program Committee member, and reviewer for various conferences and workshops"
    ],
    projects: [
      { id: "BA01/PP/A", title: "Climate Control Methodology, Bottom Ash (BA) Utilization in Mortar and Concrete", status: "completed" },
      { id: "BA01/PP/B", title: "Problems and Remedies of Bottom Ash Replacement with Sand", status: "ongoing" },
      { id: "BA01/PP/C", title: "Bottom Ash Replacement in Pavers and Bricks", status: "ongoing" }
    ],
    cirdRole: "Dr. Shukla leads CIRD's sustainable construction materials research, focusing on bottom ash utilization in concrete, mortar, pavers, and bricks. His work enables the power sector to convert waste into valuable construction materials, contributing to circular economy and environmental sustainability. He also leads the MTL Lab activities."
  },
  "anshika-sharma": {
    name: "Er. Anshika Sharma",
    designation: "Software Development Engineer I (SDE1)",
    department: "Control Development Centre, CIRD",
    image: "/assets/team/anshika-sharma.jpeg",
    bio: "Er. Anshika Sharma is a Software Development Engineer I (SDE1) at the Control Development Centre (CDC) of CIRD. She holds a B.Tech degree in Computer Science and Engineering from Jaypee University of Engineering and Technology (JUET), Guna.",
    education: "B.Tech in Computer Science and Engineering from JUET, Guna",
    experience: "Actively involved in research and development projects under the MoU between JUET and JPVL, contributing to intelligent monitoring and alert systems for disaster preparedness and environmental data automation.",
    achievements: [
      "Specializes in design and implementation of intelligent monitoring systems",
      "Contributes to disaster preparedness and environmental data automation solutions"
    ],
    projects: [
      { id: "BA07/PP/A", title: "Early Warning Systems (EWS)", status: "ongoing" },
      { id: "BA07/PP/B", title: "Automatic Weather Station (AWS)", status: "ongoing" }
    ],
    cirdRole: "As part of the CDC team, Er. Anshika Sharma focuses on developing advanced computing solutions for early warning systems and automatic weather stations. Her work enhances disaster preparedness and provides real-time environmental monitoring capabilities for hydro stations and power plants."
  },
  "nitesh-pandey": {
    name: "Er. Nitesh Pandey",
    designation: "Software Development Engineer I (SDE-I)",
    department: "Control Development Centre, CIRD, JUET Guna",
    image: "/assets/team/nitesh-pandey.png",
    bio: "Er. Nitesh Pandey is a Software Development Engineer I (SDE-I) at the Control Development Centre (CDC) of CIRD, JUET Guna. He specializes in research and development projects focused on automation, artificial intelligence, and industrial monitoring systems. His expertise spans system design, robotics, SCADA systems, and predictive modeling.",
    education: "B.Tech in Engineering from JUET, Guna",
    experience: "Working on cutting-edge research and development projects in automation, AI, and industrial monitoring. Specializes in system design, robotics, SCADA systems, and predictive modeling for industrial applications.",
    achievements: [
      "Designed pavers and bricks with design patent preparation",
      "Developed robot prototype and software for conveyor monitoring with patent preparation",
      "AI-based weather forecasting for early warning systems",
      "AI model development for automatic prediction and warnings",
      "Designed structure of automatic weather station",
      "Developing GIS SCADA for SF6 gas monitoring using WinCC Unified"
    ],
    projects: [
      { id: "BA01/PP/C", title: "Bottom Ash Replacement in Pavers and Bricks", status: "ongoing" },
      { id: "BA03/PP/B", title: "Monitoring & Control System for Coal Handling Plant (CHP)", status: "ongoing" },
      { id: "BA05/PP/A", title: "Early Warning System", status: "completed" },
      { id: "BA07/PP/A", title: "Early Warning Systems (EWS)", status: "ongoing" },
      { id: "BA07/PP/B", title: "Automatic Weather Station (AWS)", status: "ongoing" },
      { id: "BA08/PP/A", title: "SF-6 Gas Monitoring System (GIS)", status: "ongoing" }
    ],
    cirdRole: "Er. Nitesh Pandey plays a crucial role in CIRD's automation and intelligent systems development. His work in robotics, SCADA systems, and AI-based predictive modeling directly contributes to enhancing industrial monitoring, safety, and operational efficiency. He is actively involved in patent development for innovative solutions in industrial automation and material design."
  },
  "shashwat-shukla": {
    name: "Er. Shashwat Shukla",
    designation: "Graduate Engineer Trainee (GET)",
    department: "Control Development Centre, CIRD, JUET Guna",
    image: "/assets/team/shashwat-shukla.jpg",
    bio: "Er. Shashwat Shukla is a Graduate Engineer Trainee (GET) at the Control Development Centre (CDC) of CIRD, JUET Guna. He holds a B.Tech degree in Electronics and Communication Engineering (2025). His expertise lies in IoT, Industrial Automation, Embedded Systems, and VLSI design, contributing to advanced monitoring and control systems for industrial applications.",
    education: "B.Tech in Electronics and Communication Engineering, JUET Guna (2025)",
    experience: "Specializing in IoT solutions, industrial automation, embedded systems development, and VLSI design. Actively involved in developing monitoring and control systems for power plants and industrial facilities.",
    achievements: [
      "Expertise in IoT-based monitoring and control systems",
      "Specialization in Industrial Automation and SCADA systems",
      "Embedded Systems development for real-time applications",
      "VLSI design for custom integrated circuits"
    ],
    projects: [
      { id: "BA03/PP/B", title: "Monitoring & Control System for Coal Handling Plant (CHP)", status: "ongoing" },
      { id: "BA08/PP/A", title: "SF-6 Gas Monitoring System (GIS)", status: "ongoing" },
      { id: "BA07/PP/A", title: "Early Warning Systems (EWS)", status: "ongoing" },
      { id: "BA07/PP/B", title: "Automatic Weather Station (AWS)", status: "ongoing" },
      { id: "BA09/PP/B", title: "Automatic Reservoir Monitoring and Control System (ARMAC) for Bina", status: "ongoing" }
    ],
    cirdRole: "As a Graduate Engineer Trainee at CDC, Er. Shashwat Shukla contributes to CIRD's industrial automation and monitoring projects. His expertise in IoT, embedded systems, and VLSI design enables the development of advanced sensing, monitoring, and control solutions for power plants and industrial facilities. He plays a key role in implementing real-time monitoring systems for coal handling plants, gas monitoring, early warning systems, and automatic weather stations."
  }
};

// Profile Image Component
function ProfileImage({ member }: { member: any }) {
  const initials = member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2);
  
  // Try alternative extensions if main image fails
  const getAlternativePaths = (originalPath: string): string[] => {
    const basePath = originalPath.replace(/\.(jpg|jpeg|png)$/i, '');
    return [
      originalPath,
      `${basePath}.jpg`,
      `${basePath}.jpeg`,
      `${basePath}.png`
    ].filter((path, index, arr) => arr.indexOf(path) === index); // Remove duplicates
  };

  const alternativePaths = getAlternativePaths(member.image);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (currentPathIndex < alternativePaths.length - 1) {
      setCurrentPathIndex(prev => prev + 1);
    } else {
      setImageError(true);
    }
  };

  const currentImagePath = alternativePaths[currentPathIndex] || member.image;

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
      <div className="absolute inset-0 rounded-full bg-white/10 border-4 border-white/20"></div>
      <div className="relative w-full h-full rounded-full overflow-hidden">
        {!imageError ? (
          <Image
            key={currentImagePath}
            src={currentImagePath}
            alt={member.name}
            fill
            className="object-cover"
            sizes="256px"
            unoptimized
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <span className="text-white text-4xl font-bold">{initials}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TeamMemberPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const member = teamMemberData[slug];

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Team Member Not Found</h1>
          <Link href="/team">
            <Button className="bg-white text-black hover:bg-gray-200">
              Back to Team
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const completedProjects = member.projects.filter((p: any) => p.status === "completed");
  const ongoingProjects = member.projects.filter((p: any) => p.status === "ongoing");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="container mx-auto px-8 md:px-16 relative z-10">
          <Link href="/team">
            <Button variant="ghost" className="mb-6 text-white hover:text-gray-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Team
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-8 items-center md:items-start"
          >
            <ProfileImage member={member} />
            
            <div className="flex-1 text-center md:text-left">
              <Badge className="mb-4 bg-white/95 backdrop-blur-md text-black border border-white/20 px-4 py-1">
                {member.designation}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {member.name}
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {member.department}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20 mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Briefcase className="w-8 h-8" />
              Biography
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              {member.bio}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </h3>
                <p className="text-gray-300">{member.education}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Experience
                </h3>
                <p className="text-gray-300">{member.experience}</p>
              </div>
            </div>

            {member.achievements && member.achievements.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Key Achievements</h3>
                <ul className="space-y-2">
                  {member.achievements.map((achievement: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* CIRD Role Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20 mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Role at CIRD</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {member.cirdRole}
            </p>
          </motion.div>

          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20"
          >
            <h2 className="text-3xl font-bold text-white mb-6">CIRD Projects</h2>
            
            {completedProjects.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                  Completed Projects
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {completedProjects.map((project: any) => (
                    <Card key={project.id} className="bg-white/5 border-white/10">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-white/10 text-white border-white/20">
                            {project.id}
                          </Badge>
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                            Completed
                          </Badge>
                        </div>
                        <CardTitle className="text-white mt-2">{project.title}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {ongoingProjects.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-white" />
                  Ongoing Projects
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {ongoingProjects.map((project: any) => (
                    <Card key={project.id} className="bg-white/5 border-white/10">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-white/10 text-white border-white/20">
                            {project.id}
                          </Badge>
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            Ongoing
                          </Badge>
                        </div>
                        <CardTitle className="text-white mt-2">{project.title}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
