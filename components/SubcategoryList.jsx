import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const SubcategoryList = ({ subCategories, slug }) => {
  const router = useRouter();

  return (
    <div className="w-full relative flex justify-center gap-2  p-3">
      {subCategories.length > 0 && (
        <>
          {subCategories?.map((item, i) => (
            <div
              onClick={() => router.push(`/products/${item.attributes.subcategory_slug}`)}
              className={`flex flex-col items-center gap-1 border-[.5px] ${
                item.attributes.subcategory_slug == slug ? "border-black" : "border-gray-300"
              }  p-2 rounded-lg cursor-pointer`}
              key={i}
            >
              <Image
                width={70}
                height={70}
                alt={item?.attributes?.Title}
                src={
                  item?.attributes?.image?.data?.attributes?.url?.startsWith("/uploads")
                    ? `https://tak.haroth.com/${item?.attributes?.image?.data?.attributes?.url}`
                    : item?.attributes?.image?.data?.attributes?.url?.replace(
                        "nextjspics.s3.ap-south-1.amazonaws.com",
                        "img.haroth.com"
                      )
                }
                className=""
              />
              <p className="text-xs md:text-sm text-gray-600">{item.attributes.Title}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SubcategoryList;
