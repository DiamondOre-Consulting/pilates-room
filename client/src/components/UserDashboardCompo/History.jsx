import { getOrderData } from "@/Redux/Slices/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const History = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const dispatch = useDispatch();
  const handleGetAllHistory = async () => {
    try {
      const response = await dispatch(getOrderData());
      console.log("daaaaaate", response);
      setOrderHistory(response?.payload?.data);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    handleGetAllHistory();
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3">Class Title</th>
              <th className="px-6 py-3">Instructor</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orderHistory?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No history found
                </td>
              </tr>
            ) : (
              orderHistory?.map((o) => {
                const { product, status, scheduledDate, _id } = o;
                const sched = new Date(scheduledDate);
                return (
                  <tr
                    key={_id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium">{product?.title}</td>
                    <td className="px-6 py-4">{product?.instructor?.name}</td>
                    <td className="px-6 py-4">
                      {sched.toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4">{product?.time}</td>
                    <td className="px-6 py-4 capitalize">{status}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
