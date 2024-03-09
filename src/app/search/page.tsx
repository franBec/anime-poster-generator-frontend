"use client";

import { SearchAnimeForm } from "@/components/animePosterGenerator/mainPage/searchAnimeForm";
import { useSearchParams } from "next/navigation";
import React from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
    <>
      <SearchAnimeForm />
      <p>{q}</p>
    </>
  );
};

export default SearchPage;
