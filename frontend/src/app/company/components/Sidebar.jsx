'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaHome, FaBuilding, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState('');

  useEffect(() => {
    // Set active page based on the current route
    const page = pathname.split('/').pop();
    setActivePage(page);
  }, [pathname]);

  return (
    <div>
      <aside className="w-64 bg-blue-600 text-white flex flex-col h-full">
        <div className="p-8">
          <h2 className="text-2xl font-bold ">AspireSync</h2>
        </div>
        <nav className="flex-1">
          <ul className="px-6 py-4">
            <Link href="/company/profile" className="">
              <li
                className={`flex items-center gap-3 py-4 px-2 cursor-pointer rounded-md ${activePage === '' ? 'bg-blue-800' : ''
                  }`}
              >
                <FaHome /> Profile
              </li>
            </Link>
            <Link href="/company/company-form" className="">
              <li
                className={`flex items-center gap-3 py-4 px-2 cursor-pointer rounded-md ${activePage === 'company-form' ? 'bg-blue-800' : ''
                  }`}
              >
                <FaBuilding /> Register Company
              </li>
            </Link>
            <Link href="/company/interview-form">
              <li
                className={`flex items-center gap-3 py-4 px-2 cursor-pointer rounded-md ${activePage === 'interview-form' ? 'bg-blue-800' : ''
                  }`}
              >
                <FaUsers /> Add Interview
              </li>
            </Link>
            <Link href="/settings">
              <li
                className={`flex items-center gap-3 py-4 px-2 cursor-pointer rounded-md ${activePage === 'settings' ? 'bg-blue-800' : ''
                  }`}
              >
                <FaCog /> Settings
              </li>
            </Link>
            <li
              className="flex items-center gap-3 py-4 px-2 cursor-pointer rounded-md hover:bg-blue-800"
              onClick={() => alert('Logged Out!')}
            >
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        </nav>
      </aside>

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
    </div>
  );
};

export default Sidebar;
