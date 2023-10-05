const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
const cron = require('node-cron');

// Load environment variables from the dotenv file
dotenv.config();

// Replace with your Shiprocket email and password
const email = process.env.SHIPROCKET_EMAIL;
const password = process.env.SHIPROCKET_PASSWORD;

// Shiprocket API endpoint for generating a token
const tokenUrl = 'https://apiv2.shiprocket.in/v1/external/auth/login';

// Function to generate a new Shiprocket token and update .env file
async function generateAndSaveToken() {
  try {
    const response = await axios.post(tokenUrl, {
      email: email,
      password: password,
    });

    if (response.status === 200 && response.data && response.data.token) {
      // Remove the old token from the dotenv file
      const oldToken = process.env.NEXT_PUBLIC_SHIPROCKET_TOKEN;
      fs.writeFileSync('.env', fs.readFileSync('.env', 'utf8').replace(`NEXT_PUBLIC_SHIPROCKET_TOKEN=${oldToken}\n`, ''), 'utf8');

      // Update only the NEXT_PUBLIC_SHIPROCKET_TOKEN environment variable
      process.env.NEXT_PUBLIC_SHIPROCKET_TOKEN = response.data.token;

      // Save the updated environment variable to .env file
      fs.writeFileSync('.env', `NEXT_PUBLIC_SHIPROCKET_TOKEN=${response.data.token}\n`, { flag: 'a' });
      console.log('Old NEXT_PUBLIC_SHIPROCKET_TOKEN removed, and new token updated in .env file.');
    } else {
      console.error('Failed to generate Shiprocket token:', response.data);
    }
  } catch (error) {
    console.error('Error generating Shiprocket token:', error.message);
  }
}

// Schedule token generation and update every 24 hours using cron job
cron.schedule('0 0 */1 * *', generateAndSaveToken); // Runs every day at midnight

// Initial token generation and update
generateAndSaveToken();
