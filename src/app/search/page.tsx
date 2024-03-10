"use client";

import { SearchAnimeForm } from "@/components/animePosterGenerator/searchAnimeForm";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useGetAnimeSearchQuery } from "../../../generated/rtk-query/jikanApi";
import Loading from "@/components/animePosterGenerator/layout/loading";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import SkeletonWithImage from "@/components/ui/skeleton-with-image";
import Link from "next/link";

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
      <SearchAnimeForm getAnimeSearchApiArg={{ q }} />
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {data.data?.map((anime) => (
          <Link key={anime.mal_id} href={`anime/${anime.mal_id}`} type="">
            <BentoGridItem
              title={trim(anime.title, 50)}
              description={trim(anime.synopsis, 150)}
              header={
                <SkeletonWithImage
                  src={anime.images?.jpg?.image_url}
                  alt={anime.title}
                />
              }
            />
          </Link>
        ))}
      </BentoGrid>
    </div>
  );
};

export default SearchPage;
