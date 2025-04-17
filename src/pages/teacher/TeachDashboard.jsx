// src/pages/teacher/TeachDashboard.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaClipboardCheck,
} from 'react-icons/fa'
import Card from '../../components/ui/Card'
import { getUsers } from '../../utils/authStorage'
import {
  getAttendanceRecords,
  getAttendance,
} from '../../utils/storage'

export default function TeachDashboard() {
  const [classList, setClassList] = useState([])
  const [stats, setStats] = useState({ classes: 0, students: 0 })
  const [attendanceSummary, setAttendanceSummary] = useState({
    today: 0,
    weekly: 0,
    monthly: 0,
  })

  // Build classes & stats
  useEffect(() => {
    const students = getUsers().filter(u => u.role === 'student')

    // Unique branch-division combos
    const combos = Array.from(
      new Set(students.map(s => `${s.branch}-${s.division}`))
    )

    const list = combos.map(id => {
      const [branch, division] = id.split('-')
      const count = students.filter(
        s => s.branch === branch && s.division === division
      ).length

      return {
        id,
        name: `${branch} Division ${division}`,
        students: count,
      }
    })

    setClassList(list)
    setStats({ classes: list.length, students: students.length })
  }, [])

  // Calculate attendance rates
  useEffect(() => {
    const records = getAttendanceRecords()
    let totalPresent = 0,
      totalMarked = 0

    records.forEach(r => {
      const data = getAttendance(r.classId, r.date)
      if (data) {
        totalPresent += data.filter(s => s.status === 'present').length
        totalMarked += data.length
      }
    })

    const rate = totalMarked
      ? Math.round((totalPresent / totalMarked) * 100)
      : 0

    // For demo, use same rate across all periods
    setAttendanceSummary({
      today: rate,
      weekly: rate,
      monthly: rate,
    })
  }, [])

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto p-6"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, Ms. Johnson
        </h1>
        <p className="text-gray-600">
          Here's your overview for today.
        </p>
      </div>

      {/* Stats Cards */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <Card className="flex items-center p-4">
          <div className="p-3 rounded-full bg-indigo-100 mr-4">
            <FaChalkboardTeacher className="text-indigo-600 text-xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{stats.classes}</h2>
            <p className="text-gray-500 text-sm">Classes</p>
          </div>
        </Card>

        <Card className="flex items-center p-4">
          <div className="p-3 rounded-full bg-green-100 mr-4">
            <FaUserGraduate className="text-green-600 text-xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{stats.students}</h2>
            <p className="text-gray-500 text-sm">Students</p>
          </div>
        </Card>

        <Card className="flex items-center p-4">
          <div className="p-3 rounded-full bg-yellow-100 mr-4">
            <FaClipboardCheck className="text-yellow-600 text-xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">
              {attendanceSummary.monthly}%
            </h2>
            <p className="text-gray-500 text-sm">Attendance Rate</p>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Classes */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Classes</h2>
              <Link
                to="/teacher/classes"
                className="text-indigo-600 text-sm hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {classList.map((cls, idx) => (
                <motion.div
                  key={cls.id}
                  variants={item}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{cls.name}</h3>
                    <p className="text-sm text-gray-500">
                      {cls.students} Students
                    </p>
                  </div>
                  <Link
                    to={`/teacher/attendance/${cls.id}`}
                    className="text-indigo-600 hover:underline text-sm"
                  >
                    Take Attendance
                  </Link>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Attendance Summary */}
        <motion.div variants={item}>
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Attendance Summary</h2>
            {['today','weekly','monthly'].map((period, i) => (
              <div key={period} className="mb-6">
                <p className="text-sm text-gray-500 mb-1">
                  {period.charAt(0).toUpperCase() + period.slice(1)} rate
                </p>
                <div className="w-full h-2 bg-gray-200 rounded">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${attendanceSummary[period]}%` }}
                    transition={{ duration: 1, delay: i * 0.3 }}
                    className={`h-full rounded ${period === 'today'
                      ? 'bg-green-500'
                      : period === 'weekly'
                        ? 'bg-indigo-500'
                        : 'bg-blue-500'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span className="font-medium">
                    {attendanceSummary[period]}%
                  </span>
                  <span>100%</span>
                </div>
              </div>
            ))}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
