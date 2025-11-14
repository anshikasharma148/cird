"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Microscope, Users, Award, Building2, ChevronLeft, ChevronRight, CircuitBoard, Database, Zap, Target, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import PageLoader from "@/components/page-loader";

// MTL images - Generate array for all 34 images
const mtlImages = Array.from({ length: 34 }, (_, i) => ({
  name: "MTL Lab",
  image: `/assets/entities/mtl/img${i + 1}.jpeg`
}));

// MTL Team Members
interface MTLTeamMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  slug: string;
  hasDetailPage: boolean;
  role: "coordinator" | "member";
}

const mtlTeamMembers: MTLTeamMember[] = [
  {
    id: "dharmendra-shukla-mtl",
    name: "Dr. Dharmendra Kumar Shukla",
    designation: "",
    department: "Assistant Professor (SG), Civil, JUET, Guna",
    slug: "dharmendra-shukla",
    hasDetailPage: true,
    role: "coordinator"
  },
  {
    id: "rs-chauhan",
    name: "R.S. Chauhan",
    designation: "",
    department: "MTL, CIRD",
    slug: "rs-chauhan",
    hasDetailPage: false,
    role: "member"
  },
  {
    id: "kk-purohit",
    name: "K.K. Purohit",
    designation: "",
    department: "MTL, CIRD",
    slug: "kk-purohit",
    hasDetailPage: false,
    role: "member"
  },
  {
    id: "bhanu-pratap",
    name: "Bhanu Pratap Arya",
    designation: "",
    department: "MTL, CIRD",
    slug: "bhanu-pratap",
    hasDetailPage: false,
    role: "member"
  }
];

// Separate coordinators and members for custom layout
const mtlCoordinators = mtlTeamMembers.filter(m => m.role === "coordinator");
const mtlMembers = mtlTeamMembers.filter(m => m.role === "member");

// Image file mappings
const getMTLTeamImagePath = (slug: string): string[] => {
  const imageMap: Record<string, string[]> = {
    "dharmendra-shukla": ["/assets/team/dk-shukla.png"],
    "rs-chauhan": ["/assets/team/rs-chauhan.jpeg"],
    "kk-purohit": ["/assets/team/kk-purohit.jpeg"],
    "bhanu-pratap": ["/assets/team/bhanu-pratap.jpeg"],
  };
  
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
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/entities/mtl/mtl.jpg"
            alt="MTL - Mechanical Testing Lab"
            fill
            className="object-cover"
            sizes="100vw"
            priority
            loading="eager"
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
                Mechanical Testing Lab
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              MTL - Mechanical Testing Lab
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Specialized Research Laboratory for Advanced Materials and Mechanical Testing
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
              About MTL Lab
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              The MTL Lab (Mechanical Testing Lab) is a specialized research facility dedicated to advanced technological research and development. Our lab focuses on cutting-edge technologies and innovative solutions for modern industrial challenges.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              The lab operates under the Centre for Industrial Research and Development (CIRD) and plays a crucial role in materials research, technology innovation, laboratory testing, and research & development activities. We provide comprehensive testing and analysis services for various industrial applications.
            </p>
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

      {/* Enhanced MTL Team Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 via-blue-950 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"
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
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="container mx-auto px-8 md:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-10 h-10 text-blue-400" />
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                MTL <span className="text-blue-400">Team</span>
              </h2>
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-10 h-10 text-blue-400" />
              </motion.div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Meet the talented professionals driving innovation and excellence at the Mechanical Testing Lab
            </p>
          </motion.div>

          {/* Coordinators Row */}
          {mtlCoordinators.length > 0 && (
            <div className={`flex flex-wrap justify-center gap-8 max-w-5xl mx-auto mb-8 ${mtlCoordinators.length === 1 ? '' : 'md:grid md:grid-cols-2 md:justify-items-center'}`}>
              {mtlCoordinators.map((member, index) => (
                <div key={member.id} className={mtlCoordinators.length === 1 ? 'w-full max-w-[320px]' : 'w-full'}>
                  <EnhancedMTLTeamCard member={member} index={index} />
                </div>
              ))}
            </div>
          )}

          {/* Members Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {mtlMembers.map((member, index) => (
              <EnhancedMTLTeamCard key={member.id} member={member} index={mtlCoordinators.length + index} />
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

// Enhanced MTL Team Member Card Component
function EnhancedMTLTeamCard({ member, index }: { member: MTLTeamMember; index: number }) {
  const imagePaths = getMTLTeamImagePath(member.slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  
  const currentImagePath = imagePaths[currentImageIndex] || imagePaths[0];

  // Unified blue theme styling for all roles
  const style = {
    border: "border-blue-500",
    glow: "shadow-blue-500/50",
    badge: member.role === "coordinator" 
      ? "bg-gradient-to-r from-blue-600 to-blue-700" 
      : "bg-gradient-to-r from-blue-500 to-blue-600",
    accent: "text-blue-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {/* Glow effect on hover */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-2xl blur-xl opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-30' : ''}`}
        animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <Card className={`relative bg-gradient-to-br from-blue-50 via-indigo-50/80 to-blue-100/60 border-2 ${style.border} hover:border-opacity-100 transition-all duration-300 h-full shadow-2xl hover:shadow-3xl ${style.glow} overflow-hidden group backdrop-blur-sm`}>
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        <CardHeader className="text-center relative z-10 pb-2 pt-6">
          {/* Role Badge - Smaller */}
          {member.role === "coordinator" && (
            <div className="mb-3">
              <Badge className={`${style.badge} text-white text-xs px-3 py-1 border-0 shadow-md`}>
                Coordinator
              </Badge>
            </div>
          )}

          {/* Profile Image - Smaller size */}
          <motion.div
            className="relative w-40 h-40 mx-auto mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Outer glow ring */}
            <motion.div
              className={`absolute -inset-2 rounded-full ${style.border} opacity-50`}
              animate={isHovered ? {
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Middle ring */}
            <div className={`absolute inset-0 rounded-full ${style.border} border-[3px] bg-gradient-to-br from-blue-50 to-blue-100`}></div>
            
            {/* Image container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-white shadow-xl">
              {!imageError && currentImagePath ? (
                <Image
                  key={`${member.slug}-${currentImagePath}`}
                  src={currentImagePath}
                  alt={member.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  sizes="160px"
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                  unoptimized={false}
                  style={{ 
                    objectPosition: member.slug === 'anshika-sharma' ? 'center 30%' : 'center top' 
                  }}
                  onError={() => {
                    if (currentImageIndex < imagePaths.length - 1) {
                      setCurrentImageIndex(currentImageIndex + 1);
                    } else {
                      setImageError(true);
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                  <span className="text-blue-900 text-3xl font-bold">{initials}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Name and Details - Compact - No animation delay */}
          <div className="px-2">
            <CardTitle className="text-xl text-slate-900 mb-1.5 font-bold group-hover:text-blue-700 transition-colors leading-tight">
              {member.name}
            </CardTitle>
            {member.designation && (
              <p className={`text-xs font-semibold mb-1.5 ${style.accent} leading-tight`}>
                {member.designation}
              </p>
            )}
            <p className="text-slate-600 text-xs leading-tight mb-3">{member.department}</p>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 pt-0 pb-4">
          {member.hasDetailPage && (
            <Link href={`/team/${member.slug}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className={`w-full ${style.badge} text-white border-0 px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group/btn`}>
                  <span>View Full Profile</span>
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </Link>
          )}
        </CardContent>

        {/* Bottom accent line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 ${style.badge}`} />
      </Card>
    </motion.div>
  );
}

