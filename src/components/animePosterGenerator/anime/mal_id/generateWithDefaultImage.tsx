import { SubmitHandler, useForm } from "react-hook-form";
import {
  MakePosterApiArg,
  PosterContent,
} from "../../../../../generated/rtk-query/animePosterGeneratorBackendApi";
import { useMakePosterAsBlobMutation } from "@/clients/animePosterGeneratorBackendClient";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const GenerateWithDefaultImage = ({
  posterContent,
}: {
  posterContent: PosterContent;
}) => {
  const form = useForm<MakePosterApiArg>({ defaultValues: { posterContent } });
  const [makePosterAsBlob] = useMakePosterAsBlobMutation();

  const onSubmit: SubmitHandler<MakePosterApiArg> = (makePosterApiArg) => {
    makePosterAsBlob(makePosterApiArg);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button type="submit">Generate Poster</Button>
      </form>
    </Form>
  );
};

export default GenerateWithDefaultImage;
