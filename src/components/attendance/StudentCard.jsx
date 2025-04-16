import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StatusBadge from './StatusBadge'

const StudentCard = ({ student, onStatusChange }) => {
  const [status, setStatus] = useState(student.status || 'not_marked')
  const [showOptions, setShowOptions] = useState(false)
  
  // Update local state when parent props change
  useEffect(() => {
    setStatus(student.status)
  }, [student.status])

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus)
    setShowOptions(false)
    onStatusChange(student.id, newStatus)
  }

  const getStatusColor = () => {
    switch (status) {
      case 'present': return 'border-l-4 border-l-green-500'
      case 'absent': return 'border-l-4 border-l-red-500'
      case 'late': return 'border-l-4 border-l-yellow-500'
      case 'excused': return 'border-l-4 border-l-blue-500'
      default: return 'border-l-4 border-l-gray-300'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-lg shadow-sm p-4 mb-3 flex items-center justify-between ${getStatusColor()}`}
    >
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
          <span className="text-indigo-700 font-medium">
            {student.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <h3 className="font-medium">{student.name}</h3>
          <p className="text-xs text-gray-500">ID: {student.id}</p>
        </div>
      </div>

      <div className="relative">
        <StatusBadge 
          status={status} 
          onClick={() => setShowOptions(!showOptions)} 
        />
        
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg z-10 border overflow-hidden w-32"
          >
            {['not_marked', 'present', 'absent', 'late', 'excused'].map((option) => (
              <div 
                key={option}
                onClick={() => handleStatusChange(option)}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${status === option ? 'bg-gray-100' : ''}`}
              >
                {option === 'not_marked' ? 'Not marked' : option.charAt(0).toUpperCase() + option.slice(1)}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default StudentCard