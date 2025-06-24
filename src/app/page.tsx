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
      <StandingsContainer initialDriverStandings={driverStandings} initialConstructorStandings={constructorStandings} />
      <MapWrapper />
      <RaceList races={races} />
    </main>
  )
}