import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HomeLayout } from "@/Layout/HomeLayout";
import { getAllUsers } from "@/Redux/Slices/adminSlice";
import {
  X,
  Mail,
  CalendarCheck,
  BadgeCheck,
  UserCheck,
  UserX,
} from "lucide-react";

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

  const handleGetAllUsers = async () => {
    setLoading(true);
    const response = await dispatch(getAllUsers());
    console.log("response of all users", response);
    if (response?.payload?.success) {
      setUsers(response.payload?.data);
      setTotalPages(response.payload?.data?.pagination?.totalPages);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetAllUsers();
  }, [page, limit]);

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  console.log(selectedUser);

  return (
    <HomeLayout>
      <div>
        <div className="flex justify-between py-2">
          <div className="flex flex-col">
            <h1 className="text-2xl">All Users</h1>
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
                {users.map((user, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 min-w-40">
                      {user?.firstName} {user?.lastName}{" "}
                    </td>
                    <td className="px-4 py-2">{user?.email}</td>
                    <td className="px-4 py-2">
                      {user?.createdAt.split("T")[0]}
                    </td>
                    <td className="px-4 py-2">
                      {user?.isDiscovery ? "True" : "False"}
                    </td>
                    <td className="px-4 py-2">
                      {user?.isMember ? "True" : "False"}
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
                    {new Date(
                      selectedUser.memberShipPlan.startDate
                    ).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Expiry Date:</strong>{" "}
                    {new Date(
                      selectedUser.memberShipPlan.expiryDate
                    ).toLocaleDateString()}
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
    </HomeLayout>
  );
};

export default AllUsers;
