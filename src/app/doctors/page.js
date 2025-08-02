"use client"; // This page uses hooks (useState, useEffect, useSearchParams)

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // Correct hook for App Router
import DoctorCard from '../../components/DoctorCard';
import { ChevronDown } from 'lucide-react';
import Header from '../../components/Header';

// The actual page component that uses the search params
function DoctorsPageContent() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  
  const location = searchParams.get('location');
  const q = searchParams.get('q');

  useEffect(() => {
    setLoading(true);
    // In a real app, you would fetch from your backend API
    // const url = `http://localhost:5001/api/doctors?location=${location || ''}&q=${q || ''}`;
    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => {
    //     setDoctors(data);
    //     setLoading(false);
    //   });

    // Mock data for demonstration
    const mockDoctors = [
      { id: 1, name: 'Dr. Ruby Perrin', specialization: 'Cardiologist', experience: 12, location: 'New York, USA', clinic: 'Heart Care Clinic', fee: 50, image: '/doctor-placeholder.svg', available: true },
      { id: 2, name: 'Dr. John Doe', specialization: 'Dentist', experience: 8, location: 'San Francisco, USA', clinic: 'Smile Bright Dental', fee: 35, image: '/doctor-placeholder.svg', available: true },
      { id: 3, name: 'Dr. Jane Smith', specialization: 'Dermatologist', experience: 15, location: 'New York, USA', clinic: 'Skin Health Center', fee: 60, image: '/doctor-placeholder.svg', available: false },
      { id: 4, name: 'Dr. Peter Jones', specialization: 'Pediatrician', experience: 10, location: 'Chicago, USA', clinic: 'Kids Care Hospital', fee: 45, image: '/doctor-placeholder.svg', available: true },
      { id: 5, name: 'Dr. Emily White', specialization: 'Gynecologist', experience: 7, location: 'New York, USA', clinic: 'Women\'s Wellness', fee: 55, image: '/doctor-placeholder.svg', available: false },
    ];
    
    const filteredDoctors = mockDoctors.filter(doctor => {
      const locationMatch = location ? doctor.location.toLowerCase().includes(location.toLowerCase()) : true;
      const queryMatch = q ? (
          doctor.name.toLowerCase().includes(q.toLowerCase()) || 
          doctor.specialization.toLowerCase().includes(q.toLowerCase())
      ) : true;
      return locationMatch && queryMatch;
    });

    // Simulate network delay
    setTimeout(() => {
        setDoctors(filteredDoctors);
        setLoading(false);
    }, 500);

  }, [location, q]);

  // Dropdown state
  const [openDropdown, setOpenDropdown] = useState(null);
  const handleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <input
            type="text"
            placeholder="Location"
            defaultValue={location || ''}
            className="w-full md:w-1/4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
          <input
            type="text"
            placeholder="Search for doctors, clinics, hospitals, etc."
            defaultValue={q || ''}
            className="w-full md:w-2/4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
          <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors flex items-center justify-center">
            Search
          </button>
        </div>
      </div>
      {/* Filter Bar */}
      <div className="bg-blue-900 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-3 items-center relative">
          {/* Gender Dropdown */}
          <div className="relative">
            <button onClick={() => handleDropdown('gender')} className="bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center focus:outline-none">
              Gender <ChevronDown size={16} className="ml-1" />
            </button>
            {openDropdown === 'gender' && (
              <div className="absolute left-0 mt-2 w-40 bg-white rounded shadow-lg py-2 text-left">
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">Male</button>
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">Female</button>
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">Other</button>
              </div>
            )}
          </div>
          {/* Patient Stories Dropdown */}
          <div className="relative">
            <button onClick={() => handleDropdown('stories')} className="bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center focus:outline-none">
              Patient Stories <ChevronDown size={16} className="ml-1" />
            </button>
            {openDropdown === 'stories' && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded shadow-lg py-2 text-left">
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">100+ Stories</button>
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">500+ Stories</button>
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">1000+ Stories</button>
              </div>
            )}
          </div>
          {/* Experience Dropdown */}
          <div className="relative">
            <button onClick={() => handleDropdown('experience')} className="bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center focus:outline-none">
              Experience <ChevronDown size={16} className="ml-1" />
            </button>
            {openDropdown === 'experience' && (
              <div className="absolute left-0 mt-2 w-40 bg-white rounded shadow-lg py-2 text-left">
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">0-5 years</button>
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">6-10 years</button>
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">10+ years</button>
              </div>
            )}
          </div>
          {/* All Filters Dropdown */}
          <div className="relative">
            <button onClick={() => handleDropdown('filters')} className="bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center focus:outline-none">
              All Filters <ChevronDown size={16} className="ml-1" />
            </button>
            {openDropdown === 'filters' && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded shadow-lg py-2 text-left">
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">Video Consult</button>
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">In-Clinic</button>
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">Available Today</button>
              </div>
            )}
          </div>
          <span className="flex-1" />
          <span className="text-white font-semibold mr-2">Sort By</span>
          {/* Sort By Dropdown */}
          <div className="relative">
            <button onClick={() => handleDropdown('sort')} className="bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center focus:outline-none">
              Relevance <ChevronDown size={16} className="ml-1" />
            </button>
            {openDropdown === 'sort' && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 text-left">
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">Relevance</button>
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">Experience</button>
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-50">Patient Stories</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Results Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {loading ? 'Searching for doctors...' : `${doctors.length} Dermatologists available${location ? ` in ${location}` : ''}`}
          </h2>
          <p className="text-gray-600 text-sm mt-1">Book appointments with minimum wait-time & verified doctor details</p>
          {q && <p className="text-blue-700 text-sm mt-1">for "{q}"</p>}
        </div>
        {loading ? (
          <p className="text-center text-blue-500">Loading doctors...</p>
        ) : (
          <div className="flex flex-col gap-6">
            {doctors.length > 0 ? (
              doctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)
            ) : (
              <p className="text-center col-span-full text-blue-500">No doctors found matching your criteria.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// The main export for the page, wrapping the content in Suspense
// This is best practice for pages that use useSearchParams
export default function DoctorsPage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <DoctorsPageContent />
    </Suspense>
  );
}