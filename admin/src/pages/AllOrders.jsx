import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import BeatLoader from "react-spinners/BeatLoader";
import { HomeLayout } from "@/Layout/HomeLayout";
import { getAllOrders } from "@/Redux/Slices/orderSlice";

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const AllOrders = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleGetAllOrders = async () => {
    setLoading(true);
    const response = await dispatch(
      getAllOrders({ page, limit, search: debouncedSearchTerm })
    );

    console.log(response);
    if (response?.payload?.success) {
      setOrders(response.payload.data?.data);

      setTotalPages(response.payload?.data?.pagination?.totalPages);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetAllOrders();
  }, [page, limit, debouncedSearchTerm]);

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <HomeLayout>
      <div>
        <div className="flex justify-between py-2 items-center flex-wrap gap-4">
          <div className="flex flex-col">
            <h1 className="text-2xl">All Bookings</h1>
            <div className="w-20 h-1 bg-black"></div>
          </div>

          <div className="flex items-center gap-4">
             {/* Search Input */}
              <div className="relative">
                  <input
                      type="text"
                      placeholder="Search Name or Email..."
                      className="border border-gray-300 rounded px-3 py-2 text-sm w-64 focus:outline-none focus:border-black"
                      value={searchTerm}
                      onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setPage(1); // Reset to page 1 on search
                      }}
                  />
                  {searchTerm && (
                    <button 
                        onClick={()=>{setSearchTerm(""); setPage(1)}}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                    >
                        ✕
                    </button>
                  )}
              </div>

              <div className="flex space-x-2 items-center text-sm hidden md:flex">
                <span>Page Limit:</span>
                <select
                  className="border px-2 cursor-pointer py-1 border-gray-700 rounded-md"
                  value={limit}
                  onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>
              </div>
          </div>
        </div>

        {/* Removed Date Picker UI */}

        {loading ? (
          <div className="flex justify-center py-10">Loading...</div>
        ) : orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Time / Package</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Instructor / Type</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 min-w-40">
                      {order?.user?.firstName} {order?.user?.lastName}
                    </td>
                    <td className="px-4 py-2 max-w-[150px] truncate text-ellipsis whitespace-nowrap overflow-hidden ">
                      {order?.user?.email}
                    </td>
                    <td className="px-4 py-2">
                        {order?.product?.time || order?.membershipPackage?.packageName}
                    </td>
                    <td className="px-4 py-2">
                        {order?.product ? order?.product?.location : order?.user?.memberShipPlan?.location || "N/A"}
                    </td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      {order?.product ? (
                        <>
                          <img
                            src={order?.product?.instructor?.image?.secureUrl}
                            alt="Instructor"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          {order?.product?.instructor?.name}
                        </>
                      ) : (
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded capitalize">
                          {order?.orderType || "Membership"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          order?.status === "scheduled" || order?.status === "active"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {order?.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
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
            No orders found for selected date.
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

        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl shadow-2xl p-6 sm:p-8 w-[90%] max-w-3xl relative max-h-[90vh] overflow-y-auto transition-all duration-300">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-700 cursor-pointer transition"
              >
                ✕
              </button>

              {/* DETAILS FOR CLASS BOOKING */}
              {selectedOrder.product ? (
                <>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-6 mb-1">
                    {selectedOrder.product.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    📅{" "}
                    <strong>
                      {new Date(selectedOrder.scheduledDate).toLocaleDateString()}
                    </strong>
                  </p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
                    <p><strong>🕒 Time:</strong> {selectedOrder.product.time}</p>
                    <p><strong>⏱ Duration:</strong> {selectedOrder.product.duration}</p>
                    <p><strong>📍 Location:</strong> {selectedOrder.product.location}</p>
                    <p><strong>📅 Weekdays:</strong> {selectedOrder.product.weeks.join(", ")}</p>
                    <p><strong>👥 Enrolled:</strong> {selectedOrder.product.enrolledCount} / {selectedOrder.product.capacity}</p>
                    <p><strong>📌 Status:</strong> {selectedOrder.status}</p>
                    <p><strong>✅ Availability:</strong> {selectedOrder.product.available ? "Available" : "Unavailable"}</p>
                  </div>

                  <hr className="my-5 border-gray-300" />

                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={selectedOrder.product.instructor.image.secureUrl}
                      alt="Instructor"
                      className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
                    />
                    <p><strong>Instructor:</strong> {selectedOrder.product.instructor.name}</p>
                  </div>

                  <div
                    className="bg-blue-50 p-3 rounded-md text-sm text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: selectedOrder.product.description,
                    }}
                  />
                </>
              ) : (
                /* DETAILS FOR MEMBERSHIP/DISCOVERY */
                <>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-6 mb-1">
                    {selectedOrder.membershipPackage?.packageName || "Membership Details"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    📅{" "}
                    <strong>
                        Action Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}
                    </strong>
                  </p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
                    <p><strong>🆔 Type:</strong> {selectedOrder.orderType.toUpperCase()}</p>
                    <p><strong>📍 Location:</strong> {selectedOrder.user.memberShipPlan?.location || "N/A"}</p>
                    <p><strong>📌 Status:</strong> {selectedOrder.status}</p>
                    <p><strong>💳 Transaction ID:</strong> {selectedOrder.transactionId || "N/A"}</p>
                    {selectedOrder.amount > 0 && (
                        <p><strong>💰 Amount:</strong> ₹{selectedOrder.amount}</p>
                    )}
                  </div>
                  
                  {selectedOrder.membershipPackage && (
                      <div className="mt-4 bg-gray-50 p-4 rounded-md">
                          <h4 className="font-semibold mb-2">Package Details</h4>
                          <p><strong>Sessions:</strong> {selectedOrder.membershipPackage.totalSessions}</p>
                          <p><strong>Validity:</strong> {selectedOrder.membershipPackage.validity} Weeks</p>
                          <p><strong>Description:</strong> {selectedOrder.membershipPackage.description}</p>
                      </div>
                  )}
                </>
              )}

              <hr className="my-5 border-gray-300" />

              <div className="text-sm text-gray-700 space-y-1">
                <h3 className="font-semibold text-blue-600 underline">
                  👤 Ordered By
                </h3>
                <p>
                  <strong>Name:</strong> {selectedOrder.user.firstName}{" "}
                  {selectedOrder.user.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrder.user.email}
                </p>
              </div>

              {/* Membership Info (Global for User) */}
              <div className="mt-4 text-sm text-gray-700 space-y-1">
                <h3 className="font-semibold text-blue-600">
                  🏷 Current Membership Status
                </h3>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedOrder.user.memberShipPlan?.status || "N/A"}
                </p>
                {selectedOrder.user.memberShipPlan?.registrationDate && (
                    <p>
                    <strong>Registered On:</strong>{" "}
                    {new Date(
                        selectedOrder.user.memberShipPlan.registrationDate
                    ).toLocaleDateString()}
                    </p>
                )}
                {selectedOrder.user.memberShipPlan?.expiryDate && (
                    <p>
                    <strong>Expires On:</strong>{" "}
                    {new Date(
                        selectedOrder.user.memberShipPlan.expiryDate
                    ).toLocaleDateString()}
                    </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default AllOrders;
