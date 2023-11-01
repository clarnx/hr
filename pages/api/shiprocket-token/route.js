const axios = require('axios');
const { addDays, format } = require('date-fns');

async function GET(req) {
  try {
    // Fetch the token from the database
    const getTokenFromDatabaseResponse = await axios.get(
      'https://tak.haroth.com/api/shiprocket-token',
      {
        headers: {
          Authorization: 'Bearer 0593b4624ee9316ea2b57f82f3fe365d69ac91ae3c0eb178a61552447f8e4c77f2fb49126fece3365abd58b8fa9b9597e232cb16980af0557c8b4f9c4effcfcb6d5a7bef3ea98e3ebb541d25790ae37e6ccd68972df17518a8953c7e603a6acef24fa288591884a92ebf264ed4ea9df999ed89f40b6fb10132fce940397b7388',
        },
      }
    );

    if (getTokenFromDatabaseResponse.status === 200) {
      const token = getTokenFromDatabaseResponse.data.data.attributes.token;
      const updatedAt = getTokenFromDatabaseResponse.data.data.attributes.updatedAt;

      const updatedAtDate = new Date(updatedAt);
      const after10DaysDate = addDays(updatedAtDate, 10);
      const currentDate = new Date();

      if (currentDate < after10DaysDate) {
        // Token is still valid, return it
        return Response.json({ token }, { status: 200 });
      } else {
        // Token has expired, regenerate it
        const tokenGenerationResponse = await axios.post(
          'https://apiv2.shiprocket.in/v1/external/auth/login',
          {
            email: 'sameerkum098@gmail.com',
            password: 'sameer090!',
          }
        );

        console.log('NEW SHIPROCKET TOKEN WAS GENERATED');
        if (tokenGenerationResponse.status === 200) {
          const generatedToken = tokenGenerationResponse.data.token;

          // Now post this token to your database
          const postResponse = await axios.post(
            'https://tak.haroth.com/api/shiprocket-token',
            {
              token: generatedToken,
            }
          );

          if (postResponse.status === 200) {
            console.log('TOKEN was successfully posted in your database');
          }

          return Response.json({ token: generatedToken }, { status: 200 });
        } else {
          throw new Error('ERROR GENERATING NEW TOKEN');
        }
      }
    } else {
      throw new Error('ERROR FETCHING TOKEN FROM DATABASE');
    }
  } catch (error) {
    console.log('ERROR GETTING SHIPROCKET API TOKEN', error.message);
    return Response.json({ message: 'ERROR FETCHING TOKEN' }, { status: 404 });
  }
}

module.exports = {
  GET,
};
