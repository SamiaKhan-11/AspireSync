'use client'
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '@/app/company/Sidebar';

const AddInterviewInfo = () => {
  const router = useRouter();
  const [imgUrl, setImgUrl] = useState('');
  const [isClient, setIsClient] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // This will run only on the client, preventing server-client mismatch
    setIsClient(true);
  }, []);

  const Interviewform = useFormik({
    initialValues: {

      jobTitle: '',
      jobType: '',
      experience: '',
      skillsRequired: '',
      location: '',
      interviewDate: '',
      endDate: '',
      // logo: ''
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      // Add logo URL to form data
      const formData = { ...values };   //, logo: imgUrl

      axios.post('http://localhost:5000/interview/add', formData, {
        headers: {
          'x-auth-token': token
        }
      })
        .then((response) => {
          console.log(response.status);
          toast.success('Interview Information Added');
          resetForm();
          setSubmitting(false);
          router.push('/interviewlisting');  // Navigate to the listing page after successful submission
        })
        .catch((err) => {
          console.log(err);
          toast.error('Unable to add the Information');
          setSubmitting(false);
        });
    },
  });

  if (!isClient) {
    // Avoid rendering anything on the server side to prevent hydration error
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Form Section */}
      <div className="bg-[#1D3557] flex-1 p-5"> {/* Added ml-64 to add margin-left for the form section */}

        <div className='bg-white rounded-lg shadow-md space-y-6 p-1'>
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mt-4">
            Add Interview Information
          </h1>
          <p className="text-center text-lg text-gray-500">
            Get started by filling in your details. Showcase your skills, connect your profiles, and land your dream job!
          </p>


          <form onSubmit={Interviewform.handleSubmit} className='' >

            <div className="m-3">
              <div className="p-8 col-span-2">
                <div className="space-y-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Company Website</label>
                    <input
                      type="text"
                      id="website"
                      value={Interviewform.values.website}
                      onChange={Interviewform.handleChange}
                      className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter contact email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Link to Apply</label>
                    <input
                      type="text"
                      id="linkToApply"
                      value={Interviewform.values.linkToApply}
                      onChange={Interviewform.handleChange}
                      className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter contact email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">job Title</label>
                    <input
                      type="text"
                      id="jobTitle"
                      value={Interviewform.values.jobTitle}
                      onChange={Interviewform.handleChange}
                      className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter contact email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">job Type</label>
                    <select
                      type="text"
                      id="jobType"
                      value={Interviewform.values.jobType}
                      onChange={Interviewform.handleChange}
                      className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter a secure password">
                      <option value="select" >Select job type</option>
                      <option value="Full time" >Full time</option>
                      <option value="Part time" >Part time</option>
                      <option value="Internship" >Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                    <select
                      type="text"
                      id="experience"
                      value={Interviewform.values.experience}
                      onChange={Interviewform.handleChange}
                      className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter industry type"  >
                      <option value="select" >Select Option</option>
                      <option value="Fresher" >Fresher</option>
                      <option value="Middle-level" >Middle-level</option>
                      <option value="Senior" >Senior</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      id="location"
                      value={Interviewform.values.location}
                      onChange={Interviewform.handleChange}
                      className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter company location"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">SkillsRequired</label>
                    <input
                      type="text"
                      id="skillsRequired"
                      value={Interviewform.values.skillsRequired}
                      onChange={Interviewform.handleChange}
                      className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter company website"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">InterviewDate</label>
                    <input
                      type="date"
                      id="interviewDate"
                      value={Interviewform.values.interviewDate}
                      onChange={Interviewform.handleChange}
                      className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter company website"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Deadline</label>
                    <input
                      type="date"
                      id="endDate"
                      value={Interviewform.values.endDate}
                      onChange={Interviewform.handleChange}
                      className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter company website"
                    />
                  </div>
                  <button
                    type="submit"
                    // disabled={Interviewform.isSubmitting || !imgUrl}
                    disabled={Interviewform.isSubmitting}
                    className="w-full py-3 bg-[#1D3557] text-white font-bold rounded-md hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default AddInterviewInfo;
