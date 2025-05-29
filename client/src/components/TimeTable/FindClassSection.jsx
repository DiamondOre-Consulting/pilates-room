import { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiCalendar } from "react-icons/fi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses } from "@/Redux/Slices/classSlice";
import { AlertTriangle } from "lucide-react";
import userAxiosInstance from "@/Helper/axiosInstance";
import {
  cancelOrder,
  createOrderForClassBooking,
} from "@/Redux/Slices/paymentSlice";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { userData } from "@/Redux/Slices/authSlice";
import SignIn from "@/pages/SignIn";
import Signup from "@/pages/Signup";
import Counter from "../Counter";
import { toast } from "sonner";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const FindClassSection = () => {
  const [allClasses, setAllClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [wrongPackageclassBookingPopup , setWrongPackageClassBookingPopUp] = useState(false)

  const handleGetAllClasses = async () => {
    try {
      console.log(page, limit);
      console.log(selectedDate);
      let utcDate = null;

      if (selectedDate) {
        const year = selectedDate.getFullYear();
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
        const day = selectedDate.getDate().toString().padStart(2, "0");
        utcDate = `${year}-${month}-${day}`;
      }

      console.log("week start date ", weekStartDate);
      const selectedWeek = selectedDate
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();
      console.log(
        "selected date weekday:",
        selectedDate
          .toLocaleDateString("en-US", { weekday: "long" })
          .toLowerCase()
      );
      console.log("selted week", selectedWeek);
      const response = await dispatch(
        getAllClasses({ week: selectedWeek, page, limit, location })
      );
      console.log(response);
      setAllClasses(response?.payload?.data?.classes);
      setTotalPages(response?.payload?.data?.totalPages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [weekStartDate, setWeekStartDate] = useState(getStartOfWeek(today));
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const calendarRef = useRef();

  function getStartOfWeek(date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - start.getDay());
    return start;
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowFullCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      if (calendarRef.current) {
        const rect = calendarRef.current.getBoundingClientRect();
        const overflowRight = rect.right > window.innerWidth;
        const overflowBottom = rect.bottom > window.innerHeight;

        if (overflowRight || overflowBottom) {
          calendarRef.current.style.left = overflowRight
            ? `-${rect.right - window.innerWidth + 16}px`
            : "0px";

          calendarRef.current.style.top = overflowBottom
            ? `-${rect.bottom - window.innerHeight + 16}px`
            : "100%";
        }
      }
    }
    if (showFullCalendar) {
      setTimeout(handleResize, 0);
    }
  }, [showFullCalendar]);

  useEffect(() => {
    const currentWeekStart = getStartOfWeek(today).getTime();
    const selectedWeekStart = getStartOfWeek(weekStartDate).getTime();
    setIsCurrentWeek(currentWeekStart === selectedWeekStart);
  }, [weekStartDate]);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStartDate.getTime());
    date.setDate(date.getDate() + i);
    return date;
  });

  const isToday = (date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isBeforeToday = (date) => {
    const compareDate = new Date();
    compareDate.setHours(0, 0, 0, 0);
    return date < compareDate;
  };

  const isSelected = (date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const changeWeek = (direction) => {
    const newStart = new Date(weekStartDate);
    newStart.setDate(weekStartDate.getDate() + direction * 7);
    setWeekStartDate(newStart);
  };

  useEffect(() => {
    handleGetAllClasses();
  }, [selectedDate, location, selectedDate]);

  console.log("asdfghjkl", selectedDate);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [membershipErrorPopup, setMembershipErrorPopup] = useState(false);

  const [loader, setLoader] = useState(null);

  const handleCreateOrder = async (classId) => {
    try {
      const toUtcMidnightIso = (d) =>
        new Date(
          Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
        ).toISOString();

      const isoDate = toUtcMidnightIso(selectedDate);
      console.log("selected dateeeeeeeeeee", isoDate);
      setLoader(classId);

      const payload = {
        classId,
        date: isoDate,
      };
      console.log("clickkkkkkked", classId, selectedDate);
      const response = await dispatch(createOrderForClassBooking(payload));

      if (response?.payload?.success) {
        setConfirmationPopUp(true);
        setLoader(false);
        await dispatch(userData());
      } else if (response?.payload?.status === 400) {
        setMembershipErrorPopup(true);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.statusCode === 400) {
        setMembershipErrorPopup(true);
      }
    } finally {
      setLoader(false);
      await dispatch(userData());
    }
  };

  console.log("first1", new Date().toISOString().split("-")[2].split("T")[0]);

  console.log("first", selectedDate.toISOString());

  const handleCancelOrder = async (orderId, classId) => {
    try {
      setLoader(classId);
      const response = await dispatch(cancelOrder(orderId));
      console.log(response);
      if (response?.payload?.statusCode) {
        setLoader(false);
        await handleGetAllClasses();
        await dispatch(userData());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  // const getTodayDate = () => {
  //   console.log(new Date().getDate());
  //   return new Date()
  // };

  const getTodayDate = () => {
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    console.log("today dateeeee", todayDate);
    return todayDate;
  };

  console.log(getTodayDate());

  const isExpiredToday = (timeStr, selectedDate) => {
    if (!timeStr) return false;

    const match = timeStr
      .trim()
      .toUpperCase()
      .match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/);

    if (!match) return false;

    let [, hStr, mStr, sStr, mer] = match;
    let hour = Number(hStr);
    const min = Number(mStr);
    const sec = Number(sStr ?? 0);

    if (mer === "PM" && hour !== 12) hour += 12;
    if (mer === "AM" && hour === 12) hour = 0;

    const start = new Date(selectedDate);
    start.setHours(hour, min, sec, 0);

    const now = new Date();
    const sameDay =
      now.getFullYear() === start.getFullYear() &&
      now.getMonth() === start.getMonth() &&
      now.getDate() === start.getDate();

    return sameDay && now >= start;
  };

  // test
  console.log(isExpiredToday("10:00"));

  const [allReadySchedulePopUp, setAllReadySchedulePopUp] = useState(false);
  const [expiredPopUP, setExpiredPopUp] = useState(false);

  const toUtcMidnightIso = (d) =>
    new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
    ).toISOString();

  const isoDate = toUtcMidnightIso(selectedDate);
  // console.log("selected dateeeeeeeeeee",isoDate)

  const isBookingClosed = (classTime) => {
    if (!classTime) return false;
    console.log(classTime);
    const [time, modifier] = classTime.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (modifier === "PM" && h < 12) h += 12;
    if (modifier === "AM" && h === 12) h = 0;

    const start = new Date();
    start.setHours(h, m, 0, 0);
    const now = new Date();
    const diffMs = start - now;
    return diffMs <= 0 || diffMs < 60 * 60 * 1000;
  };

  console.log(isBookingClosed("11:00 AM"));
  const hasStarted = (classTime, day) => {
    if (!classTime || !day) return false;

    // parse "10:00", "10:00 AM", "10:00 PM"
    const [time, meridiem] = classTime.trim().toUpperCase().split(/\s+/);
    let [h, m] = time.split(":").map(Number);
    if (meridiem === "PM" && h !== 12) h += 12;
    if (meridiem === "AM" && h === 12) h = 0;

    const start = new Date(day);
    start.setHours(h, m, 0, 0); // zero seconds & ms
    return Date.now() >= start.getTime();
  };

  console.log(new Date(selectedDate).getDate());
  console.log(new Date(getTodayDate()).getDate());
  console.log("selected date", toUtcMidnightIso(selectedDate).split("T")[0]);
  return (
    <div>
      <section className="py-10 px-4 md:px-10 ">
        <p className="text-gray-400 mr-0 mb-4 ">My Account</p>
        <div className="flex md:flex-row flex-col justify-between">
          <div>
            <h1 className="text-3xl">Find a Class</h1>
          </div>
          <div className="flex flex-col justify-end md:items-end ">
            <div className="flex space-x-1 md:space-x-6">
              <select
                onChange={(e) => setLocation(e.target?.value)}
                className="border rounded-md px-1 md:px-4 py-2 border-gray-300"
              >
                <option value={null}>Location</option>
                <option value={"faridabad"}>Faridabad</option>
                <option value={"gurugram"}>Gurugram</option>
              </select>

              {/* <select className="border rounded-md px-1  md:px-4 py-2 border-gray-300">
                <option>class Type</option>
              </select> */}
              {/* 
              <select className="border rounded-md px-1  md:px-4 py-2 border-gray-300">
                <option>Instructor</option>
              </select> */}
            </div>
          </div>
        </div>
      </section>

      <div className="p-4 max-w-5xl mx-auto w-full relative py-10">
        <div className="flex items-center justify-between mb-4 relative">
          <h2 className="text-xl font-bold">
            {weekStartDate.toLocaleString("default", { month: "long" })}
          </h2>
          <div className="relative">
            <button
              onClick={() => setShowFullCalendar(!showFullCalendar)}
              className="flex items-center gap-1 text-sm text-black"
            >
              <FiCalendar className="text-lg" /> Full Calendar
            </button>
            {showFullCalendar && (
              <div
                ref={calendarRef}
                className="absolute left-0 top-full mt-2 z-50 bg-white shadow-lg border border-gray-200 rounded-2xl p-6 w-[350px]"
                style={{ maxHeight: "calc(100vh - 100px)", overflow: "auto" }}
              >
                <Calendar
                  onChange={(date) => {
                    setSelectedDate(date);
                    setWeekStartDate(getStartOfWeek(date));
                    setShowFullCalendar(false);
                  }}
                  value={selectedDate}
                  prevLabel={
                    <span className="text-xl font-bold text-gray-700">
                      &#x2039;
                    </span>
                  }
                  nextLabel={
                    <span className="text-xl font-bold text-gray-700">
                      &#x203A;
                    </span>
                  }
                  tileClassName={({ date }) =>
                    isSelected(date) ? "!bg-black text-white rounded-md" : ""
                  }
                  className="react-calendar border-none text-sm"
                />

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setShowFullCalendar(false)}
                    className="px-4 py-2 border border-gray-400 text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowFullCalendar(false)}
                    className="px-4 py-2 bg-[#002c3e] text-white rounded-lg hover:bg-[#00405c]"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full overflow-x-auto pb-2">
          <div className="flex w-full items-center space-x-2 justify-between">
            <button
              onClick={() => changeWeek(-1)}
              disabled={isCurrentWeek}
              className={`mb-1 flex items-center justify-center size-6 sm:size-8 md:size-10 rounded-lg shrink-0 transition-all ${
                isCurrentWeek
                  ? " text-gray-400 cursor-not-allowed"
                  : " hover:text-gray-800 "
              }`}
            >
              <FiChevronLeft className="text-xl" />
            </button>

            {dates.map((date, i) => {
              const isDisabled = isBeforeToday(date);
              return (
                <div
                  key={i}
                  className="flex items-center justify-center flex-col"
                >
                  <p
                    className={`text-sm uppercase mb-1 font-semibold ${
                      isDisabled ? "text-gray-300" : "text-[#00354C]"
                    }`}
                  >
                    {isToday(date) ? "Tod" : daysOfWeek[date.getDay()]}
                  </p>
                  <div
                    onClick={() => {
                      if (!isDisabled) setSelectedDate(date);
                    }}
                    className={`flex flex-col items-center justify-center size-8 sm:size-10 md:size-14 rounded-full border transition-all shrink-0 cursor-pointer
                  ${isToday(date) ? "" : "border-gray-300"}
                  ${isSelected(date) ? "bg-[#00354C] text-white" : ""}
                  ${
                    isDisabled
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-[#00354C]/20"
                  }`}
                  >
                    <span className="text-md font-semibold">
                      {date.getDate()}
                    </span>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => changeWeek(1)}
              className="text-gray-800 mb-1 flex items-center justify-center size-6 sm:size-8 md:size-10  rounded-lg  hover:text-gray-200  shrink-0"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        <div className="mt-6  text-gray-700">
          <strong className="text-lg">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </strong>{" "}
          <span className="text-sm">
            All dates and times are displayed in GMT+1{" "}
          </span>
        </div>

        <div className="mt-10 space-y-6 w-full mx-auto">
          {allClasses?.length === 0 ? (
            <div className="text-center text-gray-500 text-lg font-medium py-10">
              No classes available for the selected date or location.
            </div>
          ) : (
            <>
              {allClasses?.map((cls, index) => (
                <div key={index} className="border-t w-full pt-6">
                  <div className="flex items-start w-full space-x-4 col-span-2">
                    <div className="min-w-[4rem]  flex flex-col items-center">
                      <div className="text-md font-semibold">{cls.time}</div>
                      <div className="text-sm font-semibold text-gray-500">
                        {cls.duration}
                      </div>
                      <img
                        src={cls.instructor?.image?.secureUrl}
                        alt="Instructor"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div className="grid w-full grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-2">
                        <div className="font-bold text-lg">{cls.title}</div>
                        <div className="text-sm text-gray-500">
                          {cls.instructor?.name}
                        </div>

                        <button
                          onClick={() =>
                            setExpandedCardIndex(
                              expandedCardIndex === index ? null : index
                            )
                          }
                          className="text-sm text-gray-500 font-medium mt-1 flex items-center gap-1"
                        >
                          Show Details
                          <svg
                            className={`transform transition-transform ${
                              expandedCardIndex === index ? "rotate-180" : ""
                            }`}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedCardIndex === index
                              ? "max-h-fit mt-2 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <p
                            className="text-sm text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html: cls.description,
                            }}
                          ></p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {cls.location}
                      </div>
                      <div className="text-xs text-red-500 mt-1">
                        {" "}
                        {cls?.capacity <= 10
                          ? `Only ${cls?.capacity} spot left!`
                          : ""}
                      </div>
                      <button
                        onClick={async () => {
                          try {
                            if (
                              isExpiredToday(
                                cls?.time,
                                toUtcMidnightIso(selectedDate)
                              ) ||
                              hasStarted(cls.time, selectedDate)
                            ) {
                              return;
                            }

                            if(user?.data?.isMember && cls?.location != user?.data?.memberShipPlan?.package?.location){
                              setWrongPackageClassBookingPopUp(true);
                              return
                            }

                            if (
                              cls?.capacity === 0 ||
                              cls.available === false
                            ) {
                              return;
                            }

                            if (!isLoggedIn) {
                              setIsPopUpOpen(true);
                              return;
                            }

                            if (
                              isBookingClosed(cls.time) &&
                              new Date(selectedDate).getDate() ===
                                new Date(getTodayDate()).getDate()
                            ) {
                              setShowModal(true);
                              return;
                            }

                            setLoader(cls?._id);

                            // Check for existing booking
                            const existingBooking =
                              user?.data?.upcomingSchedule?.find((s) => {
                                const scheduledDate = new Date(
                                  s?.item?.scheduledDate
                                );
                                const selectedDateObj = new Date(selectedDate);
                                return (
                                  s?.item?.product === cls?._id &&
                                  scheduledDate.getDate() ===
                                    selectedDateObj.getDate() &&
                                  scheduledDate.getMonth() ===
                                    selectedDateObj.getMonth() &&
                                  scheduledDate.getFullYear() ===
                                    selectedDateObj.getFullYear()
                                );
                              });

                            if (existingBooking) {
                              await handleCancelOrder(
                                existingBooking?.item?._id,
                                cls?._id
                              );
                            } else {
                              await handleCreateOrder(cls?._id);
                            }
                          } catch (error) {
                            console.error(
                              "Error handling button click:",
                              error
                            );
                            toast.error(
                              "Something went wrong. Please try again."
                            );
                          } finally {
                            setLoader(null);
                          }
                        }}
                        disabled={
                          loader === cls?._id ||
                          user?.data?.upcomingSchedule?.some((s) => {
                            const scheduledDate = new Date(
                              s?.item?.scheduledDate
                            );
                            const selectedDateObj = new Date(selectedDate);
                            return (
                              s?.item?.product === cls?._id &&
                              scheduledDate.getDate() ===
                                selectedDateObj.getDate() &&
                              scheduledDate.getMonth() ===
                                selectedDateObj.getMonth() &&
                              scheduledDate.getFullYear() ===
                                selectedDateObj.getFullYear() &&
                              scheduledDate.toISOString().split("T")[0] ===
                                getTodayDate()
                            );
                          })
                        }
                        className={`h-fit text-white w-full cursor-pointer md:w-full px-10 py-2 rounded-lg ${
                          cls?.capacity === 0 || !cls.available
                            ? "bg-gray-400"
                            : isExpiredToday(
                                cls?.time,
                                toUtcMidnightIso(selectedDate)
                              )
                            ? "bg-gray-600"
                            : hasStarted(cls.time, selectedDate)
                            ? "bg-gray-600"
                            : user?.data?.upcomingSchedule?.some((s) => {
                                const scheduledDate = new Date(
                                  s?.item?.scheduledDate
                                );
                                const selectedDateObj = new Date(selectedDate);
                                return (
                                  s?.item?.product === cls?._id &&
                                  scheduledDate.getDate() ===
                                    selectedDateObj.getDate() &&
                                  scheduledDate.getMonth() ===
                                    selectedDateObj.getMonth() &&
                                  scheduledDate.getFullYear() ===
                                    selectedDateObj.getFullYear() &&
                                  scheduledDate.toISOString().split("T")[0] ===
                                    getTodayDate()
                                );
                              })
                            ? "bg-green-500"
                            : user?.data?.upcomingSchedule?.some((s) => {
                                if (s?.item?.product !== cls?._id) return false;

                                const scheduledDate = new Date(
                                  s?.item?.scheduledDate
                                );
                                const selectedDateObj = new Date(selectedDate);
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);

                                const isSameDate =
                                  scheduledDate.getDate() ===
                                    selectedDateObj.getDate() &&
                                  scheduledDate.getMonth() ===
                                    selectedDateObj.getMonth() &&
                                  scheduledDate.getFullYear() ===
                                    selectedDateObj.getFullYear();

                                const isToday =
                                  scheduledDate.getDate() === today.getDate() &&
                                  scheduledDate.getMonth() ===
                                    today.getMonth() &&
                                  scheduledDate.getFullYear() ===
                                    today.getFullYear();

                                return isSameDate && !isToday;
                              })
                            ? "bg-red-600"
                            : "bg-dark"
                        }`}
                      >
                        {loader === cls?._id ? (
                          <div
                            role="status"
                            className="flex items-center justify-center"
                          >
                            <svg
                              aria-hidden="true"
                              className="inline w-6 h-6 text-gray-200 animate-spin fill-gray-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="ml-2">Loading...</span>
                          </div>
                        ) : isExpiredToday(
                            cls?.time,
                            toUtcMidnightIso(selectedDate)
                          ) ? (
                          "Session Expired"
                        ) : hasStarted(cls.time, selectedDate) ? (
                          "Session Expired"
                        ) : user?.data?.upcomingSchedule?.some((s) => {
                            const scheduledDate = new Date(
                              s?.item?.scheduledDate
                            );
                            const selectedDateObj = new Date(selectedDate);
                            return (
                              s?.item?.product === cls?._id &&
                              scheduledDate.getDate() ===
                                selectedDateObj.getDate() &&
                              scheduledDate.getMonth() ===
                                selectedDateObj.getMonth() &&
                              scheduledDate.getFullYear() ===
                                selectedDateObj.getFullYear() &&
                              scheduledDate.toISOString().split("T")[0] ===
                                getTodayDate()
                            );
                          }) ? (
                          "Session Booked"
                        ) : user?.data?.upcomingSchedule?.some((s) => {
                            if (s?.item?.product !== cls?._id) return false;

                            const scheduledDate = new Date(
                              s?.item?.scheduledDate
                            );
                            const selectedDateObj = new Date(selectedDate);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);

                            const isSameDate =
                              scheduledDate.getDate() ===
                                selectedDateObj.getDate() &&
                              scheduledDate.getMonth() ===
                                selectedDateObj.getMonth() &&
                              scheduledDate.getFullYear() ===
                                selectedDateObj.getFullYear();

                            const isToday =
                              scheduledDate.getDate() === today.getDate() &&
                              scheduledDate.getMonth() === today.getMonth() &&
                              scheduledDate.getFullYear() ===
                                today.getFullYear();

                            return isSameDate && !isToday;
                          }) ? (
                          "Cancel Class"
                        ) : cls?.capacity === 0 || cls.available === false ? (
                          "Unavailable"
                        ) : (
                          "Book"
                        )}
                      </button>
                      {user?.data?.upcomingSchedule?.some((s) => {
                        const scheduledDate = new Date(s?.item?.scheduledDate);
                        const selectedDateObj = new Date(selectedDate);
                        return (
                          s?.item?.product === cls?._id &&
                          scheduledDate.getDate() ===
                            selectedDateObj.getDate() &&
                          scheduledDate.getMonth() ===
                            selectedDateObj.getMonth() &&
                          scheduledDate.getFullYear() ===
                            selectedDateObj.getFullYear() &&
                          scheduledDate.toISOString().split("T")[0] ===
                            getTodayDate()
                        );
                      }) && (
                        <div className="text-green-600 text-sm mt-2 flex items-center gap-1">
                          <span>Starts In:</span>
                          <Counter scheduledDateTime={cls?.time} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {confirmationPopUp && (
          <>
            <AnimatePresence>
              <motion.div
                className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm w-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 10 }}
                    className="flex justify-center mb-4"
                  >
                    <CheckCircle className="text-green-500 w-16 h-16" />
                  </motion.div>
                  <h2 className="text-xl font-semibold mb-2">
                    Booking Confirmed!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    You have successfully booked your class.
                  </p>
                  <button
                    onClick={() => setConfirmationPopUp(false)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {membershipErrorPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <div className="bg-white relative p-6 rounded-2xl shadow-2xl max-w-md w-full text-center animate-fade-in">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setMembershipErrorPopup(false)}
                className="absolute right-2 top-2 cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-x-icon lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <div className="flex flex-col items-center space-y-4">
                <AlertTriangle className="text-red-500 w-12 h-12" />
                <h2 className="text-2xl font-bold text-gray-800 upppercase">
                  Access Denied
                </h2>
                <p className="text-gray-600">
                  You need to purchase a membership package to access this
                  class.
                </p>
                <Link
                  to={"/membership"}
                  className="mt-4 px-5 py-2 bg-black  text-white cursor-pointer  transition duration-200"
                >
                  Book Membership
                </Link>
              </div>
            </div>
          </div>
        )}


            {wrongPackageclassBookingPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <div className="bg-white relative p-6 rounded-2xl shadow-2xl max-w-md w-full text-center animate-fade-in">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setWrongPackageClassBookingPopUp(false)}
                className="absolute right-2 top-2 cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-x-icon lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <div className="flex flex-col items-center space-y-4">
                <AlertTriangle className="text-red-500 w-12 h-12" />
                <h2 className="text-2xl font-bold text-gray-800 upppercase">
                  Access Denied
                </h2>
                <p className="text-gray-600">
                  Your Membership Plan Location is {user?.data?.memberShipPlan?.package?.location} you can't access other
                  location's class.
                </p>
                {/* <Link
                  to={"/membership"}
                  className="mt-4 px-5 py-2 bg-black  text-white cursor-pointer  transition duration-200"
                >
                  close
                </Link> */}
              </div>
            </div>
          </div>
        )}

        {isPopUpOpen && (
          <div className="fixed inset-0 z-40 min-h-full    transition flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setIsPopUpOpen(false)}
            ></div>

            <div className="bg-white z-80  rounded-md">
              {isSignIn ? (
                <SignIn
                  setIsPopUpOpen={setIsPopUpOpen}
                  setIsSignIn={setIsSignIn}
                />
              ) : (
                <Signup
                  setIsPopUpOpen={setIsPopUpOpen}
                  setIsSignIn={setIsSignIn}
                />
              )}
            </div>
          </div>
        )}

        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowModal(false)} /* click outside */
          >
            <div
              className="bg-white w-[90%] max-w-sm rounded-xl p-6 text-center shadow-lg"
              onClick={(e) => e.stopPropagation()} /* stop bubble   */
            >
              <h2 className="text-lg font-semibold mb-3">Booking Closed</h2>
              <p className="text-sm text-gray-700 mb-6">
                Sorry, bookings close one hour before the class starts.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-dark text-white px-4 py-2 rounded-md w-full"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindClassSection;
