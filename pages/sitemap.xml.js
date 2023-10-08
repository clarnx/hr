import { fetchDataFromApi } from "../libs/api";

// pages/sitemap.xml.js
const EXTERNAL_DATA_URL = 'https://haroth.com/api/products'; // Update to your product data URL

function generateSiteMap(products) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Add URLs to your pages -->
     <url>
       <loc>https://haroth.com/policies</loc>
     </url>
     <url>
       <loc>https://haroth.com/contactUs</loc>
     </url>
     ${
       Array.isArray(products)
         ? products
             .map((product) => {
               return `
           <url>
               <loc>${`https://haroth.com/product/${product.id}`}</loc> <!-- Update the URL structure as needed -->
           </url>
         `;
             })
             .join('')
         : '' // Handle the case when products is not an array
     }
   </urlset>
 `;
}

function SiteMap() {
  // This component is empty because getServerSideProps will do the heavy lifting
  return null;
}

export async function getServerSideProps() {
  // Fetch the product data or any other data you need for the sitemap
  const products = await fetchDataFromApi(EXTERNAL_DATA_URL);

  // Generate the XML sitemap using the product data
  const sitemap = generateSiteMap(products);

  // Set the response headers
  const headers = {
    'Content-Type': 'application/xml',
  };

  // Return the sitemap as a response along with headers
  return {
    props: {
      content: sitemap,
      headers, // Move headers under props
    },
  };
}

export default SiteMap;
