'use client'
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '@/app/company/components/Sidebar';

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
      logo: ''
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      // Add logo URL to form data
      const formData = { ...values, logo: imgUrl };

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


  // const uploadToCloud = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const fd = new FormData(); // Create FormData object to handle file upload
  //   fd.append('file', file);
  //   fd.append('upload_preset', 'myupload');
  //   fd.append('cloud_name', 'dz1qogay3');

  //   axios
  //     .post('https://api.cloudinary.com/v1_1/dz1qogay3/image/upload', fd, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     })
  //     .then((response) => {
  //       const { url } = response.data;
  //       setImgUrl(url); // Save the URL to imgUrl state
  //       Interviewform.setFieldValue('logo', url); // Set logo field value
  //       toast.success('Image Uploaded Successfully');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error('Image Upload Failed');
  //     });
  // };

  if (!isClient) {
    // Avoid rendering anything on the server side to prevent hydration error
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Form Section */}
      <div className="bg-gray-100 flex-1 p-3"> {/* Added ml-64 to add margin-left for the form section */}

        <h1 className='font-bold text-2xl p-5 m-3 bg-white rounded-md text-center'>Add Interview Details</h1>

        <form onSubmit={Interviewform.handleSubmit} className='' >

          <div className="bg-white m-3 rounded-md">
            {/* Right Section - Form */}
            <div className="p-8 col-span-2">

              <div className="space-y-8">
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    value={Interviewform.values.company}
                    onChange={Interviewform.handleChange}
                    className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter company name"
                    required
                  />
                </div> */}

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

                {/* <div className="py-4">
                  <label className="block text-sm font-medium text-gray-700 mb-4">Company Logo</label>
                  <div className="flex h-32 w-full items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center bg-white">
                    <p className="text-sm text-gray-600">Drop your logo file here to start the upload</p>
                    <input
                      type="file"
                      id="logo"
                      onChange={uploadToCloud}
                      className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1" />
                  </div>
                </div> */}

                <button
                  type="submit"
                  // disabled={Interviewform.isSubmitting || !imgUrl}
                  disabled={Interviewform.isSubmitting}
                  className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>

  )
};

export default AddInterviewInfo;
