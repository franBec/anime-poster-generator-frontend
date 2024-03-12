"use client";

import { MakePosterApiArg } from "../../../generated/rtk-query/animePosterGeneratorBackendApi";
import {
  AnimeFull,
  useGetAnimeStaffQuery,
} from "../../../generated/rtk-query/jikanApi";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { useMakePosterAsBlobMutation } from "@/clients/animePosterGeneratorBackendClient";
import Loading from "./layout/loading";
import { AlertDestructive } from "./layout/alertDestructive";
import { imageUrlToBase64 } from "@/lib/imageUrlToBase64";
import { useState, useEffect } from "react";

const GeneratePosterForm = ({ anime }: { anime: AnimeFull }) => {
  const [imageBase64, setImageBase64] = useState<string>();
  useEffect(() => {
    const fetchImageBase64 = async () => {
      const imageUrl = anime.images?.jpg?.large_image_url;
      if (imageUrl) {
        try {
          setImageBase64((await imageUrlToBase64(imageUrl)) as string);
        } catch (error) {
          console.error("Error converting image to Base64", error);
        }
      }
    };

    if (anime.images?.jpg?.large_image_url) {
      fetchImageBase64();
    }
  }, [anime.images?.jpg?.large_image_url]);

  const form = useForm<MakePosterApiArg>();
  const [makePosterAsBlob] = useMakePosterAsBlobMutation();
  const onSubmit: SubmitHandler<MakePosterApiArg> = (makePosterApiArg) => {
    makePosterAsBlob(makePosterApiArg);
  };

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

  if (!imageBase64) {
    return (
      <AlertDestructive alertDescription={"Not able to get image for poster"} />
    );
  }
  form.setValue(
    "posterContent.image",
    imageBase64.replace("data:image/jpeg;base64,", "")
  );

  const title = anime.title;
  if (!title) {
    return (
      <AlertDestructive alertDescription={"Not able to get title for poster"} />
    );
  }
  form.setValue("posterContent.title", title);

  const year = anime.year;
  if (!year) {
    return (
      <AlertDestructive alertDescription={"Not able to get year for poster"} />
    );
  }
  form.setValue("posterContent.year", year);

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
  form.setValue("posterContent.genres", genres);

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
  form.setValue("posterContent.director", director);

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
  form.setValue("posterContent.studios", studios);
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
  form.setValue("posterContent.producers", producers);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Button type="submit">Generate poster</Button>
        </form>
      </Form>
    </>
  );
};

export default GeneratePosterForm;
