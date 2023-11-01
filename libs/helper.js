import axios from "axios";
import { useEffect } from "react";
import { PiCodesandboxLogoDuotone } from "react-icons/pi";
import { useSelector } from "react-redux";
// import {SHIPROCKET_TOKEN} from "./urls"

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


// Define the function to get the Shiprocket token
export const getShiprocketToken = async () => {
  try {
    const response = await axios.get('https://tak.haroth.com/api/shiprocket-token', {
      headers: {
        Authorization: 'Bearer 0593b4624ee9316ea2b57f82f3fe365d69ac91ae3c0eb178a61552447f8e4c77f2fb49126fece3365abd58b8fa9b9597e232cb16980af0557c8b4f9c4effcfcb6d5a7bef3ea98e3ebb541d25790ae37e6ccd68972df17518a8953c7e603a6acef24fa288591884a92ebf264ed4ea9df999ed89f40b6fb10132fce940397b7388',
      },
    });

    if (response.status === 200) {
      const token = response.data.data.attributes.token;
      console.log('Shiprocket Token:', token); // Log the retrieved token
      return token;
    } else {
      console.error('Failed to get Shiprocket token'); // Log the error
      throw new Error('Failed to get Shiprocket token');
    }
  } catch (error) {
    console.error('Error:', error); // Log any errors
    throw error;
  }
};


// Define the function to get the estimated delivery
export const getEstimatedDelivery = async (customerPincode, brandPincode) => {
  try {
    const token = await getShiprocketToken(); // Get the Shiprocket token

    // Make a request to get the estimated delivery
    const response = await fetch(
      `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${brandPincode}&delivery_postcode=${customerPincode}&cod=1&weight=2`,
      {
        method: 'GET', // Ensure it's a GET request
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'HTTP/1.1',
          Accept: '*/*',
        },
      }
    );
    
    const data = await response.json();

    console.log('Pincode Response', data);

    if (data.status === 200 || data.status === 202) {
      const availableCourierCompanies = data?.data?.available_courier_companies;

      console.log('Available Courier Companies', availableCourierCompanies);

      const deliveryDays = availableCourierCompanies?.map(
        (company) => company.estimated_delivery_days
      );

      if (deliveryDays?.length > 0) {
        console.log('max -->', deliveryDays[0]);
        console.log('min -->', deliveryDays[deliveryDays.length - 1]);

        return {
          maxDays: deliveryDays[0] + 2,
          minDays: deliveryDays[deliveryDays.length - 4],
        };
      } else {
        return { maxDays: null, minDays: null };
      }
    } else {
      return { maxDays: null, minDays: null };
    }
  } catch (error) {
    console.error('Error:', error);
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


// Function to clear unused local storage items
export const clearUnusedLocalStorage = () => {
  if (typeof window !== "undefined") {
    const currentTime = new Date().getTime();
    const storageKey = "cartItems";

    try {
      const existingData = JSON.parse(localStorage.getItem(storageKey)) || [];
      const unusedThresholdInMilliseconds = 6 * 60 * 60 * 1000;

      const itemsToKeep = existingData.filter((item) => {
        const itemLastUsedTimestamp = item.lastUsedTimestamp || 0;
        return currentTime - itemLastUsedTimestamp <= unusedThresholdInMilliseconds;
      });

      localStorage.setItem(storageKey, JSON.stringify(itemsToKeep));
    } catch (error) {
      console.error("Error clearing unused data from localStorage:", error);
    }
  }
};

// Run clearUnusedLocalStorage initially and then set the interval
clearUnusedLocalStorage();
setInterval(clearUnusedLocalStorage, 6 * 60 * 60 * 1000);

// Function to store data in local storage
export const storeStateToLocal = (cartItems) => {
  if (typeof window !== "undefined") {
    try {
      const existingData = JSON.parse(localStorage.getItem("cartItems")) || [];
      const updatedData = [...existingData, ...cartItems];
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error storing data in localStorage:", error);
    }
  }
};

// Function to load data from local storage
export const loadStateFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const cartItems = localStorage.getItem("cartItems");
    return JSON.parse(cartItems) || [];
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


// Price Format for currency
export function formatPrice(price) {
  return price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
}

function formatPrice(price) {
  const formattedPrice = price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  // Remove .00 from the formatted price
  return formattedPrice.replace(/(\.\d*[^1-9])|(\.00$)/, '');
}