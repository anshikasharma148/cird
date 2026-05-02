"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CloudRain, Sun } from "lucide-react";

const AWS_IMAGES = [
  { src: "/assets/projects/aws/img1.png", alt: "AWS station or equipment" },
  { src: "/assets/projects/aws/img2.png", alt: "AWS monitoring" },
  { src: "/assets/projects/aws/img3.png", alt: "AWS installation" },
  { src: "/assets/projects/aws/img4.png", alt: "AWS site" },
  { src: "/assets/projects/aws/img5.png", alt: "AWS sensor" },
  { src: "/assets/projects/aws/img6.png", alt: "AWS station" },
];

export default function AWSPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-36 sm:pt-40 pb-16 sm:pb-20 bg-[#1565C0] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-60" />
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center gap-6"
          >
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/20">
              <CloudRain className="w-16 h-16 text-[#FF9800]" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Automated Weather Stations <span className="text-[#FF9800]">(AWS)</span>
              </h1>
              <p className="text-lg text-white/90 max-w-2xl">
                Weather monitoring at VPHEP G&amp;D stations—Barrage, Mana, Vasudhara—with temperature, pressure, humidity, wind, solar radiation, and precipitation (rain/snow).
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="text-[#37474F] text-base sm:text-lg leading-relaxed">
              Automated Weather Stations (AWS) provide atmospheric, wind, solar, and precipitation data for hydrological and operational planning. Access live data and trends at{" "}
              <a href="https://hydrologyjpvl.cird.co.in" target="_blank" rel="noopener noreferrer" className="text-[#1A237E] font-semibold underline hover:text-[#FF9800]">
                hydrologyjpvl.cird.co.in
              </a>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image gallery */}
      <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A237E] mb-8 flex items-center gap-2">
            <Sun className="w-8 h-8 text-[#FF9800]" />
            AWS Glimpses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AWS_IMAGES.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-white shadow-md"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
