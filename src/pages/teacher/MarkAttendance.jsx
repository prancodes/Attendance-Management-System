// src/pages/teacher/MarkAttendance.jsx
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { format } from 'date-fns'
import Button from '../../components/ui/Button'
import AttendanceGrid from '../../components/attendance/AttendanceGrid'
import { saveAttendance } from '../../utils/storage'

const MarkAttendance = () => {
  const { classId } = useParams()
  const navigate = useNavigate()
  const [classInfo, setClassInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [attendanceData, setAttendanceData] = useState([])

  useEffect(() => {
    // Simulate loading class info
    setTimeout(() => {
      // This would be an API call in a real app
      const mockClassInfo = {
        id: classId || '101',
        name: 'Mathematics 101',
        students: 32,
        time: '10:00 AM - 11:30 AM',
        room: 'A-201',
        teacher: 'Ms. Johnson'
      }
      setClassInfo(mockClassInfo)
      setLoading(false)
    }, 800)
  }, [classId])

  const handleDateChange = (offset) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() + offset)
    setSelectedDate(newDate)
  }

  const handleAttendanceChange = useCallback((data) => {
    setAttendanceData(data)
  }, [])

  const handleSubmit = () => {
    if (!attendanceData.length || !classInfo) {
      console.error('Missing attendance data or class info')
      return
    }

    // Format date as YYYY-MM-DD for storage
    const dateKey = format(selectedDate, 'yyyy-MM-dd')
    
    // Save attendance data to localStorage immediately
    const saveResult = saveAttendance(
      classInfo.id, 
      dateKey, 
      attendanceData
    )
    
    if (saveResult) {
      // Get statistics for the confirmation page
      const stats = getAttendanceStats(attendanceData)
      
      // Navigate to confirmation page with state
      navigate('/teacher/confirmation', {
        state: {
          classId: classInfo.id,
          className: classInfo.name,
          date: dateKey,
          stats: stats
        }
      })
    } else {
      // In a real app, you might want to show an error message
      console.error('Failed to save attendance data')
      alert('There was an error saving the attendance data. Please try again.')
    }
  }
  
  // Helper function to get attendance statistics
  const getAttendanceStats = (data) => {
    const stats = { present: 0, absent: 0, late: 0, excused: 0, notMarked: 0 }
    
    data.forEach(student => {
      if (student.status === 'present') stats.present++
      else if (student.status === 'absent') stats.absent++
      else if (student.status === 'late') stats.late++
      else if (student.status === 'excused') stats.excused++
      else stats.notMarked++
    })
    
    return stats
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow p-6 mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{classInfo.name}</h1>
            <p className="text-gray-600">Room {classInfo.room} • {classInfo.time}</p>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate('/teacher/classes')}
          >
            Back to Classes
          </Button>
        </div>
        
        <div className="flex items-center justify-center space-x-4 py-3">
          <button
            onClick={() => handleDateChange(-1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>
          
          <div className="flex items-center bg-indigo-50 px-4 py-2 rounded-lg">
            <FaCalendarAlt className="text-indigo-600 mr-2" />
            <span className="text-indigo-700 font-medium">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </span>
          </div>
          
          <button
            onClick={() => handleDateChange(1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FaChevronRight className="text-gray-600" />
          </button>
        </div>
      </motion.div>
      
      <AttendanceGrid 
        classId={classInfo.id} 
        date={selectedDate}
        onAttendanceChange={handleAttendanceChange}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex justify-end"
      >
        <Button 
          variant="success" 
          size="lg" 
          onClick={handleSubmit}
          disabled={!attendanceData.length}
        >
          Submit Attendance
        </Button>
      </motion.div>
    </div>
  )
}

export default MarkAttendance