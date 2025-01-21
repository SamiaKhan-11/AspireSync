'use client'
import React, { useEffect, useState } from 'react'
import Pagination from '@/components/Pagination'


const HeaderSection = ({ handleSearch, searchTerm, setSearchTerm, filters, handleFilterChange }) => {
    return (
        <header className="bg-gray-100 p-4 rounded-lg shadow-lg">
            {/* Search Bar */}
            <div className="flex items-center justify-between">
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search for job title, company, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="ml-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            {/* Filter Section */}
            <div className="mt-4 flex flex-wrap gap-4">
                {/* Job Type Filter */}
                <select
                    name="jobType"
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.jobType}
                    onChange={handleFilterChange}
                >
                    <option value="">Job Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                </select>

                {/* Location Filter */}
                <select
                    name="location"
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.location}
                    onChange={handleFilterChange}
                >
                    <option value="">Location</option>
                    <option value="remote">Remote</option>
                    <option value="new-york">New York</option>
                    <option value="san-francisco">San Francisco</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                </select>

                {/* Industry Filter */}
                <select
                    name="industry"
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.Industry}
                    onChange={handleFilterChange}
                >
                    <option value="">Industry</option>
                    <option value="it">IT</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                </select>

                {/* Experience Level Filter */}
                <select
                    name="experience"
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.Experience}
                    onChange={handleFilterChange}
                >
                    <option value="">Experience Level</option>
                    <option value="fresher">Fresher</option>
                    <option value="mid-level">Mid-level</option>
                    <option value="senior">Senior</option>
                </select>
            </div>
        </header>
    );
};


const InterviewList = () => {

    const [Interviewlist, setInterviewlist] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        jobTitle: '',
        location: '',
        Industry: '',
        Experience: '',
    });
    const [filteredListings, setFilteredListings] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const listingsPerPage = 5; // Set number of listings per page

    // fetching data from backend
    const fetchInterviewData = async () => {
        try {
            const response = await fetch('http://localhost:5000/interview/getall'); // Backend endpoint for getting companies
            const data = await response.json();
            console.log(data);

            setInterviewlist(data);
            setFilteredListings(data); // Initially, show all companies
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchInterviewData(); // Fetch companies from backend when the component mounts
    }, []);

    // Update filters state
    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };


    // Search and Filter Logic
    const handleSearch = () => {
        const searchLower = searchTerm.toLowerCase();
        const filtered = Interviewlist.filter((listing) => {
            const matchesSearch =
                listing.jobTitle.toLowerCase().includes(searchLower) ||
                listing.company.toLowerCase().includes(searchLower) ||
                listing.location.toLowerCase().includes(searchLower);

            const matchesFilters =
                (filters.jobType === '' || listing.jobType === filters.jobType) &&
                (filters.Location === '' || listing.Location.toLowerCase() === filters.Location) &&
                (filters.Industry === '' || listing.Industry === filters.Industry) &&
                (filters.Experience === '' || listing.Experience === filters.Experience);

            return matchesSearch && matchesFilters;
        });

        setFilteredListings(filtered);
    };

    // Show all listings initially or filtered ones
    useEffect(() => {
        setFilteredListings(Interviewlist);
    }, [Interviewlist]);

    // Pagination logic
    const totalPages = Math.ceil(filteredListings.length / listingsPerPage);
    const startIndex = (currentPage - 1) * listingsPerPage;
    const currentListings = filteredListings.slice(startIndex, startIndex + listingsPerPage);
    return (
        <div className="p-8">
            {/* Header Section */}
            <HeaderSection
                handleSearch={handleSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={filters}
                handleFilterChange={handleFilterChange}
            />

            {/* Main Content - Interview Listings */}
            <div className="mt-6 space-y-4">
                {filteredListings.length > 0 ? (
                    filteredListings.map((listing) => (
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform transition duration-500 ease-in-out">
                            <div className="p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={`${listing.profileImage}`}
                                        alt={`${listing.company} logo`}
                                        className="w-24 h-24 object-cover rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col items-center md:items-start space-y-2">
                                    <h2 className="text-xl font-semibold">{listing.jobTitle}</h2>
                                    <p className="text-gray-600">{listing.company.companyName}</p>
                                    <p className="text-gray-600">{listing.location}</p>
                                    <p className="text-gray-600">{listing.jobType}</p>
                                    <p className="text-gray-600">{listing.experience}</p>
                                    <p className="text-gray-600">{listing.skillsRequired}</p>
                                    <p className="text-gray-600">{listing.interviewDate}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No listings found</p>
                )}
            </div>

            {/* Pagination Controls */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setCurrentPage}
            />

        </div>
    )
}

export default InterviewList