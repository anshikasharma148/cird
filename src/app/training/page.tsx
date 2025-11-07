"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  Award, 
  Building2, 
  Brain, 
  Bot, 
  Code, 
  Cog,
  GraduationCap,
  Image as ImageIcon,
  Video,
  ArrowRight,
  Sparkles,
  CheckCircle
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Image component with fallback
function GalleryImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white/5">
        <div className="text-center">
          <ImageIcon className="w-10 h-10 text-white/50 mx-auto mb-2" />
          <p className="text-gray-400 text-xs">Image not found</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      unoptimized
      onError={() => setError(true)}
    />
  );
}

export default function TrainingPage() {
  // Helper function to get image paths
  const getImagePath = (folder: string, index: number) => {
    return `/assets/training/${folder}/${index}.jpg`;
  };

  // Generate image arrays for galleries
  const srijanImages = Array.from({ length: 6 }, (_, i) => i + 1);
  const jnstppImages = Array.from({ length: 8 }, (_, i) => i + 1);
  const closingImages = Array.from({ length: 12 }, (_, i) => i + 1);

  const trainingTracks = [
    {
      title: "Artificial Intelligence & Machine Learning",
      icon: Brain,
      description: "Hands-on experience with cutting-edge AI/ML technologies and frameworks"
    },
    {
      title: "Robotics",
      icon: Bot,
      description: "Practical robotics development and automation systems"
    },
    {
      title: "Software Development",
      icon: Code,
      description: "Modern software engineering practices and development methodologies"
    },
    {
      title: "Industrial Automation",
      icon: Cog,
      description: "PLC control systems and industrial automation solutions"
    }
  ];

  const industryPartners = [
    "Intel Corporation",
    "EDGATE TECHNOLOGIES PRIVATE LIMITED",
    "Jaiprakash Power Ventures Ltd",
    "CrestoTechnisis Private Limited"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
        
        {/* Subtle animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
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
                Summer Industrial Training 2025
              </Badge>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Empowering the <span className="text-white">Innovators</span> of Tomorrow
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              A structured, interdisciplinary training initiative focused on emerging and high-impact technological domains.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-gray-300">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                <Calendar className="w-5 h-5" />
                <span>2nd June - 15th July 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                <Users className="w-5 h-5" />
                <span>45 Days Intensive Program</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20 mb-12"
          >
            <p className="text-lg text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
              The Control Development Centre (CDC), operating under the Centre for Industrial Research and Development (CIRD) at Jaypee University of Engineering and Technology, Guna (M.P.), is proud to lead the Summer Industrial Training 2025 — a structured, interdisciplinary training initiative focused on emerging and high-impact technological domains.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed text-center max-w-4xl mx-auto mt-6">
              This initiative underscores a strong commitment to bridging academic potential with industrial proficiency, fostering the development of domain expertise through experiential learning, system-level understanding, and practical implementation.
            </p>
          </motion.div>

          {/* Industry Partners */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Industry Collaborations</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {industryPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/10 hover:border-white/30 transition-all"
                >
                  <span className="text-white font-medium">{partner}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Training Tracks */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Core <span className="text-white">Training Tracks</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive training across four key technological domains
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainingTracks.map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/30 transition-all duration-300 h-full shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-white/10">
                  <CardHeader>
                    <div className="p-4 rounded-xl bg-white mb-4 w-fit">
                      <track.icon className="w-8 h-8 text-black" />
                    </div>
                    <CardTitle className="text-xl text-white mb-2">
                      {track.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">
                      {track.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Srijan FDP Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-white/95 backdrop-blur-md text-black border border-white/20 px-6 py-2 shadow-lg shadow-white/10">
                AI Srijan - Faculty Development Programme
              </Badge>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Advancing AI Excellence through <span className="text-white">Industry-Academia Collaboration</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              A one-week Faculty Development Programme on Artificial Intelligence, Machine Learning, and Deep Learning under the prestigious Intel® Unnati Program
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Program Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Date</p>
                    <p className="text-gray-300">7th – 11th July 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Venue</p>
                    <p className="text-gray-300">Control Development Center (CDC), CIRD, JUET Guna</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">In Association With</p>
                    <p className="text-gray-300">Intel Corporation® | EDGATE TECHNOLOGIES PRIVATE LIMITED</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Program Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Hands-on sessions in Machine Learning and Deep Learning</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Exposure to Intel's Unnati AI Lab tools and curriculum</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Real-world problem-solving and model deployment strategies</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Gallery for AI Srijan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <ImageIcon className="w-6 h-6" />
              AI Srijan Gallery
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {srijanImages.map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: item * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-video bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-all cursor-pointer relative group"
                >
                  <GalleryImage
                    src={getImagePath('srijan', item)}
                    alt={`AI Srijan FDP Image ${item}`}
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Power Plant Visit Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-white/95 backdrop-blur-md text-black border border-white/20 px-6 py-2 shadow-lg shadow-white/10">
                Industrial Visit
              </Badge>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Visit to <span className="text-white">Jaypee Nigrie Super Thermal Power Plant</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              A comprehensive one-week industrial visit to understand the operations and technologies of a super thermal power plant
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20 mb-8"
          >
            <div className="flex items-start gap-3 mb-6">
              <Building2 className="w-6 h-6 text-white mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Jaypee Nigrie Super Thermal Power Plant</h3>
                <p className="text-gray-300">Nigrie, Madhya Pradesh</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              All trainees participated in a one-week industrial visit to the Jaypee Nigrie Super Thermal Power Plant, gaining extensive knowledge about how a super thermal power plant operates, including its various systems, processes, and technologies. This hands-on experience provided invaluable insights into real-world industrial operations and power generation.
            </p>
          </motion.div>

          {/* Image and Video Gallery Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Video className="w-6 h-6" />
              Visit Gallery - Images & Videos
            </h3>
            
            {/* Video Section */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Videos</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: item * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="aspect-video bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-white/30 transition-all cursor-pointer"
                  >
                    <div className="text-center">
                      <Video className="w-12 h-12 text-white/50 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Video {item}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Images</h4>
              <div className="grid md:grid-cols-4 gap-4">
                {jnstppImages.map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: item * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-all cursor-pointer relative group"
                  >
                    <GalleryImage
                      src={getImagePath('jnstpp', item)}
                      alt={`Jaypee Nigrie Power Plant Image ${item}`}
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing Ceremony Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-white/95 backdrop-blur-md text-black border border-white/20 px-6 py-2 shadow-lg shadow-white/10">
                Closing Ceremony
              </Badge>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Closing Ceremony of <span className="text-white">SIT-2025</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              A Celebration of Learning and Collaboration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-white" />
                <h3 className="text-2xl font-bold text-white">Recognition & Appreciation</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                We were honored to present Mementoes to our distinguished guests, programme organisers, co-organisers, and esteemed resource persons as a token of our appreciation for their invaluable contributions.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Certificates of Participation were presented to all the interns for their dedication, hard work, and active engagement throughout the program.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
                <h3 className="text-2xl font-bold text-white">Program Leadership</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-white font-semibold mb-1">Program Organiser</p>
                  <p className="text-gray-300">Dr. Dhananjay R. Mishra</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Co-Organiser</p>
                  <p className="text-gray-300">Dr. Amit Kumar Srivastava</p>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-white font-semibold mb-1">Hon'ble Vice Chancellor</p>
                  <p className="text-gray-300">Prof. D K Rai, JUET Guna</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20 text-center"
          >
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-4">
              A heartfelt thank you to our mentors, whose continuous guidance shaped the learning journey of every participant, and to the program organisers for their tireless efforts in making SIT-2025 a memorable and impactful experience.
            </p>
            <p className="text-lg text-white font-semibold leading-relaxed max-w-3xl mx-auto">
              SIT-2025 was not just about skill development—it was about curiosity, teamwork, and the drive to innovate. As we close this chapter, we look forward to seeing our participants carry this learning spirit into their future endeavors.
            </p>
          </motion.div>

          {/* Closing Ceremony Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20 mt-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <ImageIcon className="w-6 h-6" />
              Closing Ceremony Gallery
            </h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {closingImages.map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: item * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-all cursor-pointer relative group"
                >
                  <GalleryImage
                    src={getImagePath('closing', item)}
                    alt={`Closing Ceremony Image ${item}`}
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
