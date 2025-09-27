
import HoverGlowCard from './HoverGlowCard'

export default async function ContentPage() {
  // Determine the jokes URL based on environment
  const jokesUrl = process.env.NODE_ENV === 'development' 
    ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/jokes.json`
    : 'https://raw.githubusercontent.com/FOSSUChennai/tamilnadu.lol/refs/heads/main/public/jokes.json'
  
  const response = await fetch(jokesUrl, {
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
            <HoverGlowCard key={idx}>
              <p className="text-sm text-foreground/90 leading-relaxed">{item.joke}</p>
              <div className="mt-4 text-xs text-muted-foreground">— {item.name}</div>
            </HoverGlowCard>
          ))}
        </div>
      </main>
    </div>
  )
}


