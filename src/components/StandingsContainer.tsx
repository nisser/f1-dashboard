'use client'

import { useState, useRef, useEffect } from 'react'
import DriverList from "./Drivers/DriverList"
import ConstructorList from "./Constructors/ConstructorList"

export default function StandingsContainer({ initialDriverStandings = [], initialConstructorStandings = [] }) {
  const [activeTab, setActiveTab] = useState<'drivers' | 'constructors'>('drivers')
  const containerRef = useRef<HTMLDivElement>(null)
  const [highlightStyle, setHighlightStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 })

  useEffect(() => {
    if (!containerRef.current) return
    const buttons = containerRef.current.querySelectorAll('button')
    const activeIndex = activeTab === 'drivers' ? 0 : 1
    const activeButton = buttons[activeIndex] as HTMLElement
    if (activeButton) {
      setHighlightStyle({ left: activeButton.offsetLeft, width: activeButton.offsetWidth })
    }
  }, [activeTab])

  return (
    <section className="side-panel">
      <div
        ref={containerRef}
        className="inline-flex bg-black/25 mb-2 rounded-full relative select-none"
        style={{ position: 'relative' }}
      >
        <div
          className="absolute top-0 bottom-0 bg-black/50 rounded-full transition-all duration-300"
          style={{
            left: highlightStyle.left,
            width: highlightStyle.width,
          }}
        />
        {['drivers', 'constructors'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'drivers' | 'constructors')}
            className={`relative z-10 p-2 text-sm font-medium transition-colors duration-300 ${
              activeTab === tab ? 'text-white' : 'text-gray-300 hover:text-white'
            } rounded-full`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'drivers' ? (
          <DriverList initialDriverStandings={initialDriverStandings} />
        ) : (
          <ConstructorList initialConstructorStandings={initialConstructorStandings} />
        )}
      </div>
    </section>
  )
}
