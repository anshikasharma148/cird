"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface Slide {
  src: string;
  alt: string;
}

export default function ProjectImagesSlider({ images }: { images: Slide[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [images.length]);

  if (!images.length) return null;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);
  const slide = images[current];

  return (
    <div className="relative w-full max-w-full min-w-0 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-lg aspect-video max-h-[280px] sm:max-h-[320px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full bg-slate-200">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-[#1A237E]" : "w-1.5 bg-white/60 hover:bg-white/80"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow border border-slate-200 flex items-center justify-center z-10 hover:bg-white text-slate-700"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow border border-slate-200 flex items-center justify-center z-10 hover:bg-white text-slate-700"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}
