"use client";

import {
  AnimeFull,
  useGetAnimeStaffQuery,
} from "../../../../../generated/rtk-query/jikanApi";
import Loading from "../../layout/loading";
import { AlertDestructive } from "../../layout/alertDestructive";
import { imageUrlToBase64 } from "@/lib/imageUrlToBase64";
import { useState, useEffect } from "react";
import GenerateWithDefaultImage from "./generateWithDefaultImage";
import GenerateWithCustomImage from "./generateWithCustomImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GeneratePosterForm = ({ anime }: { anime: AnimeFull }) => {
  const [image, setImage] = useState<string>();
  useEffect(() => {
    const fetchImageBase64 = async () => {
      const imageUrl = anime.images?.jpg?.large_image_url;
      if (imageUrl) {
        try {
          const imageInBase64 = (await imageUrlToBase64(imageUrl)) as string;
          setImage(imageInBase64.replace("data:image/jpeg;base64,", ""));
        } catch (error) {
          console.error("Error converting image to Base64", error);
        }
      }
    };

    if (anime.images?.jpg?.large_image_url) {
      fetchImageBase64();
    }
  }, [anime.images?.jpg?.large_image_url]);

  let id: number;
  if (anime.mal_id) {
    id = +anime.mal_id;
    if (isNaN(id)) {
      throw new Error(
        `anime/${anime.mal_id} is not a valid anime to search staff information`
      );
    }
  } else {
    throw new Error("anime.mal_id is not provided");
  }

  const {
    data: animeStaff,
    isLoading,
    isError,
    error,
  } = useGetAnimeStaffQuery({ id });

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError || !animeStaff) {
    return (
      <AlertDestructive alertDescription={JSON.stringify(error, null, 2)} />
    );
  }

  if (!animeStaff.data || !animeStaff.data.length) {
    return (
      <AlertDestructive
        alertDescription={`anime/${anime.mal_id} did not bring back any staff information`}
      />
    );
  }

  const title = anime.title;
  if (!title) {
    return (
      <AlertDestructive alertDescription={"Not able to get title for poster"} />
    );
  }

  const year = anime.year;
  if (!year) {
    return (
      <AlertDestructive alertDescription={"Not able to get year for poster"} />
    );
  }

  if (!anime.genres) {
    return (
      <AlertDestructive
        alertDescription={"Not able to get genres for poster"}
      />
    );
  }
  const genres = anime.genres
    .filter((genre): genre is { name: string } => genre.name !== undefined)
    .map((genre) => genre.name) as string[];
  if (!genres.length) {
    return (
      <AlertDestructive
        alertDescription={"Not able to get genres for poster"}
      />
    );
  }

  const director = animeStaff.data.find((person) =>
    person.positions?.includes("Director")
  )?.person?.name;
  if (!director) {
    return (
      <AlertDestructive
        alertDescription={"Not able to get director for poster"}
      />
    );
  }

  if (!anime.studios) {
    return (
      <AlertDestructive
        alertDescription={"Not able to get studios for poster"}
      />
    );
  }
  const studios = anime.studios
    .filter((studio): studio is { name: string } => studio.name !== undefined)
    .map((studio) => studio.name) as string[];
  if (!studios.length) {
    return (
      <AlertDestructive
        alertDescription={"Not able to get studios for poster"}
      />
    );
  }

  if (!anime.producers) {
    return (
      <AlertDestructive
        alertDescription={"Not able to get producers for poster"}
      />
    );
  }
  const producers = anime.producers
    .filter(
      (producer): producer is { name: string } => producer.name !== undefined
    )
    .map((producer) => producer.name) as string[];
  if (!producers.length) {
    return (
      <AlertDestructive
        alertDescription={"Not able to get producers for poster"}
      />
    );
  }

  return (
    <div className="flex justify-center">
      <Tabs defaultValue="defaultImage" className="">
        <TabsList>
          {image && (
            <TabsTrigger value="defaultImage">Default Image</TabsTrigger>
          )}
          <TabsTrigger value="customImage">Custom Image</TabsTrigger>
        </TabsList>
        {image && (
          <TabsContent value="defaultImage">
            <GenerateWithDefaultImage
              posterContent={{
                director,
                genres,
                image,
                producers,
                studios,
                title,
                year,
              }}
            />
          </TabsContent>
        )}
        <TabsContent value="customImage">
          <GenerateWithCustomImage
            posterContentWithoutImage={{
              director,
              genres,
              producers,
              studios,
              title,
              year,
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GeneratePosterForm;
