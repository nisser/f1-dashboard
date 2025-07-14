'use client'

import React from 'react'
import { RaceWithResults } from '@/lib/types'

export default function RaceResultsTable({ results }: { results: RaceWithResults }) {
  return (
    <table className="min-w-full border-collapse border border-gray-700 rounded-lg overflow-hidden text-sm">
      <thead className="bg-gray-800 text-gray-200">
        <tr>
          <th className="border border-gray-600 px-3 py-1 text-left">Pos</th>
          <th className="border border-gray-600 px-3 py-1 text-left">Driver</th>
          <th className="border border-gray-600 px-3 py-1 text-left">Team</th>
          <th className="border border-gray-600 px-3 py-1 text-left">Time</th>
          <th className="border border-gray-600 px-3 py-1 text-left">Points</th>
        </tr>
      </thead>
      <tbody className="bg-black/25 text-gray-300">
        {results.Results?.map((result) => (
          <tr key={result.position} className="hover:bg-gray-700 transition">
            <td className="border border-gray-600 px-3 py-1">{result.position}</td>
            <td className="border border-gray-600 px-3 py-1">
              {result.Driver.givenName} {result.Driver.familyName}
            </td>
            <td className="border border-gray-600 px-3 py-1">{result.Constructor.name}</td>
            <td className="border border-gray-600 px-3 py-1">{result.Time?.time || '-'}</td>
            <td className="border border-gray-600 px-3 py-1">{result.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
