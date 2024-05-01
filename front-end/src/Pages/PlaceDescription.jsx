// import React from 'react';
import classes from "../CSS/Placedesc.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { MdHeight, MdOutlineStarPurple500 } from "react-icons/md";
import {
  FaArrowLeft,
  FaCheck,
  FaLocationPin,
  FaNoteSticky,
  FaRegCircleUser,
  FaWifi,
} from "react-icons/fa6";
import { LuParkingCircle } from "react-icons/lu";
import { FaBackspace, FaRegStar } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import NorthGoa from "../Assets/NorthGoa.jpg";
import { Link } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import { backendurl } from "../backendurl";
const PlaceDescreption = () => {
  const [productData, setProductData] = useState({});
  const { id, name } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${backendurl}/destinations/${id}`)
      .then((response) => {
        console.log(response);
        setProductData(response.data)
      }).catch((err) => {
        console.log(err)
      })
  };

    fetchData();
  }, [id]); // Add id as a dependency to re-fetch when id changes

  const handleBookNow = () => {
    // Navigate to the FakePaymentForm route with location as a parameter
    navigate(`/paymentform/${id}/${encodeURIComponent(name)}`);
  };

  return (
    <>
      <div className={classes.main}>
        <div className="flex justify-around mt-0">
          <Link to="/plantour" className="w-fit inline-block">
            <FaArrowLeft className=" rounded-full p-2  text-black font-bold text-4xl hover:opacity-4 bg-[#4caf50] " />
          </Link>
          <h1
            className={
              classes.placename + " font-semibold  text-2xl flex  p-4 ml-5"
            }
          >
            <IoLocation />
            {productData.name} -- famous tourist spot
          </h1>
        </div>
        <div className={classes.topmain}>
          <div>
            <img
              src={productData.picturePath}
              alt="images"
              className={classes.leftimg + " hover:shadow-md"}
            />
          </div>
          <div>
            <div>
              <img
                src={productData.picturePath}
                alt="images"
                className={classes.rightimg + " hover:shadow-md"}
              />
            </div>
            <img
              src={productData.picturePath}
              alt="images"
              className={classes.rightimg + " hover:shadow-md"}
            />
          </div>
        </div>
        <div
          className="bottommain"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          <div className="leftcontent" style={{ width: "50vw" }}>
            <div>
              <h1 className="flex gap-2 font-[500]">
                <FaCheck className="mt-1" />
                <p>{productData.name} is a famous spot in India</p>
              </h1>
              <p className="flex gap-2 font-[500]">
                <FaCheck className="mt-1 font-semibold text-2xl" />
                <p>
                 {productData.placesToVisit}
                </p>
              </p>
              <p className="mt-5">
                <div className="flex">
                  <FaNoteSticky className="font-bold text-2xl mb-4 justify-center " />{" "}
                  <p className="ml-2 mt-2 underline font-semibold">
                    Description of the place
                  </p>
                </div>
                <p className="font-[1rem]">
                 {productData.description}
                </p>
                .
              </p>
              {/* <h3 className="flex mt-5 ">
                <MdOutlineStarPurple500 className={classes.logo + " mb-10"} />{" "}
                Perks of going to this place
              </h3> */}
              {/* <div className={classes.parking + " flex"}>
                <div>
                  <LuParkingCircle className={classes.logo1} />
                </div>
                <div>
                  <p>Park for free</p>
                  <h4>
                    This is one of the few places in the area with free parking.
                  </h4>
                </div>
              </div>
              <div className={classes.parking}>
                <div>
                  <FaRegStar className={classes.logo1} />
                </div>
                <div>
                  <p>Experienced host</p>
                  <h4>Sebastian has 74 reviews for other places.</h4>
                </div>
              </div>
              <div className={classes.parking}>
                <div>
                  <FaWifi className={classes.logo1} />
                </div>
                <div>
                  <br />
                  <h4>Free wifi</h4>
                </div>
              </div> */}
            </div>
          </div>
          <div className={classes.rightcontent}>
            <h2 className="font-[500] ml-[70px]">₹5000 per day</h2>
            <div>
              {/* <div className={classes.check}>
                <h3>
                  Check in :
                  <input
                    className={classes.checkin}
                    type="date"
                    placeholder="Check in"
                  />
                </h3>
              </div>
              <div className={classes.check}>
                <h3>
                  Check out
                  <input
                    className={classes.checkout}
                    type="date"
                    placeholder="Check Out"
                  />
                </h3>
              </div> */}
              <button className={classes.booknow} onClick={handleBookNow}>Book now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceDescreption;
