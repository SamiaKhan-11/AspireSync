'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

// Validation schema using Yup
const SignupSchema = Yup.object().shape({
  companyName: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Company Name is Required'),

    contactEmail: Yup.string().email('Invalid email').required('Email is Required'),

  password: Yup.string().required('Password is Required')
    .matches(/[a-z]/, 'Must include a lowercase letter')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[0-9]/, 'Must contain a number')
    .matches(/[\W]/, 'Must contain a special character'),

});

const CompanySignup = () => {
  const router = useRouter();

  // Formik setup for handling form submission and validation
  const signupForm = useFormik({
    initialValues: {
      companyName: '',
      contactEmail: '',
      password: ''
      
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      // Make API call to register company
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/company/add`, values)
        .then(() => {
          toast.success('Company Registered Successfully');
          resetForm();
          router.push('/company-login');
        })
        .catch((error) => {
          console.error(error);
          toast.error('Error registering company');
          setSubmitting(false);
        });
    },
    validationSchema: SignupSchema
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50, x: 0 },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <div 
      className="min-h-screen flex items-center bg-gradient-to-tr from-purple-400 to-blue-400 dark:from-blue-950 dark:via-transparent">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto grid items-center md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left Section - Content */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
          <p className="inline-block text-sm font-bold text-black dark:from-blue-400 dark:to-violet-400 bg-clip-text bg-gradient-to-l from-blue-800 to-violet-800 text-transparent">
            Off Campus Interview
          </p>
          <div className="mt-4 md:mb-12 max-w-2xl">
            <h1 className="mb-4 font-semibold text-black text-4xl lg:text-5xl dark:text-neutral-200">
              Get started today and find the perfect match for your company’s needs.
            </h1>
            <p className="text-black font-medium dark:text-neutral-400">
              Post job openings, interview schedules, and internship opportunities directly on our platform to streamline your hiring process.
            </p>
          </div>
          <blockquote className="hidden md:block relative max-w-sm">
            <svg
              className="absolute top-0 start-0 transform -translate-x-6 -translate-y-8 size-16 text-gray-600 dark:text-neutral-800 -ml-8"
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                fill="currentColor"
              />
            </svg>
            <p className="text-xl italic text-black dark:text-white">
              Get direct access to a wide range of candidates actively seeking off-campus opportunities.
            </p>
          </blockquote>
        </motion.div>

        {/* Right Section - Signup Form */}
        <motion.div 
          className="flex flex-col bg-white p-8 rounded-lg shadow-md dark:bg-neutral-900 shadow-md shadow-black" 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible" 
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-700 mb-4 bg-clip-text bg-gradient-to-tr from-purple-600 to-blue-500 text-transparent w-fit mx-auto">
              Company Signup
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Create your company account
            </p>
          </div>
          <form onSubmit={signupForm.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                onChange={signupForm.handleChange}
                value={signupForm.values.companyName}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="Enter company name"
                aria-invalid={signupForm.touched.companyName && Boolean(signupForm.errors.companyName)}
                aria-describedby="companyName-error"
              />
              {signupForm.touched.companyName && signupForm.errors.companyName ? (
                <div className="mt-2 text-red-600" id="companyName-error">
                  {signupForm.errors.companyName}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="contactEmail"
                type="email"
                onChange={signupForm.handleChange}
                value={signupForm.values.contactEmail}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="Enter your email"
                aria-invalid={signupForm.touched.contactEmail && Boolean(signupForm.errors.contactEmail)}
                aria-describedby="email-error"
              />
              {signupForm.touched.email && signupForm.errors.contactEmail ? (
                <div className="mt-2 text-red-600" id="email-error">
                  {signupForm.errors.contactEmail}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                onChange={signupForm.handleChange}
                value={signupForm.values.password}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="Enter your password"
                aria-invalid={signupForm.touched.password && Boolean(signupForm.errors.password)}
                aria-describedby="password-error"
              />
              {signupForm.touched.password && signupForm.errors.password ? (
                <div className="mt-2 text-red-600" id="password-error">
                  {signupForm.errors.password}
                </div>
              ) : null}
            </div>

           

            <div className="mb-6">
              <button
                type="submit"
                disabled={signupForm.isSubmitting}
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                Signup
              </button>
            </div>
          </form>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account? 
            <Link href="/company-login" className="text-blue-600 hover:underline"> Login</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanySignup;
