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
  const [imageBase64, setImageBase64] = useState("");

  useEffect(() => {
    const fetchImageBase64 = async () => {
      const imageUrl =
        "https://cdn.myanimelist.net/images/anime/1470/137929l.jpg";
      try {
        setImageBase64((await imageUrlToBase64(imageUrl)) as string);
      } catch (error) {
        console.error("Error converting image to Base64", error);
      }
    };

    fetchImageBase64();
  }, []);

  const form = useForm<MakePosterApiArg>({
    defaultValues: {
      posterContent: {
        title: anime.title,
        genres: anime.genres?.map((genre) => genre.name),
        year: anime.year || 0,
      },
    },
  });

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
    data: animeStuff,
    isLoading,
    isError,
    error,
  } = useGetAnimeStaffQuery({ id });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !animeStuff) {
    return (
      <AlertDestructive alertDescription={JSON.stringify(error, null, 2)} />
    );
  }

  if (!animeStuff.data || !animeStuff.data.length) {
    return (
      <AlertDestructive
        alertDescription={`anime/${anime.mal_id} did not brought back any staff information`}
      />
    );
  }

  if (!imageBase64) {
    <AlertDestructive alertDescription={"Not able to get base 64 image"} />;
  }

  form.setValue(
    "posterContent.image",
    imageBase64.replace("data:image/jpeg;base64,", "")
  );
  form.setValue(
    "posterContent.director",
    animeStuff.data.find((person) => person.positions?.includes("Director"))
      ?.person?.name || ""
  );

  if (anime.studios) {
    form.setValue(
      "posterContent.producers",
      anime.studios
        .filter(
          (studio): studio is { name: string } => studio.name !== undefined
        )
        .map((studio) => studio.name) as string[]
    );
  }

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
