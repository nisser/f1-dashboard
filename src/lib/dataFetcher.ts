export async function fetchAllRaceResults(season: number) {
  const allRacesMap = new Map<string, any>()
  let offset = 0
  const limit = 100

  while (true) {
    const res = await fetch(`https://api.jolpi.ca/ergast/f1/${season}/results.json?limit=${limit}&offset=${offset}`)
    const data = await res.json()

    const races = data?.MRData?.RaceTable?.Races || []
    if (races.length === 0) break

    for (const race of races) {
      const key = `${race.season}-${race.round}`
      if (!allRacesMap.has(key)) {
        allRacesMap.set(key, race)
      }
    }

    offset += limit
  }

  return Array.from(allRacesMap.values())
}

export async function fetchInitialF1Data(season: number = 2025) {
  const [driversRes, constructorsRes, racesRes, results] = await Promise.all([
    fetch(`https://api.jolpi.ca/ergast/f1/${season}/driverstandings/`, { cache: "no-store" }),
    fetch(`https://api.jolpi.ca/ergast/f1/${season}/constructorstandings/`, { cache: "no-store" }),
    fetch(`https://api.jolpi.ca/ergast/f1/${season}/races`, { cache: "no-store" }),
    fetchAllRaceResults(season),
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
    results,
  }
}
