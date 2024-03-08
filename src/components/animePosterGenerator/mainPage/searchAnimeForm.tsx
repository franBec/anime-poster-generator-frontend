"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  q: z.string().min(1),
});

export function SearchAnimeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
