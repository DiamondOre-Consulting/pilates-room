import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import Signup from "@/pages/Signup";
import SignIn from "@/pages/SignIn";
import { RxCross1 } from "react-icons/rx";
import logo from "../assets/TPR-Logo.webp";
import { useSelector } from "react-redux";
import UserDashboard from "@/pages/UserDashboard";

const routes = [
  { name: "INTRO OFFER", href: "/intro-offers", isActive: false },
  { name: "ABOUT US", href: "/about-us", isActive: false },

  { name: "BOOK CLASS", href: "/class-schedule", isActive: false },
  { name: "PRIVATES", href: "/private-session", isActive: false },
  { name: "TEACHER TRAINING", href: "/teacher-training", isActive: false },
  { name: "MEMBERSHIP", href: "/membership", isActive: false },
  { name: "BLOGS", href: "/all-blogs", isActive: false },

];

const NavMenu = ({ routes, isOpen, setIsOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ul
      className={`flex flex-col lg:flex-row lg:justify-center px-3 pt-10 lg:pt-0 lg:items-center text-3xl lg:text-base gap-6 lg:gap-3 text-[1rem] fixed z-40 top-24 right-0 w-[16rem] h-screen lg:static lg:h-auto  lg:w-fit lg:bg-transparent bg-white text-dark transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      }`}
      id="navbar"
    >
      {routes.map((route, i) => (
        <li key={i}>
          <Link
            onClick={() => {
              setIsOpen(false);
              routes.forEach((r) => (r.isActive = false));
              route.isActive = true;
            }}
            className={`px-2 
                            hover:underline 
                            hover:decoration-text-dark
                            underline-offset-4 
                            transition-all 
                            tracking-wide
                            duration-200
                            ${
                              route.isActive
                                ? "text-dark underline decoration-text-dark "
                                : "opacity-90 hover:opacity-100"
                            }`}
            to={route.href}
          >
            {route.name}
          </Link>
        </li>
      ))}
      {/* <li className="relative" ref={dropdownRef}>
        <Link
        to={'/class-schedule'}
          className="flex items-center gap-x-3 tracking-wide text-dark hover:text-dark lg:hover:text-dark"
          onMouseEnter={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          TIME TABLE
          <IoIosArrowDown />
        </Link>
        <ul
          className={`absolute lg:left-0 right-0 w-52 lg:mt-[0.95rem] duration-500 lg:rounded-t-none lg:bg-mainRed bg-white text-dark rounded-lg shadow-lg transition-transform  ease-in-out ${
            isDropdownOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 hidden"
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="service-dropdown"
          onClick={() => setIsOpen(false)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <li role="menuitem">
            <Link
              className="block px-4 py-3 text-sm  uppercase transition-all hover:rounded-lg text-dark border-b border-neutral-800 hover:border-none rounded-none lg:hover:bg-mainRed  hover:scale-[1.02]"
              to="/service"
            >
             Promise hill
            </Link>
          </li>
          <li role="menuitem">
            <Link
              className="block px-4 py-3 text-sm transition-all hover:rounded-lg uppercase text-dark border-b border-neutral-800 hover:border-none rounded-none lg:hover:bg-mainRed  hover:scale-[1.02]"
              to="/exchange"
            >
              Marylebone
            </Link>
          </li>
          <li role="menuitem">
            <Link
              className="block px-4 py-3 text-sm uppercase transition-all hover:rounded-lg text-dark border-b border-neutral-800 hover:border-none rounded-none lg:hover:bg-mainRed  hover:scale-[1.02]"
              to="/finance"
            >
              North finchley
            </Link>
          </li>
        </ul>
      </li> */}
    </ul>
  );
};

// NavMenu.propTypes = {
//     routes: PropTypes.array.isRequired,
//     isOpen: PropTypes.bool.isRequired,
// };
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const popupRef = useRef(null);
  const { isLoggedIn, user } = useSelector((state) => state?.auth);
const [userDashboardPopUp , setUserDashboardPopUp] = useState(false)
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopUpOpen(false); // Close the popup
      }
    }

    if (isPopUpOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopUpOpen]);

  console.log("data", user, isLoggedIn);

  return (
    <div className="fixed z-40 w-full">
      <p className="text-center  text-dark bg-light py-2">
        New to Room? Make sure you check out our Intro Offers{" "}
        <Link to={"/intro-offers"} className="underline">
          here
        </Link>
        .
      </p>

      <nav className=" top-0 left-0 w-full z-20  bg-mainBg text-zinc-900">
        <div className="mx-auto bg-white  z-20">
          <div className="  flex  justify-between py-3 lg:py-3 items-center px-4 lg:px-0 mx-auto lg:max-w-[95%]">
            <div className="flex items-center">
              <Link to={"/"} className=" text-3xl  font-white" href="#!">
                <img src={logo} className="w-[5rem] lg:w-[6rem]" alt="" />
              </Link>
              <div className="flex flex-row  items-center  p-2 lg:flex-row-reverse">
                <div onClick={() => setIsOpen(false)}>
                  {/* <Modal>
                                <ModalTrigger>
                                    <FaSearch className="w-5 h-5 text-white" />
                                </ModalTrigger>
                                <SearchModal />
                            </Modal> */}
                </div>

                <NavMenu
                  routes={routes}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <FiPhone className="text-2xl text-gray-600" />
              <button
                onClick={() => setIsPopUpOpen(true)}
                className={`border border-[#FF6950] ${isLoggedIn ? "hidden" : "block"}  px-3 py-1 cursor-pointer rounded-md hover:bg-[#FF6950] transition-all duration-300 ease-in-out hover:text-white`}
              >
                Login
              </button>
              {isLoggedIn && (
                <svg
                onClick={()=> setUserDashboardPopUp(true)}
                  className="text-gray-700 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-circle-user-round-icon lucide-circle-user-round"
                >
                  <path d="M18 20a6 6 0 0 0-12 0" />
                  <circle cx="12" cy="10" r="4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              )}
              <button
                className="z-20 block cursor-pointer size-10 lg:hidden "
                type="button"
                id="hamburger"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black"
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
                ) : (
                  <>
                    <div className="h-0.5 w-7 bg-black mb-1" />
                    <div className="h-0.5 w-7 bg-black mb-1" />
                    <div className="h-0.5 w-7 bg-black" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isPopUpOpen && (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/20">
          <div
            ref={popupRef}
            className="bg-white  rounded-md"
          >
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



    {
      userDashboardPopUp &&(
        <div className='fixed inset-0 z-40 min-h-full    transition flex items-center justify-center'>
        <div className="fixed inset-0 bg-black/50" onClick={()=> setUserDashboardPopUp(false)}></div>
        <div className="relative w-full max-w-4xl p-4 mx-auto bg-white rounded-xl z-50">
        <button
          type="button"
          onClick={() => setUserDashboardPopUp(false)}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <svg
            className="h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414 5.707 15.707a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      <UserDashboard setUserDashboardPopUp={setUserDashboardPopUp}/>
        </div>
     
    </div>
      )
    }
    </div>
  );
};

export default Navbar;
