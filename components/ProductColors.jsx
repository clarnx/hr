import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductColors = ({ products, slug }) => {

  // console.log("COLOR PRODUCTS", products)

  return (
    <div className=' flex gap-2'>
      {
        products.map((p, i) => (
          <div className='w-fit relative h-fit'  key={i}>
          <Link href={`/product/${p.attributes.slug}`}>

            <Image
            src={p.attributes.imageMain.data.attributes.url.replace("nextjspics.s3.ap-south-1.amazonaws.com", "img.haroth.com")}
            width={100}
            height={100}
            alt={p.attributes?.Title}
            className='min-w-[60px] max-w-[60px] sm:min-w-[100px] sm:max-w-[100px]'
            />
          </Link>
            {
           
              p.attributes.slug === slug &&  <p className='text-white absolute text-3xl font-bold top-0 left-0 z-20 w-full h-full flex items-center justify-center bg-black/20'>✓</p>
            }
          </div>
        ))
      }      
    </div>
  )
}

export default ProductColors