// import { fetchDataFromApi, postDataToApi } from "@/lib/api";
import axios from "axios";
// import { addDays } from "date-fns";
import { fetchDataFromApi, postDataToApi } from "../../../libs/api";

async function GET(req) {
  try {
    const getTokenFromDatabaseResponse = await fetchDataFromApi(
      `https://tak.haroth.com/api/shiprocket-token`
    );

    if (getTokenFromDatabaseResponse.status == 200) {
      const token = getTokenFromDatabaseResponse.data.data.attributes.token;

      const updatedAt =
        getTokenFromDatabaseResponse.data.data.attributes.updatedAt;

      let updatedAtDate = new Date(updatedAt);

      let after10DaysDate = addDays(updatedAtDate, 10);

      let currentDate = new Date();

      if (currentDate < after10DaysDate) {
        // this means that 10 days have not yet passed
        return Response.json({ token }, { status: 200 });
      } else {
        // we have to regenerate the token from Shiprocket;
        const tokenGenerationResponse = await axios.post(
          "https://apiv2.shiprocket.in/v1/external/auth/login",
          {
            email: "sameerkum098@gmail.com",
            password: "sameer090!",
          }
        );

        console.log("NEW SHIPROCKET TOKEN WAS GENERATED");
        if (tokenGenerationResponse.status == 200) {
          const generatedToken = tokenGenerationResponse.data.token;

          // now post this token to our database
          const postResponse = await postDataToApi("/api/shiprocket-token", {
            token: generatedToken,
          });

          if (postResponse.status == 200) {
            console.log("TOKEN was successfully posted in our database");
          }

          return Response.json({ token }, { status: 200 });
        } else {
          throw new Error("ERROR GENERATING NEW TOKEN");
        }
      }
    } else {
      throw new Error("ERROR FETCHING TOKEN FROM DATABASE");
    }
  } catch (error) {
    console.log("ERROR GETTING SHIPROCKET API TOKEN", error.message);
    return Response.json({ message: "ERROR FETCHING TOKEN" }, { status: 404 });
  }
}

// Export the GET function for use in your project
module.exports = {
  GET
};
