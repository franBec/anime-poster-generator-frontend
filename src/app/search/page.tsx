"use client";

import { SearchAnimeForm } from "@/components/animePosterGenerator/searchAnimeForm";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useGetAnimeSearchQuery } from "../../../generated/rtk-query/jikanApi";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const { data, isLoading, isError } = useGetAnimeSearchQuery(
    { q },
    { skip: !q }
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !data) {
    return <p>failed to load</p>;
  }

  return (
    <>
      <SearchAnimeForm />
      <p>{JSON.stringify(data)}</p>
    </>
  );
};

export default SearchPage;
