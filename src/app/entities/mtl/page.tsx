"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Microscope, Users, Award, Building2, ChevronLeft, ChevronRight, CircuitBoard, Database, Zap, Target } from "lucide-react";
import { useState, useEffect } from "react";
import PageLoader from "@/components/page-loader";

// MTL images - Generate array for all 19 images
const mtlImages = Array.from({ length: 19 }, (_, i) => ({
  name: "MTL Lab",
  image: `/assets/entities/mtl/img${i + 1}.jpeg`
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
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Auto-slide functionality with progress tracking
  useEffect(() => {
    if (isPaused || isHovered || mtlImages.length === 0) {
      setProgress(0);
      return;
    }
    
    const duration = 5000; // 5 seconds
    const interval = 100; // Update every 100ms for smooth progress
    let elapsed = 0;

    const progressInterval = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / duration) * 100);
    }, interval);

    const slideInterval = setTimeout(() => {
      setDirection('right');
      setCurrentSlide((prev) => (prev + 1) % mtlImages.length);
      setProgress(0);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideInterval);
    };
  }, [isPaused, isHovered, mtlImages.length, currentSlide]);

  const nextSlide = () => {
    setIsPaused(true);
    setDirection('right');
    setProgress(0);
    setCurrentSlide((prev) => {
      const next = (prev + 1) % mtlImages.length;
      setTimeout(() => setIsPaused(false), 6000); // Resume auto-play after manual navigation
      return next;
    });
  };

  const prevSlide = () => {
    setIsPaused(true);
    setDirection('left');
    setProgress(0);
    setCurrentSlide((prev) => {
      const next = (prev - 1 + mtlImages.length) % mtlImages.length;
      setTimeout(() => setIsPaused(false), 6000); // Resume auto-play after manual navigation
      return next;
    });
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setIsPaused(true);
    setDirection(index > currentSlide ? 'right' : 'left');
    setProgress(0);
    setCurrentSlide(index);
    setTimeout(() => setIsPaused(false), 6000); // Resume auto-play after manual navigation
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <>
      <PageLoader message="Welcome to MTL!" />
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

          {/* Advanced Image Slider */}
          <div 
            className="relative max-w-6xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative h-[600px] md:h-[700px] lg:h-[800px] bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-slate-800/80 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl backdrop-blur-sm group">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Slider Container with 3D effect */}
              <div className="relative w-full h-full perspective-1000">
                {mtlImages.map((image, index) => {
                  const isActive = index === currentSlide;
                  const isNext = index === (currentSlide + 1) % mtlImages.length;
                  const isPrev = index === (currentSlide - 1 + mtlImages.length) % mtlImages.length;
                  
                  return (
                    <motion.div
                      key={`mtl-image-${index}-${image.name}`}
                      className="absolute inset-0 w-full h-full"
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : isNext || isPrev ? 0.3 : 0,
                        scale: isActive ? 1 : isNext || isPrev ? 0.95 : 0.9,
                        x: isActive 
                          ? 0 
                          : index < currentSlide 
                            ? direction === 'left' ? '-120%' : '-100%'
                            : direction === 'right' ? '120%' : '100%',
                        rotateY: isActive ? 0 : index < currentSlide ? -15 : 15,
                        zIndex: isActive ? 20 : isNext || isPrev ? 10 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.8
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                        pointerEvents: isActive ? 'auto' : 'none'
                      }}
                    >
                      {!imageErrors[index] ? (
                        <motion.div 
                          className="relative w-full h-full flex items-center justify-center bg-slate-900/20 p-4 md:p-8"
                          whileHover={isActive ? { scale: 1.02 } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={image.image}
                            alt={`${image.name} - Image ${index + 1}`}
                            fill
                            className="object-contain drop-shadow-2xl"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                            quality={90}
                            {...(index === 0 
                              ? { priority: true }
                              : isActive || isNext || isPrev
                              ? { loading: "eager" }
                              : { loading: "lazy" }
                            )}
                            onError={(e) => {
                              console.error(`Error loading image ${index}: ${image.image}`, e);
                              handleImageError(index);
                            }}
                          />
                          {/* Image glow effect */}
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-transparent to-transparent pointer-events-none"
                              animate={{
                                opacity: [0.3, 0.5, 0.3],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          )}
                        </motion.div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                          <div className="text-center">
                            <Microscope className="w-20 h-20 text-white/50 mx-auto mb-4" />
                            <p className="text-white text-lg">{image.name}</p>
                            <p className="text-gray-400 text-sm mt-2">Image coming soon</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>

              {/* Image Counter & Info Overlay */}
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 z-30 pointer-events-none"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{mtlImages[currentSlide].name}</h3>
                    <p className="text-gray-300 text-sm">Image {currentSlide + 1} of {mtlImages.length}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white/80">{String(currentSlide + 1).padStart(2, '0')}</div>
                    <div className="text-sm text-gray-400">/{String(mtlImages.length).padStart(2, '0')}</div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Navigation Arrows with hover effects */}
              <motion.button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-all flex items-center justify-center z-40 shadow-2xl border border-white/20 group/arrow"
                aria-label="Previous slide"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-7 h-7 group-hover/arrow:scale-110 transition-transform" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover/arrow:opacity-100 transition-opacity"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.button>
              
              <motion.button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-all flex items-center justify-center z-40 shadow-2xl border border-white/20 group/arrow"
                aria-label="Next slide"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-7 h-7 group-hover/arrow:scale-110 transition-transform" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover/arrow:opacity-100 transition-opacity"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.button>

              {/* Play/Pause Button */}
              <motion.button
                onClick={() => setIsPaused(!isPaused)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-all flex items-center justify-center z-40 shadow-lg border border-white/20"
                aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPaused ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                )}
              </motion.button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="mt-8">
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-2">
                {mtlImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentSlide
                        ? "border-blue-400 shadow-lg shadow-blue-500/50 scale-110"
                        : "border-white/20 hover:border-white/40 opacity-60 hover:opacity-100"
                    }`}
                    whileHover={{ scale: index === currentSlide ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {!imageErrors[index] ? (
                      <>
                        <Image
                          src={image.image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="128px"
                          loading="lazy"
                        />
                        {index === currentSlide && (
                          <motion.div
                            className="absolute inset-0 bg-blue-500/30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          />
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                        <Microscope className="w-6 h-6 text-white/50" />
                      </div>
                    )}
                    {/* Active indicator */}
                    {index === currentSlide && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400"
                        layoutId="activeThumbnail"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Enhanced Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              {mtlImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 w-10 h-3"
                      : "bg-white/30 hover:bg-white/50 w-3 h-3"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {index === currentSlide && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/50"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.button>
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
    </>
  );
}

