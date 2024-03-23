import { SearchAnimeForm } from "@/components/animePosterGenerator/searchAnimeForm";

export default function Home() {
  return (
    <main className="relative pb-24">
      <div className=" text-center">
        <div className="py-24 md:py-36">
          <div className="flex justify-center">
            <SearchAnimeForm getAnimeSearchApiArg={{}} />
          </div>
        </div>
      </div>
    </main>
  );
}
