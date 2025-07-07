'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion } from 'framer-motion'

type RaceCardProps = {
  race: {
    raceName: string
    date: string
    round: string
    url: string
    Circuit: {
      circuitName: string
      Location: {
        locality: string
        country: string
      }
    }
  }
}

export default function RaceCard({ race }: RaceCardProps) {
  const [expanded, setExpanded] = useState(false)

  const date = new Date(`${race.date}T${race.date || '00:00:00Z'}`)

  return (
    <motion.div
      whileHover={{ scale: 1.01, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 600, damping: 40 }}
      className="rounded-lg overflow-hidden"
    >
      <div className="p-4 rounded-lg bg-black/25 shadow-md" onClick={() => setExpanded((prev) => !prev)}>
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2">
            <span className="inline-block bg-black/25 text-sm font-semibold px-1.5 py-0.5 rounded-md">
              R{race.round}
            </span>
            <h2 className="text-xl font-bold">{race.raceName}</h2>
          </div>
          <button
            className="text-white transition"
            aria-label="Toggle Details"
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {/* Expandable content */}
        <div className={`transition-all duration-300 overflow-hidden ${expanded ? 'max-h-40 mt-2' : 'max-h-0'}`} >
          <p className="text-sm">
            {race.Circuit.Location.locality}, {race.Circuit.Location.country}
          </p>
          <p className="text-sm mt-1">
            {date.toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })} – {date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
          </p>
          <div className="text-sm text-gray-200 space-y-1">
            <p><strong>Circuit:</strong> {race.Circuit.circuitName}</p>
            <a
              href={race.url}
              className="text-blue-400 underline inline-block"
              target="_blank"
            >
              More info
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
