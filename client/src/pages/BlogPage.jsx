import { getBlogs } from "@/Redux/Slices/blogSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const BlogPage = () => {

      const dispatch = useDispatch();
  const [blogData, setBlogData] = useState([]);

  const handleGetBlog = async () => {
    try {
      const response = await dispatch(getBlogs());
      console.log("response", response);
      setBlogData(response?.payload?.data?.blogPosts);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleGetBlog();
  }, []);

  
  return (
    <div>
      {" "}
      <section className="ezy__blog4  light py-14 md:py-34 text-stone-800 bg-white dark:bg-[#0b1727] dark:text-white overflow-hidden">
        <div className=" px-6 md:px-8 xl:px-28">
          <h1 className="text-center text-dark text-4xl uppercase">
            Our Blogs
          </h1>

          <div className="grid grid-cols-12 items-center  gap-6">
            <div className="col-span-12">{/* <FeaturedBlogItem /> */}</div>
            {blogData?.map((blog, i) => (
              <div className="col-span-12 md:col-span-6 lg:col-span-4" key={i}>
                <article className="shadow-lg bg-white dark:bg-[#1E2735] dark:shadow-none rounded-lg overflow-hidden mt-6 pb-2">
                  <img
                    src={blog?.featuredImage?.url}
                    className="h-auto w-full"
                  />
                  <div className="p-3 pb-8 lg:p-6">
                    <h4 className="font-medium text-2xl mb-1">{blog?.title}</h4>
                    <p className="opacity-80 mb-2">
                      <span className="mr-2">{blog?.excerpt}</span>
                    
                     
                    </p>
                    {/* <p className="opacity-60 mt-3 mb-6">{description}</p> */}
                    <Link
                      to={`/${blog?.slug}`}
                      className="bg-transparent hover:bg-[#00354C] border border-blue-900 hover:text-white py-2 px-5 rounded transition"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
