"use client"; // This page needs to be a client component because it uses hooks (useState, useRouter)

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import { MapPin, Search } from 'lucide-react';

export default function Home() {
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    // Use URLSearchParams to construct the query string safely
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (query) params.append('q', query);
    router.push(`/doctors?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24 text-center bg-white/90 rounded-2xl shadow-2xl max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 leading-tight mb-4 drop-shadow-sm">
          Find and book the best doctors near you
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          With a network of over 100,000 trusted doctors and specialists, we are here to help you find the right care.
        </p>
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto bg-white/95 p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-4 border border-blue-100">
          <div className="relative w-full sm:w-1/2">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={22} />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full pl-11 pr-3 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 placeholder-blue-400 transition-all shadow-sm"
            />
          </div>
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={22} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for doctors, clinics, hospitals, etc."
              className="w-full pl-11 pr-3 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 placeholder-blue-400 transition-all shadow-sm"
            />
          </div>
          <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
            <Search size={20} className="mr-2 sm:hidden" />
            Search
          </button>
        </form>
      </div>
    </div>
  );
}