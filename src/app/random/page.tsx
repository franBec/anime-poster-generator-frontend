"use client";

import { useGetRandomAnimeQuery } from "../../../generated/rtk-query/jikanApi";

const Random = () => {
  const { data, isLoading, isError } = useGetRandomAnimeQuery();

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError || !data) {
    return <p>failed to load todos</p>;
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Task List</h1>
        <p>{JSON.stringify(data)}</p>
      </div>
    </div>
  );
};

export default Random;
