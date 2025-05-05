import { HomeLayout } from "@/Layout/HomeLayout";
import { adminAddClass, getAllClasses } from "@/Redux/Slices/classSlice";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import { IoIosArrowBack } from "react-icons/io";
// import { IoIosArrowForward } from "react-icons/io";

const Classes = () => {
  const dispatch = useDispatch();
  const [addClassPopUp, setAddClassPopUp] = useState(false);
  const [instructorImage, setInstructorImage] = useState("");
  const [previewImage, serPreviewImage] = useState("");
  const [instructorPreview, setInstructorPreview] = useState("");
  const [allClasses, setAllClasses] = useState([]);
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  //  const [totalPages, setTotalPages] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const formState = [
    {
      label: "Title",
      inputType: "text",
      name: "title",
      error: {
        required: "Title is required",
        minLength: { value: 4, message: "Minimum 4 characters required" },
      },
    },
    {
      label: "Description",
      inputType: "textarea",
      name: "description",
      required: true,

      error: {
        required: "Description is required",
        minLength: { value: 4, message: "Minimum 4 characters required" },
      },
    },

    {
      label: "Instructor",
      inputType: "text",
      name: "instructorName",
      required: true,
      error: {
        required: "Instructor name is required",
        minLength: { value: 4, message: "Minimum 4 characters required" },
      },
    },
    {
      label: "Instructor Image",
      inputType: "file",
      name: "image",
      required: true,
      error: {
        required: "Instructor image is required",
      },
    },
    {
      label: "Location",
      inputType: "text",
      name: "location",
      required: true,

      error: {
        required: "Location is required",
        minLength: { value: 4, message: "Minimum 4 characters required" },
      },
    },
    {
      label: "Date",
      inputType: "date",
      name: "date",
      error: {
        required: "Date is required",
      },
    },
    {
      label: "Time",
      inputType: "time",
      name: "time",
      required: true,

      error: {
        required: "Time is required",
      },
    },
    {
      label: "Duration",
      inputType: "text",
      name: "duration",
      required: true,

      error: {
        required: "Duration is required",
      },
    },
    {
      label: "Price",
      inputType: "text",
      name: "price",
      error: {
        required: "Price is required",
      },
    },
    {
      label: "Capacity",
      inputType: "text",
      name: "capacity",
      required: true,

      error: {
        required: "Capacity is required",
      },
    },

    {
      label: "Available",
      inputType: "checkbox",
      value: true,
      name: "available",
      required: true,

      error: {
        required: "available is required",
      },
    },

    {
      label: "Enrolled Count",
      inputType: "text",
      name: "enrolledCount",
      required: true,

      error: {
        required: "enrolledCount is required",
      },
    },
  ];

  const handleFileUpload = (e) => {
    const uploadedImage = e.target.files[0];
    const previewImage = URL.createObjectURL(uploadedImage);
    serPreviewImage(previewImage);
    setInstructorImage(uploadedImage);
    console.log(uploadedImage);
  };

  const handleAddClass = async (data) => {
    try {
      console.log("Submitted Data:", data);

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (instructorImage) {
        formData.append("instructor.image", instructorImage);
      }
      const response = await dispatch(adminAddClass(formData));
      if (response?.payload?.success === true) {
        // reset();
      }
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  const handleGetAllClasses = async () => {
    try {
      const response = await dispatch(getAllClasses());
      console.log(response);
      setAllClasses(response?.payload?.data?.classes);
      // setTotalPages(response?.payload?.data?.totalPages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllClasses();
  }, []); 
  
  
  // const handlePrevPage = () => {
  //   if (page > 1) setPage((prev) => prev - 1);
  // };

  // const handleNextPage = () => {
  //   if (page < totalPages) setPage((prev) => prev + 1);
  // };

  return (
    <HomeLayout>
      <div>
        <div className="flex justify-between py-2">
          <div className="flex flex-col">
            <h1 className="text-2xl">All Classes</h1>
            <div className="w-20 h-1 bg-black"></div>
          </div>

          <button
            onClick={() => setAddClassPopUp(true)}
            className="bg-black text-white px-4 py-2 rounded-md  cursor-pointer text-sm"
          >
            Add Class
          </button>
        </div>

        <div className="flex flex-wrap justify-between gap-y-6 py-10">
          {allClasses?.map((ele) => (
            <div class="w-full max-w-[20rem] bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div class="h-20 bg-gradient-to-r from-black to-natural-500 relative">
                <div class="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div class="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                    <img
                      src={ele?.instructor?.image?.secureUrl}
                      alt="Profile"
                      class="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div class="pt-14 px-6 pb-6 text-center">
                <h1 class="text-xl font-bold text-gray-800">
                  {ele?.instructor?.name}
                </h1>
                <p class="text-purple-600 font-medium">{ele?.title}</p>

                <p class="text-gray-600 text-sm mt-2 mb-4">
                  {ele?.description}
                </p>
                <div class="flex flex-wrap justify-center gap-2 my-4">
                  <span class="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    Duration :- {ele?.duration}
                  </span>
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Capacity :- {ele?.capacity}
                  </span>
                  <span class="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Price :- {ele?.price}
                  </span>
                  {/* <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                JavaScript
              </span> */}
                </div>

                <div class="flex gap-3 justify-center mt-6">
                  <button class="px-6 py-2 bg-yellow-100 text-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
                    Edit
                  </button>
                  <button class="px-6 py-2 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                    Delete
                  </button>
                </div>

                <div class="flex justify-center gap-4 mt-6 text-gray-500">
                  <a
                    href="#"
                    aria-label="Twitter profile"
                    class="hover:text-purple-600 transition-colors"
                  >
                    <i class="fab fa-twitter text-xl"></i>
                  </a>
                  <a
                    href="#"
                    aria-label="GitHub profile"
                    class="hover:text-purple-600 transition-colors"
                  >
                    <i class="fab fa-github text-xl"></i>
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn profile"
                    class="hover:text-purple-600 transition-colors"
                  >
                    <i class="fab fa-linkedin-in text-xl"></i>
                  </a>
                  <a
                    href="#"
                    aria-label="Dribbble profile"
                    class="hover:text-purple-600 transition-colors"
                  >
                    <i class="fab fa-dribbble text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* <div className="flex justify-center text-xl mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-6 py-3 flex items-center justify-center ${
            page === 1 ? "bg-gray-400 text-white" : "bg-black text-white"
          }`}
        >
          <IoIosArrowBack />
        </button>

        <div className="px-6 py-3 border border-gray-800 text-black">
          {page}
        </div>

        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-6 py-3 flex items-center justify-center ${
            page === totalPages ? "bg-gray-400 text-white" : "bg-black text-white"
          }`}
        >
          <IoIosArrowForward />
        </button>
        </div> */}


      </div>

      {addClassPopUp && (
        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto transition flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setAddClassPopUp(false)}
          ></div>

          <div className="relative w-full max-w-4xl p-4 mx-auto bg-white rounded-xl z-50">
            <button
              type="button"
              onClick={() => setAddClassPopUp(false)}
              className="absolute top-2 right-2 cursor-pointer"
            >
              <svg
                className="h-5 w-5 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414 5.707 15.707a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <form
              onSubmit={handleSubmit(handleAddClass)}
              className="text-gray-700 grid grid-cols-2 gap-4 text-sm"
            >
              {formState.map((input, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    input.inputType === "textarea" ? "col-span-2" : ""
                  }`}
                >
                  <label className="mb-1">
                    {input.label}{" "}
                    {input.required && <span className="text-red-500">*</span>}
                  </label>
                  {input.inputType === "textarea" ? (
                    <textarea
                      rows={input.rows || 2}
                      {...register(input.name)}
                      className={`border px-2 py-1 rounded ${
                        errors[input.name]
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                    />
                  ) : input.inputType === "file" ? (
                    <div className="flex justify-between items-center">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className={`border px-2 py-1 rounded ${
                          errors[input.name]
                            ? "border-red-500"
                            : "border-gray-400"
                        }`}
                      />
                      {previewImage && (
                        <img
                          src={previewImage}
                          className="size-12 border border-1 border-gray-600 object-cover rounded-full  "
                          alt=""
                        />
                      )}
                    </div>
                  ) : input.inputType === "checkbox" ? (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register(input.name)}
                        className="h-5 w-5 accent-black"
                      />
                      {/* {input.label} */}
                      {/* {input.required && <span className="text-red-500">*</span>} */}
                    </label>
                  ) : (
                    <input
                      type={input.inputType}
                      {...register(input.name, input.error)}
                      className={`border px-2 py-1 rounded ${
                        errors[input.name]
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                    />
                  )}
                  {errors[input.name] && (
                    <span className="text-red-500 text-xs">
                      {errors[input.name].message}
                    </span>
                  )}
                </div>
              ))}

              <div className="col-span-2">
                <button
                  type="submit"
                  className="bg-black text-white cursor-pointer py-2 w-full rounded mt-2"
                >
                  {isSubmitting ? (
                    <div className="border-2 mx-auto rounded-full border-dashed animate-spin border-white size-5"></div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </HomeLayout>
  );
};

export default Classes;
