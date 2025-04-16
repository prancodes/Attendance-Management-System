import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import StudentCard from './StudentCard'
import { getAttendance } from '../../utils/storage'
import { format } from 'date-fns'

const AttendanceGrid = ({ classId, date, onAttendanceChange }) => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Format date as YYYY-MM-DD for storage key
  const dateKey = date instanceof Date ? format(date, 'yyyy-MM-dd') : '';

  useEffect(() => {
    // Reset loading state when classId or date changes
    setLoading(true);
    
    // Simulate fetching students for this class
    setTimeout(() => {
      // Check if we have saved attendance data for this class and date
      const savedAttendance = getAttendance(classId, dateKey);
      
      if (savedAttendance && savedAttendance.length > 0) {
        // Use saved data if available
        setStudents(savedAttendance);
        setLoading(false);
        // Notify parent component of the current attendance data
        if (onAttendanceChange) {
          onAttendanceChange(savedAttendance);
        }
        return;
      }
      
      // Otherwise use mock data
      const mockStudents = [
        { id: '27', name: 'Pranjal Singh', status: 'not_marked' },
        { id: '28', name: 'Prathamesh Singh', status: 'not_marked' },
        { id: '29', name: 'Pushkar Singh', status: 'not_marked' },
        { id: '30', name: 'Shreyansh Singh', status: 'not_marked' },
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
      
      // Notify parent component of the initial data
      if (onAttendanceChange) {
        onAttendanceChange(mockStudents);
      }
    }, 600) // Reduced timeout for better UX
  }, [classId, dateKey, onAttendanceChange])

  const handleStatusChange = useCallback((studentId, newStatus) => {
    const updatedStudents = students.map(student => 
      student.id === studentId ? { ...student, status: newStatus } : student
    );
    setStudents(updatedStudents);
    
    // Notify parent component of the updated attendance data
    if (onAttendanceChange) {
      onAttendanceChange(updatedStudents);
    }
  }, [students, onAttendanceChange]);

  const markAll = useCallback((status) => {
    const updatedStudents = students.map(student => ({ ...student, status }));
    setStudents(updatedStudents);
    
    // Notify parent component of the updated attendance data
    if (onAttendanceChange) {
      onAttendanceChange(updatedStudents);
    }
  }, [students, onAttendanceChange]);

  const clearAll = useCallback(() => {
    const updatedStudents = students.map(student => ({ ...student, status: 'not_marked' }));
    setStudents(updatedStudents);
    
    // Notify parent component of the updated attendance data
    if (onAttendanceChange) {
      onAttendanceChange(updatedStudents);
    }
  }, [students, onAttendanceChange]);

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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAll}
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded-lg"
            >
              Clear All
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