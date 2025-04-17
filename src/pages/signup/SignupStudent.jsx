// src/pages/signup/StudentSignup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveUser, setCurrentUser } from '../../utils/authStorage';

export default function StudentSignup() {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState('');
  const [division, setDivision] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const branches = ['CSE','ECE','EEE','ME','CE','IT'];
  const divisions = ['A','B','C','D','E'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !userId || !password || !branch || !division) {
      setError('Please fill in all fields.');
      return;
    }

    const user = {
      role: 'student',
      name,
      userId,
      password,
      branch,
      division
    };

    saveUser(user);
    setCurrentUser(user);
    alert('Student Signup Successful!');
    navigate('/student/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-md rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Signup</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="User ID (e.g. roll number)"
            className="w-full border px-3 py-2 rounded"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="w-full border px-3 py-2 rounded"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            {branches.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select
            className="w-full border px-3 py-2 rounded"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
          >
            <option value="">Select Division</option>
            {divisions.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/login/student" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
