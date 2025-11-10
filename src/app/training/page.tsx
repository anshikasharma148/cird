"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  Award, 
  Building2, 
  Brain, 
  Bot, 
  Code, 
  Cog,
  GraduationCap,
  Image as ImageIcon,
  Video,
  ArrowRight,
  Sparkles,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import PageLoader from "@/components/page-loader";

// Image Slider Component
function ImageSlider({ 
  images, 
  title 
}: { 
  images: Array<{ name: string; image: string; type?: 'image' | 'video' }>; 
  title: string 
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-slide functionality - pause if video is playing
  useEffect(() => {
    if (isPaused || images.length === 0 || isVideoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, images.length, isVideoPlaying]);

  // Reset video playing state when slide changes
  useEffect(() => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setIsPaused(true);
    setCurrentSlide((prev) => {
      const next = (prev + 1) % images.length;
      setTimeout(() => setIsPaused(false), 6000); // Resume auto-play after manual navigation
      return next;
    });
  };

  const prevSlide = () => {
    setIsPaused(true);
    setCurrentSlide((prev) => {
      const next = (prev - 1 + images.length) % images.length;
      setTimeout(() => setIsPaused(false), 6000); // Resume auto-play after manual navigation
      return next;
    });
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setIsPaused(true);
    setCurrentSlide(index);
    setTimeout(() => setIsPaused(false), 6000); // Resume auto-play after manual navigation
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  if (images.length === 0) {
    return (
      <div className="bg-white border-blue-200 rounded-xl p-8 shadow-xl shadow-blue-900/20">
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <p className="text-slate-600">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-blue-200 rounded-xl p-8 shadow-xl shadow-blue-900/20">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <ImageIcon className="w-6 h-6 text-blue-600" />
        {title}
      </h3>
      
      {/* Image Slider */}
      <div className="relative max-w-6xl mx-auto">
        <div className="relative aspect-video bg-slate-100 rounded-xl overflow-hidden border border-blue-200 shadow-2xl">
          {/* Slider Container */}
          <div className="relative w-full h-full">
            {images.map((item, index) => (
              <motion.div
                key={`slide-${index}-${item.name}`}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, x: index === 0 ? 0 : '100%' }}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  x: index === currentSlide ? 0 : index < currentSlide ? '-100%' : '100%'
                }}
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.8
                }}
                style={{
                  zIndex: index === currentSlide ? 10 : 0
                }}
              >
                {item.type === 'video' ? (
                  <div className="relative w-full h-full bg-black">
                    {index === currentSlide ? (
                      <video
                        ref={videoRef}
                        src={item.image}
                        className="w-full h-full object-contain"
                        controls
                        onPlay={() => {
                          setIsVideoPlaying(true);
                        }}
                        onPause={() => {
                          setIsVideoPlaying(false);
                        }}
                        onEnded={() => {
                          setIsVideoPlaying(false);
                          // Auto-advance to next slide after video ends
                          setTimeout(() => {
                            setCurrentSlide((prev) => (prev + 1) % images.length);
                          }, 1000);
                        }}
                        onError={() => handleImageError(index)}
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <video
                        src={item.image}
                        className="w-full h-full object-contain"
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                ) : !imageErrors[index] ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    {...(index === 0 
                      ? { priority: true }
                      : { loading: index === currentSlide ? "eager" : "lazy" }
                    )}
                    onError={() => {
                      console.log(`Error loading image ${index}: ${item.image}`);
                      handleImageError(index);
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100">
                    <div className="text-center">
                      <ImageIcon className="w-20 h-20 text-blue-400 mx-auto mb-4" />
                      <p className="text-slate-900 text-lg">{item.name}</p>
                      <p className="text-slate-600 text-sm mt-2">Image coming soon</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Image Name Overlay - Hide for videos to avoid interference with controls */}
          {images[currentSlide]?.type !== 'video' && (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10 pointer-events-none"
            >
              <h4 className="text-2xl font-bold text-white">{images[currentSlide].name}</h4>
            </motion.div>
          )}
          
          {/* Video Name Overlay - Show above video, less intrusive */}
          {images[currentSlide]?.type === 'video' && (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-10 pointer-events-none"
            >
              <h4 className="text-xl font-bold text-white">{images[currentSlide].name}</h4>
            </motion.div>
          )}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-600/90 backdrop-blur-md text-white hover:bg-blue-700 transition-all flex items-center justify-center z-20 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-600/90 backdrop-blur-md text-white hover:bg-blue-700 transition-all flex items-center justify-center z-20 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-blue-600 w-8"
                  : "bg-blue-300 hover:bg-blue-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TrainingPage() {
  // Helper function to get image paths
  const getImagePath = (folder: string, index: number, extension: string = 'jpg') => {
    return `/assets/training/${folder}/img${index}.${extension}`;
  };

  const getVideoPath = (folder: string, index: number) => {
    return `/assets/training/${folder}/vid${index}.mp4`;
  };

  // Generate image arrays for sliders
  // AI Srijan: 6 images (img1.jpg to img6.jpg)
  const srijanImages = Array.from({ length: 6 }, (_, i) => ({
    name: "AI Srijan",
    image: getImagePath('srijan', i + 1),
    type: 'image' as const
  }));

  // JNSTPP: 15 images (img1.jpg to img15.jpg) + 3 videos (vid1.mp4 to vid3.mp4)
  const jnstppImages = [
    ...Array.from({ length: 15 }, (_, i) => ({
      name: "Power Plant Visit",
      image: getImagePath('jnstpp', i + 1),
      type: 'image' as const
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
      name: "Power Plant Visit",
      image: getVideoPath('jnstpp', i + 1),
      type: 'video' as const
    }))
  ];

  // Closing Ceremony: 10 images (img1.jpg to img10.jpg)
  const closingImages = Array.from({ length: 10 }, (_, i) => ({
    name: "Closing Ceremony",
    image: getImagePath('closing', i + 1),
    type: 'image' as const
  }));

  const trainingTracks = [
    {
      title: "Artificial Intelligence & Machine Learning",
      icon: Brain,
      description: "Hands-on experience with cutting-edge AI/ML technologies and frameworks"
    },
    {
      title: "Robotics",
      icon: Bot,
      description: "Practical robotics development and automation systems"
    },
    {
      title: "Software Development",
      icon: Code,
      description: "Modern software engineering practices and development methodologies"
    },
    {
      title: "Industrial Automation",
      icon: Cog,
      description: "PLC control systems and industrial automation solutions"
    }
  ];

  const industryPartners = [
    "Intel Corporation",
    "EDGATE TECHNOLOGIES PRIVATE LIMITED",
    "Jaiprakash Power Ventures Ltd",
    "CrestoTechnisis Private Limited"
  ];

  return (
    <>
      <PageLoader pageType="training" />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950">
      {/* Hero Section - Image Only */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src="/assets/training/sit2025.jpeg"
          alt="Summer Industrial Training 2025"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          loading="eager"
        />
      </section>

      {/* Hero Content Section - Below Image */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge className="mb-6 bg-blue-600 text-white border border-blue-500 px-6 py-2 text-sm font-medium shadow-lg shadow-blue-900/30">
                Summer Industrial Training 2025
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Empowering the <span className="text-white">Innovators</span> of Tomorrow
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              A structured, interdisciplinary training initiative focused on emerging and high-impact technological domains.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-gray-200">
              <div className="flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-400/30 text-white">
                <Calendar className="w-5 h-5" />
                <span>2nd June - 15th July 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-400/30 text-white">
                <Users className="w-5 h-5" />
                <span>45 Days Intensive Program</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white border-blue-200 rounded-xl p-8 shadow-xl shadow-blue-900/20 mb-12"
          >
            <p className="text-lg text-slate-700 leading-relaxed text-center max-w-4xl mx-auto">
              The Control Development Centre (CDC), operating under the Centre for Industrial Research and Development (CIRD) at Jaypee University of Engineering and Technology, Guna (M.P.), is proud to lead the Summer Industrial Training 2025 — a structured, interdisciplinary training initiative focused on emerging and high-impact technological domains.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed text-center max-w-4xl mx-auto mt-6">
              This initiative underscores a strong commitment to bridging academic potential with industrial proficiency, fostering the development of domain expertise through experiential learning, system-level understanding, and practical implementation.
            </p>
          </motion.div>

          {/* Industry Partners */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Industry Collaborations</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {industryPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white border-blue-200 px-6 py-3 rounded-lg hover:border-blue-400 transition-all shadow-md"
                >
                  <span className="text-slate-900 font-medium">{partner}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Training Tracks */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Core <span className="text-white">Training Tracks</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive training across four key technological domains
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainingTracks.map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white border-blue-200 hover:border-blue-400 transition-all duration-300 h-full shadow-lg hover:shadow-xl">
                  <CardHeader>
                    <div className="p-4 rounded-xl bg-blue-600 mb-4 w-fit">
                      <track.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900 mb-2">
                      {track.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-700">
                      {track.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Srijan FDP Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-blue-600 text-white border border-blue-500 px-6 py-2 shadow-lg shadow-blue-900/30">
                AI Srijan - Faculty Development Programme
              </Badge>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Advancing AI Excellence through <span className="text-white">Industry-Academia Collaboration</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              A one-week Faculty Development Programme on Artificial Intelligence, Machine Learning, and Deep Learning under the prestigious Intel® Unnati Program
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            className="bg-white border-blue-200 rounded-xl p-8 shadow-xl shadow-blue-900/20"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Program Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-900 font-semibold">Date</p>
                  <p className="text-slate-700">7th – 11th July 2025</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-900 font-semibold">Venue</p>
                  <p className="text-slate-700">Control Development Center (CDC), CIRD, JUET Guna</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-900 font-semibold">In Association With</p>
                  <p className="text-slate-700">Intel Corporation® | EDGATE TECHNOLOGIES PRIVATE LIMITED</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white border-blue-200 rounded-xl p-8 shadow-xl shadow-blue-900/20"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Program Highlights</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Hands-on sessions in Machine Learning and Deep Learning</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Exposure to Intel's Unnati AI Lab tools and curriculum</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Real-world problem-solving and model deployment strategies</p>
              </div>
            </div>
          </motion.div>
          </div>

          {/* Image Slider for AI Srijan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ImageSlider images={srijanImages} title="AI Srijan Gallery" />
          </motion.div>
        </div>
      </section>

      {/* Power Plant Visit Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-blue-600 text-white border border-blue-500 px-6 py-2 shadow-lg shadow-blue-900/30">
                Industrial Visit
              </Badge>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Visit to <span className="text-white">Jaypee Nigrie Super Thermal Power Plant</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              A comprehensive one-week industrial visit to understand the operations and technologies of a super thermal power plant
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white border-blue-200 rounded-xl p-8 shadow-xl shadow-blue-900/20 mb-8"
          >
            <div className="flex items-start gap-3 mb-6">
              <Building2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Jaypee Nigrie Super Thermal Power Plant</h3>
                <p className="text-slate-600">Nigrie, Madhya Pradesh</p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed">
              All trainees participated in a one-week industrial visit to the Jaypee Nigrie Super Thermal Power Plant, gaining extensive knowledge about how a super thermal power plant operates, including its various systems, processes, and technologies. This hands-on experience provided invaluable insights into real-world industrial operations and power generation.
            </p>
          </motion.div>

          {/* Image Slider for JNSTPP Visit - Images & Videos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ImageSlider images={jnstppImages} title="Visit Gallery - Images & Videos" />
          </motion.div>
        </div>
      </section>

      {/* Closing Ceremony Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-blue-600 text-white border border-blue-500 px-6 py-2 shadow-lg shadow-blue-900/30">
                Closing Ceremony
              </Badge>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Closing Ceremony of <span className="text-white">SIT-2025</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              A Celebration of Learning and Collaboration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            className="bg-white border-blue-200 rounded-xl p-8 shadow-xl shadow-blue-900/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-slate-900">Recognition & Appreciation</h3>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              We were honored to present Mementoes to our distinguished guests, programme organisers, co-organisers, and esteemed resource persons as a token of our appreciation for their invaluable contributions.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Certificates of Participation were presented to all the interns for their dedication, hard work, and active engagement throughout the program.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white border-blue-200 rounded-xl p-8 shadow-xl shadow-blue-900/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-slate-900">Program Leadership</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-slate-900 font-semibold mb-1">Program Organiser</p>
                <p className="text-slate-700">Dr. Dhananjay R. Mishra</p>
              </div>
              <div>
                <p className="text-slate-900 font-semibold mb-1">Co-Organiser</p>
                <p className="text-slate-700">Dr. Amit Kumar Srivastava</p>
              </div>
              <div className="pt-3 border-t border-blue-200">
                <p className="text-slate-900 font-semibold mb-1">Hon'ble Vice Chancellor</p>
                <p className="text-slate-700">Prof. D K Rai, JUET Guna</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white border-blue-200 rounded-xl p-8 shadow-xl shadow-blue-900/20 text-center"
        >
          <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto mb-4">
            A heartfelt thank you to our mentors, whose continuous guidance shaped the learning journey of every participant, and to the program organisers for their tireless efforts in making SIT-2025 a memorable and impactful experience.
          </p>
          <p className="text-lg text-slate-900 font-semibold leading-relaxed max-w-3xl mx-auto">
            SIT-2025 was not just about skill development—it was about curiosity, teamwork, and the drive to innovate. As we close this chapter, we look forward to seeing our participants carry this learning spirit into their future endeavors.
          </p>
        </motion.div>

          {/* Closing Ceremony Gallery Slider */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8"
          >
            <ImageSlider images={closingImages} title="Closing Ceremony Gallery" />
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
