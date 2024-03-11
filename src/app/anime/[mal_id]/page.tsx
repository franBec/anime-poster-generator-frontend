"use client";

import Image from "next/image";
import React from "react";
import { useGetAnimeFullByIdQuery } from "../../../../generated/rtk-query/jikanApi";
import Loading from "@/components/animePosterGenerator/layout/loading";
import { AlertDestructive } from "@/components/animePosterGenerator/layout/alertDestructive";
import { useParams } from "next/navigation";
import GeneratePosterForm from "@/components/animePosterGenerator/generatePosterForm";

const AnimeDetails = () => {
  const params = useParams<{ mal_id: string }>();
  const mal_id = params.mal_id;

  let id: number;
  id = +mal_id;
  if (isNaN(id)) {
    throw new Error(`anime/${mal_id} is not a valid route`);
  }

  const { data, isLoading, isError, error } = useGetAnimeFullByIdQuery(
    { id },
    { skip: !id }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data || !data.data) {
    return (
      <AlertDestructive alertDescription={JSON.stringify(error, null, 2)} />
    );
  }
  return (
    <section className="overflow-hidden">
      <div className="container mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Image
            alt={data.data.title || "anime image"}
            width={1024}
            height={1024}
            className="lg:w-1/2 w-full object-cover object-center rounded border"
            src={
              data.data.images?.jpg?.large_image_url ||
              "https://placehold.co/400x600"
            }
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className=" text-3xl title-font font-medium mb-1">
              {data.data?.title}
            </h2>
            <div className="flex mb-4">
              <span className="flex items-center">
                <span className=" ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2">
                <span className=" ml-3">My anime list page</span>
              </span>
            </div>
            <p className="leading-relaxed">{data.data?.synopsis}</p>
            <div className="mt-6 items-center pb-5 border-b-2 border-primary mb-5"></div>
            <GeneratePosterForm anime={data.data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimeDetails;
