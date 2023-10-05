import Link from 'next/link'
import React from 'react';

const Breadcrumb = ({
    breadcrumb,
    isWhite
}) => {

    // console.log("Breadcrumb", breadcrumb)
  return (
    <ul className={` text-center hidden md:flex gap-2 text-xs md:text-xs lg:text-base capitalize ${isWhite && "bg-white"} mb-3`}>
        {
            breadcrumb.map((item, i) => (
                <Link key={i} className='hover:text-[#ff6536] cursor-pointer font-medium text-sm text-gray-500 ' href={item?.href}>
                    {item?.name} {`${i === breadcrumb.length - 1 ? "": ">"}`}
                </Link>
            ))
        }
    </ul>
  )
}

export default Breadcrumb