"use client";

import HeroSection from "@/components/hero-section";
import { AboutSection } from "@/components/research-sections";
import CollaborationSlider from "@/components/collaboration-slider";
import HydrologySlider from "@/components/hydrology-slider";
import ProjectImagesSlider from "@/components/project-images-slider";
import { motion } from "framer-motion";
import {
  Handshake,
  Shield,
  Lightbulb,
  GraduationCap,
  ArrowRight,
  BookOpen,
  FileCode,
  Target,
  Award,
  Zap,
  FileText,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const viewport = { once: true, amount: 0.2 };
const slideIn = {
  left: { initial: { opacity: 0, x: -80 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 80 }, animate: { opacity: 1, x: 0 } },
};

function AlternatingSection({
  reverse,
  heading,
  children,
  className = "",
  contentWide = false,
}: {
  reverse: boolean;
  heading: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentWide?: boolean;
}) {
  const headingMotion = reverse ? slideIn.right : slideIn.left;
  const contentMotion = reverse ? slideIn.left : slideIn.right;
  return (
    <section className={`py-12 sm:py-16 lg:py-20 border-t border-slate-100 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className={`grid grid-cols-1 gap-8 lg:gap-12 items-center ${contentWide ? "lg:grid-cols-[0.88fr_1.12fr]" : "lg:grid-cols-2"}`}>
          <motion.div
            initial={headingMotion.initial}
            whileInView={headingMotion.animate}
            viewport={viewport}
            transition={{ duration: 0.6 }}
            className={reverse ? "lg:order-2" : ""}
          >
            {heading}
          </motion.div>
          <motion.div
            initial={contentMotion.initial}
            whileInView={contentMotion.animate}
            viewport={viewport}
            transition={{ duration: 0.6 }}
            className={`min-w-0 ${reverse ? "lg:order-1" : ""}`}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <h1 className="sr-only">Centre for Industrial Research and Development (CIRD) at JUET, Guna</h1>
      <HeroSection />

      {/* 1. Collaborations & Partnerships — heading left, slider right */}
      <AlternatingSection
        reverse={false}
        heading={
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-4">
              <Handshake className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#1A237E]" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A237E]">
                Collaborations &amp; Partnerships
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[#37474F] max-w-xl mx-auto lg:mx-0">
              Building strong industry-academia partnerships for innovation
            </p>
            <div className="mt-4 mx-auto lg:mx-0 w-16 h-1 rounded-full bg-[#FF9800]" />
          </div>
        }
      >
        <CollaborationSlider />
      </AlternatingSection>

      {/* 2. About CIRD — heading right, content left (reverse) */}
      <AlternatingSection
        reverse={true}
        className="bg-white"
        heading={
          <div className="text-center lg:text-right">
            <span className="inline-block text-xs font-semibold text-[#FF9800] uppercase tracking-widest mb-2">
              About CIRD
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A237E] mb-4">
              Centre for Industrial Research and Development
            </h2>
            <p className="text-base sm:text-lg text-[#37474F] max-w-xl mx-auto lg:mr-0 lg:ml-auto">
              An Industry–Academia interface established at Jaypee University of Engineering and Technology (JUET), Guna.
            </p>
            <div className="mt-4 mx-auto lg:ml-auto lg:mr-0 w-16 h-1 rounded-full bg-[#FF9800]" />
          </div>
        }
      >
        <div className="bg-slate-50 rounded-2xl p-6 lg:p-8 border border-slate-200">
          <p className="text-[#37474F] leading-relaxed mb-4">
            The Centre for Industrial Research and Development (CIRD) is an Industry–Academia interface
            established by the Jaypee Universities at JUET, Guna. The centre aims to facilitate research
            translation, technology development, IPR management, R&D collaboration, and commercialization.
          </p>
          <Link
            href="/about"
            aria-label="About CIRD"
            className="inline-flex items-center gap-2 text-[#1A237E] font-semibold hover:text-[#FF9800] transition-colors"
          >
            Learn more about CIRD <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AlternatingSection>

      {/* 3. Gallery Glimpses */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6 }}
      >
        <AboutSection />
      </motion.div>

      {/* 4. X-BRACKET POST — heading right, cards left */}
      <AlternatingSection
        reverse={true}
        contentWide
        className="bg-slate-50"
        heading={
          <div className="text-center lg:text-right">
            <Badge className="mb-3 sm:mb-4 bg-[#FF9800] text-white border-0 px-4 sm:px-6 py-1.5 sm:py-2 shadow text-xs sm:text-sm">
              🏆 Featured Project
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A237E] mb-4 sm:mb-5 lg:mb-6">
              X-BRACKET <span className="text-[#FF9800]">POST</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#37474F] max-w-xl mx-auto lg:mr-0 lg:ml-auto leading-relaxed">
              A groundbreaking collaboration between CIRD and Jaiprakash Power Ventures Limited (JPVL) that resulted in a patented equipment design, showcasing engineering excellence and intellectual property innovation.
            </p>
            <div className="mt-4 mx-auto lg:ml-auto lg:mr-0 w-16 h-1 rounded-full bg-[#FF9800]" />
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-6">
          {[
            { title: "Industry Partnership", description: "CIRD JPVL Collaboration", content: "A successful collaboration between CIRD at JUET and Jaiprakash Power Ventures Limited, demonstrating the power of industry-academia partnerships in driving innovation.", icon: Target },
            { title: "Patent Registration", description: "Government of India Certified", content: "The X-BRACKET POST design was officially registered and certified by the Patent Office of the Government of India, showcasing engineering excellence.", icon: Award },
            { title: "Intellectual Property", description: "Engineering Excellence", content: "This project exemplifies our commitment to creating valuable intellectual property through innovative engineering solutions and research.", icon: Zap },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={index === 2 ? "sm:col-span-2" : ""}
            >
              <Card className="bg-white border-slate-200 hover:border-[#1A237E] transition-all duration-300 hover:shadow-lg shadow-sm h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <div className="p-2 rounded-lg bg-[#1A237E] flex-shrink-0">
                      <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg lg:text-xl text-[#1A237E]">{card.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm sm:text-base text-[#37474F]">{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base text-[#37474F] leading-relaxed">{card.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AlternatingSection>

      {/* 5. CIRD Entities — heading left, stats + cards right */}
      <AlternatingSection
        reverse={false}
        className="bg-white"
        heading={
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A237E] mb-4">
              CIRD <span className="text-[#FF9800]">Entities</span>
            </h2>
            <p className="text-base sm:text-lg text-[#37474F] max-w-xl mx-auto lg:mx-0 mb-6">
              Our specialized divisions working on cutting-edge research and development across multiple technological domains.
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto lg:mx-0">
              <div className="text-center lg:text-left p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-bold text-[#1A237E]">14</div>
                <div className="text-xs text-[#37474F]">Total Projects</div>
              </div>
              <div className="text-center lg:text-left p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-bold text-[#1A237E]">18</div>
                <div className="text-xs text-[#37474F]">Patents Filed</div>
              </div>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <Link href="/entities/cdc" className="block group">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#1A237E] hover:shadow-lg transition-all duration-300 p-4 flex gap-4 items-center">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image src="/assets/entities/cdc/control-room.jpg" alt="CDC" fill className="object-cover group-hover:scale-105 transition-transform" sizes="96px" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A237E] group-hover:text-[#FF9800] transition-colors">CDC - Control Development Centre</h3>
                <p className="text-sm text-[#37474F]">Advanced Control Systems Research</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#1A237E] ml-auto flex-shrink-0" />
            </div>
          </Link>
          <Link href="/entities/mtl" className="block group">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#1A237E] hover:shadow-lg transition-all duration-300 p-4 flex gap-4 items-center">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image src="/assets/entities/mtl/img5.jpeg" alt="MTL" fill className="object-cover group-hover:scale-105 transition-transform" sizes="96px" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A237E] group-hover:text-[#FF9800] transition-colors">MTL Lab</h3>
                <p className="text-sm text-[#37474F]">Mechanical Testing Lab</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#1A237E] ml-auto flex-shrink-0" />
            </div>
          </Link>
          <Link href="/entities" className="inline-flex items-center gap-2 text-[#1A237E] font-semibold hover:text-[#FF9800] transition-colors text-sm">
            View all entities <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AlternatingSection>

      {/* 6. Research & Innovation — NEW: heading right, content left (reverse) */}
      <AlternatingSection
        reverse={true}
        className="bg-slate-50"
        heading={
          <div className="text-center lg:text-right">
            <span className="inline-block text-xs font-semibold text-[#FF9800] uppercase tracking-widest mb-2">
              Focus
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A237E] mb-4">
              Research &amp; Innovation
            </h2>
            <p className="text-base text-[#37474F] max-w-xl mx-auto lg:mr-0 lg:ml-auto">
              From fundamental research to applied solutions and IP creation—CIRD drives innovation across engineering and technology.
            </p>
            <div className="mt-4 mx-auto lg:ml-auto lg:mr-0 w-16 h-1 rounded-full bg-[#FF9800]" />
          </div>
        }
      >
        <div className="space-y-4">
          {[
            { icon: FileCode, label: "Software & Algorithms", href: "/research" },
            { icon: Lightbulb, label: "Patents & IP", href: "/patents" },
            { icon: BookOpen, label: "Publications & Projects", href: "/research" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-[#1A237E] hover:shadow-md transition-all group"
              >
                <span className="p-2.5 rounded-lg bg-[#1A237E] text-white group-hover:bg-[#FF9800] transition-colors">
                  <item.icon className="w-5 h-5" />
                </span>
                <span className="font-semibold text-[#1A237E]">{item.label}</span>
                <ArrowRight className="w-4 h-4 text-[#37474F] ml-auto" />
              </Link>
            </motion.div>
          ))}
        </div>
      </AlternatingSection>

      {/* 7. Training & Capacity Building — NEW: heading left, content right */}
      <AlternatingSection
        reverse={false}
        className="bg-white"
        heading={
          <div className="text-center lg:text-left">
            <span className="inline-block text-xs font-semibold text-[#FF9800] uppercase tracking-widest mb-2">
              Programs
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A237E] mb-4">
              Training &amp; Capacity Building
            </h2>
            <p className="text-base text-[#37474F] max-w-xl mx-auto lg:mx-0">
              Summer Industrial Training, faculty development programs, and industry-aligned skill development at CIRD.
            </p>
            <div className="mt-4 mx-auto lg:mx-0 w-16 h-1 rounded-full bg-[#FF9800]" />
          </div>
        }
      >
        <div className="bg-slate-50 rounded-2xl p-6 lg:p-8 border border-slate-200">
          <div className="flex items-start gap-4 mb-4">
            <GraduationCap className="w-10 h-10 text-[#1A237E] flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[#1A237E] mb-1">Summer Industrial Training</h3>
              <p className="text-sm text-[#37474F]">Hands-on programs in AI/ML, robotics, and industrial automation at CDC, JUET Guna.</p>
            </div>
          </div>
          <Link
            href="/training"
            className="inline-flex items-center gap-2 text-[#1A237E] font-semibold hover:text-[#FF9800] transition-colors"
          >
            Explore training <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AlternatingSection>

      {/* 8. MoU — heading right, content left (reverse) */}
      <AlternatingSection
        reverse={true}
        className="bg-slate-50"
        heading={
          <div className="text-center lg:text-right">
            <span className="inline-block text-xs font-semibold text-[#FF9800] uppercase tracking-widest mb-2">
              Collaboration
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A237E] mb-4">
              Memorandum of Understanding
            </h2>
            <p className="text-base text-[#37474F] max-w-xl mx-auto lg:mr-0 lg:ml-auto">
              MoU signed between Jaypee Universities and JPVL enabling technical professional consultancy projects and industry-academia collaboration.
            </p>
            <div className="mt-4 mx-auto lg:ml-auto lg:mr-0 w-16 h-1 rounded-full bg-[#FF9800]" />
          </div>
        }
      >
        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200">
          <div className="flex items-start gap-4 mb-4">
            <FileText className="w-10 h-10 text-[#1A237E] flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[#1A237E] mb-1">MoU – JUs &amp; JPVL</h3>
              <p className="text-sm text-[#37474F]">Technical Professional Consultancy Projects under the MoU framework.</p>
            </div>
          </div>
          <Link
            href="/mou"
            className="inline-flex items-center gap-2 text-[#1A237E] font-semibold hover:text-[#FF9800] transition-colors"
          >
            View MoU details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AlternatingSection>

      {/* 9. Hydrology — integrated EWS & AWS platform */}
      <AlternatingSection
        reverse={false}
        className="bg-white"
        heading={
          <div className="text-center lg:text-left">
            <span className="inline-block text-xs font-semibold text-[#FF9800] uppercase tracking-widest mb-2">
              Monitoring
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A237E] mb-4">
              Hydrology Platform
            </h2>
            <p className="text-base text-[#37474F] max-w-xl mx-auto lg:mx-0 mb-2">
              An integrated platform for <strong>EWS</strong> (Early Warning System) and <strong>AWS</strong> (Automatic Weather Stations) data for G&amp;D stations of VPHEP—Mana, Vasudhara, Benakuli, and Barrage.
            </p>
            <p className="text-sm text-[#37474F] max-w-xl mx-auto lg:mx-0 mb-4">
              Real-time hydrological monitoring, weather trends, and station-wise dashboards.
            </p>
            <a
              href="https://hydrologyjpvl.cird.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A237E] text-white font-semibold hover:bg-[#283593] transition-colors"
            >
              Visit hydrologyjpvl.cird.co.in
              <ExternalLink className="w-4 h-4" />
            </a>
            <div className="mt-4 mx-auto lg:mx-0 w-16 h-1 rounded-full bg-[#FF9800]" />
          </div>
        }
      >
        <div className="min-w-0">
          <HydrologySlider />
        </div>
      </AlternatingSection>

      {/* 10. EWS — Early Warning System (heading right, slider left) */}
      <AlternatingSection
        reverse={true}
        className="bg-slate-50"
        heading={
          <div className="text-center lg:text-right">
            <span className="inline-block text-xs font-semibold text-[#FF9800] uppercase tracking-widest mb-2">
              Monitoring
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A237E] mb-4">
              Early Warning System <span className="text-[#FF9800]">(EWS)</span>
            </h2>
            <p className="text-base text-[#37474F] max-w-xl mx-auto lg:mr-0 lg:ml-auto mb-4">
              Real-time hydrological monitoring at VPHEP G&amp;D stations—Mana, Vasudhara, Benakuli—with water level, velocity, discharge, and device telemetry.
            </p>
            <Link
              href="/ews"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A237E] text-white font-semibold hover:bg-[#283593] transition-colors"
            >
              View EWS <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="mt-4 mx-auto lg:ml-auto lg:mr-0 w-16 h-1 rounded-full bg-[#FF9800]" />
          </div>
        }
      >
        <div className="min-w-0">
          <ProjectImagesSlider
            images={[
              { src: "/assets/projects/ews/img1.png", alt: "EWS station" },
              { src: "/assets/projects/ews/img2.png", alt: "EWS monitoring" },
              { src: "/assets/projects/ews/img3.png", alt: "EWS installation" },
              { src: "/assets/projects/ews/img4.png", alt: "EWS site" },
            ]}
          />
        </div>
      </AlternatingSection>

      {/* 11. AWS — Automated Weather Stations (heading left, slider right) */}
      <AlternatingSection
        reverse={false}
        className="bg-white"
        heading={
          <div className="text-center lg:text-left">
            <span className="inline-block text-xs font-semibold text-[#FF9800] uppercase tracking-widest mb-2">
              Weather
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A237E] mb-4">
              Automated Weather Stations <span className="text-[#FF9800]">(AWS)</span>
            </h2>
            <p className="text-base text-[#37474F] max-w-xl mx-auto lg:mx-0 mb-4">
              Weather monitoring at Barrage, Mana, and Vasudhara—temperature, pressure, humidity, wind, solar radiation, and precipitation (rain/snow).
            </p>
            <Link
              href="/aws"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A237E] text-white font-semibold hover:bg-[#283593] transition-colors"
            >
              View AWS <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="mt-4 mx-auto lg:mx-0 w-16 h-1 rounded-full bg-[#FF9800]" />
          </div>
        }
      >
        <div className="min-w-0">
          <ProjectImagesSlider
            images={[
              { src: "/assets/projects/aws/img1.png", alt: "AWS station" },
              { src: "/assets/projects/aws/img2.png", alt: "AWS monitoring" },
              { src: "/assets/projects/aws/img3.png", alt: "AWS installation" },
              { src: "/assets/projects/aws/img4.png", alt: "AWS site" },
              { src: "/assets/projects/aws/img5.png", alt: "AWS sensor" },
              { src: "/assets/projects/aws/img6.png", alt: "AWS station" },
            ]}
          />
        </div>
      </AlternatingSection>

      {/* 12. Get in Touch CTA — centered, subtle animation */}
      <section className="py-12 sm:py-16 bg-[#1A237E] relative overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA2KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-80" />
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              Explore Research, Patents &amp; Collaboration
            </h2>
            <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto mb-6">
              Connect with CIRD for industry-academia partnerships, IP support, and innovation programs.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1A237E] font-semibold hover:bg-[#FF9800] hover:text-white transition-colors"
              >
                Research
              </Link>
              <Link
                href="/patents"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white border border-white/30 font-semibold hover:bg-white hover:text-[#1A237E] transition-colors"
              >
                Patents
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF9800] text-white font-semibold hover:bg-[#F57C00] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agent Dashboard Link */}
      <section className="py-8 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            className="flex justify-center"
          >
            <Link
              href="/agent"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-[#1A237E] hover:text-white hover:bg-[#1A237E] transition-colors border border-[#1A237E] rounded-lg"
            >
              <Shield size={16} />
              <span>Agent Dashboard</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
