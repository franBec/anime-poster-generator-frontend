import React from "react";
import Image from "next/image";

const SkeletonWithImage = ({
  src,
  alt,
}: {
  src: string | null | undefined;
  alt: string;
}) => {
  if (!src) {
    return (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
    );
  }
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] max-h-[9rem] rounded-xl overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={250}
        height={250}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default SkeletonWithImage;
