import { STRAPI_API_TOKEN } from "../../libs/urls"

export default async function (req, res) {
    const userData = {
        "data": {
          "username" : "karan",
          "email" : "tyuhbh0@gmail.com",
          "password": "Manmohan89!",
          "role": "Authenticated",
          "blocked": false,
          "confirmed": false
        }
      }

      const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
        }

      const response = await fetch("https://tak.haroth.com/api/users", options)

      console.log(response)

      res.status(200).json(response);
}