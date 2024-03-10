"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { GetAnimeSearchApiArg } from "../../../generated/rtk-query/jikanApi";

export function SearchAnimeForm({
  getAnimeSearchApiArg,
}: {
  getAnimeSearchApiArg: GetAnimeSearchApiArg;
}) {
  const form = useForm<GetAnimeSearchApiArg>({
    defaultValues: getAnimeSearchApiArg,
  });

  const router = useRouter();

  function onSubmit(values: GetAnimeSearchApiArg) {
    router.push(`/search?q=${values.q}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex space-x-4">
          <div className="grow">
            <FormField
              control={form.control}
              name="q"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Search an anime..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button type="submit">Search</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
