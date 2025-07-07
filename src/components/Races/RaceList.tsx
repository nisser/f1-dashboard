import RaceCard from "./RaceCard"

type Race = {
  season: string
  round: string
  url: string
  raceName: string
  date: string
  time: string
  Circuit: {
    circuitId: string
    circuitName: string
    Location: {
      lat: number
      long: number
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
    <section 
      className="flex flex-col gap-1 m-1 bg-black/40 rounded-lg p-2"
      style={{ width: '66.6666%' }} 
    > 
      {races.map((race) => (
        <RaceCard key={race.round} race={race} />
      ))}
    </section>
  )
}
