'use client'

import StandingsBar from "./StandingsBar"
import type { DriverInfo, ConstructorInfo } from '@/lib/types'
import { useF1Data } from '@/context/F1DataContext'

type StandingsEntry = ConstructorInfo | DriverInfo

function isConstructor(entry: StandingsEntry): entry is ConstructorInfo {
  return 'constructorId' in entry
}

export default function Standings({ standings = [] }: { standings: StandingsEntry[] }) {
  const { races } = useF1Data()

  const maxPoints = standings.reduce((max, c) => {
    const points = parseFloat(c.points)
    return points > max ? points : max
  }, 0)

  const latestCompletedRace = [...races]
    .filter(r => r.raceStatus === 'Completed')
    .at(-1)

  const latestDriverPoints: Record<string, number> = {}
  latestCompletedRace?.Results?.forEach(result => {
    latestDriverPoints[result.Driver.driverId] = parseFloat(result.points)
  })

  return (
    <section>
      <ul>
        {standings.map((entry) => {
          const key = isConstructor(entry) ? entry.constructorId : entry.Driver.driverId
          const deltaPoints = isConstructor(entry)
            ? 0
            : latestDriverPoints[entry.Driver.driverId] ?? 0

          return (
            <li key={key}>
              <StandingsBar
                entry={entry}
                maxPoints={maxPoints}
                deltaPoints={deltaPoints}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
