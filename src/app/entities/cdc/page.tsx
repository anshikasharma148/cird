"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Users, Award, Building2, ChevronLeft, ChevronRight, Code, Bot, Cpu, Brain } from "lucide-react";
import { useState, useEffect } from "react";

const cdcRooms = [
  { name: "Reception", image: "/assets/entities/cdc/reception.jpg" },
  { name: "Control Room", image: "/assets/entities/cdc/control-room.jpg" },
  { name: "Engineering Room", image: "/assets/entities/cdc/engineering-room.jpg" },
  { name: "Shift Engineers Room", image: "/assets/entities/cdc/shift-engineers-room.jpg" },
  { name: "Server Room", image: "/assets/entities/cdc/server-room.jpg" },
  { name: "Dr. Dhananjay R. Mishra Office", image: "/assets/entities/cdc/dr-dhananjay-office.jpg" },
  { name: "Dr. Amit Kumar Srivastava Office", image: "/assets/entities/cdc/dr-amit-office.jpg" },
  { name: "Conference Room", image: "/assets/entities/cdc/conference-room.jpg" },
  { name: "Executive Room", image: "/assets/entities/cdc/executive-room.jpg" }
];

const teamMembers = [
  "Dr. Amit Kumar Srivastava",
  "Er. Anshika Sharma",
  "Er. Nitesh Pandey",
  "Er. Shashwat Shukla"
];

export default function CDCPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);

  // Debug: Log current slide changes
  useEffect(() => {
    console.log(`Current slide changed to: ${currentSlide} of ${cdcRooms.length}`);
  }, [currentSlide]);

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % cdcRooms.length;
        console.log(`Auto-sliding from ${prev} to ${next} (total: ${cdcRooms.length})`);
        return next;
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setIsPaused(true);
    setCurrentSlide((prev) => {
      const next = (prev + 1) % cdcRooms.length;
      setTimeout(() => setIsPaused(false), 6000); // Resume auto-play after manual navigation
      return next;
    });
  };

  const prevSlide = () => {
    setIsPaused(true);
    setCurrentSlide((prev) => {
      const next = (prev - 1 + cdcRooms.length) % cdcRooms.length;
      setTimeout(() => setIsPaused(false), 6000); // Resume auto-play after manual navigation
      return next;
    });
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setIsPaused(true);
    setCurrentSlide(index);
    setTimeout(() => setIsPaused(false), 6000); // Resume auto-play after manual navigation
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/entities/cdc/cdc.jpg"
            alt="CDC - Control Development Centre"
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-8 md:px-16 relative z-10 py-20">
          <Link href="/entities">
            <Button variant="ghost" className="mb-6 text-white hover:text-gray-300 bg-white/10 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Entities
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge className="mb-6 bg-white/95 backdrop-blur-md text-black border border-white/20 px-6 py-2 text-sm font-medium shadow-lg shadow-white/10">
                Control Development Centre
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              CDC - Control Development Centre
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Advanced Control Systems Research
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20 mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Building2 className="w-8 h-8" />
              About CDC
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              The Control Development Centre (CDC) is our premier research facility dedicated to developing sophisticated control systems and automation solutions for industrial applications. Our research spans from basic control theory to advanced AI-driven control mechanisms.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              The CDC operates under the Centre for Industrial Research and Development (CIRD) and serves as a hub for innovation in software development, robotics, artificial intelligence, and industrial automation. We work closely with industry partners to develop cutting-edge solutions for real-world industrial challenges.
            </p>
          </motion.div>

          {/* Team Members */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Users className="w-6 h-6" />
              Team Members
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-gray-300">{member}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Slider Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              CDC <span className="text-white">Facilities</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our state-of-the-art facilities and infrastructure
            </p>
          </motion.div>

          {/* Image Slider */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Slider Container - One image at a time */}
              <div className="relative w-full h-full">
                {cdcRooms.map((room, index) => (
                  <motion.div
                    key={`room-${index}-${room.name}`}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0, x: index === 0 ? 0 : '100%' }}
                    animate={{
                      opacity: index === currentSlide ? 1 : 0,
                      x: index === currentSlide ? 0 : index < currentSlide ? '-100%' : '100%'
                    }}
                    transition={{
                      type: "tween",
                      ease: "easeInOut",
                      duration: 0.8
                    }}
                    style={{
                      zIndex: index === currentSlide ? 10 : 0
                    }}
                  >
                    {!imageErrors[index] ? (
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        unoptimized
                        priority={index === 0}
                        onError={() => {
                          console.log(`Error loading image ${index}: ${room.image}`);
                          handleImageError(index);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/5">
                        <div className="text-center">
                          <Building2 className="w-20 h-20 text-white/50 mx-auto mb-4" />
                          <p className="text-white text-lg">{room.name}</p>
                          <p className="text-gray-400 text-sm mt-2">Image coming soon</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {/* Room Name Overlay */}
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10 pointer-events-none"
              >
                <h3 className="text-2xl font-bold text-white">{cdcRooms[currentSlide].name}</h3>
              </motion.div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all flex items-center justify-center z-20 shadow-lg"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all flex items-center justify-center z-20 shadow-lg"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {cdcRooms.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-white w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Focus <span className="text-white">Areas</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
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
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-lg bg-white">
                    <area.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{area.title}</h3>
                </div>
                <p className="text-gray-300 mb-4">{area.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Projects:</h4>
                  {area.projects.map((project, projectIndex) => (
                    <div key={projectIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <span className="text-sm text-gray-300">{project}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-8 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "12", label: "Active Projects" },
              { number: "3", label: "Patents Filed" },
              { number: "25", label: "Publications" },
              { number: "4", label: "Researchers" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

