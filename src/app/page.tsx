export default function Home() {
  return (
    <main className="relative pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="py-24 md:py-36">
          <h1 className="mb-5 text-6xl font-bold">Anime Poster Generator</h1>
          <input
            type="text"
            placeholder="jack@example.com"
            name="q"
            className="border w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md  font-semibold"
          />{" "}
          <a
            className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium transition duration-500 ease-in-out transform bg-transparent border rounded-lg"
            href="/"
          >
            <span className="justify-center">Search</span>
          </a>
        </div>
      </div>
    </main>
  );
}
