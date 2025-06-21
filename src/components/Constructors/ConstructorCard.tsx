'use client'

import { motion } from 'framer-motion'

type ConstructorCardProps = {
  constructorId: string
  name: string
  position: string
  points: string
}

export default function ConstructorCard({ constructorId, name, position, points }: ConstructorCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 600, damping: 40}}
      className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl text-white transition-colors duration-200"
    >
      <div className="flex justify-between items-center text-white">
        <div>
          <p className="text-sm text-gray-400">#{position}</p>
          <h3 className="text-lg font-semibold">
            {name}
          </h3>
        </div>
        <p className="text-sm text-blue-400 font-medium">Points: {points}</p>
      </div>
    </motion.div>
  )
}