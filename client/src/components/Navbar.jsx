
import React, { useEffect, useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import { FiPhone } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";


const routes = [
    { name: "INTRO OFFER", href: "/", isActive: true },
    // { name: "TIME TABLE", href: "/bike", isActive: false },
    { name: "PRIVATES", href: "/scooty", isActive: false },
    { name: "PRICING", href: "/accessories", isActive: false },
    { name: "TEACHER TRAINING", href: "/contact", isActive: false },
    { name: "EVENTS & WORKSHOP", href: "/about-us", isActive: false },
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
            className={`flex flex-col lg:flex-row lg:justify-center px-3 pt-10 lg:pt-0 lg:items-center text-3xl lg:text-base lg:gap-3 text-[1rem] fixed z-[10000] top-20 right-0 w-[16rem] h-screen lg:static lg:h-auto  lg:w-fit lg:bg-transparent bg-mainBg text-dark transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
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
                            duration-200
                            ${route.isActive 
                                ? "text-dark underline decoration-text-dark" 
                                : "opacity-90 hover:opacity-100"
                            }`}
                        
                        to={route.href}
                    >
                        {route.name}
                    </Link>
                </li>
            ))}
            <li className="relative" ref={dropdownRef}>
                <button
                    className="flex items-center gap-x-3 text-dark hover:text-dark lg:hover:text-dark"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}

                >
                    TIME TABLE
                    <IoIosArrowDown />  
                </button>
                <ul
                    className={`absolute lg:left-0 right-0 w-52 lg:mt-[0.95rem] duration-500 lg:rounded-t-none lg:bg-mainRed bg-neutral-900 text-white rounded-lg shadow-lg transition-transform  ease-in-out ${isDropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 hidden"
                        }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="service-dropdown"
                    onClick={() => setIsOpen(false)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <li role="menuitem">
                        <Link
                            className="block px-4 py-3 text-sm transition-all hover:rounded-lg text-neutral-100 border-b border-neutral-800 hover:border-none rounded-none lg:hover:bg-mainRed hover:bg-neutral-800 hover:scale-[1.02]"
                            to="/service"
                        >
                            Vehicle Services
                        </Link>
                    </li>
                    <li role="menuitem">
                        <Link
                            className="block px-4 py-3 text-sm transition-all hover:rounded-lg text-neutral-100 border-b border-neutral-800 hover:border-none rounded-none lg:hover:bg-mainRed hover:bg-neutral-800 hover:scale-[1.02]"
                            to="/exchange"
                        >
                            Exchange
                        </Link>
                    </li>
                    <li role="menuitem">
                        <Link
                            className="block px-4 py-3 text-sm transition-all hover:rounded-lg text-neutral-100 border-b border-neutral-800 hover:border-none rounded-none lg:hover:bg-mainRed hover:bg-neutral-800 hover:scale-[1.02]"
                            to="/finance"
                        >
                            Finance
                        </Link>
                    </li>

                </ul>
            </li>
        </ul>
    );
};



// NavMenu.propTypes = {
//     routes: PropTypes.array.isRequired,
//     isOpen: PropTypes.bool.isRequired,
// };
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
     <p className='text-center  text-dark bg-light py-2'>New to Exhale? Make sure you check out our Intro Offers here.</p>

     <nav className=" top-0 left-0 w-full z-[10000]  bg-mainBg text-zinc-900">
            <div className="mx-auto bg-white  z-[100000000]">
                <div className="container  flex  justify-between lg:py-3 items-center  mx-auto lg:max-w-[95%]">
                    <div className='flex items-center'>
                    <Link
                        to={"/"}
                        className=" text-3xl  font-white"
                        href="#!"
                    >
                        <img
                            src="https://exhalepilateslondon.com/wp-content/themes/epl-theme/assets/img/exhale-pilates-london-navy.svg  "
                            className="w-[5rem] lg:w-[6rem]"
                            alt=""
                        />
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
                        <button
                            className="z-20 block cursor-pointer size-10 lg:hidden"
                            type="button"
                            id="hamburger"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-white"
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
                                    <div className="h-0.5 w-7 bg-white mb-1" />
                                    <div className="h-0.5 w-7 bg-white mb-1" />
                                    <div className="h-0.5 w-7 bg-white" />
                                </>
                            )}
                        </button>
                        <NavMenu routes={routes} isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                    </div>
                   <div className='flex items-center space-x-6'>
                   <FiPhone  className='text-2xl text-gray-600'/>
                   <button className='border border-[#FF6950]  px-3 py-1 cursor-pointer rounded-md hover:bg-[#FF6950] transition-all duration-300 ease-in-out hover:text-white'>Login</button>
                   </div>
                </div>
           
            </div>
        </nav>
    </div>
  )
}

export default Navbar
