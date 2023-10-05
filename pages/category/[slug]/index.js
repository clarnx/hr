
import Container from "../../../components/Container";
import { fetchDataFromApi } from "../../../libs/api";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import CategoryTitle from "../../../components/CategoryTitle";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import MostDemandingFurniture from "../../../components/Homepage/MostDemandingFeatures"
import { BsChevronDown } from "react-icons/bs";
import Breadcrumb from "../../../components/Breadcrumb"
import NeedGuide from "../../../components/NeedGuide";
const CategoryPage = ({ category }) => {
  const [showMore, setShowMore] = useState(false)
  let categoryName = category.attributes.categoryname;
  let categoryInformation = category.attributes.categoryInformation;
  let subCategories = category.attributes.sub_categories.data;
  let categoryImage = category.attributes.categoryimage.data.attributes.url;
  const { data: session } = useSession();

  let userId = null;

  if (!session) {
    userId = null;
  }

  userId = useMemo(async () => {
    return session?.id;
  }, [session?.id]);

  
  let breadcrumb = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: `${category.attributes.categoryname}`,
      href: `/category/${category.attributes.category_slug}`,
    },
  ];



  return (
    <>
      <Head>
        <title>
          {categoryName.replaceAll("-", " ").toUpperCase()} - Haroth.com
        </title>
      </Head>
      <Container>
        <section className="block min-h-screen px-6 md:px-16 lg:px-24 lg:pt-[150px] pt-16 mt-0">
        <div className="relative">
        <Breadcrumb breadcrumb={breadcrumb} />

          <Image
            src={categoryImage}
            width={2000}
            height={2000}
            alt="Category Image"
            className="hidden md:block aspect-24/5 mb-10"
          />
        </div>
          <CategoryTitle
            removePadding={true}
            title={`Choose Your ${categoryName
              .replaceAll("-", " ")
              .toUpperCase()}  `}

          />
          <div className="mt-8  relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 rounded-md">

            {subCategories && showMore ? (
              subCategories.map((subCat, i) => (
                <div className="max-h-max overflow-hidden " key={i}>
                  <div
                    href="/"
                    className="overflow-hidden rounded-md cursor-pointer"
                  >
                    <Link
                      href={`/products/${subCat.attributes.subcategory_slug}`}
                    >
                      <Image
                        src={
                          subCat.attributes.image?.data?.attributes.url.startsWith(
                            "/uploads"
                          )
                            ? `
                    https://tak.haroth.com${subCat.attributes.image?.data?.attributes.url}
                  `
                            : subCat.attributes.image?.data?.attributes.url.replace(
                              "nextjspics.s3.ap-south-1.amazonaws.com",
                              "img.haroth.com"
                            )
                        }
                        width={500}
                        height={500}
                        alt={subCat.attributes.Title}
                        className="w-full h-auto rounded-md transition-all hover:scale-105 duration-200 ease-in-out"
                      />
                    </Link>
                  </div>
                  <p className="text-black text-lg font-semibold text-center">
                    {subCat.attributes.Title}
                  </p>
                </div>
              ))
            ) : subCategories.slice(0, 12).map((subCat, i) => (
              <div className="max-h-max overflow-hidden " key={i}>
                <div
                  href="/"
                  className="overflow-hidden rounded-md cursor-pointer"
                >
                  <Link
                    href={`/products/${subCat.attributes.subcategory_slug}`}
                  >
                    <Image
                      src={
                        subCat.attributes.image?.data?.attributes.url.startsWith(
                          "/uploads"
                        )
                          ? `
                    https://tak.haroth.com${subCat.attributes.image?.data?.attributes.url}
                  `
                          : subCat.attributes.image?.data?.attributes.url.replace(
                            "nextjspics.s3.ap-south-1.amazonaws.com",
                            "img.haroth.com"
                          )
                      }
                      width={500}
                      height={500}
                      alt={subCat.attributes.Title}
                      className="w-full h-auto rounded-md transition-all hover:scale-105 duration-200 ease-in-out"
                    />
                  </Link>
                </div>
                <p className="text-black text-lg font-semibold text-center">
                  {subCat.attributes.Title}
                </p>
              </div>
            ))}
            {subCategories.length > 12 && (
                <p
                  onClick={() => setShowMore(prev => !prev)}
                  className="text-base md:text-xl col-span-full place-self-center border-2 border-[#ff6536] flex gap-2 items-center rounded-lg py-1 px-2"
                >
                  Show {`${showMore ? "Less" : "More"}`}{" "}
                  <BsChevronDown
                    className={`${showMore ? "rotate-180" : "rotate-0"} transition-transform`}
                  />
                </p>
              )}
          </div> 
          
          <NeedGuide />

          <MostDemandingFurniture />

          

          <p className="mt-8">
            {categoryInformation}
          </p>
        </section>
      </Container>
    </>
  );
};

export default CategoryPage;

export async function getStaticPaths() {
  const category = await fetchDataFromApi("api/categories?populate=*");
  const paths = category.data?.map((c) => ({
    params: {
      slug: c.attributes.category_slug,
    },
  }));

  console.log("Paths", paths);

  return {
    paths,
    fallback: false,
  };
}

// `getStaticPaths` requires using `getStaticProps`
// Import necessary modules

export async function getStaticProps({ params: { slug } }) {
  const category = await fetchDataFromApi(
    `api/categories?filters[category_slug][$eq]=${slug}&populate=deep`
  );

  // Calculate the revalidation time (in seconds)
  const revalidateTime = 60 * 60; // 60 minutes

  return {
    props: {
      category: category.data[0],
    },
    revalidate: revalidateTime, // Set the revalidation time
  };
}

