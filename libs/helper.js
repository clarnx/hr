import axios from "axios";
import { useEffect } from "react";
import { PiCodesandboxLogoDuotone } from "react-icons/pi";
import { useSelector } from "react-redux";
import {SHIPROCKET_TOKEN} from "./urls"

export const getDiscountedPricePercentage = (
  originalPrice,
  discountedPrice
) => {
  const discount = originalPrice - discountedPrice;

  const discountPercentage = (discount / originalPrice) * 100;

  return discountPercentage.toFixed(2);
};



export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const isEmailValid = async (email) => {
  let res = await axios.get(
    `https://emailverifier.reoon.com/api/v1/verify?email=${emailPhone}&key=5IEzvBcwuNLQC5MF9KJxZsYj5KCfeOA8&mode=power`
  );

  console.log("RES", res.data.status);

  if (res.data.status == "safe") {
    return true;
  }

  return false;
};

export const getEstimatedDelivery = async (customerPincode, brandPincode) => {
  let data = await fetch(
    `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${brandPincode}&delivery_postcode=${customerPincode}&cod=1&weight=2`,
    {
      headers: {
        Authorization: `Bearer ${SHIPROCKET_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "HTTP/1.1",
        Accept: "/",
      },
    }
  );

  data = await data.json();

  console.log("Pincode Response", data);

  if (data.status == 200 || data.status || 202) {
    const availableCourierCompanies = data?.data?.available_courier_companies;

    console.log("Available Courier Comapnies", availableCourierCompanies);

    const deliveryDays = availableCourierCompanies?.map(
      (company) => company.estimated_delivery_days
    );

    if (deliveryDays?.length > 0) {
      console.log("max --> ", deliveryDays[0]);
      console.log("min --> ", deliveryDays[deliveryDays.length - 1]);

      return {
        maxDays: deliveryDays[0] + 2,
        minDays: deliveryDays[deliveryDays.length - 4],
        maxDays: deliveryDays[0] + 3,
      };
    } else {
      return { maxDays: null, minDays: null }
    }
  } else {
    return { maxDays: null, minDays: null };
  }
};


export const getDiscountPrice = (oneQuantityPrice, quantity, discountPercentage, maxAmount) => {
  const totalAmount = oneQuantityPrice * quantity;

  const discountAmount = (totalAmount * discountPercentage) / 100;

  if (discountAmount > maxAmount) {
    return maxAmount;
  } else {
    return discountAmount;
  }


}

export const useLocalStorage = () => {
  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    let jsonCartItems = JSON.parse(cartItems);
    console.log("JSON items", jsonCartItems)
    console.log("CART ITEMS", JSON.parse(JSON.stringify(cartItems)))
    let modifiedCartItems = JSON.parse(JSON.stringify(cartItems));
    return jsonCartItems;
  })
}


export const clearUnusedLocalStorage = () => {
  if (typeof window !== "undefined") {
    const currentTime = new Date().getTime();
    const storageKey = "cartItems";

    try {
      const existingData = JSON.parse(localStorage.getItem(storageKey)) || [];

      // Define a threshold for how long an item can be considered unused
      const unusedThresholdInMilliseconds = 1 * 24 * 60 * 60 * 1000; // 1 days

      // Filter out items that have been used recently (within the threshold)
      const itemsToKeep = existingData.filter((item) => {
        const itemLastUsedTimestamp = item.lastUsedTimestamp || 0; // Replace 'lastUsedTimestamp' with your timestamp property
        return currentTime - itemLastUsedTimestamp <= unusedThresholdInMilliseconds;
      });

      // Update the local storage with the filtered items
      localStorage.setItem(storageKey, JSON.stringify(itemsToKeep));
    } catch (error) {
      console.error("Error clearing unused data from localStorage:", error);
    }
  }
};


export const storeStateToLocal = (cartItems) => {
  if (typeof window !== "undefined") {
    try {
      // Attempt to retrieve and parse existing data
      const existingData = JSON.parse(localStorage.getItem("cartItems")) || [];

      // Combine existing data with new data
      const updatedData = [...existingData, ...cartItems];

      // Store the updated data
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    } catch (error) {
      // Handle storage errors gracefully
      console.error("Error storing data in localStorage:", error);

      // Implement a strategy to clear unused data if storage quota is exceeded
      clearUnusedLocalStorage();
    }
  }
};

// export const loadStateFromLocalStorage = async (userData) => {
//   if (typeof window !== "undefined") {
//     if (userData && userData.isRegistered) {
//       try {
//         // Fetch cart items from the Strapi API for registered users
//         const response = await axios.get("https://tak.haroth.com/api/users/${userId}?populate=cartItems"); // Replace with your Strapi API endpoint

//         if (response.data && response.data.cartItems) {
//           return response.data.cartItems;
//         }
//       } catch (error) {
//         console.error("Error fetching cart items from Strapi:", error);
//       }
//     } else {
//       // For guest users, fetch cart items from local storage
//       const cartItems = localStorage.getItem("cartItems");
//       const jsonCartItems = JSON.parse(cartItems);

//       let modifiedCartItems = JSON.parse(JSON.stringify(cartItems));

//       return jsonCartItems || [];
//     }
//   }

//   return [];
// };




export const loadStateFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const cartItems = localStorage.getItem("cartItems");
    let jsonCartItems = JSON.parse(cartItems);
    console.log("JSON items", jsonCartItems)
    console.log("CART ITEMS", JSON.parse(JSON.stringify(cartItems)))
    let modifiedCartItems = JSON.parse(JSON.stringify(cartItems));
    return jsonCartItems;
  }
};



export const sendOtp = async () => {
  let mobileno = getValues("mobileno");
  try {
    setError("mobileno", null)

    if (mobileno.length === 0) {
      setError("mobileno", {
        type: "required",
        message: "Mobile No. is required"
      })
      return;
    } else if (mobileno.length < 10 || mobileno.length > 10) {
      setError("mobileno", {
        type: "custom",
        message: "Mobile No. must be of 10 digits"
      })

      return;
    }


    setOtpSent(false);
    setisLoading(true);

    let {
      data: { otp }
    } = await axios.post("/api/verifyOtp", {
      phone_number: mobileno,
    });

    setGeneratedOtp(otp)

    setOtpSent(true);

  } catch (error) {
    toast.error("ERROR SENDING OTP");
    console.log(error)
  }
  finally {
    setisLoading(false)
  }



}

export const verifyOtp = async () => {
  setisLoading(true);

  if (!otpSent) {
    setFocus("mobileno");
    setError("enteredOtp", {
      type: "custom",
      message: "Enter Correct Mobile Number"
    });
    setisLoading(false)
    return;
  }

  let enteredOtp = getValues('enteredOtp')

  try {

    setError("enteredOtp", null)
    if (enteredOtp.length === 0) {
      setError("enteredOtp", {
        type: "required",
        message: "OTP is required"
      })
      setisLoading(false)
      return;
    } else if (enteredOtp.length < 6 || enteredOtp.length > 6) {
      setError("enteredOtp", {
        type: "custom",
        message: "OTP must be of 6 digits"
      })

      setisLoading(false)
      return;
    }

    if (enteredOtp == generatedOtp) {
      setIsVerified(true)
      toast.success("Mobile Number Verified");

    } else {
      setError("enteredOtp", {
        type: "custom",
        message: "INVALID OTP"
      })

    }

  } catch (error) {
    console.log(error);
    toast.error("ERROR verifying OTP");
  }
  finally {
    setisLoading(false)
  }
}

export const getLocation = async (pincode, setError, setValue, setIsLoading) => {
  try {
    setError("pincode", null)
    if (pincode.length === 0) {
      setError("pincode", {
        type: "required",
        message: "Pincode is required"
      })
      return;
    } else if (pincode.length < 6 || pincode.length > 6) {
      setError("pincode", {
        type: "custom",
        message: "Pincode must be of 6 digits"
      })

      return;
    }

    setIsLoading(true);
    let res = await fetch(`https://apiv2.shiprocket.in/v1/external/open/postcode/details?postcode=${pincode}`, {
      headers: {
        Authorization: `Bearer ${SHIPROCKET_TOKEN}`
      }
    })

    res = await res.json();

    if (res.success) {
      let { postcode_details: { state, city, locality } } = res;
      setValue("state", state)
      setValue("city", city)
      setValue("locality", locality[0])
    } else {
      setError("pincode", {
        type: "custom",
        message: "Invalid Pincode"
      })
    }

    console.log("res", res)
  } catch (error) {
    console.log(error)
    toast.error("Error Fetching Location");
  } finally {
    setIsLoading(false)
  }

}


export const isEqual = function (obj1, obj2) {
  const obj1Length = Object.keys(obj1).length;
  const obj2Length = Object.keys(obj2).length;

  if (obj1Length === obj2Length) {
      return Object.keys(obj1).every(
          key => obj2.hasOwnProperty(key)
              && obj2[key] == obj1[key]);
  }
  return false;
}
