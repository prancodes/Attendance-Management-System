// src/layouts/StudentLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <Link to="/student/dashboard" className="text-xl font-bold">
          Student Portal
        </Link>
        <nav>
          <Link to="/student/dashboard" className="mr-4 hover:underline">Dashboard</Link>
          <Link to="/student/attendance-details" className="hover:underline">Attendance Details</Link>
        </nav>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-200 p-4 text-center">© 2025 Student Portal</footer>
    </div>
  );
};

export default StudentLayout;
