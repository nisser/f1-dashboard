'use client'

import React from 'react'
import { RaceWithResults } from '@/lib/types'
import { getFlagUrl } from "@/lib/flag"
import { GridDelta } from '@/components/GridDelta'

export default function RaceResultsTable({ results }: { results: RaceWithResults }) {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <table className="w-full rounded-lg overflow-hidden text-xs select-none">
        <thead className="bg-black/50 text-white">
          <tr>
            <th className="px-0,5 py-1 text-center">Pos.</th>
            <th className="py-1 text-left">Driver</th>
            <th className="py-1 text-left">Team</th>
            <th className="py-1 text-left">Best</th>
            <th className="py-1 text-left">Time</th>
            <th className="py-1 text-left">Grid Delta</th>
            <th className="px-1 py-1">Pts.</th>
          </tr>
        </thead>
        <tbody className="bg-black/25 text-gray-300">
          {results.Results?.map((result) => (
            <tr key={result.position} className="hover:bg-black/20 transition">
              <td className="px-1 py-1 text-center">{result.position}</td>
              <td className="pr-10 py-1">
                <span className="flex items-center gap-1">
                  {getFlagUrl(result.Driver.nationality) && (
                    <img
                      src={getFlagUrl(result.Driver.nationality) ?? ''}
                      alt={`${result.Driver.nationality} flag`}
                      className="w-6 h-4 rounded-sm object-cover"
                      loading="lazy"
                    />
                  )}
                  {result.Driver.givenName} {result.Driver.familyName.toUpperCase()}
                </span>
              </td>
              <td className="pr-10 py-1">
                <span className="flex items-center gap-1">
                  <img
                    src={`/team-logos/${result.Constructor.constructorId}.svg`}
                    alt={result.Constructor.constructorId}
                    className="w-4 h-4"
                  />
                  {result.Constructor.name}
                </span>
              </td>
              <td className="pr-10 py-1">
                {result.FastestLap?.Time.time ? (
                  <span className={result.FastestLap.rank === "1" ? "text-purple-500" : ""}>
                    {result.FastestLap.Time.time}
                  </span>
                ) : (
                  "-"
                )}
              </td>
              <td className="pr-10 py-1">
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
              <td className="px-1 py-1">
                <GridDelta grid={result.grid} position={result.position} />
              </td>
              <td className="px-1 py-1 text-center">{result.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
