"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Database, Radio, Monitor, Users, Waves, Gauge, Thermometer, Battery, Zap, Navigation, TrendingUp, Sun, Compass } from "lucide-react";
import Link from "next/link";

export default function BA07PPAPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - teal (Research theme) */}
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
              BA07/PP/A
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Early Warning System (EWS)
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-4xl leading-relaxed">
              Establish a hydrological early warning system for flood and weather monitoring across multiple hydro stations, enabling proactive disaster management.
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
            <Card className="bg-white border-[#c89666] shadow-xl shadow-blue-900/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                    <Target className="w-8 h-8 text-[#2d545e]" />
                  <CardTitle className="text-2xl text-[#2d545e]">Objective</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed">
                  This project establishes a comprehensive hydrological early warning system that collects and visualizes real-time river and rainfall data from multiple hydro stations. The system enables proactive monitoring and timely alerts for flood and weather-related events, supporting effective disaster management and public safety.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Technical Overview */}
      <section className="py-16 bg-gradient-to-b from-[#c89666] to-[#e1b382]">
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

          <div className="grid md:grid-cols-2 gap-8">
            {/* Data Collection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-white border-[#c89666] h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Radio className="w-8 h-8 text-[#2d545e]" />
                    <CardTitle className="text-xl text-[#2d545e]">Data Collection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    The system collects hydrological data from multiple monitoring stations using Geolux sensors:
                  </p>
                  <h4 className="text-[#2d545e] font-semibold mb-3 text-lg">Monitoring Stations:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                      <span className="text-gray-700">Mana Station</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                      <span className="text-gray-700">Vasudhara Station</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                      <span className="text-gray-700">Lambagad Khiro Station</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Transmission & Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-8 h-8 text-[#2d545e]" />
                    <CardTitle className="text-xl text-[#2d545e]">Data Transmission & Visualization</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Collected data is transmitted to CDC servers and visualized in the Hydrology product dashboard, providing:
                  </p>
                  <h4 className="text-[#2d545e] font-semibold mb-3 text-lg">Features:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Monitor className="w-5 h-5 text-[#2d545e] mr-3" />
                      <span className="text-gray-700">Real-time monitoring and visualization</span>
                    </div>
                    <div className="flex items-center">
                      <Monitor className="w-5 h-5 text-[#2d545e] mr-3" />
                      <span className="text-gray-700">Historical data analysis</span>
                    </div>
                    <div className="flex items-center">
                      <Monitor className="w-5 h-5 text-[#2d545e] mr-3" />
                      <span className="text-gray-700">Early warning alerts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hydrological Parameters */}
      <section className="py-16 bg-gradient-to-b from-[#c89666] to-[#e1b382]">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d545e] mb-6">
              Hydrological <span className="text-[#2d545e]">Parameters</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Waves className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Surface Velocity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Real-time surface water velocity measurements for flow analysis.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Avg Velocity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Average water velocity over time for comprehensive flow analysis.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Waves className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Discharge</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Water discharge rate measurements for flow volume analysis.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Gauge className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Water Level</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Real-time water level monitoring for flood prediction and management.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Radio className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Distance from Sensor</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Distance measurements from sensor to water surface for accurate monitoring.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Navigation className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Tilt</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Sensor tilt angle monitoring for equipment stability and accuracy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Compass className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Flow Direction</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Water flow direction monitoring for comprehensive hydrological analysis.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Thermometer className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Internal Temperature</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Internal sensor temperature monitoring for equipment health and calibration.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Charge Current</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Battery charging current monitoring for power management.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Observed Current</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Current consumption monitoring for system performance analysis.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Battery className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Battery Voltage</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Battery voltage monitoring for power system health and reliability.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Sun className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Solar Panel Tracking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Solar panel orientation and tracking for optimal energy generation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Team */}
      <section className="py-16 bg-gradient-to-b from-[#e1b382]/50 to-[#e1b382]/40">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white border-[#c89666] shadow-xl shadow-blue-900/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-[#2d545e]" />
                  <CardTitle className="text-2xl text-[#2d545e]">Project Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[#2d545e] font-semibold mb-3 text-lg">JUET Team</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                        <span className="text-gray-700">Dr. Amit Kumar Srivastava – Assistant Professor (SG), CSE, JUET, Guna</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                        <span className="text-gray-700">Dr. Dhananjay R. Mishra – Associate Professor, MECH, JUET, Guna</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                        <span className="text-gray-700">Er. Anshika Sharma – Software Developer</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[#2d545e] font-semibold mb-3 text-lg">Industry Partners (JPVL)</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                        <span className="text-gray-700">Sh. Amit Jauhari (HQ), JPVL</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#2d545e] rounded-full mr-3"></div>
                        <span className="text-gray-700">Sh. V. S. Yadav, VPHEP, JPVL</span>
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

