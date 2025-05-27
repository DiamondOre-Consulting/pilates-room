import { getBlogPostBySlug, getBlogs } from "@/Redux/Slices/blogSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

const SingleBlogPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  console.log("maniaaaaaaaaaa", slug);
  const [blogData, setBlogData] = useState();
  const [allBlogsData, setAllBlogsData] = useState([]);

  const handleGetBlog = async () => {
    try {
      const response = await dispatch(getBlogs());
      console.log("response", response);
      setAllBlogsData(response?.payload?.data?.blogPosts);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleGetPostBySlug = async () => {
    try {
      const response = await dispatch(getBlogPostBySlug(slug));
      console.log("response data", response);
      setBlogData(response?.payload?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetPostBySlug();
    handleGetBlog();
    console.log("signle blog refetch")
  }, [dispatch , slug]);

  // console.log("all blog data", setAllBlogsData);
  
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
      
  return (
    <>
      <section className="ezy__blog details1 light py-40  bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="col-span-3 md:col-span-2 px-4">
              <h1 className="font-bolds uppercase text-2xl md:text-5xl mb-12">
                {blogData?.title}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8 px-4">
              <img
                src={blogData?.featuredImage?.url}
                alt=""
                className="w-full h-auto rounded"
              />
              <h1 className="font-semibold text-xl mt-4">{blogData?.excerpt}</h1>
              <p className="py-6" dangerouslySetInnerHTML={{__html : blogData?.content}}></p>
            </div>

            
           
            <div className="col-span-12 md:col-span-4 lg:col-span-3 lg:col-start-9 px-4 md:pl-6 lg:pl-0">
              <>
                <div className="bg-dark bg-opacity-90 dark:bg-[#1E2735] text-white rounded-t-lg py-4 px-3 mb-4">
                  <h5 className="text-xl font-semibold">Popular Blogs</h5>
                </div>
                {allBlogsData.map((item, i) => (
                  <div key={i}>
                    {!!i && <hr className="my-4" />}
                    <Link
                    to={`/${item?.slug}`}
                    className="flex  items-start gap-4">
                      <img
                        src={item?.featuredImage?.url}
                        alt=""
                        className="w-20 img-fluid rounded"
                      />
                      <div className="ml-3">
                        <h6 className="mb-2 text-base font-medium leading-tight">
                          {item.title}
                        </h6>
                        <div className="flex flex-wrap opacity-50">
                          <span>{item.createdAt.split("T")[0]}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogPage;
