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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="px-4 py-2 rounded-md text-white text-sm bg-gray-700 hover:bg-gray-600 transition-all"
        onClick={() => setOpen((v) => !v)}
      >
        {activeTeam.charAt(0).toUpperCase() + activeTeam.slice(1)}
        <span className="ml-2">▼</span>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-40 bg-gray-800 rounded shadow-lg z-50">
          {teams.map((team) => (
            <button
              key={team}
              onClick={() => applyTheme(team)}
              className={`block w-full text-left px-4 py-2 text-white text-sm hover:bg-gray-700 transition-all ${
                activeTeam === team ? 'font-bold bg-gray-700' : ''
              }`}
              style={{ backgroundColor: activeTeam === team ? `var(--${team})` : undefined }}
            >
              {team.charAt(0).toUpperCase() + team.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
