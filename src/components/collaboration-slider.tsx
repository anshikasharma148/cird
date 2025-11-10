"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Handshake, Sparkles, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function CollaborationSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const slides = [
    {
      id: 1,
      type: "collaboration",
      title: "In Collaboration with JPVL",
      subtitle: "Jaypee Power Ventures Limited",
      description: "Strategic partnership driving industrial research and development initiatives",
      image: "/assets/partners/jpvl-logo.png", // Placeholder - user will provide
      bgGradient: "from-blue-600 to-indigo-700"
    },
    {
      id: 2,
      type: "achievement",
      title: "14+ Active Projects",
      subtitle: "Ongoing Research Initiatives",
      description: "Multi-crore consultancy projects bridging academia and industry",
      icon: TrendingUp,
      bgGradient: "from-indigo-600 to-purple-700"
    },
    {
      id: 3,
      type: "innovation",
      title: "Cutting-Edge Research",
      subtitle: "Innovation at CIRD",
      description: "Advancing technology through collaborative research and development",
      icon: Sparkles,
      bgGradient: "from-purple-600 to-pink-700"
    },
    {
      id: 4,
      type: "partnership",
      title: "Industry Partners",
      subtitle: "Intel Corporation | EDGATE Technologies",
      description: "Collaborating with leading technology companies for advanced solutions",
      icon: Handshake,
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
              <div className={`w-full h-full bg-gradient-to-br ${slide.bgGradient} flex items-center justify-center p-12`}>
                <div className="text-center max-w-4xl mx-auto">
                  {slide.image && !imageErrors[slide.id] ? (
                    <div className="mb-8 flex justify-center">
                      <div className="relative w-64 h-32 bg-white/20 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          width={256}
                          height={128}
                          className="object-contain"
                          onError={() => {
                            setImageErrors(prev => ({ ...prev, [slide.id]: true }));
                          }}
                        />
                      </div>
                    </div>
                  ) : (slide.icon || imageErrors[slide.id]) ? (
                    <div className="mb-8 flex justify-center">
                      <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        {slide.icon && <slide.icon className="w-16 h-16 text-white" />}
                        {!slide.icon && imageErrors[slide.id] && (
                          <Handshake className="w-16 h-16 text-white" />
                        )}
                      </div>
                    </div>
                  ) : null}
                  <motion.h3
                    key={`title-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-4"
                  >
                    {slide.title}
                  </motion.h3>
                  <motion.p
                    key={`subtitle-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-2xl md:text-3xl text-blue-100 mb-6"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.p
                    key={`desc-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
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

