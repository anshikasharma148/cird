"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Mail, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Hero images for slider
const heroImages = [
  {
    src: "/assets/home/hero-image.jpg",
    alt: "CIRD Hero Image",
    title: "Driving Innovation Forward",
    subtitle: "Transforming research into real-world solutions"
  },
  // Add more images here when available
];

// Stats data with links
const stats = [
  {
    value: "15+",
    label: "Research Projects",
    link: "/research"
  },
  {
    value: "18",
    label: "Patents Filed",
    link: "/patents"
  },
  {
    value: "50+",
    label: "Publications",
    link: "#" // No dedicated page, can be updated later
  },
  {
    value: "3",
    label: "Research Centers",
    link: "/entities"
  },
  {
    value: "11",
    label: "Ongoing Projects",
    link: "/research"
  },
  {
    value: "4",
    label: "Completed Projects",
    link: "/research"
  },
  {
    value: "30+",
    label: "Team Members",
    link: "/team"
  },
  {
    value: "1",
    label: "MoU Signed",
    link: "/mou"
  }
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const router = useRouter();

  // Auto-slide functionality for hero images
  useEffect(() => {
    if (isPaused || heroImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, heroImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  };

  return (
    <section className="relative w-full bg-white">
      {/* Header Section with Logo and Full Form */}
      <div className="bg-[#e1b382] border-b border-[#c89666]">
        <div className="container mx-auto px-4 sm:px-8 md:px-16 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Logo and Full Form */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {/* Logo Circle */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2d545e] to-[#12343b] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#2d545e] tracking-tight">
                    CIRD
                  </h1>
                  <p className="text-sm md:text-base lg:text-lg text-[#2d545e] font-medium">
                    Centre for Industrial Research and Development
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info and Social Links */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="hidden md:flex flex-col items-end text-right gap-1">
                <div className="flex items-center gap-2 text-sm text-[#2d545e]">
                  <MapPin className="w-4 h-4 text-[#2d545e]" />
                  <span>Jaypee University of Engineering and Technology, Guna, Madhya Pradesh, India</span>
                </div>
                <a href="mailto:support@cird.co.in" className="flex items-center gap-2 text-sm text-[#2d545e] hover:text-[#12343b] transition-colors">
                  <Mail className="w-4 h-4 text-[#2d545e]" />
                  <span>support@cird.co.in</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href="https://www.linkedin.com/in/center-of-industrial-research-and-development/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#e1b382] hover:bg-[#2d545e] flex items-center justify-center transition-colors group"
                >
                  <Linkedin className="w-4 h-4 text-[#2d545e] group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-[#e1b382] border-b border-[#c89666] relative z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-8 md:px-16">
          <nav className="flex h-16 items-center justify-end">
            <NavigationMenu className="flex-1 justify-end">
              <NavigationMenuList className="flex flex-wrap justify-end gap-0.5 md:gap-1">
                <NavigationMenuItem>
                  <Link href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-2 md:px-4 py-2 text-xs md:text-sm font-medium transition-all duration-300 hover:bg-[#2d545e] hover:text-white focus:bg-[#2d545e] focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-[#2d545e] data-[active]:bg-[#2d545e] data-[active]:text-white">
                    <span className="group-hover:scale-105 transition-transform duration-200">Home</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-2 md:px-4 py-2 text-xs md:text-sm font-medium transition-all duration-300 hover:bg-[#2d545e] hover:text-white focus:bg-[#2d545e] focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-[#2d545e]">
                    <span className="group-hover:scale-105 transition-transform duration-200">About</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <div className="relative group/nav">
                    <NavigationMenuTrigger 
                      className="bg-transparent text-[#2d545e] hover:bg-[#2d545e] hover:text-white data-[state=open]:bg-[#2d545e] data-[state=open]:text-white cursor-pointer px-2 md:px-4 text-xs md:text-sm h-10"
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.tagName !== 'svg' && !target.closest('svg')) {
                          router.push('/research');
                        }
                      }}
                    >
                      <span className="group-hover/nav:scale-105 transition-transform duration-200 cursor-pointer">
                        Research
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white backdrop-blur-xl border border-[#c89666] shadow-xl w-max max-w-2xl z-50">
                      <ul className="grid gap-3 p-4 w-max">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/projects/ba01-pp-b"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                BA01/PP/B - Problems and Remedies of Bottom Ash Replacement
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Investigate challenges and develop remedies for replacing natural sand with bottom ash
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/projects/ba01-pp-c"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                BA01/PP/C - Bottom Ash Replacement in Pavers and Bricks
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Develop methodology to replace 80% of sand with bottom ash in paver and brick manufacturing
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/projects/ba03-pp-b"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                BA03/PP/B - Monitoring & Control System for CHP
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Automate and monitor conveyor systems in coal handling plants using robotics and PLC control
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/projects/ba07-pp-a"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                BA07/PP/A - Early Warning System (EWS)
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Real-time hydrological monitoring and early warning system for flood and weather monitoring
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/projects/ba07-pp-b"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                BA07/PP/B - Automatic Weather Station (AWS)
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Automate weather data collection and visualization for hydro stations
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </div>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <div className="relative group/nav">
                    <NavigationMenuTrigger 
                      className="bg-transparent text-[#2d545e] hover:bg-[#2d545e] hover:text-white data-[state=open]:bg-[#2d545e] data-[state=open]:text-white cursor-pointer px-2 md:px-4 text-xs md:text-sm h-10"
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.tagName !== 'svg' && !target.closest('svg')) {
                          router.push('/entities');
                        }
                      }}
                    >
                      <span className="group-hover/nav:scale-105 transition-transform duration-200 cursor-pointer">
                        Entities
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white backdrop-blur-xl border border-[#c89666] shadow-xl w-max max-w-xl z-50">
                      <ul className="grid gap-3 p-4 w-max">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/entities/cdc"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                CDC - Control Development Centre
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Advanced Control Systems Research
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/entities/mtl"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                MTL - Mechanical Testing Lab
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Specialized research laboratory for advanced material and mechanical testing
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </div>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <div className="relative group/nav">
                    <NavigationMenuTrigger 
                      className="bg-transparent text-[#2d545e] hover:bg-[#2d545e] hover:text-white data-[state=open]:bg-[#2d545e] data-[state=open]:text-white cursor-pointer px-2 md:px-4 text-xs md:text-sm h-10"
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.tagName !== 'svg' && !target.closest('svg')) {
                          router.push('/training');
                        }
                      }}
                    >
                      <span className="group-hover/nav:scale-105 transition-transform duration-200 cursor-pointer">
                        Training
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white backdrop-blur-xl border border-[#c89666] shadow-xl w-max max-w-xl z-50">
                      <ul className="grid gap-3 p-4 w-max">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/training#overview"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                Program Overview
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Summer Industrial Training 2025 - Program details and structure
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/training#ai-srijan"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                AI Srijan - Faculty Development Programme
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Hands-on sessions in Machine Learning and Deep Learning with Intel
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/training#power-plant"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                Power Plant Visit
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Visit to Jaypee Nigrie Super Thermal Power Plant
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/training#closing"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                Closing Ceremony
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Recognition, certificates, and program conclusion
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </div>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <div className="relative group/nav">
                    <NavigationMenuTrigger 
                      className="bg-transparent text-[#2d545e] hover:bg-[#2d545e] hover:text-white data-[state=open]:bg-[#2d545e] data-[state=open]:text-white cursor-pointer px-2 md:px-4 text-xs md:text-sm h-10"
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.tagName !== 'svg' && !target.closest('svg')) {
                          router.push('/team');
                        }
                      }}
                    >
                      <span className="group-hover/nav:scale-105 transition-transform duration-200 cursor-pointer">
                        Team
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white backdrop-blur-xl border border-[#c89666] shadow-xl w-max max-w-xl z-50">
                      <ul className="grid gap-3 p-4 w-max">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/team#coordination"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                Coordination Committee
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Leading CIRD's vision and strategic direction
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/team#technical"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                Technical Professional Consultants
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Expert consultants supporting CIRD projects
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/team#cdc"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                Control Development Centre Team
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Software development and automation specialists
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/team#mtl"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                Mechanical Testing Lab Team
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Meet the talented professionals driving innovation at MTL
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/team#nodal"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#e1b382]/20 focus:bg-[#e1b382]/20"
                            >
                              <div className="text-sm font-medium leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors">
                                Nodal Officers of JPVL
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                                Key collaborators from JPVL supporting CIRD projects
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </div>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/patents" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-2 md:px-4 py-2 text-xs md:text-sm font-medium transition-all duration-300 hover:bg-[#2d545e] hover:text-white focus:bg-[#2d545e] focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-[#2d545e]">
                    <span className="group-hover:scale-105 transition-transform duration-200">Patents</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/mou" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-2 md:px-4 py-2 text-xs md:text-sm font-medium transition-all duration-300 hover:bg-[#2d545e] hover:text-white focus:bg-[#2d545e] focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-[#2d545e]">
                    <span className="group-hover:scale-105 transition-transform duration-200">MoU</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-2 md:px-4 py-2 text-xs md:text-sm font-medium transition-all duration-300 hover:bg-[#2d545e] hover:text-white focus:bg-[#2d545e] focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-[#2d545e]">
                    <span className="group-hover:scale-105 transition-transform duration-200">Contact</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="http://115.242.156.230:3000" target="_blank" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-2 md:px-4 py-2 text-xs md:text-sm font-medium transition-all duration-300 hover:bg-[#2d545e] hover:text-white focus:bg-[#2d545e] focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-[#2d545e]">
                    <span className="group-hover:scale-105 transition-transform duration-200">Hydrology</span>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative w-full h-[75vh] md:h-[83vh] overflow-hidden">
        {heroImages.map((image, index) => {
          const isActive = index === currentImageIndex;
          return (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.05,
              }}
              transition={{
                duration: 1,
                ease: "easeInOut"
              }}
              style={{
                zIndex: isActive ? 1 : 0,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                className="object-cover"
                quality={90}
              />
              {/* Overlay with text */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent flex items-center">
                <div className="container mx-auto px-8 md:px-16 z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -50 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-2xl"
                  >
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                      {image.title}
                    </h2>
                    <p className="text-base md:text-lg text-white/90 mb-4">
                      {image.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/research">
                        <Button 
                          size="lg" 
                          className="bg-[#2d545e] hover:bg-[#12343b] text-white px-6 py-4 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Explore Research
                          <ArrowRight className="ml-2" size={18} />
                        </Button>
                      </Link>
                      <Link href="/about">
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-6 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                        >
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Navigation Arrows - Only show if more than one image */}
        {heroImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all flex items-center justify-center z-20 shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all flex items-center justify-center z-20 shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slider Indicators - Only show if stats are not visible */}
        {heroImages.length > 1 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 6000);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Stats Section - Continuous Scrolling Ticker */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#2d545e] to-[#12343b] py-4 md:py-6 z-30 shadow-lg overflow-hidden">
          <div className="relative w-full h-16 md:h-20 flex items-center">
            {/* Scrolling ticker container */}
            <div className="flex items-center whitespace-nowrap animate-scroll">
              {/* First set of stats */}
              {stats.map((stat, index) => (
                <div key={`first-${index}`} className="inline-flex items-center mx-8 md:mx-12">
                  {stat.link && stat.link !== "#" ? (
                    <Link 
                      href={stat.link}
                      className="text-center hover:scale-105 transition-transform duration-200 cursor-pointer group"
                    >
                      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white inline-block mr-2 group-hover:text-[#e1b382] transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm lg:text-base text-[#e1b382] inline-block group-hover:text-white transition-colors">
                        {stat.label}
                      </div>
                    </Link>
                  ) : (
                    <div className="text-center">
                      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white inline-block mr-2">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm lg:text-base text-[#e1b382] inline-block">
                        {stat.label}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* Separator */}
              <div className="inline-block w-1 h-8 bg-[#e1b382]/50 mx-4"></div>
              {/* Duplicate set for seamless loop */}
              {stats.map((stat, index) => (
                <div key={`second-${index}`} className="inline-flex items-center mx-8 md:mx-12">
                  {stat.link && stat.link !== "#" ? (
                    <Link 
                      href={stat.link}
                      className="text-center hover:scale-105 transition-transform duration-200 cursor-pointer group"
                    >
                      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white inline-block mr-2 group-hover:text-[#e1b382] transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm lg:text-base text-[#e1b382] inline-block group-hover:text-white transition-colors">
                        {stat.label}
                      </div>
                    </Link>
                  ) : (
                    <div className="text-center">
                      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white inline-block mr-2">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm lg:text-base text-[#e1b382] inline-block">
                        {stat.label}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
