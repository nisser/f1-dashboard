'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const teams = [
  'mclaren',
  'mercedes',
  'ferrari',
  'red_bull',
  'williams',
  'haas',
  'rb',
  'aston_martin',
  'sauber',
  'alpine',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
}

export default function TeamThemeSwitcher() {
  const [activeTeam, setActiveTeam] = useState('mclaren')
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const applyTheme = (team: string) => {
    const root = document.documentElement
    root.style.setProperty('--background', `var(--${team})`)
    root.style.setProperty('--foreground', '#ffffff')
    setActiveTeam(team)
    setOpen(false)
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 flex items-center justify-center transition-all"
        onClick={() => setOpen((v) => !v)}
      >
        <img
          src={`/team-logos/${activeTeam}.svg`}
          alt={`${activeTeam} logo`}
          className="w-6 h-6 object-contain"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 mt-2 flex flex-col gap-2 rounded-full bg-black/30 shadow-xl z-50 px-1 py-1"
          >
            {teams
              .filter((team) => team !== activeTeam)
              .map((team) => (
                <motion.button
                  key={team}
                  onClick={() => applyTheme(team)}
                  variants={itemVariants}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:ring-2 ring-white/60"
                  style={{
                    backgroundColor:
                      team === 'mclaren' ? '#ffffff' : `var(--${team})`,
                  }}
                >
                  <img
                    src={`/team-logos/${team}.svg`}
                    alt={team}
                    className="w-6 h-6 object-contain"
                  />
                </motion.button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
