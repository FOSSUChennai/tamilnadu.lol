
export default async function ContentPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/jokes.json`, {
    cache: 'no-store'
  })
  const data = await response.json()

  const jokes = Array.isArray(data?.jokes) ? data.jokes : []

  return (
    <div className="min-h-screen bg-background" id="content">
      <main className="mx-auto max-w-[80%] px-4 py-10">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">all jokes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jokes.map((item, idx) => (
            <div key={idx} className="group relative rounded-lg">
              {/* gradient border wrapper */}
              <div className="p-[1px] rounded-lg transition-opacity duration-300 bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 opacity-0 group-hover:opacity-100"></div>
              {/* card */}
              <div className="absolute inset-0 rounded-lg bg-card border border-border shadow-sm transition-colors"></div>
              {/* content */}
              <div className="relative rounded-lg bg-card p-4 min-h-[140px] flex flex-col justify-between">
                <p className="text-sm text-foreground/90 leading-relaxed">{item.joke}</p>
                <div className="mt-4 text-xs text-muted-foreground">— {item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}


