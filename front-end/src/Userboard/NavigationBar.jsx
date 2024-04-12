// NavigationBar.js

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { LayoutDashboard } from "lucide-react";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { SlLogout } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { clearUser } from "../features/user/UserSlice";
import { useAuth } from "../FireBase/AuthContexts";
function NavigationBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const { logout } = useAuth();
  const navLinks = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/userdashboard/",
    },
    {
      name: "Bookings",
      icon: FaRegCalendarCheck,
      path: "/userdashboard/bookings",
    },
    {
      name: "Edit",
      icon: FaEdit,
      path: "/userdashboard/updateprofile",
    },
    {
      name: "Logout",
      icon: SlLogout,
    },
    {
      name: "Home",
      icon: FaHome,
      path: "/",
    },
  ];

  const variants = {
    expanded: { width: "20%" },
    nonExpanded: { width: "5%" },
  };

  const logoutHandler = async () => {
    try {
      localStorage.removeItem('token');
      dispatch(clearUser());
      navigate('/signIn')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      animate={isExpanded ? "expanded" : "nonExpanded"}
      variants={variants}
      className={
        "px-10 py-12 flex flex-col jus bg-[#2a5aff] text-white border border-r-1 w-1/3 min-h-screen  relative" +
        (isExpanded ? " px-10" : " px-2")
      }
    >
      {/* <div className="logo-div flex space-x-3 items-center">
        <FaUserAlt />
        <span className={isExpanded ? 'block' : 'hidden'}>Chandra Kiran</span>
      </div> */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-5 h-5 bg-[#4d76fe] rounded-full absolute -right-[10.5px] top-12 flex justify-center items-center cursor-pointer"
      >
        <FaLongArrowAltRight className="text-white w-4 " />
      </div>
      <div className="mt-10 flex flex-col space-y-8">
        {navLinks.map((item, index) =>
          item.name == "Logout" ? (
            <Link
              key={index}
              onClick={logoutHandler}
              className={
                "flex space-x-2 p-2 rounded cursor-pointer hover:opacity-80" +
                (location.pathname === item.path
                  ? " bg-[#314da8]  text-white font-semibold"
                  : "")
              }
            >
              <item.icon />
              <span className={isExpanded ? "block" : "hidden"}>
                {" "}
                {item.name}{" "}
              </span>
            </Link>
          ) : (
            <Link
              key={index}
              to={item.path}
              className={
                "flex space-x-2 p-2 rounded cursor-pointer hover:opacity-80" +
                (location.pathname === item.path
                  ? " bg-[#314da8]  text-white font-semibold"
                  : "")
              }
            >
              <item.icon />
              <span className={isExpanded ? "block" : "hidden"}>
                {" "}
                {item.name}{" "}
              </span>
            </Link>
          )
        )}
      </div>
    </motion.div>
  );
}

export default NavigationBar;
