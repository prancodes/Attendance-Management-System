// src/layouts/PublicLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="flex justify-between">
          <div>
            <Link to="/" className="mr-4">Home</Link>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        © 2025 Attendance System
      </footer>
    </div>
  );
};

export default PublicLayout;
