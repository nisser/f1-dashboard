'use client'

import StandingsBar from "./StandingsBar"
import type { ConstructorInfo } from '@/lib/types'

export default function Standings({ standings = [] }: { standings: ConstructorInfo[] }) {
  if (!standings.length) {
    return <div className="text-red-500">No standings available.</div>
  }

  const maxPoints = standings.reduce((max, c) => {
    const points = parseFloat(c.points)
    return points > max ? points : max
  }, 0)

  return (
    <section>
      <ul>
        {standings.map((entry) => (
          <li key={entry.constructorId}>
            <StandingsBar constructor={entry} maxPoints={maxPoints} />
          </li>
        ))}
      </ul>
    </section>
  )
}