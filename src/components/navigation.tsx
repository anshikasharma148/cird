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
              ? "border-b border-[#c89666]/40 bg-[#e1b382]/95 backdrop-blur-md supports-backdrop-filter:bg-[#e1b382]/95 shadow-sm"
              : "border-b border-[#c89666]/20 bg-[#e1b382]/90 backdrop-blur-md supports-backdrop-filter:bg-[#e1b382]/90 shadow-sm"
          }`}
        >
          <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-16 flex h-14 sm:h-16 items-center justify-between">
            <div className="flex flex-shrink-0 min-w-0">
              <Link href="/" className="flex items-center space-x-1 sm:space-x-2 group">
                <div className="text-left min-w-0">
                  <div className="font-bold text-base sm:text-lg md:text-xl lg:text-xl text-[#2d545e] whitespace-nowrap">
                    <span className="font-bold">CIRD</span>
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-[#2d545e] hidden sm:block whitespace-nowrap">CIRD - JUET, Guna</div>
                </div>
              </Link>
            </div>
            <NavigationMenu className="hidden lg:block flex-1">
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
                  <NavigationMenuContent className="bg-white backdrop-blur-xl border border-[#c89666] shadow-xl w-max max-w-2xl">
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
            
            {/* Mobile/Tablet Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-[#2d545e] hover:bg-[#2d545e] hover:text-white flex-shrink-0 ml-2 p-2 min-w-[40px] h-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} className="sm:w-6 sm:h-6" /> : <Menu size={22} className="sm:w-6 sm:h-6" />}
            </Button>
          </div>
          
          {/* Mobile/Tablet Menu */}
          {isMobileMenuOpen && (
            <div
              className="lg:hidden border-t border-[#c89666]/40 bg-[#e1b382]/98 backdrop-blur-md transition-all duration-300 max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto shadow-lg"
            >
              <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-1 sm:space-y-2">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors font-medium"
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors font-medium"
                >
                  About
                </Link>
                <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-[#2d545e] font-semibold uppercase tracking-wide">
                  Research
                </div>
                <Link 
                  href="/research" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  All Research Projects
                </Link>
                <Link 
                  href="/projects/ba01-pp-b" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  BA01/PP/B - Problems and Remedies
                </Link>
                <Link 
                  href="/projects/ba01-pp-c" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  BA01/PP/C - Bottom Ash in Pavers
                </Link>
                <Link 
                  href="/projects/ba03-pp-b" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  BA03/PP/B - CHP Monitoring
                </Link>
                <Link 
                  href="/projects/ba07-pp-a" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  BA07/PP/A - Early Warning System
                </Link>
                <Link 
                  href="/projects/ba07-pp-b" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  BA07/PP/B - Weather Station
                </Link>
                <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-[#2d545e] font-semibold uppercase tracking-wide">
                  Entities
                </div>
                <Link 
                  href="/entities" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  All Entities
                </Link>
                <Link 
                  href="/entities/cdc" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  CDC - Control Development Centre
                </Link>
                <Link 
                  href="/entities/mtl" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  MTL - Mechanical Testing Lab
                </Link>
                <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-[#2d545e] font-semibold uppercase tracking-wide">
                  Training
                </div>
                <Link 
                  href="/training" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  All Training Programs
                </Link>
                <Link 
                  href="/training#overview" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  Program Overview
                </Link>
                <Link 
                  href="/training#ai-srijan" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  AI Srijan FDP
                </Link>
                <Link 
                  href="/training#power-plant" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  Power Plant Visit
                </Link>
                <Link 
                  href="/training#closing" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  Closing Ceremony
                </Link>
                <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-[#2d545e] font-semibold uppercase tracking-wide">
                  Team
                </div>
                <Link 
                  href="/team" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  All Team Members
                </Link>
                <Link 
                  href="/team#coordination" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  Coordination Committee
                </Link>
                <Link 
                  href="/team#technical" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  Technical Consultants
                </Link>
                <Link 
                  href="/team#cdc" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  CDC Team
                </Link>
                <Link 
                  href="/team#mtl" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  MTL Team
                </Link>
                <Link 
                  href="/team#nodal" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 sm:px-8 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors"
                >
                  Nodal Officers
                </Link>
                <Link 
                  href="/patents" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors font-medium"
                >
                  Patents
                </Link>
                <Link 
                  href="/mou" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors font-medium"
                >
                  MoU
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors font-medium"
                >
                  Contact
                </Link>
                <Link 
                  href="http://115.242.156.230:3000" 
                  target="_blank" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base text-[#2d545e] hover:bg-[#2d545e] hover:text-white rounded-md transition-colors font-medium"
                >
                  Hydrology
                </Link>
              </div>
            </div>
          )}
        </header>
  );
}
