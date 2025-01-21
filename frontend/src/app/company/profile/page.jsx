'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/company/Sidebar';
import axios from 'axios';

const ProfilePage = () => {

  const [companyData, setCompanyData] = useState([]);
  const token = localStorage.getItem('token');

const getCompanyData = async () => {
  const res = await axios.get('http://localhost:5000/company/get-detail', {
    headers:{
      'x-auth-token': token
    }
  }  );
  console.log(res.data);
  setCompanyData(res.data);
};

useEffect(() => {
  getCompanyData();
}, []);






  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Profile Section */}

      {
        companyData && (
          <main className="flex-1 p-10">
          {/* Profile Header */}
          <div className="bg-white rounded-md shadow-md p-8 grid grid-cols-2 items-center space-x-6 space-y-5">
           <div className='flex items-center gap-10'>
           <img
              src={companyData.logo}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{companyData.companyName}</h1>
              <p className="text-gray-500"> {companyData.industry}  </p>

              <button className='border border-[#1D3357] p-2 rounded-lg'>
                <h1>Contact Us</h1>
              </button>
              <button className='border border-[#1D3357] p-2 rounded-lg ml-4'>
                <h1>View Website</h1>
              </button>
            </div>
           </div>
            <div className='items-center flex gap-10'>
            <div className='w-1 h-24 bg-black'></div>
            <div>
            <p className="text-gray-500"> {companyData.companyLocation}  </p>
            <p className="text-gray-500"> {companyData.companyLocation}  </p>
            <p className="text-gray-500"> {companyData.companyLocation}  </p>
            <p className="text-gray-500"> {companyData.companyLocation}  </p>
            </div>
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

        )
      }
    
    </div>
  );
};

export default ProfilePage;
