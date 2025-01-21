// pages/index.js
'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  // Array of image file names stored in the public folder
  const images = ['office.jpg', 'image.jpg', 'interview.jpg'];
 

  const features = [
    {
      title: "Comprehensive Company Profiles",
      description: "Detailed profiles for each company, including company information, interview formats, hiring processes, and tips to tailor your preparation for specific companies.",
      icon: "📊",
    },
    {
      title: "Progress Tracker",
      description: "A built-in feature to let users track their preparation journey, set reminders for key dates, and mark off completed tasks.",
      icon: "📈",
    },
    {
      title: "Job Alerts",
      description: "Stay updated with real-time job notifications tailored to your career interests.",
      icon: " 📢",
    },
    {
      title: "User-Friendly Interface",
      description: "A clean, intuitive design that makes it easy to navigate through different companies, interviews, and preparation resources.",
      icon: " 🖥️",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar />
        {/* Tagline and Main Heading */}
        <section className="max-w-5xl mx-auto px-6 pt-16 text-center mt-20">
          <motion.p
            className="text-[#1D3557] text-2xl font-semibold" // Navy blue for tagline text
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Partner in Career Growth
          </motion.p>

          <motion.h1
            className="text-5xl md:text-6xl font-bold leading-tight mt-4 text-[#1D3557]" // Navy blue for main heading
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover Opportunities <br /> That Move You Forward <br />
            <p className="text-2xl font-semibold mt-3">with AspireSync</p>
          </motion.h1>

          {/* Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            <motion.button
              className="bg-[#1D3557] text-white px-6 py-2 rounded-md font-medium shadow-lg hover:bg-[#12324F]" // Navy blue primary button with hover
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              Get started
            </motion.button>
            <motion.button
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md font-medium shadow-md hover:bg-gray-200" // Gray for secondary button with subtle hover
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              Learn more
            </motion.button>
          </div>
        </section>

        {/* Property Images Section */}
        <section className="max-w-5xl mx-auto mt-12 px-6 mb-5">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  delayChildren: 0.3,
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                className="relative"
                whileHover={{ scale: 1.02 }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Image
                  src={`/${img}`} // Automatically looks in the 'public' folder
                  alt={`Property ${index + 1}`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-[#F4A261]" // Gold shadow on hover
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* New Section with Content and Visual Effect */}
        <section className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto px-6 mt-16 py-12">
          {/* Content Side */}
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-4xl font-bold text-[#1D3557] mb-4">Your Path to Success</h2>
            <p className="text-gray-700 mb-6">
              AspireSync provides tools, resources, and guidance to help you ace your interviews and secure the job of your dreams.
              Whether you’re just starting or looking for a career change, we’re here to guide you every step of the way.
            </p>
            <motion.button
              className="bg-[#F4A261] text-white px-6 py-2 rounded-md font-medium shadow-lg hover:bg-[#E59551] transition"
              whileHover={{ scale: 1.05 }}
            >
              Learn More
            </motion.button>
          </div>

          {/* Visual Effect Side */}
          <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
            {/* Background Pattern */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1D3557] to-[#12324F] opacity-20 rounded-lg -z-10"></div>

            {/* Visual Effect using Pattern Circles */}
            <div className="flex flex-wrap justify-center items-center gap-6">
              <div className="w-32 h-32 bg-[#F4A261] rounded-full opacity-70 transform rotate-12"></div>
              <div className="w-24 h-24 bg-[#1D3557] rounded-full opacity-70 transform -rotate-6"></div>
              <div className="w-16 h-16 bg-[#F4A261] rounded-full opacity-60 transform rotate-6"></div>
              <div className="w-28 h-28 bg-[#1D3557] rounded-full opacity-80 transform -rotate-3"></div>
            </div>
          </div>
        </section>

        {/* New Section: Features or Benefits */}
        <section className="py-16 px-6 bg-gray-100">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1D3557] mb-4">Why Choose AspireSync?</h2>
            <p className="text-gray-700">
              AspireSync empowers you to build your future with confidence. Here’s how we make it easy to achieve your career goals.
            </p>
          </div>

          {/* Features Grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-8 bg-white shadow-xl rounded-lg hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl text-center font-semibold text-[#1D3557] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="bg-[#1D3557] text-white py-10 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

            {/* Logo and Tagline */}
            <div>
              <h2 className="text-2xl font-bold">AspireSync</h2>
              <p className="text-gray-300 mt-3">
                Your trusted partner for off-campus interviews and career success.
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">Companies</a></li>
                <li><a href="#" className="hover:text-white transition">Interviews</a></li>
                <li><a href="#" className="hover:text-white transition">Resources</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>

            {/* Social Media & Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex justify-center md:justify-start space-x-4 mb-4">
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <FaFacebookF />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <FaTwitter />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <FaInstagram />
                </a>
              </div>
              <p className="text-gray-300 text-sm">Email: support@aspiresync.com</p>
              <p className="text-gray-300 text-sm">Phone: +123-456-7890</p>
            </div>
          </div>

          {/* Bottom section with copyright */}
          <div className="mt-10 border-t border-gray-600 pt-5 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} AspireSync. All rights reserved.
          </div>
        </footer>


      </div>
    </>
  );
}
