"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
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

  return (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-50 w-full border-b border-blue-800/30 bg-blue-950/90 backdrop-blur-xl supports-backdrop-filter:bg-blue-950/80 shadow-lg shadow-blue-900/20"
        >
          <div className="container mx-auto px-4 sm:px-8 md:px-16 flex h-16 items-center justify-between">
            <div className="flex">
              <Link href="/" className="flex items-center space-x-2 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="text-left"
                >
                  <div className="font-bold text-sm sm:text-lg md:text-xl text-white">
                    <span className="font-bold">CIRD</span>
                  </div>
                  <div className="text-xs sm:text-sm text-blue-200">CIRD - JUET, Guna</div>
                </motion.div>
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
                  <Link href="/research" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-blue-100">
                    <span className="group-hover:scale-105 transition-transform duration-200">Research</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-blue-100 hover:bg-blue-600 hover:text-white data-[state=open]:bg-blue-600 data-[state=open]:text-white">
                    Entities
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
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/training" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-blue-100">
                    <span className="group-hover:scale-105 transition-transform duration-200">Training</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/team" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-blue-100">
                    <span className="group-hover:scale-105 transition-transform duration-200">Team</span>
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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="sm:hidden bg-blue-950 border-t border-blue-800"
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
                <Link 
                  href="/research" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-blue-100 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  Research
                </Link>
                <div className="px-4 py-2 text-blue-100 font-semibold">
                  Entities
                </div>
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
                <Link 
                  href="/training" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-blue-100 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  Training
                </Link>
                <Link 
                  href="/team" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-blue-100 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  Team
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
            </motion.div>
          )}
        </motion.header>
  );
}
