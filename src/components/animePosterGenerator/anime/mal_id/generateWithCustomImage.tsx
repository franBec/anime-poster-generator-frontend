import { SubmitHandler, useForm } from "react-hook-form";
import { PosterContent } from "../../../../../generated/rtk-query/animePosterGeneratorBackendApi";
import { useMakePosterAsBlobMutation } from "@/clients/animePosterGeneratorBackendClient";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GenerateWithCustomImage = ({
  posterContentWithoutImage,
}: {
  posterContentWithoutImage: PosterContentWithoutImage;
}) => {
  type PosterContentWithFileList = PosterContentWithoutImage & {
    fileList: FileList;
  };

  const form = useForm<PosterContentWithFileList>({
    defaultValues: posterContentWithoutImage,
  });
  const [makePosterAsBlob] = useMakePosterAsBlobMutation();
  const onSubmit: SubmitHandler<PosterContentWithFileList> = (
    posterContentWithFileList
  ) => {
    const makePosterApiArg = {
      posterContent: {
        title: posterContentWithFileList.title,
        year: posterContentWithFileList.year,
        genres: posterContentWithFileList.genres,
        director: posterContentWithFileList.director,
        producers: posterContentWithFileList.producers,
        studios: posterContentWithFileList.studios,
        image: "",
      },
    };

    const file = posterContentWithFileList.fileList[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64String = reader.result as string;
        if (base64String) {
          makePosterApiArg.posterContent.image = base64String.replace(
            "data:image/jpeg;base64,",
            ""
          );
          makePosterAsBlob(makePosterApiArg);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input {...form.register("fileList")} id="picture" type="file" />
          <Button type="submit">Generate Poster</Button>
        </div>
      </form>
    </Form>
  );
};
export type PosterContentWithoutImage = Omit<PosterContent, "image">;
export default GenerateWithCustomImage;
