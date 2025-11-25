"use client";

import Background3D from "@/components/3d-background";
import HeroSection from "@/components/hero-section";
import { AboutSection, XBracketProject } from "@/components/research-sections";
import CollaborationSlider from "@/components/collaboration-slider";
import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section with Header, Nav, and Image */}
      <HeroSection />

      {/* Collaboration & Partnerships Showcase - At the top */}
      <section className="py-20 bg-gradient-to-b from-[#e1b382]/30 to-[#e1b382]/20 relative z-10">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Handshake className="w-8 h-8 text-[#2d545e]" />
              <h2 className="text-4xl md:text-6xl font-bold text-[#2d545e]">
                Collaborations & Partnerships
              </h2>
            </div>
            <p className="text-xl text-[#2d545e] max-w-3xl mx-auto">
              Building strong industry-academia partnerships for innovation
            </p>
          </motion.div>

          <CollaborationSlider />
        </div>
      </section>
      
      {/* About Section */}
      <AboutSection />
      
      {/* X-BRACKET POST Project */}
      <XBracketProject />
      
      {/* CIRD Entities - Simple Version */}
      <section className="py-20 bg-gradient-to-b from-[#e1b382]/20 to-[#e1b382]/10 relative overflow-hidden">
        <div className="container mx-auto px-8 md:px-16 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-[#2d545e] mb-6">
              CIRD <span className="text-[#12343b]">Entities</span>
            </h2>
            <p className="text-xl text-[#2d545e] max-w-4xl mx-auto leading-relaxed">
              Our specialized divisions working on cutting-edge research and development across 
              multiple technological domains.
            </p>
            
            {/* Project Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2d545e] mb-2">14</div>
                <div className="text-sm text-[#2d545e]">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2d545e] mb-2">4</div>
                <div className="text-sm text-[#2d545e]">Completed Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2d545e] mb-2">11</div>
                <div className="text-sm text-[#2d545e]">Ongoing Projects</div>
              </div>
              <Link href="/patents" className="text-center hover:scale-105 transition-transform duration-200 cursor-pointer group">
                <div className="text-3xl font-bold text-[#2d545e] mb-2 group-hover:text-[#12343b] transition-colors">18</div>
                <div className="text-sm text-[#2d545e] group-hover:text-[#12343b] transition-colors">Patents Filed</div>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* CDC Card */}
            <Link href="/entities/cdc" className="block">
              <div className="bg-white border border-[#c89666] rounded-lg p-8 hover:border-[#2d545e] hover:shadow-xl transition-all duration-300 shadow-md cursor-pointer h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-[#2d545e]">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl text-[#2d545e]">CDC - Control Development Centre</h3>
                    <p className="text-[#2d545e] text-lg">Advanced Control Systems Research</p>
                  </div>
                </div>
                <p className="text-[#2d545e] mb-6 leading-relaxed">
                  The Control Development Centre focuses on developing sophisticated control systems 
                  and automation solutions for industrial applications.
                </p>
                <div className="space-y-3">
                  <h4 className="text-[#2d545e] font-semibold mb-3">Key Focus Areas:</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#2d545e] rounded-full"></div>
                    <span className="text-[#2d545e]">Software Development & Programming</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#2d545e] rounded-full"></div>
                    <span className="text-[#2d545e]">Robotics Development & Automation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#2d545e] rounded-full"></div>
                    <span className="text-[#2d545e]">VLSI Design & Microelectronics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#2d545e] rounded-full"></div>
                    <span className="text-[#2d545e]">Artificial Intelligence & Machine Learning</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* MTL Card */}
            <Link href="/entities/mtl" className="block">
              <div className="bg-white border border-[#c89666] rounded-lg p-8 hover:border-[#2d545e] hover:shadow-xl transition-all duration-300 shadow-md cursor-pointer h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-[#2d545e]">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl text-[#2d545e]">MTL Lab (Mechanical Testing Lab)</h3>
                    <p className="text-[#2d545e] text-lg">Specialized Research Laboratory</p>
                  </div>
                </div>
                <p className="text-[#2d545e] mb-6 leading-relaxed">
                  The MTL Lab (Mechanical Testing Lab) is a specialized research facility dedicated to advanced technological 
                  research and development.
                </p>
                <div className="space-y-3">
                  <h4 className="text-[#2d545e] font-semibold mb-3">Key Focus Areas:</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#2d545e] rounded-full"></div>
                    <span className="text-[#2d545e]">Advanced Materials Research</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#2d545e] rounded-full"></div>
                    <span className="text-[#2d545e]">Technology Innovation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#2d545e] rounded-full"></div>
                    <span className="text-[#2d545e]">Laboratory Testing & Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#2d545e] rounded-full"></div>
                    <span className="text-[#2d545e]">Research & Development</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
