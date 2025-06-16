import { HomeLayout } from "@/Layout/HomeLayout";
import {
  adminAddClass,
  deleteClass,
  editClass,
  getAllClasses,
} from "@/Redux/Slices/classSlice";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import JoditEditor from "jodit-react";
import TimePicker from "react-time-picker";
import { Edit } from "lucide-react";

const Classes = () => {
  const dispatch = useDispatch();
  const [addClassPopUp, setAddClassPopUp] = useState(false);
  const [instructorImage, setInstructorImage] = useState("");
  const [previewImage, serPreviewImage] = useState("");
  const [instructorPreview, setInstructorPreview] = useState("");
  const [allClasses, setAllClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [classId, setClassId] = useState();
  const [editClassData, setEditClassData] = useState(null);
  const [editClassPopUp, setEditClassPopUp] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const days = [
    { short: "Sun", full: "sunday" },
    { short: "Mon", full: "monday" },
    { short: "Tue", full: "tuesday" },
    { short: "Wed", full: "wednesday" },
    { short: "Thu", full: "thursday" },
    { short: "Fri", full: "friday" },
    { short: "Sat", full: "saturday" },
  ];

  const [selectedDays, setSelectedDays] = useState([]);

  // const toggleDay = (dayFullName) => {
  //   setSelectedDays((prev) =>
  //     prev.includes(dayFullName)
  //       ? prev.filter((d) => d !== dayFullName)
  //       : [...prev, dayFullName]
  //   );
  // };

  const toggleDay = (dayFullName) => {
    if (!dayFullName) return;
    setSelectedDays((prev) =>
      prev.includes(dayFullName)
        ? prev.filter((d) => d !== dayFullName)
        : [...prev, dayFullName]
    );
  };

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
      inputType: "select",
      name: "location",
      required: true,

      error: {
        required: "Location is required",
        minLength: { value: 4, message: "Minimum 4 characters required" },
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

    {
      name: "weeks",
      label: "Select Weeks",
      inputType: "days",
      required: true,
    },
  ];

  const handleFileUpload = (e) => {
    const uploadedImage = e.target.files[0];
    const previewImage = URL.createObjectURL(uploadedImage);
    serPreviewImage(previewImage);
    setInstructorImage(uploadedImage);
  };

  const handleAddClass = async (data) => {
    try {
      if (selectedDays.length === 0) {
        alert("Please select at least one day.");
        return;
      }
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "time") formData.append(key, data[key]);
      });

      if (data.time) {
        const [hour, minute] = data.time.split(":");
        const start = new Date();
        start.setHours(hour);
        start.setMinutes(minute);
        const formattedStart = start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }); // => "08:00 AM"
        formData.append("time", formattedStart);
      }

      selectedDays
        .filter((day) => day !== "")
        .forEach((day) => {
          formData.append("weeks", day);
        });

      if (instructorImage) {
        formData.append("instructor.image", instructorImage);
      }
      const response = await dispatch(adminAddClass(formData));
      if (response?.payload?.success === true) {
        setAddClassPopUp(false);
        // reset();
        await handleGetAllClasses();
      }
    } catch (error) {
      return;
    }
  };

  const handleGetAllClasses = async () => {
    try {
      const response = await dispatch(getAllClasses({ page, limit }));
      setAllClasses(response?.payload?.data?.classes);
      setTotalPages(response?.payload?.data?.totalPages || 1);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    handleGetAllClasses();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handleDeleteClass = async (id) => {
    try {
      const response = await dispatch(deleteClass(id));
      if (response?.payload?.statusCode == 200) {
        await handleGetAllClasses();
      }
    } catch (error) {
      return;
    }
  };

  const editClassClicked = (id, data) => {
    setClassId(id);
    setEditClassData(data);
    reset(data);
    // setValue("date", data?.date.split("T")[0]);
    setValue("instructorName", data?.instructor?.name);
    setValue("weeks", data?.weeks || []);
    setSelectedDays(data?.weeks || []);
    serPreviewImage(data?.instructor?.image?.secureUrl);

    const formatTimeTo24H = (timeStr) => {
      if (!timeStr) return "";
      const [time, modifier] = timeStr.split(" "); // e.g. ["10:35", "PM"]
      if (!time || !modifier) return "";

      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    };

    setValue("time", formatTimeTo24H(data.time));
    console.log(id, data);
    setEditClassPopUp(true);
  };

  const handleEditClass = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "weeks" && key !== "time") {
          formData.append(key, data[key]);
        }
      });
      selectedDays.forEach((day, index) => {
        formData.append(`weeks[${index}]`, day);
      });

      if (data.time) {
        const [hour, minute] = data.time.split(":");
        const start = new Date();
        start.setHours(hour);
        start.setMinutes(minute);
        const formattedStart = start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        formData.append("time", formattedStart);
      }

      if (instructorImage) {
        formData.append("instructor.image", instructorImage);
      }
      console.log(formData, data);

      const response = await dispatch(editClass({ classId, formData }));
      console.log(response);
      if (response?.payload?.success) {
        setEditClassPopUp(false);
        await handleGetAllClasses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Enter text here...",
    height: 250,
  };

  return (
    <HomeLayout>
      <div>
        <div className="flex  flex-col md:flex-row md:gap-y-0 gap-y-2 justify-between py-2">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl">All Classes</h1>
            <div className="w-20 h-1 bg-black"></div>
          </div>

          <div className="flex flex-col md:space-y-2">
            <button
              onClick={() => {
                reset({
                  title: "",
                  description: "",
                  instructorName: "",
                  image: null,
                  location: "",
                  time: "",
                  duration: "",
                  capacity: "",
                  available: false,
                  enrolledCount: "",
                  // weeks: [],
                });

                setAddClassPopUp(true);
              }}
              className="bg-gradient-to-r cursor-pointer  md:text-sm text-xs from-neutral-800 via-neutral-600 to-neutral-800 text-white px-2 md:px-6 text-center w-fit py-2 md:py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New Class
            </button>

            <div className="flex items-center space-x-3">
              <span className="text-gray-600 font-medium">Items per page:</span>
              <select
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm"
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          {allClasses?.map((ele) => (
            <div
              key={ele._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative h-16 bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-900">
                <button
                  onClick={() => editClassClicked(ele?._id, ele)}
                  className=" bg-green-50 z-10 size-9 flex items-center justify-center text-green-700 rounded absolute top-2 right-2 cursor-pointer hover:bg-blue-100 transition-colors duration-200 font-medium"
                >
                  <Edit className="size-5" />
                </button>
                <div className="absolute -bottom-10 w-full flex justify-center">
                  <div
                    className={`h-20 w-20 z-1 relative rounded-full border-4  ${
                      ele?.available ? "border-green-500" : "border-red-500"
                    }  bg-white shadow-lg`}
                  >
                    <img
                      src={ele?.instructor?.image?.secureUrl}
                      alt={ele?.instructor?.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-12 p-6">
                <p className="text-blue-600 capitalize font-medium text-center mb-4">
                  {ele?.title}
                </p>

                <div className="flex flex-col md:min-w-[19rem] p-1 pb-0 gap-1 text-[15px]  text-gray-500   capitalize">
                  <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                    Instructor
                    <span className="text-[1.01rem] dark:text-white text-black">
                      {ele?.instructor?.name}
                    </span>
                  </p>
                  <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                    Duration
                    <span className="text-[1.01rem] dark:text-white text-black">
                      {ele?.duration}
                    </span>
                  </p>
                  <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                    Capacity
                    <span className="text-[1.01rem] dark:text-white text-black">
                      {ele?.time}
                    </span>
                  </p>
                  <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                    Location
                    <span className="text-[1.01rem] capitalize dark:text-white text-black">
                      {ele?.location}
                    </span>
                  </p>
                  <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                    Capacity
                    <span className="text-[1.01rem] dark:text-white text-black">
                      {ele?.capacity}
                    </span>
                  </p>
                </div>
                {/* 
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => editClassClicked(ele?._id, ele)}
                    className="px-6 py-2 bg-blue-50 w-full text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium"
                  >
                    Edit Class
                  </button>
                  <button
                    onClick={() => handleDeleteClass(ele?._id)}
                    className="px-6 py-2 bg-red-600 w-full text-white rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium"
                  >
                    Delete
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 my-8">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`p-2 rounded-lg flex items-center ${
              page === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-medium text-gray-700">
            Page {page} of {totalPages}
          </div>

          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`p-2 rounded-lg flex items-center ${
              page === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {addClassPopUp && (
        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto  transition flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setAddClassPopUp(false)}
          ></div>

          <div className="relative w-full max-w-4xl h-[95vh] overflow-y-auto p-4 mx-auto bg-white rounded-xl z-50">
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
              className="text-gray-700  md:grid grid-cols-2 gap-4  text-sm"
            >
              {formState?.map((input, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    input.inputType === "textarea" ? "w-full md:col-span-2" : ""
                  }`}
                >
                  <label className="mb-1">
                    {input.label}{" "}
                    {input.required && <span className="text-red-500">*</span>}
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
                  ) : input.inputType === "select" ? (
                    <>
                      <select
                        {...register(input.name, input.error)}
                        className={`border px-2 py-1 rounded ${
                          errors[input.name]
                            ? "border-red-500"
                            : "border-gray-400"
                        }`}
                      >
                        <option value="">Select Location</option>
                        <option value="gurugram">Gurugram</option>
                        <option value="faridabad">Faridabad</option>
                      </select>
                      {errors[input.name] && (
                        <span className="text-red-500 text-xs">
                          {errors[input.name].message}
                        </span>
                      )}
                    </>
                  ) : input.inputType === "time" ? (
                    <TimePicker
                      onChange={(value) => setValue(input.name, value)}
                      value={watch(input.name)}
                      format="hh:mm a"
                      disableClock={true}
                      className={`border px-2 py-1 rounded w-full ${
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
                        className={`border px-2 py-1 w-60 rounded ${
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
                  ) : input.inputType === "days" ? (
                    <div className="p-4  md:col-span-3   mx-auto">
                      <h2 className="text-center text-xl font-semibold mb-4 text-gray-800">
                        Select Days of the Week
                      </h2>
                      <div className="flex justify-center items-center gap-2 overflow-x-auto pb-2">
                        {days.map(({ short, full }) => (
                          <button
                            key={short}
                            type="button"
                            onClick={() => toggleDay(full)}
                            className={`size-[2rem] md:size-[3rem] rounded-full border-2 mt-2 shadow-md flex items-center justify-center font-semibold text-xs md:text-sm uppercase transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none flex-shrink-0
            ${
              selectedDays.includes(full)
                ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-transparent shadow-lg"
                : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
            }`}
                          >
                            {short}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4 text-center text-sm text-gray-700">
                        <span className="font-medium">Selected Days:</span>{" "}
                        {selectedDays.join(", ") || "None"}
                      </div>
                    </div>
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

      {editClassPopUp && (
        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto py-10 mt-10 transition flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setEditClassPopUp(false)}
          ></div>

          <div className="relative w-full max-w-4xl p-4 mx-auto h-[90vh] overflow-y-auto bg-white rounded-xl z-50">
            <button
              type="button"
              onClick={() => setEditClassPopUp(false)}
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
              onSubmit={handleSubmit(handleEditClass)}
              className="text-gray-700 md:grid grid-cols-2 gap-4  text-sm"
            >
              {formState?.map((input, index) => (
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
                        className={`border px-2 py-1 w-50 rounded ${
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
                  ) : input.inputType === "select" ? (
                    <>
                      <select
                        {...register(input.name, input.error)}
                        className={`border px-2 py-1 rounded ${
                          errors[input.name]
                            ? "border-red-500"
                            : "border-gray-400"
                        }`}
                      >
                        <option value="">Select Location</option>
                        <option value="gurugram">Gurugram</option>
                        <option value="faridabad">Faridabad</option>
                      </select>
                      {errors[input.name] && (
                        <span className="text-red-500 text-xs">
                          {errors[input.name].message}
                        </span>
                      )}
                    </>
                  ) : input.inputType === "time" ? (
                    <TimePicker
                      onChange={(value) => setValue(input.name, value)}
                      value={watch(input.name)}
                      format="hh:mm a"
                      disableClock={true}
                      className={`border px-2 py-1 rounded w-full ${
                        errors[input.name]
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                    />
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
                  ) : input.inputType === "days" ? (
                    <div className="p-4 w-full md:col-span-2 mx-auto">
                      <h2 className="text-center text-xl font-semibold mb-4 text-gray-800">
                        Select Days of the Week
                      </h2>
                      <div className="flex justify-center items-center gap-2 overflow-x-auto pb-2">
                        {days.map(({ short, full }) => (
                          <button
                            key={short}
                            type="button"
                            value={watch("weeks")}
                            onClick={() => toggleDay(full)}
                            className={`size-[2rem] md:size-[3rem] rounded-full border-2 mt-2 shadow-md flex items-center justify-center font-semibold text-xs md:text-sm uppercase transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none flex-shrink-0
            ${
              selectedDays.includes(full)
                ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-transparent shadow-lg"
                : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
            }`}
                          >
                            {short}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4 text-center text-sm text-gray-700">
                        <span className="font-medium">Selected Days:</span>{" "}
                        {selectedDays.join(", ") || "None"}
                      </div>
                    </div>
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

              {/* <div className="p-4 w-full col-span-2 mx-auto">
                <h2 className="text-center text-xl font-semibold mb-4 text-gray-800">
                  Select Days of the Week
                </h2>
                <div className="flex justify-center items-center gap-2 overflow-x-auto pb-2">
                  {days.map(({ short }) => (
                    <button
                      key={short}
                      onClick={() => toggleDay(short)}
                      className={`size-[3rem] rounded-full border-2 mt-2 shadow-md flex items-center justify-center font-semibold text-sm uppercase transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none flex-shrink-0
              ${
                selectedDays.includes(short)
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-transparent shadow-lg"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
              }`}
                    >
                      {short}
                    </button>
                  ))}
                </div>
                <div className="mt-4 text-center text-sm text-gray-700">
                  <span className="font-medium">Selected Days:</span>{" "}
                  {selectedDays.join(", ") || "None"}
                </div>
              </div> */}

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
