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
          className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-black/80 backdrop-blur-xl supports-backdrop-filter:bg-black/70 shadow-lg shadow-black/20"
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
                  <div className="text-xs sm:text-sm text-gray-400">CIRD - JUET, Guna</div>
                </motion.div>
              </Link>
            </div>
            <NavigationMenu>
              <NavigationMenuList className="hidden sm:flex">
                <NavigationMenuItem>
                  <Link href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-gray-300">
                    <span className="group-hover:scale-105 transition-transform duration-200">Home</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-gray-300">
                    <span className="group-hover:scale-105 transition-transform duration-200">About</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/research" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-gray-300">
                    <span className="group-hover:scale-105 transition-transform duration-200">Research</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/entities" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-gray-300">
                    <span className="group-hover:scale-105 transition-transform duration-200">Entities</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/training" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-gray-300">
                    <span className="group-hover:scale-105 transition-transform duration-200">Training</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/team" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-gray-300">
                    <span className="group-hover:scale-105 transition-transform duration-200">Team</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="http://115.242.156.230:3000" target="_blank" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-gray-300">
                    <span className="group-hover:scale-105 transition-transform duration-200">Hydrology</span>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden text-white hover:bg-slate-700"
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
              className="sm:hidden bg-black border-t border-gray-800"
            >
              <div className="px-4 py-4 space-y-2">
                <Link href="/" className="block px-4 py-2 text-white hover:bg-white hover:text-black rounded-md transition-colors">
                  Home
                </Link>
                <Link href="/about" className="block px-4 py-2 text-white hover:bg-white hover:text-black rounded-md transition-colors">
                  About
                </Link>
                <Link href="/research" className="block px-4 py-2 text-white hover:bg-white hover:text-black rounded-md transition-colors">
                  Research
                </Link>
                <Link href="/entities" className="block px-4 py-2 text-white hover:bg-white hover:text-black rounded-md transition-colors">
                  Entities
                </Link>
                <Link href="/training" className="block px-4 py-2 text-white hover:bg-white hover:text-black rounded-md transition-colors">
                  Training
                </Link>
                <Link href="/team" className="block px-4 py-2 text-white hover:bg-white hover:text-black rounded-md transition-colors">
                  Team
                </Link>
                <Link href="http://115.242.156.230:3000" target="_blank" className="block px-4 py-2 text-white hover:bg-white hover:text-black rounded-md transition-colors">
                  Hydrology
                </Link>
              </div>
            </motion.div>
          )}
        </motion.header>
  );
}
