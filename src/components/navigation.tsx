"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
  const router = useRouter();

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

  return (
        <header
          className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
            isScrolled
              ? "border-b border-white/10 bg-white/5 backdrop-blur-md supports-backdrop-filter:bg-white/5 shadow-sm"
              : "border-b border-transparent bg-transparent backdrop-blur-none shadow-none"
          }`}
        >
          <div className="container mx-auto px-4 sm:px-8 md:px-16 flex h-16 items-center justify-between">
            <div className="flex">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="text-left">
                  <div className="font-bold text-sm sm:text-lg md:text-xl text-white">
                    <span className="font-bold">CIRD</span>
                  </div>
                  <div className="text-xs sm:text-sm text-blue-200">CIRD - JUET, Guna</div>
                </div>
              </Link>
            </div>
            <NavigationMenu>
              <NavigationMenuList className="hidden sm:flex">
                <NavigationMenuItem>
                  <Link href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-blue-100">
                    <span className="group-hover:scale-105 transition-transform duration-200">Home</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-blue-100">
                    <span className="group-hover:scale-105 transition-transform duration-200">About</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <div className="relative group/nav">
                    <NavigationMenuTrigger 
                      className="bg-transparent text-blue-100 hover:bg-blue-600 hover:text-white data-[state=open]:bg-blue-600 data-[state=open]:text-white cursor-pointer"
                      onClick={(e) => {
                        // Navigate when clicking the text, but not when clicking chevron
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
                  <NavigationMenuContent className="bg-white backdrop-blur-xl border border-blue-200 shadow-xl">
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/projects/ba01-pp-b"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                      className="bg-transparent text-blue-100 hover:bg-blue-600 hover:text-white data-[state=open]:bg-blue-600 data-[state=open]:text-white cursor-pointer"
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
                  <NavigationMenuContent className="bg-white backdrop-blur-xl border border-blue-200 shadow-xl">
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/entities/cdc"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                      className="bg-transparent text-blue-100 hover:bg-blue-600 hover:text-white data-[state=open]:bg-blue-600 data-[state=open]:text-white cursor-pointer"
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
                    <NavigationMenuContent className="bg-white backdrop-blur-xl border border-blue-200 shadow-xl">
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/training#overview"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                      className="bg-transparent text-blue-100 hover:bg-blue-600 hover:text-white data-[state=open]:bg-blue-600 data-[state=open]:text-white cursor-pointer"
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
                    <NavigationMenuContent className="bg-white backdrop-blur-xl border border-blue-200 shadow-xl">
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/team#coordination"
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                              className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                            >
                              <div className="text-sm font-medium leading-none text-blue-900 group-hover:text-blue-700 transition-colors">
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
                  <Link href="/contact" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-blue-100">
                    <span className="group-hover:scale-105 transition-transform duration-200">Contact</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="http://115.242.156.230:3000" target="_blank" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-blue-100">
                    <span className="group-hover:scale-105 transition-transform duration-200">Hydrology</span>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden text-white hover:bg-blue-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className={`sm:hidden border-t transition-all duration-300 ${
                isScrolled
                  ? "bg-white/5 backdrop-blur-md border-white/10"
                  : "bg-transparent backdrop-blur-none border-transparent"
              }`}
            >
              <div className="px-4 py-4 space-y-2">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-blue-100 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-blue-100 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  About
                </Link>
                <div className="px-4 py-2 text-blue-100 font-semibold">
                  Research
                </div>
                <Link 
                  href="/research" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  All Research Projects
                </Link>
                <Link 
                  href="/projects/ba01-pp-b" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  BA01/PP/B - Problems and Remedies
                </Link>
                <Link 
                  href="/projects/ba01-pp-c" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  BA01/PP/C - Bottom Ash in Pavers
                </Link>
                <Link 
                  href="/projects/ba03-pp-b" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  BA03/PP/B - CHP Monitoring
                </Link>
                <Link 
                  href="/projects/ba07-pp-a" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  BA07/PP/A - Early Warning System
                </Link>
                <Link 
                  href="/projects/ba07-pp-b" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  BA07/PP/B - Weather Station
                </Link>
                <div className="px-4 py-2 text-blue-100 font-semibold">
                  Entities
                </div>
                <Link 
                  href="/entities" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  All Entities
                </Link>
                <Link 
                  href="/entities/cdc" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  CDC - Control Development Centre
                </Link>
                <Link 
                  href="/entities/mtl" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  MTL - Mechanical Testing Lab
                </Link>
                <div className="px-4 py-2 text-blue-100 font-semibold">
                  Training
                </div>
                <Link 
                  href="/training" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  All Training Programs
                </Link>
                <Link 
                  href="/training#overview" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  Program Overview
                </Link>
                <Link 
                  href="/training#ai-srijan" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  AI Srijan FDP
                </Link>
                <Link 
                  href="/training#power-plant" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  Power Plant Visit
                </Link>
                <Link 
                  href="/training#closing" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  Closing Ceremony
                </Link>
                <div className="px-4 py-2 text-blue-100 font-semibold">
                  Team
                </div>
                <Link 
                  href="/team" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  All Team Members
                </Link>
                <Link 
                  href="/team#coordination" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  Coordination Committee
                </Link>
                <Link 
                  href="/team#technical" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  Technical Consultants
                </Link>
                <Link 
                  href="/team#cdc" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  CDC Team
                </Link>
                <Link 
                  href="/team#mtl" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  MTL Team
                </Link>
                <Link 
                  href="/team#nodal" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  Nodal Officers
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-blue-100 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  Contact
                </Link>
                <Link 
                  href="http://115.242.156.230:3000" 
                  target="_blank" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-blue-100 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  Hydrology
                </Link>
              </div>
            </div>
          )}
        </header>
  );
}
