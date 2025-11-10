"use client";

import Background3D from "@/components/3d-background";
import HeroSection from "@/components/hero-section";
import { AboutSection, XBracketProject } from "@/components/research-sections";
import CollaborationSlider from "@/components/collaboration-slider";
import { motion } from "framer-motion";
import { Handshake } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* 3D Background */}
      <Background3D />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Collaboration & Partnerships Showcase - At the top */}
      <section className="py-20 bg-gradient-to-b from-blue-950 to-slate-900 relative z-10">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Handshake className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Collaborations & Partnerships
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
      <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950 relative overflow-hidden">
        <div className="container mx-auto px-8 md:px-16 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              CIRD <span className="text-white">Entities</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Our specialized divisions working on cutting-edge research and development across 
              multiple technological domains.
            </p>
            
            {/* Project Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">14</div>
                <div className="text-sm text-gray-400">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">4</div>
                <div className="text-sm text-gray-400">Completed Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">11</div>
                <div className="text-sm text-gray-400">Ongoing Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">18</div>
                <div className="text-sm text-gray-400">Patents Filed</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* CDC Card */}
            <div className="bg-white border border-blue-200 rounded-lg p-8 hover:border-blue-400 transition-all duration-300 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-600">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl text-slate-900">CDC - Control Development Centre</h3>
                  <p className="text-slate-600 text-lg">Advanced Control Systems Research</p>
                </div>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                The Control Development Centre focuses on developing sophisticated control systems 
                and automation solutions for industrial applications.
              </p>
              <div className="space-y-3">
                <h4 className="text-slate-900 font-semibold mb-3">Key Focus Areas:</h4>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-slate-700">Software Development & Programming</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-slate-700">Robotics Development & Automation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-slate-700">VLSI Design & Microelectronics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-slate-700">Artificial Intelligence & Machine Learning</span>
                </div>
              </div>
            </div>

            
            <div className="bg-white border border-blue-200 rounded-lg p-8 hover:border-blue-400 transition-all duration-300 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-600">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl text-slate-900">MTL Lab (Mechanical Testing Lab)</h3>
                  <p className="text-slate-600 text-lg">Specialized Research Laboratory</p>
                </div>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                The MTL Lab (Mechanical Testing Lab) is a specialized research facility dedicated to advanced technological 
                research and development.
              </p>
              <div className="space-y-3">
                <h4 className="text-slate-900 font-semibold mb-3">Key Focus Areas:</h4>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-slate-700">Advanced Materials Research</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-slate-700">Technology Innovation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-slate-700">Laboratory Testing & Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-slate-700">Research & Development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
