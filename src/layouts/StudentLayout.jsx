// src/layouts/StudentLayout.jsx
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const StudentLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <div>
          <Link to="/student/dashboard" className="mr-4">Dashboard</Link>
          <Link to="/student/attendance-details">Attendance Details</Link>
        </div>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </nav>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
