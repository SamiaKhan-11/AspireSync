'use client';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings'; // Ensure this library is installed

const CompanyDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [company, setCompany] = useState(null);
    const [rating, setRating] = useState(0); // Default rating
    const [reviews, setReviews] = useState([]);
    const [subscribedCompanies, setSubscribedCompanies] = useState([]);
    const messageRef = useRef(null);

    const token = localStorage.getItem('token');

    // Fetch company details
    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company/getbyid/${id}`);
                setCompany(response.data);
                setRating(response.data.rating || 0);
            } catch (err) {
                console.error('Error fetching company details:', err);
                toast.error('Failed to load company details');
                setError('Failed to fetch company details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCompanyDetails();
    }, [id]);

    // Fetch user subscriptions
    // useEffect(() => {
    //     axios
    //         .get(`${process.env.NEXT_PUBLIC_API_URL}/subscribe/getbyuser`, {
    //             headers: { 'x-auth-token': token },
    //         })
    //         .then((response) => {
    //             const companyIds = response.data.map((subscription) => subscription.company);
    //             setSubscribedCompanies(companyIds);
    //         })
    //         .catch((err) => console.error('Error fetching subscriptions:', err));
    // }, [token]);

    // Fetch reviews for the company
    const fetchReviews = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/review/getbycompany/${id}`);
            setReviews(res.data);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    useEffect(() => {
        if (id) fetchReviews();
    }, [id]);

    // Submit a review
    const submitRating = () => {
        const comment = messageRef.current.value;

        if (!comment) {
            toast.error('Please provide a comment!');
            return;
        }

        axios
            .post(
                `${process.env.NEXT_PUBLIC_API_URL}/review/add`,
                { company: id, rating, comment },
                { headers: { 'x-auth-token': token } }
            )
            .then(() => {
                toast.success('Review submitted');
                messageRef.current.value = '';
                setRating(3); // Reset rating
                fetchReviews(); // Refresh reviews
            })
            .catch((err) => {
                console.error('Error submitting review:', err);
                toast.error('An error occurred. Please try again.');
            });
    };

    const checkSubscription = async (companyId) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/subscribe/check-subscription/${companyId}`,
                { headers: { 'x-auth-token': token } }
            );
            return response.data.isSubscribed;
        } catch (err) {
            console.error('Error checking subscription:', err);
            return false; // Default to false if there's an error
        }
    };

    
    useEffect(() => {
        const fetchCompanySubscription = async () => {
            if (id && token) {
                const isSubscribed = await checkSubscription(id);
                if (isSubscribed) {
                    toast.success('You are subscribed to this company.');
                }
                setSubscribedCompanies((prev) => (isSubscribed ? [...prev, id] : prev));
            }
        };
    
        fetchCompanySubscription();
    }, [id, token]);
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-[#1D3557] min-h-screen">
            <Navbar />
            <div className='h-40'></div>

            <div className="px-5 -mt-10">
                {company ? (
                    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8">
                        {/* Company Details Section */}

                        <div className="lg:col-span-4 bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6 flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-6">
                            <div className="relative">
                                <img
                                    src={company.logo}
                                    alt="Company Logo"
                                    className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                                />
                            </div>
                            <div>
                                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
                                    {company.companyName}
                                </h1>
                                <p className="text-gray-600 mt-4 leading-relaxed">
                                    {company.description}
                                </p>

                                <div className="mt-6 space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <span className="bg-blue-500 text-white rounded-full p-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4 4h16M4 8h16M4 12h16M4 16h16M4 20h16"
                                                />
                                            </svg>
                                        </span>
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                Industry:
                                            </h2>
                                            <p className="text-gray-600">{company.industry}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <span className="bg-green-500 text-white rounded-full p-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2h-2M7 8H5a2 2 0 00-2 2v10a2 2 0 002 2h2"
                                                />
                                            </svg>
                                        </span>
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                Location:
                                            </h2>
                                            <p className="text-gray-600">{company.companyLocation}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <span className="bg-purple-500 text-white rounded-full p-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M10 14l2-2m0 0l2 2m-2-2v6"
                                                />
                                            </svg>
                                        </span>
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                Subscription Status:
                                            </h2>
                                            <p className={`text-gray-600 ${subscribedCompanies.includes(company._id) ? 'text-green-500' : 'text-red-500'}`}>
                                                {subscribedCompanies.includes(company._id) ? 'Subscribed' : 'Not Subscribed'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Review Section */}
                        <div className="flex-1 mt-6 md:mt-0 bg-white rounded-lg shadow-lg p-4 lg:col-span-2">
                            <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">Leave a Review</h2>
                            <div className="mb-4 flex items-center justify-center">
                                <StarRatings
                                    rating={rating}
                                    starRatedColor="gold"
                                    changeRating={setRating}
                                    numberOfStars={5}
                                    starDimension="40px"
                                    starSpacing="15px"
                                />
                                <span className="text-sm text-gray-500 ml-2">{rating}/5</span>
                            </div>

                            <textarea
                                ref={messageRef}
                                placeholder="Share your experience..."
                                className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-gray-600"
                            ></textarea>

                            <button
                                onClick={submitRating}
                                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 focus:ring-2 focus:ring-blue-300"
                            >
                                Submit Review
                            </button>


                        </div>
                    </div>
                ) : (
                    <div className="text-center text-white">No company details found</div>
                )}
            </div>

            {/* Display Reviews */}
            <div className="bg-white rounded-lg shadow-lg p-6 m-5">
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="mb-4 border-b border-gray-600 pb-2">
                            <p className="text-lg text-gray-300">
                                <strong>{review.user?.name || 'Anonymous'}:</strong>
                            </p>
                            <StarRatings
                                rating={review.rating}
                                starRatedColor="gold"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="3px"
                            />
                            <p>
                             <strong>{review.comment}:</strong>
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default CompanyDetail;
