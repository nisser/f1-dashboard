'use client'

import { motion } from 'framer-motion'

type ConstructorCardProps = {
  name: string
  points: string
  position: string
}

const getPositionColor = (position: string) => {
  switch (position) {
    case "1":
      return "bg-yellow-400";
    case "2":
      return "bg-gray-300";
    case "3":
      return "bg-amber-700";
    default:
      return "bg-stone-700";
  }
}

export default function ConstructorCard({ name, position, points }: ConstructorCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 600, damping: 40 }}
      className="relative rounded-lg overflow-hidden"
    >
      <div
        className="p-2 relative z-10 text-white transition-colors duration-200"
      >
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <span
              className={`flex items-center justify-center aspect-square w-6 h-6 rounded-full font-bold text-xs text-white ${getPositionColor(position)}`}
              style={{ minWidth: '1.5rem', minHeight: '1.5rem' }}
            >
              {position}
            </span>
            <div>
              <h3 className="text-base font-semibold">
                {name}
              </h3>
            </div>
          </div>
          <div>
            <span className="font-bold text-sm text-white">{points}</span>
            <p className="text-[10px] text-gray-300 text-right">pts.</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-25 z-0 pointer-events-none rounded-lg" />
    </motion.div>
  )
}