import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import BeatLoader from "react-spinners/BeatLoader";
import { HomeLayout } from "@/Layout/HomeLayout";
import { getAllOrders } from "@/Redux/Slices/orderSlice";

const AllOrders = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleGetAllOrders = async () => {
    setLoading(true);
    let formattedDate;
    if (date) {
      formattedDate = date.toISOString().split("T")[0];
    }
    const response = await dispatch(
      getAllOrders({ page, limit, date: formattedDate })
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
  }, [page, limit, date]);

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setPage(1);
    setShowCalendar(false);
  };
  return (
    <HomeLayout>
      <div>
        <div className="flex justify-between py-2">
          <div className="flex flex-col">
            <h1 className="text-2xl">All Bookings</h1>
            <div className="w-20 h-1 bg-black"></div>
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

        <div className="my-4 relative">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="border px-4 py-2 rounded bg-black text-white"
          >
            Select Date
          </button>
          {showCalendar && (
            <div className="absolute z-10 mt-2">
              <Calendar onChange={handleDateChange} value={date} />
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-10">Loading...</div>
        ) : orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Instructor</th>
                  <th className="px-4 py-2">status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 min-w-40">
                      {order?.user?.firstName} {order?.user?.lastName}
                    </td>
                    <td className="px-4 py-2">{order?.user?.email}</td>
                    <td className="px-4 py-2">{order?.product?.time}</td>
                    <td className="px-4 py-2">{order?.product?.location}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <img
                        src={order?.product?.instructor?.image?.secureUrl}
                        alt="Instructor"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      {order?.product?.instructor?.name}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          order?.status === "scheduled"
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

              {/* Class Title & Date */}
              <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-6 mb-1">
                {selectedOrder.product.title}
              </h2>
              <p className="text-sm text-gray-600">
                📅{" "}
                <strong>
                  {new Date(selectedOrder.scheduledDate).toLocaleDateString()}
                </strong>
              </p>

              {/* Session Info */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
                <p>
                  <strong>🕒 Time:</strong> {selectedOrder.product.time}
                </p>
                <p>
                  <strong>⏱ Duration:</strong> {selectedOrder.product.duration}
                </p>
                <p>
                  <strong>📍 Location:</strong> {selectedOrder.product.location}
                </p>
                <p>
                  <strong>📅 Weekdays:</strong>{" "}
                  {selectedOrder.product.weeks.join(", ")}
                </p>
                <p>
                  <strong>👥 Enrolled:</strong>{" "}
                  {selectedOrder.product.enrolledCount} /{" "}
                  {selectedOrder.product.capacity}
                </p>
                <p>
                  <strong>📌 Status:</strong> {selectedOrder.status}
                </p>
                <p>
                  <strong>✅ Availability:</strong>{" "}
                  {selectedOrder.product.available
                    ? "Available"
                    : "Unavailable"}
                </p>
              </div>

              <hr className="my-5 border-gray-300" />

              <div className="flex items-center gap-4 mb-3">
                <img
                  src={selectedOrder.product.instructor.image.secureUrl}
                  alt="Instructor"
                  className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
                />
                <p>
                  <strong>Instructor:</strong>{" "}
                  {selectedOrder.product.instructor.name}
                </p>
              </div>

              <div
                className="bg-blue-50 p-3 rounded-md text-sm text-gray-800"
                dangerouslySetInnerHTML={{
                  __html: selectedOrder.product.description,
                }}
              />

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

              {/* Membership Info */}
              <div className="mt-4 text-sm text-gray-700 space-y-1">
                <h3 className="font-semibold text-blue-600">
                  🏷 Membership Details
                </h3>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedOrder.user.memberShipPlan.status}
                </p>
                <p>
                  <strong>Registered On:</strong>{" "}
                  {new Date(
                    selectedOrder.user.memberShipPlan.registrationDate
                  ).toLocaleDateString()}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(
                    selectedOrder.user.memberShipPlan.startDate
                  ).toLocaleDateString()}
                </p>
                <p>
                  <strong>Expires On:</strong>{" "}
                  {new Date(
                    selectedOrder.user.memberShipPlan.expiryDate
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default AllOrders;
