import React from 'react'
import { maestro, americanExpress, rupay, upi, visa } from "../public/footerImages"
import Image from 'next/image'

const CheckoutFooter = () => {
  return (
    <footer className="w-screen px-6 md:px-16 h-full py-4 lg:px-32 flex justify-between items-center gap-4 flex-wrap bg-[#e9d3a683]">
      <div className='flex flex-col gap-2'>
      <p className='text-xs md:text-sm text-gray-600'>We Accept:</p>

        <div className="flex gap-6">
          <Image
            width={200}
            height={200}
            className='h-[20px] w-auto'
            alt="visa card"
            src={visa}
          />
          <Image
            width={200}
            height={200}
            className='h-[20px] w-auto'
            alt="maestro card"
            src={maestro}
          />
          <Image
            width={200}
            height={200}
            className='h-[20px] w-auto'
            alt="american express card"
            src={americanExpress}
          />

          <Image
            width={200}
            height={200}
            className='h-[20px] w-auto'
            alt="rupay card"
            src={rupay}
          />
          <Image
            width={200}
            height={200}
            className='h-[20px] w-auto'
            alt="upi"
            src={upi}
          />
        </div>
      </div>

      <div className='text-xs md:text-sm lg:text-base'>
      &#169; Haroth.com 2023 - Present. All Rights Reserved.
      </div>

    </footer>
  )
}

export default CheckoutFooter