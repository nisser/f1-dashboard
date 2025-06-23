'use client'

import { useState } from 'react'
import DriverList from '@/components/Drivers/DriverList'
import ConstructorList from '@/components/Constructors/ConstructorList'

export default function StandingsContainer({ initialDriverStandings = [], initialConstructorStandings = [] }) {
  const [activeTab, setActiveTab] = useState('drivers')

  return (
    <section
      className="md:fixed md:right-0 ml-auto
      h-[calc(50vh-40px)] w-full md:w-1/3 overflow-y-auto p-2
      rounded-lg shadow-lg bg-black/40 backdrop-blur-md mr-[4px] mt-[4px]
      border-[4px] border border-transparent md:border-0"
    >
      <div className="inline-flex bg-gray-800/60 backdrop-blur rounded-lg p-1 mb-6">
        {['drivers', 'constructors'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium ${activeTab === tab
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:text-white'
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="text-white">
        {activeTab === 'drivers' ? (
          <DriverList initialDriverStandings={initialDriverStandings} />
        ) : (
          <ConstructorList initialConstructorStandings={initialConstructorStandings} />
        )}
      </div>
    </section>
  )
}
