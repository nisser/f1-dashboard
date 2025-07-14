'use client'

import ConstructorCard from "./ConstructorCard"
import type { ConstructorInfo } from '@/lib/types'

export default function ConstructorStandings({ constructorStandings = [] }: { constructorStandings: ConstructorInfo[] }) {
  if (!constructorStandings.length) {
    return <div className="text-red-500">No constructor standings available.</div>
  }

  return (
    <section>
      <ul className="space-y-2">
        {constructorStandings.map((entry) => (
          <li key={entry.constructorId}>
            <ConstructorCard constructor={entry} />
          </li>
        ))}
      </ul>
    </section>
  )
}