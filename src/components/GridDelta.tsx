'use client'

import React from 'react'
import {
  ChevronUp,
  ChevronsUp,
  ChevronDown,
  ChevronsDown,
  Minus,
} from 'lucide-react'

export function GridDelta({ grid, position }: { grid: string; position: string }) {
  const g = parseInt(grid)
  const p = parseInt(position)

  if (isNaN(g) || isNaN(p)) return <Minus className="w-4 h-4 text-gray-400" />

  const delta = g - p

  if (delta === 0)
    return (
      <span className="flex items-center gap-1 text-gray-400">
        <Minus className="w-4 h-4" />
        0
      </span>
    )

  if (delta > 0 && delta < 5)
    return (
      <span className="flex items-center gap-1 text-green-400">
        <ChevronUp className="w-4 h-4" />
        +{delta}
      </span>
    )

  if (delta >= 5)
    return (
      <span className="flex items-center gap-1 text-purple-500">
        <ChevronsUp className="w-4 h-4" />
        +{delta}
      </span>
    )

  if (delta < 0 && delta > -5)
    return (
      <span className="flex items-center gap-1 text-red-400">
        <ChevronDown className="w-4 h-4" />
        {delta}
      </span>
    )

  return (
    <span className="flex items-center gap-1 text-red-600">
      <ChevronsDown className="w-4 h-4" />
      {delta}
    </span>
  )
}
