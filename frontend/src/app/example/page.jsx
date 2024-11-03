// pages/index.js
'use client'
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  // Array of image file names stored in the public folder
  const images = ['office.jpg', 'image.jpg', 'interview.jpg'];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Tagline and Main Heading */}
      <section className="max-w-5xl mx-auto px-6 pt-16 text-center">
        <motion.p
          className="text-blue-500 font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          TAGLINE
        </motion.p>
        
        <motion.h1
          className="text-5xl md:text-6xl font-bold leading-tight mt-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Discover properties <br /> that move you
        </motion.h1>

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <motion.button
            className="bg-black text-white px-6 py-2 rounded-md font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            Get started
          </motion.button>
          <motion.button
            className="bg-gray-100 text-black px-6 py-2 rounded-md font-medium"
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
                className="w-full h-full object-cover  rounded-lg shadow-md shadow-black"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
