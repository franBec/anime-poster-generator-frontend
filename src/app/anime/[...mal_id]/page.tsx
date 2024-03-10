import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const AnimeDetails = () => {
  return (
    <>
      <section className="body-font overflow-hidden">
        <div className="container mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              alt="ecommerce"
              width={500}
              height={500}
              className="lg:w-1/2 w-full object-cover object-center rounded border"
              src="https://cdn.myanimelist.net/images/anime/1295/106551.jpg"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className=" text-3xl title-font font-medium mb-1">
                The Catcher in the Rye
              </h2>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <span className=" ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2">
                  <span className=" ml-3">My anime list page</span>
                </span>
              </div>
              <p className="leading-relaxed">
                Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
                juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
                seitan poutine tumeric. Gastropub blue bottle austin listicle
                pour-over, neutra jean shorts keytar banjo tattooed umami
                cardigan.
              </p>
              <div className="mt-6 items-center pb-5 border-b-2 border-primary mb-5"></div>
              <div>
                <Button />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AnimeDetails;
