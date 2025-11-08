"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Cloud, Thermometer, Droplets, Wind, Gauge, Users } from "lucide-react";
import Link from "next/link";

export default function BA07PPBPage() {
  return (
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
                BA07/PP/B
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Automatic Weather Station (AWS)
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl leading-relaxed">
              Automate weather data collection and visualization for hydro stations, providing real-time meteorological monitoring and analysis.
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
                  This project automates weather data collection and visualization for hydro stations using automatic weather sensors. The system is integrated into CIRD's Hydrology platform, providing real-time meteorological monitoring and analysis capabilities for enhanced operational decision-making.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Technical Overview */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Technical <span className="text-white">Overview</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Data Collection Stations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-white border-blue-200 h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Cloud className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-xl text-slate-900">Monitoring Stations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    The system fetches real-time meteorological data from multiple hydro stations:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span className="text-slate-700">Mana Station</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span className="text-slate-700">Vasudhara Station</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span className="text-slate-700">Barrage Station</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* System Integration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white border-blue-200 h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Cloud className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-xl text-slate-900">System Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">
                    Weather sensors are integrated into CDC's Hydrology system, enabling seamless visualization and monitoring of meteorological data alongside hydrological information for comprehensive environmental monitoring.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meteorological Parameters */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-blue-950">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meteorological <span className="text-white">Parameters</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Thermometer className="w-6 h-6 text-white" />
                    <CardTitle className="text-lg text-white">Temperature</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">
                    Real-time ambient temperature monitoring for accurate environmental assessment.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Droplets className="w-6 h-6 text-white" />
                    <CardTitle className="text-lg text-white">Humidity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">
                    Atmospheric humidity levels for comprehensive weather analysis.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Gauge className="w-6 h-6 text-white" />
                    <CardTitle className="text-lg text-white">Pressure</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">
                    Barometric pressure measurements for weather pattern analysis.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Droplets className="w-6 h-6 text-white" />
                    <CardTitle className="text-lg text-white">Rainfall</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">
                    Precipitation monitoring for flood prediction and water resource management.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Wind className="w-6 h-6 text-white" />
                    <CardTitle className="text-lg text-white">Wind Speed</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">
                    Wind velocity measurements for comprehensive meteorological analysis.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Team */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white border-blue-200 shadow-xl shadow-blue-900/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  <CardTitle className="text-2xl text-slate-900">Project Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-3 text-lg">JUET Team</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-slate-700">Dr. Amit Kumar Srivastava – Assistant Professor (SG), CSE, JUET, Guna</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-slate-700">Dr. Dhananjay R. Mishra – Associate Professor, MECH, JUET, Guna</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-slate-700">Er. Anshika Sharma – Software Developer</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-3 text-lg">Industry Partners (JPVL)</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-slate-700">Sh. Amit Jauhari (HQ), JPVL</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-slate-700">Sh. V. S. Yadav, VPHEP, JPVL</span>
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

