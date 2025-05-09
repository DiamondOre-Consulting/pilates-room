import React from "react";

const ProgramSchedule = () => {
  return (
    <div className="py-20 flex flex-col justify-center items-center">
      <h1 className="text-3xl md:text-5xl uppercase text-dark">Programme schedule</h1>
      <div className="grid grid-col-cols-1 md:grid-cols-3  px-6 md:px-20 mt-16">
        <div class="rounded overflow-hidden w-full shadow-lg flex flex-col">
          <a href="#"></a>
          <div class="relative">
            <a href="#" className="">
              <img
                class="w-full p-6 rounded-xl"
                src="https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                alt="Sunset in the mountains"
              />
              <div class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
            </a>
            <a href="#!">
              <div class="text-base absolute top-0 right-0 bg-dark rounded-2xl px-4 py-1 uppercase text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                12 sep 2025
              </div>
            </a>
          </div>
          <div class="px-6 py-4 mb-auto">
            <a
              href="#"
              class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
            >
             THE CLASSICAL MAT
            </a>
            <p class="text-gray-500 text-sm">
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto deserunt nesciunt quod laboriosam dolorem obcaecati fuga, distinctio suscipit, repellendus et quaerat ducimus ratione magni doloremque. Sunt sequi similique eum repellat, doloremque impedit nemo quidem quas tempore cum, iusto asperiores corrupti.
            </p>
          </div>
          
          <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
            <span
              href="#"
              class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
            >
              <svg
                height="13px"
                width="13px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                  </g>
                </g>
              </svg>
              <span class="ml-1 uppercase">Show more </span>
            </span>
{/* 
            <span
              href="#"
              class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
            >
              <svg
                class="h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                ></path>
              </svg>
              <span class="ml-1">39 Comments</span>
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramSchedule;
