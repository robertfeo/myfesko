export default async function Home() {
  return (
    <div>
      <div className="h-screen pb-14" >
        <div className="container pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <h1 className="my-4 text-3xl md:text-5xl text-purple-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">Main Hero Message to sell your app</h1>
            <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">Sub-hero message, not too long and not too short. Make it just right!</p>
          </div>
        </div>
      </div>
      <footer className="flex flex-col justify-center items-center text-zinc-600 text-center p-4">
        <div className="pt-16 pb-6 text-sm text-center md:text-left fade-in">
          <a className="text-gray-500 no-underline hover:no-underline" href="/">&copy; 2024 MyFesko</a>
        </div>
      </footer>
    </div>
  )
}