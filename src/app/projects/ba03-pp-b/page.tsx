"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Cpu, Bot, Camera, Radio, Tablet, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Project images
const projectImages = [
  "/assets/projects/chp/img1.jpeg",
  "/assets/projects/chp/img2.jpeg",
  "/assets/projects/chp/img3.jpeg",
];

export default function BA03PPBPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused || isHovered || projectImages.length === 0) {
      setProgress(0);
      return;
    }
    
    const duration = 5000;
    const interval = 100;
    let elapsed = 0;

    const progressInterval = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / duration) * 100);
    }, interval);

    const slideInterval = setTimeout(() => {
      setDirection('right');
      setCurrentSlide((prev) => (prev + 1) % projectImages.length);
      setProgress(0);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideInterval);
    };
  }, [isPaused, isHovered, currentSlide]);

  const nextSlide = () => {
    setIsPaused(true);
    setDirection('right');
    setProgress(0);
    setCurrentSlide((prev) => {
      const next = (prev + 1) % projectImages.length;
      setTimeout(() => setIsPaused(false), 6000);
      return next;
    });
  };

  const prevSlide = () => {
    setIsPaused(true);
    setDirection('left');
    setProgress(0);
    setCurrentSlide((prev) => {
      const next = (prev - 1 + projectImages.length) % projectImages.length;
      setTimeout(() => setIsPaused(false), 6000);
      return next;
    });
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setIsPaused(true);
    setDirection(index > currentSlide ? 'right' : 'left');
    setProgress(0);
    setCurrentSlide(index);
    setTimeout(() => setIsPaused(false), 6000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e1b382]/50 to-[#e1b382]/40">
      {/* Hero Section with Header Image (img3) */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image - using img3 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/projects/chp/img3.jpeg"
            alt="Monitoring & Control System for Coal Handling Plant (CHP)"
            fill
            className="object-cover"
            sizes="100vw"
            priority
            loading="eager"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-8 md:px-16 relative z-10 py-20">
          <Link href="/research">
            <Button variant="ghost" className="mb-6 text-white hover:text-[#e1b382] bg-white/10 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Research
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-[#e1b382] text-[#2d545e] border border-[#c89666] px-6 py-2 shadow-lg">
                BA03/PP/B
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Monitoring & Control System for Coal Handling Plant (CHP)
            </h1>
            <p className="text-xl text-white/90 max-w-4xl leading-relaxed drop-shadow-md">
              Automate and monitor conveyor systems in coal handling plants using robotics and PLC control for enhanced efficiency and safety.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Slider Section */}
      <section className="py-20 bg-gradient-to-b from-[#c89666] to-[#e1b382]">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[#2d545e] mb-6">
              Project <span className="text-[#2d545e]">Gallery</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore images from our Coal Handling Plant monitoring and control system project
            </p>
          </motion.div>

          {/* Image Slider */}
          <div 
            className="relative max-w-6xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px] bg-gradient-to-br from-[#2d545e]/80 via-[#12343b]/80 to-[#2d545e]/80 rounded-2xl overflow-hidden border-2 border-[#e1b382]/30 shadow-2xl backdrop-blur-sm group">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#2d545e]/10 via-[#e1b382]/10 to-[#c89666]/10"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Slider Container */}
              <div className="relative w-full h-full">
                {projectImages.map((image, index) => {
                  const isActive = index === currentSlide;
                  const isNext = index === (currentSlide + 1) % projectImages.length;
                  const isPrev = index === (currentSlide - 1 + projectImages.length) % projectImages.length;
                  
                  return (
                    <motion.div
                      key={`image-${index}`}
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
                        zIndex: isActive ? 20 : isNext || isPrev ? 10 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.8
                      }}
                      style={{
                        pointerEvents: isActive ? 'auto' : 'none'
                      }}
                    >
                      <motion.div 
                        className="relative w-full h-full flex items-center justify-center bg-[#2d545e]/20 p-4 md:p-8"
                        whileHover={isActive ? { scale: 1.02 } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={image}
                          alt={`Project image ${index + 1}`}
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
                        />
                        {/* Image glow effect */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-radial from-[#e1b382]/20 via-transparent to-transparent pointer-events-none"
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
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#2d545e] via-[#e1b382] to-[#c89666]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>

              {/* Image Counter Overlay */}
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 z-30 pointer-events-none"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Image {currentSlide + 1} of {projectImages.length}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white/80">{String(currentSlide + 1).padStart(2, '0')}</div>
                    <div className="text-sm text-gray-400">/{String(projectImages.length).padStart(2, '0')}</div>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Arrows */}
              <motion.button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-all flex items-center justify-center z-40 shadow-2xl border border-white/20 group/arrow"
                aria-label="Previous slide"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-7 h-7 group-hover/arrow:scale-110 transition-transform" />
              </motion.button>
              
              <motion.button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-all flex items-center justify-center z-40 shadow-2xl border border-white/20 group/arrow"
                aria-label="Next slide"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-7 h-7 group-hover/arrow:scale-110 transition-transform" />
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
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-2 justify-center">
                {projectImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentSlide
                        ? "border-[#e1b382] shadow-lg shadow-[#e1b382]/50 scale-110"
                        : "border-white/20 hover:border-white/40 opacity-60 hover:opacity-100"
                    }`}
                    whileHover={{ scale: index === currentSlide ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="128px"
                      loading="lazy"
                    />
                    {index === currentSlide && (
                      <motion.div
                        className="absolute inset-0 bg-[#e1b382]/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                    {/* Active indicator */}
                    {index === currentSlide && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-[#e1b382]"
                        layoutId="activeThumbnail"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              {projectImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-gradient-to-r from-[#2d545e] to-[#e1b382] w-10 h-3"
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

      {/* Objective Section */}
      <section className="py-16 bg-gradient-to-b from-[#e1b382]/50 to-[#e1b382]/40">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white border-[#c89666] shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                    <Target className="w-8 h-8 text-[#2d545e]" />
                  <CardTitle className="text-2xl text-[#2d545e]">Objective</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed">
                  This project develops a comprehensive robotic and sensor-based control system for coal handling plants. It integrates real-time monitoring, anomaly detection, and PLC automation to optimize conveyor system operations, improve safety, and reduce maintenance costs.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Technical Overview */}
      <section className="py-16 bg-gradient-to-b from-[#c89666] to-[#e1b382]">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d545e] mb-6">
              Technical <span className="text-[#2d545e]">Overview</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Sensors */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Radio className="w-8 h-8 text-[#2d545e]" />
                    <CardTitle className="text-xl text-[#2d545e]">Sensors</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Distance sensors are used for conveyor belt data collection, enabling real-time monitoring of belt position, alignment, and operational parameters.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Control System */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu className="w-8 h-8 text-[#2d545e]" />
                    <CardTitle className="text-xl text-[#2d545e]">Control System</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    LVDTs (Linear Variable Differential Transformers) are finalized for sway input. PLC logic is optimized for real-time master idler control, ensuring precise alignment and operation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Automation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-8 h-8 text-[#2d545e]" />
                    <CardTitle className="text-xl text-[#2d545e]">Automation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Sway switches are analyzed for fault detection and master idler alignment, providing automated monitoring and corrective actions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Bot className="w-8 h-8 text-[#2d545e]" />
                    <CardTitle className="text-xl text-[#2d545e]">Innovation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    A Tracked Robot is introduced for conveyor belt inspection and monitoring, enabling autonomous inspection capabilities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Robot Features */}
      <section className="py-16 bg-gradient-to-b from-[#e1b382] to-[#c89666]">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d545e] mb-6">
              Tracked Robot <span className="text-[#2d545e]">Features</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Bot className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Tracked Wheel System</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Designed for rough terrain stability, enabling reliable operation in challenging industrial environments.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Camera className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">High-Resolution Camera</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Provides visual inspection capabilities for detailed monitoring and documentation of conveyor belt conditions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Radio className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Advanced Sensors</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Equipped with sensors for detecting heat, vibration, and obstructions, enabling comprehensive monitoring.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Tablet className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Wireless Communication</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Features wireless communication and power management for extended operational autonomy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Control & Feedback */}
      <section className="py-16 bg-gradient-to-b from-[#c89666] to-[#e1b382]">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d545e] mb-6">
              Control & <span className="text-[#2d545e]">Feedback</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-white border-[#c89666] shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-[#2d545e]">Remote Operation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    The system supports remote operation via console or tablet, providing flexible control and monitoring capabilities from any location.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white border-[#c89666] shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-[#2d545e]">Live Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Provides live video feed and anomaly alerts with historical data logging, enabling comprehensive monitoring and analysis of system performance.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Team */}
      <section className="py-16 bg-gradient-to-b from-[#e1b382] to-[#c89666]">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white border-[#c89666] shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-[#2d545e] mb-4">Project Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[#2d545e] font-semibold mb-3 text-lg">JUET Team</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                        <span className="text-gray-700">Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                        <span className="text-gray-700">Dr. Amit Kumar Srivastava, Assistant Professor (SG), CSE, JUET, Guna</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[#2d545e] font-semibold mb-3 text-lg">Industry Partners (JPVL)</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                        <span className="text-gray-700">Shri Rakesh K. Singh, Nodal Officer, JBTPP, JPVL</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                        <span className="text-gray-700">Shri Navin Tinguria, Nodal Officer, JNSTPP, JPVL</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                        <span className="text-gray-700">Balachandran M., Nodal Officer, JPVL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

