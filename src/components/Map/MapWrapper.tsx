'use client'

import dynamic from 'next/dynamic'
import type { CircuitLocation } from '@/lib/types'

const RaceMap = dynamic(() => import('./RaceMap'), { ssr: false })

const MapWrapper = ({ circuitLocations }: { circuitLocations: CircuitLocation[] }) => {
  return <RaceMap circuitLocations={circuitLocations} />
}

export default MapWrapper
