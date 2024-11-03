'use client'
import React, { useState, useEffect } from 'react'
import Pagination from '@/components/Pagination'
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const CompanyListingsPage = () => {
  const [complist, setComplist] = useState([]);
  const [companyset, setCompanyset] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
  });
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 6; // Number of companies per page


  const [subscribedCompanies, setSubscribedCompanies] = useState([]); // State to track subscribed companies

  const addSubscription = () => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/subscription/add`, data, {
      headers: {
        'x-auth-token': token
      }
    })
      .then((result) => {
        toast.success('Subscribed to the company');
        router.back();

      }).catch((err) => {
        console.log(err);
        toast.error('Unable to subscribe to the company');

      });
    } 
  

  // Fetch companies from backend
  const fetchCompanies = async () => {
    try 
    {
      const response = await fetch('http://localhost:5000/company/getall'); // Backend endpoint for getting companies
      const data = await response.json();
      setComplist(data);
      setFilteredCompanies(data); // Initially, show all companies
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  useEffect(() => {
    fetchCompanies(); // Fetch companies from backend when the component mounts
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    const searchLower = searchTerm.toLowerCase();
    const filtered = complist.filter((company) => {
      const matchesSearch =
        company.companyName.toLowerCase().includes(searchLower) ||
        company.companyLocation.toLowerCase().includes(searchLower);

      const matchesFilters =
        (filters.industry === '' || company.industry === filters.industry) &&
        (filters.location === '' || company.location.toLowerCase() === filters.location);

      return matchesSearch && matchesFilters;
    });

    setFilteredCompanies(filtered);
  };

  useEffect(() => {
    setFilteredCompanies(complist); // Reset to full list when filters change
  }, [complist]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCompanies.length / listingsPerPage);
  const startIndex = (currentPage - 1) * listingsPerPage;
  const currentListings = filteredCompanies.slice(startIndex, startIndex + listingsPerPage);


  const handleSubscribe = (companyId) => {
    if (!subscribedCompanies.includes(companyId)) {
      setSubscribedCompanies([...subscribedCompanies, companyId]); // Add companyId to subscribedCompanies
    }
  };





  const CompanyListing = ({ company }) => (

    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform transition duration-500 ease-in-out">
      <div className="p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative flex-shrink-0">
          <img
            src="/Lock2.jpg"
            alt={`${company.companyName} logo`}
            className="w-28 h-28 object-cover rounded-full shadow-md border-4 border-blue-500"
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-md" title="Active Company"></span>
        </div>

        <div className="flex-grow text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-1 tracking-tight">
            {company.companyName}
          </h2>
          <p className="text-lg text-gray-500 font-semibold">{company.industry}</p>
          <p className="text-lg text-gray-400 font-semibold">{company.location}</p>
        </div>

        <div className="mt-4 md:mt-0">
          <button
            className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => {
              setCompanyset(company);
              // Trigger a modal or another detailed view here
            }}
          >
            View Details
          </button>

          <button
            onClick={() => handleSubscribe(company._id)}
            disabled={subscribedCompanies.includes(company._id)}
            className={`p-2 text-white ${subscribedCompanies.includes(company._id) ? 'bg-gray-500' : 'bg-blue-500'} rounded mt-2`}
          >
            {subscribedCompanies.includes(company._id) ? 'Subscribed' : 'Subscribe'}
          </button>

        </div>
      </div>
    </div>
  );





  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Company Listings</h1>

      {/* Search and Filters */}
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Search by company name or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      <div className="mb-6 flex space-x-4">
        <select
          name="industry"
          value={filters.industry}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg w-1/2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">All Industries</option>
          <option value="Software">Software</option>
          <option value="Consulting">Consulting</option>
          {/* Add more industries as needed */}
        </select>

        <select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg w-1/2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">All Locations</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          {/* Add more locations as needed */}
        </select>
      </div>

      {/* Company Listings */}
      <div className="mt-6 space-y-4 md: lg:">
        {currentListings.map((company) => (
          <CompanyListing key={company._id} company={company} />
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default CompanyListingsPage;
