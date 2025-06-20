export default async function DriverStandings() {
    try {
        const res = await fetch("https://api.jolpi.ca/ergast/f1/2025/driverstandings/", {
            next: { revalidate: 3600 }, // cache for 1 hour
        })

        if (!res.ok) {
            throw new Error("Failed to fetch driver standings")
        }

        const data = await res.json()

        const standings =
            data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || []

        return (
            <section className="p-6 bg-gray-900 rounded-lg w-full max-w-xs ml-auto">
                <h2 className="text-2xl font-bold mb-4">Driver Standings</h2>
                <ul className="space-y-3">
                    {standings.length > 0 ? (
                        standings.map((driverStanding: any, index: number) => {
                            const driver = driverStanding.Driver
                            return (
                                <li
                                    key={driver.driverId}
                                    className="bg-gray-900 rounded-lg p-4 text-white flex justify-between"
                                >
                                    <span>
                                        {index + 1}. {driver.givenName} {driver.familyName}
                                    </span>
                                    <span className="text-gray-400">Points: {driverStanding.points}</span>
                                </li>
                            )
                        })
                    ) : (
                        <li className="text-white">No standings available.</li>
                    )}
                </ul>
            </section>
        )
    } catch (error) {
        console.error("Error fetching driver standings:", error)
        return (
            <section className="p-6 text-white">
                <h2 className="text-2xl font-bold mb-4">Driver Standings</h2>
                <p>Could not load data. Try again later.</p>
            </section>
        )
    }
}
