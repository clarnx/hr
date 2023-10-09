import React, { useEffect, useState } from "react";
import { BsChevronDown, BsSignDoNotEnterFill } from "react-icons/bs";
import { useSession } from "next-auth/react"
import Rating from "./Rating";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API_URL, STRAPI_API_TOKEN } from "../libs/urls"
import { fetchDataFromApi } from "../libs/api";
import { onOpen as openLoginModal } from "../store/loginModalSlice"
import { useDispatch } from "react-redux";
import Image from "next/image";
import Loading from "../components/Loading"
import Link from "next/link";


const StarInput = ({ register, errors }) => {


  const dispatch = useDispatch();
  return (
    <div className="rating w-full">
      <label>
        <input {...register("stars", {
          value: 1,
          required: true
        })} type="radio" name="stars" value="1" />
        <span class="icon">★</span>
      </label>
      <label>
        <input {...register("stars", {
          value: 2,
          required: true
        })} type="radio" name="stars" value="2" />
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input {...register("stars", {
          value: 3,
          required: true
        })} type="radio" name="stars" value="3" />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input {...register("stars", {
          value: 4,
          required: true
        })} type="radio" name="stars" value="4" />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input {...register("stars", {
          value: 5,
          required: true
        })} type="radio" name="stars" value="5" />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
    </div>
  )
}

const ProductDetails = ({
  productId,
  description,
  brand,
  warranty,
  size,
  material,
  assemby,
  reviews,
  brandDescription,
  armType,
  weight,
  SKU_ID
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [showSpecifications, setShowSpecifications] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [productReviews, setProductReviews] = useState(reviews);
  const [reviewAdded, setReviewAdded] = useState(false)
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getValues,
  } = useForm();

  console.log("REVIEWS", reviews);
  console.log("PRODUCT ID", productId)

  const { data: session } = useSession();

  useEffect(() => {

    if (reviewAdded == true) {

      const updatedReviews = fetchDataFromApi(`api/reviews?filters[product][id][$contains]=${productId}&populate=*`).then(res => {
        if (res?.data) {
          setProductReviews(res?.data);
        }
      })
    }

  }, [reviewAdded, productId])

  const onSubmit = async (data) => {

    try {
      if (!session?.id) {
        dispatch(openLoginModal());
        toast('Login to Continue', {
          icon: '❗',
        });

        return;
      }

      setIsLoading(true);
      setReviewAdded(false);
      const formData = new FormData();

      let dataObj = {
        title: data.title,
        rating: data.stars,
        description: data.description,
        product: {
          connect: [productId]
        }
      }

      formData.append("data", JSON.stringify(dataObj))
      for (let i = 0; i < uploadedImageUrls.length; i++) {
        formData.append("files.Image", uploadedImageUrls[i]);
      }
      const response = await axios.post(`${API_URL}api/reviews`, formData, {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status == 200) {

        toast.success("Review Added")
        setShowReviews(true)
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding review")
    } finally {
      setReviewAdded(true);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-0 transition-all duration-200">
      {/* SPECIFICATION START */}
      <>
        <div onClick={() => setShowSpecifications((prev) => !prev)} className="flex justify-between items-center border-t-2 border-gray-200 bg-white font-semibold py-4 transition-all duration-200">
          Product Details{" "}
          <BsChevronDown
            onClick={() => setShowSpecifications((prev) => !prev)}
            className={`${showSpecifications ? "rotate-180" : "rotate-0"
              } transition-all duration-200 cursor-pointer`}
          />
        </div>
        <div
          className={`${showSpecifications ? "scale-y-100 h-full" : "scale-y-0 h-0"
            } overflow-hidden w-full transition-all duration-200 grid grid-cols-2 gap-y-3 mb-4 border-gray-200`}
        >
          <p className=" flex flex-col"><span className="font-bold">Brand: </span>{brand}</p>
          <p className=" flex flex-col"><span className="font-bold">Warranty: </span>{warranty} Months</p>
          <p className=" flex flex-col"><span className="font-bold">Assembly:</span> {assemby}</p>
          <p className=" flex flex-col"><span className="font-bold">Material:</span> {material}</p>
          <p className=" flex flex-col"><span className="font-bold">Dimensions:</span> {size}</p>
          <p className=" flex flex-col"><span className="font-bold">Weight:</span> {weight} kg</p>
          <p className=" flex flex-col"><span className="font-bold">SKU ID</span> {SKU_ID} </p>
          {armType && <p className=" flex flex-col"><span className="font-bold">Arm Type:</span> {armType}</p>}
        </div>
      </>

      {/* SPECIFICATION END */}

      {/* DESCRIPTION START */}
      <div>
        <div onClick={() => setShowDescription((prev) => !prev)} className="flex justify-between items-center border-t-2 border-gray-200 bg-white font-semibold py-4">
          Description{" "}
          <BsChevronDown
            onClick={() => setShowDescription((prev) => !prev)}
            className={`${showDescription ? "rotate-180" : "rotate-0"
              } transition-all duration-200 cursor-pointer`}
          />
        </div>
        <p
          className={`${showDescription ? "scale-y-100 h-full" : "scale-y-0 h-0"
            } overflow-hidden w-full transition-all duration-200 border-gray-200`}
        >
          {description}
        </p>
      </div>
      {/* DESCRIPTION END */}

      {/* ABOUT THE BRAND START */}

      <div>
        <div onClick={() => setShowBrand((prev) => !prev)} className="flex justify-between items-center border-t-2 border-gray-200 bg-white font-semibold py-4 transition-all duration-200">
          About the Brand{" "}
          <BsChevronDown
            onClick={() => setShowBrand((prev) => !prev)}
            className={`${showBrand ? "rotate-180" : "rotate-0"
              } transition-all duration-200 cursor-pointer`}
          />
        </div>
        <div
          className={`${showBrand ? "scale-y-100 h-full" : "scale-y-0 h-0"
            } overflow-hidden w-full transition-all duration-200 gap-y-4 border-gray-200`}
        >
          <p>{brandDescription ? brandDescription : "N/A"}</p>
        </div>
      </div>
      {/* ABOUT THE BRAND END */}

      {/* REVIEWS START */}

      <div>
        <div onClick={() => setShowReviews((prev) => !prev)} className="flex justify-between items-center border-y-2 border-gray-200 bg-white font-semibold py-4 transition-all duration-200">
          Reviews{`(${productReviews?.length})`}
          <BsChevronDown
            onClick={() => setShowReviews((prev) => !prev)}
            className={`${showReviews ? "rotate-180" : "rotate-0"
              } transition-all duration-200 cursor-pointer`}
          />
        </div>
        <div
          className={`${showReviews ? "scale-y-100 h-full" : "scale-y-0 h-0"
            } w-full transition-all duration-200 border-gray-200 max-h-[360px] overflow-auto`}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-2 my-2 pb-3 mb-4 border-b border-b-gray-300">
            <p className="text-sm">Add a Review &nbsp;
              {errors && <span className="text-red-500">
                {errors.title && errors.stars && `Title & Stars Required`}
                {errors.title && !errors.stars && "Title Required"} &nbsp;
                {errors.stars && !errors.title && "Stars Required"}
              </span>}
            </p>
            {uploadedImageUrls?.length > 0 && (
              <div className="w-full flex gap-1">

                {
                  uploadedImageUrls?.map((item, i) => (
                    <Image
                    key={i}
                      src={URL.createObjectURL(item)}
                      width={60}
                      height={60}
                      alt="uploaded image"
                    />
                  ))
                }

              </div>
            )}
            <div className="w-full flex items-center gap-2">
              <input placeholder="Title*" className="w-full bg-white border border-gray-200 px-2" {...register("title", { required: true })} />
              <StarInput register={register} errors={errors.rating} />
              <input id="image" onChange={(e) => {
                let arr = Array.from(e.target.files);
                if(arr.length > 3) {
                  alert("You can only upload upto 3 images");
                  return;
                }
                setUploadedImageUrls(arr);
              }} className="hidden" type="file" multiple="multiple" accept=".png, .jpg, .webp" />
              <label className="bg-[#ff6536] text-white py-1 px-2 min-w-fit text-xs sm:text-sm cursor-pointer hover:opacity-50" htmlFor="image">Upload Image</label>
            </div>
            <input placeholder="Add a review" className="w-full bg-white border border-gray-200 px-2" type="text" {...register("description")} />
            <input value="Submit" type="submit" className="bg-[#ff6536] px-2 py-1 max-w-fit text-white text-sm hover:opacity-50" />
          </form>
          {productReviews?.length > 0 ? (
            <div className="flex flex-col gap-2">

              {productReviews?.map((item, i) => <div className="min-w-full flex flex-col gap-2 border-b border-b-gray-200 pb-2" key={i}>
                <div className="flex w-full justify-between items-center font-bold">
                  <div className="flex gap-4">
                  {item?.attributes?.title}
                  <div className="flex gap-2">

                  {item?.attributes?.Image?.data?.map((image, k) => (
                    <Link key={k} href={image.attributes.url.replace("nextjspics.s3.ap-south-1.amazonaws.com", "img.haroth.com")} target="_blank"><Image width={50} height={50} alt={image.attributes.name} src={image.attributes.url.replace("nextjspics.s3.ap-south-1.amazonaws.com", "img.haroth.com")} /></Link>
                  ))}
                  </div>
                  </div>
                  <Rating rating={item.attributes.rating} />
                </div>

                <span className="text-sm mt-2">{item.attributes.description}</span>
              </div>)}
            </div>
          ) : (
            <p>No Reviews</p>
          )}
        </div>
      </div>
      {/* REVIEWS END */}
      <Loading loading={isLoading} />
    </div>
  );
};

export default ProductDetails;
