"use client";

import { SearchAnimeForm } from "@/components/animePosterGenerator/searchAnimeForm";
import { useSearchParams } from "next/navigation";
import {
  AnimeSearchQueryOrderby,
  SearchQuerySort,
  useGetAnimeSearchQuery,
} from "../../../generated/rtk-query/jikanApi";
import Loading from "@/components/animePosterGenerator/layout/loading";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Link from "next/link";
import { AlertDestructive } from "@/components/animePosterGenerator/layout/alertDestructive";

const SearchPage = () => {
  const trim = (largeString: string | null | undefined, maxLength: number) => {
    if (!largeString) return "";

    if (largeString.length > maxLength) {
      return `${largeString.substring(0, maxLength)}...`;
    }
    return largeString;
  };

  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const sort = (searchParams.get("sort") || "desc") as SearchQuerySort;
  const orderBy = (searchParams.get("orderBy") ||
    "score") as AnimeSearchQueryOrderby;
  const limit = 9;
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isError, error } = useGetAnimeSearchQuery(
    { q, sort, orderBy, limit, page },
    { skip: !q || !sort || !orderBy }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return (
      <AlertDestructive alertDescription={JSON.stringify(error, null, 2)} />
    );
  }

  return (
    <div className="grid gap-4">
      <div className="flex justify-center">
        <SearchAnimeForm getAnimeSearchApiArg={{ q, sort, orderBy }} />
      </div>

      <BentoGrid className="mx-auto md:auto-rows-[20rem]">
        {data.data?.map((anime) => (
          <Link key={anime.mal_id} href={`anime/${anime.mal_id}`}>
            <BentoGridItem
              key={anime.mal_id}
              title={trim(anime.title, 50)}
              description={trim(anime.synopsis, 150)}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] max-h-[10rem] rounded-xl justify-center">
                  <img
                    src={
                      anime.images?.jpg?.large_image_url ||
                      "https://placehold.co/200x200.png"
                    }
                    alt="placeholder"
                    className="overflow-hidden object-cover"
                  />
                </div>
              }
            />
          </Link>
        ))}
      </BentoGrid>
    </div>
  );
};

export default SearchPage;
