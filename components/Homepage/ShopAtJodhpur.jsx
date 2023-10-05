import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ShopAtJodhpur = () => {
  return (
    <div className="min-h-max w-screen mt-8 py-6 bg-sky-100 px-6 md:px-16 lg:px-24 pb-10">
      <div className="text-center mb-2">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          SHOP AT JODHPUR
        </h2>
        <h3>
          Explore Comfortable Sofas{" "}
          <Link href="/category/handicrafts" target='_blank'>Click Here to More</Link>.
        </h3>
      </div>

      <div className="mt-4 w-full gap-4 grid grid-cols-2 md:grid-cols-4 place-items-stretch">
        <Link href="/category/handicrafts" className='col-span-full w-full h-auto' target='_blank'> {/* change href according to your needs */}
          <Image
            src="https://img.haroth.com/free_template_jodhpur_674d293c5e.webp"
            width={1500}
            height={1500}
            alt="Shop at Jodhpur"
            className="aspect-auto col-span-full w-full h-auto"
          />
        </Link>

        <Link href="/products/handicraft" target='_blank'> {/* change href according to your needs */}
          <Image
            src="https://img.haroth.com/Handicraft_Homepage_1_38c953c7db.webp"
            width={1500}
            height={1500}
            alt="Rajasthani Art"
            className="w-full h-auto"
          />
          <p className="text-base">Antique Furniture</p>
          <p className="text-xs sm:text-sm text-gray-500">
            100+ Collections
          </p>
        </Link>
        <Link href="/" target='_blank'> {/* change href according to your needs */}
          <Image
            src="https://img.haroth.com/Handicraft_homepage_2_7db3cf31b9.webp"
            width={1500}
            height={1500}
            alt="Antique Furniture"
            className=" w-full h-auto"
          />
          <p className="text-base">Antique Furniture</p>
          <p className="text-xs sm:text-sm text-gray-500">
            120+ Collections
          </p>
        </Link>
        <Link href="/products/handicraft" target='_blank'> {/* change href according to your needs */}
          <Image
            src="https://img.haroth.com/Handicraft_homepage_3_6e0cbd3d32.webp"
            width={1500}
            height={1500}
            alt="Udaipur Arts"
            className=" w-full h-auto"
          />
          <p className="text-base">Antique Furniture</p>
          <p className="text-xs sm:text-sm text-gray-500">
            150+ Collections
          </p>
        </Link>
        <Link href="/products/handicraft" target='_blank'> {/* change href according to your needs */}
          <Image
            src="https://img.haroth.com/Handicraft_homepage_4_0ee94b73a9.webp"
            width={1500}
            height={1500}
            alt="Shop at Jodhpur"
            className="w-full h-auto"
          />
          <p className="text-base">Antique Furniture</p>
          <p className="text-xs sm:text-sm text-gray-500">
            170+ Collections
          </p>
        </Link>
      </div>
    </div>
  )
}

export default ShopAtJodhpur