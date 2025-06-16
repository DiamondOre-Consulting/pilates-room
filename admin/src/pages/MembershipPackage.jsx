import { formState } from "@/Hooks/constants";
import { HomeLayout } from "@/Layout/HomeLayout";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { useDispatch } from "react-redux";
import {
  createMemberShipPackage,
  deleteMembershipPackage,
  EditMemberShipPackage,
  getMemberShipPackage,
} from "@/Redux/Slices/MembershpPackageSlice";

const MembershipPackage = () => {
  const [addMembershipPackage, setAddMembershipPackage] = useState(false);
  const [allMembershipPackages, setAllMembershipPackages] = useState([]);
  const [membershipPackageId, setMemberShipPackageId] = useState();
  const [editMembershipPackagePopup, setEditMembershipPackagePopup] =
    useState(false);

  const dispatch = useDispatch();
  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Enter text here...",
    height: 250,
  };

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
      label: "Package Type",
      name: "packageType",
      inputType: "select",
      error: {
        required: "Package Type is required",
        minLength: { value: 2, message: "Minimum 2 characters required" },
      },
    },

    {
      label: "Location",
      name: "location",
      inputType: "select",
      error: {
        required: "location is required",
        minLength: { value: 2, message: "Minimum 2 characters required" },
      },
    },
    {
      label: "Package Name",
      name: "packageName",
      inputType: "text",
      error: {
        required: "Package Name is required",
        minLength: { value: 2, message: "Minimum 2 characters required" },
      },
    },
    {
      label: "validity (in weeks)",
      name: "validity",
      inputType: "text",
      error: {
        required: "validity is required",
        // minLength: { value: 2, message: "Minimum 2 characters required" },
      },
    },

    {
      label: "Total Sessions",
      name: "totalSessions",
      inputType: "number",
      error: {
        required: "session is required",
        // minLength: { value: 2, message: "Minimum 2 characters required" },
      },
    },
    {
      label: "price",
      name: "price",
      inputType: "number",
      error: {
        required: "pprice is required",
        // minLength: { value: 2, message: "Minimum 2 characters required" },
      },
    },
    {
      label: "Per Session Price",
      name: "perSessionPrice",
      inputType: "number",
      error: {
        required: "per session price is required",
        // minLength: { value: 2, message: "Minimum 2 characters required" },
      },
    },

    {
      label: "Description",
      name: "description",
      inputType: "textarea",
      error: {
        required: "description is required",
        minLength: { value: 2, message: "Minimum 2 characters required" },
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

  const handleAddMembershipPackage = async (data) => {
    try {
      console.log(data);
      const res = await dispatch(createMemberShipPackage(data));
      console.log(res);
      if (res?.payload?.success) {
        setAddMembershipPackage(false);
        await handleGetAllMemberShipPackage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllMemberShipPackage = async () => {
    try {
      const response = await dispatch(getMemberShipPackage());
      console.log(response);
      setAllMembershipPackages(response?.payload?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllMemberShipPackage();
  }, [dispatch]);

  const handleEditClick = (id, data) => {
    setMemberShipPackageId(id), reset(data);
    setEditMembershipPackagePopup(true);
  };

  console.log(allMembershipPackages);

  const handleEditMemberShipPackage = async (data) => {
    try {
      const response = await dispatch(
        EditMemberShipPackage({ membershipPackageId, data })
      );
      console.log(response);
      if (response?.payload.success) {
        setEditMembershipPackagePopup(false);
        await handleGetAllMemberShipPackage();
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMemberShipPackage = async (id) => {
    try {
      const response = await dispatch(deleteMembershipPackage(id));
      console.log(response);
      await handleGetAllMemberShipPackage();
    } catch (error) {}
  };
  return (
    <HomeLayout>
      <div>
        <div className="flex md:flex-row md:gap-y-0 gap-y-2 flex-col justify-between py-2">
          <div className="flex flex-col ">
            <h1 className="text-xl md:text-2xl">All Membership Package</h1>
            <div className="w-20 md:w-40 h-1 bg-black"></div>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                reset({
                  packageType: "",
                  location: "",
                  packageName: "",
                  validity: "",
                  totalSessions: "",
                  price: "",
                  perSessionPrice: "",
                  description: "",
                  available: false,
                });
                setAddMembershipPackage(true);
              }}
              className="bg-black text-white w-fit px-2 md:px-4 py-2 rounded-md  cursor-pointer text-xs md:text-sm"
            >
              Add Membership Package
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 pb-10 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {allMembershipPackages?.map((pkg) => (
            <div
              key={pkg._id}
              className=" shadow-md rounded-2xl border border-gray-300 overflow-hidden flex flex-col justify-between"
            >
              <div className="bg-gradient-to-r from-black to-neutral-800  px-6 py-4">
                <p className="text-xl text-center capitalize font-semibold text-gray-100 dark:text-white">
                  {pkg?.packageName}
                </p>
              </div>

              <div className="p-2 text-gray-800 dark:text-white">
                <div className="flex flex-col min-w-[19rem] p-1 pb-0 gap-1 text-[15px]  text-gray-500   capitalize">
                  <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                    Total Price
                    <span className="text-[1.01rem] dark:text-white text-black">
                      ₹{pkg?.price.toLocaleString("en-IN")}
                    </span>
                  </p>
                  <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                    Price per week
                    <span className="text-[1.01rem] dark:text-white text-black">
                      ₹{pkg?.perSessionPrice.toLocaleString("en-IN")}
                    </span>
                  </p>
                  <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                    Available
                    <span className="text-[1.01rem] dark:text-white text-black">
                      {pkg.available ? "Yes" : "No"}
                    </span>
                  </p>
                  <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                    Location
                    <span className="text-[1.01rem] dark:text-white text-black">
                      {pkg.location}
                    </span>
                  </p>
                  <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                    Type
                    <span className="text-[1.01rem] dark:text-white text-black">
                      {pkg?.packageType}
                    </span>
                  </p>
                  <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                    Total Sessions
                    <span className="text-[1.01rem] capitalize dark:text-white text-black">
                      {pkg?.totalSessions}
                    </span>
                  </p>
                  <p className="p-1 flex w-full items-center justify-between border-b-[1px] text-sm border-gray-300 text-gray-500 ">
                    Validity
                    <span className="text-[1.01rem] dark:text-white text-black">
                      {pkg?.validity} weeks
                    </span>
                  </p>
                </div>

                {/* <div
                  className="text-sm mt-4"
                  dangerouslySetInnerHTML={{ __html: pkg.description }}
                /> */}
              </div>

              <div className="px-2 pb-4 mt-auto flex  space-x-4">
                <button
                  onClick={() => handleEditClick(pkg?._id, pkg)}
                  className="w-full bg-green-700 cursor-pointer text-white py-2 px-4 rounded transition duration-300"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleMemberShipPackage(pkg?._id)}
                  className="w-full bg-red-600 cursor-pointer  text-white py-2 px-4 rounded transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {addMembershipPackage && (
          <div className="fixed inset-0 z-40 min-h-full    transition flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setAddMembershipPackage(false)}
            ></div>

            <div className="relative w-full max-w-4xl p-4 mx-auto bg-white rounded-xl z-50">
              <button
                type="button"
                onClick={() => setAddMembershipPackage(false)}
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
                onSubmit={handleSubmit(handleAddMembershipPackage)}
                className="text-gray-700 md:grid grid-cols-3 gap-4 h-[80vh] overflow-y-auto text-sm"
              >
                {formState.map((input, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      input.inputType === "textarea" ? "col-span-3" : ""
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
                    ) : input.inputType === "select" &&
                      input.name === "packageType" ? (
                      <>
                        <select
                          {...register(input.name, input.error)}
                          className={`border px-2 py-1 rounded ${
                            errors[input.name]
                              ? "border-red-500"
                              : "border-gray-400"
                          }`}
                        >
                          <option value="">Select Type</option>
                          <option value="discovery">Discovery</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                        </select>
                        {errors[input.name] && (
                          <span className="text-red-500 text-xs">
                            {errors[input.name].message}
                          </span>
                        )}
                      </>
                    ) : input.inputType === "select" &&
                      input.name === "location" ? (
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

                <div className="col-span-3">
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

        {editMembershipPackagePopup && (
          <div className="fixed inset-0 z-40 min-h-full    transition flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => {
                reset();
                setEditMembershipPackagePopup(false);
              }}
            ></div>

            <div className="relative w-full max-w-4xl p-4 mx-auto bg-white rounded-xl z-50">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setEditMembershipPackagePopup(false);
                }}
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
                onSubmit={handleSubmit(handleEditMemberShipPackage)}
                className="text-gray-700 md:grid grid-cols-3 gap-4 h-[80vh] overflow-y-auto text-sm"
              >
                {formState.map((input, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      input.inputType === "textarea" ? "col-span-3" : ""
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
                    ) : input.inputType === "select" &&
                      input.name === "packageType" ? (
                      <>
                        <select
                          {...register(input.name, input.error)}
                          className={`border px-2 py-1 rounded ${
                            errors[input.name]
                              ? "border-red-500"
                              : "border-gray-400"
                          }`}
                        >
                          <option value="">Select Type</option>
                          <option value="discovery">Discovery</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                        </select>
                        {errors[input.name] && (
                          <span className="text-red-500 text-xs">
                            {errors[input.name].message}
                          </span>
                        )}
                      </>
                    ) : input.inputType === "select" &&
                      input.name === "location" ? (
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

                <div className="col-span-3">
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

export default MembershipPackage;
