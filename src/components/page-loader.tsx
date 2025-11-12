"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, TrendingUp, Brain, Code, Users, BookOpen, Building2, GraduationCap, Microscope, Mail } from "lucide-react";

interface PageLoaderProps {
  message?: string;
  pageType?: "home" | "about" | "research" | "training" | "team" | "entities" | "project" | "profile" | "contact";
}

const pageMessages: Record<string, string> = {
  home: "Loading CIRD Home...",
  about: "Discovering CIRD's Mission...",
  research: "Exploring Research Projects...",
  training: "Loading Training Programs...",
  team: "Meeting Our Team...",
  entities: "Exploring CIRD Entities...",
  project: "Loading Project Details...",
  profile: "Loading Profile...",
  contact: "Loading Contact Information...",
};

const pageIcons: Record<string, typeof Brain> = {
  home: Sparkles,
  about: BookOpen,
  research: Microscope,
  training: GraduationCap,
  team: Users,
  entities: Building2,
  project: TrendingUp,
  profile: Users,
  contact: Mail,
};

export default function PageLoader({ message, pageType = "home" }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Check if all images are loaded
    const checkImagesLoaded = () => {
      const images = document.querySelectorAll('img');
      if (images.length === 0) {
        setImagesLoaded(true);
        return;
      }

      let loadedCount = 0;
      const totalImages = images.length;

      const imageLoadHandler = () => {
        loadedCount++;
        if (loadedCount >= totalImages) {
          setImagesLoaded(true);
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
        } else {
          img.addEventListener('load', imageLoadHandler);
          img.addEventListener('error', imageLoadHandler);
        }
      });

      if (loadedCount >= totalImages) {
        setImagesLoaded(true);
      }
    };

    // Wait for DOM to be ready
    if (document.readyState === 'complete') {
      setTimeout(checkImagesLoaded, 100);
    } else {
      window.addEventListener('load', () => {
        setTimeout(checkImagesLoaded, 100);
      });
    }

    // Also check after a short delay to catch dynamically loaded images
    const checkInterval = setInterval(() => {
      checkImagesLoaded();
    }, 200);

    // Hide loader when images are loaded and minimum time has passed
    const timer = setTimeout(() => {
      if (imagesLoaded) {
        setIsLoading(false);
        clearInterval(checkInterval);
      }
    }, 1500);

    // Force hide after maximum time
    const maxTimer = setTimeout(() => {
      setIsLoading(false);
      clearInterval(checkInterval);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(maxTimer);
      clearInterval(checkInterval);
    };
  }, [imagesLoaded]);

  // Update imagesLoaded state when it changes
  useEffect(() => {
    if (imagesLoaded && isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded, isLoading]);

  const displayMessage = message || pageMessages[pageType] || "Loading...";
  const Icon = pageIcons[pageType] || Sparkles;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9998] bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 flex items-center justify-center"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 30, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-indigo-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, -30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center px-4">
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-center"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
              >
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </motion.div>
            </motion.div>

            {/* Loading Message */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6"
            >
              {displayMessage}
            </motion.h2>

            {/* Animated Loading Dots */}
            <div className="flex justify-center items-center gap-2 mb-6">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Spinning Circle Animation */}
            <div className="relative w-12 h-12 md:w-16 md:h-16 mx-auto">
              <motion.div
                className="absolute inset-0 border-3 md:border-4 border-blue-400/30 border-t-blue-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-1 md:inset-2 border-3 md:border-4 border-indigo-400/30 border-t-indigo-500 rounded-full"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

