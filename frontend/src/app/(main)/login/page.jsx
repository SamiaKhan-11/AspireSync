'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const router = useRouter();

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values, { setSubmitting }) => {
            // Make API call for login
            axios.post('http://localhost:5000/user/authenticate', values)
              .then((res) => {
                toast.success('Login Successful');
                localStorage.setItem('user', JSON.stringify(res.data));
                localStorage.setItem('token', res.data.token);
                
                router.push('/user/profile'); // Navigate to dashboard after successful login
              })
              .catch((error) => {
                console.error(error);
                toast.error('Invalid login credentials');
                setSubmitting(false);
              });
          },
    });

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1D3557] to-[#1a61c7] dark:bg-gradient-to-br dark:from-neutral-900 dark:via-gray-800">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-lg w-full space-y-8 p-8 bg-white dark:bg-neutral-900 shadow-black shadow-inner"
            >
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#1D3557] dark:text-white">Welcome Back!</h2>
                    <p className="text-gray-600 mt-2">Please log in to your account</p>
                </div>

                <form onSubmit={loginForm.handleSubmit} className="mt-8 space-y-4">
                    <div className="rounded-md shadow-sm">
                        {/* Email Field */}
                        <div className="flex flex-col-reverse">
                            {loginForm.touched.email && loginForm.errors.email && (
                                <p className="text-red-600 text-sm">{loginForm.errors.email}</p>
                            )}
                            <input
                                type="email"
                                id="email"
                                onChange={loginForm.handleChange}
                                value={loginForm.values.email}
                                placeholder="Enter your email"
                                className="peer relative duration-500 w-full border border-gray-300 rounded-lg p-2 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200 transition placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 focus:rounded-md"
                            />
                            <span className="pl-2 duration-500 opacity-0 peer-focus:opacity-100 -translate-y-5 peer-focus:translate-y-0">
                                Enter your email
                            </span>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col-reverse">
                            {loginForm.touched.password && loginForm.errors.password && (
                                <p className="text-red-600 text-sm">{loginForm.errors.password}</p>
                            )}
                            <input
                                type="password"
                                id="password"
                                onChange={loginForm.handleChange}
                                value={loginForm.values.password}
                                placeholder="Enter your password"
                                className="peer relative duration-500 w-full border border-gray-300 rounded-lg p-2 mt-3 focus:border-purple-600 focus:ring-2 focus:ring-pink-400 transition placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 focus:rounded-md"
                            />
                            <span className="pl-2 duration-500 opacity-0 peer-focus:opacity-100 -translate-y-5 peer-focus:translate-y-0">
                                Enter your password
                            </span>
                        </div>
                    </div>

                    <div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loginForm.isSubmitting}
                            className="w-full flex justify-center py-2 px-4 mt-10 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1D3557] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"  
                        >
                            {loginForm.isSubmitting ? 'Logging in...' : 'Log In'}
                        </motion.button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400 text-center">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;


//