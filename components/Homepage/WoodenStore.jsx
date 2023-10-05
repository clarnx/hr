import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const WoodenStore = () => {
const router = useRouter();  
  let WoodenStore = [
    {
      imageUrl:
        "https://nextjspics.s3.ap-south-1.amazonaws.com/wooden_store_1_c1ae589fda.webp",
      subHeading: "Sheesham Book Case →",
      href: "/products/beds"  // Change the href according to your needs
    },
    {
      imageUrl:
        "https://nextjspics.s3.ap-south-1.amazonaws.com/wooden_store_2_65ec00b06b.webp",
      subHeading: "Sheesham Wooden Tables →",
      href: "/" // Change the href according to your needs
    },
    {
      imageUrl:
        "https://nextjspics.s3.ap-south-1.amazonaws.com/wooden_store_3_e3ac9c9419.jpg",
      subHeading: "Bedside Tables →",
      href: "/" // Change the href according to your needs
    },
    {
      imageUrl:
        "https://img.haroth.com/Acropolis_Sheesham_Wood_Dining_Chair_In_Rustic_Teak_Finish_Set_Of_2_jpg1_ec6a0ff692.webp",
      subHeading: "Sheesham Dining chairs →",
      href: "/" // Change the href according to your needs
    },
  ];
  return (
    <div className="mt-0 md:mt-8 pt-2 pb-8 px-6 md:px-16 lg:px-24 bg-white">
    <div className="text-center mb-4 flex flex-col-2 md:flex-row gap-0 justify-between">
      <h2 className="text- md:text-2xl font-bold text-left md:mb-2">
        Wooden Store Furnitures
        <div className="text text-sm text-gray-600">Shesham Wood Collection</div>
      </h2>

      {/* <h3 className="text text-left p-1"> */}
        {/* Explore Shesham Wood Collection {" "} */}
        {/* <Link href="/category/furniture" target="_blank" className="text-red-400 text-underline-offset-4">Click Here </Link> for More */}
      {/* </h3> */}
      
      <button onClick={() => router.push("/category/wooden-store")} className="border-2 border-black text-sm p-1 rounded-md px-4 transition-all duration-200 hover:bg-black hover:text-white cursor-pointer">
              SEE MORE
            </button>
    </div>
    
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-[1]">
        <Link href= "/products/beds" target='_blank'>
        <Image
          src="https://nextjspics.s3.ap-south-1.amazonaws.com/wooden_store_4_4a0b417c3f.webp"
          width={800}
          height={800}
          alt="decor img"
          className="h-[98%]"
        /></Link>
      </div>
      <div className="flex-[1] grid grid-cols-2 grid-flow-row gap-4">
        {WoodenStore.map((item, i) => (
          <Link href={item.href} target="_blank" key={i} className="flex flex-col justify-between">
            <Image
              src={item.imageUrl.replace(
                    "nextjspics.s3.ap-south-1.amazonaws.com",
                    "img.haroth.com"
                  )}
              width={440}
              height={440}
              alt="Kitchen Room Images"
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

export default WoodenStore;
