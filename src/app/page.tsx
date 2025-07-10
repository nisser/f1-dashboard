import StandingsContainer from "@/components/StandingsContainer"
import MapWrapper from '@/components/Map/MapWrapper'
import RaceList from '@/components/Races/RaceList'

async function getInitialF1Data() {
  const [driversRes, constructorsRes, racesRes] = await Promise.all([
    fetch("https://api.jolpi.ca/ergast/f1/2025/driverstandings/", { cache: "no-store" }),
    fetch("https://api.jolpi.ca/ergast/f1/2025/constructorstandings/", { cache: "no-store" }),
    fetch("https://api.jolpi.ca/ergast/f1/2025/races", { cache: "no-store" }),
  ])

  const [driversData, constructorsData, racesData] = await Promise.all([
    driversRes.json(),
    constructorsRes.json(),
    racesRes.json(),
  ])

  return {
    driverStandings: driversData?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || [],
    constructorStandings: constructorsData?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || [],
    races: racesData?.MRData?.RaceTable?.Races || [],
  }
}


export default async function HomePage() {
  const {
    driverStandings,
    constructorStandings,
    races,
  } = await getInitialF1Data()

  return (
    <main>
      <div className="fixed top-[64px] right-0 h-screen flex flex-col m-1 gap-1">
        <StandingsContainer initialDriverStandings={driverStandings} initialConstructorStandings={constructorStandings} />
        <MapWrapper
          circuitLocations={(races as {
            Circuit: {
              Location: {
                lat: string;
                long: string;
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