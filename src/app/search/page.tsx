"use client";

import { SearchAnimeForm } from "@/components/animePosterGenerator/search/searchAnimeForm";
import { useSearchParams } from "next/navigation";
import {
  AnimeSearchQueryOrderby,
  SearchQuerySort,
  useGetAnimeSearchQuery,
} from "../../../generated/rtk-query/jikanApi";
import Loading from "@/components/animePosterGenerator/layout/loading";
import { AlertDestructive } from "@/components/animePosterGenerator/layout/alertDestructive";
import AnimeBentoGrid from "@/components/animePosterGenerator/search/animeBentoGrid";
import PaginationAnimeSearch from "@/components/animePosterGenerator/search/paginationAnimeSearch";

const SearchPage = () => {
  const searchParams = useSearchParams();

  const getAnimeSearchApiArg = {
    q: searchParams.get("q") || "",
    sort: (searchParams.get("sort") || "desc") as SearchQuerySort,
    orderBy: (searchParams.get("orderBy") ||
      "score") as AnimeSearchQueryOrderby,
    limit: 9,
    page: Number(searchParams.get("page")) || 1,
  };

  const { data, isLoading, isError, error } = useGetAnimeSearchQuery(
    getAnimeSearchApiArg,
    {
      skip:
        !getAnimeSearchApiArg.q ||
        !getAnimeSearchApiArg.sort ||
        !getAnimeSearchApiArg.orderBy ||
        !getAnimeSearchApiArg.page,
    }
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
        <SearchAnimeForm getAnimeSearchApiArg={getAnimeSearchApiArg} />
      </div>
      <AnimeBentoGrid data={data.data} />
      {data.pagination && (
        <PaginationAnimeSearch
          paginationPlus={data}
          getAnimeSearchApiArg={getAnimeSearchApiArg}
        />
      )}
    </div>
  );
};

export default SearchPage;
