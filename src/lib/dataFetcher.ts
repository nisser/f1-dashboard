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
      const key = `${race.season}-${race.round}`;
      if (!allRacesMap.has(key)) {
        allRacesMap.set(key, race);
      } else {
        // Merge Results arrays if race already exists
        const existingRace = allRacesMap.get(key);
        existingRace.Results = [
          ...(existingRace.Results || []),
          ...(race.Results || []),
        ];
      }
    }

    offset += limit
  }

  return Array.from(allRacesMap.values())
}

export async function fetchInitialF1Data(season: number = 2025) {
  const [driversRes, constructorsRes, allRacesRes, results] = await Promise.all([
    fetch(`https://api.jolpi.ca/ergast/f1/${season}/driverstandings/`, { cache: 'force-cache' }),
    fetch(`https://api.jolpi.ca/ergast/f1/${season}/constructorstandings/`, { cache: 'force-cache' }),
    fetch(`https://api.jolpi.ca/ergast/f1/${season}.json`, { cache: 'force-cache' }),
    fetchAllRaceResults(season),
  ])

  const [driversData, constructorsData, allRacesData] = await Promise.all([
    driversRes.json(),
    constructorsRes.json(),
    allRacesRes.json(),
  ])

  const raceResultsMap = new Map<string, Result>()

  for (const res of results) {
    const key = `${res.season}-${res.round}`
    raceResultsMap.set(key, res)
  }

  const races: Race[] = allRacesData?.MRData?.RaceTable?.Races || []

  // Merge races with results
  function mapRacesWithResults(races: Race[], raceResultsMap: Map<string, Result>): RaceWithResults[] {
    const now = new Date()

    // Sort races by date to find the next upcoming
    const upcomingRaces = races
      .filter(r => new Date(`${r.date}T${r.time || '00:00:00Z'}`) > now)
      .sort((a, b) => new Date(`${a.date}T${a.time || '00:00:00Z'}`).getTime() - new Date(`${b.date}T${b.time || '00:00:00Z'}`).getTime())

    const nextUpKey = upcomingRaces[0] ? `${upcomingRaces[0].season}-${upcomingRaces[0].round}` : null

    return races.map((race) => {
      const key = `${race.season}-${race.round}`
      const raceDate = new Date(`${race.date}T${race.time || '00:00:00Z'}`)
      let status: 'Completed' | 'Upcoming' | 'Next Up' = 'Completed'

      if (raceDate > now) {
        status = nextUpKey === key ? 'Next Up' : 'Upcoming'
      }

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
        Results: raceResultsMap.get(key)?.Results,
        raceStatus: status,
      }
    })
  }

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

  return {
    driverStandings: driversData?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || [],
    constructorStandings: mapConstructorStandings(constructorsData?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || []),
    races: mapRacesWithResults(races, raceResultsMap),
  }
}
