"use client";

import { useGetAnimeFullByIdQuery } from "../../../../generated/rtk-query/jikanApi";
import Loading from "@/components/animePosterGenerator/layout/loading";
import { AlertDestructive } from "@/components/animePosterGenerator/layout/alertDestructive";
import { useParams } from "next/navigation";
import GeneratePosterForm from "@/components/animePosterGenerator/anime/mal_id/generatePosterForm";
import AnimeData from "@/components/animePosterGenerator/anime/mal_id/animeData";

const AnimeFull = () => {
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
    <section className="body-font overflow-hidden">
      <div className="container  mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={data.data.title ?? "Anime Image"}
            className="lg:w-1/2 w-full object-cover object-center"
            src={
              data.data.images?.jpg?.large_image_url ||
              "https://placehold.co/400x600.png"
            }
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <AnimeData data={data.data} />
            <div className="mt-6 pb-5 border-b-2 border-primary mb-5"></div>
            <GeneratePosterForm anime={data.data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimeFull;
