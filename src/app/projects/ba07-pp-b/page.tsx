"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Cloud, Thermometer, Droplets, Wind, Gauge, Users, Sun, Compass, Snowflake, Weight, Navigation } from "lucide-react";
import Link from "next/link";

export default function BA07PPBPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e1b382]/50 to-[#e1b382]/40">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#2d545e] via-[#12343b] to-[#2d545e] relative overflow-hidden">
        <div className="container mx-auto px-8 md:px-16 relative z-10">
          <Link href="/research">
            <Button variant="ghost" className="mb-6 text-white hover:text-white/90">
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
              <Badge className="mb-4 bg-[#e1b382] text-[#2d545e] border border-[#c89666] px-6 py-2 shadow-lg shadow-blue-900/30">
                BA07/PP/B
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Automatic Weather Station (AWS)
            </h1>
            <p className="text-xl text-white/90 max-w-4xl leading-relaxed">
              Automate weather data collection and visualization for hydro stations, providing real-time meteorological monitoring and analysis.
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
                  This project automates weather data collection and visualization for hydro stations using automatic weather sensors. The system is integrated into CIRD's Hydrology platform, providing real-time meteorological monitoring and analysis capabilities for enhanced operational decision-making.
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

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Data Collection Stations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Cloud className="w-8 h-8 text-[#2d545e]" />
                    <CardTitle className="text-xl text-[#2d545e]">Monitoring Stations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    The system fetches real-time meteorological data from multiple hydro stations:
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
                      <span className="text-gray-700">Barrage Station</span>
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
              <Card className="bg-white border-[#c89666] h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Cloud className="w-8 h-8 text-[#2d545e]" />
                    <CardTitle className="text-xl text-[#2d545e]">System Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Weather sensors are integrated into CDC's Hydrology system, enabling seamless visualization and monitoring of meteorological data alongside hydrological information for comprehensive environmental monitoring.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meteorological Parameters */}
      <section className="py-16 bg-gradient-to-b from-[#c89666] to-[#e1b382]">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d545e] mb-6">
              Meteorological <span className="text-[#2d545e]">Parameters</span>
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
                      <Thermometer className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Temperature</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Real-time ambient temperature monitoring for accurate environmental assessment.
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
                      <Gauge className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Pressure</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Barometric pressure measurements for weather pattern analysis.
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
                      <Droplets className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Humidity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Atmospheric humidity levels for comprehensive weather analysis.
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
                      <Wind className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Wind Speed</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Wind velocity measurements for comprehensive meteorological analysis.
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
                      <Compass className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Wind Direction</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Wind direction monitoring for comprehensive wind pattern analysis.
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
                      <Sun className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Solar Radiation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Real-time solar radiation measurements for energy and climate analysis.
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
                      <Sun className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Avg Radiation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Average solar radiation over time for trend analysis and forecasting.
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
                      <Droplets className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Precipitation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Total precipitation monitoring for water resource and flood management.
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
                      <Droplets className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Rain</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Rainfall intensity and accumulation measurements for weather monitoring.
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
                      <Snowflake className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Snow</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Snowfall measurements for winter weather monitoring and analysis.
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
                      <Weight className="w-6 h-6 text-[#2d545e]" />
                    <CardTitle className="text-lg text-[#2d545e]">Bucket Weight</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Precipitation bucket weight monitoring for accurate rainfall measurement.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Team */}
      <section className="py-16 bg-gradient-to-b from-[#c89666] to-[#e1b382]">
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

