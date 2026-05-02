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
      bgGradient: "from-[#2d545e] to-[#12343b]"
    },
    {
      id: 2,
      type: "partnership",
      title: "Intel Corporation",
      subtitle: "Technology Innovation Partner",
      description: "Collaborating with Intel for cutting-edge AI and machine learning solutions",
      image: "/assets/home/intel.jpg",
      bgGradient: "from-[#2d545e] to-[#c89666]"
    },
    {
      id: 3,
      type: "partnership",
      title: "EDGATE Technologies",
      subtitle: "Industry-Academia Collaboration",
      description: "Partnering with EDGATE Technologies for advanced technological solutions",
      image: "/assets/home/edgate.jpeg",
      bgGradient: "from-[#c89666] to-[#e1b382]"
    },
    {
      id: 4,
      type: "innovation",
      title: "Sustainable Construction",
      subtitle: "Bottom Ash Utilization Projects",
      beforeStatement: "Replacing natural sand with bottom ash in pavers and bricks",
      description: "Innovative research in sustainable construction materials and practices",
      image: "/assets/home/paver.png",
      bgGradient: "from-[#12343b] to-[#2d545e]"
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
      className="relative w-full max-w-full min-w-0 mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[16/10] max-h-[280px] sm:max-h-[320px] md:max-h-[360px] bg-gradient-to-br rounded-xl overflow-hidden border border-gray-200 shadow-lg group">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#e1b382]/30 via-[#c89666]/20 to-[#e1b382]/30"
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
                  className="relative z-10 w-full h-full flex items-center justify-center p-3 sm:p-4 md:p-5 overflow-hidden"
                  whileHover={isActive ? { scale: 1.01 } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center w-full max-w-full min-w-0 px-2 sm:px-3">
                    {/* Image Display - Compact */}
                    {slide.image && !imageErrors[slide.id] ? (
                      <motion.div
                        key={`image-${currentSlide}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-2 sm:mb-3 flex justify-center"
                      >
                        <div className="relative w-full max-w-[140px] h-[80px] sm:max-w-[180px] sm:h-[100px] md:max-w-[220px] md:h-[120px] bg-white rounded-lg p-1.5 sm:p-2 flex items-center justify-center border border-gray-200 shadow mx-auto">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            width={220}
                            height={120}
                            className="object-contain w-full h-full"
                            style={{ objectFit: 'contain' }}
                            priority={index === 0}
                            sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 220px"
                            {...(index !== 0 && { loading: isActive || isNext || isPrev ? "eager" : "lazy" })}
                            onError={() => {
                              setImageErrors(prev => ({ ...prev, [slide.id]: true }));
                            }}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      slide.icon && (
                        <div className="mb-2 sm:mb-3 flex justify-center">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <slide.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                          </div>
                        </div>
                      )
                    )}
                    
                    {slide.beforeStatement && (
                      <motion.p
                        key={`before-${currentSlide}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="text-xs sm:text-sm text-[#e1b382] mb-1 font-medium line-clamp-1"
                      >
                        {slide.beforeStatement}
                      </motion.p>
                    )}
                    
                    <motion.h3
                      key={`title-${currentSlide}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-0.5 sm:mb-1 px-1 line-clamp-2"
                    >
                      {slide.title}
                    </motion.h3>
                    <motion.p
                      key={`subtitle-${currentSlide}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-xs sm:text-sm md:text-base text-[#e1b382] mb-1 sm:mb-2 px-1 line-clamp-1"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.p
                      key={`desc-${currentSlide}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-[10px] sm:text-xs text-gray-700 max-w-full mx-auto px-1 line-clamp-2 hidden xs:block"
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
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-30">
          <motion.div
            className="h-full bg-gradient-to-r from-[#2d545e] via-[#12343b] to-[#2d545e]"
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
          className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-white/90 backdrop-blur-md rounded-lg px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 z-30 pointer-events-none border border-gray-200 shadow-lg"
        >
          <div className="text-gray-900 text-xs sm:text-sm font-semibold">
            {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
        </motion.div>

        {/* Navigation Arrows - compact */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 backdrop-blur text-gray-900 hover:bg-white flex items-center justify-center z-40 shadow border border-gray-200 group/arrow"
          aria-label="Previous slide"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover/arrow:scale-110 transition-transform" />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2d545e]/20 to-[#12343b]/20 opacity-0 group-hover/arrow:opacity-100 transition-opacity"
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
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 backdrop-blur text-gray-900 hover:bg-white flex items-center justify-center z-40 shadow border border-gray-200 group/arrow"
          aria-label="Next slide"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/arrow:scale-110 transition-transform" />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2d545e]/20 to-[#12343b]/20 opacity-0 group-hover/arrow:opacity-100 transition-opacity"
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
          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur text-gray-900 hover:bg-white flex items-center justify-center z-40 shadow border border-gray-200"
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPaused ? (
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          )}
        </motion.button>
      </div>

      {/* Thumbnail Navigation - compact */}
      <div className="mt-3 sm:mt-4">
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide px-1 justify-center max-w-full">
          {slides.map((slide, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 w-14 h-10 sm:w-16 sm:h-11 md:w-20 md:h-14 rounded-md overflow-hidden border-2 transition-all ${
                index === currentSlide
                  ? "border-[#2d545e] shadow-lg shadow-[#2d545e]/30 scale-110"
                  : "border-[#c89666] hover:border-[#2d545e] opacity-60 hover:opacity-100"
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
                      className="absolute inset-0 bg-[#2d545e]/30"
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
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#2d545e]"
                  layoutId="activeThumbnail"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-1 sm:gap-1.5 mt-2 sm:mt-3 flex-wrap">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative rounded-full transition-all ${
              index === currentSlide
                ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] w-8 h-2.5 sm:w-10 sm:h-3"
                : "bg-[#c89666] hover:bg-[#2d545e] w-2.5 h-2.5 sm:w-3 sm:h-3"
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

