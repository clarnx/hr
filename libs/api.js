import axios from "axios";
import { API_URL, STRAPI_API_TOKEN, SHIPROCKET_TOKEN } from "./urls";

export const fetchDataFromApi = async (endpoint) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  };
  try {
    console.log("FINAL URL --> ", `${API_URL}${endpoint}`);
    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error from fetchDataFromApi",error);
    return error;
  }
};

export const createOrder = async (endpoint, payload) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { ...payload } }),
  };

  let createdOrder = await fetch(`${API_URL}${endpoint}`, options);
  createdOrder = await createdOrder.json();

  console.log("RESPONSE on creating order", createdOrder);

  let storeOrderId = await fetch(`${API_URL}api/users/${payload.user_id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ connect: [createdOrder.data.id] }),
  });

  storeOrderId = await storeOrderId.json();

  // SENDING CONFIRMATION MESSAGE
  const confirmationMessage = await axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=m93yezSkcfj6217ERrHdapZ5VslMgFhIvxqoW4NXBtDCLnKJQ8JdoAHI9nlYZGjUafDz024FO75y3rsS&route=dlt&sender_id=HAROTH&message=144446&variables_values=${createdOrder.data.id}&flash=0&numbers=${payload.phoneNumber}`)

  // console.log("USER after stroing order", storeOrderId);

  return createdOrder;
};

export const getUserId = async (useremail) => {
  const user = await fetchDataFromApi(
    `api/users?filters[email][$eq]=${useremail}`
  );

  if (!user[0]) {
    return null;
  }

  console.log("fetched id", user[0].id);
  console.log("fetched user ", user[0]);

  return { userData: user[0], id: user[0].id };
};

export const wishlist = async (userId, productId, isWishlisted) => {
  console.log("PRODUCT ID", productId);
  console.log("userId", userId);
  let wishlistedProduct = null;

  let wishlistedIds = await getWishlistedIds(userId);
  let newIds = [];

  if (isWishlisted) {
    let newIds = wishlistedIds?.filter((i) => i !== productId);

    // console.log("NEW IDS", newIds);

    wishlistedProduct = await fetch(`${API_URL}api/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wishlist: {
            ids: newIds
        },
      }),
    });
  } else {


    // console.log("wishlisted Ids", wishlistedIds)
    if (wishlistedIds?.length > 0) {
      newIds = wishlistedIds;
      
      console.log("Ran the if part", newIds)
    }
    newIds.push(productId);

    wishlistedProduct = await fetch(`${API_URL}api/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wishlist: {
          ids: newIds,
        },
      }),
    });
  }

  wishlistedProduct = await wishlistedProduct.json();

  // console.log("WISHLISTED PRODUCT", wishlistedProduct);
  return wishlistedProduct;
};

export const getWishlistedIds = async (userId) => {
  // console.log("received user id", userId);

  let res = await fetchDataFromApi(`api/users/${userId}?populate=wishlist`);

  res = await res;


  // console.log("WISHLISTED PRODUCTS", await res?.wishlist?.ids);

  let wishlistedIds = await res?.wishlist?.ids;

  return wishlistedIds;
};



export const getWishlistedProducts = async (wishlistIds) => {

  let dynamicURL = `api/products?`


  wishlistIds?.map((id, i) => {
    dynamicURL = dynamicURL + `filters[id][$in][${i}]=${id}&`
  })

  dynamicURL = dynamicURL + 'populate=*'

  console.log("final url ", dynamicURL);

  let res = await fetchDataFromApi(dynamicURL);

  let wishlistedProducts = await res;

  console.log("WISHLISTED producst", wishlistedProducts)

  return wishlistedProducts.data

}

// add to cart for strapi 
export const cartItem = async (userId, productId, isAddToCart) => {
  try {
    const addToCartIds = await getAddTocartIds(userId);
    let newIds = [];

    if (isAddToCart) {
      newIds = addToCartIds?.filter((id) => id !== productId);
    } else {
      if (addToCartIds?.length > 0) {
        newIds = addToCartIds;
      }
      newIds.push(productId);
    }

    const response = await fetch(`${API_URL}api/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItem: {
          ids: newIds,
        },
      }),
    });

    if (response.ok) {
      const addToCartProduct = await response.json();
      return addToCartProduct;
    } else {
      throw new Error(`Failed to update cart: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in cartItem:", error);
    throw error;
  }
};

export const getAddTocartIds = async (userId) => {
  try {
    const res = await fetchDataFromApi(`api/users/${userId}?populate=cartItem`);
    const addToCartIds = res?.cartItem?.ids || [];
    return addToCartIds;
  } catch (error) {
    console.error("Error in getAddTocartIds:", error);
    throw error;
  }
};

export const addToCartProducts = async (addToCartIds) => {
  try {
    let dynamicURL = `api/products?`;

    addToCartIds?.forEach((id, i) => {
      dynamicURL = dynamicURL + `filters[id][$in][${i}]=${id}&`;
    });

    dynamicURL = dynamicURL + "populate=*";

    console.log("final url ", dynamicURL);

    const res = await fetchDataFromApi(dynamicURL);
    const addToCartProducts = res.data;
    return addToCartProducts;
  } catch (error) {
    console.error("Error in addToCartProducts:", error);
    throw error;
  }
};


// end add to cart strapi


export const getUser = async (phone) => {

  try {
    let userExists = await fetchDataFromApi(
  `api/users?filters[phone_number][$eq]=${phone}`
);

console.log("EXisting user", userExists)

if(userExists?.length > 0) {
  return userExists[0];
} else {
  return null;
}

  } catch (error) {
    console.log(error)
    return null
  }

}


export const updateUser = async (data, id) => {

  console.log("received data", data);
  console.log("JSON DATA", JSON.stringify(data))



  let res = await fetch(`${API_URL}api/users/${id}`, {
    method: "PUT",
    headers: {
      'Authorization' : `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type' : "application/json"
    },
    body: JSON.stringify(data)
  });

  res = await res.json();

  console.log(res);

  return res;

}

const postDataToApi = async (url, data, job, isUser = false) => {
  let response;

  if (isUser) {
    response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );
  } else {
    response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`,
      {
        data: data,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );
  }

  return response;
};
