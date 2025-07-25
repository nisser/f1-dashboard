"use client";

import StandingsContainer from "@/components/Standings/StandingsContainer";
import MapWrapper from "@/components/Map/MapWrapper";
import RaceList from "@/components/Races/RaceList";
import { useF1Data } from "@/context/F1DataContext";

export default function HomePage() {
  const { driverStandings, constructorStandings, races } = useF1Data();

  return (
    <main>
      <div className="flex">
          <RaceList races={races} />
        <div className="sticky top-[64px] flex flex-col gap-1 p-1 self-start">
          <StandingsContainer driverStandings={driverStandings} constructorStandings={constructorStandings} />
          <MapWrapper
            circuitLocations={races.map((race) => ({
              lat: race.Circuit.Location.lat,
              long: race.Circuit.Location.long,
              locality: race.Circuit.Location.locality,
              country: race.Circuit.Location.country,
            }))}
          />
        </div>
      </div>
    </main>
  )
}
