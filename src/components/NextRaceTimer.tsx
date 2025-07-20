'use client'

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'
import { useF1Data } from '@/context/F1DataContext'

export default function NextRaceTimer() {
  const { nextRace } = useF1Data()

  if (!nextRace) {
    return (
      <div className="text-sm px-2 py-1 bg-purple-800 text-white rounded-lg">
        No upcoming race
      </div>
    )
  }

  const raceDate = new Date(`${nextRace.date}T${nextRace.time}`)

  return (
    <div className="flex flex-row items-center p-2 rounded-lg bg-black/25 backdrop-blur">
      <p className="text-xl text-white font-medium mr-1">Next Race:</p>
      <FlipClockCountdown
        to={raceDate.getTime()}
        digitBlockStyle={{
          width: 20,
          height: 30,
          fontSize: 18,
          background: '#000',
          color: '#ffffff',
          borderRadius: 6
        }}
        dividerStyle={{ color: '#000' }}
        showSeparators
        showLabels={false}
      />
    </div>
  )
}
