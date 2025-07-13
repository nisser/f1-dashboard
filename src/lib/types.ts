export type Race = {
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

export type Result = {
  season: string
  round: string
  url: string
  raceName: string
  date: string
  time: string
  Circuit: {
    circuitId: string
    circuitName: string
    url: string
    Location: {
      lat: string
      long: string
      locality: string
      country: string
    }
  }
  Results: {
    number: string
    position: string
    positionText: string
    points: string
    Driver: {
      driverId: string
      permanentNumber: string
      code: string
      url: string
      givenName: string
      familyName: string
      dateOfBirth: string
      nationality: string
    }
    Constructor: {
      constructorId: string
      url: string
      name: string
      nationality: string
    }
    grid: string
    laps: string
    status: string
    Time?: {
      millis?: string
      time: string
    }
    FastestLap?: {
      rank: string
      lap: string
      Time: {
        time: string
      }
    }
  }[]
}

export type RaceWithResults = Race & {
  Results?: Result["Results"]
}

export type CircuitLocation = {
  lat: number
  long: number
  locality: string
  country: string
}