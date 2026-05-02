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
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Advanced Image Slider Component
function ImageSlider({ 
  images, 
  title 
}: { 
  images: Array<{ name: string; image: string; type?: 'image' | 'video' }>; 
  title: string 
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-slide functionality with progress tracking - pause if video is playing
  useEffect(() => {
    if (isPaused || isHovered || images.length === 0 || isVideoPlaying) {
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
      setCurrentSlide((prev) => (prev + 1) % images.length);
      setProgress(0);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideInterval);
    };
  }, [isPaused, isHovered, images.length, currentSlide, isVideoPlaying]);

  // Reset video playing state when slide changes
  useEffect(() => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setIsPaused(true);
    setDirection('right');
    setProgress(0);
    setCurrentSlide((prev) => {
      const next = (prev + 1) % images.length;
      setTimeout(() => setIsPaused(false), 6000); // Resume auto-play after manual navigation
      return next;
    });
  };

  const prevSlide = () => {
    setIsPaused(true);
    setDirection('left');
    setProgress(0);
    setCurrentSlide((prev) => {
      const next = (prev - 1 + images.length) % images.length;
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

  if (images.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-[#1A237E] mx-auto mb-4" />
          <p className="text-[#37474F]">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
      <h3 className="text-xl sm:text-2xl font-bold text-[#1A237E] mb-6 flex items-center gap-3">
        <ImageIcon className="w-6 h-6 text-[#FF9800]" />
        {title}
      </h3>
      
      {/* Advanced Image Slider */}
      <div 
        className="relative max-w-6xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-video bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#1A237E]/5 via-[#FF9800]/5 to-[#1A237E]/5"
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
            {images.map((item, index) => {
              const isActive = index === currentSlide;
              const isNext = index === (currentSlide + 1) % images.length;
              const isPrev = index === (currentSlide - 1 + images.length) % images.length;
              
              return (
                <motion.div
                  key={`slide-${index}-${item.name}`}
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
                  {item.type === 'video' ? (
                    <div className="relative w-full h-full bg-black">
                      {index === currentSlide ? (
                        <video
                          ref={videoRef}
                          src={item.image}
                          className="w-full h-full object-contain"
                          controls
                          onPlay={() => {
                            setIsVideoPlaying(true);
                          }}
                          onPause={() => {
                            setIsVideoPlaying(false);
                          }}
                          onEnded={() => {
                            setIsVideoPlaying(false);
                            setTimeout(() => {
                              setCurrentSlide((prev) => (prev + 1) % images.length);
                            }, 1000);
                          }}
                          onError={() => handleImageError(index)}
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <video
                          src={item.image}
                          className="w-full h-full object-contain"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  ) : !imageErrors[index] ? (
                    <motion.div 
                      className="relative w-full h-full flex items-center justify-center bg-slate-50/50 p-4"
                      whileHover={isActive ? { scale: 1.02 } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
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
                        onError={() => {
                          console.log(`Error loading image ${index}: ${item.image}`);
                          handleImageError(index);
                        }}
                      />
                      {/* Image glow effect */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-radial from-[#1A237E]/10 via-transparent to-transparent pointer-events-none"
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
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
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                      <div className="text-center">
                        <ImageIcon className="w-20 h-20 text-[#1A237E] mx-auto mb-4" />
                        <p className="text-[#1A237E] text-lg">{item.name}</p>
                        <p className="text-gray-600 text-sm mt-2">Image coming soon</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30">
            <motion.div
              className="h-full bg-gradient-to-r from-[#1A237E] via-[#FF9800] to-[#1A237E]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>

          {/* Image Counter & Info Overlay */}
          {images[currentSlide]?.type !== 'video' && (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 z-30 pointer-events-none"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-1">{images[currentSlide].name}</h4>
                  <p className="text-gray-300 text-sm">Image {currentSlide + 1} of {images.length}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white/80">{String(currentSlide + 1).padStart(2, '0')}</div>
                  <div className="text-sm text-gray-400">/{String(images.length).padStart(2, '0')}</div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Video Name Overlay */}
          {images[currentSlide]?.type === 'video' && (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 via-black/70 to-transparent p-4 z-30 pointer-events-none"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-white">{images[currentSlide].name}</h4>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white/80">{String(currentSlide + 1).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-400">/{String(images.length).padStart(2, '0')}</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Navigation Arrows */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#1A237E]/90 backdrop-blur-xl text-white hover:bg-[#1A237E] transition-all flex items-center justify-center z-40 shadow-lg border border-white/30 group/arrow"
            aria-label="Previous slide"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-7 h-7 group-hover/arrow:scale-110 transition-transform" />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1A237E]/30 to-[#FF9800]/30 opacity-0 group-hover/arrow:opacity-100 transition-opacity"
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
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#1A237E]/90 backdrop-blur-xl text-white hover:bg-[#1A237E] transition-all flex items-center justify-center z-40 shadow-lg border border-white/30 group/arrow"
            aria-label="Next slide"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-7 h-7 group-hover/arrow:scale-110 transition-transform" />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF9800]/30 to-[#1A237E]/30 opacity-0 group-hover/arrow:opacity-100 transition-opacity"
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
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#1A237E]/90 backdrop-blur-xl text-white hover:bg-[#1A237E] transition-all flex items-center justify-center z-40 shadow-lg border border-white/30"
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
            {images.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentSlide
                    ? "border-[#1A237E] shadow-lg shadow-[#1A237E]/30 scale-110"
                    : "border-slate-300 hover:border-[#1A237E] opacity-60 hover:opacity-100"
                }`}
                whileHover={{ scale: index === currentSlide ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Go to slide ${index + 1}`}
              >
                {item.type === 'video' ? (
                  <div className="relative w-full h-full bg-black">
                    <video
                      src={item.image}
                      className="w-full h-full object-cover"
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ) : !imageErrors[index] ? (
                  <>
                    <Image
                      src={item.image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="128px"
                      loading="lazy"
                    />
                    {index === currentSlide && (
                      <motion.div
                        className="absolute inset-0 bg-[#1A237E]/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-[#FF9800]" />
                  </div>
                )}
                {/* Active indicator */}
                {index === currentSlide && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF9800]"
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
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative rounded-full transition-all ${
                index === currentSlide
                  ? "bg-gradient-to-r from-[#1A237E] to-[#FF9800] w-10 h-3"
                  : "bg-slate-300 hover:bg-[#1A237E] w-3 h-3"
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
  );
}

export default function TrainingPage() {
  // Helper function to get image paths
  const getImagePath = (folder: string, index: number, extension: string = 'jpg') => {
    return `/assets/training/${folder}/img${index}.${extension}`;
  };

  const getVideoPath = (folder: string, index: number) => {
    return `/assets/training/${folder}/vid${index}.mp4`;
  };

  // Generate image arrays for sliders
  // AI Srijan: 6 images (img1.jpg to img6.jpg)
  const srijanImages = Array.from({ length: 6 }, (_, i) => ({
    name: "AI Srijan",
    image: getImagePath('srijan', i + 1),
    type: 'image' as const
  }));

  // JNSTPP: 15 images (img1.jpg to img15.jpg) + 3 videos (vid1.mp4 to vid3.mp4)
  const jnstppImages = [
    ...Array.from({ length: 15 }, (_, i) => ({
      name: "Power Plant Visit",
      image: getImagePath('jnstpp', i + 1),
      type: 'image' as const
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
      name: "Power Plant Visit",
      image: getVideoPath('jnstpp', i + 1),
      type: 'video' as const
    }))
  ];

  // Closing Ceremony: 10 images (img1.jpg to img10.jpg)
  const closingImages = Array.from({ length: 10 }, (_, i) => ({
    name: "Closing Ceremony",
    image: getImagePath('closing', i + 1),
    type: 'image' as const
  }));

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
    <div className="min-h-screen bg-white">
      {/* Hero - solid purple (Training theme: distinct from blue/green) */}
      <section className="relative w-full overflow-hidden pt-36 sm:pt-40 pb-20 sm:pb-24 bg-[#6A1B9A]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-60" />
        <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-[#FF9800] text-white border-0 px-6 py-2 shadow-lg">
              Summer Industrial Training 2025
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Empowering the <span className="text-[#FF9800]">Innovators</span> of Tomorrow
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-4xl mx-auto">
              A structured, interdisciplinary training initiative focused on emerging and high-impact technological domains.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/90">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                <Calendar className="w-5 h-5" />
                <span>2nd June - 15th July 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                <Users className="w-5 h-5" />
                <span>45 Days Intensive Program</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SIT 2025 hero image - full image, no cropping */}
      <section className="relative w-full -mt-1 bg-slate-100 flex justify-center">
        <div className="relative w-full max-w-6xl aspect-[4/3]">
          <Image
            src="/assets/training/sit2025.jpeg"
            alt="Summer Industrial Training 2025 - Program snapshot"
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>
      </section>

      {/* Overview Section - CIRD theme */}
      <section id="overview" className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm mb-12"
          >
            <p className="text-base sm:text-lg text-[#37474F] leading-relaxed text-center max-w-4xl mx-auto">
              The Control Development Centre (CDC), operating under the Centre for Industrial Research and Development (CIRD) at Jaypee University of Engineering and Technology, Guna (M.P.), is proud to lead the Summer Industrial Training 2025 — a structured, interdisciplinary training initiative focused on emerging and high-impact technological domains.
            </p>
            <p className="text-base sm:text-lg text-[#37474F] leading-relaxed text-center max-w-4xl mx-auto mt-6">
              This initiative underscores a strong commitment to bridging academic potential with industrial proficiency, fostering the development of domain expertise through experiential learning, system-level understanding, and practical implementation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">Partners</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1A237E] mt-2 mb-6">Industry Collaborations</h3>
            <div className="mx-auto w-16 h-1 rounded-full bg-[#FF9800] mb-6" />
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {industryPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white border border-slate-200 px-5 py-2.5 rounded-lg hover:border-[#1A237E]/30 transition-all shadow-sm"
                >
                  <span className="text-[#1A237E] font-medium text-sm sm:text-base">{partner}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Training Tracks - CIRD theme */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">Domains</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A237E] mt-2 mb-3">
              Core Training Tracks
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-[#FF9800]" />
            <p className="text-lg text-[#37474F] max-w-2xl mx-auto mt-4">
              Comprehensive training across four key technological domains
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainingTracks.map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <Card className="bg-white border border-slate-200 hover:border-[#1A237E]/20 transition-all h-full shadow-sm hover:shadow-md">
                  <CardHeader>
                    <div className="p-4 rounded-xl bg-[#1A237E] mb-4 w-fit">
                      <track.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-[#1A237E] mb-2">
                      {track.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#37474F]">
                      {track.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Srijan FDP Section - CIRD theme */}
      <section id="ai-srijan" className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-6 bg-[#FF9800] text-white border-0 px-6 py-2 shadow-lg">
              AI Srijan - Faculty Development Programme
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A237E] mb-4">
              Advancing AI Excellence through Industry-Academia Collaboration
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-[#FF9800]" />
            <p className="text-lg text-[#37474F] max-w-3xl mx-auto mt-4">
              A one-week Faculty Development Programme on Artificial Intelligence, Machine Learning, and Deep Learning under the prestigious Intel® Unnati Program
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm"
            >
              <h3 className="text-xl font-bold text-[#1A237E] mb-6">Program Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#FF9800] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[#1A237E] font-semibold">Date</p>
                    <p className="text-[#37474F]">7th – 11th July 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-[#FF9800] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[#1A237E] font-semibold">Venue</p>
                    <p className="text-[#37474F]">Control Development Center (CDC), CIRD, JUET Guna</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#FF9800] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[#1A237E] font-semibold">In Association With</p>
                    <p className="text-[#37474F]">Intel Corporation® | EDGATE TECHNOLOGIES PRIVATE LIMITED</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm"
            >
              <h3 className="text-xl font-bold text-[#1A237E] mb-6">Program Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF9800] mt-1 flex-shrink-0" />
                  <p className="text-[#37474F]">Hands-on sessions in Machine Learning and Deep Learning</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF9800] mt-1 flex-shrink-0" />
                  <p className="text-[#37474F]">Exposure to Intel's Unnati AI Lab tools and curriculum</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF9800] mt-1 flex-shrink-0" />
                  <p className="text-[#37474F]">Real-world problem-solving and model deployment strategies</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Slider for AI Srijan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ImageSlider images={srijanImages} title="AI Srijan Gallery" />
          </motion.div>
        </div>
      </section>

      {/* Power Plant Visit Section - CIRD theme */}
      <section id="power-plant" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-6 bg-[#1A237E] text-white border-0 px-6 py-2 shadow-lg">
              Industrial Visit
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A237E] mb-4">
              Visit to Jaypee Nigrie Super Thermal Power Plant
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-[#FF9800]" />
            <p className="text-lg text-[#37474F] max-w-3xl mx-auto mt-4">
              A comprehensive one-week industrial visit to understand the operations and technologies of a super thermal power plant
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm mb-8"
          >
            <div className="flex items-start gap-3 mb-6">
              <Building2 className="w-6 h-6 text-[#FF9800] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-[#1A237E] mb-2">Jaypee Nigrie Super Thermal Power Plant</h3>
                <p className="text-[#37474F]">Nigrie, Madhya Pradesh</p>
              </div>
            </div>
            <p className="text-[#37474F] leading-relaxed">
              All trainees participated in a one-week industrial visit to the Jaypee Nigrie Super Thermal Power Plant, gaining extensive knowledge about how a super thermal power plant operates, including its various systems, processes, and technologies. This hands-on experience provided invaluable insights into real-world industrial operations and power generation.
            </p>
          </motion.div>

          {/* Image Slider for JNSTPP Visit - Images & Videos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ImageSlider images={jnstppImages} title="Visit Gallery - Images & Videos" />
          </motion.div>
        </div>
      </section>

      {/* Closing Ceremony Section - CIRD theme */}
      <section id="closing" className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-6 bg-[#FF9800] text-white border-0 px-6 py-2 shadow-lg">
              Closing Ceremony
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A237E] mb-4">
              Closing Ceremony of SIT-2025
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-[#FF9800]" />
            <p className="text-lg text-[#37474F] max-w-2xl mx-auto mt-4">
              A Celebration of Learning and Collaboration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-[#FF9800]" />
                <h3 className="text-xl font-bold text-[#1A237E]">Recognition & Appreciation</h3>
              </div>
              <p className="text-[#37474F] leading-relaxed mb-4">
                We were honored to present Mementoes to our distinguished guests, programme organisers, co-organisers, and esteemed resource persons as a token of our appreciation for their invaluable contributions.
              </p>
              <p className="text-[#37474F] leading-relaxed">
                Certificates of Participation were presented to all the interns for their dedication, hard work, and active engagement throughout the program.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-8 h-8 text-[#FF9800]" />
                <h3 className="text-xl font-bold text-[#1A237E]">Program Leadership</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[#1A237E] font-semibold mb-1">Program Organiser</p>
                  <p className="text-[#37474F]">Dr. Dhananjay R. Mishra</p>
                </div>
                <div>
                  <p className="text-[#1A237E] font-semibold mb-1">Co-Organiser</p>
                  <p className="text-[#37474F]">Dr. Amit Kumar Srivastava</p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <p className="text-[#1A237E] font-semibold mb-1">Hon'ble Vice Chancellor</p>
                  <p className="text-[#37474F]">Prof. D K Rai, JUET Guna</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm text-center"
        >
          <p className="text-base sm:text-lg text-[#37474F] leading-relaxed max-w-3xl mx-auto mb-4">
            A heartfelt thank you to our mentors, whose continuous guidance shaped the learning journey of every participant, and to the program organisers for their tireless efforts in making SIT-2025 a memorable and impactful experience.
          </p>
          <p className="text-base sm:text-lg text-[#1A237E] font-semibold leading-relaxed max-w-3xl mx-auto">
            SIT-2025 was not just about skill development—it was about curiosity, teamwork, and the drive to innovate. As we close this chapter, we look forward to seeing our participants carry this learning spirit into their future endeavors.
          </p>
        </motion.div>

          {/* Closing Ceremony Gallery Slider */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8"
          >
            <ImageSlider images={closingImages} title="Closing Ceremony Gallery" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
