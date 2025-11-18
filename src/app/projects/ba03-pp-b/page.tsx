"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Cpu, Bot, Camera, Radio, Tablet, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function BA03PPBPage() {
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
                BA03/PP/B
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Monitoring & Control System for Coal Handling Plant (CHP)
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl leading-relaxed">
              Automate and monitor conveyor systems in coal handling plants using robotics and PLC control for enhanced efficiency and safety.
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
                  This project develops a comprehensive robotic and sensor-based control system for coal handling plants. It integrates real-time monitoring, anomaly detection, and PLC automation to optimize conveyor system operations, improve safety, and reduce maintenance costs.
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
            {/* Sensors */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-white border-blue-200 h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Radio className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-xl text-slate-900">Sensors</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">
                    Distance sensors are used for conveyor belt data collection, enabling real-time monitoring of belt position, alignment, and operational parameters.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Control System */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white border-blue-200 h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-xl text-slate-900">Control System</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">
                    LVDTs (Linear Variable Differential Transformers) are finalized for sway input. PLC logic is optimized for real-time master idler control, ensuring precise alignment and operation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Automation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="bg-white border-blue-200 h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-xl text-slate-900">Automation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">
                    Sway switches are analyzed for fault detection and master idler alignment, providing automated monitoring and corrective actions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white border-blue-200 h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Bot className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-xl text-slate-900">Innovation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">
                    A Tracked Robot is introduced for conveyor belt inspection and monitoring, enabling autonomous inspection capabilities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Robot Features */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-blue-950">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Tracked Robot <span className="text-white">Features</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Bot className="w-6 h-6 text-blue-600" />
                    <CardTitle className="text-lg text-slate-900">Tracked Wheel System</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 text-sm">
                    Designed for rough terrain stability, enabling reliable operation in challenging industrial environments.
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
                      <Camera className="w-6 h-6 text-white" />
                    <CardTitle className="text-lg text-slate-900">High-Resolution Camera</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 text-sm">
                    Provides visual inspection capabilities for detailed monitoring and documentation of conveyor belt conditions.
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
                    <Radio className="w-6 h-6 text-purple-400" />
                    <CardTitle className="text-lg text-slate-900">Advanced Sensors</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 text-sm">
                    Equipped with sensors for detecting heat, vibration, and obstructions, enabling comprehensive monitoring.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white border-blue-200 h-full shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                      <Tablet className="w-6 h-6 text-blue-600" />
                    <CardTitle className="text-lg text-slate-900">Wireless Communication</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 text-sm">
                    Features wireless communication and power management for extended operational autonomy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Control & Feedback */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Control & <span className="text-white">Feedback</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-white border-blue-200 shadow-xl shadow-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Remote Operation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">
                    The system supports remote operation via console or tablet, providing flexible control and monitoring capabilities from any location.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white border-blue-200 shadow-xl shadow-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Live Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">
                    Provides live video feed and anomaly alerts with historical data logging, enabling comprehensive monitoring and analysis of system performance.
                  </p>
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
                        <span className="text-slate-700">Dr. Dhananjay R. Mishra, Associate Professor, MECH, JUET, Guna</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-slate-700">Dr. Amit Kumar Srivastava, Assistant Professor (SG), CSE, JUET, Guna</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-3 text-lg">Industry Partners (JPVL)</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-slate-700">Shri Rakesh K. Singh, Nodal Officer, JBTPP, JPVL</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-slate-700">Shri Navin Tinguria, Nodal Officer, JNSTPP, JPVL</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-slate-700">Balachandran M., Nodal Officer, JPVL</span>
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

