"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Handshake, Target, Users, Award } from "lucide-react";

export default function MoUPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-blue-600 text-white border border-blue-500 px-6 py-2 shadow-lg shadow-blue-900/30">
                Memorandum of Understanding
              </Badge>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              MoU Signed Between <span className="text-white">JUs and JPVL</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Technical Professional Consultancy Projects under the MoU
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center mb-4">
                  <FileText className="w-8 h-8 mr-3 text-blue-400" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  The Memorandum of Understanding (MoU) between Jaypee Universities (JUs) and Jaypee Power Ventures Limited (JPVL) 
                  establishes a framework for technical professional consultancy projects and collaborative research initiatives.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  This partnership facilitates research translation, technology development, intellectual property (IPR) management, 
                  R&D collaboration, technology transfer and commercialization, and mentoring.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl h-full">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-blue-600 w-fit mb-4">
                    <Handshake className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Partnership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Strengthening industry-academia collaboration through strategic partnerships and joint initiatives.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl h-full">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-indigo-600 w-fit mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Research & Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Collaborative R&D projects focusing on innovative solutions and technology advancement.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl h-full">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-blue-600 w-fit mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Knowledge Transfer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Facilitating knowledge exchange, mentoring, and professional development opportunities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Placeholder for Future Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Award className="w-6 h-6 mr-3 text-blue-400" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center py-8">
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

