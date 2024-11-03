'use client'
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaHome, FaBuilding, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';


const CompanyForm = () => {
  const [activePage, setActivePage] = useState('register'); // State to track active page
  const router = useRouter();
  const [imgUrl, setImgUrl] = useState('');
  const [isClient, setIsClient] = useState(false);



  useEffect(() => {
    // This will run only on the client, preventing server-client mismatch
    setIsClient(true);
  }, []);




  const companyform = useFormik({
    initialValues: {
      companyName: '',  // Updated to match schema
      contactEmail: '',
      password: '',
      Industry: '',
      companyLocation: '',
      logo: '',  // This will be set with the uploaded file URL
      website: '',
      description: '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      // Add logo URL to form data
      const formData = { ...values, logo: imgUrl };

      axios.post('http://localhost:5000/company/add', formData)
        .then((response) => {
          console.log(response.status);
          toast.success('Company Information Added');
          resetForm();
          setSubmitting(false);
          router.push('/companylisting');  // Navigate to the listing page after successful submission
        })
        .catch((err) => {
          console.log(err);
          toast.error('Unable to add the Company Information');
          setSubmitting(false);
        });
    },
  });


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
        companyform.setFieldValue('logo', url); // Set logo field value
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
   

      {/* Form Section */}
      <div className="flex-1 flex bg-gray-100 w-full">

        <form onSubmit={companyform.handleSubmit} >

          <div className="w-full max-w-full bg-white shadow-xl grid grid-cols-1 md:grid-cols-3 p-10">


            {/* Left Section - Company Logo */}
            <div className="bg-white flex flex-col items-center p-8 relative">
              <h2 className="text-3xl font-bold text-gray-800 -ml-28">Register Company</h2>
              <div className="flex flex-col items-center mt-20">
                <img
                  src="/profileimg.png"
                  alt="Company Logo"
                  className="h-40 w-40 rounded-full object-cover border-8 border-blue-400 shadow-md shadow-black mb-4"
                />
                <label
                  htmlFor="logo"
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Change Company Logo
                </label>
                <input type="file" id="logo"
                  onChange={uploadToCloud} className="hidden" />
              </div>

              <div>
                <img src="/register.jpg" alt="" />
              </div>

              <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-300 rounded-full shadow-lg shadow-gray-400 animate-bounce" />
            </div>

            {/* Right Section - Form */}
            <div className="p-12 col-span-2">

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    value={companyform.values.companyName}
                    onChange={companyform.handleChange}
                    className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter company name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={companyform.values.contactEmail}
                    onChange={companyform.handleChange}
                    className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter contact email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={companyform.values.password}
                    onChange={companyform.handleChange}
                    className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter a secure password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Industry</label>
                  <input
                    type="text"
                    id="Industry"
                    value={companyform.values.Industry}
                    onChange={companyform.handleChange}
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
                    value={companyform.values.companyLocation}
                    onChange={companyform.handleChange}
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
                    value={companyform.values.website}
                    onChange={companyform.handleChange}
                    className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter company website"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    rows={3}
                    id="description"
                    value={companyform.values.description}
                    onChange={companyform.handleChange}
                    className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter a brief company description"
                  />
                </div>

                <button
                  type="submit"
                  disabled={companyform.isSubmitting || !imgUrl}
                  className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                >
                  Register Company
                </button>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>

  );
};

export default CompanyForm;




// 'use client';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import Sidebar from '@/app/company/Sidebar'
// import { toast } from 'react-hot-toast';  // Assuming you're using react-hot-toast for notifications

// const AddInterviewInfo = () => {
//   const router = useRouter();
//   const [imgUrl, setImgUrl] = useState('');
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     // This will run only on the client, preventing server-client mismatch
//     setIsClient(true);
//   }, []);

//   const Interviewform = useFormik({
//     initialValues: {
//       companyName: '',  // Updated to match schema
//       Industry: '',
//       jobTitle: '',
//       jobType: '',
//       Experience: '',
//       SkillsRequired: '',
//       Location: '',
//       InterviewDate: '',
//       endDate: '',
//       logo: '',  // This will be set with the uploaded file URL
//     },
//     onSubmit: (values, { resetForm, setSubmitting }) => {
//       // Add logo URL to form data
//       const formData = { ...values, logo: imgUrl };

//       axios.post('http://localhost:5000/interview/add', formData)
//         .then((response) => {
//           console.log(response.status);
//           toast.success('Interview Information Added');
//           resetForm();
//           setSubmitting(false);
//           router.push('/interviewlisting');  // Navigate to the listing page after successful submission
//         })
//         .catch((err) => {
//           console.log(err);
//           toast.error('Unable to add the Information');
//           setSubmitting(false);
//         });
//     },
//   });

//   const uploadToCloud = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const fd = new FormData(); // Create FormData object to handle file upload
//     fd.append('file', file);
//     fd.append('upload_preset', 'myupload');
//     fd.append('cloud_name', 'dz1qogay3');

//     axios
//       .post('https://api.cloudinary.com/v1_1/dz1qogay3/image/upload', fd, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       })
//       .then((response) => {
//         const { url } = response.data;
//         setImgUrl(url); // Save the URL to imgUrl state
//         Interviewform.setFieldValue('logo', url); // Set logo field value
//         toast.success('Image Uploaded Successfully');
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error('Image Upload Failed');
//       });
//   };

//   if (!isClient) {
//     // Avoid rendering anything on the server side to prevent hydration error
//     return null;
//   }

//   return (
//     <div className='bg-white p-1 h-fit '>
//       <Sidebar />



//       <div className='h-full w-[25%] bg-gradient-to-tr from-purple-400 to-blue-400 fixed z-0 left-0 top-0 rounded-tr-3xl rounded-br-3xl place-content-center'></div>
//       <div className='h-full w-[30%] bg-gradient-to-tr from-purple-400 to-blue-400 fixed z-0 top-0 right-0 rounded-tl-full rounded-bl-full'></div>
//       <div className='h-full w-[20%] bg-white fixed z-0 top-0 right-0 rounded-tl-full rounded-bl-full'> </div>



//       <div className="relative z-10 my-12 max-w-screen-lg border px-4 py-8 bg-white shadow-2xl shadow-black sm:mx-4 sm:rounded-xl md:mx-auto">
//         <form onSubmit={Interviewform.handleSubmit} className='space'>
//           {/* Form Header */}
//           <div className="text-center border-b py-4 sm:flex-row sm:items-start">
//             <h1 className="font-bold text-4xl mb-3 text-black underline underline-offset-4 [text-shadow:3px_5px_2px_#c2bcc4]">Add Interview Information</h1></div>
//           {/* Form Fields */}

//           <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
//             <label className="shrink-0 w-32 font-bold bg-blue-300 rounded-tr-full rounded-br-full text-center mt-2 shadow-black shadow-inner">Company Name</label>
//             <input
//               type="text"
//               id="companyName"
//               value={Interviewform.values.companyName}
//               onChange={Interviewform.handleChange}
//               placeholder="Enter Company Name"
//               className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
//             />
//           </div>

//           <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
//             <label className="shrink-0 w-32 font-bold bg-blue-300 rounded-tr-full rounded-br-full text-center mt-2 shadow-black shadow-inner">Industry</label>
//             <input
//               type="text"
//               id="Industry"
//               value={Interviewform.values.Industry}
//               onChange={Interviewform.handleChange}
//               placeholder="Enter Industry"
//               className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
//             />
//           </div>

//           <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
//             <label className="shrink-0 w-32 font-bold bg-blue-300 rounded-tr-full rounded-br-full text-center mt-2 shadow-black shadow-inner">Job Title</label>
//             <input
//               type="text"
//               id="jobTitle"
//               value={Interviewform.values.jobTitle}
//               onChange={Interviewform.handleChange}
//               placeholder="Enter Company Location"
//               className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
//             />
//           </div>

//           <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
//             <label className="shrink-0 w-32 font-bold bg-blue-300 rounded-tr-full rounded-br-full text-center mt-2 shadow-black shadow-inner">Job Type</label>
//             <select
//               id="jobType"
//               value={Interviewform.values.jobType}
//               onChange={Interviewform.handleChange}
//               placeholder="Enter Company Location"
//               className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" >
//             <option value="select" >Select job type</option>
//             <option value="Full time" >Full time</option>
//             <option value="Part time" >Part time</option>
//             <option value="Internship" >Internship</option>
//           </select>
//       </div>

//       <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
//             <label className="shrink-0 w-32 font-bold bg-blue-300 rounded-tr-full rounded-br-full text-center mt-2 shadow-black shadow-inner">Experience</label>
//             <select
//               id="Experience"
//               value={Interviewform.values.Experience}
//               onChange={Interviewform.handleChange}
//               placeholder="Enter Company Location"
//               className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" >
//             <option value="select" >Select Option</option>
//             <option value="Fresher" >Fresher</option>
//             <option value="Middle-level" >Middle-level</option>
//             <option value="Senior" >Senior</option>
//           </select>
//       </div>

//       <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
//         <label className="shrink-0 w-32 font-bold bg-blue-300 rounded-tr-full rounded-br-full text-center mt-2 shadow-black shadow-inner">Skills Required</label>
//         <input
//           type="text"
//           id="SkillsRequired"
//           value={Interviewform.values.SkillsRequired}
//           onChange={Interviewform.handleChange}
//           placeholder='Enter website url'
//           className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
//         />
//       </div>

//       <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
//         <label className="shrink-0 w-32 font-bold bg-blue-300 rounded-tr-full rounded-br-full text-center mt-2 shadow-black shadow-inner">Location</label>
//         <input
//           type='text'
//           id="Location"
//           value={Interviewform.values.Location}
//           onChange={Interviewform.handleChange}
//           placeholder="Enter details"
//           className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
//         />
//       </div>

//       <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
//         <label className="shrink-0 w-32 font-bold bg-blue-300 rounded-tr-full rounded-br-full text-center mt-2 shadow-black shadow-inner">Interview Date</label>
//         <input
//           type="date"
//           id="InterviewDate"
//           value={Interviewform.values.InterviewDate}
//           onChange={Interviewform.handleChange}
//           placeholder="Enter email"
//           className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
//         />
//       </div>

//       <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
//         <label className="shrink-0 w-32 font-bold bg-blue-300 rounded-tr-full rounded-br-full text-center mt-2 shadow-black shadow-inner">Deadline</label>
//         <input
//           type="date"
//           id="endDate"
//           value={Interviewform.values.endDate}
//           onChange={Interviewform.handleChange}
//           placeholder="Enter email"
//           className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
//         />
//       </div>

//       <div className="flex flex-col gap-4 py-4 lg:flex-row ">
//         <label className="shrink-0 w-32 font-bold bg-blue-300 rounded-tr-full rounded-br-full text-center mt-2 h-fit shadow-black shadow-inner">Company Logo</label>
//         <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center bg-white">
//           <img
//             src="/Lock2.jpg"
//             className="h-28 w-28 rounded-full" />
//           <p className="text-sm text-gray-600">Drop your logo file here to start the upload</p>
//           <input
//             type="file"
//             id="logo"
//             onChange={uploadToCloud}
//             className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1" />
//         </div>
//       </div>


//       <div className='px-10 py-2 w-fit mx-auto rounded-xl shadow-lg shadow-black bg-gradient-to-tr from-purple-300 to-blue-300 mt-4'>
//         <button className='flex flex-cols gap-3 cursor-pointer outline-none duration-300'
//           type="submit"
//           disabled={Interviewform.isSubmitting || !imgUrl}
//           title='Save'>
//           {/* <p className='mt-2 text-black font-bold text-lg hover:text-white'>Save</p> */}
//           <div className='group'>
//             <svg
//               className="stroke-blue-500 fill-none group-hover:fill-white group-active:stroke-white group-active:fill-blue-600 group-active:duration-0 duration-300 hover:rotate-90"
//               viewBox="0 0 24 24"
//               height="50px"
//               width="50px"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeWidth="1.5"
//                 d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
//               />
//               <path strokeWidth="1.5" d="M8 12H16" />
//               <path strokeWidth="1.5" d="M12 16V8" />
//             </svg>
//           </div>

//         </button>

//       </div>

//       {/* Save and Cancel buttons for mobile view */}
//       <div className="flex justify-end py-4 sm:hidden">
//         <button
//           type="button"
//           className="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 hover:bg-gray-200">
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={Interviewform.isSubmitting || !imgUrl}
//           className="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
//           Save
//         </button>
//       </div>
//     </form>
//       </div >
//     </div >
//   );
// };

// export default AddInterviewInfo;




