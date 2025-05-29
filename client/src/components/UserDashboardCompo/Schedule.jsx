import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScheduleClass, userData } from "@/Redux/Slices/authSlice";
import { cancelOrder } from "@/Redux/Slices/paymentSlice";
import Counter from "../Counter";

const Schedule = () => {
  const [scheduleClass, setSchedulClass] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleGetAllSchedule = async () => {
    try {
      const response = await dispatch(getScheduleClass());
      console.log("Schedule data:", response);
      setSchedulClass(response?.payload?.data || []);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    handleGetAllSchedule();
  }, []);

  const handleCancelOrder = async (orderId, classId) => {
    try {
      setLoader(classId);
      const response = await dispatch(cancelOrder(orderId));
      if (response?.payload?.statusCode) {
        await handleGetAllSchedule();
        await dispatch(userData());
      }
    } catch (error) {
      return;
    } finally {
      setLoader(null);
    }
  };

  const getTodayDate = () => {
    return new Date().getDate();
  };

  const toUtcMidnightIso = (d) =>
    new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
    ).toISOString();

  const getToday = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()); // midnight today
  };

  return (
    <div className="">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[1000px] w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Instructor</th>
              <th className="py-2 px-4 border-b">Class Title</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Duration</th>
              <th className="py-2 px-4 border-b">Scheduled Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Action</th>
              <th className="py-2 px-4 border-b">Starts In</th>
            </tr>
          </thead>
          <tbody>
            {scheduleClass.length > 0 ? (
              scheduleClass.map((entry) => {
                const item = entry.item;
                const product = item?.product;
                const instructor = product?.instructor;
                const today = getToday();
                const scheduledDate = new Date(item?.scheduledDate);
                const isToday =
                  scheduledDate.getDate() === getTodayDate() &&
                  scheduledDate.getMonth() === new Date().getMonth() &&
                  scheduledDate.getFullYear() === new Date().getFullYear();
                const diffTime = scheduledDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return (
                  <tr key={entry._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b flex items-center gap-2">
                      <img
                        src={instructor?.image?.secureUrl}
                        alt={instructor?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span>{instructor?.name}</span>
                    </td>
                    <td className="py-2 px-4 border-b">{product?.title}</td>
                    <td className="py-2 px-4 border-b">{product?.location}</td>
                    <td className="py-2 px-4 border-b">{product?.time}</td>
                    <td className="py-2 px-4 border-b">{product?.duration}</td>
                    <td className="py-2 px-4 border-b">
                      {item?.scheduledDate?.split("T")[0]}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 text-xs rounded`}>
                        {item?.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={() => handleCancelOrder(item._id, product._id)}
                        className={`text-xs px-3 py-1 rounded cursor-pointer bg-red-600 disabled:opacity-30 text-white`}
                        disabled={
                          loader === product?._id ||
                          item?.status === "cancelled" ||
                          isToday
                        }
                      >
                        {loader === product?._id ? "…" : "Cancel"}
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b text-red-800 text-center">
                      {isToday && item.status !== "cancelled" ? (
                        <Counter scheduledDateTime={product?.time} />
                      ) : diffDays > 0 ? (
                        `${diffDays} day${diffDays > 1 ? "s" : ""} left`
                      ) : (
                        "Past"
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No scheduled classes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
