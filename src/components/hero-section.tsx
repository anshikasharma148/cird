"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Search } from "lucide-react";

// Hero slider slides - CIRD features; bgColor matches each image's background
const heroSlides = [
  {
    id: "innovation",
    title: "Innovation & Research",
    description: "CIRD has adopted several programs to enrich the entrepreneurial ecosystem and technology commercialization efforts at the Institute. An Industry–Academia interface at JUET, Guna.",
    link: "/research",
    linkLabel: "Explore",
    image: "/assets/hero/techimage.png",
    bgColor: "#1A237E",
    textTheme: "light", // white text on dark bg
  },
  {
    id: "partnership",
    title: "R&D Partnership",
    description: "Projects addressing technologies at the core and development of proprietary knowledge in process, product, software, designs, and algorithms.",
    link: "/research",
    linkLabel: "View Projects",
    image: "/assets/hero/partnership.png",
    bgColor: "#FFC107", // yellow to match image
    textTheme: "dark", // dark text on light bg
  },
  {
    id: "patents",
    title: "Patents & Technology Transfer",
    description: "IP management, technology transfer, and commercialization. Our patents reflect cutting-edge research and innovation at CIRD.",
    link: "/patents",
    linkLabel: "View Patents",
    image: "/assets/hero/patent.png",
    bgColor: "#2E7D32", // green to match image
    textTheme: "light",
  },
  {
    id: "entities",
    title: "Research Entities & Labs",
    description: "CDC and MTL Lab drive advanced control systems, materials research, and specialized testing. Explore our research entities.",
    link: "/entities",
    linkLabel: "Explore Entities",
    image: "/assets/hero/connectingtoworld.png",
    bgColor: "#1565C0", // blue
    textTheme: "light",
  },
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

// Parse "15+", "18", "50+" -> { num: 15, suffix: "+" } etc.
function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(\+)?$/);
  if (!match) return { num: 0, suffix: "" };
  return { num: parseInt(match[1], 10), suffix: match[2] ?? "" };
}

// Count-up: 1, 2, 3, ... target one by one, fast (never show 0)
const STEP_MS = 45; // ms per step so 1→2→3 is fast but visible

function useCountUp(target: number, suffix: string) {
  const [display, setDisplay] = useState(() => (target <= 1 ? target : 1));
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    if (target <= 0) {
      setDisplay(0);
      return;
    }
    if (target <= 1) {
      setDisplay(target);
      return;
    }
    let current = 1;
    setDisplay(1);
    const id = setInterval(() => {
      if (!mountedRef.current) return;
      current += 1;
      if (current >= target) {
        setDisplay(target);
        clearInterval(id);
        return;
      }
      setDisplay(current);
    }, STEP_MS);
    return () => {
      mountedRef.current = false;
      clearInterval(id);
    };
  }, [target]);

  return `${display}${suffix}`;
}

// Renders stat value with count-up animation (used in map, so hook is in child)
function AnimatedStatValue({ value }: { value: string }) {
  const { num, suffix } = parseStatValue(value);
  const display = useCountUp(num, suffix);
  return <>{display}</>;
}

export default function HeroSection() {
  const [headerHeight, setHeaderHeight] = useState(152);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const totalSlides = heroSlides.length;
  const goNext = useCallback(() => setCurrentSlide((p) => (p + 1) % totalSlides), [totalSlides]);
  const goPrev = useCallback(() => setCurrentSlide((p) => (p - 1 + totalSlides) % totalSlides), [totalSlides]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const t = setInterval(goNext, 5500);
    return () => clearInterval(t);
  }, [goNext]);

  return (
    <section className="relative w-full bg-white">
      {/* Fixed Header and Navigation Container - FITT-style theme */}
      <div ref={headerRef} className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm border-b border-slate-200">
        {/* Top Bar: Logo, Search, Buttons - white background */}
        <div className="border-b border-slate-200 bg-white">
          <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-16 py-2.5 sm:py-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF9800] flex items-center justify-center shadow flex-shrink-0">
                  <span className="text-white font-bold text-lg sm:text-xl">C</span>
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-[#1A237E] tracking-tight truncate">CIRD</h1>
                  <p className="text-[10px] sm:text-xs text-[#37474F] font-medium hidden sm:block truncate max-w-[200px] lg:max-w-none">
                    Centre for Industrial Research and Development
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden sm:flex items-center flex-1 max-w-[180px] lg:max-w-[220px] bg-slate-100 border border-slate-200 rounded-md px-3 py-2 text-slate-500 text-sm">
                  <Search className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Find Anything</span>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white bg-[#263238] hover:bg-[#37474F] rounded transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/agent"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold text-white bg-[#4CAF50] hover:bg-[#43A047] rounded transition-colors"
                  title="Margadarshak Dashboard"
                >
                  <Shield size={14} />
                  <span className="hidden sm:inline">Agent Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar - dark blue */}
        <div className="bg-[#1A237E]">
          <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-16">
            <nav className="flex h-12 sm:h-14 items-center justify-center">
              <NavigationMenu className="hidden lg:flex flex-1 justify-center">
                <NavigationMenuList className="flex flex-wrap justify-center gap-0.5 md:gap-1">
                  <NavigationMenuItem>
                    <Link href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-2 md:px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 hover:bg-white/10 text-white focus:outline-none">
                      <span className="group-hover:scale-105 transition-transform duration-200">Home</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/about" aria-label="About CIRD" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-2 md:px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 hover:bg-white/10 text-white focus:outline-none">
                      <span className="group-hover:scale-105 transition-transform duration-200">About</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/authorities" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-2 md:px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 hover:bg-white/10 text-white focus:outline-none">
                      <span className="group-hover:scale-105 transition-transform duration-200">Authorities</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <div className="relative group/nav">
                      <NavigationMenuTrigger
                        className="bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10 cursor-pointer px-2 md:px-4 text-sm md:text-base font-semibold h-10"
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
                      <NavigationMenuContent className="bg-white backdrop-blur-xl border border-slate-200 shadow-xl w-max max-w-2xl z-50">
                        <ul className="grid gap-3 p-4 w-max">
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/projects/ba01-pp-b"
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                        className="bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10 cursor-pointer px-2 md:px-4 text-sm md:text-base font-semibold h-10"
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
                      <NavigationMenuContent className="bg-white backdrop-blur-xl border border-slate-200 shadow-xl w-max max-w-xl z-50">
                        <ul className="grid gap-3 p-4 w-max">
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/entities/cdc"
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                        className="bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10 cursor-pointer px-2 md:px-4 text-sm md:text-base font-semibold h-10"
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
                      <NavigationMenuContent className="bg-white backdrop-blur-xl border border-slate-200 shadow-xl w-max max-w-xl z-50">
                        <ul className="grid gap-3 p-4 w-max">
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/training#overview"
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                        className="bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10 cursor-pointer px-2 md:px-4 text-sm md:text-base font-semibold h-10"
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
                      <NavigationMenuContent className="bg-white backdrop-blur-xl border border-slate-200 shadow-xl w-max max-w-xl z-50">
                        <ul className="grid gap-3 p-4 w-max">
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/team#coordination"
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                              >
                                <div className="text-sm font-medium leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
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
                    <Link href="/patents" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-2 md:px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 hover:bg-white/10 text-white focus:outline-none">
                      <span className="group-hover:scale-105 transition-transform duration-200">Patents</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/mou" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-2 md:px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 hover:bg-white/10 text-white focus:outline-none">
                      <span className="group-hover:scale-105 transition-transform duration-200">MoU</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/contact" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-2 md:px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 hover:bg-white/10 text-white focus:outline-none">
                      <span className="group-hover:scale-105 transition-transform duration-200">Contact</span>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="https://hydrologyjpvl.cird.co.in" target="_blank" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-2 md:px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 hover:bg-white/10 text-white focus:outline-none">
                      <span className="group-hover:scale-105 transition-transform duration-200">Hydrology</span>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Mobile/Tablet Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white hover:bg-white/10 flex-shrink-0 ml-2 p-2 min-w-[40px] h-10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={22} className="sm:w-6 sm:h-6" /> : <Menu size={22} className="sm:w-6 sm:h-6" />}
              </Button>
            </nav>
          </div>

          {/* Mobile/Tablet Menu */}
          {isMobileMenuOpen && (
            <div
              className="lg:hidden border-t border-white/20 bg-[#1A237E] backdrop-blur-md transition-all duration-300 max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-9rem)] overflow-y-auto shadow-lg"
            >
              <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-1 sm:space-y-2">
                <Link
                  href="/agent"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors font-semibold"
                >
                  <Shield size={16} />
                  <span>Margadarshak Dashboard</span>
                </Link>
                <div className="border-t border-white/20 my-2"></div>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors font-semibold"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  aria-label="About CIRD"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors font-semibold"
                >
                  About
                </Link>
                <Link
                  href="/authorities"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors font-semibold"
                >
                  Authorities
                </Link>
                <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/80 font-semibold uppercase tracking-wide">
                  Research
                </div>
                <Link
                  href="/research"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  All Research Projects
                </Link>
                <Link
                  href="/projects/ba01-pp-b"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  BA01/PP/B - Problems and Remedies
                </Link>
                <Link
                  href="/projects/ba01-pp-c"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  BA01/PP/C - Bottom Ash in Pavers
                </Link>
                <Link
                  href="/projects/ba03-pp-b"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  BA03/PP/B - CHP Monitoring
                </Link>
                <Link
                  href="/projects/ba07-pp-a"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  BA07/PP/A - Early Warning System
                </Link>
                <Link
                  href="/projects/ba07-pp-b"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  BA07/PP/B - Weather Station
                </Link>
                <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/80 font-semibold uppercase tracking-wide">
                  Entities
                </div>
                <Link
                  href="/entities"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  All Entities
                </Link>
                <Link
                  href="/entities/cdc"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  CDC - Control Development Centre
                </Link>
                <Link
                  href="/entities/mtl"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  MTL - Mechanical Testing Lab
                </Link>
                <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/80 font-semibold uppercase tracking-wide">
                  Training
                </div>
                <Link
                  href="/training"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  All Training Programs
                </Link>
                <Link
                  href="/training#overview"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  Program Overview
                </Link>
                <Link
                  href="/training#ai-srijan"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  AI Srijan FDP
                </Link>
                <Link
                  href="/training#power-plant"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  Power Plant Visit
                </Link>
                <Link
                  href="/training#closing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  Closing Ceremony
                </Link>
                <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/80 font-semibold uppercase tracking-wide">
                  Team
                </div>
                <Link
                  href="/team"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  All Team Members
                </Link>
                <Link
                  href="/team#coordination"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  Coordination Committee
                </Link>
                <Link
                  href="/team#technical"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  Technical Consultants
                </Link>
                <Link
                  href="/team#cdc"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  CDC Team
                </Link>
                <Link
                  href="/team#mtl"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  MTL Team
                </Link>
                <Link
                  href="/team#nodal"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  Nodal Officers
                </Link>
                <Link
                  href="/patents"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors font-semibold"
                >
                  Patents
                </Link>
                <Link
                  href="/mou"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors font-semibold"
                >
                  MoU
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors font-semibold"
                >
                  Contact
                </Link>
                <Link
                  href="https://hydrologyjpvl.cird.co.in"
                  target="_blank"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors font-semibold"
                >
                  Hydrology
                </Link>
              </div>
            </div>
          )}
        </div>
        {/* Announcement strip - single line visible, scrolls right-to-left; duplicate only for seamless loop */}
        <div className="bg-[#FF9800] py-1.5 overflow-hidden w-full" aria-label="Latest news ticker">
          <div className="flex animate-news-ticker whitespace-nowrap text-white text-xs sm:text-sm font-medium uppercase tracking-wide hover:[animation-play-state:paused] w-max">
            <span className="inline-block min-w-[100vw] w-[100vw] text-center flex-shrink-0">LATEST NEWS &amp; ANNOUNCEMENTS -*-</span>
            <span className="inline-block min-w-[100vw] w-[100vw] text-center flex-shrink-0">LATEST NEWS &amp; ANNOUNCEMENTS -*-</span>
          </div>
        </div>
      </div>

      {/* Hero Section - Stylized landing with gradient overlay and depth */}
      <div
        className="relative w-full flex flex-col overflow-hidden transition-colors duration-500"
        style={{ paddingTop: `${headerHeight}px`, backgroundColor: heroSlides[currentSlide].bgColor }}
      >
        {/* Subtle gradient overlay for depth (darker at bottom) */}
        <div 
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, ${heroSlides[currentSlide].textTheme === "dark" ? "rgba(0,0,0,0.03)" : "rgba(0,0,0,0.15)"} 70%, ${heroSlides[currentSlide].textTheme === "dark" ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.25)"} 100%)`,
          }}
        />
        {/* Decorative accent line */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 opacity-40 z-[1] pointer-events-none"
          style={{ 
            background: heroSlides[currentSlide].textTheme === "dark" ? "linear-gradient(to bottom, #1A237E, #FF9800)" : "linear-gradient(to bottom, white, rgba(255,255,255,0.3))",
            height: "100%",
          }}
        />
        {/* Fixed-height row so image column has exact height and image fills it (no gap) */}
        <div className="grid lg:grid-cols-2 gap-0 relative h-[72vh] min-h-[420px] z-0">
          {/* Left: slide content - text color depends on slide bg */}
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-10 sm:py-14 lg:py-16 flex items-center overflow-hidden relative z-10">
            <div className="max-w-xl w-full relative">
              {/* Soft backdrop behind text for readability on busy slides */}
              <div 
                className="absolute -inset-4 rounded-2xl opacity-30 pointer-events-none hidden sm:block"
                style={{ background: heroSlides[currentSlide].textTheme === "dark" ? "radial-gradient(ellipse at 30% 50%, rgba(26,35,126,0.12), transparent 70%)" : "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.15), transparent 70%)" }}
              />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={heroSlides[currentSlide].id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.35 }}
                  className="relative"
                >
                  <h2
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight ${
                      heroSlides[currentSlide].textTheme === "dark" ? "text-[#1A237E]" : "text-white"
                    }`}
                  >
                    {heroSlides[currentSlide].title}
                  </h2>
                  <p
                    className={`text-sm sm:text-base lg:text-lg leading-relaxed mb-6 ${
                      heroSlides[currentSlide].textTheme === "dark" ? "text-[#37474F]" : "text-white/90"
                    }`}
                  >
                    {heroSlides[currentSlide].description}
                  </p>
                  <Link href={heroSlides[currentSlide].link}>
                    <Button
                      size="default"
                      className={
                        heroSlides[currentSlide].textTheme === "dark"
                          ? "bg-[#1A237E] hover:bg-[#283593] text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded transition-colors uppercase tracking-wide border-0"
                          : "bg-[#263238] hover:bg-black text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded transition-colors uppercase tracking-wide border-0"
                      }
                    >
                      {heroSlides[currentSlide].linkLabel}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          {/* Right: slide image - exact same height as row, fills 100%, no gap */}
          <div className="relative w-full h-full min-h-0 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={heroSlides[currentSlide].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  fill
                  className="object-cover object-right"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={currentSlide === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Slider arrows - at left and right ends of the slider */}
          <button
            type="button"
            onClick={goPrev}
            className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full backdrop-blur flex items-center justify-center border transition-colors ${
              heroSlides[currentSlide].textTheme === "dark"
                ? "bg-black/10 hover:bg-black/20 text-[#1A237E] border-[#1A237E]/30"
                : "bg-white/20 hover:bg-white/30 text-white border-white/30"
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full backdrop-blur flex items-center justify-center border transition-colors ${
              heroSlides[currentSlide].textTheme === "dark"
                ? "bg-black/10 hover:bg-black/20 text-[#1A237E] border-[#1A237E]/30"
                : "bg-white/20 hover:bg-white/30 text-white border-white/30"
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        {/* Scroll cue - subtle indicator (theme-aware) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-1">
          <span className={`text-[10px] uppercase tracking-widest font-medium ${heroSlides[currentSlide].textTheme === "dark" ? "text-[#1A237E]/70" : "text-white/70"}`}>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`w-5 h-8 rounded-full border-2 flex justify-center pt-1.5 ${heroSlides[currentSlide].textTheme === "dark" ? "border-[#1A237E]/50" : "border-white/50"}`}
          >
            <div className={`w-1 h-1.5 rounded-full ${heroSlides[currentSlide].textTheme === "dark" ? "bg-[#1A237E]/70" : "bg-white/70"}`} />
          </motion.div>
        </div>
        {/* Dots - overlaid at bottom of image so no band/gap below image */}
        <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? heroSlides[currentSlide].textTheme === "dark"
                    ? "w-8 bg-[#1A237E]"
                    : "w-8 bg-white"
                  : heroSlides[currentSlide].textTheme === "dark"
                    ? "w-2 bg-[#1A237E]/40 hover:bg-[#1A237E]/60"
                    : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats - stylized strip below hero */}
      <div className="bg-white relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1A237E]/30 to-transparent" />
        <div className="border-t border-slate-200 bg-gradient-to-b from-slate-50/80 to-white py-6 sm:py-8 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {stats.slice(0, 6).map((stat, index) => (
                <div key={index} className="text-center">
                  {stat.link && stat.link !== "#" ? (
                    <Link href={stat.link} className="group block rounded-xl py-3 px-2 hover:bg-white/80 transition-colors border border-transparent hover:border-[#1A237E]/20 hover:shadow-sm">
                      <div className="text-2xl sm:text-3xl font-bold text-[#1A237E] mb-1 group-hover:text-[#FF9800] transition-colors">
                        <AnimatedStatValue value={stat.value} />
                      </div>
                      <div className="text-xs sm:text-sm text-[#37474F] font-medium">
                        {stat.label}
                      </div>
                    </Link>
                  ) : (
                    <div className="rounded-xl py-3 px-2 border border-transparent">
                      <div className="text-2xl sm:text-3xl font-bold text-[#1A237E] mb-1">
                        <AnimatedStatValue value={stat.value} />
                      </div>
                      <div className="text-xs sm:text-sm text-[#37474F] font-medium">
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
