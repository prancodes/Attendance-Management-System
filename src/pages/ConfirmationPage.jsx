import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import Button from '../components/ui/Button'

const ConfirmationPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the data passed from the MarkAttendance component
  const { className = 'Mathematics 101', date, stats } = location.state || {}
  
  return (
    <div className="max-w-lg mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="bg-white rounded-xl shadow-lg p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <FaCheckCircle className="text-green-500 text-6xl" />
          </motion.div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Attendance Submitted!</h1>
        <p className="text-gray-600 mb-4">
          The attendance for {className} has been successfully recorded.
          {date && <span className="block mt-1">Date: {date}</span>}
        </p>
        
        {stats && (
          <div className="mb-6 grid grid-cols-2 gap-2 text-left">
            <div className="bg-green-50 p-2 rounded">
              <span className="text-green-600 font-medium">Present:</span> {stats.present}
            </div>
            <div className="bg-red-50 p-2 rounded">
              <span className="text-red-600 font-medium">Absent:</span> {stats.absent}
            </div>
            <div className="bg-yellow-50 p-2 rounded">
              <span className="text-yellow-600 font-medium">Late:</span> {stats.late}
            </div>
            <div className="bg-blue-50 p-2 rounded">
              <span className="text-blue-600 font-medium">Excused:</span> {stats.excused}
            </div>
          </div>
        )}
        
        <div className="flex flex-col space-y-3">
          <Button 
            onClick={() => navigate('/teacher/dashboard')}
            variant="primary"
            size="lg"
          >
            Return to Dashboard
          </Button>
          
          <Button 
            onClick={() => navigate('/teacher/classes')}
            variant="outline"
            size="lg"
          >
            Mark Another Class
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default ConfirmationPage