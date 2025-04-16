import { motion } from 'framer-motion'

const Card = ({ children, className = '', onClick, animate = true, ...props }) => {
  const CardComponent = animate ? motion.div : 'div'
  
  return (
    <CardComponent
      whileHover={animate ? { y: -5 } : undefined}
      className={`bg-white rounded-xl shadow-sm p-6 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </CardComponent>
  )
}

export default Card