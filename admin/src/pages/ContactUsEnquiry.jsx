import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HomeLayout } from "@/Layout/HomeLayout";
import { getAdapter } from "axios";
import { getEnquiryById, getEnquries } from "@/Redux/Slices/adminSlice";

const ContactUsEnquiry = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [contactEnquiry, setContactEnquiry] = useState([]);
  const [showMOdel, setShowModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleGetAllContactEnquiry = async () => {
    setLoading(true);

    const response = await dispatch(
      getEnquries({ page, limit, topic: "contactUs" })
    );

    console.log("response", response);
    if (response?.payload?.success) {
      setContactEnquiry(response?.payload?.data?.enquiries);

      setTotalPages(response.payload?.data?.totalPages);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetAllContactEnquiry();
  }, [page, limit]);

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  console.log("contact Enqueriessssss", contactEnquiry);

  const handleGetEnquiryById = async (id) => {
    try {
      const response = await dispatch(getEnquiryById(id));
      console.log("responseee", response);
      setSelectedUser(response?.payload?.data);
      setShowModel(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HomeLayout>
      <div>
        <div className="flex md:flex-row flex-col md:gap-y-0 gap-y-2 justify-between py-2">
          <div className="flex flex-col">
            <h1 className="text-2xl">All Contact Enquiries</h1>
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

        {loading ? (
          <div className="flex justify-center py-10">Loading...</div>
        ) : contactEnquiry?.length > 0 ? (
          <div className="overflow-x-auto mt-4">
            <table className="w-full table-auto border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>

                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {contactEnquiry.map((user, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 min-w-40">{user?.name}</td>
                    <td className="px-4 py-2 overflow-hidden max-w-[150px] truncate text-ellipsis whitespace-nowrap overflow-hidden">
                      {user?.email}
                    </td>
                    <td className="px-4 py-2">+{user?.phone}</td>

                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleGetEnquiryById(user?._id)}
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
            No Contact found
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

      {showMOdel && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 relative">
            <button
              onClick={() => setShowModel(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex items-center space-x-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A8 8 0 1017.804 5.12M12 8v4l3 3"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800">
                User Details
              </h2>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <span className="font-medium">👤 Name:</span>
                <span>{selectedUser.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">📧 Email:</span>
                <span>{selectedUser.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">📞 Phone:</span>
                <span>{selectedUser.phone || "N/A"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">📝 Message:</span>
                <span>{selectedUser.message || "N/A"}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-medium">📅 Query On:</span>
                <span>{new Date(selectedUser.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </HomeLayout>
  );
};

export default ContactUsEnquiry;
