// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Student Attendance System</h1>
      <p className="mb-4 text-lg">
        Welcome! Choose your portal below.
      </p>
      <div className="flex gap-4">
        <Link
          to="/login?role=teacher"
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Login as Teacher
        </Link>
        <Link
          to="/login?role=student"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login as Student
        </Link>
      </div>
    </div>
  );
};

export default Home;
