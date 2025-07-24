import { motion } from 'framer-motion'
import type { ConstructorInfo } from '@/lib/types'

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

export default function ConstructorCard({ constructor, maxPoints }: { constructor: ConstructorInfo, maxPoints: number }) {
  const barWidth = (parseFloat(constructor.points) / maxPoints) * 100
  const showOutside = barWidth < 13

  return (
    <div className="relative rounded-lg text-white">
      <div className="flex items-center pb-1.5">
        <span className={`flex items-center justify-center w-6 h-6 rounded-full font-semibold text-md mr-1 ${getPositionColor(constructor.position)}`}>
          {constructor.position}
        </span>
        <div className="flex flex-1 flex-col">
          <div className="flex">
            <img
              src={`/team-logos/${constructor.constructorId.toLowerCase()}.svg`}
              alt={`${constructor.constructorId} logo`}
              className="w-4 h-4"
            />
            <p className='text-xs pl-1'>{constructor.name}</p>
          </div>
          <div className="flex flex-1 mt-[2px]">
            <motion.div
              className="h-4 rounded-md border-1 border-black"
              style={{ backgroundColor: `var(--${constructor.constructorId.toLowerCase()})` }}
              initial={{ width: 0 }}
              animate={{ width: `${barWidth}%` }}
              transition={{ duration: 0.6 }}
            >
              {!showOutside && (
                <div className="h-full flex items-center justify-end mr-1 text-xs font-semibold select-none whitespace-nowrap">
                  {constructor.points} pts. {showOutside}
                </div>
              )}
            </motion.div>

            {showOutside && (
              <div className="flex flex-row items-center text-left ml-1 text-xs font-semibold select-none whitespace-nowrap">
                {constructor.points} pts.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
