"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="container mx-auto px-8 md:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* CIRD Info */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Centre for Industrial Research and Development
              </h3>
              <p className="text-gray-400 leading-relaxed">
                An Industry–Academia interface established by Jaypee University of Engineering and Technology (JUET), Guna.
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    About CIRD
                  </Link>
                </li>
                <li>
                  <Link href="/research" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Research Areas
                  </Link>
                </li>
                <li>
                  <Link href="/entities" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Research Entities
                  </Link>
                </li>
                <li>
                  <Link href="http://115.242.156.230:3000" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                    Hydrology <ExternalLink className="ml-1 w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Research Focus */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Research Focus</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Software Development</li>
                <li>Robotics Development</li>
                <li>VLSI Design</li>
                <li>Artificial Intelligence</li>
                <li>Technology Transfer</li>
                <li>IPR Management</li>
              </ul>
            </motion.div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                  <span>Jaypee University of Engineering and Technology, Guna, Madhya Pradesh, India</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <a href="mailto:support@cird.co.in" className="hover:text-cyan-400 transition-colors">
                    support@cird.co.in
                  </a>
                </div>
                <div className="flex items-start space-x-3 text-gray-400">
                  <Phone className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <a href="tel:+919893808251" className="hover:text-cyan-400 transition-colors block">
                      +91 9893808251
                    </a>
                    <span className="text-xs text-gray-500 block mt-1">Dr. Dhananjay R. Mishra</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-700">
                  <h5 className="text-white font-semibold mb-2">Leadership</h5>
                  <div className="text-sm text-gray-400 space-y-1">
                    <div>
                      <strong className="text-cyan-400">Coordinator & Incharge of CDC:</strong> Dr. Dhananjay R. Mishra
                    </div>
                    <div className="pt-1">
                      <strong className="text-cyan-400">Co-Coordinator:</strong> Dr. Amit Kumar Srivastava
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <Link 
                    href="https://www.linkedin.com/in/center-of-industrial-research-and-development/" 
                    target="_blank"
                    className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>Follow us on LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-slate-700 mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Centre for Industrial Research and Development. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm">
              Jaypee University of Engineering and Technology, Guna
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
