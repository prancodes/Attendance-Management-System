import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StudentCard from './StudentCard'

const AttendanceGrid = ({ classId, date }) => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching students for this class
    setTimeout(() => {
      const mockStudents = [
        { id: '1001', name: 'Alex Johnson', status: 'not_marked' },
        { id: '1002', name: 'Maria Garcia', status: 'not_marked' },
        { id: '1003', name: 'David Chen', status: 'not_marked' },
        { id: '1004', name: 'Sarah Miller', status: 'not_marked' },
        { id: '1005', name: 'James Wilson', status: 'not_marked' },
        { id: '1006', name: 'Emily Davis', status: 'not_marked' },
        { id: '1007', name: 'Robert Brown', status: 'not_marked' },
        { id: '1008', name: 'Jessica Lee', status: 'not_marked' },
        { id: '1009', name: 'Daniel Martinez', status: 'not_marked' },
        { id: '1010', name: 'Olivia Robinson', status: 'not_marked' },
        { id: '1011', name: 'Michael Taylor', status: 'not_marked' },
        { id: '1012', name: 'Sophia Thomas', status: 'not_marked' },
      ]
      setStudents(mockStudents)
      setLoading(false)
    }, 1000)
  }, [classId])

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, status: newStatus } : student
    ))
  }

  const markAll = (status) => {
    setStudents(students.map(student => ({ ...student, status })))
  }

  const getAttendanceStats = () => {
    const stats = { present: 0, absent: 0, late: 0, excused: 0, notMarked: 0 }
    
    students.forEach(student => {
      if (student.status === 'present') stats.present++
      else if (student.status === 'absent') stats.absent++
      else if (student.status === 'late') stats.late++
      else if (student.status === 'excused') stats.excused++
      else stats.notMarked++
    })
    
    return stats
  }

  const stats = getAttendanceStats()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Quick Actions</h2>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => markAll('present')}
              className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg"
            >
              All Present
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => markAll('absent')}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg"
            >
              All Absent
            </motion.button>
          </div>
        </div>
        
        <div className="grid grid-cols-5 gap-4">
          <div className="flex flex-col items-center bg-gray-50 rounded-lg p-3">
            <span className="text-gray-500 text-sm">Total</span>
            <span className="text-xl font-bold">{students.length}</span>
          </div>
          <div className="flex flex-col items-center bg-green-50 rounded-lg p-3">
            <span className="text-green-500 text-sm">Present</span>
            <span className="text-xl font-bold">{stats.present}</span>
          </div>
          <div className="flex flex-col items-center bg-red-50 rounded-lg p-3">
            <span className="text-red-500 text-sm">Absent</span>
            <span className="text-xl font-bold">{stats.absent}</span>
          </div>
          <div className="flex flex-col items-center bg-yellow-50 rounded-lg p-3">
            <span className="text-yellow-500 text-sm">Late</span>
            <span className="text-xl font-bold">{stats.late}</span>
          </div>
          <div className="flex flex-col items-center bg-blue-50 rounded-lg p-3">
            <span className="text-blue-500 text-sm">Excused</span>
            <span className="text-xl font-bold">{stats.excused}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        {students.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <StudentCard 
              student={student} 
              onStatusChange={handleStatusChange} 
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AttendanceGrid