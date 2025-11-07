"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Award, 
  Users, 
  BookOpen, 
  Lightbulb, 
  TrendingUp,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
              <Badge className="mb-6 bg-white/95 backdrop-blur-md text-black border border-white/20 px-6 py-2 shadow-lg shadow-white/10">
                About CIRD
              </Badge>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              About <span className="text-white">CIRD</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The Centre for Industrial Research and Development (CIRD) is an Industry–Academia interface 
              established at Jaypee University of Engineering and Technology (JUET), Guna.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="mt-8 p-6 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 shadow-lg shadow-black/20"
            >
              <p className="text-lg font-semibold text-white mb-2">
                MoU Signed Between JUs   and JPVL
              </p>
              <p className="text-gray-300">
                Technical Professional Consultancy Projects under the MoU
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Our <span className="text-white">Mission & Vision</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-white/10 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-white mr-3" />
                <h3 className="text-2xl font-bold text-white">Our Aim</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                CIRD aims to serve as an effective interface between academia and industry to foster, 
                promote, and sustain the commercialization of science and technology for mutual growth and societal benefit.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-white/10 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <Award className="w-8 h-8 text-white mr-3" />
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-gray-300 leading-relaxed italic">
                "To be a dynamic interface with industry, fostering innovation, research collaboration, 
                and sustainable commercialization of science and technology for mutual benefit."
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-8 border border-slate-600"
          >
            <p className="text-gray-300 leading-relaxed text-lg">
              Through this mission, CIRD facilitates knowledge transfer, nurtures innovation-driven entrepreneurship, 
              and establishes enduring linkages with industry, government agencies, and the community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coordination Committee */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Coordination <span className="text-white">Committee</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-white/10 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-white mr-3" />
                <h3 className="text-2xl font-bold text-white">Coordination Committee of CIRD</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-gray-300">Dr. Dhananjay R. Mishra (Coordinator & Incharge)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-gray-300">Dr. Pankaj Dumka (Member)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-gray-300">Dr. Gaurav Saxena (Member)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-gray-300">Dr. Amit Kumar Srivastava (Member)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-gray-300">Dr. Dharmendra Kumar Shukla (Member)</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-white/10 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <BookOpen className="w-8 h-8 text-white mr-3" />
                <h3 className="text-2xl font-bold text-white">Team Members of CDC</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-gray-300">Dr. Amit Kumar Srivastava</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-gray-300">Er. Anshika Sharma</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-gray-300">Er. Nitesh Pandey</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-gray-300">Er. Shashwat Shukla</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-8 border border-slate-600"
          >
            <div className="flex items-center mb-6">
                <Lightbulb className="w-8 h-8 text-white mr-3" />
              <h3 className="text-2xl font-bold text-white">Mechanical Testing Lab</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-gray-300">Dr. Dharmendra Kumar Shukla</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-gray-300">R.S. Chauhan</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-gray-300">K.K. Purohit</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-white mr-3" />
                  <span className="text-gray-300">Bhanu Pratap Arya</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brief About CIRD */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-8 border border-slate-600"
          >
            <h3 className="text-3xl font-bold text-white mb-6 text-center">Brief about CIRD</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              The Centre for Industrial Research and Development (CIRD) was established at Jaypee University of Engineering and Technology (JUET), Guna, as a dedicated platform to enhance the University's engagement with industry and to promote collaborative research and development. Conceived under the leadership of the University's management, CIRD was envisioned as a catalyst to bridge the gap between academic research and industrial applications. Since its inception, CIRD has evolved into a vital centre for consultancy projects, joint R&D programs, technology development, and innovation ecosystem enrichment, contributing significantly to the University's mission of societal and industrial advancement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
<section className="py-20 bg-slate-900">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-white">
              <Target className="mr-2 h-6 w-6" /> Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 leading-relaxed">
              To drive excellence in industrial research and development by
              fostering innovation, collaboration, and the pursuit of
              cutting-edge solutions that transform industries and empower
              communities.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-white">
              <Lightbulb className="mr-2 h-6 w-6" /> Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 leading-relaxed">
              To be a globally recognized center for pioneering industrial
              innovation and knowledge creation, bridging the gap between
              research and real-world implementation.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  </div>
</section>


      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-white">Impact</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Numbers that reflect our commitment to research excellence and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15+", label: "Research Projects" },
              { number: "5", label: "Patents Filed" },
              { number: "50+", label: "Publications" },
              { number: "3", label: "Research Centers" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Join Our Research Journey
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Be part of the future of industrial research and development. 
              Collaborate with us to create innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-white/95 backdrop-blur-md text-black hover:bg-white border border-white/20 px-8 py-4 text-lg font-semibold rounded-full shadow-xl shadow-white/20"
                >
                  Contact Us <ArrowRight className="ml-2" size={20} />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white/80 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg shadow-white/10"
                >
                  View Research
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
