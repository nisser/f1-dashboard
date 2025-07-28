import { motion } from 'framer-motion'
import type { DriverInfo, ConstructorInfo } from '@/lib/types'
import { getFlagUrl } from "@/lib/flag"

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

function isConstructor(entry: ConstructorInfo | DriverInfo): entry is ConstructorInfo {
  return 'Constructor' in entry
}

export default function StandingsBar({ entry, maxPoints }: { entry: ConstructorInfo | DriverInfo, maxPoints: number }) {
  const barWidth = (parseFloat(entry.points) / maxPoints) * 100
  const showOutside = barWidth < 13
const barColorStyle = isConstructor(entry)
  ? `var(--${entry.Constructor.constructorId.toLowerCase()})`
  : `var(--${entry.Constructors?.[entry.Constructors.length - 1]?.Constructor?.constructorId?.toLowerCase?.() ?? 'background'})`

  return (
    <div className="relative text-white whitespace-nowrap">
      <div className="flex items-center bg-black/25 rounded-md px-1 py-1 mb-1">
        <span className={`flex items-center justify-center w-6 h-6 rounded-full font-semibold text-l mr-1 ${getPositionColor(entry.position)}`}>
          {entry.position}
        </span>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center">
            {isConstructor(entry) ? (
              <img
                src={`/team-logos/${entry.Constructor.constructorId.toLowerCase()}.svg`}
                alt={`${entry.Constructor.name} logo`}
                className="w-4 h-4"
                loading="lazy"
              />
            ) : (
              <img
                src={getFlagUrl(entry.Driver.nationality) ?? ''}
                alt={`${entry.Driver.nationality} flag`}
                className="w-5 h-3 rounded-sm"
                loading="lazy"
              />
            )}
            <p className="text-xs pl-1 font-medium">
              {isConstructor(entry)
                ? entry.Constructor.name
                : `${entry.Driver.givenName} ${entry.Driver.familyName}`}
            </p>
          </div>
          <div className="flex flex-1 mt-[2px] text-xs font-semibold">
            <motion.div
              className="h-4 rounded-md border border-black overflow-hidden"
              style={{ backgroundColor: barColorStyle }}
              initial={{ width: 0 }}
              animate={{ width: `${barWidth}%` }}
              transition={{ duration: 1 }}
            >
              {!showOutside && (
                <div className="h-full flex items-center justify-end mr-1">
                  {entry.points} Pts.
                </div>
              )}
            </motion.div>

            {showOutside && (
              <div className="flex flex-row items-center text-left ml-1">
                {entry.points} Pts.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
