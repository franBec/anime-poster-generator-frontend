"use client";

import Image from "next/image";
import React from "react";
import { useGetAnimeFullByIdQuery } from "../../../../generated/rtk-query/jikanApi";
import Loading from "@/components/animePosterGenerator/layout/loading";
import { AlertDestructive } from "@/components/animePosterGenerator/layout/alertDestructive";
import { useParams } from "next/navigation";
import GeneratePosterForm from "@/components/animePosterGenerator/anime/mal_id/generatePosterForm";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

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

  if (isError || !data) {
    return (
      <AlertDestructive alertDescription={JSON.stringify(error, null, 2)} />
    );
  }

  if (!data.data) {
    return <AlertDestructive alertDescription={`Anime ${id} not found`} />;
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
              "https://placehold.co/400x600.png"
            }
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className=" text-3xl title-font font-medium mb-1">
              {data.data.title}
            </h2>
            <div className="flex space-x-3 mb-4 items-center">
              <div className="flex flex-col items-center">
                <div>
                  <span>Score</span>
                </div>
                <div>
                  <span className="font-bold">{data.data.score}</span>
                </div>
              </div>
              <div>
                <span className="text-5xl">·</span>
              </div>
              <div className="flex flex-col items-center">
                <div>
                  <span>Ranked</span>
                </div>
                <div>
                  <span className="font-bold">#{data.data.rank}</span>
                </div>
              </div>
              <div>
                <span className="text-5xl">·</span>
              </div>
              <div className="flex flex-col items-center">
                <div>
                  <span>Popularity</span>
                </div>
                <div>
                  <span className="font-bold">#{data.data.popularity}</span>
                </div>
              </div>
              {data.data.url && (
                <>
                  <div>
                    <span className="text-5xl">·</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Link href={data.data.url} target="_blank">
                      <ExternalLink strokeWidth={2} />
                    </Link>
                  </div>
                </>
              )}
            </div>
            <p className="leading-relaxed">{data.data.synopsis}</p>
            <div className="mt-6 items-center pb-5 border-b-2 border-primary mb-5"></div>
            <GeneratePosterForm anime={data.data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimeDetails;
