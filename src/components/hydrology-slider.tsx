"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Droplets } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const HYDROLOGY_SLIDES = [
  { src: "/assets/hydrology/dashboard.png", title: "Dashboard", alt: "Hydrology Monitoring System Dashboard" },
  { src: "/assets/hydrology/aws.png", title: "Automated Weather System", alt: "AWS data for G&D stations" },
  { src: "/assets/hydrology/ews.png", title: "Early Warning System", alt: "EWS stations - Mana, Vasudhara, Benakuli" },
  { src: "/assets/hydrology/trends.png", title: "Trends", alt: "Weather and water level trends" },
];

export default function HydrologySlider() {
  const [current, setCurrent] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  // Reset error for current slide when slide changes so we retry loading
  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setImageError((p) => ({ ...p, [index]: false }));
  }, []);
  const prev = () => goTo((current - 1 + HYDROLOGY_SLIDES.length) % HYDROLOGY_SLIDES.length);
  const next = () => goTo((current + 1) % HYDROLOGY_SLIDES.length);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % HYDROLOGY_SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const slide = HYDROLOGY_SLIDES[current];
  const showPlaceholder = imageError[current];

  return (
    <div className="relative w-full max-w-full min-w-0 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-lg aspect-video max-h-[320px] sm:max-h-[380px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full bg-slate-200">
            {!showPlaceholder ? (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 60vw"
                unoptimized
                onError={() => setImageError((p) => ({ ...p, [current]: true }))}
              />
            ) : null}
            {showPlaceholder && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 p-6">
                <Droplets className="w-14 h-14 text-[#1A237E]/50" />
                <span className="font-semibold text-[#1A237E]">{slide.title}</span>
                <span className="text-sm text-center">Image not found: /assets/hydrology/{slide.src.split("/").pop()}</span>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
        {HYDROLOGY_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-[#1A237E]" : "w-1.5 bg-white/60 hover:bg-white/80"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow border border-slate-200 flex items-center justify-center z-10 hover:bg-white text-slate-700"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow border border-slate-200 flex items-center justify-center z-10 hover:bg-white text-slate-700"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
