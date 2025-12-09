"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, TrendingUp, Brain, Code } from "lucide-react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after page loads
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Show for at least 2.5 seconds

    // Also hide when page is fully loaded
    if (document.readyState === 'complete') {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      });
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 flex items-center justify-center"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, -50, 0],
                y: [0, -30, 0],
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
          <div className="relative z-10 text-center">
            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Welcome to CIRD
              </motion.h1>
              <p className="text-lg md:text-xl lg:text-2xl text-blue-200">
                Centre for Industrial Research and Development
              </p>
            </motion.div>

            {/* Animated Icons */}
            <div className="flex justify-center gap-8 mb-12">
              {[
                { icon: Brain, delay: 0 },
                { icon: Code, delay: 0.2 },
                { icon: TrendingUp, delay: 0.4 },
                { icon: Sparkles, delay: 0.6 },
              ].map(({ icon: Icon, delay }) => (
                <motion.div
                  key={delay}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay,
                      ease: "easeInOut"
                    }}
                    className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
                  >
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Animated Loading Dots */}
            <div className="flex justify-center items-center gap-2 mb-6">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full"
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
            <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-6">
              <motion.div
                className="absolute inset-0 border-4 border-blue-400/30 border-t-blue-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-2 border-4 border-indigo-400/30 border-t-indigo-500 rounded-full"
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

