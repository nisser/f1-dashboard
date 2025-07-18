"use client";

import React, { createContext, useContext } from "react";
import type { DriverInfo, ConstructorInfo, RaceWithResults } from "@/lib/types";

type F1DataContextType = {
  driverStandings: DriverInfo[];
  constructorStandings: ConstructorInfo[];
  races: RaceWithResults[];
  nextRace: RaceWithResults | null;
};

const F1DataContext = createContext<F1DataContextType | undefined>(undefined);

export const F1DataProvider: React.FC<{ data: Omit<F1DataContextType, "nextRace"> & { nextRace: RaceWithResults | null }, children: React.ReactNode }> = ({ data, children }) => {
  return <F1DataContext.Provider value={data}>{children}</F1DataContext.Provider>;
};

export function useF1Data() {
  const context = useContext(F1DataContext);
  if (!context) {
    throw new Error("useF1Data must be used within a F1DataProvider");
  }
  return context;
}
