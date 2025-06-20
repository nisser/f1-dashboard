export default async function ConstructorStandings() {
  try {
    const res = await fetch("https://api.jolpi.ca/ergast/f1/2025/constructorstandings/", {
      next: { revalidate: 3600 }, // cache for 1 hour
    })

    if (!res.ok) {
      throw new Error("Failed to fetch constructor standings")
    }

    const data = await res.json()

    const standings =
      data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || []

    return (
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">Constructor Standings</h2>
        <ul className="space-y-3">
          {standings.length > 0 ? (
            standings.map((constructorStanding: any, index: number) => {
              const constructor = constructorStanding.Constructor
              return (
                <li
                  key={constructor.constructorId}
                  className="bg-gray-900 rounded-lg p-4 text-white flex justify-between"
                >
                  <span>
                    {index + 1}. {constructor.name}
                  </span>
                  <span className="text-gray-400">Points: {constructorStanding.points}</span>
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
    console.error("Error fetching constructor standings:", error)
    return (
      <section className="p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Constructor Standings</h2>
        <p>Could not load data. Try again later.</p>
      </section>
    )
  }
}
