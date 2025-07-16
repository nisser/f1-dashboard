'use client'

import React from 'react'
import { RaceWithResults } from '@/lib/types'

export default function RaceResultsTable({ results }: { results: RaceWithResults }) {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <table className="min-w-full rounded-lg overflow-hidden text-xs">
        <thead className="bg-black/50 text-gray-200">
          <tr>
            <th className="px-2 py-1">#</th>
            <th className="px-2 py-1">Driver</th>
            <th className="px-2 py-1">Team</th>
            <th className="px-2 py-1">Time</th>
            <th className="px-2 py-1">Pts.</th>
          </tr>
        </thead>
        <tbody className="bg-black/25 text-gray-300">
          {results.Results?.map((result) => (
            <tr key={result.position} className="hover:bg-black/20 transition">
              <td className="px-2 py-1">{result.position}</td>
              <td className="px-2 py-1">{result.Driver.code}</td>
              <td className="px-2 py-1">{result.Constructor.name}</td>
              <td className="px-2 py-1">
                {result.status === 'Lapped'
                  ? '+1 Lap'
                  : result.status === 'Retired'
                    ? 'DNF'
                    : result.status === 'Did not start'
                      ? 'DNS'
                        : result.status === 'Disqualified'
                        ? 'DSQ'
                        : result.Time?.time || '-'}
              </td>
              <td className="px-2 py-1">{result.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
