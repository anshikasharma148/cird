"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Database, Radio, Monitor, Users } from "lucide-react";
import Link from "next/link";
import PageLoader from "@/components/page-loader";

export default function BA07PPAPage() {
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
                BA07/PP/A
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Early Warning System (EWS)
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl leading-relaxed">
              Establish a hydrological early warning system for flood and weather monitoring across multiple hydro stations, enabling proactive disaster management.
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
                  This project establishes a comprehensive hydrological early warning system that collects and visualizes real-time river and rainfall data from multiple hydro stations. The system enables proactive monitoring and timely alerts for flood and weather-related events, supporting effective disaster management and public safety.
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

          <div className="grid md:grid-cols-2 gap-8">
            {/* Data Collection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Radio className="w-8 h-8 text-white" />
                    <CardTitle className="text-xl text-white">Data Collection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    The system collects hydrological data from multiple monitoring stations using Geolux sensors:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                      <span className="text-slate-700">Mana Station</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                      <span className="text-slate-700">Vasudhara Station</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                      <span className="text-slate-700">Lambagad Khiro Station</span>
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
              <Card className="bg-white border-blue-200 h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-xl text-slate-900">Data Transmission & Visualization</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Collected data is transmitted to CDC servers and visualized in the Hydrology product dashboard, providing:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Monitor className="w-5 h-5 text-white mr-3" />
                      <span className="text-slate-700">Real-time monitoring and visualization</span>
                    </div>
                    <div className="flex items-center">
                      <Monitor className="w-5 h-5 text-white mr-3" />
                      <span className="text-slate-700">Historical data analysis</span>
                    </div>
                    <div className="flex items-center">
                      <Monitor className="w-5 h-5 text-white mr-3" />
                      <span className="text-slate-700">Early warning alerts</span>
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
    </>
  );
}

