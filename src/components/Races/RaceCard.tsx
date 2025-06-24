type RaceCardProps = {
  race: {
    raceName: string
    date: string
    round: string
    url: string
    Circuit: {
      circuitName: string
      Location: {
        locality: string
        country: string
      }
    }
  }
}

export default function RaceCard({ race }: RaceCardProps) {
  const date = new Date(`${race.date}T${race.date || '00:00:00Z'}`)

  return (
    <div className="p-4 rounded-xl bg-black/25 shadow-md">
      <h2 className="text-xl font-bold">{race.raceName}</h2>
      <p className="text-sm">
        Round {race.round} &mdash; {race.Circuit.circuitName}
      </p>
      <p className="text-sm">
        {race.Circuit.Location.locality}, {race.Circuit.Location.country}
      </p>
      <p className="text-sm mt-1">
        {date.toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })} – {date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
      </p>
      <a
        href={race.url}
        className="text-sm text-blue-400 underline inline-block"
        target="_blank"
      >
        More info
      </a>
    </div>
  )
}
