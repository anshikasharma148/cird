"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Lightbulb, AlertCircle, Target } from "lucide-react";
import Link from "next/link";

export default function BA01PPBPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - teal (Research theme), distinct from About blue */}
      <section className="pt-36 sm:pt-40 pb-20 bg-[#00695C] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
          <Link href="/research">
            <Button variant="ghost" className="mb-6 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Research
            </Button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-[#FF9800] text-white border-0 px-6 py-2 shadow-lg">
              BA01/PP/B
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Problems and Remedies of Bottom Ash Replacement with Sand
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-4xl leading-relaxed">
              Investigate challenges and develop remedies for replacing natural sand with bottom ash in concrete and mortar mixes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Objective Section */}
      <section className="py-16 bg-gradient-to-b from-[#e1b382]/50 to-[#e1b382]/40">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white border-[#c89666] shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                    <Target className="w-8 h-8 text-[#2d545e]" />
                  <CardTitle className="text-2xl text-[#2d545e]">Objective</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed">
                  This project investigates the challenges and develops remedies for replacing natural sand with bottom ash in concrete and mortar mixes. The research focuses on optimizing workability, strength, and water balance to ensure effective utilization of bottom ash as a sustainable alternative to natural sand.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Key Findings & Issues */}
      <section className="py-16 bg-gradient-to-b from-[#c89666] to-[#e1b382]">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d545e] mb-6">
              Key Findings & <span className="text-[#2d545e]">Remedies</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Water Absorption */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-xl text-[#2d545e]">Water Absorption</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    <strong className="text-[#2d545e]">Issue:</strong> Bottom ash absorbs more water than sand, decreasing workability of concrete and mortar mixes.
                  </p>
                  <div className="flex items-start gap-2 mt-4">
                    <Lightbulb className="w-5 h-5 text-[#2d545e] mt-1 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Remedy:</strong> Maintain Saturated Surface Dry (SSD) condition and use superplasticizers to control workability effectively.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Water Retention */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-xl text-[#2d545e]">Water Retention</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    <strong className="text-[#2d545e]">Issue:</strong> Lower water retention leads to bleeding in concrete mixes.
                  </p>
                  <div className="flex items-start gap-2 mt-4">
                    <Lightbulb className="w-5 h-5 text-[#2d545e] mt-1 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Remedy:</strong> Carefully adjust water content to avoid slump reduction and bleeding issues.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Specific Gravity */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-xl text-[#2d545e]">Specific Gravity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    <strong className="text-[#2d545e]">Issue:</strong> Bottom ash (1.4–2.1) is lighter than sand (2.65–2.7), reducing concrete density and complicating batching processes.
                  </p>
                  <div className="flex items-start gap-2 mt-4">
                    <Lightbulb className="w-5 h-5 text-[#2d545e] mt-1 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Remedy:</strong> Use factored percentage replacement (below 40%) for balanced performance and density.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Gradation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-xl text-[#2d545e]">Gradation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    <strong className="text-[#2d545e]">Finding:</strong> Natural sand (Zone II) helps improve gradation and strength consistency in concrete mixes. Proper gradation is essential for optimal performance.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Team */}
      <section className="py-16 bg-gradient-to-b from-[#e1b382] to-[#c89666]">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white border-[#c89666] shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-[#2d545e] mb-4">Project Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[#2d545e] font-semibold mb-3 text-lg">JUET Team</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                        <span className="text-gray-700">Dr. D.K. Shukla, Assistant Professor (SG), Civil, JUET, Guna</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                        <span className="text-gray-700">Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[#2d545e] font-semibold mb-3 text-lg">Industry Partners (JPVL)</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                        <span className="text-gray-700">Sh. Nadeem Ahmed, Nodal Officer, JNSTPP, JPVL</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                        <span className="text-gray-700">Sh. Ishtiaque Ahmed, Nodal Officer, JBTPP, JPVL</span>
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
  );
}

