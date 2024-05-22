import React, { useState, useEffect } from "react";
import { User, MapPin, Briefcase } from "react-feather";
import { backendurl } from "../backendurl";

function AdminBookingList() {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(backendurl + "/admin/bookings");
        const data = await response.json();
        console.log(data);
        setBookingData(data.trips);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchDetails();
  }, []);

  return (
    <div>
      <p className="mb-4 font-semibold text-2xl">Current Booking List:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookingData?.map((trip, index) => (
          <div
            key={index}
            className="border p-4 rounded-md shadow-md transition-transform hover:scale-105 bg-white"
          >
            <div className="flex items-center mb-2">
              <User className="mr-2" size={15} />
              <p>Trip_Id</p>
              <p>{trip?.id}</p>
            </div>
            <div className="flex items-center mb-2">
              <User className="mr-2" size={15} />
              <p>Traveller_Mail :   </p>
              <p> {trip?.traveller?.email}</p>
            </div>
            <div className="flex items-center mb-2">
              <MapPin className="mr-2" size={15} />
              <p>Guide: </p>
              <p>{trip?.guide?.name}</p>
            </div>
            <div className="flex items-center mb-2">
              <Briefcase className="mr-2" size={15} />
              <p>Hotel: </p>
              <p>{trip?.hotel?.name}</p>
            </div>
            <div className="flex items-center mb-2">
              <Briefcase className="mr-2" size={15} />
              <p>Agency: </p>
              <p>{trip?.agency?.name}</p>
            </div>
            {/* You can add more properties here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminBookingList;
