'use client'

import { ChevronDown, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getFlagUrl } from "@/lib/flag"
import { useMapStore } from '@/lib/mapStore'
import { RaceWithResults } from "@/lib/types"
import RaceResultsTable from "@/components/Races/RaceResultsTable"

function getRaceStatus(race: RaceWithResults): string {
  if (race.raceStatus !== 'Completed') {
    const start = new Date(`${race.date}T${race.time || '00:00:00Z'}`).getTime()
    const now = Date.now()
    const end = start + 3 * 60 * 60 * 1000

    if (now >= start && now <= end) {
      return 'In Progress'
    }
  }

  return race.raceStatus
}

export default function RaceCard({
  race,
  isExpanded,
  onToggle,
}: {
  race: RaceWithResults
  isExpanded: boolean
  onToggle: () => void
}) {
  const { setFocus } = useMapStore()
  const date = new Date(`${race.date}T${race.time || '00:00:00Z'}`)

  return (
    <motion.div
      whileHover={isExpanded ? {} : { scale: 1.01, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
      whileTap={{ scale: 0.99 }}
      animate={{
        scale: 1,
        boxShadow: isExpanded
          ? '0px 4px 10px rgba(0, 0, 0, 0.3)'
          : '0px 0px 0px rgba(0, 0, 0, 0)',
      }}
      transition={{ type: 'spring', stiffness: 600, damping: 40 }}
      className="p-1 rounded-lg bg-black/25 shadow-md overflow-hidden"
      onClick={onToggle}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2 pl-1">
          <span className={`inline-block bg-black/25 font-semibold rounded-md transition-all duration-300
      ${isExpanded ? 'px-3 py-1.5 text-md' : 'px-1.5 py-0.5 text-sm'}`}>
            R{race.round}
          </span>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-xs md:text-xl font-bold">
                {race.raceName.replace(/grand prix/i, 'GP')}
              </h2>
              {getFlagUrl(race.Circuit.Location.country) && (
                <img
                  src={getFlagUrl(race.Circuit.Location.country) ?? ''}
                  alt={`${race.Circuit.Location.country} flag`}
                  className="w-6 h-4 object-cover rounded-sm"
                  loading="lazy"
                />
              )}
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold text-gray-300
                ${getRaceStatus(race) === 'Completed' && 'bg-black/25'}
                ${getRaceStatus(race) === 'Next Up' && 'bg-green-700'}
                ${getRaceStatus(race) === 'Upcoming' && 'bg-blue-700'}
                ${getRaceStatus(race) === 'In Progress' && 'bg-red-600'}`}>
                <span className="block md:hidden">
                  {getRaceStatus(race).charAt(0).toUpperCase()}
                </span>
                <span className="hidden md:block">
                  {getRaceStatus(race)}
                </span>
              </span>
            </div>
            {isExpanded && (
              <p className="text-[10px] text-gray-300">
                {race.Circuit.circuitName}, {race.Circuit.Location.locality}
              </p>
            )}
          </div>
        </div>

        {/* Animated Wiki & Map buttons */}
        <div className="flex items-center gap-2 mr-2">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="hidden md:flex flex items-center gap-2"
              >
                <a
                  href={race.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block p-0.5 bg-white text-black rounded-md hover:bg-gray-400 transition"
                >
                  <img
                    src={`/icons/wikipedia.svg`}
                    alt={`wiki logo`}
                    className="w-6 h-6"
                  />
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setFocus({
                      lat: race.Circuit.Location.lat,
                      long: race.Circuit.Location.long,
                    })
                  }}
                  className="inline-block p-0.5 bg-white text-black rounded-md hover:bg-gray-400 transition"
                >
                  <MapPin className="w-6 h-6 text-black" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col items-end ml-auto mr-1 md:text-xs text-[8px] text-gray-300 whitespace-nowrap">
            <span>{date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</span>
            <span>{date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </div>

      {/* Expandable Section */}
      <motion.div
        initial={false}
        animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <section className="px-1 overflow-x-auto">
          {race.Results && race.Results.length > 0 ? (
            <RaceResultsTable results={race} />
          ) : (
            <p className="text-xs text-gray-300">No results to display yet.</p>
          )}
        </section>
      </motion.div>
    </motion.div>
  )
}
