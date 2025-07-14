import { RaceWithResults, Race, Result, ConstructorInfo } from "./types"

export async function fetchAllRaceResults(season: number) {
  const allRacesMap = new Map<string, any>()
  let offset = 0
  const limit = 100

  while (true) {
    const res = await fetch(`https://api.jolpi.ca/ergast/f1/${season}/results.json?limit=${limit}&offset=${offset}`, { cache: 'force-cache' })
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
  const [driversRes, constructorsRes, results] = await Promise.all([
    fetch(`https://api.jolpi.ca/ergast/f1/${season}/driverstandings/`, { cache: 'force-cache' }),
    fetch(`https://api.jolpi.ca/ergast/f1/${season}/constructorstandings/`, { cache: 'force-cache' }),
    fetchAllRaceResults(season),
  ])

  const [driversData, constructorsData] = await Promise.all([
    driversRes.json(),
    constructorsRes.json(),
  ])

  const raceResultsMap = new Map<string, Result>()
  for (const res of results) {
    const key = `${res.season}-${res.round}`
    raceResultsMap.set(key, res)
  }

  const allRacesRes = await fetch(`https://api.jolpi.ca/ergast/f1/${season}.json`, { cache: 'force-cache' })
  const allRacesData = await allRacesRes.json()
  const races: Race[] = allRacesData?.MRData?.RaceTable?.Races || []

  // Flatten Constructors
  function mapConstructorStandings(standings: any[]): ConstructorInfo[] {
    return standings.map(entry => ({
      position: entry.position,
      points: entry.points,
      constructorId: entry.Constructor.constructorId,
      url: entry.Constructor.url,
      name: entry.Constructor.name,
      nationality: entry.Constructor.nationality,
    }))
  }

  // Merge races with results
  function mapRacesWithResults(races: Race[], raceResultsMap: Map<string, Result>): RaceWithResults[] {
    return races.map((race) => {
      const key = `${race.season}-${race.round}`
      const matchingResult = raceResultsMap.get(key)

      return {
        ...race,
        Circuit: {
          ...race.Circuit,
          Location: {
            ...race.Circuit.Location,
            lat: Number(race.Circuit.Location.lat),
            long: Number(race.Circuit.Location.long),
          },
        },
        Results: matchingResult?.Results,
      }
    })
  }

  return {
    driverStandings: driversData?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || [],
    constructorStandings: mapConstructorStandings(constructorsData?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || []),
    races: mapRacesWithResults(races, raceResultsMap),
  }
}
