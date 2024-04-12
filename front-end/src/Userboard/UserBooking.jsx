// UserBookings.js
import React, { useEffect, useState } from "react";
import Hampi from "../Assets/Hampi.jpg";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const bookings = [
  {
    id: 1,
    place: "Hampi",
    guide: "John Doe",
    hotel: "Luxury Inn",
    startDate: "2023-12-15",
    agency: "Travel Explorers",
    duration: "7 days",
    image: Hampi, // Add the actual image path
  },
  // Add more booking entries as needed
];

function UserBooking() {
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const travellerId = decodedToken.userId;
        const response = await fetch(`http://localhost:9000/trips/allTrips`);
        const data = await response.json();

        // console.log(data);
        const userTrips = data.filter(
          (trip) => trip.travellerId._id === travellerId
        );

        // console.log(userTrips);
        setUserTrips(userTrips);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookingDetails();
  }, []);

  return (
    <div className="bg-white p-6 rounded">
      <h2 className="text-3xl font-semibold mb-6">Upcoming Bookings !</h2>
      {userTrips.length > 0 ?(userTrips.map((trip) => (
        <div
          key={trip?._id}
          className="mb-4 flex space-between border-2 mt-5 p-5 rounded"
        >
          <img
            src={trip?.destinationId.picturePath}
            alt="trip image"
            className="w-[20%] h-[20%px]  rounded"
          />
          <div className="ml-[2rem] items-center">
            <p className="text-xl font-semibold">{trip?.place}</p>
            <p className="text-gray-600">{`Guide: ${trip?.guideId.name}`}</p>
            <p className="text-gray-600">{`Hotel: ${trip?.hotelId.name}`}</p>
            <p className="text-gray-600">{`Agency: ${trip?.agencyId.name}`}</p>
            <p className="text-gray-600">{`Destination: ${trip?.destinationId.name}`}</p>
            <p className="text-gray-600">{`Top Places: ${trip?.destinationId.placesToVisit}`}</p>{" "}
          </div>
        </div>
      )))
      :  <button type="button" className="bg-indigo-500 text-white font-bold text-center" disabled>
        <svg className="animate-spin h-5 w-5 mr-3 py-2" viewBox="0 0 24 24"></svg>
        Fetching Bookings
      </button>}
    </div>
  );
}

export default UserBooking;
