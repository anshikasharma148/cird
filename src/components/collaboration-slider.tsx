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

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setIsPaused(true);
    setCurrentSlide((prev) => {
      const next = (prev + 1) % slides.length;
      setTimeout(() => setIsPaused(false), 6000);
      return next;
    });
  };

  const prevSlide = () => {
    setIsPaused(true);
    setCurrentSlide((prev) => {
      const next = (prev - 1 + slides.length) % slides.length;
      setTimeout(() => setIsPaused(false), 6000);
      return next;
    });
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setIsPaused(true);
    setCurrentSlide(index);
    setTimeout(() => setIsPaused(false), 6000);
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="relative aspect-video bg-gradient-to-br rounded-2xl overflow-hidden border border-blue-300 shadow-2xl">
        {/* Slider Container */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
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
              {/* Background Gradient */}
              <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${slide.bgGradient}`}></div>
              
              {/* Content */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-8 md:p-12">
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
                          className="object-contain max-w-full max-h-full"
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
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
              </div>
            </motion.div>
          ))}
        </div>

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
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-blue-600 w-8"
                : "bg-blue-300 hover:bg-blue-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

