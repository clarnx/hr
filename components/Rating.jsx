import React from 'react'
import {AiFillStar} from "react-icons/ai"

const Rating = ({rating}) => {

    // const randomRating = Math.floor(Math.random(5-3) * 3);


  return (
    <span className='flex text-gray-300'>
        <AiFillStar className={`${Math.floor(rating) > 0 && "text-yellow-400"}`} />
        <AiFillStar className={`${Math.floor(rating) > 1 && "text-yellow-400"}`} />
        <AiFillStar className={`${Math.floor(rating) > 2 && "text-yellow-400"}`} />
        <AiFillStar className={`${Math.floor(rating) > 3 && "text-yellow-400"}`} />
        <AiFillStar className={`${Math.floor(rating) > 4 && "text-yellow-400"}`} />
    </span>
  )
}


export default Rating;