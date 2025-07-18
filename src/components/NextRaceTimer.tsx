"use client";

import { useEffect, useState } from "react";
import { useF1Data } from "@/context/F1DataContext";

export default function NextRaceTimer() {
  const { nextRace } = useF1Data();
  const [remaining, setRemaining] = useState("");
  
  useEffect(() => {
    if (!nextRace) {
      setRemaining("No upcoming race");
      return;
    }

    const raceDate = new Date(`${nextRace.date}T${nextRace.time}`);

    const updateTimer = () => {
      const now = new Date();
      const diff = raceDate.getTime() - now.getTime();

      if (diff <= 0) {
        setRemaining("Live now");
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setRemaining(
        `${days}d ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [nextRace]);

  return (
    <div className="text-sm font-mono px-2 py-1 bg-purple-800 text-white rounded-lg">
      ⏱ Next Race In: {remaining}
    </div>
  );
}
