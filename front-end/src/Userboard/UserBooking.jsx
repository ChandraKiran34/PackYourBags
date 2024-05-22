import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { backendurl } from "../backendurl";
import {
  FaMapMarkerAlt,
  FaUser,
  FaHotel,
  FaBuilding,
  FaPhoneAlt,
  FaDownload,
} from "react-icons/fa";
import { TbFileInvoice } from "react-icons/tb";

function UserBooking() {
  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const travellerId = decodedToken.userId;
        const response = await fetch(`${backendurl}/trips/allTrips`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        const userTrips = data.filter(
          (trip) => trip.travellerId._id === travellerId
        );
        setUserTrips(userTrips);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBookingDetails();
  }, []);

  const handleDownload = (booking) => {
    const place = booking?.destinationId.name || "";
    const guide = booking?.guideId?.name || "";
    const guidePhone = booking?.guideId?.phoneNumber || ""; // Guide phone number
    const hotel = booking?.hotelId?.name || "";
    const hotelPhone = booking?.hotelId?.phoneNumber || ""; // Hotel phone number
    const agency = booking?.agencyId?.name || "";
    const agencyPhone = booking?.agencyId?.phoneNumber || ""; // Agency phone number
    const id = booking?._id || "";

    const cityName = place.split(",")[0];
    const content = `
      Invoice ID: ${id}
      Place: ${cityName}
      Guide: ${guide} (${guidePhone})
      Hotel: ${hotel} (${hotelPhone})
      Agency: ${agency} (${agencyPhone})
    `;

    const blob = new Blob([content], { type: "text/plain" });

    const a = document.createElement("a");
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = `${cityName} - ${id}.txt`;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="bg-white p-6 rounded">
      <h2 className="text-3xl font-semibold mb-6">Upcoming Bookings</h2>
      {isLoading ? (
        <button
          type="button"
          className="bg-indigo-500 text-white font-bold text-center"
          disabled
        >
          <svg
            className="animate-spin h-5 w-5 mr-3 py-2"
            viewBox="0 0 24 24"
          ></svg>
          Fetching Bookings
        </button>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userTrips.map((trip) => (
            <div
              key={trip?._id}
              className="border border-gray-300 rounded overflow-hidden shadow-md flex flex-col justify-between max-w-md"
            >
              <img
                src={trip?.destinationId.picturePath}
                alt="trip"
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6 flex-grow w-[2200px]">
                <p className="text-gray-600 font-semibold mb-2 flex items-center">
                  <TbFileInvoice className="mr-2 text-xl" />
                  {`Invoice_Id :  ${trip?._id} `}
                </p>
                <p className="text-gray-600 mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  {`Destination: ${trip?.destinationId.name}`}
                </p>
                <p className="text-gray-700 mb-2 flex items-center">
                  <FaUser className="mr-2" />
                  {`Guide: ${trip?.guideId.name}`}{" "}
                  {trip?.guideId.phoneNumber && (
                    <span className="text-gray-500 ml-1 flex items-center">
                      <FaPhoneAlt className="mr-1" />
                      {trip?.guideId.phoneNumber}
                    </span>
                  )}
                </p>
                <p className="text-gray-700 mb-2 flex items-center">
                  <FaHotel className="mr-2" />
                  {`Hotel: ${trip?.hotelId.name}`}{" "}
                  {trip?.hotelId.phoneNumber && (
                    <span className="text-gray-500 ml-1 flex items-center">
                      <FaPhoneAlt className="mr-1" />
                      {trip?.hotelId.phoneNumber}
                    </span>
                  )}
                </p>

                <p className="text-gray-700 mb-4 flex items-center">
                  <FaBuilding className="mr-2" />
                  {`Agency: ${trip?.agencyId.name}`}{" "}
                  {trip?.agencyId.phoneNumber && (
                    <span className="text-gray-500 ml-1 flex items-center ">
                      <FaPhoneAlt className="mr-1 " />
                      {trip?.agencyId.phoneNumber}
                    </span>
                  )}
                </p>

                <button
                  onClick={() => handleDownload(trip)}
                  className="bg-indigo-500 flex items-center justify-center text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors duration-300"
                >
                  <FaDownload className="mr-2" />
                  Download Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBooking;
