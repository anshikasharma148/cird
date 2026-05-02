"use client";

import Link from "next/link";
import { Mail, MapPin, Send, Linkedin } from "lucide-react";

const usefulLinks = [
  { label: "JUET Guna", href: "https://www.juet.ac.in", external: true },
  { label: "Research & Projects", href: "/research" },
  { label: "Patents & Designs", href: "/patents" },
  { label: "CDC", href: "/entities/cdc" },
  { label: "MTL Lab", href: "/entities/mtl" },
  { label: "Training", href: "/training" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About CIRD", href: "/about" },
  { label: "Authorities", href: "/authorities" },
  { label: "Research Entities", href: "/entities" },
  { label: "Patents", href: "/patents" },
  { label: "Contact", href: "/contact" },
  { label: "Agent Login", href: "/agent" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/center-of-industrial-research-and-development/", label: "LinkedIn" },
];

export function Footer() {
  return (
    <>
      <footer className="bg-[#0f172a] text-slate-300">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-12 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Contact Us - with white card */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-2">
                Contact Us
              </h4>
              <div className="mt-4 rounded-xl bg-white p-5 shadow-lg border border-slate-100">
                <div className="mb-4">
                  <span className="text-xl font-bold text-[#1A237E]">CIRD</span>
                </div>
                <p className="text-slate-700 text-sm font-medium mb-3">
                  Centre for Industrial Research and Development
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Jaypee University of Engineering and Technology, Guna, Madhya Pradesh 473226, India
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-white">
                      <Mail className="h-4 w-4" />
                    </span>
                    <a href="mailto:cird@juetguna.in" className="text-slate-700 text-sm hover:text-[#1A237E] break-all">
                      cird@juetguna.in
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-white">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span className="text-slate-600 text-sm">JUET, Guna (M.P.)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-2">
                Useful Links
              </h4>
              <ul className="mt-4 space-y-2.5">
                {usefulLinks.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-[#FF9800] transition-colors text-sm"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className="text-slate-400 hover:text-[#FF9800] transition-colors text-sm">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-2">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2.5">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-slate-400 hover:text-[#FF9800] transition-colors text-sm">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-2">
                Social
              </h4>
              <div className="mt-4 flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-500 text-slate-400 hover:border-[#FF9800] hover:text-[#FF9800] transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-slate-700/80 bg-[#0c1222] py-4">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
            <p className="text-slate-500 text-center text-sm">
              © {new Date().getFullYear()} Centre for Industrial Research and Development. All rights reserved. Jaypee University of Engineering and Technology, Guna.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Contact button */}
      <Link
        href="/contact"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-lg bg-[#1A237E] px-4 py-3 text-white shadow-lg hover:bg-[#0d1642] transition-colors"
      >
        <Send className="h-5 w-5" />
        <span className="font-semibold text-sm">Contact Us</span>
      </Link>
    </>
  );
}
