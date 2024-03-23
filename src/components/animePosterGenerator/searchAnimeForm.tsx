"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { GetAnimeSearchApiArg } from "../../../generated/rtk-query/jikanApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
    const queryParams: string[] = [];

    for (const [key, value] of Object.entries(values)) {
      if (value !== undefined) {
        queryParams.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
      }
    }

    const queryString = queryParams.join("&");
    router.push(queryString ? `/search?${queryString}` : "/search");
  }

  const searchQuerySortValues = ["desc", "asc"];

  const animeSearchQueryOrderbyValues = [
    "mal_id",
    "title",
    "start_date",
    "end_date",
    "episodes",
    "score",
    "scored_by",
    "rank",
    "popularity",
    "members",
    "favorites",
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-3 border-2 border-primary rounded"
      >
        <div className="flex space-x-4">
          <div className="grow">
            <FormField
              control={form.control}
              name="q"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel className="flex justify-start ">
                      Anime name
                    </FormLabel>
                  </div>
                  <div>
                    <FormControl>
                      <Input placeholder="Search an anime..." {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex space-x-4 items-end">
          <div className="max-w-32 grow">
            <FormField
              control={form.control}
              name="orderBy"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel className="flex justify-start ">
                      Order by
                    </FormLabel>
                  </div>
                  <div>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        field.value || animeSearchQueryOrderbyValues[5]
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {animeSearchQueryOrderbyValues.map((it) => (
                          <SelectItem key={it} value={it}>
                            {it}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="max-w-32 grow">
            <FormField
              control={form.control}
              name="sort"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel className="flex justify-start ">
                      Sort by
                    </FormLabel>
                  </div>
                  <div>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || searchQuerySortValues[0]}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {searchQuerySortValues.map((it) => (
                          <SelectItem key={it} value={it}>
                            {it}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
