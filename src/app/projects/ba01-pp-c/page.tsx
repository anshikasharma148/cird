"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, CheckCircle, Building2, FileText } from "lucide-react";
import Link from "next/link";
import PageLoader from "@/components/page-loader";

export default function BA01PPCPage() {
  return (
    <>
      <PageLoader pageType="project" />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 relative overflow-hidden">
        <div className="container mx-auto px-8 md:px-16 relative z-10">
          <Link href="/research">
            <Button variant="ghost" className="mb-6 text-white hover:text-gray-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Research
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-blue-600 text-white border border-blue-500 px-6 py-2 shadow-lg shadow-blue-900/30">
                BA01/PP/C
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Bottom Ash Replacement in Pavers and Bricks
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl leading-relaxed">
              Develop a methodology to replace 80% of sand with bottom ash in paver and brick manufacturing, ensuring sustainable and compliant production.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Objective Section */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-blue-950">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white border-blue-200 shadow-xl shadow-blue-900/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                  <CardTitle className="text-2xl text-slate-900">Objective</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 text-lg leading-relaxed">
                  This project focuses on developing an optimized methodology to replace up to 80% of natural sand with bottom ash in the manufacturing of pavers and bricks. The research ensures sustainable manufacturing practices while maintaining quality standards and compliance with industry regulations.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Implementation Details */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Implementation <span className="text-white">Details</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Standards Compliance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-white border-blue-200 h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-xl text-slate-900">Standards Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">
                    The methodology is designed and implemented in strict compliance with <strong className="text-slate-900">IS 15658:2021</strong> standards, ensuring quality, durability, and safety of the manufactured pavers and bricks.
                  </p>
                  <Badge className="bg-blue-100 text-blue-900 border-blue-300 mt-4">
                    IS 15658:2021 Compliant
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            {/* Applications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white border-blue-200 h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-xl text-slate-900">Applications</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">
                    The manufactured pavers and bricks are suitable for various infrastructure applications:
                  </p>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-slate-700">City streets and urban infrastructure</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-slate-700">Markets and commercial areas</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-slate-700">Bus terminals and transport hubs</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-slate-700">Industrial complexes</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-slate-700">Pavements and walkways</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Team */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-blue-950">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white border-blue-200 shadow-xl shadow-blue-900/20">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900 mb-4">Project Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-3 text-lg">JUET Team</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-slate-700">Dr. D.K. Shukla, Assistant Professor (SG), Civil, JUET, Guna</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-slate-700">Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-3 text-lg">Industry Partners (JPVL)</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-slate-700">Sh. Nadeem Ahmed, Nodal Officer, JNSTPP, JPVL</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-slate-700">Sh. Ishtiaque Ahmed, Nodal Officer, JBTPP, JPVL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}

