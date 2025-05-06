import { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiCalendar } from "react-icons/fi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch } from "react-redux";
import { getAllClasses } from "@/Redux/Slices/classSlice";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const FindClassSection = () => {
  const [allClasses, setAllClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();

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

      const response = await dispatch(
        getAllClasses({ date: utcDate, page, limit, location })
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
  }, [selectedDate, location]);

  return (
    <>
      <section className="py-10 px-10 ">
        <p className="text-gray-400 mr-0 mb-4 ">My Account</p>
        <div className="flex  justify-between">
          <div>
            <h1 className="text-3xl">Find a Class</h1>
          </div>
          <div className="flex flex-col justify-end items-end ">
            <div className="flex space-x-6">
              <select
                onChange={(e) => setLocation(e.target?.value)}
                className="border rounded-md px-4 py-2 border-gray-300"
              >
                <option value={null}>Location</option>
                {allClasses?.map((cls) => (
                  <option value={cls?.location}>{cls?.location}</option>
                ))}
              </select>

              <select className="border rounded-md px-4 py-2 border-gray-300">
                <option>class Type</option>
              </select>

              <select className="border rounded-md px-4 py-2 border-gray-300">
                <option>Instructor</option>
              </select>
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

        <div className="mt-10 space-y-6 w-full    mx-auto">
          {allClasses?.length === 0 ? (
            <div className="text-center text-gray-500 text-lg font-medium py-10">
              No classes available for the selected date or location.
            </div>
          ) : (
            allClasses?.map((cls, index) => (
              <div key={index} className="border-t w-full  pt-6">
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
                        <p className="text-sm text-gray-600">
                          {cls.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{cls.location}</div>
                    <div className="text-xs text-red-500 mt-1">
                      {" "}
                      {cls?.capacity <= 10
                        ? `Only ${cls?.capacity} spot left!`
                        : ""}
                    </div>
                    <button
                      className={`${
                        cls?.capacity === 0 || !cls.available
                          ? "bg-gray-400"
                          : "bg-[#00354C]"
                      }    h-fit text-white w-full md:w-full px-10 py-2 rounded-lg hover:bg-[#00405c]`}
                    >
                      {cls?.capacity === 0 || !cls.available
                        ? "Unavailable"
                        : "Book"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default FindClassSection;
