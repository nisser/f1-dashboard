'use client'

import DriverCard from './DriverCard'
import type { DriverInfo } from '@/lib/types'

export default function DriverStandings({ driverStandings = [] }: { driverStandings: DriverInfo[] }) {
  if (!driverStandings.length) {
    return <div className="text-red-500">No driver standings available.</div>
  }

  return (
    <section>
      <ul className="space-y-2">
        {driverStandings.map((driver) => (
          <li key={driver.Driver.driverId}>
            <DriverCard driver={driver} />
          </li>
        ))}
      </ul>
    </section>
  )
}
