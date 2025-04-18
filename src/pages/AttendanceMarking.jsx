import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { format } from 'date-fns'
import Button from '../components/ui/Button'
import AttendanceGrid from '../components/attendance/AttendanceGrid'

const AttendanceMarking = () => {
  const { classId } = useParams()
  const navigate = useNavigate()
  const [classInfo, setClassInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    // Simulate loading class info
    setTimeout(() => {
      // This would be an API call in a real app
      const mockClassInfo = {
        id: classId,
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

  const handleSubmit = () => {
    // In a real app, this would save the attendance data
    navigate('/teacher/confirmation')
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
        classId={classId} 
        date={selectedDate}
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
        >
          Submit Attendance
        </Button>
      </motion.div>
    </div>
  )
}

export default AttendanceMarking