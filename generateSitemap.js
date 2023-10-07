const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');

const pages = ['/', '/product', '/contactUs', /* Add your pages here */];

async function generateSitemap() {
  const smStream = new SitemapStream({
    hostname: 'https://haroth.com', // Replace with your website's URL
  });

  const pipeline = smStream.pipe(createGzip());

  pages.forEach((page) => {
    smStream.write({ url: page, changefreq: 'daily', priority: 0.7 });
  });

  smStream.end();

  const sitemap = await streamToPromise(pipeline);
  fs.writeFileSync('./public/sitemap.xml.gz', sitemap);

  console.log('Sitemap generated and saved.');
}

generateSitemap();
