'use client'

import { useEffect, useState, useRef } from 'react'

const teams = [
  'mclaren',
  'mercedes',
  'ferrari',
  'redbull',
  'williams',
  'haas',
  'racingbulls',
  'astonmartin',
  'kicksauber',
  'alpine',
]

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
    // Close dropdown on outside click
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    // Preload all team logos once on mount
    teams.forEach((team) => {
      const img = new Image()
      img.src = `/team-logos/${team}.svg`
    })
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="w-9 h-9 rounded-full text-white bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-all"
        onClick={() => setOpen((v) => !v)}
      >
        <img
          src={`/team-logos/${activeTeam}.svg`}
          alt={`${activeTeam} logo`}
          className="w-6 h-6 object-contain"
        />
      </button>
      {open && (
        <div className="absolute left-0 mt-2 bg-gray-800 rounded shadow-lg z-50">
          {teams.map((team) => (
            <button
              key={team}
              onClick={() => applyTheme(team)}
              className={`flex items-center gap-2 w-full px-4 py-2 text-white text-sm hover:bg-gray-700 transition-all ${activeTeam === team ? 'font-bold bg-gray-700' : ''
                }`}
              style={{ backgroundColor: activeTeam === team ? `var(--${team})` : undefined }}
            >
              <img
                src={`/team-logos/${team}.svg`}
                alt={`${team} logo`}
                className="w-5 h-5 object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
