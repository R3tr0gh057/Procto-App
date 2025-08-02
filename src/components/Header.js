"use client"; // This component uses client-side features, but has no hooks. It's good practice for consistency.

import React from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link'; // Use Next.js Link for navigation

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-extrabold text-blue-700 tracking-tight">practo</Link>
          </div>
          <nav className="hidden md:flex md:space-x-8">
            <Link href="/doctors" className="text-gray-700 hover:text-blue-700 font-medium">Find Doctors</Link>
            <Link href="/video-consult" className="text-gray-700 hover:text-blue-700 font-medium">Video Consult</Link>
            <Link href="/surgeries" className="text-gray-700 hover:text-blue-700 font-medium">Surgeries</Link>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/corporates" className="text-xs bg-blue-100 text-blue-700 px-3 py-2 rounded font-semibold">For Corporates</Link>
          </div>
          <div className="md:hidden">
            <button type="button" className="text-gray-500 hover:text-blue-700">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;