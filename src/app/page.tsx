import ConstructorStandings from "@/components/Constructors/ConstructorList"
import DriverStandings from "@/components/Drivers/DriverList"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">F1 Dashboard</h1>
      <DriverStandings />
    </main>
  )
}