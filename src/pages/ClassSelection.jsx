// src/pages/ClassSelection.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUsers } from 'react-icons/fa'
import Card from '../components/ui/Card'
import { getUsers } from '../utils/authStorage'  // ← new import

export default function ClassSelection() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Grab all users, filter only students
    const users    = getUsers()
    const students = users.filter(u => u.role === 'student')

    // 2. Build unique "branch-division" combos
    const combos = Array.from(
      new Set(students.map(s => `${s.branch}-${s.division}`))
    )

    // 3. Map each combo to a class entry
    const classList = combos.map(id => {
      const [branch, division] = id.split('-')
      const count = students.filter(
        s => s.branch === branch && s.division === division
      ).length

      return {
        id,
        name:     `${branch} Division ${division}`,
        students: count
      }
    })

    setClasses(classList)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Classes</h1>
      <p className="text-gray-600 mb-6">Select a class to take attendance</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls, idx) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <Card className="h-full">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">{cls.name}</h2>
                <p className="text-sm text-gray-600">
                  <FaUsers className="inline-block mr-1 text-indigo-500" />
                  {cls.students} Students
                </p>
              </div>
              <Link to={`/teacher/attendance/${cls.id}`}>
                <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                  Take Attendance
                </button>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
