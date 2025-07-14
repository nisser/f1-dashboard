import { motion } from 'framer-motion'
import type { ConstructorInfo } from '@/lib/types'

export default function ConstructorCard({ constructor }: { constructor: ConstructorInfo }) {
  const getPositionColor = (pos: string) => {
    switch (pos) {
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

  return (
    <motion.div
      whileHover={{ scale: 1.01, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
      transition={{ type: 'spring', stiffness: 600, damping: 40 }}
      className="relative rounded-lg overflow-hidden"
    >
      <div className="p-2 relative z-10 text-white transition-colors duration-200">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <span
              className={`flex items-center justify-center aspect-square w-6 h-6 rounded-full font-bold text-xs text-white ${getPositionColor(constructor.position)}`}
              style={{ minWidth: '1.5rem', minHeight: '1.5rem' }}
            >
              {constructor.position}
            </span>
            <div>
              <h3 className="text-base font-semibold">{constructor.name}</h3>
            </div>
          </div>
          <div>
            <span className="font-bold text-sm text-white">{constructor.points}</span>
            <p className="text-[10px] text-gray-300 text-right">pts.</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-25 z-0 pointer-events-none rounded-lg" />
    </motion.div>
  )
}