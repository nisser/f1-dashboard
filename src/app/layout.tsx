import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import TeamThemeSwitcher from "@/components/TeamThemeSwitcher";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "F1 Dashboard",
  description: "F1 Dashboard app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} antialiased`}>
        <header className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-[3px] shadow-md">
          <div className="flex items-center justify-between px-4 py-2">
            <h1 className="text-xl font-bold text-white">F1 Dashboard</h1>
            <TeamThemeSwitcher />
          </div>
        </header>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
