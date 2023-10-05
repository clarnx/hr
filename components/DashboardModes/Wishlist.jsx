import React, { useEffect, useState } from 'react'
import { getWishlistedProducts } from '../../libs/api'
import ProductCard from '../ProductCard'
import MinimalProductCard from '../MinimalProductCard'

const Wishlist = ({
    userData
}) => {

    // console.log("Wishlist Dashboard", userData)

    const [wishlistedProducts, setWishlistedProducts] = useState([])

    useEffect(() => {
      if(userData.wishlist){
        getWishlistedProducts(userData?.wishlist?.ids).then(res => setWishlistedProducts(res));
      } else {
        setWishlistedProducts([])
      }

    }, [userData?.wishlist?.ids, userData?.wishlist]);


    // console.log("Wishlisted products in wishlist comp", wishlistedProducts)

    let id = new Promise((resolve, reject) => {
        resolve(userData.id)
    })

  return (
    <div className="flex flex-col gap-4 py-4">
    <h3 className="text-2xl font-bold">Wishlist ❤️</h3>
    {
        wishlistedProducts.length > 0 ? (
            <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4'>
            {
                wishlistedProducts.map((p, i) => (
                    <MinimalProductCard product={p} userId={id} key={i} />
                ))
            }
            </div>
        ) : (
            <div>
          <p className="text-3xl py-16 text-[#ff6536]">
            You have not Wishlisted any products
          </p>
        </div>
        ) 
    }
    </div>
  )
}

export default Wishlist