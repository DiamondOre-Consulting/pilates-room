import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Passes = ({ setUserDashboardPopUp }) => {
  const { isLoggedIn, user } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  return (
    <div>
      {!user?.data?.isDiscovery ? (
        <div className="space-y-2 text-center">
          <p className="text-gray-700 text-lg mb-6">
            You don’t have a Discovery pack yet. Try a session first!
          </p>
          <button
            onClick={() => {
              setUserDashboardPopUp(false);

              navigate("/membership");
            }}
            className="px-4 py-2 rounded bg-dark text-white"
          >
            Buy Discovery Pack
          </button>
        </div>
      ) : !user?.data?.isMember ? (
        <div className="space-y-2 text-center">
          <p className="text-gray-700 text-lg mb-6">
            No membership package found.
          </p>
          <button
            onClick={() => {
              setUserDashboardPopUp(false);
              navigate("/membership");
            }}
            className="px-4 py-2 rounded bg-dark text-white"
          >
            Buy Membership
          </button>
        </div>
      ) : (
        <div className="max-w-md mx-auto p-4">
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="bg-dark dark:bg-indigo-700 p-6 rounded-t-2xl text-white text-center">
              <h2 className="text-4xl font-bold">
                {user?.data?.memberShipPlan?.package?.packageName ||
                  "Plan Name"}
              </h2>
              <div className="mt-2 flex justify-center items-baseline space-x-1 text-xl font-semibold">
                <span>₹</span>
                <span>
                  {user?.data?.memberShipPlan?.package?.perSessionPrice || "0"}
                </span>
                <span className="text-sm font-normal">/ Week</span>
              </div>
            </div>

            <div className="p-6 space-y-3 text-gray-700 dark:text-gray-300 text-base">
              <p>
                <span className="font-semibold">Price:</span> ₹
                {user?.data?.memberShipPlan?.package?.price || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Validity:</span>{" "}
                {user?.data?.memberShipPlan?.package?.validity || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {user?.data?.memberShipPlan?.package?.location || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Total Sessions:</span>{" "}
                {user?.data?.memberShipPlan?.package?.totalSessions || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Remaining Sessions:</span>{" "}
                {user?.data?.memberShipPlan?.remainingSession || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Registered:</span>{" "}
                {user?.data?.memberShipPlan?.registrationDate
                  ? new Date(
                      user?.data?.memberShipPlan.registrationDate
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <span className="font-semibold">Expires:</span>{" "}
                {user?.data?.memberShipPlan?.expiryDate
                  ? new Date(
                      user?.data?.memberShipPlan.expiryDate
                    ).toLocaleDateString()
                  : "N/A"}
              </p>

              <div
                className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html:
                    user?.data?.memberShipPlan?.package?.description || "",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Passes;
