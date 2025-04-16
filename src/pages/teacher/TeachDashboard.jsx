// src/pages/teacher/TeachDashboard.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaClipboardCheck,
} from "react-icons/fa";
import Card from "../../components/ui/Card";
import { getAttendanceRecords, getAttendance } from "../../utils/storage";

const TeachDashboard = () => {
  const [stats, setStats] = useState(null);
  const [attendanceSummary, setAttendanceSummary] = useState({
    today: 0,
    weekly: 0,
    monthly: 0,
  });

  useEffect(() => {
    // Load attendance data from localStorage
    const records = getAttendanceRecords();

    // Calculate attendance rates from stored data
    if (records.length > 0) {
      let totalPresent = 0;
      let totalStudents = 0;

      // Process each attendance record
      records.forEach((record) => {
        const attendanceData = getAttendance(record.classId, record.date);
        if (attendanceData) {
          const presentCount = attendanceData.filter(
            (student) => student.status === "present"
          ).length;
          totalPresent += presentCount;
          totalStudents += attendanceData.length;
        }
      });

      // Calculate overall attendance rate
      const overallRate =
        totalStudents > 0
          ? Math.round((totalPresent / totalStudents) * 100)
          : 0;

      // For simplicity, we'll use the same rate for today, weekly, and monthly,
      // but in a real app you would filter records by date
      setAttendanceSummary({
        today: overallRate,
        weekly: Math.max(overallRate - 5, 0), // Just for variation
        monthly: Math.min(overallRate + 2, 100), // Just for variation
      });
    }

    // Simulate loading stats
    setTimeout(() => {
      setStats({
        classes: 6,
        students: 180,
        attendanceRate: attendanceSummary.monthly || 94,
        upcomingClasses: [
          {
            id: "101",
            name: "Mathematics 101",
            time: "10:00 AM",
            room: "A-201",
          },
          { id: "203", name: "Physics 203", time: "11:30 AM", room: "B-105" },
          {
            id: "304",
            name: "Computer Science 304",
            time: "2:15 PM",
            room: "C-302",
          },
        ],
      });
    }, 800);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, Ms. Johnson
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your classes today.
        </p>
      </div>

      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-indigo-100 mr-4">
            <FaChalkboardTeacher className="text-indigo-600 text-xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{stats.classes}</h2>
            <p className="text-gray-500 text-sm">Classes</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 mr-4">
            <FaUserGraduate className="text-green-600 text-xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{stats.students}</h2>
            <p className="text-gray-500 text-sm">Students</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 mr-4">
            <FaClipboardCheck className="text-yellow-600 text-xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">
              {attendanceSummary.monthly || stats.attendanceRate}%
            </h2>
            <p className="text-gray-500 text-sm">Attendance Rate</p>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Today's Classes</h2>
              <Link
                to="/teacher/classes"
                className="text-indigo-600 text-sm hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {stats.upcomingClasses.map((cls, index) => (
                <motion.div
                  key={cls.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{cls.name}</h3>
                    <p className="text-sm text-gray-500">Room {cls.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-indigo-600 font-medium">{cls.time}</p>
                    <Link
                      to={`/teacher/attendance/${cls.id}`}
                      className="text-xs text-indigo-500 hover:underline"
                    >
                      Take Attendance
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <h2 className="text-lg font-semibold mb-4">Attendance Summary</h2>

            <div className="relative pt-1">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">
                  Today's attendance rate
                </p>
                <div className="w-full h-2 bg-gray-200 rounded">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${attendanceSummary.today || 92}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-green-500 rounded"
                  ></motion.div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span className="font-medium text-green-600">
                    {attendanceSummary.today || 92}%
                  </span>
                  <span>100%</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Weekly average</p>
                <div className="w-full h-2 bg-gray-200 rounded">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${attendanceSummary.weekly || 87}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="h-full bg-indigo-500 rounded"
                  ></motion.div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span className="font-medium text-indigo-600">
                    {attendanceSummary.weekly || 87}%
                  </span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Monthly average</p>
                <div className="w-full h-2 bg-gray-200 rounded">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${attendanceSummary.monthly || 94}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                    className="h-full bg-blue-500 rounded"
                  ></motion.div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span className="font-medium text-blue-600">
                    {attendanceSummary.monthly || 94}%
                  </span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeachDashboard;