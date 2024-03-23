import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Anime } from "../../../../generated/rtk-query/jikanApi";
import Link from "next/link";

const AnimeBentoGrid = ({ data }: { data: Anime[] | undefined }) => {
  const trim = (largeString: string | null | undefined, maxLength: number) => {
    if (!largeString) return "";

    if (largeString.length > maxLength) {
      return `${largeString.substring(0, maxLength)}...`;
    }
    return largeString;
  };

  return (
    <BentoGrid className="mx-auto md:auto-rows-[20rem]">
      {data?.map((anime) => (
        <Link key={anime.mal_id} href={`anime/${anime.mal_id}`}>
          <BentoGridItem
            key={anime.mal_id}
            title={trim(anime.title, 50)}
            description={trim(anime.synopsis, 150)}
            header={
              <div className="flex flex-1 w-full h-full min-h-[6rem] max-h-[10rem] rounded-xl justify-center">
                <img
                  src={
                    anime.images?.jpg?.large_image_url ||
                    "https://placehold.co/200x200.png"
                  }
                  alt="placeholder"
                  className="overflow-hidden object-cover"
                />
              </div>
            }
          />
        </Link>
      ))}
    </BentoGrid>
  );
};

export default AnimeBentoGrid;
