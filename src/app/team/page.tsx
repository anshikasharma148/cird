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
  role: "coordination" | "technical" | "cdc" | "mtl" | "nodal";
  slug: string;
  hasDetailPage: boolean;
}

const teamMembers: TeamMember[] = [
  // Coordination Committee
  {
    id: "dhananjay-mishra",
    name: "Dr. Dhananjay R. Mishra",
    designation: "Coordinator of CDC",
    department: "Associate Professor, MECH, JUET, Guna",
    role: "coordination",
    slug: "dhananjay-mishra",
    hasDetailPage: true
  },
  {
    id: "amit-srivastava",
    name: "Dr. Amit Kumar Srivastava",
    designation: "Co-coordinator of CDC",
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
    id: "mkv-rama-rao",
    name: "Sh. M.K.V Rama Rao",
    designation: "CTO",
    department: "JPVL",
    role: "nodal",
    slug: "mkv-rama-rao",
    hasDetailPage: false
  },
  {
    id: "nadeem-ahmad",
    name: "Sh. Nadeem Ahmed",
    designation: "",
    department: "JNSTPP, JPVL",
    role: "nodal",
    slug: "nadeem-ahmad",
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
    id: "arup-ghosh",
    name: "Sh. Arup Kumar Ghosh",
    designation: "",
    department: "JBTPP, JPVL",
    role: "nodal",
    slug: "arup-ghosh",
    hasDetailPage: false
  },
  // MTL Team
  {
    id: "dharmendra-shukla-mtl",
    name: "Dr. Dharmendra Kumar Shukla",
    designation: "",
    department: "Assistant Professor (SG), Civil, JUET, Guna",
    role: "mtl",
    slug: "dharmendra-shukla",
    hasDetailPage: true
  },
  {
    id: "rs-chauhan",
    name: "R.S. Chauhan",
    designation: "",
    department: "MTL, CIRD",
    role: "mtl",
    slug: "rs-chauhan",
    hasDetailPage: false
  },
  {
    id: "kk-purohit",
    name: "K.K. Purohit",
    designation: "",
    department: "MTL, CIRD",
    role: "mtl",
    slug: "kk-purohit",
    hasDetailPage: false
  },
  {
    id: "bhanu-pratap",
    name: "Bhanu Pratap Arya",
    designation: "",
    department: "MTL, CIRD",
    role: "mtl",
    slug: "bhanu-pratap",
    hasDetailPage: false
  },
  {
    id: "chanesh-verma",
    name: "Chanesh Verma",
    designation: "",
    department: "Lab Attendant, MTL, CIRD",
    role: "mtl",
    slug: "chanesh-verma",
    hasDetailPage: false
  },
];

export default function TeamPage() {
  const coordinationCommittee = teamMembers.filter(m => m.role === "coordination");
  const technicalConsultants = teamMembers.filter(m => m.role === "technical");
  const cdcTeam = teamMembers.filter(m => m.role === "cdc");
  const mtlTeam = teamMembers.filter(m => m.role === "mtl");
  const nodalOfficers = teamMembers.filter(m => m.role === "nodal");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero - CIRD theme, Team header #5D4037 (warm brown) */}
      <section className="pt-36 sm:pt-40 pb-16 sm:pb-20 bg-[#5D4037] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-60" />
        <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <Badge className="mb-6 bg-[#FF9800] text-white border-0 px-6 py-2 shadow-lg">
              Our Team
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Meet Our <span className="text-[#FF9800]">Team</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Dedicated professionals driving innovation and research excellence at CIRD
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coordination Committee */}
      <section id="coordination" className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">Leadership</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A237E] mt-2 mb-3 flex items-center justify-center gap-3">
              <Award className="w-8 h-8 text-[#FF9800]" />
              Coordination Committee
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-[#FF9800]" />
            <p className="text-base sm:text-lg text-[#37474F] max-w-2xl mx-auto mt-4">
              Leading CIRD's vision and strategic direction
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-6xl mx-auto">
            {coordinationCommittee.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Professional Consultants */}
      <section id="technical" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">Consultants</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A237E] mt-2 mb-3 flex items-center justify-center gap-3">
              <GraduationCap className="w-8 h-8 text-[#FF9800]" />
              Technical Professional Consultants
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-[#FF9800]" />
            <p className="text-base sm:text-lg text-[#37474F] max-w-2xl mx-auto mt-4">
              Expert consultants supporting CIRD projects
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-6xl mx-auto">
            {technicalConsultants.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CDC Team */}
      <section id="cdc" className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">CDC</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A237E] mt-2 mb-3 flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-[#FF9800]" />
              Control Development Centre Team
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-[#FF9800]" />
            <p className="text-base sm:text-lg text-[#37474F] max-w-2xl mx-auto mt-4">
              Software development and automation specialists
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-6xl mx-auto">
            {cdcTeam.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* MTL Team */}
      {mtlTeam.length > 0 && (
        <section id="mtl" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">MTL</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A237E] mt-2 mb-3 flex items-center justify-center gap-3">
                <Users className="w-8 h-8 text-[#FF9800]" />
                Mechanical Testing Lab Team
              </h2>
              <div className="mx-auto w-20 h-1 rounded-full bg-[#FF9800]" />
              <p className="text-base sm:text-lg text-[#37474F] max-w-2xl mx-auto mt-4">
                Professionals driving innovation at the Mechanical Testing Lab
              </p>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-6xl mx-auto">
              {mtlTeam.map((member, index) => (
                <TeamMemberCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nodal Officers of JPVL */}
      {nodalOfficers.length > 0 && (
        <section id="nodal" className="py-16 sm:py-20 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">Partners</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A237E] mt-2 mb-3 flex items-center justify-center gap-3">
                <Building2 className="w-8 h-8 text-[#FF9800]" />
                Nodal Officers of JPVL
              </h2>
              <div className="mx-auto w-20 h-1 rounded-full bg-[#FF9800]" />
              <p className="text-base sm:text-lg text-[#37474F] max-w-2xl mx-auto mt-4">
                Key collaborators from JPVL supporting CIRD projects
              </p>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-6xl mx-auto">
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
    "nitesh-pandey": ["/assets/team/nitesh-pandey.jpeg"],
    "pankaj-dumka": ["/assets/team/pankaj-dumka.png"],
    "pmv-subba-rao": ["/assets/team/pmv-subbarao.jpeg"],
    "rohit-mishra": ["/assets/team/rohit-mishra.png"],
    "shashwat-shukla": ["/assets/team/shashwat-shukla.jpeg"],
    "rs-chauhan": ["/assets/team/rs-chauhan.jpeg"],
    "kk-purohit": ["/assets/team/kk-purohit.jpeg"],
    "bhanu-pratap": ["/assets/team/bhanu-pratap.jpeg"],
    "nadeem-ahmad": ["/assets/team/nadeem-ahmad.jpeg"],
    "rakesh-singh": ["/assets/team/rakesh-singh.jpeg"],
    "chanesh-verma": ["/assets/team/chanesh-verma.jpeg"],
    "mkv-rama-rao": ["/assets/team/mkv-rama-rao.png"],
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

// Team Member Card Component - Enhanced with CDC styling
function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  const imagePaths = getImagePath(member.slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  
  const currentImagePath = imagePaths[currentImageIndex] || imagePaths[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[320px]"
    >
      <Card className="relative bg-white border border-slate-200 hover:border-[#1A237E]/30 transition-all duration-300 h-full shadow-sm hover:shadow-md overflow-hidden group">
        <CardHeader className="text-center pb-2 pt-6">
          <motion.div
            className="relative w-40 h-40 mx-auto mb-4"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-slate-200 group-hover:border-[#FF9800]/50 transition-colors" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md">
              {!imageError && currentImagePath ? (
                <Image
                  key={`${member.slug}-${currentImagePath}`}
                  src={currentImagePath}
                  alt={member.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="160px"
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                  unoptimized={false}
                  style={{ objectPosition: member.slug === 'anshika-sharma' ? 'center 30%' : 'center top' }}
                  onError={() => {
                    if (currentImageIndex < imagePaths.length - 1) {
                      setCurrentImageIndex(currentImageIndex + 1);
                    } else {
                      setImageError(true);
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                  <span className="text-[#1A237E] text-3xl font-bold">{initials}</span>
                </div>
              )}
            </div>
          </motion.div>

          <div className="px-2">
            <CardTitle className="text-xl text-[#1A237E] mb-1.5 font-bold group-hover:text-[#FF9800] transition-colors leading-tight">
              {member.name}
            </CardTitle>
            {member.designation && (
              <p className="text-xs font-semibold mb-1.5 text-[#FF9800] leading-tight">
                {member.designation}
              </p>
            )}
            <p className="text-[#37474F] text-xs leading-tight mb-3">{member.department}</p>
          </div>
        </CardHeader>

        <CardContent className="pt-0 pb-5">
          {member.hasDetailPage && (
            <Link href={`/team/${member.slug}`}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <span className="w-full bg-[#1A237E] hover:bg-[#283593] text-white border-0 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow group/btn">
                  View Full Profile
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </span>
              </motion.div>
            </Link>
          )}
        </CardContent>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF9800] rounded-b-lg" />
      </Card>
    </motion.div>
  );
}

