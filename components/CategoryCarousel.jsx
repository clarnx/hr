import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import Carousel from "react-multi-carousel";

const CategoryCarousel = ({categories}) => {

    const [mobileCategories, setMobileCategories] = useState(categories.data);


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
          items: 5
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 4
        }
      };

    console.log("Categories", categories)
  return (
    <div className='w-screen px-6 md:px-16 block lg:hidden pt-4'>
     <Carousel responsive={responsive}
        showDots={false}
        arrows={false}
     >

    {
        mobileCategories.map((item, i) => (
            <Link href={`category/${item.attributes.category_slug}`} key={i} className='min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] flex flex-col gap-1 justify-center items-center rounded-full'>
                <Image
                    src={item.attributes.mobileImage?.data?.attributes?.url.startsWith('/uploads') ? 
                        `https://tak.haroth.com${item.attributes.mobileImage?.data?.attributes?.url}` :
                        item.attributes.mobileImage?.data?.attributes?.url.replace("nextjspics.s3.ap-south-1.amazonaws.com", "img.haroth.com")
                    }
                    width={200}
                    height={200}
                    alt='Image'
                    className='min-w-[70px] max-w-[70px] min-h-[70px] max-h-[70px] rounded-full object-cover bg-center text-center'
                 />
                 <p className='text-xs text-center'>{item.attributes.categoryname}</p>
            </Link>
        ))
    }
    </Carousel>
    </div>
  )
}

export default CategoryCarousel