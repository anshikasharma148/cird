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
  role: "coordination" | "technical" | "cdc" | "nodal";
  slug: string;
  hasDetailPage: boolean;
}

const teamMembers: TeamMember[] = [
  // Coordination Committee
  {
    id: "dhananjay-mishra",
    name: "Dr. Dhananjay R. Mishra",
    designation: "Member",
    department: "Associate Professor, MECH, JUET, Guna",
    role: "coordination",
    slug: "dhananjay-mishra",
    hasDetailPage: true
  },
  {
    id: "amit-srivastava",
    name: "Dr. Amit Kumar Srivastava",
    designation: "Member",
    department: "Assistant Professor (SG), CSE, JUET, Guna",
    role: "coordination",
    slug: "amit-srivastava",
    hasDetailPage: true
  },
  {
    id: "pankaj-dumka",
    name: "Dr. Pankaj Dumka",
    designation: "Member",
    department: "Assistant Professor (SG), MECH, JUET, Guna",
    role: "coordination",
    slug: "pankaj-dumka",
    hasDetailPage: true
  },
  {
    id: "gaurav-saxena",
    name: "Dr. Gaurav Saxena",
    designation: "Member",
    department: "Assistant Professor (SG), CSE, JUET, Guna",
    role: "coordination",
    slug: "gaurav-saxena",
    hasDetailPage: true
  },
  {
    id: "dharmendra-shukla",
    name: "Dr. Dharmendra Kumar Shukla",
    designation: "Member",
    department: "Assistant Professor (SG), Civil, JUET, Guna",
    role: "coordination",
    slug: "dharmendra-shukla",
    hasDetailPage: true
  },
  // Technical Professional Consultant
  {
    id: "manoj-dubey",
    name: "Dr. Manoj Dubey",
    designation: "Assistant Professor (SG), MECH",
    department: "JUET, Guna",
    role: "technical",
    slug: "manoj-dubey",
    hasDetailPage: false
  },
  {
    id: "rohit-mishra",
    name: "Dr. Rohit Mishra",
    designation: "Assistant Professor (SG), MECH",
    department: "JUET, Guna",
    role: "technical",
    slug: "rohit-mishra",
    hasDetailPage: false
  },
  {
    id: "neeraj-jain",
    name: "Dr. Neeraj Jain",
    designation: "Faculty",
    department: "JIIT, Noida",
    role: "technical",
    slug: "neeraj-jain",
    hasDetailPage: false
  },
  {
    id: "vivek-singh",
    name: "Dr. Vivek Kumar Singh",
    designation: "Faculty",
    department: "JIIT, Noida",
    role: "technical",
    slug: "vivek-singh",
    hasDetailPage: false
  },
  {
    id: "pmv-subba-rao",
    name: "Prof. PMV Subba Rao",
    designation: "Professor",
    department: "IIT, Delhi",
    role: "technical",
    slug: "pmv-subba-rao",
    hasDetailPage: false
  },
  // CDC Team
  {
    id: "dhananjay-mishra-cdc",
    name: "Dr. Dhananjay R. Mishra",
    designation: "Coordinator of CDC",
    department: "Associate Professor, MECH, JUET, Guna",
    role: "cdc",
    slug: "dhananjay-mishra",
    hasDetailPage: true
  },
  {
    id: "amit-srivastava-cdc",
    name: "Dr. Amit Kumar Srivastava",
    designation: "Co-coordinator of CDC",
    department: "Assistant Professor (SG), CSE, JUET, Guna",
    role: "cdc",
    slug: "amit-srivastava",
    hasDetailPage: true
  },
  {
    id: "anshika-sharma",
    name: "Er. Anshika Sharma",
    designation: "Software Development Engineer I (SDE1)",
    department: "CDC, CIRD",
    role: "cdc",
    slug: "anshika-sharma",
    hasDetailPage: true
  },
  {
    id: "shashwat-shukla",
    name: "Er. Shashwat Shukla",
    designation: "Graduate Engineer Trainee (GET)",
    department: "CDC, CIRD, JUET Guna",
    role: "cdc",
    slug: "shashwat-shukla",
    hasDetailPage: true
  },
  {
    id: "nitesh-pandey",
    name: "Er. Nitesh Pandey",
    designation: "Software Development Engineer I (SDE-I)",
    department: "CDC, CIRD, JUET Guna",
    role: "cdc",
    slug: "nitesh-pandey",
    hasDetailPage: true
  },
  // Nodal Officers of JPVL
  {
    id: "nadeem-ahmed",
    name: "Sh. Nadeem Ahmed",
    designation: "",
    department: "JNSTPP, JPVL",
    role: "nodal",
    slug: "nadeem-ahmed",
    hasDetailPage: false
  },
  {
    id: "ishtiaque-ahmed",
    name: "Shri Ishtiaque Ahmed",
    designation: "",
    department: "JBTPP, JPVL",
    role: "nodal",
    slug: "ishtiaque-ahmed",
    hasDetailPage: false
  },
  {
    id: "rakesh-singh",
    name: "Shri Rakesh K. Singh",
    designation: "",
    department: "JBTPP, JPVL",
    role: "nodal",
    slug: "rakesh-singh",
    hasDetailPage: false
  },
  {
    id: "hs-saini",
    name: "Shri H. S. Saini",
    designation: "",
    department: "JBTPP, JPVL",
    role: "nodal",
    slug: "hs-saini",
    hasDetailPage: false
  },
  {
    id: "ashok-singh",
    name: "Shri Ashok Kumar Singh",
    designation: "",
    department: "JNSTPP, JPVL",
    role: "nodal",
    slug: "ashok-singh",
    hasDetailPage: false
  },
  {
    id: "navin-tinguria",
    name: "Shri Navin Tinguria",
    designation: "",
    department: "JNSTPP, JPVL",
    role: "nodal",
    slug: "navin-tinguria",
    hasDetailPage: false
  },
  {
    id: "balachandran",
    name: "Balachandran M.",
    designation: "",
    department: "JPVL",
    role: "nodal",
    slug: "balachandran",
    hasDetailPage: false
  },
  {
    id: "amit-jauhari",
    name: "Sh. Amit Jauhari",
    designation: "",
    department: "HQ, JPVL",
    role: "nodal",
    slug: "amit-jauhari",
    hasDetailPage: false
  },
  {
    id: "vs-yadav",
    name: "Sh. V. S. Yadav",
    designation: "",
    department: "VPHEP, JPVL",
    role: "nodal",
    slug: "vs-yadav",
    hasDetailPage: false
  },
  {
    id: "mkv-rama-rao",
    name: "Sh. M.K.V Rama Rao",
    designation: "CTO",
    department: "JPVL",
    role: "nodal",
    slug: "mkv-rama-rao",
    hasDetailPage: false
  },
  {
    id: "arup-ghosh",
    name: "Sh. Arup Kumar Ghosh",
    designation: "",
    department: "JBTPP, JPVL",
    role: "nodal",
    slug: "arup-ghosh",
    hasDetailPage: false
  },
];

export default function TeamPage() {
  const coordinationCommittee = teamMembers.filter(m => m.role === "coordination");
  const technicalConsultants = teamMembers.filter(m => m.role === "technical");
  const cdcTeam = teamMembers.filter(m => m.role === "cdc");
  const nodalOfficers = teamMembers.filter(m => m.role === "nodal");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 relative overflow-hidden">
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
              <Badge className="mb-6 bg-blue-600 text-white border border-blue-500 px-6 py-2 shadow-lg shadow-blue-900/30">
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

      {/* Coordination Committee Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950">
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
                Coordination Committee
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leading CIRD's vision and strategic direction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {coordinationCommittee.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Professional Consultant Section */}
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
                Technical Professional Consultant
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Expert consultants supporting CIRD projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {technicalConsultants.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CDC Team Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950">
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

      {/* Nodal Officers of JPVL Section */}
      {nodalOfficers.length > 0 && (
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
                  Nodal Officers of JPVL
                </h2>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Key collaborators from JPVL supporting CIRD projects
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {nodalOfficers.map((member, index) => (
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
    "dhananjay-mishra": ["/assets/team/dhananjay-mishra.jpg"],
    "amit-srivastava": ["/assets/team/amit-srivastava.jpg"],
    "anshika-sharma": ["/assets/team/anshika-sharma.jpeg"],
    "dharmendra-shukla": ["/assets/team/dk-shukla.png"],
    "gaurav-saxena": ["/assets/team/gaurav-saxena.png"],
    "manoj-dubey": ["/assets/team/manoj-dubey.jpg"],
    "nitesh-pandey": ["/assets/team/nitesh-pandey.png"],
    "pankaj-dumka": ["/assets/team/pankaj-dumka.png"],
    "pmv-subba-rao": ["/assets/team/pmv-subbarao.jpeg"],
    "rohit-mishra": ["/assets/team/rohit-mishra.png"],
    "shashwat-shukla": ["/assets/team/shashwat-shukla.jpg"],
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
      <Card className="bg-white border-blue-200 hover:border-blue-400 transition-all duration-300 h-full shadow-lg hover:shadow-xl">
        <CardHeader className="text-center">
          <div className="relative w-48 h-48 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-blue-50 border-2 border-blue-200"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden">
              {!imageError && currentImagePath ? (
                <Image
                  src={currentImagePath}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="192px"
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
                <div className="w-full h-full flex items-center justify-center bg-blue-100">
                  <span className="text-blue-900 text-3xl font-bold">{initials}</span>
                </div>
              )}
            </div>
          </div>
          <CardTitle className="text-xl text-slate-900 mb-2">{member.name}</CardTitle>
          {member.designation && (
            <p className="text-slate-600 text-sm mb-1">{member.designation}</p>
          )}
          <p className="text-slate-500 text-xs">{member.department}</p>
        </CardHeader>
        <CardContent>
          {member.hasDetailPage && (
            <Link href={`/team/${member.slug}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 px-4 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2 shadow-md">
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

