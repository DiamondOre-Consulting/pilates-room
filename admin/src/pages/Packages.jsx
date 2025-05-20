import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import {
  createPackage,
  deletePackage,
  editPackage,
  getAllPackages,
} from "@/Redux/Slices/PackageSlice";
import { HomeLayout } from "@/Layout/HomeLayout";

const Packages = () => {
  const dispatch = useDispatch();
  const [createPackagePopUp, setCreatePackagePopUp] = useState(false);
  const [packageImage, setPackageImage] = useState("");
  const [previewImage, setPreviewImage] = useState();
  const [allPackages, setAllPackages] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [packageId, setPackageId] = useState();
  const [editPackageData, setEditPackageData] = useState(null);
  const [editPackagePopUp, setEditPackagePopUp] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const formState = [
    {
      label: "Title",
      inputType: "text",
      name: "title",
      error: {
        required: "Title is required",
        minLength: { value: 2, message: "Minimum 2 characters required" },
      },
    },
    {
      label: "Session Info",
      inputType: "text",
      name: "sessionInfo",
      required: true,

      error: {
        required: "Session Info is required",
      },
    },
    {
      label: "Description",
      inputType: "textarea",
      name: "description",
      required: true,

      error: {
        required: "Description is required",
      },
    },

    {
      label: "Price",
      inputType: "number",
      name: "price",
      required: true,
      error: {
        required: "price is required",
      },
    },

    {
      label: "Package Image",
      inputType: "file",
      name: "image",
      required: true,
      error: {
        required: "package image is required",
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
  ];

  const handleFileUpload = (e) => {
    const uploadedImage = e.target.files[0];
    const previewImage = URL.createObjectURL(uploadedImage);
    setPreviewImage(previewImage);
    setPackageImage(uploadedImage);
    console.log(uploadedImage);
  };

  const handleCreatePackage = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (packageImage) {
        formData?.append("packageImage", packageImage);
      }

      const response = await dispatch(createPackage(formData));
      if (response?.payload?.success === true) {
        setCreatePackagePopUp(false);
        await handleGetAllPackages();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllPackages = async () => {
    try {
      const response = await dispatch(getAllPackages({ page, limit }));
      console.log("packagessssssssss",response);
      setAllPackages(response?.payload?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllPackages();
  }, []);

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Enter text here...",
    height: 250,
  };

  const editPackageClicked = (id, data) => {
    setPackageId(id);
    setEditPackageData(data);
    reset(data);
    // setValue("date", data?.date.split("T")[0]);
    // setValue("instructorName", data?.instructor?.name);
    setPreviewImage(data?.image?.secureUrl);
    console.log(id, data);
    setEditPackagePopUp(true);
  };

  const handleEditPackage = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (packageImage) {
        formData.append("packageImage", packageImage);
      }
      console.log(formData, data);

      const response = await dispatch(editPackage({ packageId, formData }));
      console.log(response);
      if (response?.payload?.success) {
        setEditPackagePopUp(false);
        await handleGetAllPackages();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePackage = async (id) => {
    try {
      console.log(id);
      const response = await dispatch(deletePackage(id));
      console.log(response);
      if (response?.payload?.statusCode == 200) {
        console.log(response?.payload.statusCode);
        await handleGetAllPackages();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <HomeLayout>
      <div>
        <div className="flex justify-between py-2">
          <div className="flex flex-col">
            <h1 className="text-2xl">All Packages</h1>
            <div className="w-20 h-1 bg-black"></div>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() =>{ reset() ; 
                setCreatePackagePopUp(true)}}
              className="bg-black text-white px-4 py-2 rounded-md  cursor-pointer text-sm"
            >
              Add Package
            </button>

            <div className="flex space-x-2 items-center  text-sm">
              <span>Page Limit : </span>
              <select
                className="border  px-2 cursor-pointer  py-1  border-gray-700 rounded-md"
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value={1}>10</option>
                <option value={2}>20</option>
                <option value={3}>30</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-12 gap-6">
          {allPackages?.map((pkg) => (
            <article className="shadow-lg relative bg-white dark:shadow-none dark:bg-[#1E2735] rounded overflow-hidden h-full">
              <img
                src={pkg?.image?.secureUrl}
                className="h-40 object-cover w-full"
              />
              <div className="p-3 pb-8 md:p-6 md:pb-12">
                <h4 className="font-medium text-xl leading-7 flex  items-center   mb-2">
                  {pkg?.title}{" "}
                  <div
                    className={`${
                      pkg?.available
                        ? "bg-green-400 ml-2 animate-pulse size-4 rounded-full "
                        : "bg-red-400 ml-2 animate-pulse size-4 rounded-full"
                    }`}
                  ></div>
                </h4>
                <p>
                  <p className="text-blue-600 opacity-70">{pkg?.sessionInfo}</p>

                  <p className="text-blue-600 bg-blue-400/50 w-fit px-2 rounded-md opacity-70">
                    ₹ {pkg?.price}
                  </p>

                  <span>{/* At <span>{date}</span> */}</span>
                </p>
                <p
                  dangerouslySetInnerHTML={{ __html: pkg?.description }}
                  className="opacity-60 mt-3 mb-8 text-xs"
                />

                <div className="flex space-x-4 absolute  bottom-4">
                  <button
                    onClick={(e) => editPackageClicked(pkg?._id, pkg)}
                    className="bg-transparent hover:bg-black border border-black cursor-pointer hover:text-white py-2 px-5 rounded transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => handleDeletePackage(pkg?._id)}
                    className="bg-transparent hover:bg-black border border-black cursor-pointer hover:text-white py-2 px-5 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center text-xl mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`px-6 py-3 flex items-center justify-center ${
              page === 1 ? "bg-gray-400 text-white" : "bg-black text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-arrow-left-icon lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>

          <div className="px-6 py-3 border border-gray-800 text-black">
            {page}
          </div>

          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`px-6 py-3 flex items-center justify-center ${
              page === totalPages
                ? "bg-gray-400 text-white"
                : "bg-black text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-arrow-right-icon lucide-arrow-right"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        {createPackagePopUp && (
          <div className="fixed inset-0 z-40 min-h-full overflow-y-auto   transition flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setCreatePackagePopUp(false)}
            ></div>

            <div className="relative w-full max-w-4xl p-4 mx-auto bg-white rounded-xl z-50">
              <button
                type="button"
                onClick={() => setCreatePackagePopUp(false)}
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
                onSubmit={handleSubmit(handleCreatePackage)}
                className="text-gray-700 grid grid-cols-2 gap-4   text-sm"
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
                      {input.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    {input.inputType === "textarea" ? (
                      <JoditEditor
                        ref={editor}
                        value={watch("description")}
                        config={config}
                        onBlur={(newContent) =>
                          setValue("description", newContent)
                        }
                        onChange={() => {}}
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

        {editPackagePopUp && (
          <div className="fixed inset-0 z-40 min-h-full overflow-y-auto py-10 mt-10 transition flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setEditPackagePopUp(false)}
            ></div>

            <div className="relative w-full max-w-4xl p-4 mx-auto bg-white rounded-xl z-50">
              <button
                type="button"
                onClick={() => setEditPackagePopUp(false)}
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
                onSubmit={handleSubmit(handleEditPackage)}
                className="text-gray-700 grid grid-cols-2 gap-4 pt-14 text-sm"
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
                      {input.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    {input.inputType === "textarea" ? (
                      <JoditEditor
                        ref={editor}
                        value={watch("description")}
                        config={config}
                        onBlur={(newContent) =>
                          setValue("description", newContent)
                        }
                        onChange={() => {}}
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
      </div>
    </HomeLayout>
  );
};

export default Packages;
