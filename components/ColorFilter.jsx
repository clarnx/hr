import React, { useEffect, useState } from "react";
import { colors } from "../libs/constant";
import Image from "next/image";
import { fetchDataFromApi } from "../libs/api";

const ColorBox = ({ colorCode, colorImage, name, setSelectedColor, selectedColor }) => {
  // console.log("COLOR CODE", colorCode);
    // console.log("Color name", colorName)

  const toggleColor = (name) => {
    setSelectedColor(prev => {
      if(prev === name) {
        return "";
      }
      return name;
    })
  }


  return (
    <div onClick={() => { toggleColor(name) }} className={`w-full flex gap-4  items-center text-center cursor-pointer hover:bg-gray-200 p-1 rounded-lg ${selectedColor == name && "border border-black"}`}>
            
      { colorCode ? <div style={{backgroundColor : `${colorCode}`}} className={`rounded-full w-4 h-4 sm:w-6 sm:h-6`}></div>  : <Image
        width={40}
        alt={name}
        height={40}
        className='rounded-full w-4 h-4 sm:w-6 sm:h-6'
        src={colorImage}
        />
      }
      <span className="text-xs sm:text-sm text-center">{name}</span>
    </div>
  );
};

const ColorFilter = ({ setProducts, receivedProducts }) => {
   
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {

    console.log("RECEIVED PRODUCTS", receivedProducts)
    setProducts(receivedProducts.filter(item => item.attributes.colour.includes(selectedColor)))

  }, [selectedColor, receivedProducts])

  return (
    <div className="w-full grid grid-cols-1 gap-2 max-h-[200px] overflow-auto color-filter">
      {
        colors.map((item, i) => (
          <ColorBox
            key={i}
            colorCode={item?.colorCode}
            colorImage={item?.colorImage}
            name={item.name}
            setSelectedColor={setSelectedColor}
            selectedColor={selectedColor}
          />
        ))}
    </div>
  );
};

export default ColorFilter;
