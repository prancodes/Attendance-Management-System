import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUsers, FaClock, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import Card from '../components/ui/Card'

const ClassSelection = () => {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading classes
    setTimeout(() => {
      const mockClasses = [
        { 
          id: '101', 
          name: 'Mathematics 101', 
          students: 32, 
          time: '10:00 AM - 11:30 AM', 
          room: 'A-201',
          days: 'Mon, Wed, Fri'
        },
        { 
          id: '203', 
          name: 'Physics 203', 
          students: 28, 
          time: '11:30 AM - 1:00 PM', 
          room: 'B-105',
          days: 'Tue, Thu'
        },
        { 
          id: '304', 
          name: 'Computer Science 304', 
          students: 30, 
          time: '2:15 PM - 3:45 PM', 
          room: 'C-302',
          days: 'Mon, Wed'
        },
        { 
          id: '152', 
          name: 'Chemistry 152', 
          students: 26, 
          time: '9:00 AM - 10:30 AM', 
          room: 'D-105',
          days: 'Tue, Thu'
        },
        { 
          id: '235', 
          name: 'Biology 235', 
          students: 24, 
          time: '1:00 PM - 2:30 PM', 
          room: 'E-201',
          days: 'Mon, Wed, Fri'
        },
        { 
          id: '408', 
          name: 'History 408', 
          students: 28, 
          time: '3:30 PM - 5:00 PM', 
          room: 'F-102',
          days: 'Tue, Thu'
        },
      ]
      setClasses(mockClasses)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Classes</h1>
        <p className="text-gray-600">Select a class to take attendance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls, index) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <h2 className="text-xl font-semibold mb-4">{cls.name}</h2>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <FaUsers className="mr-2 text-indigo-500" />
                  <span>{cls.students} Students</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaClock className="mr-2 text-indigo-500" />
                  <span>{cls.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                  <span>Room {cls.room}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaCalendarAlt className="mr-2 text-indigo-500" />
                  <span>{cls.days}</span>
                </div>
              </div>
              
              <Link 
                to={`/teacher/attendance/${cls.id}`}
                className="block w-full"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Take Attendance
                </motion.button>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ClassSelection