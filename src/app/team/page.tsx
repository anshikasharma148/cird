"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Users, Award, Building2, GraduationCap, ArrowRight } from "lucide-react";
import { useState } from "react";

// Team member data structure
interface TeamMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  image?: string;
  role: "coordinator" | "member" | "industry" | "cdc" | "mtl";
  projects: string[];
  slug: string;
  hasDetailPage: boolean;
}

const teamMembers: TeamMember[] = [
  // Coordinators
  {
    id: "dhananjay-mishra",
    name: "Dr. Dhananjay R. Mishra",
    designation: "Coordinator & Incharge of CIRD",
    department: "Associate Professor, MECH, JUET, Guna",
    role: "coordinator",
    projects: ["BA01/PP/A", "BA02/PP/A", "BA03/PP/A", "BA05/PP/A", "BA01/PP/B", "BA01/PP/C", "BA03/PP/B", "BA06/PP/A", "BA08/PP/A", "BA04/PP/A", "BA07/PP/A", "BA07/PP/B", "BA07/PP/C", "BA09/PP/A", "BA09/PP/B"],
    slug: "dhananjay-mishra",
    hasDetailPage: true
  },
  {
    id: "amit-srivastava",
    name: "Dr. Amit Kumar Srivastava",
    designation: "Coordinator of CIRD",
    department: "Assistant Professor (SG), CSE, JUET, Guna",
    role: "coordinator",
    projects: ["BA03/PP/A", "BA03/PP/B", "BA08/PP/A", "BA07/PP/A", "BA07/PP/B", "BA07/PP/C", "BA09/PP/A", "BA09/PP/B"],
    slug: "amit-srivastava",
    hasDetailPage: true
  },
  // CIRD Members
  {
    id: "pankaj-dumka",
    name: "Dr. Pankaj Dumka",
    designation: "Assistant Professor (SG), MECH",
    department: "JUET, Guna",
    role: "member",
    projects: ["BA02/PP/A", "BA06/PP/A"],
    slug: "pankaj-dumka",
    hasDetailPage: true
  },
  {
    id: "gaurav-saxena",
    name: "Dr. Gaurav Saxena",
    designation: "Assistant Professor (SG), CSE",
    department: "JUET, Guna",
    role: "member",
    projects: ["BA03/PP/A", "BA04/PP/A"],
    slug: "gaurav-saxena",
    hasDetailPage: true
  },
  {
    id: "dharmendra-shukla",
    name: "Dr. Dharmendra Kumar Shukla",
    designation: "Assistant Professor (SG), Civil",
    department: "JUET, Guna",
    role: "member",
    projects: ["BA01/PP/A", "BA01/PP/B", "BA01/PP/C"],
    slug: "dharmendra-shukla",
    hasDetailPage: true
  },
  {
    id: "manoj-dubey",
    name: "Dr. Manoj Dubey",
    designation: "Assistant Professor (SG), MECH",
    department: "JUET, Guna",
    role: "member",
    projects: ["BA02/PP/A"],
    slug: "manoj-dubey",
    hasDetailPage: false
  },
  {
    id: "rohit-mishra",
    name: "Dr. Rohit Mishra",
    designation: "Assistant Professor (SG), MECH",
    department: "JUET, Guna",
    role: "member",
    projects: ["BA04/PP/A"],
    slug: "rohit-mishra",
    hasDetailPage: false
  },
  {
    id: "neeraj-jain",
    name: "Dr. Neeraj Jain",
    designation: "Faculty",
    department: "JIIT, Noida",
    role: "member",
    projects: ["BA05/PP/A"],
    slug: "neeraj-jain",
    hasDetailPage: false
  },
  {
    id: "vivek-singh",
    name: "Dr. Vivek Kumar Singh",
    designation: "Faculty",
    department: "JIIT, Noida",
    role: "member",
    projects: ["BA05/PP/A"],
    slug: "vivek-singh",
    hasDetailPage: false
  },
  {
    id: "pmv-subba-rao",
    name: "Prof. PMV Subba Rao",
    designation: "Professor",
    department: "IIT, Delhi",
    role: "member",
    projects: ["BA06/PP/A"],
    slug: "pmv-subba-rao",
    hasDetailPage: false
  },
  // Industry Partners
  {
    id: "nadeem-ahmed",
    name: "Sh. Nadeem Ahmed",
    designation: "Nodal Officer",
    department: "JNSTPP, JPVL",
    role: "industry",
    projects: ["BA01/PP/A", "BA01/PP/B", "BA01/PP/C"],
    slug: "nadeem-ahmed",
    hasDetailPage: false
  },
  {
    id: "ishtiaque-ahmed",
    name: "Shri Ishtiaque Ahmed",
    designation: "Nodal Officer",
    department: "JBTPP, JPVL",
    role: "industry",
    projects: ["BA01/PP/A", "BA01/PP/B", "BA01/PP/C"],
    slug: "ishtiaque-ahmed",
    hasDetailPage: false
  },
  {
    id: "rakesh-singh",
    name: "Shri Rakesh K. Singh",
    designation: "Nodal Officer",
    department: "JBTPP, JPVL",
    role: "industry",
    projects: ["BA03/PP/B", "BA03/PP/A"],
    slug: "rakesh-singh",
    hasDetailPage: false
  },
  {
    id: "hs-saini",
    name: "Shri H. S. Saini",
    designation: "Nodal Officer",
    department: "JBTPP, JPVL",
    role: "industry",
    projects: ["BA02/PP/A"],
    slug: "hs-saini",
    hasDetailPage: false
  },
  {
    id: "ashok-singh",
    name: "Shri Ashok Kumar Singh",
    designation: "Nodal Officer",
    department: "JNSTPP, JPVL",
    role: "industry",
    projects: ["BA02/PP/A", "BA04/PP/A"],
    slug: "ashok-singh",
    hasDetailPage: false
  },
  {
    id: "navin-tinguria",
    name: "Shri Navin Tinguria",
    designation: "Nodal Officer",
    department: "JNSTPP, JPVL",
    role: "industry",
    projects: ["BA03/PP/A", "BA03/PP/B"],
    slug: "navin-tinguria",
    hasDetailPage: false
  },
  {
    id: "balachandran",
    name: "Balachandran M.",
    designation: "Nodal Officer",
    department: "JPVL",
    role: "industry",
    projects: ["BA03/PP/A", "BA03/PP/B"],
    slug: "balachandran",
    hasDetailPage: false
  },
  {
    id: "amit-jauhari",
    name: "Sh. Amit Jauhari",
    designation: "Nodal Officer",
    department: "HQ, JPVL",
    role: "industry",
    projects: ["BA05/PP/A", "BA08/PP/A", "BA07/PP/A", "BA07/PP/B", "BA07/PP/C", "BA09/PP/A", "BA09/PP/B"],
    slug: "amit-jauhari",
    hasDetailPage: false
  },
  {
    id: "vs-yadav",
    name: "Sh. V. S. Yadav",
    designation: "Nodal Officer",
    department: "VPHEP, JPVL",
    role: "industry",
    projects: ["BA08/PP/A", "BA07/PP/A", "BA07/PP/B", "BA07/PP/C", "BA09/PP/A", "BA09/PP/B"],
    slug: "vs-yadav",
    hasDetailPage: false
  },
  {
    id: "mkv-rama-rao",
    name: "Sh. M.K.V Rama Rao",
    designation: "CTO",
    department: "JPVL",
    role: "industry",
    projects: ["BA06/PP/A"],
    slug: "mkv-rama-rao",
    hasDetailPage: false
  },
  {
    id: "arup-ghosh",
    name: "Sh. Arup Kumar Ghosh",
    designation: "Nodal Officer",
    department: "JBTPP, JPVL",
    role: "industry",
    projects: ["BA04/PP/A"],
    slug: "arup-ghosh",
    hasDetailPage: false
  },
  // CDC Team
  {
    id: "anshika-sharma",
    name: "Er. Anshika Sharma",
    designation: "Software Development Engineer I (SDE1)",
    department: "CDC, CIRD",
    role: "cdc",
    projects: ["BA07/PP/A", "BA07/PP/B"],
    slug: "anshika-sharma",
    hasDetailPage: true
  },
  {
    id: "shashwat-shukla",
    name: "Er. Shashwat Shukla",
    designation: "Graduate Engineer Trainee (GET)",
    department: "CDC, CIRD, JUET Guna",
    role: "cdc",
    projects: ["BA03/PP/B", "BA08/PP/A", "BA07/PP/A", "BA07/PP/B", "BA09/PP/B"],
    slug: "shashwat-shukla",
    hasDetailPage: true
  },
  {
    id: "nitesh-pandey",
    name: "Er. Nitesh Pandey",
    designation: "Software Development Engineer I (SDE-I)",
    department: "CDC, CIRD, JUET Guna",
    role: "cdc",
    projects: ["BA01/PP/C", "BA03/PP/B", "BA05/PP/A", "BA07/PP/A", "BA07/PP/B", "BA08/PP/A"],
    slug: "nitesh-pandey",
    hasDetailPage: true
  },
];

export default function TeamPage() {
  const coordinators = teamMembers.filter(m => m.role === "coordinator");
  const members = teamMembers.filter(m => m.role === "member");
  const cdcTeam = teamMembers.filter(m => m.role === "cdc");
  const industryPartners = teamMembers.filter(m => m.role === "industry");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
              <Badge className="mb-6 bg-white/95 backdrop-blur-md text-black border border-white/20 px-6 py-2 shadow-lg shadow-white/10">
                Our Team
              </Badge>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Meet Our <span className="text-white">Team</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Dedicated professionals driving innovation and research excellence at CIRD
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coordinators Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Award className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Coordinators
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leading CIRD's vision and strategic direction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {coordinators.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CIRD Members Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                CIRD Members
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Faculty members contributing to research and development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CDC Team Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Control Development Centre Team
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Software development and automation specialists
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cdcTeam.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Industry Partners Section */}
      {industryPartners.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="container mx-auto px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Building2 className="w-8 h-8 text-white" />
                <h2 className="text-4xl md:text-6xl font-bold text-white">
                  Industry Partners
                </h2>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Key collaborators from JPVL supporting CIRD projects
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {industryPartners.map((member, index) => (
                <TeamMemberCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Image file mappings - handles different file extensions and special cases
const getImagePath = (slug: string): string[] => {
  const imageMap: Record<string, string[]> = {
    "amit-srivastava": ["/assets/team/amit-srivastava.jpg"],
    "anshika-sharma": ["/assets/team/anshika-sharma.jpeg"],
    "dharmendra-shukla": ["/assets/team/dk-shukla.png"],
    "gaurav-saxena": ["/assets/team/gaurav-saxena.png"],
    "manoj-dubey": ["/assets/team/manoj-dubey.jpg"],
    "nitesh-pandey": ["/assets/team/nitesh-pandey.png"],
    "pankaj-dumka": ["/assets/team/pankaj-dumka.png"],
    "pmv-subba-rao": ["/assets/team/pmv-subbarao.jpeg"],
    "rohit-mishra": ["/assets/team/rohit-mishra.png"],
  };
  
  // Return mapped paths or try common extensions
  if (imageMap[slug]) {
    return imageMap[slug];
  }
  
  // Fallback: try common extensions
  return [
    `/assets/team/${slug}.jpg`,
    `/assets/team/${slug}.jpeg`,
    `/assets/team/${slug}.png`,
  ];
};

// Team Member Card Component
function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  const imagePaths = getImagePath(member.slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  
  const currentImagePath = imagePaths[currentImageIndex] || imagePaths[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/30 transition-all duration-300 h-full shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-white/10">
        <CardHeader className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-white/10 border-2 border-white/20"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden">
              {!imageError && currentImagePath ? (
                <Image
                  src={currentImagePath}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                  unoptimized
                  onError={() => {
                    // Try next image path if available
                    if (currentImageIndex < imagePaths.length - 1) {
                      setCurrentImageIndex(currentImageIndex + 1);
                    } else {
                      setImageError(true);
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5">
                  <span className="text-white text-2xl font-bold">{initials}</span>
                </div>
              )}
            </div>
          </div>
          <CardTitle className="text-xl text-white mb-2">{member.name}</CardTitle>
          <p className="text-gray-300 text-sm mb-1">{member.designation}</p>
          <p className="text-gray-400 text-xs">{member.department}</p>
        </CardHeader>
        <CardContent>
          {member.projects.length > 0 && (
            <div className="mb-4">
              <p className="text-white text-sm font-semibold mb-2">Projects:</p>
              <div className="flex flex-wrap gap-1">
                {member.projects.slice(0, 3).map((project) => (
                  <Badge key={project} className="bg-white/10 text-white border-white/20 text-xs">
                    {project}
                  </Badge>
                ))}
                {member.projects.length > 3 && (
                  <Badge className="bg-white/10 text-white border-white/20 text-xs">
                    +{member.projects.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}
          {member.hasDetailPage && (
            <Link href={`/team/${member.slug}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2">
                  View Profile
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

