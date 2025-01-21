'use client'
import axios from 'axios';
import { Formik, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '@/app/company/Sidebar';


const CompanyForm = () => {
  const router = useRouter();
  const [imgUrl, setImgUrl] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [companyData, setCompanyData] = useState(null)
  const token = localStorage.getItem('token');


  const getCompanyData = async () => {
    const res = await axios.get('http://localhost:5000/company/get-detail', {
      headers: {
        'x-auth-token': token
      }
    });
    console.log(res.data);
    setCompanyData(res.data);
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  const updateCompany = async (data) => {
    axios.put(`http://localhost:5000/company/update`, data, {
      headers: {
        'x-auth-token': token
      }
    })
      .then((result) => {
        toast.success('Company Information Updated');
        router.push('/company/profile');

      }).catch((err) => {
        console.log(err);
        toast.error('Unable to update the Company Information');

      });
  }

  const submitForm = (values) => {
    console.log(values);
    updateCompany(values);

  };





  useEffect(() => {
    // This will run only on the client, preventing server-client mismatch
    setIsClient(true);
  }, []);

  // const companyform = useFormik({
  //   initialValues: {
  //     industry: '',
  //     companyLocation: '',
  //     logo: '',  // This will be set with the uploaded file URL
  //     website: '',
  //     description: '',
  //   },
  //   onSubmit: (values, { resetForm, setSubmitting }) => {
  //     // Add logo URL to form data
  //     const formData = { ...values, logo: imgUrl };

  //     axios.post('http://localhost:5000/company/add', formData)
  //       .then((response) => {
  //         console.log(response.status);
  //         toast.success('Company Information Added');
  //         resetForm();
  //         setSubmitting(false);
  //         router.push('/companylisting');  // Navigate to the listing page after successful submission
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error('Unable to add the Company Information');
  //         setSubmitting(false);
  //       });
  //   },
  // });


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

  if (!isClient) {
    // Avoid rendering anything on the server side to prevent hydration error
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Form Section */}

      <div>
        <main className="bg-[#1D3557] flex-1 p-4">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md space-y-6 p-1 ">

            <h1 className="text-4xl font-extrabold text-center text-gray-800 mt-4">
              Update Company Profile
            </h1>
            <p className="text-center text-lg text-gray-500">
              Get started by filling in your details. Showcase your skills, connect your profiles, and land your dream job!
            </p>
            <div className="">

              <div className="bg-[#1D3557] shadow-inner shadow-black w-[100%] mx-auto">


                {
                  companyData !== null ? (
                    <Formik initialValues={companyData} onSubmit={submitForm}>
                      {
                        (updateForm) => {
                          return (
                            <form onSubmit={updateForm.handleSubmit} >

                              <div className="bg-white shadow-xl grid grid-cols-1 md:grid-cols-3 ">


                                {/* Left Section - Company Logo */}
                                <div className="bg-white flex flex-col items-center p-8 relative rounded-md">

                                  <div className="flex flex-col items-center mt-20">
                                    <img
                                      src={companyData.logo || "/profileimage.jpg"}
                                      alt=""
                                      className="h-40 w-40 rounded-full object-cover border-8 border-[#1D3557] shadow-md shadow-black mb-4"
                                    />
                                    <label
                                      htmlFor="logo"
                                      className="text-[#1D3557] cursor-pointer hover:underline"
                                    >
                                      Change Company Logo
                                    </label>
                                    <input type="file" id="logo"
                                      onChange={uploadToCloud} className="hidden" />
                                  </div>

                                  <div>
                                    <img src="/register.png" alt="" />
                                  </div>

                                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-[#1D3557] rounded-full shadow-lg shadow-gray-400 animate-bounce" />
                                </div>

                                {/* Right Section - Form */}
                                <div className="p-12 col-span-2">

                                  <div className="space-y-8">

                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">Industry</label>
                                      <input
                                        type="text"
                                        id="industry"
                                        value={updateForm.values.industry}
                                        onChange={updateForm.handleChange}
                                        className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Enter industry type"
                                        required
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">Company Location</label>
                                      <input
                                        type="text"
                                        id="companyLocation"
                                        value={updateForm.values.companyLocation}
                                        onChange={updateForm.handleChange}
                                        className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Enter company location"
                                        required
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">Website</label>
                                      <input
                                        type="url"
                                        id="website"
                                        value={updateForm.values.website}
                                        onChange={updateForm.handleChange}
                                        className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Enter company website"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">Description</label>
                                      <textarea
                                        rows={3}
                                        id="description"
                                        value={updateForm.values.description}
                                        onChange={updateForm.handleChange}
                                        className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Enter a brief company description"
                                      />
                                    </div>

                                    <button
                                      type="submit"
                                      disabled={updateForm.isSubmitting}
                                      className="w-full py-3 bg-[#1D3557] text-white font-bold rounded-md hover:bg-blue-900"
                                    >
                                      Register Company
                                    </button>
                                  </div>
                                </div>
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

    </div>

  );
};

export default CompanyForm;
