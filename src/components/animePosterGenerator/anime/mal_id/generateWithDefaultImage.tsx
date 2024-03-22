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
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Button type="submit">Generate Poster</Button>
        </div>
      </form>
    </Form>
  );
};

export default GenerateWithDefaultImage;
