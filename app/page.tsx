export default async function Home() {
  return (
    <div>
      <header className="bg-blue-500 text-white text-center p-12">
        <h1 className="text-4xl font-bold">Welcome to MyApp</h1>
        <p className="text-xl">A place for me and my friends.</p>
      </header>

      <main className="container mx-auto p-4">
        <section>
          <h2 className="text-2xl font-bold">About Us</h2>
          <p>This is a personal project created to share with my friends.</p>
        </section>
      </main>

      <footer className="bg-gray-700 text-white text-center p-4">
        <p>© 2024 MyApp. All rights reserved.</p>
      </footer>
    </div>
  )
}