// src/pages/signup/SignUpPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { saveUser, setCurrentUser } from '../../utils/authStorage';

const branches = ['CSE','ECE','EEE','ME','CE','IT'];
const divisions = ['A','B','C','D','E'];
const INSTITUTION_CODE = 'Eat5Star';

export default function SignUpPage() {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [institutionCode, setInstitutionCode] = useState('');
  const [branch, setBranch] = useState('');
  const [division, setDivision] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !userId || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (role === 'teacher') {
      if (institutionCode !== INSTITUTION_CODE) {
        setError('Invalid Institution Code');
        return;
      }
      if (!branch || !division) {
        setError('Please select branch and division.');
        return;
      }
    } else {
      if (!branch || !division) {
        setError('Please select branch and division.');
        return;
      }
    }

    const user = {
      role,
      name,
      userId,
      password,
      branch,
      division
    };

    saveUser(user);
    setCurrentUser(user);
    setError('');
    alert('Sign-up successful!');
    navigate(role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">User ID</label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border rounded-md"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g. roll no. or teacher code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {role === 'teacher' && (
            <div>
              <label className="block text-sm font-medium">Institution Code</label>
              <input
                type="text"
                className="mt-1 w-full px-3 py-2 border rounded-md"
                value={institutionCode}
                onChange={(e) => setInstitutionCode(e.target.value)}
                placeholder="Enter your institution code"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Branch</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Branch</option>
              {branches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Division</label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Division</option>
              {divisions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </motion.div>
    </div>
  );
}
