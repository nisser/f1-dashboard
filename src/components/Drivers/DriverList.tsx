'use client'

import DriverCard from "./DriverCard"

type Constructor = {
  constructorId: string
  url: string
  name: string
  nationality: string
}

type DriverInfo = {
  position: string
  points: string
  Driver: {
    driverId: string
    givenName: string
    familyName: string
  }
  Constructors: Constructor[]
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
                            givenName={entry.Driver.givenName}
                            familyName={entry.Driver.familyName}
                            position={entry.position}
                            points={entry.points}
                            teamName={entry.Constructors?.[0]?.name ?? "Unknown Team"}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}
