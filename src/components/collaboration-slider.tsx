"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Handshake, Sparkles, TrendingUp, ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface Slide {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  icon?: LucideIcon;
  beforeStatement?: string;
  bgGradient: string;
}

export default function CollaborationSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const slides: Slide[] = [
    {
      id: 1,
      type: "collaboration",
      title: "In Collaboration with JPVL",
      subtitle: "Jaypee Power Ventures Limited",
      description: "Strategic partnership driving industrial research and development initiatives",
      image: "/assets/home/jpvl-logo.jpeg",
      bgGradient: "from-blue-600 to-indigo-700"
    },
    {
      id: 2,
      type: "partnership",
      title: "Intel Corporation",
      subtitle: "Technology Innovation Partner",
      description: "Collaborating with Intel for cutting-edge AI and machine learning solutions",
      image: "/assets/home/intel.jpg",
      bgGradient: "from-indigo-600 to-purple-700"
    },
    {
      id: 3,
      type: "partnership",
      title: "EDGATE Technologies",
      subtitle: "Industry-Academia Collaboration",
      description: "Partnering with EDGATE Technologies for advanced technological solutions",
      image: "/assets/home/edgate.jpeg",
      bgGradient: "from-purple-600 to-pink-700"
    },
    {
      id: 4,
      type: "innovation",
      title: "Sustainable Construction",
      subtitle: "Bottom Ash Utilization Projects",
      beforeStatement: "Replacing natural sand with bottom ash in pavers and bricks",
      description: "Innovative research in sustainable construction materials and practices",
      image: "/assets/home/paver.png",
      bgGradient: "from-blue-700 to-cyan-700"
    }
  ];

  // Auto-slide functionality with progress tracking
  useEffect(() => {
    if (isPaused || isHovered || slides.length === 0) {
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
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideInterval);
    };
  }, [isPaused, isHovered, slides.length, currentSlide]);

  const nextSlide = () => {
    setIsPaused(true);
    setDirection('right');
    setProgress(0);
    setCurrentSlide((prev) => {
      const next = (prev + 1) % slides.length;
      setTimeout(() => setIsPaused(false), 6000);
      return next;
    });
  };

  const prevSlide = () => {
    setIsPaused(true);
    setDirection('left');
    setProgress(0);
    setCurrentSlide((prev) => {
      const next = (prev - 1 + slides.length) % slides.length;
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
    <div 
      className="relative max-w-6xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video bg-gradient-to-br rounded-2xl overflow-hidden border-2 border-blue-300/50 shadow-2xl backdrop-blur-sm group">
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
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            const isNext = index === (currentSlide + 1) % slides.length;
            const isPrev = index === (currentSlide - 1 + slides.length) % slides.length;
            
            return (
              <motion.div
                key={slide.id}
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
                {/* Background Gradient */}
                <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${slide.bgGradient}`}></div>
                
                {/* Content */}
                <motion.div 
                  className="relative z-10 w-full h-full flex items-center justify-center p-8 md:p-12"
                  whileHover={isActive ? { scale: 1.01 } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center max-w-5xl mx-auto">
                    {/* Image Display - Medium Size */}
                    {slide.image && !imageErrors[slide.id] ? (
                      <motion.div
                        key={`image-${currentSlide}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 md:mb-8 flex justify-center"
                      >
                        <div className="relative w-80 h-52 md:w-[500px] md:h-[320px] lg:w-[600px] lg:h-[380px] bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 flex items-center justify-center border border-white/20 shadow-lg">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            width={600}
                            height={380}
                            className="object-contain max-w-full max-h-full drop-shadow-2xl"
                            priority={index === 0}
                            {...(index !== 0 && { loading: isActive || isNext || isPrev ? "eager" : "lazy" })}
                            onError={() => {
                              setImageErrors(prev => ({ ...prev, [slide.id]: true }));
                            }}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      /* Icon fallback if no image */
                      slide.icon && (
                        <div className="mb-8 flex justify-center">
                          <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <slide.icon className="w-16 h-16 text-white" />
                          </div>
                        </div>
                      )
                    )}
                    
                    {/* Before Statement for Paver */}
                    {slide.beforeStatement && (
                      <motion.p
                        key={`before-${currentSlide}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="text-lg md:text-xl text-blue-200 mb-3 font-medium"
                      >
                        {slide.beforeStatement}
                      </motion.p>
                    )}
                    
                    <motion.h3
                      key={`title-${currentSlide}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4"
                    >
                      {slide.title}
                    </motion.h3>
                    <motion.p
                      key={`subtitle-${currentSlide}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-xl md:text-2xl lg:text-3xl text-blue-100 mb-4 md:mb-6"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.p
                      key={`desc-${currentSlide}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto"
                    >
                      {slide.description}
                    </motion.p>
                  </div>
                  
                  {/* Glow effect for active slide */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent pointer-events-none"
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
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {/* Slide Counter Overlay */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md rounded-lg px-4 py-2 z-30 pointer-events-none"
        >
          <div className="text-white text-sm font-semibold">
            {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
        </motion.div>

        {/* Enhanced Navigation Arrows */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl text-white hover:bg-white/30 transition-all flex items-center justify-center z-40 shadow-2xl border border-white/30 group/arrow"
          aria-label="Previous slide"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-7 h-7 group-hover/arrow:scale-110 transition-transform" />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover/arrow:opacity-100 transition-opacity"
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
          className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl text-white hover:bg-white/30 transition-all flex items-center justify-center z-40 shadow-2xl border border-white/30 group/arrow"
          aria-label="Next slide"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-7 h-7 group-hover/arrow:scale-110 transition-transform" />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 opacity-0 group-hover/arrow:opacity-100 transition-opacity"
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
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl text-white hover:bg-white/30 transition-all flex items-center justify-center z-40 shadow-lg border border-white/30"
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
          {slides.map((slide, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentSlide
                  ? "border-blue-400 shadow-lg shadow-blue-500/50 scale-110"
                  : "border-blue-200 hover:border-blue-400 opacity-60 hover:opacity-100"
              }`}
              whileHover={{ scale: index === currentSlide ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Go to slide ${index + 1}`}
            >
              {slide.image && !imageErrors[slide.id] ? (
                <>
                  <div className="relative w-full h-full">
                    <Image
                      src={slide.image}
                      alt={`Thumbnail ${slide.title}`}
                      fill
                      className="object-cover"
                      sizes="128px"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} opacity-50`} />
                  </div>
                  {index === currentSlide && (
                    <motion.div
                      className="absolute inset-0 bg-blue-500/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </>
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${slide.bgGradient} flex items-center justify-center`}>
                  {slide.icon ? (
                    <slide.icon className="w-8 h-8 text-white" />
                  ) : (
                    <Handshake className="w-8 h-8 text-white" />
                  )}
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
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative rounded-full transition-all ${
              index === currentSlide
                ? "bg-gradient-to-r from-blue-500 to-purple-500 w-10 h-3"
                : "bg-blue-300 hover:bg-blue-400 w-3 h-3"
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
  );
}

