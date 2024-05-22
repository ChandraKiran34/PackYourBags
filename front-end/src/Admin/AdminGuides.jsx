import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaPhone, FaUser } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";
import axios from "axios";
import { backendurl } from "../backendurl";
import { Link } from "react-router-dom";

const AdminGuide = () => {
  const [userData, setUserData] = useState([]);
  const [selectedGuideBookings, setSelectedGuideBookings] = useState([]);

  useEffect(() => {
    async function fetchAllDetails() {
      try {
        const response = await axios.get(backendurl + "/admin/getDetails");
        console.log(response);
        setUserData(response.data.guides);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    fetchAllDetails();
  }, []);

  const handleRemoveGuide = async (guideId) => {
    try {
      await axios.delete(`${backendurl}/admin/deleteguide/${guideId}`);
      setUserData((prevData) =>
        prevData.filter((user) => user._id !== guideId)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const getBookings = async (guideId) => {
    try {
      const response = await axios.get(
        `${backendurl}/admin/guideBookings/${guideId}`
      );
      console.log(response.data.bookings);
      setSelectedGuideBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div className="bg-white p-6 ml-7">
      <h1 className="font-bold text-4xl p-5">Registered Guides</h1>
      <ul className="flex">
        {userData?.map((data, index) => (
          <div className="border border-r-2 w-[20vw] p-4" key={index}>
            <h2 className="text-xl mb-4 flex">
              <FaUser className="mr-2 font-[400]" />
              <h1 className="font-semibold">{data.name}</h1>
            </h2>
            <p className="text-gray-600 mb-2 flex">
              <FaPhone className="mt-1" />
              <p className="pl-1">Mobile: {data.phoneNumber}</p>
            </p>
            <p className="text-gray-600 mb-2 flex">
              <FaLocationArrow className="mt-1" />
              <p className="pl-1">location: {data?.location}</p>
            </p>
            <p className="text-gray-600 mb-2 flex">
              <MdEmail className="mt-1" />
              <p className="pl-1">Email: {data.email}</p>
            </p>
            <div className="flex justify-center items-center">
              <Link
                to={`/guideBookings/${data._id}`}
                className="p-2 border rounded mt-[2rem] bg-[#f85451] text-white font-semibold"
              >
                View Bookings
              </Link>
              <button
                className="p-2 border rounded mt-[2rem] bg-[#f85451] text-white font-semibold"
                onClick={() => handleRemoveGuide(data?._id)}
              >
                Remove
              </button>
            </div>
            {selectedGuideBookings.length > 0 &&
              selectedGuideBookings.map((booking, index) => (
                <div key={index}>
                  <p>Traveller: {booking.travellerId.name}</p>
                  <p>Email: {booking.travellerId.email}</p>
                  <p>Destination: {booking.destinationId.name}</p>
                </div>
              ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AdminGuide;
