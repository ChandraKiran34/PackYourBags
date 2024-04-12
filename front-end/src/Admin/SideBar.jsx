import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { RiGuideFill } from "react-icons/ri";
import { FaHotel } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { FaLongArrowAltRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaCar } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
const Sidebar = ({isExpanded, setIsExpanded}) => {
  const location = useLocation();
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const variants = {
    expanded: { width: "15vw" },
    nonExpanded: { width: "5vw" },
  };

  const navLinks = [
    {
      name: "Home",
      icon: FaHome,
      path: "/admindashboard/",
    },
    {
      name: "Travellers",
      icon: FaUsers,
      path: "/admindashboard/users",
    },

    {
      name: "Guides",
      icon: RiGuideFill,
      path: "/admindashboard/guides",
    },
    {
      name: "Hotels",
      icon: FaHotel,
      path: "/admindashboard/hotels",
    },
    {
      name: "Agencies",
      icon: FaCar,
      path: "/admindashboard/agencies",
    },
    {
      name: "reviews",
      icon: FaCar,
      path: "/admindashboard/reviews",
    },
    {
      name: "AddPlace",
      icon: FaLocationArrow,
      path: "/admindashboard/addPlace",
    },
    {
      name: "Logout",
      icon: LuLogOut,
      path: "/",
    },
  ];
  return (
    <motion.div
      animate={isExpanded ? "expanded" : "nonExpanded"}
      variants={variants}
      className={
        "px-10 py-12 flex flex-col bg-[#ce9178] text-white border border-r-1 w-[33vw] relative min-h-screen" +
        (isExpanded ? " px-10" : " px-2")
      }
    >
      {/* <div className="logo-div flex space-x-3 items-center">
        <FaUserAlt />
        <span className={isExpanded ? 'block' : 'hidden'}>Chandra Kiran</span>
      </div> */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-5 h-5 bg-[#302300] rounded-full absolute -right-[10.5px] top-12 flex justify-center items-center cursor-pointer "
      >
        <FaLongArrowAltRight className="text-white w-4 " />
      </div>
      <div className="mt-10 flex flex-col space-y-8">
        {navLinks.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={
              "flex space-x-2 p-2 rounded cursor-pointer hover:opacity-80 font-bold" +
              (location.pathname === item.path
                ? " bg-[#de7d1d]  text-white font-semibold"
                : "")
            }
          >
            <item.icon className="mt-1"/>
            <span className={isExpanded ? "block" : "hidden"}>
              {" "}
              {item.name}{" "}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
