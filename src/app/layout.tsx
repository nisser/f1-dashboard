import { Orbitron } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import TeamThemeSwitcher from "@/components/TeamThemeSwitcher";
import NextRaceTimer from "@/components/NextRaceTimer";
import { fetchInitialF1Data } from "@/lib/dataFetcher";
import { F1DataProvider } from "@/context/F1DataContext";
import AnimatedLogo from '@/components/AnimatedLogo'

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "F1 POLAR",
  description: "Real-time F1 dashboard with race results, driver and constructor standings, interactive race map, and detailed statistics for the current Formula 1 season.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await fetchInitialF1Data(2025);
  const nextRace = data.races.find((r) => r.raceStatus === "Next Up") ?? null;

  return (
    <html lang="en">
      <body className={`${orbitron.variable} antialiased`}>
        <F1DataProvider data={{ ...data, nextRace }}>
          <header className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-[3px] shadow-md">
            <div className="flex items-center justify-between px-2 py-2">
              <div className="flex items-center gap-2 text-lg sm:text-2xl font-bold text-white pl-1 pr-2 py-1 rounded-full bg-black/25">
                <AnimatedLogo />
                F1 POLAR
              </div>
              <div className="flex items-center gap-4">
                <NextRaceTimer />
                <TeamThemeSwitcher />
              </div>
            </div>
          </header>
          <div>{children}</div>
        </F1DataProvider>
      </body>
    </html>
  )
}
