import RaceCard from "./RaceCard"

type Race = {
  season: string
  round: string
  raceName: string
  date: string
  time: string
  url: string
  Circuit: {
    circuitId: string
    circuitName: string
    Location: {
      locality: string
      country: string
    }
  }
}

type Props = {
  races: Race[]
}

export default function RaceList({ races }: Props) {
  return (
    <section className="flex flex-col gap-2 w-2/3">
      {races.map((race) => (
        <RaceCard key={race.round} race={race} />
      ))}
    </section>
  )
}
