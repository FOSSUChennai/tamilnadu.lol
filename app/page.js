import ContentPage from "@/components/content"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Hero from "@/components/hero"


export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/jokes.json`, {
    cache: 'no-store'
  })
  const data = await response.json()

  // Group jokes by category
  const recentJokes = data.jokes.slice(0, 6)
  const popularJokes = data.jokes.filter(joke => ['family', 'work', 'marriage'].includes(joke.category))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <ContentPage />
      <Footer />
    </div>
  )
}
