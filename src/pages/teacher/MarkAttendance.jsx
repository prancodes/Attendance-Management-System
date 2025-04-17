// src/pages/teacher/MarkAttendance.jsx
import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa'
import { format } from 'date-fns'
import Button from '../../components/ui/Button'
import { saveAttendance } from '../../utils/storage'
import { getUsers } from '../../utils/authStorage'

export default function MarkAttendance() {
  const { classId } = useParams()      // e.g. "IT-C"
  const navigate   = useNavigate()

  const [loading, setLoading]           = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [attendanceData, setAttendanceData] = useState([])
  const [classInfo, setClassInfo]       = useState({ id: '', name: '', students: 0 })

  useEffect(() => {
    // 1. Parse branch & division
    const [branch, division] = classId.split('-')

    // 2. Fetch students in that class
    const students = getUsers().filter(
      u => u.role === 'student' &&
           u.branch === branch &&
           u.division === division
    )

    // 3. Set class info and initial attendance states
    setClassInfo({
      id:       classId,
      name:     `${branch} Division ${division}`,
      students: students.length
    })

    setAttendanceData(
      students.map(s => ({
        id:     s.userId,
        name:   s.name,
        status: 'notMarked'
      }))
    )

    setLoading(false)
  }, [classId])

  const handleDateChange = offset => {
    const d = new Date(selectedDate)
    d.setDate(d.getDate() + offset)
    setSelectedDate(d)
  }

  const handleStatusChange = useCallback((id, status) => {
    setAttendanceData(data =>
      data.map(rec =>
        rec.id === id ? { ...rec, status } : rec
      )
    )
  }, [])

  const handleSubmit = () => {
    if (!attendanceData.length) return
    const dateKey = format(selectedDate, 'yyyy-MM-dd')
    const ok = saveAttendance(classInfo.id, dateKey, attendanceData)
    if (ok) {
      navigate('/teacher/confirmation', {
        state: { classId: classInfo.id, className: classInfo.name, date: dateKey }
      })
    } else {
      alert('Error saving attendance. Try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{classInfo.name}</h1>
        <Button variant="outline" onClick={() => navigate('/teacher/classes')}>
          Back to Classes
        </Button>
      </div>

      {/* Date Picker */}
      <div className="flex items-center justify-center mb-6 space-x-4">
        <button onClick={() => handleDateChange(-1)} className="p-2 rounded-full hover:bg-gray-100">
          <FaChevronLeft />
        </button>
        <div className="flex items-center bg-indigo-50 px-4 py-2 rounded-lg">
          <FaCalendarAlt className="mr-2 text-indigo-600" />
          <span className="font-medium text-indigo-700">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </span>
        </div>
        <button onClick={() => handleDateChange(1)} className="p-2 rounded-full hover:bg-gray-100">
          <FaChevronRight />
        </button>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Student ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map(rec => (
              <tr key={rec.id} className="hover:bg-gray-50">
                <td className="p-2 border">{rec.id}</td>
                <td className="p-2 border">{rec.name}</td>
                <td className="p-2 border">
                  <select
                    value={rec.status}
                    onChange={e => handleStatusChange(rec.id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                    <option value="excused">Excused</option>
                    <option value="notMarked">Not Marked</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit */}
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSubmit} variant="success" size="lg">
          Submit Attendance
        </Button>
      </div>
    </div>
  )
}
