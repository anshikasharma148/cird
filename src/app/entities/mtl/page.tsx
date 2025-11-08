"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Microscope, Users, Award, Building2, ChevronLeft, ChevronRight, CircuitBoard, Database, Zap, Target } from "lucide-react";
import { useState, useEffect } from "react";

// MTL images - we'll add more as needed
const mtlImages = Array.from({ length: 10 }, (_, i) => ({
  name: `MTL Lab Image ${i + 1}`,
  image: `/assets/entities/mtl/image-${i + 1}.jpg`
}));

const teamMembers = [
  "Dr. Dharmendra Kumar Shukla",
  "R.S. Chauhan",
  "K.K. Purohit",
  "Bhanu Pratap Arya"
];

export default function MTLPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mtlImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mtlImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mtlImages.length) % mtlImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="container mx-auto px-8 md:px-16 relative z-10">
          <Link href="/entities">
            <Button variant="ghost" className="mb-6 text-white hover:text-gray-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Entities
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-8 items-center md:items-start"
          >
            <div className="p-6 rounded-2xl bg-white shadow-lg flex-shrink-0">
              <Microscope className="w-16 h-16 text-black" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <Badge className="mb-4 bg-white/95 backdrop-blur-md text-black border border-white/20 px-4 py-1">
                Mechanical Testing Laboratory
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                MTL Lab (Mechanical Testing Lab)
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Specialized Research Laboratory
              </p>
            </div>
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
              About MTL Lab
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              The MTL Lab (Mechanical Testing Lab) is a specialized research facility dedicated to advanced technological research and development. Our lab focuses on cutting-edge technologies and innovative solutions for modern industrial challenges.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              The lab operates under the Centre for Industrial Research and Development (CIRD) and plays a crucial role in materials research, technology innovation, laboratory testing, and research & development activities. We provide comprehensive testing and analysis services for various industrial applications.
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
              MTL Lab <span className="text-white">Facilities</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our state-of-the-art laboratory facilities and infrastructure
            </p>
          </motion.div>

          {/* Image Slider */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Slider Container with sliding animation */}
              <div className="relative w-full h-full">
                <motion.div
                  className="flex h-full"
                  animate={{
                    x: `-${currentSlide * 100}%`
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  style={{
                    width: `${mtlImages.length * 100}%`
                  }}
                >
                  {mtlImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative flex-shrink-0"
                      style={{ width: `${100 / mtlImages.length}%` }}
                    >
                      {!imageErrors[index] ? (
                        <Image
                          src={image.image}
                          alt={image.name}
                          fill
                          className="object-cover"
                          sizes="100vw"
                          unoptimized
                          onError={() => handleImageError(index)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                          <div className="text-center">
                            <Microscope className="w-20 h-20 text-white/50 mx-auto mb-4" />
                            <p className="text-white text-lg">{image.name}</p>
                            <p className="text-gray-400 text-sm mt-2">Image coming soon</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Image Name Overlay */}
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10"
              >
                <h3 className="text-2xl font-bold text-white">{mtlImages[currentSlide].name}</h3>
              </motion.div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all flex items-center justify-center z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all flex items-center justify-center z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              {mtlImages.map((_, index) => (
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
              { number: "8", label: "Active Projects" },
              { number: "2", label: "Patents Filed" },
              { number: "18", label: "Publications" },
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

