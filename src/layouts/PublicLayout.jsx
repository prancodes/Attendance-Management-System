// src/layouts/PublicLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Attendance System
          </Link>
          <nav>
            <Link to="/" className="mr-4 hover:underline">
              Home
            </Link>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </nav>
        </div>
      </header>
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
