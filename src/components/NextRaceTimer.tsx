'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useF1Data } from '@/context/F1DataContext'
import { LucideCalendarClock } from 'lucide-react'

function AnimatedDigit({ value }: { value: string | number }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="inline-block w-6 text-center text-white text-xl"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  )
}

export default function NextRaceTimer() {
  const { nextRace } = useF1Data()
  const [remaining, setRemaining] = useState([0, 0, 0, 0]) // [d, h, m, s]

  useEffect(() => {
    if (!nextRace) return

    const raceDate = new Date(`${nextRace.date}T${nextRace.time}`)

    const updateTimer = () => {
      const now = new Date()
      const diff = Math.max(0, raceDate.getTime() - now.getTime())
      const totalSeconds = Math.floor(diff / 1000)
      const days = Math.floor(totalSeconds / (3600 * 24))
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60
      setRemaining([days, hours, minutes, seconds])
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [nextRace])

  if (!nextRace) {
    return (
      <div className="font-sm text-white rounded-lg bg-black/25">
        No upcoming race
      </div>
    )
  }

  const [d, h, m, s] = remaining

  return (
    <div className="flex items-center gap-2 p-1 rounded-lg bg-black/25 font-mono text-white text-md">
      <span title="Time Until Next Race" className="inline-block">
        <LucideCalendarClock width={20} />
      </span>
<div className="flex items-center gap-0.5">
  <AnimatedDigit value={String(d)} />
  <span className="text-l">{d === 1 ? 'Day' : 'Days'},</span>
  <AnimatedDigit value={String(h).padStart(2, '0')} />
  <span>:</span>
  <AnimatedDigit value={String(m).padStart(2, '0')} />
  <span>:</span>
  <AnimatedDigit value={String(s).padStart(2, '0')} />
</div>

    </div>
  )
}
