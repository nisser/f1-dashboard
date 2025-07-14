import StandingsContainer from "@/components/StandingsContainer"
import MapWrapper from '@/components/Map/MapWrapper'
import RaceList from '@/components/Races/RaceList'
import { fetchInitialF1Data } from '@/lib/dataFetcher'

export default async function HomePage() {
  const {
    driverStandings,
    constructorStandings,
    races,
  } = await fetchInitialF1Data(2025)

  return (
    <main>
      <div className="fixed top-[64px] right-0 h-screen flex flex-col m-1 gap-1">
        <StandingsContainer driverStandings={driverStandings} constructorStandings={constructorStandings} />
        <MapWrapper
          circuitLocations={(races as {
            Circuit: {
              Location: {
                lat: number;
                long: number;
                locality: string;
                country: string;
              };
            };
          }[]).map(race => ({
            lat: race.Circuit.Location.lat,
            long: race.Circuit.Location.long,
            locality: race.Circuit.Location.locality,
            country: race.Circuit.Location.country,
          }))}
        />
      </div>
      <RaceList races={races} />
    </main>
  )
}