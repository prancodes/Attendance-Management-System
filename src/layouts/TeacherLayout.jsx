// src/layouts/TeacherLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const TeacherLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
        <Link to="/teacher/dashboard" className="text-xl font-bold">
          Teacher Portal
        </Link>
        <nav>
          <Link to="/teacher/dashboard" className="mr-4 hover:underline">Dashboard</Link>
          <Link to="/teacher/mark-attendance" className="hover:underline">Mark Attendance</Link>
        </nav>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-200 p-4 text-center">© 2025 Teacher Portal</footer>
    </div>
  );
};

export default TeacherLayout;
