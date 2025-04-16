import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import Button from '../components/ui/Button'

const ConfirmationPage = () => {
  const navigate = useNavigate()

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
        <p className="text-gray-600 mb-8">
          The attendance for Mathematics 101 has been successfully recorded.
        </p>
        
        <div className="flex flex-col space-y-3">
          <Button 
            onClick={() => navigate('/')}
            variant="primary"
            size="lg"
          >
            Return to Dashboard
          </Button>
          
          <Button 
            onClick={() => navigate('/classes')}
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