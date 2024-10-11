'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';


export default function Home() {
  return (

    <div className="bg-white min-h-screen">
      <Navbar />


      {/* Hero Section */}



      <Header />

      {/* Feature Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 animate-fadeIn">Why Choose Us?</h2>
        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto animate-fadeIn delay-200">
          Discover the benefits of using Off Campus Interview to find job opportunities tailored for you.
        </p>
        <div className="flex flex-wrap justify-center mt-12 gap-8">
          {/* Feature 1 */}
          <div className="max-w-sm bg-gradient-to-br from-purple-500 to-blue-500 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out animate-fadeInUp delay-300">
            <div className="bg-purple-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Fast & Reliable</h3>
            <p className="text-white">Get the latest job updates with a smooth and responsive user experience.</p>
          </div>

          {/* Feature 2 */}
          <div className="max-w-sm bg-gradient-to-br from-gray-500 to-blue-400 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out animate-fadeInUp delay-400">
            <div className="bg-gray-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Wide Reach</h3>
            <p className="text-white">Find opportunities across multiple sectors and locations.</p>
          </div>

          {/* Feature 3 */}
          <div className="max-w-sm bg-gradient-to-br from-blue-500 to-purple-500 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out animate-fadeInUp delay-500">
            <div className="bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 20l-4-4h8l-4 4zM4 6l4-4h8l4 4M4 10v10h16V10"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">User-Friendly</h3>
            <p className="text-white">Designed for simplicity and ease of use, making it accessible for everyone.</p>
          </div>
        </div>
      </section>


      {/*Section 3 */}
      <section className="py-20 bg-gradient-to-tr from-blue-100 to-purple-100 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800">How It Works?</h2>
        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">Follow these simple steps to get started with your job search.</p>
        <div className="mt-12 flex flex-wrap justify-center gap-10">
          {/* Step 1 */}
          <div className="max-w-xs bg-gradient-to-br from-purple-400 to-blue-400 text-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-500">1</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Sign Up</h3>
            <p className="text-sm">Create an account to access thousands of job listings tailored to your skills.</p>
          </div>

          {/* Step 2 */}
          <div className="max-w-xs bg-gradient-to-br from-gray-400 to-blue-300 text-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-500">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Browse Jobs</h3>
            <p className="text-sm">Use our advanced filters to find jobs that match your profile and location.</p>
          </div>

          {/* Step 3 */}
          <div className="max-w-xs bg-gradient-to-br from-blue-400 to-purple-400 text-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-500">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Apply</h3>
            <p className="text-sm">Submit your application directly through our platform and track your progress.</p>
          </div>
        </div>
      </section>



      {/*Section 4 */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800">What Our Users Say</h2>
        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">Hear from our satisfied users who found their dream jobs through our platform.</p>

        <div className="mt-12 flex flex-wrap justify-center gap-10">
          {/* Testimonial 1 */}
          <div className="max-w-xs bg-white p-8 rounded-lg shadow-lg transform hover:shadow-2xl transition-shadow duration-500 ease-in-out">
            <p className="text-gray-600 italic mb-4">“I landed my dream job within weeks! The process was seamless and user-friendly.”</p>
            <h3 className="text-xl font-bold text-purple-500">Alex Johnson</h3>
            <p className="text-sm text-gray-500">Software Engineer</p>
          </div>

          {/* Testimonial 2 */}
          <div className="max-w-xs bg-white p-8 rounded-lg shadow-lg transform hover:shadow-2xl transition-shadow duration-500 ease-in-out">
            <p className="text-gray-600 italic mb-4">“The variety of job listings available was incredible. I felt supported throughout my job search.”</p>
            <h3 className="text-xl font-bold text-purple-500">Maria Gomez</h3>
            <p className="text-sm text-gray-500">Product Manager</p>
          </div>

          {/* Testimonial 3 */}
          <div className="max-w-xs bg-white p-8 rounded-lg shadow-lg transform hover:shadow-2xl transition-shadow duration-500 ease-in-out">
            <p className="text-gray-600 italic mb-4">“I appreciated the guidance provided. The resources helped me prepare effectively for interviews.”</p>
            <h3 className="text-xl font-bold text-purple-500">James Lee</h3>
            <p className="text-sm text-gray-500">Graphic Designer</p>
          </div>
        </div>
      </section>

      {/*Section 5 */}
      <section className="py-20 bg-purple-300 text-white text-center">
        <h2 className="text-4xl font-bold">Ready to Find Your Dream Job?</h2>
        <p className="mt-4 text-lg max-w-xl mx-auto">Join our community of successful job seekers and take the first step toward your future!</p>

        <div className="mt-8">
          <a
            href="/signup"
            className="inline-block bg-white text-purple-600 font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Sign Up Now
          </a>
        </div>

        <div className="mt-10 flex justify-center">
          <img
            src="/images/illustration.png"
            alt="Job Search Illustration"
            className="max-w-xs md:max-w-md"
          />
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-8 text-center">
        <p>&copy; 2024 Off Campus Interview. All rights reserved.</p>
      </footer>
    </div >

  );
}
