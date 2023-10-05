import { fetchDataFromApi } from "../../libs/api";
import { API_URL, STRAPI_API_TOKEN } from "../../libs/urls";
import axios from "axios";
export default async function (req, res) {
  if (req.method !== "POST") {
    return res.status(500).json({ message: "Wrong Request Method!" });
  }

  const { email, password } = await req.body;
  if (!email || !password) {
    res.status(404).json({ message: "Email or Password not present" });
  }
  console.log("RECEIVED EMAIL ", email);

//   const user = await axios.get(
//     `${API_URL}api/users?filter[email][$eq]=${email}`,
//     {},
//     { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }
//   );

console.log(`${API_URL}api/users?filters[email][$eq]="${email}"`)
const user = await fetch(`${API_URL}api/users?filters[email][$eq]=${email}`, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`
    },
}).then((res) => res.json());

console.log("FOUND USER --> ", user);

  res.status(200).json({user});
}
