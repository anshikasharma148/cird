"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Handshake, Target, Users, Award } from "lucide-react";

export default function MoUPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - CIRD theme, MoU #1565C0 (collaboration blue) */}
      <section className="pt-36 sm:pt-40 pb-16 sm:pb-20 bg-[#1565C0] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-60" />
        <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block mb-6 bg-[#FF9800] text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg">
              Memorandum of Understanding
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              MoU Signed Between <span className="text-[#FF9800]">JUs and JPVL</span>
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Technical Professional Consultancy Projects under the MoU
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-slate-50 border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-[#1A237E] via-[#FF9800] to-[#1A237E]" />
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-[#1A237E] flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-[#1A237E] text-white">
                    <FileText className="w-6 h-6" />
                  </span>
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-base sm:text-lg text-[#37474F] leading-relaxed">
                  The Memorandum of Understanding (MoU) between Jaypee Universities (JUs) and Jaypee Power Ventures Limited (JPVL) 
                  establishes a framework for technical professional consultancy projects and collaborative research initiatives.
                </p>
                <p className="text-base sm:text-lg text-[#37474F] leading-relaxed">
                  This partnership facilitates research translation, technology development, intellectual property (IPR) management, 
                  R&D collaboration, technology transfer and commercialization, and mentoring.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Areas */}
          <div className="mt-12 sm:mt-16">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">Focus Areas</span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A237E] mt-2 mb-2">Key Areas of Collaboration</h2>
              <div className="mx-auto w-16 h-1 rounded-full bg-[#FF9800]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border border-slate-200 hover:border-[#1A237E]/20 transition-all duration-300 shadow-sm hover:shadow-md h-full">
                  <CardHeader>
                    <div className="p-3 rounded-xl bg-[#1A237E] w-fit mb-4">
                      <Handshake className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-[#1A237E]">Partnership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#37474F] text-sm sm:text-base leading-relaxed">
                      Strengthening industry-academia collaboration through strategic partnerships and joint initiatives.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border border-slate-200 hover:border-[#1A237E]/20 transition-all duration-300 shadow-sm hover:shadow-md h-full">
                  <CardHeader>
                    <div className="p-3 rounded-xl bg-[#1A237E] w-fit mb-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-[#1A237E]">Research & Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#37474F] text-sm sm:text-base leading-relaxed">
                      Collaborative R&D projects focusing on innovative solutions and technology advancement.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border border-slate-200 hover:border-[#1A237E]/20 transition-all duration-300 shadow-sm hover:shadow-md h-full">
                  <CardHeader>
                    <div className="p-3 rounded-xl bg-[#1A237E] w-fit mb-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-[#1A237E]">Knowledge Transfer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#37474F] text-sm sm:text-base leading-relaxed">
                      Facilitating knowledge exchange, mentoring, and professional development opportunities.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 max-w-4xl mx-auto"
          >
            <Card className="bg-slate-50 border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-[#1A237E] flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-[#FF9800] text-white">
                    <Award className="w-5 h-5" />
                  </span>
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#37474F] text-center py-6 sm:py-8">
                  More content will be added here soon.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

