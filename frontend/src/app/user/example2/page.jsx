"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserInfo = () => {


  const uploadToCloud = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData(); // Create FormData object to handle file upload
    fd.append('file', file);
    fd.append('upload_preset', 'myupload');
    fd.append('cloud_name', 'dz1qogay3');

    axios
      .post('https://api.cloudinary.com/v1_1/dz1qogay3/image/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        const { url } = response.data;
        setImgUrl(url); // Save the URL to imgUrl state
        // companyform.setFieldValue('logo', url); // Set logo field value
        updateCompany({ logo: url });
        toast.success('Image Uploaded Successfully');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Image Upload Failed');
      });
  };



  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center p-0">
      <div className="w-[100%] max-w-10xl bg-white rounded- shadow-2xl p-8 space-y-10 mt-3">
        <h1 className="text-4xl font-extrabold text-center text-gray-800">
          Create Your Profile
        </h1>
        <p className="text-center text-lg text-gray-500">
          Get started by filling in your details. Showcase your skills, connect your profiles, and land your dream job!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section - Personal Information */}
          <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-inner shadow-black">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Personal Information
            </h2>

        
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email address"
                  required
                />
              </div>



              <div>
                <label className="block text-sm font-medium">Contact Number</label>
                <input
                  type="tel"
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  pattern="\d{10}"
                  placeholder="Enter your 10-digit contact number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Profile Image</label>
                <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center bg-white">
                  <img
                    src="/profileimage.jpg"
                    className="h-28 w-28 rounded-full" />
                  <p className="text-sm text-gray-600">Drop your logo file here to start the upload</p>
                  <input
                    type="file"
                    id="logo"
                    onChange={uploadToCloud}
                    className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1 ml-20" />
                </div>
              </div>

          
              <div>
                <label className="block text-sm font-medium">Education</label>
                <select
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select your education level</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Resume Link</label>
                <input
                  type="url"
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter the link to your resume"
                  pattern="https?://.+"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your current location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Skills</label>
                <input
                  type="text"
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your skills (comma-separated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Years of Experience</label>
                <input
                  type="number"
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  min="0"
                  placeholder="Enter your experience in years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Bio</label>
                <textarea
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="3"
                  placeholder="Write a short bio about yourself (max 500 characters)"
                  maxLength="500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium">LinkedIn Profile</label>
                <input
                  type="url"
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter LinkedIn profile URL"
                  pattern="https?://.+"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">GitHub Profile</label>
                <input
                  type="url"
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter GitHub profile URL"
                  pattern="https?://.+"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
                >
                  Create Profile
                </button>
              </div>
            
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
