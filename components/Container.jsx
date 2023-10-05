import React, { useEffect, useState } from 'react'
import Header from "./Header"
import Footer from "./Footer"
import Head from 'next/head';

const Container = ({children}) => {
  let isMobile = false;
  useEffect(() => {
if(window.innerWidth < 1024) {
    isMobile = true
  }

  }, [])
  
  
  const [openSearchModal, setOpenSearchModal] = useState(false);


  return (

    <>
        <Header
          openSearchModal={openSearchModal}
          setOpenSearchModal={setOpenSearchModal}
         />
        {children}

        <Footer />
    </>
  )
}

export default Container

