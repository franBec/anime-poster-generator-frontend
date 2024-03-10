"use client";

import { SearchAnimeForm } from "@/components/animePosterGenerator/searchAnimeForm";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useGetAnimeSearchQuery } from "../../../generated/rtk-query/jikanApi";
import Loading from "@/components/animePosterGenerator/layout/loading";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const SearchPage = () => {
  const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
  );

  const trimSynopsis = (
    synopsis: string | null | undefined,
    maxLength: number
  ) => {
    if (!synopsis) return "";

    if (synopsis.length > maxLength) {
      return `${synopsis.substring(0, maxLength)}...`;
    }
    return synopsis;
  };

  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const { data, isLoading, isError } = useGetAnimeSearchQuery(
    { q },
    { skip: !q }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <p>failed to load</p>;
  }

  return (
    <>
      <SearchAnimeForm />
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {data.data?.map((anime) => (
          <BentoGridItem
            key={anime.mal_id}
            title={anime.title}
            description={trimSynopsis(anime.synopsis, 100)}
            header={<Skeleton />}
          />
        ))}
      </BentoGrid>
    </>
  );
};

export default SearchPage;
