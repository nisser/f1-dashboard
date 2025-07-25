'use client'

import StandingsBar from "./StandingsBar"
import type { DriverInfo, ConstructorInfo } from '@/lib/types'

type StandingsEntry = ConstructorInfo | DriverInfo

function isConstructor(entry: StandingsEntry): entry is ConstructorInfo {
  return 'constructorId' in entry
}

export default function Standings({ standings = [] }: { standings: StandingsEntry[] }) {
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
        {standings.map((entry) => {
          const key = isConstructor(entry) ? entry.constructorId : entry.Driver.driverId
          return (
            <li key={key}>
              <StandingsBar
                entry={entry}
                maxPoints={maxPoints}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}