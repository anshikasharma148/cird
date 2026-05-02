"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Search, Shield } from "lucide-react";
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Check if path is active
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm border-b border-slate-200">
      {/* Top Bar: Logo, Search, Buttons - same as home */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-16 py-2.5 sm:py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF9800] flex items-center justify-center shadow flex-shrink-0">
                  <span className="text-white font-bold text-lg sm:text-xl">C</span>
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-[#1A237E] tracking-tight truncate">CIRD</h1>
                  <p className="text-[10px] sm:text-xs text-[#37474F] font-medium hidden sm:block truncate max-w-[200px] lg:max-w-none">
                    Centre for Industrial Research and Development
                  </p>
                </div>
              </Link>
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
                title="Agent Login"
              >
                <Shield size={14} />
                <span className="hidden sm:inline">Agent Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - dark blue, same as home: centered, larger font */}
      <div className="bg-[#1A237E]">
        <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-16">
          <nav className="flex h-12 sm:h-14 items-center justify-center">
            <NavigationMenu className="hidden lg:flex flex-1 justify-center">
              <NavigationMenuList className="flex flex-wrap justify-center gap-0.5 md:gap-1">
                <NavigationMenuItem>
                  <Link
                    href="/"
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-2 md:px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 ${isActive("/")
                      ? "bg-[#FF9800] text-white"
                      : "bg-transparent text-white hover:bg-white/10"
                      }`}
                  >
                    <span className="group-hover:scale-105 transition-transform duration-200">Home</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/about"
                    aria-label="About CIRD"
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-2 md:px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 ${isActive("/about")
                      ? "bg-[#FF9800] text-white"
                      : "bg-transparent text-white hover:bg-white/10"
                      }`}
                  >
                    <span className="group-hover:scale-105 transition-transform duration-200">About</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/authorities"
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-2 md:px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 ${isActive("/authorities")
                      ? "bg-[#FF9800] text-white"
                      : "bg-transparent text-white hover:bg-white/10"
                      }`}
                  >
                    <span className="group-hover:scale-105 transition-transform duration-200">Authorities</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <div className="relative group/nav">
                    <NavigationMenuTrigger
                      className={`bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10 cursor-pointer px-2 md:px-4 text-sm md:text-base font-semibold h-10 rounded-md transition-all duration-300 ${isActive("/research") || isActive("/projects") ? "!bg-[#FF9800]" : ""}`}
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
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                  className={`bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10 cursor-pointer px-2 md:px-4 text-sm md:text-base font-semibold h-10 rounded-md transition-all duration-300 ${isActive("/entities") ? "!bg-[#FF9800]" : ""}`}
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
                  <ul className="grid gap-2 p-4 w-max">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/entities/cdc"
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                  className={`bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10 cursor-pointer px-2 md:px-4 text-sm md:text-base font-semibold h-10 rounded-md transition-all duration-300 ${isActive("/training") ? "!bg-[#FF9800]" : ""}`}
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
                  <ul className="grid gap-2 p-4 w-max">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/training#overview"
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                  className={`bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10 cursor-pointer px-2 md:px-4 text-sm md:text-base font-semibold h-10 rounded-md transition-all duration-300 ${isActive("/team") ? "!bg-[#FF9800]" : ""}`}
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
                  <ul className="grid gap-2 p-4 w-max">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/team#coordination"
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        >
                          <div className="text-sm font-semibold leading-none text-[#1A237E] group-hover:text-[#FF9800] transition-colors mb-1">
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
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-2 md:px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 ${isActive("/patents") ? "bg-[#FF9800] text-white" : "bg-transparent text-white hover:bg-white/10"}`}
                  >
                    <span className="group-hover:scale-105 transition-transform duration-200">Patents</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/mou"
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-2 md:px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 ${isActive("/mou") ? "bg-[#FF9800] text-white" : "bg-transparent text-white hover:bg-white/10"}`}
                  >
                    <span className="group-hover:scale-105 transition-transform duration-200">MoU</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/contact"
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-2 md:px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 ${isActive("/contact") ? "bg-[#FF9800] text-white" : "bg-transparent text-white hover:bg-white/10"}`}
                  >
                    <span className="group-hover:scale-105 transition-transform duration-200">Contact</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="https://hydrologyjpvl.cird.co.in"
                    target="_blank"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md px-2 md:px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300 bg-transparent text-white hover:bg-white/10"
                  >
                    <span className="group-hover:scale-105 transition-transform duration-200">Hydrology</span>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
      </div>

      {/* Mobile/Tablet Menu - same as home: dark blue bg, white text */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-white/20 bg-[#1A237E] backdrop-blur-md max-h-[calc(100vh-10rem)] sm:max-h-[calc(100vh-11rem)] overflow-y-auto shadow-lg"
          >
            <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-1 sm:space-y-2">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base rounded-md transition-colors font-semibold ${isActive("/") ? "bg-[#FF9800] text-white" : "text-white hover:bg-white/10"}`}
              >
                Home
              </Link>
              <Link
                href="/about"
                aria-label="About CIRD"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base rounded-md transition-colors font-semibold ${isActive("/about") ? "bg-[#FF9800] text-white" : "text-white hover:bg-white/10"}`}
              >
                About
              </Link>
              <Link
                href="/authorities"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base rounded-md transition-colors font-semibold ${isActive("/authorities") ? "bg-[#FF9800] text-white" : "text-white hover:bg-white/10"}`}
              >
                Authorities
              </Link>
              <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/80 font-semibold uppercase tracking-wide">
                Research
              </div>
              <Link href="/research" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">All Research Projects</Link>
              <Link href="/projects/ba01-pp-b" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">BA01/PP/B - Problems and Remedies</Link>
              <Link href="/projects/ba01-pp-c" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">BA01/PP/C - Bottom Ash in Pavers</Link>
              <Link href="/projects/ba03-pp-b" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">BA03/PP/B - CHP Monitoring</Link>
              <Link href="/projects/ba07-pp-a" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">BA07/PP/A - Early Warning System</Link>
              <Link href="/projects/ba07-pp-b" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">BA07/PP/B - Weather Station</Link>
              <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/80 font-semibold uppercase tracking-wide mt-2">Entities</div>
              <Link href="/entities" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">All Entities</Link>
              <Link href="/entities/cdc" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">CDC - Control Development Centre</Link>
              <Link href="/entities/mtl" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">MTL - Mechanical Testing Lab</Link>
              <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/80 font-semibold uppercase tracking-wide mt-2">Training</div>
              <Link href="/training" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">All Training Programs</Link>
              <Link href="/training#overview" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">Program Overview</Link>
              <Link href="/training#ai-srijan" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">AI Srijan FDP</Link>
              <Link href="/training#power-plant" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">Power Plant Visit</Link>
              <Link href="/training#closing" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">Closing Ceremony</Link>
              <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/80 font-semibold uppercase tracking-wide mt-2">Team</div>
              <Link href="/team" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">All Team Members</Link>
              <Link href="/team#coordination" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">Coordination Committee</Link>
              <Link href="/team#technical" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">Technical Consultants</Link>
              <Link href="/team#cdc" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">CDC Team</Link>
              <Link href="/team#mtl" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">MTL Team</Link>
              <Link href="/team#nodal" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors">Nodal Officers</Link>
              <Link href="/patents" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base rounded-md transition-colors font-semibold ${isActive("/patents") ? "bg-[#FF9800] text-white" : "text-white hover:bg-white/10"}`}>Patents</Link>
              <Link href="/mou" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base rounded-md transition-colors font-semibold ${isActive("/mou") ? "bg-[#FF9800] text-white" : "text-white hover:bg-white/10"}`}>MoU</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base rounded-md transition-colors font-semibold ${isActive("/contact") ? "bg-[#FF9800] text-white" : "text-white hover:bg-white/10"}`}>Contact</Link>
              <Link href="https://hydrologyjpvl.cird.co.in" target="_blank" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-white hover:bg-white/10 rounded-md transition-colors font-semibold">Hydrology</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
