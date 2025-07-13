import RaceCard from "./RaceCard"
import { RaceWithResults } from "@/lib/types"

export default function RaceList({ races }: { races: RaceWithResults[] }) {
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
