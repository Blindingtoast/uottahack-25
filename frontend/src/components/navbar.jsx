import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/events" className="flex items-center">
              <img
                src="LineLess_Logo_NoBG.png"
                alt="LineLess Logo"
                className="h-8 w-8 mr-2"
              />
              <span className="text-xl font-bold text-gray-900">LineLess</span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
            <Link
              to="/auth"
              className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              My Account
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
