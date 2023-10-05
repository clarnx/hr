import axios from 'axios';
import {API_URL} from "../libs/urls"

export async function signIn({ identifier, password }) {
  try {

     const res = await axios.post(`${API_URL}api/auth/local`, {
    identifier,
    password,
  });

  console.log("\n\n\n\n\nRESPONSE --> ", res)
  return res.data;

  } catch (error) {
    console.log("\n\n\n\n\nRESPONSE --> ", error.data)


    return error
  }
 


 
}