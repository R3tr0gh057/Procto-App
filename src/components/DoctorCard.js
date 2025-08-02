"use client"; // This component doesn't strictly need it, but it's good practice if it might have interactions later.

import React from 'react';
import { ThumbsUp, CheckCircle } from 'lucide-react';
import Image from 'next/image'; // Use Next.js Image for optimization

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow border p-6 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-4">
      {/* Image/Logo */}
      <div className="flex-shrink-0 flex flex-col items-center w-full md:w-auto md:items-start">
        <Image
          src={doctor.image}
          alt={`Dr. ${doctor.name}`}
          width={80}
          height={80}
          className="rounded-full border border-gray-200 object-cover"
        />
      </div>
      {/* Info */}
      <div className="flex-1 text-left w-full">
        <h3 className="text-lg font-bold text-blue-800 leading-tight hover:underline cursor-pointer">{doctor.name}</h3>
        <div className="text-sm text-blue-700 font-medium mb-1">{doctor.specialization}</div>
        <div className="text-gray-600 text-sm mb-1">{doctor.experience} years experience overall</div>
        <div className="text-gray-700 text-sm mb-1">{doctor.location} <span className="text-gray-400">•</span> {doctor.clinic}</div>
        <div className="text-gray-700 text-sm mb-1 font-semibold">₹{doctor.fee} Consultation Fees</div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded flex items-center"><ThumbsUp size={14} className="mr-1"/>97%</span>
          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded cursor-pointer hover:underline">159 Patient Stories</span>
        </div>
      </div>
      {/* Actions */}
      <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto mt-4 md:mt-0">
        {doctor.available ? (
          <span className="text-green-700 text-xs font-semibold flex items-center mb-1"><CheckCircle size={16} className="mr-1"/>Available Today</span>
        ) : (
          <span className="text-red-500 text-xs font-semibold mb-1">Unavailable</span>
        )}
        <button className="w-full md:w-auto bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 transition-colors text-sm">Book Clinic Visit</button>
        <button className="w-full md:w-auto border border-blue-600 text-blue-700 px-5 py-2 rounded font-semibold hover:bg-blue-50 transition-colors text-sm">Contact Clinic</button>
      </div>
    </div>
  );
};

export default DoctorCard;