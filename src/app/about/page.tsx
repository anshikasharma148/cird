"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Award, 
  Users, 
  BookOpen, 
  Lightbulb, 
  ArrowRight,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { InternalLinksSection } from "@/components/seo/internal-links";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - purple #800080 */}
      <section className="pt-36 sm:pt-40 pb-20 bg-[#800080] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-60" />
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge className="mb-6 bg-[#FF9800] text-white border-0 px-6 py-2 shadow-lg">
              About CIRD
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              About <span className="text-[#FF9800]">CIRD</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              The Centre for Industrial Research and Development (CIRD) is an Industry–Academia interface
              established at Jaypee University of Engineering and Technology (JUET), Guna.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"
            >
              <p className="text-lg font-semibold text-white mb-2">
                MoU Signed Between JUs and JPVL
              </p>
              <p className="text-[#FF9800]">
                Technical Professional Consultancy Projects under the MoU
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision - white bg, dark blue headings, orange accent */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">What we stand for</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A237E] mt-2 mb-4">
              Our Mission & Vision
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-[#FF9800] to-[#1A237E]" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#1A237E]/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1A237E] text-white">
                  <Target className="w-6 h-6" />
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A237E]">Our Aim</h3>
              </div>
              <p className="text-[#37474F] leading-relaxed">
                CIRD aims to serve as an effective interface between academia and industry to foster,
                promote, and sustain the commercialization of science and technology for mutual growth and societal benefit.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#1A237E]/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1A237E] text-white">
                  <Award className="w-6 h-6" />
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A237E]">Our Mission</h3>
              </div>
              <p className="text-[#37474F] leading-relaxed italic">
                &ldquo;To be a dynamic interface with industry, fostering innovation, research collaboration,
                and sustainable commercialization of science and technology for mutual benefit.&rdquo;
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm"
          >
            <p className="text-[#37474F] leading-relaxed text-base sm:text-lg">
              Through this mission, CIRD facilitates knowledge transfer, nurtures innovation-driven entrepreneurship,
              and establishes enduring linkages with industry, government agencies, and the community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coordination Committee - white bg, CIRD theme */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">People</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A237E] mt-2 mb-4">
              Coordination Committee
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-[#FF9800] to-[#1A237E]" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#1A237E]/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1A237E] text-white">
                  <Users className="w-6 h-6" />
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A237E]">Coordination Committee of CIRD</h3>
              </div>
              <div className="space-y-3">
                {["Dr. Dhananjay R. Mishra (Coordinator & Incharge)", "Dr. Pankaj Dumka (Member)", "Dr. Gaurav Saxena (Member)", "Dr. Amit Kumar Srivastava (Member)", "Dr. Dharmendra Kumar Shukla (Member)"].map((name, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FF9800] shrink-0" />
                    <span className="text-[#37474F]">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#1A237E]/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1A237E] text-white">
                  <BookOpen className="w-6 h-6" />
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A237E]">Team Members of CDC</h3>
              </div>
              <div className="space-y-3">
                {["Dr. Amit Kumar Srivastava", "Er. Anshika Sharma", "Er. Nitesh Pandey", "Er. Shashwat Shukla"].map((name, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FF9800] shrink-0" />
                    <span className="text-[#37474F]">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-10 bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1A237E] text-white">
                <Lightbulb className="w-6 h-6" />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A237E]">Mechanical Testing Lab</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                {["Dr. Dharmendra Kumar Shukla", "R.S. Chauhan"].map((name, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FF9800] shrink-0" />
                    <span className="text-[#37474F]">{name}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {["K.K. Purohit", "Bhanu Pratap Arya"].map((name, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FF9800] shrink-0" />
                    <span className="text-[#37474F]">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brief About CIRD - white bg */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1A237E] mb-6 text-center">Brief about CIRD</h3>
            <div className="mx-auto w-16 h-1 rounded-full bg-[#FF9800] mb-6" />
            <p className="text-[#37474F] leading-relaxed text-base sm:text-lg max-w-4xl mx-auto text-center">
              The Centre for Industrial Research and Development (CIRD) was established at Jaypee University of Engineering and Technology (JUET), Guna, as a dedicated platform to enhance the University&apos;s engagement with industry and to promote collaborative research and development. Conceived under the leadership of the University&apos;s management, CIRD was envisioned as a catalyst to bridge the gap between academic research and industrial applications. Since its inception, CIRD has evolved into a vital centre for consultancy projects, joint R&D programs, technology development, and innovation ecosystem enrichment, contributing significantly to the University&apos;s mission of societal and industrial advancement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Cards - CIRD theme */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-[#1A237E]/20 transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl text-[#1A237E]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A237E] text-white">
                      <Target className="h-5 w-5" />
                    </span>
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#37474F] leading-relaxed">
                    To drive excellence in industrial research and development by
                    fostering innovation, collaboration, and the pursuit of
                    cutting-edge solutions that transform industries and empower
                    communities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-[#1A237E]/20 transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl text-[#1A237E]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A237E] text-white">
                      <Lightbulb className="h-5 w-5" />
                    </span>
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#37474F] leading-relaxed">
                    To be a globally recognized center for pioneering industrial
                    innovation and knowledge creation, bridging the gap between
                    research and real-world implementation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>


      <InternalLinksSection
        eyebrow="Discover More"
        title="Explore CIRD Resources"
        description="Navigate to our key sections for research outputs, patents, entities, and collaboration opportunities."
        links={[
          {
            href: "/research",
            title: "Research Projects",
            description: "View ongoing and completed industrial R&D initiatives.",
          },
          {
            href: "/patents",
            title: "Patents and IPR",
            description: "Explore registered designs and intellectual property milestones.",
          },
          {
            href: "/entities",
            title: "Research Entities",
            description: "Learn about CDC and MTL laboratories and their focus areas.",
          },
          {
            href: "/team",
            title: "CIRD Team",
            description: "Meet faculty, engineers, and contributors driving CIRD programs.",
          },
          {
            href: "/mou",
            title: "MoU and Partnerships",
            description: "See collaboration frameworks and project engagement models.",
          },
          {
            href: "/contact",
            title: "Contact CIRD",
            description: "Start a collaboration or send project and consultancy inquiries.",
          },
        ]}
      />

      {/* Stats Section - dark blue bg, orange accent, purple numbers */}
      <section className="py-16 sm:py-20 bg-[#1A237E]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-[#FF9800]">Impact</span>
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Numbers that reflect our commitment to research excellence and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: "15+", label: "Research Projects", link: "/research" },
              { number: "18", label: "Patents Filed", link: "/patents" },
              { number: "50+", label: "Publications", link: null },
              { number: "3", label: "Research Centers", link: "/entities" }
            ].map((stat, index) => {
              const content = (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`text-center ${stat.link ? "group cursor-pointer" : ""}`}
                >
                  <div className={`text-4xl sm:text-5xl font-bold text-[#7B1FA2] mb-2 ${stat.link ? "group-hover:text-[#FF9800] transition-colors" : ""}`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm sm:text-base text-white/90 ${stat.link ? "group-hover:text-white transition-colors" : ""}`}>
                    {stat.label}
                  </div>
                </motion.div>
              );
              return stat.link ? (
                <Link key={index} href={stat.link} className="block">
                  {content}
                </Link>
              ) : (
                content
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action - dark blue, orange primary button */}
      <section className="py-16 sm:py-20 bg-[#1A237E] border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Join Our Research Journey
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Be part of the future of industrial research and development.
              Collaborate with us to create innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/research">
                <Button
                  size="lg"
                  className="bg-[#FF9800] text-white hover:bg-[#F57C00] border-0 px-8 py-4 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Research <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/team">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#1A237E] px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                >
                  Know Our Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
