import axios from "axios";
import { fetchDataFromApi, getUser } from "../../libs/api";
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
export default async function (req, res) {
  // console.log('here infuncitn')
  if (req.method !== "POST") {

    return res.status(500).json({ message: "WRONG REQUEST METHOD" });
  }
  try {
    let { username, email, phone } = await req.body;

    let existingUser = await getUser(phone);

    if (existingUser && existingUser.length > 0) {

    // if (existingUser && Object.keys(existingUser).length > 0) {
      let message;
      // console.log("EXISTING USER", existingUser);
      if (existingUser[0].email == email) {
        message = "Email is already taken";
      } else {
        message = "Phone No. is already taken";
      }

      return res.status(400).json({ message });
    } else {
      
      let password = email.slice(0, email.indexOf('@')) + phone.slice(0,4);

      console.log("GENERATED PASS", password)

      let newUser = {
        username,
        email,
        password,
        phone_number: phone,
        role: "1",
        confirmed: true
      };

      let response = await axios.post(`${API_URL}api/users`, newUser, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

        return res.status(200).json({ message: "Successfull" });
       


    }
  } catch (error) {
    console.log("ERROR REGISTERING USER", error);
    return res.status(404).json({ messsage: "ERROR REGISTERING USER" });
  }
}
