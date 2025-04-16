import { motion } from 'framer-motion'

const StatusBadge = ({ status, onClick }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'absent':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'late':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'excused':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusLabel = () => {
    switch (status) {
      case 'present':
        return 'Present'
      case 'absent':
        return 'Absent'
      case 'late':
        return 'Late'
      case 'excused':
        return 'Excused'
      default:
        return 'Not marked'
    }
  }

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`inline-block px-3 py-1 text-xs font-medium rounded-full border cursor-pointer ${getStatusStyles()}`}
    >
      {getStatusLabel()}
    </motion.span>
  )
}

export default StatusBadge