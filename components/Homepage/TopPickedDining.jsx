import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../../libs/api';
import Carousel from "react-multi-carousel";
import MinimalProductCard from '../MinimalProductCard';

const TopPickedDining = () => {
  
  const [topPickedDining, settopPickedDining] = useState([]);


  useEffect(() => {
    const topPickedDining = fetchDataFromApi(
      `api/products?filters[sub_categories][subcategory_slug][$eq]=dining-table&populate=*`
    ).then(res => settopPickedDining(res));
  
  }, [])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
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



  return (
    <div className="mt-8 px-6 md:px-16 lg:px-24">
    <div className="text-center mb-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Top Picked Dining Table
      </h2>
      <h3>
        Explore Comfortable Sofas{" "}
        <Link href="/products/dining-table">Click Here to More</Link>.
      </h3>
    </div>

    {
      topPickedDining?.data && (
        <div className='w-full'>
        <Carousel responsive={responsive}>
          {topPickedDining.data.map((item , i) => (
            <div key={i} className='min-w-[160px] max-w-[160px] sm:min-w-[190px] sm:max-w-[190px] md:min-w-[200px] md:max-w-[200px] lg:min-w-[250px] lg:max-w-[250px]'>
              <MinimalProductCard product={item} showPrice={true} /> 
              </div>
          ))}
              
              
          </Carousel>
        </div>
      )
    }
    
  </div>
  )
}

export default TopPickedDining