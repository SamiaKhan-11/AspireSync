'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  contactEmail: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string().required('Password is Required')
});

const Login = () => {
  const router = useRouter();

  // Formik setup for handling form submission and validation
  const loginForm = useFormik({
    initialValues: {
      contactEmail: '',
      password: ''
    },
    onSubmit: (values, { setSubmitting }) => {
      // Make API call for login
      axios.post('http://localhost:5000/company/authenticate', values)
        .then((res) => {
          toast.success('Login Successful');
          localStorage.setItem('company', JSON.stringify(res.data));
          localStorage.setItem('token', res.data.token);
          
          router.push('/company/profile'); // Navigate to dashboard after successful login
        })
        .catch((error) => {
          console.error(error);
          toast.error('Invalid login credentials');
          setSubmitting(false);
        });
    },
    validationSchema: LoginSchema
  });

  return (
    <div className="min-h-screen flex gap-40 items-center justify-center bg-[#1D3557] dark:from-blue-950 dark:to-black">


      <div>
        <p className="inline-block text-lg font-bold text-black dark:from-blue-400 dark:to-violet-400 bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300 text-transparent animate-bounce">
          AspireSync
        </p>
        <div className="mt-4 md:mb-12 max-w-2xl">
          <h1 className="mb-6 font-semibold text-white text-4xl lg:text-5xl dark:text-neutral-200">
            Welcome Back!
            <br />
            Please login back to access your account
          </h1>
          <p className="text-gray-200 font-medium dark:text-neutral-400 ">

            Post job openings, interview schedules, and internship opportunities directly on our platform to streamline your hiring process.
          </p>
        </div>

      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg shadow-black dark:bg-neutral-900 ">




        {/* Animated form container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="text-center text-3xl font-bold text-gray-700 mb-6 bg-clip-text bg-[#1D3557] text-transparent">
            Company Login
          </h2>

          {/* Form */}
          <form onSubmit={loginForm.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                id="contactEmail"
                type="email"
                onChange={loginForm.handleChange}
                value={loginForm.values.contactEmail}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="Enter email"
                aria-invalid={loginForm.touched.contactEmail && loginForm.errors.contactEmail ? "true" : "false"}
              />
              {loginForm.touched.contactEmail && loginForm.errors.contactEmail ? (
                <p className="text-sm text-red-600" role="alert">{loginForm.errors.contactEmail}</p>
              ) : null}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                onChange={loginForm.handleChange}
                value={loginForm.values.password}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="Enter password"
                aria-invalid={loginForm.touched.password && loginForm.errors.password ? "true" : "false"}
              />
              {loginForm.touched.password && loginForm.errors.password ? (
                <p className="text-sm text-red-600" role="alert">{loginForm.errors.password}</p>
              ) : null}
            </div>



            <div className="mt-6">
              <button
                type="submit"
                disabled={loginForm.isSubmitting}
                className="w-full bg-[#1D3557] text-white font-semibold py-2 rounded-md shadow-sm hover:bg-[#073982] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors duration-200"
                href="/company/profile"
              >
              
                {loginForm.isSubmitting ? 'Logging in...' : 'Log in'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link href="/company-signup" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                Sign up

              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
