import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HomeLayout } from "@/Layout/HomeLayout";
import {
  adminAddUser,
  extendExpiry,
  getAllUsers,
} from "@/Redux/Slices/adminSlice";
import {
  X,
  Mail,
  CalendarCheck,
  BadgeCheck,
  UserCheck,
  UserX,
} from "lucide-react";
import { Eye, EyeOff, Pencil } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getMemberShipPackage } from "@/Redux/Slices/MembershpPackageSlice";

// import { FaEye, FaEyeSlash } from "react-icons/fa";

const AllUsers = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [addUserPopUp, setAddUserPopUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [extendExpiryPopUp, setExtentExpiryPopUp] = useState(false);
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, onSubmit },
  } = useForm();

  const handlePhoneChange = (phoneNumber) => {
    console.log(phoneNumber);
    setFormData((prev) => ({ ...prev, phoneNumber }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  // const [searchItem, setSearchItem] = useState("");

  const handleGetAllUsers = async (searchTerm) => {
    setLoading(true);
    const response = await dispatch(getAllUsers({ page, limit, searchTerm }));

    console.log(response);
    if (response?.payload?.success) {
      setUsers(response.payload?.data?.users);
      setTotalPages(response.payload?.data?.pagination?.totalPages);
    }

    setLoading(false);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const [searchItem, setSearchItem] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedInputValue = useDebounce(searchItem, 1000);

  useEffect(() => {
    if (debouncedInputValue) {
      handleGetAllUsers(debouncedInputValue);
    } else {
      setSearchResults([]);
    }
  }, [debouncedInputValue]);

  console.log(users);

  useEffect(() => {
    handleGetAllUsers(debouncedInputValue || "");
  }, [page, limit, debouncedInputValue]);

  console.log(selectedUser);

  console.log(expiryDate);
  const handleExtendExpiry = async (e, id) => {
    e.preventDefault();
    console.log(id);
    try {
      setLoader(true);
      const response = await dispatch(extendExpiry({ id, expiryDate }));
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setExtentExpiryPopUp(false);
      setShowModel(false);
      await handleGetAllUsers();
    }
  };

  useEffect(() => {
    if (selectedUser?.memberShipPlan?.expiryDate) {
      setExpiryDate(selectedUser.memberShipPlan.expiryDate.split("T")[0]);
    } else {
      setExpiryDate("");
    }
  }, [selectedUser]);

  const [allpackages, setAllPackages] = useState([]);
  const handleGetAllMemberShipPackage = async () => {
    try {
      const response = await dispatch(getMemberShipPackage());
      console.log(response);
      setAllPackages(response?.payload?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllMemberShipPackage();
  }, []);

  console.log(allpackages);

  const handleAddUser = async (data) => {
    console.log(data);
    try {
      const res = await dispatch(adminAddUser(data));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HomeLayout>
      <div>
        <div className="flex justify-between py-2">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex flex-col">
              <h1 className="text-2xl">All Users</h1>
              <div className="w-20 h-1 bg-black"></div>
            </div>

            <input
              type="text"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Search User..."
              className="border border-1 border-gray-800 rounded-md px-2 mt-5 md:mt-0 md:ml-4"
            />
          </div>
          <div className="flex space-x-2 items-center text-sm">
            <span>Page Limit:</span>
            <select
              className="border px-2 cursor-pointer py-1 border-gray-700 rounded-md"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div>

        <div className="space-x-4 mt-4">
          <button
            onClick={() => setAddUserPopUp(true)}
            className="bg-black px-2 py-1 text-white rounded-sm cursor-pointer"
          >
            Add User
          </button>
          {/* <button className="bg-black  text-white px-2 py-1 rounded-sm">
            Add Membership
          </button> */}
        </div>
        {/* <div className="my-4 relative">
          <select
            onChange={() => setSelectedCategory(e.target.value)}
            className="border border-black px-2 py-1 rounded-md"
          >
            <option value="">Select User Category</option>
            <option value="user">User</option>
            <option value="discovery">Discovery</option>
            <option value="membership">Membership User</option>
          </select>
        </div> */}

        {loading ? (
          <div className="flex justify-center py-10">Loading...</div>
        ) : users?.length > 0 ? (
          <div className="overflow-x-auto mt-4">
            <table className="w-full table-auto border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Registerd On</th>
                  <th className="px-4 py-2">Discovery</th>
                  <th className="px-4 py-2">Member</th>
                  {/* <th className="px-4 py-2">status</th> */}
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 min-w-40">
                      {user?.firstName} {user?.lastName}{" "}
                    </td>
                    <td className="px-4 py-2">{user?.email}</td>
                    <td className="px-4 py-2">
                      {user?.createdAt.split("T")[0]}
                    </td>
                    <td className="px-4 py-2">
                      {user?.isDiscovery ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2">
                      {user?.isMember ? "Yes" : "No"}
                    </td>

                    <td className="px-4 py-2">
                      <button
                        onClick={() => {
                          setShowModel(true);
                          setSelectedUser(user);
                        }}
                        className="text-blue-600 hover:underline cursor-pointer"
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
                          className="lucide lucide-eye-icon lucide-eye"
                        >
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No users found .
          </div>
        )}
        <div className="flex justify-center text-xl mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`px-6 py-3 flex items-center cursor-pointer justify-center ${
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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
            className={`px-6 py-3 flex items-center cursor-pointer justify-center ${
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      {showModel && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-xl shadow-2xl relative text-gray-800">
            <button
              onClick={() => setShowModel(false)}
              className="absolute top-3 right-4 cursor-pointer text-gray-400 hover:text-gray-900 transition"
            >
              <X size={28} />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
              <UserCheck className="text-blue-500" />
              User Details
            </h2>

            <div className="space-y-4 text-sm">
              <p className="flex items-center gap-2">
                <UserCheck className="text-indigo-500" size={18} />
                <span>
                  <strong>Name:</strong> {selectedUser.firstName}{" "}
                  {selectedUser.lastName}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <Mail className="text-green-500" size={18} />
                <span>
                  <strong>Email:</strong> {selectedUser.email}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <CalendarCheck className="text-amber-500" size={18} />
                <span>
                  <strong>Registered On:</strong>{" "}
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <BadgeCheck className="text-purple-500" size={18} />
                <span>
                  <strong>Discovery:</strong>{" "}
                  {selectedUser.isDiscovery ? "Yes" : "No"}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <BadgeCheck className="text-pink-500" size={18} />
                <span>
                  <strong>Membership:</strong>{" "}
                  {selectedUser.isMember ? "Yes" : "No"}
                </span>
              </p>

              {selectedUser.isMember && selectedUser?.memberShipPlan && (
                <div className="mt-4 space-y-2 border-t pt-4">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <BadgeCheck className="text-sky-500" />
                    Membership Details
                  </h3>

                  <p>
                    <strong>Status:</strong>{" "}
                    {selectedUser.memberShipPlan.status}
                  </p>
                  {/* <p><strong>Package ID:</strong> {selectedUser.memberShipPlan.package}</p> */}
                  {/* <p><strong>Subscription ID:</strong> {selectedUser.memberShipPlan.subscriptionId}</p> */}
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {selectedUser.memberShipPlan.startDate.split("T")[0]}
                  </p>
                  <p className="flex items-center  space-x-3">
                    <p>
                      <strong>Expiry Date:</strong>{" "}
                      {selectedUser.memberShipPlan.expiryDate.split("T")[0]}
                    </p>
                    <Pencil
                      className="text-[10px] cursor-pointer"
                      onClick={() => setExtentExpiryPopUp(true)}
                    />
                  </p>
                  <p>
                    <strong>Remaining Sessions:</strong>{" "}
                    {selectedUser.memberShipPlan.remainingSession}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {extendExpiryPopUp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-xl shadow-2xl relative text-gray-800">
            <button
              onClick={() => setExtentExpiryPopUp(false)}
              className="absolute top-3 right-4 cursor-pointer text-gray-400 hover:text-gray-900 transition"
            >
              <X size={28} />
            </button>

            {selectedUser.isMember && selectedUser?.memberShipPlan && (
              <div className="flex flex-col">
                <label>Extend Expiry</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="border border-gray-400 px-2 py-1 rounded-md mt-3"
                />
              </div>
            )}

            <button
              onClick={(e) => handleExtendExpiry(e, selectedUser?._id)}
              className="bg-black w-full cursor-pointer   text-white  px-2 py-2 mt-2  rounded-md"
            >
              {loader ? (
                <div role="status" className="flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 text-gray-200 animate-spin  fill-gray-600 "
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="ml-2">Loading...</span>
                </div>
              ) : (
                "Update"
              )}
              {/* Update */}
            </button>
          </div>
        </div>
      )}

      {addUserPopUp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-lg shadow-2xl relative text-gray-800">
            <button
              onClick={() => setAddUserPopUp(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4">Add New User</h2>

            <form onSubmit={handleSubmit(handleAddUser)} className="space-y-4">
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                    className="w-full border px-3 py-2 rounded-md mt-1"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    {...register("LastName", {
                      required: "Last Name is required",
                    })}
                    className="w-full border px-3 py-2 rounded-md mt-1"
                  />
                  {errors.LastName && (
                    <p className="text-red-500 text-xs">
                      {errors.LastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full border px-3 py-2 rounded-md mt-1"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Date of Birth</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  {...register("dob", {
                    required: "Date of birth is required",
                  })}
                />
                {errors.dob && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.dob.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <PhoneInput
                      country={"in"}
                      inputStyle={{ width: "100%" }}
                      {...field}
                    />
                  )}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Select Package</label>
                <select
                  {...register("selectedPackage", {
                    required: "Package is required",
                  })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                >
                  <option>Select Package</option>
                  {allpackages?.map((pkg, index) => (
                    <option key={index} value={pkg?._id}>
                      {pkg.packageName} - {pkg.location} - {pkg.packageType}
                    </option>
                  ))}
                </select>

                {errors.selectedPackage && (
                  <p className="text-red-500 text-xs">
                    {errors.selectedPackage.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full border px-3 py-2 rounded-md mt-1 pr-10"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-black text-white w-full px-4 py-2 rounded-md"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
      )}
    </HomeLayout>
  );
};

export default AllUsers;
