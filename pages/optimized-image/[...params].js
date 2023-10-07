// pages/api/optimized-image/[...params].js

const { NextApiRequest, NextApiResponse } = require('next');
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    // Extract image optimization parameters from the request URL
    const params = req.query.params.join('/');
    
    // Construct the URL to the AWS Lambda function
    const lambdaFunctionUrl = `https://6ron3kvac5524nalbe6fybeuh40qqqbf.lambda-url.ap-south-1.on.aws/${params}`;

    // Fetch the optimized image from the Lambda function
    const response = await fetch(lambdaFunctionUrl);

    // Check if the Lambda function returned the image successfully
    if (response.ok) {
      // Set appropriate response headers
      res.setHeader('Content-Type', 'image/jpeg'); // Change content type as needed
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // Cache the image

      // Stream the optimized image to the client
      response.body.pipe(res);
    } else {
      res.status(500).json({ error: 'Image optimization failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
