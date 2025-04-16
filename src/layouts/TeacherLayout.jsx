// src/layouts/TeacherLayout.jsx
import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaChalkboardTeacher, 
  FaUserGraduate, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaUserCircle
} from "react-icons/fa";
import { format } from "date-fns";

const TeacherLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const today = format(new Date(), "EEEE, MMMM do, yyyy");
  
  const navItems = [
    { path: "/teacher/dashboard", name: "Dashboard", icon: FaChalkboardTeacher },
    { path: "/teacher/classes", name: "My Classes", icon: FaUserGraduate },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-gradient-to-r from-green-600 to-teal-500 text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mr-3 bg-white p-2 rounded-full"
              >
                <FaChalkboardTeacher className="text-green-600 text-xl" />
              </motion.div>
              <h1 className="text-xl font-bold">Teacher Portal</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center py-2 px-3 transition-all rounded-lg ${
                      isActive 
                        ? "bg-white/20 font-medium" 
                        : "hover:bg-white/10"
                    }`
                  }
                >
                  <item.icon className="mr-2" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
            
            {/* User Profile */}
            <div className="hidden md:flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center bg-white/10 py-1 px-3 rounded-full cursor-pointer hover:bg-white/20"
              >
                <FaUserCircle className="text-white text-xl mr-2" />
                <span className="font-medium">Ms. Johnson</span>
              </motion.div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white focus:outline-none"
              >
                {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-3 border-b pb-3">
              <div className="flex items-center">
                <FaUserCircle className="text-green-600 text-xl mr-2" />
                <span className="font-medium">Ms. Johnson</span>
              </div>
              <span className="text-sm text-gray-500">{today}</span>
            </div>
            
            <nav className="flex flex-col">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center py-3 px-3 transition-all border-l-4 ${
                      isActive 
                        ? "border-l-green-600 bg-green-50 text-green-700" 
                        : "border-l-transparent hover:bg-gray-50"
                    }`
                  }
                >
                  <item.icon className="mr-2" />
                  {item.name}
                </NavLink>
              ))}
              <a 
                href="/"
                className="flex items-center py-3 px-3 text-red-600 hover:bg-red-50 mt-2 border-t"
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </a>
            </nav>
          </div>
        </motion.div>
      )}
      
      {/* Subheader with Date and Path Info */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-gray-600 text-sm">{today}</div>
          <div className="text-sm text-gray-500">
            <span className="text-green-600 font-medium">Teacher Portal</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 container mx-auto">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-gray-600 text-sm">
        <div className="container mx-auto px-4">
          <p>© 2025 AttendEase | Teacher Portal</p>
          <p className="text-xs mt-1 text-gray-500">Making attendance tracking simple and efficient</p>
        </div>
      </footer>
    </div>
  );
};

export default TeacherLayout;
