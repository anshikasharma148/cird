"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Bot, 
  Cpu, 
  Brain, 
  Microscope, 
  Zap, 
  Target, 
  Award,
  ArrowRight,
  CircuitBoard,
  Database,
  Cog,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mix of images from assets (hero, home, entities, projects, training) – no team folder
const galleryImages = [
  { src: "/assets/hero/img1.jpeg", alt: "CIRD activity" },
  { src: "/assets/home/hero-image.jpg", alt: "CIRD" },
  { src: "/assets/entities/cdc/control-room.jpg", alt: "CDC control room" },
  { src: "/assets/hero/img3.jpg", alt: "CIRD activity" },
  { src: "/assets/entities/mtl/img5.jpeg", alt: "MTL lab" },
  { src: "/assets/projects/pavers/img1.jpeg", alt: "Pavers project" },
  { src: "/assets/hero/img5.jpg", alt: "CIRD activity" },
  { src: "/assets/entities/cdc/server-room.jpg", alt: "CDC server room" },
  { src: "/assets/training/sit2025.jpeg", alt: "Summer Industrial Training" },
  { src: "/assets/projects/chp/img2.jpeg", alt: "CHP project" },
  { src: "/assets/entities/mtl/img10.jpeg", alt: "MTL lab" },
  { src: "/assets/home/intel.jpg", alt: "CIRD partnership" },
];

const GLIMPSES_AUTO_ADVANCE_MS = 4500;

export function AboutSection() {
  const [glimpseIndex, setGlimpseIndex] = useState(0);

  const goPrev = useCallback(() => {
    setGlimpseIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1));
  }, []);
  const goNext = useCallback(() => {
    setGlimpseIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1));
  }, []);

  useEffect(() => {
    const t = setInterval(goNext, GLIMPSES_AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [goNext]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-3 sm:mb-4 bg-[#FF9800] text-white border-0 px-4 sm:px-6 py-1.5 sm:py-2 shadow text-xs sm:text-sm">
                About CIRD
              </Badge>
            </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A237E] mb-4 sm:mb-5 lg:mb-6 px-4">
            Centre for Industrial Research and Development
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#37474F] max-w-4xl mx-auto leading-relaxed px-4">
            An Industry–Academia interface established at Jaypee University of Engineering and Technology (JUET), Guna.
          </p>
        </motion.div>

        {/* Glimpses - slider */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block text-xs sm:text-sm font-semibold text-[#FF9800] uppercase tracking-[0.2em] mb-2">
              Gallery
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A237E] tracking-tight">
              Glimpses
            </h3>
            <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-[#FF9800] to-[#1A237E]" />
          </div>
          <div className="relative aspect-[16/9] sm:aspect-[2/1] max-w-5xl mx-auto rounded-2xl overflow-hidden border-2 border-[#1A237E]/10 shadow-xl shadow-[#1A237E]/5 ring-1 ring-black/5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={glimpseIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={galleryImages[glimpseIndex].src}
                  alt={galleryImages[glimpseIndex].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority={glimpseIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-[#FF9800] text-[#1A237E] hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-105 border border-[#1A237E]/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-[#FF9800] text-[#1A237E] hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-105 border border-[#1A237E]/10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2.5 z-10">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setGlimpseIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === glimpseIndex
                      ? "w-10 bg-[#FF9800] shadow-md"
                      : "w-2.5 bg-white/70 hover:bg-white hover:scale-110"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mb-8 sm:mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-50 rounded-xl p-5 sm:p-6 lg:p-8 border border-slate-200 shadow-sm"
          >
            <p className="text-sm sm:text-base lg:text-lg text-[#37474F] leading-relaxed">
              The Centre for Industrial Research and Development (CIRD) is an Industry–Academia interface 
              established by the Jaypee Universities at Jaypee University of Engineering and Technology (JUET), Guna. 
              The centre aims to facilitate research translation, technology development, intellectual property (IPR) management, 
              R&D collaboration, technology transfer and commercialization, and mentoring.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A237E] mb-4 sm:mb-5 lg:mb-6">Innovation &amp; Entrepreneurship</h3>
            <p className="text-sm sm:text-base lg:text-lg text-[#37474F] mb-4 sm:mb-5 lg:mb-6 leading-relaxed">
              CIRD has adopted several programs to enrich the entrepreneurial ecosystem and technology 
              commercialization efforts at the Institute.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Badge variant="secondary" className="bg-[#FF9800]/15 text-[#1A237E] border border-[#FF9800]/40 text-xs sm:text-sm">
                Innovation
              </Badge>
              <Badge variant="secondary" className="bg-[#FF9800]/15 text-[#1A237E] border border-[#FF9800]/40 text-xs sm:text-sm">
                Entrepreneurship
              </Badge>
              <Badge variant="secondary" className="bg-[#FF9800]/15 text-[#1A237E] border border-[#FF9800]/40 text-xs sm:text-sm">
                Commercialization
              </Badge>
              <Badge variant="secondary" className="bg-[#FF9800]/15 text-[#1A237E] border border-[#FF9800]/40 text-xs sm:text-sm">
                Technology Transfer
              </Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-50 rounded-xl p-5 sm:p-6 lg:p-8 border border-slate-200 shadow-sm"
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A237E] mb-4 sm:mb-5 lg:mb-6">R&amp;D Partnership</h3>
            <p className="text-sm sm:text-base lg:text-lg text-[#37474F] leading-relaxed">
              Projects addressing technologies at the core and aims at the development of proprietary knowledge 
              in a process, product, software, designs, specific/generic algorithm etc.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
              <Badge variant="secondary" className="bg-[#FF9800]/15 text-[#1A237E] border border-[#FF9800]/40 text-xs sm:text-sm">
                Research
              </Badge>
              <Badge variant="secondary" className="bg-[#FF9800]/15 text-[#1A237E] border border-[#FF9800]/40 text-xs sm:text-sm">
                Development
              </Badge>
              <Badge variant="secondary" className="bg-[#FF9800]/15 text-[#1A237E] border border-[#FF9800]/40 text-xs sm:text-sm">
                Partnership
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function XBracketProject() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 relative overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-3 sm:mb-4 bg-[#FF9800] text-white border-0 px-4 sm:px-6 py-1.5 sm:py-2 shadow text-xs sm:text-sm">
                🏆 Featured Project
              </Badge>
            </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A237E] mb-4 sm:mb-5 lg:mb-6 px-4">
            X-BRACKET <span className="text-[#FF9800]">POST</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#37474F] max-w-4xl mx-auto leading-relaxed px-4">
            A groundbreaking collaboration between CIRD and Jaiprakash Power Ventures Limited (JPVL) 
            that resulted in a patented equipment design, showcasing engineering excellence and 
            intellectual property innovation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {[
            {
              title: "Industry Partnership",
              description: "CIRD jPVL Collaboration",
              content: "A successful collaboration between CIRD at JUET and Jaiprakash Power Ventures Limited, demonstrating the power of industry-academia partnerships in driving innovation.",
              icon: Target,
              color: "bg-white"
            },
            {
              title: "Patent Registration",
              description: "Government of India Certified",
              content: "The X-BRACKET POST design was officially registered and certified by the Patent Office of the Government of India, showcasing engineering excellence.",
              icon: Award,
              color: "bg-white"
            },
            {
              title: "Intellectual Property",
              description: "Engineering Excellence",
              content: "This project exemplifies our commitment to creating valuable intellectual property through innovative engineering solutions and research.",
              icon: Zap,
              color: "bg-white"
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="bg-white border-slate-200 hover:border-[#1A237E] transition-all duration-300 hover:shadow-lg shadow-sm h-full">
                <CardHeader>
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <div className={`p-2 rounded-lg bg-[#1A237E] flex-shrink-0`}>
                      <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg lg:text-xl text-[#1A237E]">{card.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm sm:text-base text-[#37474F]">{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-[#37474F] leading-relaxed">{card.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CIRDEntities() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-950 to-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-blue-600 text-white border border-blue-500 px-6 py-2 shadow-lg shadow-blue-900/30">
                🏢 Research Entities
              </Badge>
            </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            CIRD <span className="text-white">Entities</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our specialized divisions working on cutting-edge research and development across 
            multiple technological domains.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* CDC Card - clickable to /entities/cdc */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/entities/cdc" className="block group/card">
              <Card className="bg-white border-[#1A237E]/20 hover:border-[#1A237E]/50 transition-all duration-300 hover:shadow-xl shadow-lg group overflow-hidden h-full">
                <div className="relative h-44 sm:h-52 overflow-hidden">
                  <Image src="/assets/entities/cdc/control-room.jpg" alt="CDC - Control Development Centre" fill className="object-cover group-hover/card:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-xl bg-[#1A237E] group-hover/card:scale-110 transition-transform duration-300">
                      <Cog className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-[#1A237E] group-hover/card:text-[#FF9800] transition-colors">
                        CDC - Control Development Centre
                      </CardTitle>
                      <CardDescription className="text-slate-600 text-lg">
                        Advanced Control Systems Research
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-6 leading-relaxed">
                    The Control Development Centre focuses on developing sophisticated control systems 
                    and automation solutions for industrial applications. Our research spans from basic 
                    control theory to advanced AI-driven control mechanisms.
                  </p>
                  <div className="space-y-3">
                    <h4 className="text-slate-900 font-semibold mb-3">Key Focus Areas:</h4>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#1A237E] rounded-full"></div>
                      <span className="text-slate-700">Software Development & Programming</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#1A237E] rounded-full"></div>
                      <span className="text-slate-700">Robotics Development & Automation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#1A237E] rounded-full"></div>
                      <span className="text-slate-700">VLSI Design & Microelectronics</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#1A237E] rounded-full"></div>
                      <span className="text-slate-700">Artificial Intelligence & Machine Learning</span>
                    </div>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-[#1A237E] font-semibold group-hover/card:text-[#FF9800] transition-colors">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* MTL Lab Card - clickable to /entities/mtl */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/entities/mtl" className="block group/card">
              <Card className="bg-white border-[#1A237E]/20 hover:border-[#1A237E]/50 transition-all duration-300 hover:shadow-xl shadow-lg group overflow-hidden h-full">
                <div className="relative h-44 sm:h-52 overflow-hidden">
                  <Image src="/assets/entities/mtl/img5.jpeg" alt="MTL Lab - Mechanical Testing Lab" fill className="object-cover group-hover/card:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-xl bg-[#1A237E] group-hover/card:scale-110 transition-transform duration-300">
                      <Microscope className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-[#1A237E] group-hover/card:text-[#FF9800] transition-colors">
                        MTL Lab (Mechanical Testing Lab)
                      </CardTitle>
                      <CardDescription className="text-slate-600 text-lg">
                        Specialized Research Laboratory
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-6 leading-relaxed">
                    The MTL Lab (Mechanical Testing Lab) is a specialized research facility dedicated to advanced technological 
                    research and development. Our lab focuses on cutting-edge technologies and innovative 
                    solutions for modern industrial challenges.
                  </p>
                  <div className="space-y-3">
                    <h4 className="text-slate-900 font-semibold mb-3">Key Focus Areas:</h4>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#1A237E] rounded-full"></div>
                      <span className="text-slate-700">Advanced Materials Research</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#1A237E] rounded-full"></div>
                      <span className="text-slate-700">Technology Innovation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#1A237E] rounded-full"></div>
                      <span className="text-slate-700">Laboratory Testing & Analysis</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#1A237E] rounded-full"></div>
                      <span className="text-slate-700">Research & Development</span>
                    </div>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-[#1A237E] font-semibold group-hover/card:text-[#FF9800] transition-colors">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
