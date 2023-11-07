import Head from "next/head";
import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../libs/api";
import { useRouter } from "next/router";
import Container from "../../components/Container";
import ProductsContainer from "../../components/ProductsContainer";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "../../components/Breadcrumb";
import Carousel from "../../components/Carousel";
import FilterModal from "../../components/FilterModal";
import ProductCard from "../../components/ProductCard";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import Pagination from "../../components/Pagination";
import Filters from "../../components/Filters";
import Sort from "../../components/Sort";
import SubcategoryList from "../../components/SubcategoryList";

const ProductsPage = ({ products: receivedProducts, slug }) => {

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 36; // Number of products to display per page

  // Calculate start and end indexes based on current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  
  // Slice the products array to display only the current page's products
  const productsToDisplay = receivedProducts.slice(startIndex, endIndex);

  // Handle next page click
  const nextPage = () => {
    if (currentPage < Math.ceil(receivedProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page click
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate the total number of pages
const totalPages = Math.ceil(receivedProducts.length / productsPerPage);

// Generate an array of page numbers from 1 to totalPages
const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

// Define the toggleSortModal function
const toggleSortModal = () => {
  setOpenSortModal((prev) => !prev);
};

  let originalProducts = [...receivedProducts]

  const [subCategories, setSubCategories] = useState([])
  const [categories, setCategories] = useState([])
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState([...receivedProducts])

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openSortModal, setOpenSortModal] = useState(false);
  const [sortMode, setSortMode] = useState("Relevance");

  const router = useRouter();

  useEffect(() => {
    setProducts(receivedProducts)
  }, [slug, receivedProducts])

  const toggleIsOpen = () => {
    setOpenFilterModal((prev) => !prev);
  };

  const sortProducts = async (sortType) => {
    if (sortType === "price:high-to-low") {
      let sortedProducts = products.sort(
        (p1, p2) => p2.attributes.selling_price - p1.attributes.selling_price
      );
      setProducts(sortedProducts);
      setSortMode("Price: High to Low");
    }
    if (sortType === "price:low-to-high") {
      let sortedProducts = products.sort(
        (p1, p2) => p1.attributes.selling_price - p2.attributes.selling_price
      );
      setProducts(sortedProducts);
      setSortMode("Price: Low to High");
    }
    if (sortType === "rating") {
      let sortedProducts = products.sort(
        (p1, p2) => p2.attributes.ratings - p1.attributes.ratings
      );
      setProducts(sortedProducts);
      setSortMode("Rating");
    }
    if (sortType === "relevance") {
      setProducts(originalProducts);
      setSortMode("Relevance");
    }
  };






  useEffect(() => {
    const data = fetchDataFromApi(`api/sub-categories?filters[subcategory_slug][$eq]=${slug}&populate=deep`).then(res => {
      // console.log("SUB Cats", res.data);
      setSubCategories(res.data[0].attributes.sub_categories.data)
      setCategories(res.data[0].attributes.categories.data)
    })
    if (window.innerWidth < 960) {
      setIsMobile(true);
    }
  }, [slug]);

  let breadcrumb = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: `${categories[0]?.attributes?.categoryname}`,
      href: `/category/${categories[0]?.attributes?.category_slug}`,
    },
    {
      name: `${slug.replaceAll("-", " ")}`,
      href: `/products/${slug}`,
    },
  ];

  return (
    <>

      <Container>
        <Head>
          <title>{slug.replaceAll("-", "  ").toUpperCase()} - Haroth.com</title>
        </Head>
        <section className="">


          {
            isMobile ?
              <div className="px-6 md:px-16 pt-16 mb-4 text-center">
                <div className="w-fit mx-auto">
                  <Carousel showPointers={false}>
                    {subCategories.length > 0 && (
                      <>
                        {
                          subCategories?.map((item, i) => (
                            <Link href={`/products/${item?.attributes?.subcategory_slug}`} className={`max-h-[80px] min-w-fit flex flex-col items-center gap-1 border-[1px] ${item.attributes.subcategory_slug == slug ? "border-black" : "border-gray-300"}  p-1 rounded-lg`} key={i}>
                              <Image
                                width={40}
                                height={40}
                                alt={item?.attributes?.Title}
                                src={item?.attributes?.image?.data?.attributes?.url.startsWith("/uploads") ?
                                  `https://tak.haroth.com/${item?.attributes?.image?.data?.attributes?.url}` :
                                  item?.attributes?.image?.data?.attributes?.url.replace("nextjspics.s3.ap-south-1.amazonaws.com", "img.haroth.com")
                                }
                                className=""
                              />
                              <p className="text-xs md:text-sm text-gray-600">{item.attributes.Title}</p>
                            </Link>
                          ))}
                      </>
                    )}
                  </Carousel>
                </div>
              </div>

              :
              <div className="flex flex-col items-center md:pt-36 bg-white px-6 md:px-16 lg:px-24 text-center">
                <Breadcrumb isWhite={true} breadcrumb={breadcrumb} />

                <SubcategoryList subCategories={subCategories} slug={slug} />

              </div>
          }
          

              <div className="w-full flex flex-row justify-between bg-white py-2 px-24 border-y-[1px]">
                <Filters toggleIsOpen={toggleIsOpen} />
                <Sort
                  sortMode={sortMode}
                  openSortModal={openSortModal}
                  toggleSortModal={toggleSortModal}
                  sortProducts={sortProducts}
                />
              </div>
          <>
            <div className="w-screen flex flex-col py-1 px-6 md:px-16 lg:px-24 items-center gap-2">
              
            <div className="min-h-max pb-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-5">
             {productsToDisplay.length > 0 ? (
                productsToDisplay.map((prod, i) => (
                    <>
                      <ProductCard key={i} product={prod} />
                      {(((i > 0) && ((i + 1) % 16) == 0) || i == 3) && <div className="col-span-full w-full place-self-start hidden lg:block">
                        <Image
                          src="/category_1.webp"
                          width={2400}
                          height={500}
                          className="w-full max-h-[140px]"
                        />
                      </div>}

                      {(((i > 0) && ((i + 1) % 9) == 0) || i == 2) && <div className="col-span-full w-full place-self-start hidden md:block lg:hidden">
                        <Image
                          src="/category_1.webp"
                          width={2000}
                          height={1000}
                          className="w-full max-h-[140px]"
                        />
                      </div>}
                      
                      {(((i > 0) && ((i + 1) % 6) == 0) || i == 1) && <div className="col-span-full w-full place-self-start block sm:hidden">
                        <Image
                          src="/category_1.webp"
                          width={2000}
                          height={1000}
                          className="w-full max-h-[140px]"
                        />
                      </div>}
                    </>
                  ))
                ) : (
                  <>
                    <p className="mt-10 text-2xl font-bold col-span-full place-self-center place-content-center">
                      No Products Found
                    </p>
                    <button
                      onClick={() => setProducts(receivedProducts)}
                      className="col-span-full border-[1px] text-2xl border-black bg-[#ff6536] text-white px-4 py-2 rounded-lg block"
                    >
                      Reset Filters
                    </button>
                  </>
                )}
              </div>
              </div>

                  {/* Use the Pagination component here */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      prevPage={prevPage}
                      nextPage={nextPage}
                      setCurrentPage={setCurrentPage}
                    />

            
            <FilterModal
              setProducts={setProducts}
              receivedProducts={receivedProducts}
              isOpen={openFilterModal}
              setIsOpen={setOpenFilterModal}
            />
          </>
        </section>
      </Container>
    </>
  );
};

export default ProductsPage;

export async function getStaticPaths() {
  const subCategories = await fetchDataFromApi(`api/sub-categories`);

  const paths = subCategories?.data.map((c) => ({
    params: {
      slug: c.attributes.subcategory_slug,
    },
  }));

  // console.log("GSP SUBCAT PAGE");


  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const products = await fetchDataFromApi(
    `api/products?filters[sub_categories][subcategory_slug][$eq]=${slug}&populate=*&pagination[pageSize]=100`
  );

  // Calculate the revalidation time (in seconds) to 30 minutes
  const revalidateTime = 1800; // 30 minutes

  return {
    props: {
      products: products.data,
      slug: slug,
    },
    revalidate: revalidateTime, // Set the revalidation time to 30 minutes
  };
}



// export async function getServerSideProps(context) {
//   const { slug } = context.query;


//   const products = await fetchDataFromApi(
//     `api/products?filters[sub_categories][subcategory_slug][$eq]=${slug}&populate=*&pagination[pageSize]=100`
//   );

//   console.log("SLUG", slug)

//   return {
//     props: {
//       products: products.data,
//       slug: slug,
//     }
//   };
// }