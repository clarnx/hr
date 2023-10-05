import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";

const MostDemandingFeatures = ({ isHome }) => {
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    if (window.innerWidth <= 960) {
      setIsMobile(true);
    }
  }, []);

  let homeImage = [
    {
      imageUrl:
        "https://nextjspics.s3.ap-south-1.amazonaws.com/most_demanding_2_2cb8479fc7.jpg", // Change Image Link Here
      description: "Latest Dining Sets",
      subHeading: "Explore Starting from ₹14999",
      href: "/products/dining-table"  // Change Link here
    },
    {
      imageUrl:
        "https://nextjspics.s3.ap-south-1.amazonaws.com/most_demanding_3_55ca1c2df3.webp", // Change Image Link Here
      description: "Modern Size Beds",
      subHeading: "Explore Starting for ₹10999",
      href: "/products/beds" // Change Link here
    },
    {
      imageUrl:
        "https://nextjspics.s3.ap-south-1.amazonaws.com/most_demanding_4_d9411aa437.jpg", // Change Image Link Here
      description: "Metal Wall Arts",
      subHeading: "Explore Starting for ₹999",
      href: "/products/wall-art" // Change Link here
    },
    {
      imageUrl:
        "https://nextjspics.s3.ap-south-1.amazonaws.com/most_demanding_5_cc74c1e451.webp",
      description: "Home office Tables",
      subHeading: "Explore Starting for ₹3999",
      href: "/products/table" // Change Link here
    },
    {
      imageUrl:
        "https://nextjspics.s3.ap-south-1.amazonaws.com/Most_demanding_1_06c9ba8b76.webp", // Change Image Link Here
      description: "Modern Dining Chairs",
      subHeading: "Explore Starting for ₹3999",
      href: "/products/dining-chair" // Change Link here
    },
    {
      imageUrl:
        "https://img.haroth.com/3_seater_sofa_homepage_3_dc9039f718.webp", // Change Image Link Here
      description: "Modern Sofa Collection",
      subHeading: "Explore Starting for ₹10999",
      href: "/products/sofa" // Change Link here
    },
    
  ];

  return (
    <div className="hidden md:block bg-[#f4ecec00] py-6 pb-6">
      <div className="text-center mb-2]">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Most Wanted
        </h2>
        <h3 className={`${isHome ? "px-6 md:px-16 lg:px-24 pb-4" : ""}`}>
          Buy our extensive collection.{" "}
          <Link href="/category/furniture" className="text text-red-600">See More</Link>.
        </h3>
      </div>

      {isMobile ? (
        <div className={`${isHome ? "px-6 md:px-16 lg:px-24" : "hidden"}`}>
          <Carousel responsive={responsive}>

            {homeImage.map((item, i) => (
              <div className="min-w-[160px] max-w-[160px] sm:min-w-[190px] sm:max-w-[190px] md:min-w-[200px] md:max-w-[200px] lg:min-w-[250px] lg:max-w-[250px]" key={i}>
                <Link href={item.href} target="_blank" className="overflow-hidden">
                  <Image
                    src={item.imageUrl.replace(
                    "nextjspics.s3.ap-south-1.amazonaws.com",
                    "img.haroth.com"
                  )}
                    width={800}
                    height={800}
                    alt="decor img"
                    className=""
                  />
                </Link>
                <p className="font-bold text-base sm:text-lg">
                  {item.description}
                </p>
                <p className="text-sm text-gray-500">{item.subHeading}</p>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div
          className={`grid grid-cols-2 lg:grid-cols-3 gap-3 ${isHome ? "px-6 md:px-16 lg:px-24" : ""
            } `}
        >
          {homeImage.map((item, i) => (
            <div key={i} className="overflow-hidden">
              <Link href={item.href} target="_blank" className="overflow-hidden">
                <Image
                  src={item.imageUrl.replace(
                    "nextjspics.s3.ap-south-1.amazonaws.com",
                    "img.haroth.com"
                  )}
                  width={800}
                  height={800}
                  alt="decor img"
                  className=""
                />
              </Link>
              <p className="font-bold text-base sm:text-lg">
                {item.description}
              </p>
              <p className="text-sm text-gray-500">{item.subHeading}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MostDemandingFeatures;
