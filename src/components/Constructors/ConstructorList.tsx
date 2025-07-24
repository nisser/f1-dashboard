'use client'

import ConstructorCard from "./ConstructorCard"
import type { ConstructorInfo } from '@/lib/types'

export default function ConstructorStandings({ constructorStandings = [] }: { constructorStandings: ConstructorInfo[] }) {
  if (!constructorStandings.length) {
    return <div className="text-red-500">No constructor standings available.</div>
  }

  const maxPoints = constructorStandings.reduce((max, c) => {
    const points = parseFloat(c.points)
    return points > max ? points : max
  }, 0)

  return (
    <section>
      <ul>
        {constructorStandings.map((entry) => (
          <li key={entry.constructorId}>
            <ConstructorCard constructor={entry} maxPoints={maxPoints} />
          </li>
        ))}
      </ul>
    </section>
  )
}