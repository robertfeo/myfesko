import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Personal App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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



/*
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

      </div>
    </main>
  );
}
 */