import { motion } from 'framer-motion'
import type { ConstructorInfo } from '@/lib/types'

export default function ConstructorCard({ constructor }: { constructor: ConstructorInfo }) {
  const maxPoints = 460
  const barWidth = (parseFloat(constructor.points) / maxPoints) * 100
  const showOutside = barWidth < 12

  return (
    <div className="relative rounded-lg text-white">
      <div className="flex items-center">
        <img
          src={`/team-logos/${constructor.constructorId.toLowerCase()}.svg`}
          alt={`${constructor.constructorId} logo`}
          className="w-8 h-8 object-contain mr-1"
        />

        <div className="flex flex-1">
          <motion.div
            className="h-8 rounded-md bg-stone-700 border-2 border-black"
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ duration: 0.6 }}
          >
            {!showOutside && (
              <div className="h-full flex items-center justify-end mr-1 text-sm font-semibold select-none whitespace-nowrap">
                {constructor.points} pts. {showOutside}
              </div>
            )}
          </motion.div>

          {showOutside && (
            <div className="flex flex-row items-center text-left ml-1 text-sm font-semibold select-none whitespace-nowrap">
              {constructor.points} pts.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
