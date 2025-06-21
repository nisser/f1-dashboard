'use client'

import ConstructorCard from "./ConstructorCard"

type ConstructorInfo = {
  position: string
  points: string
  Constructor: {
    constructorId: string
    name: string
  }
}

type ConstructorListProps = {
  initialConstructorStandings?: ConstructorInfo[]
}

export default function ConstructorStandings({ initialConstructorStandings = [] }: ConstructorListProps) {
  if (!initialConstructorStandings.length) {
    return <div className="text-red-500">No constructor standings available.</div>
  }

  return (
    <section>
      <ul className="space-y-2">
        {initialConstructorStandings.map((entry) => (
          <li key={entry.Constructor.constructorId}>
            <ConstructorCard
              constructorId={entry.Constructor.constructorId}
              name={entry.Constructor.name}
              position={entry.position}
              points={entry.points}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
