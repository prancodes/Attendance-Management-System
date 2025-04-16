// src/layouts/TeacherLayout.jsx
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const TeacherLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-purple-600 text-white p-4 flex justify-between">
        <div>
          <Link to="/teacher/dashboard" className="mr-4">Dashboard</Link>
          <Link to="/teacher/mark-attendance">Mark Attendance</Link>
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

export default TeacherLayout;
