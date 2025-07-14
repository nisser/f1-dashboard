'use client'

import RaceCard from "./RaceCard"
import { useState } from 'react'
import { RaceWithResults } from "@/lib/types"

export default function RaceList({ races }: { races: RaceWithResults[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <section
      className="flex flex-col gap-1 m-1 bg-black/40 rounded-lg p-2"
      style={{ width: '66.6666%' }}
    >
      {races.map((race) => (
        <RaceCard
          key={race.round}
          race={race}
          isExpanded={expandedId === Number(race.round)}
          onToggle={() =>
            setExpandedId(expandedId === Number(race.round) ? null : Number(race.round))
          }
        />
      ))}
    </section>
  )
}
