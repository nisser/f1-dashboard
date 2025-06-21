'use client'

import DriverCard from "./DriverCard"

type DriverInfo = {
  position: string
  points: string
  Driver: {
    driverId: string
    givenName: string
    familyName: string
  }
}

type DriverListProps = {
  initialDriverStandings?: DriverInfo[]
}

export default function DriverStandings({ initialDriverStandings = [] }: DriverListProps) {
  if (!initialDriverStandings.length) {
    return <div className="text-red-500">No driver standings available.</div>
  }

  return (
    <section>
      <ul className="space-y-2">
        {initialDriverStandings.map((entry) => (
          <li key={entry.Driver.driverId}>
            <DriverCard
              driverId={entry.Driver.driverId}
              givenName={entry.Driver.givenName}
              familyName={entry.Driver.familyName}
              position={entry.position}
              points={entry.points}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
