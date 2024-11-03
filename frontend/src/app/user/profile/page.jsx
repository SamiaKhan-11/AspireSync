'use client';
import React, { useState } from 'react';

const UserProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white p-6 shadow-md transform transition-transform duration-500 ease-in-out z-20 mt-20 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } w-64 lg:w-64`}
      >
        <h2 className="text-2xl font-bold mb-8">User Profile</h2>
        <nav>
          <ul className="space-y-6">
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center">
                <span className="mr-3">🏠</span> Profile
              </a>
            </li>
            <li>
              <a href="/user/userinfo" className="text-gray-600 hover:text-blue-600 flex items-center">
                <span className="mr-3">📁</span> Add info
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center">
                <span className="mr-3">⚙️</span> Settings
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center">
                <span className="mr-3">💬</span> Messages
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Toggle Button */}
      <button
        className="p-2 absolute top-4 left-4 z-30 bg-white shadow-md text-black rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      ><svg name='first' xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-baseline-density-medium">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 20h16" />
          <path d="M4 12h16" />
          <path d="M4 4h16" />
        </svg>
        {isSidebarOpen ? '' : ''}
      </button>

      {/* Main Content */}
      <main
        className={`flex-1 p-6 transform transition-transform duration-500 ease-in-out ${isSidebarOpen ? 'sm:ml-64' : ' lg:ml-0 lg:ml-64'
          }`}
      >
        {/* Profile Header */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col lg:flex-row lg:items-center lg:space-x-6">
          <img
            src="/profileimage1.jpg"
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 lg:mb-0"
          />
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-gray-800">John Doe</h1>
            <p className="text-gray-500 mt-2">Full Stack Developer based in New York</p>
            <p className="text-sm text-gray-400 mt-1">
              Expertise in building scalable web applications and designing user-friendly experiences.
            </p>
            <div className="mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md mr-4">Edit Profile</button>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">View Portfolio</button>
            </div>
          </div>
        </div>

        {/* Additional Sections (About Me, Recent Activity, Skills) */}
        {/* About Me Section */}
        <section className="mt-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">About Me</h2>
            <p className="text-gray-600 mt-4">
              I am a passionate Full Stack Developer with 5+ years of experience in web and software development.
              I specialize in JavaScript frameworks like React and Node.js, and have a deep understanding of user
              interface design and functionality.
            </p>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="mt-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Recent Activity</h2>
            <div className="mt-4 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-blue-600">Project: Portfolio Website</h3>
                <p className="text-gray-500">Updated 2 hours ago</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-blue-600">Project: E-commerce App</h3>
                <p className="text-gray-500">Completed on Oct 10, 2024</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-blue-600">Workshop: Full Stack Development</h3>
                <p className="text-gray-500">Attended on Oct 5, 2024</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mt-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-4">
              <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">JavaScript</span>
              <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">React</span>
              <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Node.js</span>
              <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">MongoDB</span>
              <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Tailwind CSS</span>
              <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">REST APIs</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserProfilePage;
