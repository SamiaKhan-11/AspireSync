// pages/index.js
'use client'
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
    useEffect(() => {
        // Custom animations or effects can be added here
    }, []);

    return (
        <div className="flex flex-col items-center justify-center py-24 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-32 text-center">

            <motion.p
                className="text-2xl font-semibold mb-6"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                Welcome to your Future
            </motion.p>

            <motion.h1
                className="text-6xl font-bold mb-6"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                Off Campus Interview Portal
            </motion.h1>

            <motion.p
                className="text-xl mb-8 max-w-lg text-center"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                Discover and apply for off-campus interviews at top companies.
            </motion.p>

            <motion.button
                className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
            >
                Get Started
            </motion.button>

           
        </div>
    );
}
