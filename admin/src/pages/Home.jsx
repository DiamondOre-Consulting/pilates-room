import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
// import { useGetProductsQuery } from '@/Redux/api/productApi';
// import { useGetCouponsQuery } from '@/Redux/api/couponApi';
import { HomeLayout } from "@/Layout/HomeLayout";
import { useDispatch } from "react-redux";
import { dashboardStats } from "@/Redux/Slices/adminSlice";

const StatCard = ({ title, value, icon: Icon, change, isPositive, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-sm p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </motion.div>
);

// const RecentActivity = ({items , title , color , Icon}) => {
// return( <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     className="bg-white rounded-xl shadow-sm p-6"
//   >
//     <div className="flex items-center justify-between mb-4">
//       <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//       <Link to="#" className="text-sm text-[#DD7003] hover:text-[#c66502]">
//         View all
//       </Link>
//     </div>
//     <div className="space-y-4">
//       {items?.map((item, index) => (
//         <div key={index} className="flex items-center gap-4">
//           <div className={`p-2 rounded-full ${color}`}>
//             <Icon className="h-4 w-4 text-white" />
//           </div>
//           <div className="flex-1">
//             <p className="text-sm font-medium text-gray-900">{item?.user?.firstName}</p>
//             <p className="text-xs text-gray-500">{item?.time}</p>
//           </div>
//           {item?.status && (
//             <span
//               className={`px-2 py-1 text-xs rounded-full ${
//                 item.status === "completed"
//                   ? "bg-green-100 text-green-800"
//                   : item.status === "pending"
//                   ? "bg-yellow-100 text-yellow-800"
//                   : "bg-red-100 text-red-800"
//               }`}
//             >
//               {item?.status}
//             </span>
//           )}
//         </div>
//       ))}
//     </div>
//   </motion.div>)
// }

const Home = () => {
  const [statesData, setStateData] = useState(null);
  const dispatch = useDispatch();

  const handleGetStats = async () => {
    try {
      const response = await dispatch(dashboardStats());
      console.log("dataaaaaaa", response);
      setStateData(response?.payload?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetStats();
  }, []);

  const recentOrders = [
    {
      id: 1,
      title: "Order #12345",
      time: "2 hours ago",
      status: "completed",
      amount: "₹1,299",
    },
    {
      id: 2,
      title: "Order #12344",
      time: "3 hours ago",
      status: "pending",
      amount: "₹899",
    },
    {
      id: 3,
      title: "Order #12343",
      time: "5 hours ago",
      status: "completed",
      amount: "₹2,499",
    },
  ];

  // Mock data for recent customers (replace with actual API call)
  const recentCustomers = [
    {
      id: 1,
      name: "John Doe",
      time: "1 hour ago",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      time: "2 hours ago",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      time: "3 hours ago",
      status: "active",
    },
  ];

  return (
    <HomeLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Users"
            value={statesData?.statistics?.totalUsers}
            icon={Users}
            // icon={DollarSign}
            change="12.5"
            isPositive={true}
            color="bg-green-500"
          />
          <StatCard
            title="Total Discovery Members"
            value={statesData?.statistics?.discoveryMembers}
            icon={Users}
            change="8.2"
            isPositive={true}
            color="bg-blue-500"
          />

          <StatCard
            title="Total Members"
            value={statesData?.statistics?.totalMembersCount}
            icon={Users}
            change="3.1"
            isPositive={true}
            color="bg-purple-500"
          />
          <StatCard
            title="Active Members"
            value={statesData?.statistics?.activeMembers}
            icon={Users}
            change="-2.4"
            isPositive={false}
            color="bg-orange-500"
          />
        </div>

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Classes
              </h3>
              <Link
                to={"/orders"}
                className="text-sm text-[#DD7003] hover:text-[#c66502]"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {statesData?.recentOrders?.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`p-2 rounded-full bg-green-500`}>
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item?.user?.firstName} {item?.user?.lastName}{" "}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item?.scheduledDate.split("T")[0]} <br></br>{" "}
                      {item?.product?.time}
                    </p>
                  </div>
                  {item?.status && (
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item?.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : item?.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                          ? item?.status === "scheduled"
                          : "bg-green-200 text-green-800"
                          ? item?.status === "cancelled"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {item?.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Members
              </h3>
              <Link
                to="/all-users"
                className="text-sm text-[#DD7003] hover:text-[#c66502]"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {statesData?.recentMembers?.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`p-2 rounded-full bg-green-500`}>
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item?.firstName} {item?.lastName}{" "}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item?.email} <br></br> {item?.product?.time}
                    </p>
                  </div>
                  {item?.membershipStatus && (
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.membershipStatus === "active"
                          ? "bg-green-100 text-green-800"
                          : item.membershipStatus === "pending"
                          ? item?.membershipStatus === "expired"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {item?.membershipStatus}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/all-class"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Package className="h-5 w-5 text-[#DD7003]" />
              <span className="text-sm font-medium text-gray-900">
                Add New Class
              </span>
            </Link>
            <Link
              to="/orders"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <TrendingUp className="h-5 w-5 text-[#DD7003]" />
              <span className="text-sm font-medium text-gray-900">
                View Bookings
              </span>
            </Link>
            <Link
              to="/all-users"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Clock className="h-5 w-5 text-[#DD7003]" />
              <span className="text-sm font-medium text-gray-900">
                View Users
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </HomeLayout>
  );
};

export default Home;
