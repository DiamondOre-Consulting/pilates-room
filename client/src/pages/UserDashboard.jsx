import React, { useEffect, useState } from "react";
import logo from "../assets/TPR-Logo.webp";
import {
  BoxIcon,
  ChartLine,
  HouseIcon,
  PanelsTopLeftIcon,
  SettingsIcon,
  UsersRoundIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountDetails from "@/components/UserDashboardCompo/AccountDetails";
import { useDispatch, useSelector } from "react-redux";
import { getOrderData, logout, userData } from "@/Redux/Slices/authSlice";
import History from "@/components/UserDashboardCompo/History";
import Schedule from "@/components/UserDashboardCompo/Schedule";
import Passes from "@/components/UserDashboardCompo/Passes";
import { IconLogout } from "@tabler/icons-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dashpoardPopUp, setDashboardPopUp] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state?.auth);

  const handleLogout = () => {
    // Clear everything immediately
    localStorage.clear();
    sessionStorage.clear();

    // Dispatch logout without waiting
    dispatch(logout());

    // Force reload the page
    window.location.href = '/';
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-3 ">
        <img src={logo} alt="" className="w-40" />

        <div className="border-gray-600 border-y py-2 mt-4 flex  w-full justify-between">
          <p className="uppercase">Your Account</p>
          <div className="flex space-x-4">
            <svg
              className="text-gray-600"
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
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
          
          </div>
        </div>
      </div>

      <Tabs defaultValue="tab-1" className="w-full h-[60vh] overflow-y-auto">
        <ScrollArea className="fixed">
          <TabsList className="text-foreground cursor-pointer mb-3 h-auto flex  justify-between w-full rounded-none border-b bg-transparent px-0 py-1">
            <TabsTrigger
              value="tab-1"
              className="hover:bg-accent cursor-pointer w-full  hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <HouseIcon
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="tab-2"
              className="hover:bg-accent w-full cursor-pointer hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <PanelsTopLeftIcon
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              History
              {/* <Badge
                className="bg-primary/15 ms-1.5 min-w-5 px-1"
                variant="secondary"
              >
                3
              </Badge> */}
            </TabsTrigger>
            <TabsTrigger
              value="tab-3"
              className="hover:bg-accent cursor-pointer w-full hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <BoxIcon
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Passes
              {/* <Badge className="ms-1.5">New</Badge> */}
            </TabsTrigger>
            <TabsTrigger
              value="tab-4"
              className="hover:bg-accent w-full cursor-pointer  hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <UsersRoundIcon
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              AccountInfo
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="tab-1">
          <p className="text-muted-foreground pt-1 text-center text-xs ">
            <Schedule />
          </p>
        </TabsContent>
        <TabsContent value="tab-2">
          <p className="text-muted-foreground pt-1 text-center text-xs">
            <History />
          </p>
        </TabsContent>
        <TabsContent value="tab-3">
          <p className="text-muted-foreground pt-1 text-center text-xs">
            <Passes />
          </p>
        </TabsContent>
        <TabsContent value="tab-4">
          <p className="text-muted-foreground pt-1 ">
            <AccountDetails />
          </p>
        </TabsContent>
      </Tabs>

      {!isLoggedIn && !dashpoardPopUp && (
        <UserDashboard onClose={() => setDashboardPopUp(false)} />
      )}
    </>
  );
};

export default UserDashboard;
