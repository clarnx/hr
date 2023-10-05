import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NeedGuide = () => {
  return (
    <div className="my-12 hidden md:grid grid-cols-2 gap-4">
    <h4 className="text-lg sm:text-xl md:text-2xl font-bold col-span-full">
      Need a Guide?
    </h4>

    <a href="https://blog.haroth.com" target="_blank" rel="noopener noreferrer">
    <Image
      src="https://img.haroth.com/068d96f1_b6a7_4eba_97b1_1daa0b7a4686_31e326a93b.avif"
      width={1000}
      height={1000}
      className="aspect-auto"
      alt="Guide Image"
    /></a>
    <a href="https://blog.haroth.com" target="_blank" rel="noopener noreferrer">
    <Image
      src="https://img.haroth.com/Chairs_Homepage_3_87856fa1a9.webp"
      width={1000}
      height={1000}
      className="aspect-auto"
      alt="Second Guide Image"
    /></a>
  </div>
  )
}

export default NeedGuide