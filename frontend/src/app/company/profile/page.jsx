import Link from 'next/link';
import React from 'react';

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-8">Profile</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/company/profile" className="text-gray-600 hover:text-purple-600 flex items-center">
                <span className="mr-3">🏠</span> Home
              </Link>
            </li>
            <li>
              <Link href="/company/company-form" className="text-gray-600 hover:text-purple-600 flex items-center">
                <span className="mr-3">📊</span>Add Info
              </Link>
            </li>
            <li>
              <Link href="/company/interview-form" className="text-gray-600 hover:text-purple-600 flex items-center">
                <span className="mr-3">🗂</span> Add Interview
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-purple-600 flex items-center">
                <span className="mr-3">📋</span> Tasks
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-purple-600 flex items-center">
                <span className="mr-3">📈</span> Reporting
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-purple-600 flex items-center">
                <span className="mr-3">🎨</span> Designers
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-10">
          <h3 className="text-gray-500 uppercase tracking-wider text-sm">Support</h3>
          <ul className="space-y-4 mt-4">
            <li>
              <a href="#" className="text-gray-600 hover:text-purple-600 flex items-center">
                <span className="mr-3">⚙️</span> Settings
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-purple-600 flex items-center">
                <span className="mr-3">💬</span> Support
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Profile Section */}
      <main className="flex-1 p-10">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-6">
          <img
            src="/profileimg.png"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800"></h1>
            <p className="text-gray-500">Product Designer based in Melbourne</p>
            <p className="text-sm text-gray-400 mt-1">Specialized in UX/UI design, brand strategy, and workflow development.</p>
          </div>
        </div>

        {/* Experience and About Me */}
        <section className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800">Experience</h2>

            {/* Experience Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-purple-600 text-lg font-semibold">Lead Product Designer</h3>
                <p className="text-gray-500">Layers</p>
                <p className="text-gray-400 text-sm">May 2020 - Present</p>
                <a href="#" className="text-blue-500 mt-2 block">View project</a>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-purple-600 text-lg font-semibold">Product Designer</h3>
                <p className="text-gray-500">Startup</p>
                <p className="text-gray-400 text-sm">Jan 2019 - May 2020</p>
                <a href="#" className="text-blue-500 mt-2 block">View project</a>
              </div>
            </div>
          </div>
        </section>

        {/* About Me */}
        <section className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
            <p className="text-gray-600 mt-4">
              I'm a Product Designer based in Melbourne, Australia. I specialize in UX/UI design, brand strategy, and workflow development.
              I'm passionate about helping startups grow, improve their customer experience, and raise venture capital through good design.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
