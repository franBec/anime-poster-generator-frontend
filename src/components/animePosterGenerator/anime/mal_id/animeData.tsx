import Link from "next/link";
import { AnimeFull } from "../../../../../generated/rtk-query/jikanApi";
import { ExternalLink } from "lucide-react";
import { Fragment } from "react";

const Separator = () => (
  <div>
    <span className="text-5xl">·</span>
  </div>
);

const AnimeData = ({ data }: { data: AnimeFull }) => {
  const stats = [
    { stat: "Score", value: data.score },
    { stat: "Ranked", value: `#${data.rank}` },
    { stat: "Popularity", value: `#${data.popularity}` },
  ];

  return (
    <>
      <h2 className=" text-3xl title-font font-medium mb-1">{data.title}</h2>
      <div className="flex space-x-3 mb-4 items-center">
        {stats.map((item, index) => (
          <Fragment key={index}>
            {index !== 0 && <Separator />}
            <div className="flex flex-col items-center">
              <div>
                <span>{item.stat}</span>
              </div>
              <div>
                <span className="font-bold">{item.value ?? "-"}</span>
              </div>
            </div>
          </Fragment>
        ))}
        {data.url && (
          <>
            <Separator />
            <div className="flex flex-col items-center">
              <Link href={data.url} target="_blank">
                <ExternalLink strokeWidth={2} />
              </Link>
            </div>
          </>
        )}
      </div>
      <p className="leading-relaxed">{data.synopsis}</p>
    </>
  );
};

export default AnimeData;
