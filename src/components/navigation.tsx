"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if path is active
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${isScrolled
        ? "border-b-2 border-[#c89666]/50 bg-gradient-to-r from-[#e1b382]/98 via-[#e1b382]/97 to-[#e1b382]/98 backdrop-blur-xl supports-backdrop-filter:backdrop-blur-xl shadow-lg shadow-[#2d545e]/10"
        : "border-b border-[#c89666]/30 bg-gradient-to-r from-[#e1b382]/95 via-[#e1b382]/93 to-[#e1b382]/95 backdrop-blur-lg supports-backdrop-filter:backdrop-blur-lg shadow-md shadow-[#2d545e]/5"
        }`}
    >
      <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-16 flex h-16 sm:h-18 md:h-20 items-center justify-between">
        <div className="flex flex-shrink-0 min-w-0">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2d545e] to-[#12343b] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              <div className="relative px-3 py-1.5 bg-gradient-to-br from-[#2d545e] to-[#12343b] rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="font-bold text-lg sm:text-xl md:text-2xl text-white whitespace-nowrap">
                  CIRD
                </div>
              </div>
            </div>
            <div className="text-left min-w-0 hidden sm:block">
              <div className="text-xs md:text-sm text-[#2d545e] font-semibold whitespace-nowrap">Centre for Industrial Research and Development</div>
            </div>
          </Link>
        </div>
        <NavigationMenu className="hidden lg:block flex-1">
          <NavigationMenuList className="flex flex-wrap justify-end gap-1 md:gap-2">
            <NavigationMenuItem>
              <Link
                href="/"
                className={`group relative inline-flex h-10 w-max items-center justify-center rounded-lg px-3 md:px-4 py-2 text-sm font-semibold transition-all duration-300 ${isActive("/")
                  ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg shadow-[#2d545e]/30"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10 hover:text-[#2d545e]"
                  }`}
              >
                {isActive("/") && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#2d545e] to-[#12343b] rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative group-hover:scale-105 transition-transform duration-200">Home</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/about"
                className={`group relative inline-flex h-10 w-max items-center justify-center rounded-lg px-3 md:px-4 py-2 text-sm font-semibold transition-all duration-300 ${isActive("/about")
                  ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg shadow-[#2d545e]/30"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10 hover:text-[#2d545e]"
                  }`}
              >
                {isActive("/about") && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#2d545e] to-[#12343b] rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative group-hover:scale-105 transition-transform duration-200">About</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="relative group/nav">
                <NavigationMenuTrigger
                  className={`relative bg-transparent cursor-pointer px-3 md:px-4 text-sm font-semibold h-10 rounded-lg transition-all duration-300 ${isActive("/research") || isActive("/projects")
                    ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg shadow-[#2d545e]/30 data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#2d545e] data-[state=open]:to-[#12343b]"
                    : "text-[#2d545e] hover:bg-[#2d545e]/10 data-[state=open]:bg-[#2d545e]/10"
                    }`}
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
                <NavigationMenuContent className="bg-white/98 backdrop-blur-xl border-2 border-[#c89666]/50 shadow-2xl w-max max-w-2xl rounded-xl overflow-hidden">
                  <ul className="grid gap-2 p-4 w-max">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/projects/ba01-pp-b"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            BA01/PP/B - Problems and Remedies of Bottom Ash Replacement
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                            Investigate challenges and develop remedies for replacing natural sand with bottom ash
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/projects/ba01-pp-c"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            BA01/PP/C - Bottom Ash Replacement in Pavers and Bricks
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                            Develop methodology to replace 80% of sand with bottom ash in paver and brick manufacturing
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/projects/ba03-pp-b"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            BA03/PP/B - Monitoring & Control System for CHP
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                            Automate and monitor conveyor systems in coal handling plants using robotics and PLC control
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/projects/ba07-pp-a"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            BA07/PP/A - Early Warning System (EWS)
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                            Real-time hydrological monitoring and early warning system for flood and weather monitoring
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/projects/ba07-pp-b"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            BA07/PP/B - Automatic Weather Station (AWS)
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
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
                  className={`relative bg-transparent cursor-pointer px-3 md:px-4 text-sm font-semibold h-10 rounded-lg transition-all duration-300 ${isActive("/entities")
                    ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg shadow-[#2d545e]/30 data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#2d545e] data-[state=open]:to-[#12343b]"
                    : "text-[#2d545e] hover:bg-[#2d545e]/10 data-[state=open]:bg-[#2d545e]/10"
                    }`}
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
                <NavigationMenuContent className="bg-white/98 backdrop-blur-xl border-2 border-[#c89666]/50 shadow-2xl w-max max-w-xl rounded-xl overflow-hidden z-50">
                  <ul className="grid gap-2 p-4 w-max">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/entities/cdc"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            CDC - Control Development Centre
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                            Advanced Control Systems Research
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/entities/mtl"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            MTL - Mechanical Testing Lab
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
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
                  className={`relative bg-transparent cursor-pointer px-3 md:px-4 text-sm font-semibold h-10 rounded-lg transition-all duration-300 ${isActive("/training")
                    ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg shadow-[#2d545e]/30 data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#2d545e] data-[state=open]:to-[#12343b]"
                    : "text-[#2d545e] hover:bg-[#2d545e]/10 data-[state=open]:bg-[#2d545e]/10"
                    }`}
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
                <NavigationMenuContent className="bg-white/98 backdrop-blur-xl border-2 border-[#c89666]/50 shadow-2xl w-max max-w-xl rounded-xl overflow-hidden z-50">
                  <ul className="grid gap-2 p-4 w-max">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/training#overview"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            Program Overview
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                            Summer Industrial Training 2025 - Program details and structure
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/training#ai-srijan"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            AI Srijan - Faculty Development Programme
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                            Hands-on sessions in Machine Learning and Deep Learning with Intel
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/training#power-plant"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            Power Plant Visit
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                            Visit to Jaypee Nigrie Super Thermal Power Plant
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/training#closing"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            Closing Ceremony
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
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
                  className={`relative bg-transparent cursor-pointer px-3 md:px-4 text-sm font-semibold h-10 rounded-lg transition-all duration-300 ${isActive("/team")
                    ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg shadow-[#2d545e]/30 data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#2d545e] data-[state=open]:to-[#12343b]"
                    : "text-[#2d545e] hover:bg-[#2d545e]/10 data-[state=open]:bg-[#2d545e]/10"
                    }`}
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
                <NavigationMenuContent className="bg-white/98 backdrop-blur-xl border-2 border-[#c89666]/50 shadow-2xl w-max max-w-xl rounded-xl overflow-hidden z-50">
                  <ul className="grid gap-2 p-4 w-max">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/team#coordination"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            Coordination Committee
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                            Leading CIRD's vision and strategic direction
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/team#technical"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            Technical Professional Consultants
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                            Expert consultants supporting CIRD projects
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/team#cdc"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            Control Development Centre Team
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                            Software development and automation specialists
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/team#mtl"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            Mechanical Testing Lab Team
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
                            Meet the talented professionals driving innovation at MTL
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/team#nodal"
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-[#e1b382]/20 hover:to-[#c89666]/20 focus:bg-[#e1b382]/20 border border-transparent hover:border-[#c89666]/30"
                        >
                          <div className="text-sm font-semibold leading-none text-[#2d545e] group-hover:text-[#12343b] transition-colors mb-1">
                            Nodal Officers of JPVL
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-600 group-hover:text-slate-700 transition-colors">
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
              <Link
                href="/patents"
                className={`group relative inline-flex h-10 w-max items-center justify-center rounded-lg px-3 md:px-4 py-2 text-sm font-semibold transition-all duration-300 ${isActive("/patents")
                  ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg shadow-[#2d545e]/30"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10 hover:text-[#2d545e]"
                  }`}
              >
                {isActive("/patents") && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#2d545e] to-[#12343b] rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative group-hover:scale-105 transition-transform duration-200">Patents</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/mou"
                className={`group relative inline-flex h-10 w-max items-center justify-center rounded-lg px-3 md:px-4 py-2 text-sm font-semibold transition-all duration-300 ${isActive("/mou")
                  ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg shadow-[#2d545e]/30"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10 hover:text-[#2d545e]"
                  }`}
              >
                {isActive("/mou") && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#2d545e] to-[#12343b] rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative group-hover:scale-105 transition-transform duration-200">MoU</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/contact"
                className={`group relative inline-flex h-10 w-max items-center justify-center rounded-lg px-3 md:px-4 py-2 text-sm font-semibold transition-all duration-300 ${isActive("/contact")
                  ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg shadow-[#2d545e]/30"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10 hover:text-[#2d545e]"
                  }`}
              >
                {isActive("/contact") && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#2d545e] to-[#12343b] rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative group-hover:scale-105 transition-transform duration-200">Contact</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>

              <Link
                href="http://115.242.156.230:3000"
                target="_blank"
                className="group relative inline-flex h-10 w-max items-center justify-center rounded-lg px-3 md:px-4 py-2 text-sm font-semibold transition-all duration-300 text-[#2d545e] hover:bg-[#2d545e]/10 hover:text-[#2d545e]"
              >
                <span className="relative group-hover:scale-105 transition-transform duration-200">Hydrology</span>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* Mobile/Tablet Menu Button */}
        {/* Mobile/Tablet Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden text-[#2d545e] hover:bg-gradient-to-r hover:from-[#2d545e] hover:to-[#12343b] hover:text-white flex-shrink-0 ml-2 p-2 min-w-[40px] h-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} className="sm:w-6 sm:h-6" /> : <Menu size={22} className="sm:w-6 sm:h-6" />}
        </Button>
      </div>

      {/* Mobile/Tablet Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t-2 border-[#c89666]/50 bg-gradient-to-b from-[#e1b382]/98 to-[#e1b382]/95 backdrop-blur-xl max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto shadow-2xl"
          >
            <div className="px-3 sm:px-4 py-4 sm:py-5 space-y-1 sm:space-y-2">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 sm:px-5 py-3 sm:py-2.5 text-sm sm:text-base rounded-lg transition-all duration-200 font-semibold ${isActive("/")
                  ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg"
                  : "text-[#2d545e] hover:bg-gradient-to-r hover:from-[#2d545e] hover:to-[#12343b] hover:text-white hover:shadow-md"
                  }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 sm:px-5 py-3 sm:py-2.5 text-sm sm:text-base rounded-lg transition-all duration-200 font-semibold ${isActive("/about")
                  ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg"
                  : "text-[#2d545e] hover:bg-gradient-to-r hover:from-[#2d545e] hover:to-[#12343b] hover:text-white hover:shadow-md"
                  }`}
              >
                About
              </Link>
              <div className="px-4 sm:px-5 py-2 text-xs sm:text-sm text-[#2d545e] font-bold uppercase tracking-wider border-b border-[#c89666]/30">
                Research
              </div>
              <Link
                href="/research"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${isActive("/research")
                  ? "bg-gradient-to-r from-[#2d545e]/20 to-[#12343b]/20 text-[#2d545e] font-semibold border-l-4 border-[#2d545e]"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10"
                  }`}
              >
                All Research Projects
              </Link>
              <Link
                href="/projects/ba01-pp-b"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${isActive("/projects/ba01-pp-b")
                  ? "bg-gradient-to-r from-[#2d545e]/20 to-[#12343b]/20 text-[#2d545e] font-semibold border-l-4 border-[#2d545e]"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10"
                  }`}
              >
                BA01/PP/B - Problems and Remedies
              </Link>
              <Link
                href="/projects/ba01-pp-c"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${isActive("/projects/ba01-pp-c")
                  ? "bg-gradient-to-r from-[#2d545e]/20 to-[#12343b]/20 text-[#2d545e] font-semibold border-l-4 border-[#2d545e]"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10"
                  }`}
              >
                BA01/PP/C - Bottom Ash in Pavers
              </Link>
              <Link
                href="/projects/ba03-pp-b"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${isActive("/projects/ba03-pp-b")
                  ? "bg-gradient-to-r from-[#2d545e]/20 to-[#12343b]/20 text-[#2d545e] font-semibold border-l-4 border-[#2d545e]"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10"
                  }`}
              >
                BA03/PP/B - CHP Monitoring
              </Link>
              <Link
                href="/projects/ba07-pp-a"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${isActive("/projects/ba07-pp-a")
                  ? "bg-gradient-to-r from-[#2d545e]/20 to-[#12343b]/20 text-[#2d545e] font-semibold border-l-4 border-[#2d545e]"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10"
                  }`}
              >
                BA07/PP/A - Early Warning System
              </Link>
              <Link
                href="/projects/ba07-pp-b"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${isActive("/projects/ba07-pp-b")
                  ? "bg-gradient-to-r from-[#2d545e]/20 to-[#12343b]/20 text-[#2d545e] font-semibold border-l-4 border-[#2d545e]"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10"
                  }`}
              >
                BA07/PP/B - Weather Station
              </Link>
              <div className="px-4 sm:px-5 py-2 text-xs sm:text-sm text-[#2d545e] font-bold uppercase tracking-wider border-b border-[#c89666]/30 mt-2">
                Entities
              </div>
              <Link
                href="/entities"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${isActive("/entities")
                  ? "bg-gradient-to-r from-[#2d545e]/20 to-[#12343b]/20 text-[#2d545e] font-semibold border-l-4 border-[#2d545e]"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10"
                  }`}
              >
                All Entities
              </Link>
              <Link
                href="/entities/cdc"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${isActive("/entities/cdc")
                  ? "bg-gradient-to-r from-[#2d545e]/20 to-[#12343b]/20 text-[#2d545e] font-semibold border-l-4 border-[#2d545e]"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10"
                  }`}
              >
                CDC - Control Development Centre
              </Link>
              <Link
                href="/entities/mtl"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${isActive("/entities/mtl")
                  ? "bg-gradient-to-r from-[#2d545e]/20 to-[#12343b]/20 text-[#2d545e] font-semibold border-l-4 border-[#2d545e]"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10"
                  }`}
              >
                MTL - Mechanical Testing Lab
              </Link>
              <div className="px-4 sm:px-5 py-2 text-xs sm:text-sm text-[#2d545e] font-bold uppercase tracking-wider border-b border-[#c89666]/30 mt-2">
                Training
              </div>
              <Link
                href="/training"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${isActive("/training")
                  ? "bg-gradient-to-r from-[#2d545e]/20 to-[#12343b]/20 text-[#2d545e] font-semibold border-l-4 border-[#2d545e]"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10"
                  }`}
              >
                All Training Programs
              </Link>
              <Link
                href="/training#overview"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e]/10 rounded-lg transition-all duration-200"
              >
                Program Overview
              </Link>
              <Link
                href="/training#ai-srijan"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e]/10 rounded-lg transition-all duration-200"
              >
                AI Srijan FDP
              </Link>
              <Link
                href="/training#power-plant"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e]/10 rounded-lg transition-all duration-200"
              >
                Power Plant Visit
              </Link>
              <Link
                href="/training#closing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e]/10 rounded-lg transition-all duration-200"
              >
                Closing Ceremony
              </Link>
              <div className="px-4 sm:px-5 py-2 text-xs sm:text-sm text-[#2d545e] font-bold uppercase tracking-wider border-b border-[#c89666]/30 mt-2">
                Team
              </div>
              <Link
                href="/team"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all duration-200 ${isActive("/team")
                  ? "bg-gradient-to-r from-[#2d545e]/20 to-[#12343b]/20 text-[#2d545e] font-semibold border-l-4 border-[#2d545e]"
                  : "text-[#2d545e] hover:bg-[#2d545e]/10"
                  }`}
              >
                All Team Members
              </Link>
              <Link
                href="/team#coordination"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e]/10 rounded-lg transition-all duration-200"
              >
                Coordination Committee
              </Link>
              <Link
                href="/team#technical"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e]/10 rounded-lg transition-all duration-200"
              >
                Technical Consultants
              </Link>
              <Link
                href="/team#cdc"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e]/10 rounded-lg transition-all duration-200"
              >
                CDC Team
              </Link>
              <Link
                href="/team#mtl"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e]/10 rounded-lg transition-all duration-200"
              >
                MTL Team
              </Link>
              <Link
                href="/team#nodal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e]/10 rounded-lg transition-all duration-200"
              >
                Nodal Officers
              </Link>
              <Link
                href="/patents"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 sm:px-5 py-3 sm:py-2.5 text-sm sm:text-base rounded-lg transition-all duration-200 font-semibold ${isActive("/patents")
                  ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg"
                  : "text-[#2d545e] hover:bg-gradient-to-r hover:from-[#2d545e] hover:to-[#12343b] hover:text-white hover:shadow-md"
                  }`}
              >
                Patents
              </Link>
              <Link
                href="/mou"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 sm:px-5 py-3 sm:py-2.5 text-sm sm:text-base rounded-lg transition-all duration-200 font-semibold ${isActive("/mou")
                  ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg"
                  : "text-[#2d545e] hover:bg-gradient-to-r hover:from-[#2d545e] hover:to-[#12343b] hover:text-white hover:shadow-md"
                  }`}
              >
                MoU
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 sm:px-5 py-3 sm:py-2.5 text-sm sm:text-base rounded-lg transition-all duration-200 font-semibold ${isActive("/contact")
                  ? "bg-gradient-to-r from-[#2d545e] to-[#12343b] text-white shadow-lg"
                  : "text-[#2d545e] hover:bg-gradient-to-r hover:from-[#2d545e] hover:to-[#12343b] hover:text-white hover:shadow-md"
                  }`}
              >
                Contact
              </Link>
              <Link
                href="http://115.242.156.230:3000"
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 sm:px-5 py-3 sm:py-2.5 text-sm sm:text-base text-[#2d545e] hover:bg-gradient-to-r hover:from-[#2d545e] hover:to-[#12343b] hover:text-white hover:shadow-md rounded-lg transition-all duration-200 font-semibold"
              >
                Hydrology
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
