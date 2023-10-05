import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Router, useRouter } from "next/router";

const LivingRoom = () => {
 const router= useRouter(); 
  let livingRoomImage = [
    {
      imageUrl:
        "https://img.haroth.com/Acropolis_Sheesham_Wood_Dining_Chair_In_Rustic_Teak_Finish_Set_Of_2_jpg1_ec6a0ff692.webp",
      subHeading: "Dining Wooden Chairs →",
      href: "/products/dining-chair"  // Change the href according to your needs
    },
    {
      imageUrl:
        "https://nextjspics.s3.ap-south-1.amazonaws.com/Harleston_Sheesham_Wood_2_Seater_Dining_Set_In_Honey_Oak_Finish_b734eda8ba.jpg",
      subHeading: "2 Seater Dining Tables →",
      href: "/products/2-seater-dining-table/" // Change the href according to your needs
    },
    {
      imageUrl:
        "https://nextjspics.s3.ap-south-1.amazonaws.com/Abbey_Sheesham_Wood_4_Seater_Dining_Set_In_Rustic_Teak_Finish_bab8e832fa.webp",
      subHeading: "4 Seater Dining Tables →",
      href: "/products/4-seater-dining-table" // Change the href according to your needs
    },
    
    {
      imageUrl:
        "https://nextjspics.s3.ap-south-1.amazonaws.com/Aura_Sheesham_Wood_8_Seater_Dining_Set_In_Provincial_Teak_Finish_3088416637.jpg",
      subHeading: "8 Seater Dining Tables →",
      href: "/products/8-seater-dining-set" // Change the href according to your needs
    },
  ];
  return (
    <div className="mt-0 md:mt-8 pt-2 pb-8 px-6 md:px-16 lg:px-24 bg-white">
    <div className="text-center mb-4 flex flex-col-2 md:flex-row gap-0 justify-between">
      <h2 className="text- md:text-2xl font-bold text-left md:mb-2">
        Dining Room Furnitures
        <div className="text text-sm text-left text-gray-600">Explore Dining Room Collection</div>
      </h2>

      {/* <h3> */}
        {/* Explore Living Room Collection {" "} */}
        {/* <Link href="/category/furniture" target="_blank" className="text-red-400 text-underline-offset-4">Click Here </Link> for More */}
      {/* </h3> */}
      
      <button onClick={() => router.push("/products/dining-table")} className="border-2 border-black text-sm p-1 rounded-md px-4 transition-all duration-200 hover:bg-black hover:text-white cursor-pointer">
              SEE MORE
            </button>

    </div>
    <div className="flex flex-col md:flex-row gap-4 cursor-pointer">
      <div className="flex-[1]">
        <Link href="/products/dining-table" target='_blank'>
        <Image
          src="https://nextjspics.s3.ap-south-1.amazonaws.com/dining_4_e7b5a77a76.webp"
          width={800}
          height={880}
          alt="decor img"
          className="h-[98%]"
        /></Link>
      </div>
      <div className="flex-[1] grid grid-cols-2 grid-flow-row gap-4">
        {livingRoomImage.map((item, i) => (
          <Link href={item.href} target="_blank" key={i} className="flex flex-col justify-between">
            <Image
              src={item.imageUrl.replace(
                    "nextjspics.s3.ap-south-1.amazonaws.com",
                    "img.haroth.com"
                  )}
              width={440}
              height={440}
              alt="Living Room Images"
              className="h-[90%] w-auto"
            />
            <p className="font-bold">{item.subHeading}</p>
          </Link>
        ))}
      </div>
    </div>
  </div>
  );
};

export default LivingRoom;
