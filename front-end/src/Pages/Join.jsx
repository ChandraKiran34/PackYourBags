import React from "react";
import { FaHotel } from "react-icons/fa";
import { FaMapLocationDot, FaCarRear } from "react-icons/fa6";
import "../CSS/Join.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const Join = () => {
  return (
    <>
      <Navbar />
      <div className="join-image">
        <div className="page-container">
          <div className="box">
            <FaMapLocationDot size={60} className="join-icon" />
            <h3 className="font-bold">Tourist Guide</h3>
            <p>If You known a place completely.Come and join with us.</p>
            <Link to="/guidesignin" className="border mt-9 p-3 w-1/2 ml-[4.5rem] bg-[#4970ef] border-none font-semibold rounded">Join</Link>
          </div>
          <div className="box">
            <FaHotel size={60} className="join-icon" />
            <h3  className="font-bold">Villas and Hotels</h3>
            <p>
              Do you have a Hotel? if your naswer is yes,register your hotel
            </p>
            <Link to="/hotelsignin" className="border mt-9 p-3 w-1/2 ml-[4.5rem] bg-[#4970ef] border-none font-semibold rounded">Join</Link>
          </div>

          <div className="box">
            <FaCarRear size={60} className="join-icon" />
            <h3  className="font-bold">Travel Agency</h3>
            <p>Register your travel agency in our website</p>
            <Link to="/agencysignin" className="border mt-9 p-3 w-1/2 ml-[4.5rem] bg-[#4970ef] border-none font-semibold rounded" >Join</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Join;
