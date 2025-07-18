'use client'

import { ChevronDown, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { getFlagUrl } from "@/lib/flag"
import { useMapStore } from '@/lib/mapStore'
import { RaceWithResults } from "@/lib/types"
import RaceResultsTable from "@/components/Races/RaceResultsTable"

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
              <h2 className="text-xl font-bold">
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
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold text-gray-300
                ${race.raceStatus === 'Completed' && 'bg-black/25'}
                ${race.raceStatus === 'Next Up' && 'bg-green-700'}
                ${race.raceStatus === 'Upcoming' && 'bg-blue-700'}`} >
                {race.raceStatus}
              </span>
            </div>
            {isExpanded && (
              <p className="text-xs text-gray-300">
                {race.Circuit.circuitName}, {race.Circuit.Location.locality}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end ml-auto mr-1 text-xs text-gray-300">
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
          <div className='flex flex-row items-end ml-auto p-1'>
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
              className="inline-block p-0.5 ml-2 bg-white text-black rounded-md hover:bg-gray-400 transition"
            >
              <MapPin className="w-6 h-6 text-black" />
            </button>
          </div>
        </section>
      </motion.div>
    </motion.div>
  )
}
