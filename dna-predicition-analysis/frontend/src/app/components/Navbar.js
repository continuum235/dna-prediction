"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <img src="/dna-structure.png" alt="DNA Logo" className="h-8 w-8" />
              <span className="font-bold text-xl text-gray-800 tracking-tight">DNA Sequencing Tool</span>
            </Link>
          </div>
          <div>
            <ul className="flex space-x-6">
              <li>
                <Link href="/mutation_detected" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Mutation Detection</Link>
              </li>
              <li>
              
                <Link href="/performance_analysis" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Performance Analysis</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
