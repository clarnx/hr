const axios = require('axios');
const { addDays } = require('date-fns');

// Variable to store the token, initially set to null
let token = null;

// Function to get or regenerate the token
async function getShiprocketToken() {
  // Check if a token is already available and not expired
  if (token) {
    const updatedAt = token.updatedAt;
    const updatedAtDate = new Date(updatedAt);
    const after10DaysDate = addDays(updatedAtDate, 10);
    const currentDate = new Date();

    if (currentDate < after10DaysDate) {
      // Token is still valid, return it
      return token.token;
    }
  }

  // Token is expired or not available, regenerate it
  const tokenGenerationResponse = await axios.post(
    'https://apiv2.shiprocket.in/v1/external/auth/login',
    {
      email: 'sameerkum098@gmail.com',
      password: 'sameer090!',
    }
  );

  if (tokenGenerationResponse.status === 200) {
    const generatedToken = tokenGenerationResponse.data.token;

    // Now post this token to your database
    const postResponse = await axios.post(
      'https://tak.haroth.com/api/shiprocket-token',
      {
        token: generatedToken,
        updatedAt: new Date().toISOString(), // Store the timestamp of when the token was generated
      }
    );

    if (postResponse.status === 200) {
      console.log('TOKEN was successfully posted in your database');
      // Set the token variable to the newly generated token
      token = {
        token: generatedToken,
        updatedAt: new Date().toISOString(),
      };
    }

    return generatedToken;
  } else {
    throw new Error('ERROR GENERATING NEW TOKEN');
  }
}

// Export the getShiprocketToken function
module.exports = {
  getShiprocketToken,
};
