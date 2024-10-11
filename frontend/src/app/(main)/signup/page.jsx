'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is Required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(/[a-z]/, 'Must include lowercase')
    .matches(/[A-Z]/, 'Must include uppercase')
    .matches(/[0-9]/, 'Must include a number')
    .matches(/[\W]/, 'Must include special characters'),
});

const SignUp = () => {
  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await axios.post('http://localhost:5000/user/add', values);
        resetForm();
        toast.success('User Registered Successfully!');
        router.push('/Login');
      } catch (err) {
        if (err.response?.data.code === 11000) {
          toast.error('Email already exists');
        } else {
          toast.error('Signup failed. Please try again.');
        }
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-400 to-blue-400 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full space-y-8 p-8 bg-white dark:bg-neutral-900 rounded-xl shadow-lg"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-500 dark:text-white">
            Create an account
          </h2>
          <p className="text-gray-600 mt-2">Join us and start exploring!</p>
          
        </div>

        <form onSubmit={signupForm.handleSubmit} className="mt-8 space-y-4">
          <div className="rounded-md shadow-sm">
            {/* Name Field */}
            <div className="flex flex-col-reverse">
              {signupForm.touched.name && signupForm.errors.name && (
                <p className="text-red-600 text-sm">{signupForm.errors.name}</p>
              )}
              <input
                type="text"
                id="name"
                onChange={signupForm.handleChange}
                value={signupForm.values.name}
                placeholder="Enter Name"
                className="peer relative duration-500 w-full border border-gray-300 rounded-lg p-2 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200 transition 
                placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 focus:rounded-md"

              />
              {/*1) https://woorise.com/wp-content/uploads/2021/03/Online-event-registration.png 
          2) https://images.blocksurvey.io/templates/secure-signup-form.png */}

              <span className="pl-2 duration-500 opacity-0 peer-focus:opacity-100 -translate-y-5 peer-focus:translate-y-0">
                Enter Name
              </span>

            </div>

            {/* Email Field */}
            <div className="flex flex-col-reverse">
              {signupForm.touched.email && signupForm.errors.email && (
                <p className="text-red-600 text-sm">{signupForm.errors.email}</p>
              )}
              <input
                type="email"
                id="email"
                onChange={signupForm.handleChange}
                value={signupForm.values.email}
                placeholder=" Enter your email"
                className="peer relative duration-500 w-full border border-gray-300 rounded-lg p-2 mt-2 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200 transition 
                placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 focus:rounded-md"

              />

              <span className="pl-2 duration-500 opacity-0 peer-focus:opacity-100 -translate-y-5 peer-focus:translate-y-0">
                Enter your email
              </span>

            </div>

            {/* Password Field */}
            <div className="flex flex-col-reverse">
              {signupForm.touched.password && signupForm.errors.password && (
                <p className="text-red-600 text-sm">{signupForm.errors.password}</p>
              )}
              <input
                type="password"
                id="password"
                onChange={signupForm.handleChange}
                value={signupForm.values.password}
                placeholder=" Create a password"
                className="peer relative duration-500 w-full border border-gray-300 rounded-lg p-2 mt-3 focus:border-purple-600 focus:ring-2 focus:ring-pink-400 transition 
                placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 focus:rounded-md"

              />

              <span className="pl-2 duration-500 opacity-0 peer-focus:opacity-100 -translate-y-5 peer-focus:translate-y-0">
                Create a password
              </span>

            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={signupForm.isSubmitting}
              className="w-full flex justify-center py-2 px-4 mt-10 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {signupForm.isSubmitting ? 'Signing up...' : 'Sign up'}
            </motion.button>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400 text-center">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-600 dark:text-blue-400 hover:underline">
              Sign in

            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
