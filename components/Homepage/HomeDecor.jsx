import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Router, useRouter } from "next/router";

const HomeDecor = () => {
  const router= useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };



  let mostWantedHomeDecors = [
    {
      imageUrl:
        "https://img.haroth.com/Metal_Antique_Round_Wall_Mirror_In_Multicolour_By_Malik_Design_9edbf529ac.jpg",
      subHeading: "Decorative Mirrors",
      desription: "80+ Options | From ₹1499",
      href: "/products/mirror"
    },
    {
      imageUrl:
        "https://img.haroth.com/Iron_Decorative_Tree_Wall_Art_With_LED_In_Brown_b5b0861763.webp",
      subHeading: "LED Wall Art",
      desription: "815+ Options | From ₹799",
      href: "/products/wall-art"
    },
    {
      imageUrl:
        "https://img.haroth.com/Iron_Lord_Ganesha_Wall_Art_With_LED_In_Gold_jpg1_7db937e0da.webp",
      subHeading: "Spiritual Wall Arts",
      desription: "110+ Options | From ₹1199",
      href: "/products/wall-art"
    },
    {
      imageUrl:
        "https://img.haroth.com/Metal_Decorative_Remote_Holder_1dee801d51.webp",
      subHeading: "Designer Pen Holder",
      desription: "315+ Options | From ₹99",
      href: "/products/table-organizer"
    },
    {
      imageUrl:
        "https://img.haroth.com/Musician_Metal_Pen_Stand_3152059227.webp",
      subHeading: "Table Organisers",
      desription: "35+ Options | From ₹199",
      href: "/products/table-organizer"
    },
    {
      imageUrl:
        "https://img.haroth.com/clock_d71ce95960.avif",
      subHeading: "Wall Clocks",
      desription: "300+ Options | From ₹299",
      href: "/products/wall-clock"
    },
    {
      imageUrl:
        "https://img.haroth.com/Classic_Vintage_Marble_Buddha_Head_Statue_2022_04_16_at_6_47_41_PM_41b0d471df.png",
      subHeading: "Buddha Statue",
      desription: "50+ Options | From ₹2499",
      href: "/products/handicraft"
    },
    {
      imageUrl:
        "https://img.haroth.com/Antique_Texture_Handmade_Multicolor_Elephant8_798a1b723b.webp",
      subHeading: "Handicrafts Store",
      desription: "315+ Options | From ₹399",
      href: "/products/handicraft"
    },
  ];

  return (
    <div className="min-h-max w-screen mt-8 py-4 px-6 md:px-16 lg:px-24 bg-[#D4F1F4]">
      <div className="text-center mb-2">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Most Wanted Home Decors
        </h2>
        <h3>
          Explore The Most Wanted Decors{" "}
          <Link href="/category/home-decor" target="_blank" className="text text-red-500 underline underline-offset-6">See More</Link>.
        </h3>
      </div>

      {isMobile ? (
        <div>

          {/* FIRST FOUR START */}
          <Carousel responsive={responsive}>
            {mostWantedHomeDecors.slice(0, 4).map((item, i) => (
              <div key={i} className="min-w-[160px] max-w-[160px] sm:min-w-[190px] sm:max-w-[190px] md:min-w-[280px] md:max-w-[280px] mb-2 cursor-pointer">
                <div
                  className="p-1 flex flex-col gap-2 items-center bg-white"
                  key={i}
                >
                  <Image
                    src={item.imageUrl.replace(
                      "nextjspics.s3.ap-south-1.amazonaws.com",
                      "img.haroth.com"
                    )}
                    width={800}
                    height={800}
                    alt={item.subHeading}
                  />
                  
                  <p className="text-center font-bold text-black">
                    {item.subHeading}
                  </p>
                  <p className="text-center text-sm text-gray-500">
                    {item.desription}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
          {/* FIRST FOUR END */}

          {/* LAST FOUR START */}

          <Carousel responsive={responsive}>
            {mostWantedHomeDecors.slice(4).map((item, i) => (
              <div key={i} className="min-w-[160px] max-w-[160px] sm:min-w-[190px] sm:max-w-[190px] md:min-w-[280px] md:max-w-[280px]">
                <div
                  className="p-1 flex flex-col gap-2 items-center bg-white"
                  key={i}
                >
                  <Image
                    src={item.imageUrl.replace(
                      "nextjspics.s3.ap-south-1.amazonaws.com",
                      "img.haroth.com"
                    )}
                    width={800}
                    height={800}
                    alt={item.subHeading}
                  />
                  <p className="text-center font-bold text-black">
                    {item.subHeading}
                  </p>
                  <p className="text-center text-sm text-gray-500">
                    {item.desription}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>

          {/* LAST FOUR END */}

        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mostWantedHomeDecors.map((item, i) => (
            <div
              className="p-1 flex flex-col gap-2 items-center bg-white cursor-pointer"
              key={i}
            >
              <Link href= {`${item.href}`} target="_blank" key={i} className="flex flex-col justify-between">
              <Image
                src={item.imageUrl.replace(
                  "nextjspics.s3.ap-south-1.amazonaws.com",
                  "img.haroth.com"
                )}
                width={800}
                height={880}
                alt={item.subHeading}
              />
              <p className="text-center font-bold text-black">
                {item.subHeading}
              </p>
              <p className="text-center text-sm text-gray-500">
                {item.desription}
              </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeDecor;
