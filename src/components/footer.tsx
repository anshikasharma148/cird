"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="container mx-auto px-8 md:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <a href="mailto:coordinator@cird.co.in" className="hover:text-cyan-400 transition-colors">
                    coordinator@cird.co.in
                  </a>
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
