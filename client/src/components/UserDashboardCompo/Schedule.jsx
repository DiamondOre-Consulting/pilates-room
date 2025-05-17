import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScheduleClass } from "@/Redux/Slices/authSlice";
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
      console.log(error);
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
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(null);
    }
  };

  const getTodayDate = () => {
    return new Date().getDate();
  };

  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded">
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

                const scheduledDate = new Date(item?.scheduledDate);
                const isToday =
                  scheduledDate.getDate() === getTodayDate() &&
                  scheduledDate.getMonth() === new Date().getMonth() &&
                  scheduledDate.getFullYear() === new Date().getFullYear();

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
                        className={`text-xs px-3 py-1 rounded bg-red-400 text-white`}
                        disabled={
                          loader === product._id || item.status === "cancelled"
                        }
                      >
                        {loader === product._id ? "…" : "Cancel"}
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {isToday &&
                        item?.status !== "cancelled" &&
                        <Counter scheduledDateTime={product?.time} />}
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
