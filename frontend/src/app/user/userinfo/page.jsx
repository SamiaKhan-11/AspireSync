'use client'
import axios from 'axios';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const UserInfo = () => {

  const runOnce = useRef(false)
  const router = useRouter();
  const [imgUrl, setImgUrl] = useState('');
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');
  // const getid = console._id;

  const getUserData = async () => {
    const res = await axios.get('http://localhost:5000/user/get-detail', {
      headers: {
        'x-auth-token': token
      }
    });
    console.log(res.data);
    setUserData(res.data);
  };

  useEffect(() => {
    getUserData();
  }, []);




  const updateUser = async (data) => {
    axios.put(`http://localhost:5000/user/update`, data, {
      headers: {
        'x-auth-token': token
      }
    })
      .then((result) => {
        toast.success('User Information Updated');
        router.back();

      }).catch((err) => {
        console.log(err);
        toast.error('Unable to update the User Information');

      });
  }

  const submitForm = (values) => {
    console.log(values);
    updateUser(values);

  };

  const uploadToCloud = async (e) => {
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
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className="w-64 bg-white p-6 shadow-md"
      >
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
      <main className="flex-1 p-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">

          <h1 className="text-4xl font-extrabold text-center text-gray-800">
            Update Your Profile
          </h1>
          <p className="text-center text-lg text-gray-500">
            Get started by filling in your details. Showcase your skills, connect your profiles, and land your dream job!
          </p>
          <div className="">

            <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-inner shadow-black w-[90%] mx-auto">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Personal Information
              </h2>

              {
                userData !== null ? (
                  <Formik initialValues={userData} onSubmit={submitForm}>
                    {
                      (updateForm) => {
                        return (

                          <form className="space-y-4" onSubmit={updateForm.handleSubmit}>
                            <div className='grid grid-cols-2 gap-6'>

                              <div>
                                <label className="block text-sm font-medium">Profile Image</label>
                                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 text-center bg-white p-1 mt-1">
                                  <img
                                    src="/profileimage.jpg"
                                    className="h-28 w-28 rounded-full" />
                                  <p className="text-sm text-gray-600">Drop your logo file here to start the upload</p>
                                  <input
                                    type="file"
                                    id="profileImage"
                                    onChange={uploadToCloud}
                                    placeholder='Upload Logo'
                                    className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1 ml-20" />
                                </div>
                              </div>

                              <div className='space-y-10 mt-5'>

                                <div>
                                  <label className="block text-sm font-medium">Name</label>
                                  <input
                                    type="text"
                                    id="name"
                                    value={updateForm.values.name}
                                    onChange={updateForm.handleChange}
                                    className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter your full name"
                                    required
                                  />

                                  <label className="block text-sm font-medium">Email</label>
                                  <input
                                    type="email"
                                    id="email"
                                    value={updateForm.values.email}
                                    onChange={updateForm.handleChange}
                                    className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter your email address"
                                    required
                                  />
                                </div>

                                {/* <div>
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
                              </div> */}
                              </div>

                            </div>

                            <div>
                              <label className="block text-sm font-medium">Contact Number</label>
                              <input
                                type="text"
                                id="contactNumber"
                                value={updateForm.values.contactNumber}
                                onChange={updateForm.handleChange}
                                className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                pattern="\d{10}"
                                placeholder="Enter your 10-digit contact number"
                                required
                              />
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
                                id="resumeLink"
                                value={updateForm.values.resumeLink}
                                onChange={updateForm.handleChange}
                                className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter the link to your resume"
                                pattern="https?://.+"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium">Location</label>
                              <input
                                type="text"
                                id="location"
                                value={updateForm.values.location}
                                onChange={updateForm.handleChange}
                                className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your current location"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium">Skills</label>
                              <input
                                type="text"
                                id="skills"
                                value={updateForm.values.skills}
                                onChange={updateForm.handleChange}
                                className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your skills (comma-separated)"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium">Years of Experience</label>
                              <input
                                type="number"
                                id="experience"
                                value={updateForm.values.experience}
                                onChange={updateForm.handleChange}
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
                                id="bio"
                                value={updateForm.values.bio}
                                onChange={updateForm.handleChange}
                              ></textarea>
                            </div>

                            <div>
                              <label className="block text-sm font-medium">LinkedIn Profile</label>
                              <input
                                type="url"
                                id="linkedin"
                                value={updateForm.values.linkedin}
                                onChange={updateForm.handleChange}
                                className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter LinkedIn profile URL"
                                pattern="https?://.+"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium">GitHub Profile</label>
                              <input
                                type="url"
                                id="github"
                                value={updateForm.values.github}
                                onChange={updateForm.handleChange}
                                className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter GitHub profile URL"
                                pattern="https?://.+"
                              />
                            </div>

                            <div className="mt-6">
                              <button
                                type="submit"
                                disabled={updateForm.isSubmitting || !imgUrl}
                                className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
                              >
                                Create Profile
                              </button>
                            </div>
                          </form>

                        )
                      }
                    }
                  </Formik>



                ) : (<div>Loading....</div>)}


            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserInfo;
