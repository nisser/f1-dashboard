'use client'

import { motion } from 'framer-motion'

type DriverCardProps = {
  givenName: string
  familyName: string
  position: string
  points: string
  teamName: string
}

const getPositionColor = (position: string) => {
  switch (position) {
    case "1":
      return "bg-yellow-400 text-white";
    case "2":
      return "bg-gray-300 text-white";
    case "3":
      return "bg-amber-700 text-white";
    default:
      return "bg-stone-700 text-white";
  }
}

export default function DriverCard({ givenName, familyName, position, points, teamName }: DriverCardProps) {
  const teamVar = `--team-${teamName.toLowerCase().replace(/\s/g, '')}`;
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 600, damping: 40 }}
      className="relative rounded-lg overflow-hidden"
    >
      <div
        className="p-2 relative z-10 text-white transition-colors duration-200"
        style={{ background: `rgb(var(${teamVar}), 1)` }}
      >
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <span
              className={`flex items-center justify-center aspect-square w-6 h-6 rounded-full font-bold text-xs ${getPositionColor(position)}`}
              style={{ minWidth: '1.5rem', minHeight: '1.5rem' }}
            >
              {position}
            </span>
            <div>
              <h3 className="text-base font-semibold">
                {givenName} {familyName}
              </h3>
              <p className="text-[10px] text-gray-300">{teamName}</p>
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