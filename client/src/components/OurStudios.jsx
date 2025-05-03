import React from "react";

const blogs = [
  {
    image: "https://exhalepilateslondon.com/wp-content/uploads/2023/01/PRIMROSE-1-scaled.jpg",
    buttonText: "primrose hill",
    link: "",
  },
  {
    image: "https://exhalepilateslondon.com/wp-content/uploads/2023/01/PRIMROSE-1-scaled.jpg",
    buttonText: "marylebone",
    link: "",
  },
  {
    image: "https://exhalepilateslondon.com/wp-content/uploads/2023/01/PRIMROSE-1-scaled.jpg",
    buttonText: "north finchley",
    link: "",
  },
];

const BlogItem = ({ blog }) => {
  const { title, description, author, date, month, year, image } = blog;

  return (
    <article className="rounded-lg ">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-80 w-full mb-6 rounded-lg shadow-lg dark:shadow-none"
        />
      </div>
    </article>
  );
};

const OurStudios = () => {
  return (
    <div>
      <section className="ezy__blog6 light py-14 md:py-14 text-stone-800 bg-white dark:bg-[#0b1727] dark:text-white overflow-hidden">
        <div className=" px-4  mx-auto md:px-8 xl:px-20">
       
           
              <h2 className="text-[32px] text-dark uppercase  lg:text-[45px] text-center text-light leading-none mb-4">
                Our Studios
              </h2>
           

          <div className="flex flex-col md:flex-row justify-between w-full gap-y-8 md:gap-y-0 md:gap-x-20  items-center mt-12 ">
            {blogs.map((blog, i) => (
              <div
                className="flex flex-col justify-center items-center "
                key={i}
              >
                <BlogItem blog={blog} />
              
                <button className='border border-gray-800 text-xl uppercase  px-8 py-1 cursor-pointer rounded-md hover:bg-[#FF6950] transition-all duration-300 ease-in-out hover:text-white'>{blog?.buttonText}</button>

             
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStudios;
