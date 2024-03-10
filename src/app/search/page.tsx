"use client";

import { SearchAnimeForm } from "@/components/animePosterGenerator/searchAnimeForm";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useGetAnimeSearchQuery } from "../../../generated/rtk-query/jikanApi";
import Loading from "@/components/animePosterGenerator/layout/loading";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import SkeletonWithImage from "@/components/ui/skeleton-with-image";

const SearchPage = () => {
  const trim = (synopsis: string | null | undefined, maxLength: number) => {
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
    <div className="grid gap-4">
      <SearchAnimeForm />
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {data.data?.map((anime) => (
          <BentoGridItem
            key={anime.mal_id}
            title={trim(anime.title, 50)}
            description={trim(anime.synopsis, 150)}
            header={
              <SkeletonWithImage
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
              />
            }
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default SearchPage;
