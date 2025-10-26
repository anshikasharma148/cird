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
          className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/95 backdrop-blur supports-backdrop-filter:bg-slate-900/60"
        >
          <div className="container mx-auto px-4 sm:px-8 md:px-16 flex h-16 items-center justify-between">
            <div className="flex">
              <Link href="/" className="flex items-center space-x-2 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="text-left"
                >
                  <div className="font-bold text-sm sm:text-lg md:text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    <span className="hidden sm:inline">Centre for Industrial Research and Development</span>
                    <span className="sm:hidden">CIRD</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">CIRD - JUET, Guna</div>
                </motion.div>
              </Link>
            </div>
            <NavigationMenu>
              <NavigationMenuList className="hidden sm:flex">
                <NavigationMenuItem>
                  <Link href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-cyan-500/20 hover:text-cyan-300 focus:bg-cyan-500/20 focus:text-cyan-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <span className="group-hover:scale-105 transition-transform duration-200">Home</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-purple-500/20 hover:text-purple-300 focus:bg-purple-500/20 focus:text-purple-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <span className="group-hover:scale-105 transition-transform duration-200">About</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/research" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-green-500/20 hover:text-green-300 focus:bg-green-500/20 focus:text-green-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <span className="group-hover:scale-105 transition-transform duration-200">Research</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/entities" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-yellow-500/20 hover:text-yellow-300 focus:bg-yellow-500/20 focus:text-yellow-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <span className="group-hover:scale-105 transition-transform duration-200">Entities</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="http://115.242.156.230:3000" target="_blank" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-pink-500/20 hover:text-pink-300 focus:bg-pink-500/20 focus:text-pink-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
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
              className="sm:hidden bg-slate-800 border-t border-slate-700"
            >
              <div className="px-4 py-4 space-y-2">
                <Link href="/" className="block px-4 py-2 text-white hover:bg-slate-700 rounded-md">
                  Home
                </Link>
                <Link href="/about" className="block px-4 py-2 text-white hover:bg-slate-700 rounded-md">
                  About
                </Link>
                <Link href="/research" className="block px-4 py-2 text-white hover:bg-slate-700 rounded-md">
                  Research
                </Link>
                <Link href="/entities" className="block px-4 py-2 text-white hover:bg-slate-700 rounded-md">
                  Entities
                </Link>
                <Link href="http://115.242.156.230:3000" target="_blank" className="block px-4 py-2 text-white hover:bg-slate-700 rounded-md">
                  Hydrology
                </Link>
              </div>
            </motion.div>
          )}
        </motion.header>
  );
}
