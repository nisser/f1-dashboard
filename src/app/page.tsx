import StandingsContainer from "@/components/StandingsContainer"

async function getDriverStandings() {
  const res = await fetch("https://api.jolpi.ca/ergast/f1/2025/driverstandings/", { cache: "no-store" })
  const data = await res.json()
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || []
}

async function getConstructorStandings() {
  const res = await fetch("https://api.jolpi.ca/ergast/f1/2025/constructorstandings/", { cache: "no-store" })
  const data = await res.json()
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || []
}

export default async function HomePage() {
  const driverStandings = await getDriverStandings()
  const constructorStandings = await getConstructorStandings()
  return (
    <main>
      <StandingsContainer initialDriverStandings={driverStandings} initialConstructorStandings={constructorStandings} />
    </main>
  )
}