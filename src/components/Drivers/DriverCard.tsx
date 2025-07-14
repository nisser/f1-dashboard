'use client'

import { motion } from 'framer-motion'
import { getFlagUrl } from "@/lib/flag"
import type { DriverInfo } from '@/lib/types'

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

export default function DriverCard({ driver }: { driver: DriverInfo }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
      transition={{ type: 'spring', stiffness: 600, damping: 40 }}
      className="relative rounded-lg overflow-hidden"
    >
      <div
        className="p-2 relative z-10 text-white transition-colors duration-200 bg-black/25"
      >
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center">
            <span
              className={`flex items-center justify-center aspect-square w-6 h-6 rounded-full font-bold text-xs text-white ${getPositionColor(driver.position)}`}
              style={{ minWidth: '1.5rem', minHeight: '1.5rem' }}
            >
              {driver.position}
            </span>
            <div className="ml-2">
              <div className="flex items-center space-x-1">
                <h3 className="text-base font-semibold">
                  {driver.Driver.givenName} {driver.Driver.familyName}
                </h3>
                {getFlagUrl(driver.Driver.nationality) && (
                  <img
                    src={getFlagUrl(driver.Driver.nationality) ?? ''}
                    alt={`${driver.Driver.nationality} flag`}
                    className="w-4 h-3 rounded-sm object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <p className="text-[10px] text-gray-300">{driver.Constructors[driver.Constructors.length-1].name}</p>
            </div>
          </div>
          <div>
            <span className="font-bold text-sm text-white">{driver.points}</span>
            <p className="text-[10px] text-gray-300 text-right">pts.</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}