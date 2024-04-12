// UserBookings.js

import React from "react";
import Hampi from '../Assets/Hampi.jpg'
const bookings = [
  {
    id: 1,
    place: "Hampi",
    booking_name: "John Doe",
    people: "4",
    contact: "+91 8093823499",
    startDate: "15-12-2023",
    endDate: "18-12-2023",
    vehicle: ["MH 14 CS 9977"],
    image:Hampi // Add the actual image path
  },
  // Add more booking entries as needed
];

function UserBooking() {
  return (
    <div className="bg-white p-6 rounded">
      <h2 className="text-3xl font-semibold mb-6">Your Bookings</h2>

      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="flex items-center bg-gradient-to-r from-blue-200 to-blue-300 p-6 rounded-md shadow-md mb-6"
        >
          <div className="w-1/4">
            {/* Place Image */}
            <img
              src={booking.image}
              alt={booking.place}
              className="w-full h-auto rounded-md"
            />
          </div>
          <div className="w-3/4 ml-6">
            <h3 className="text-xl font-bold mb-3">{booking.place}</h3>
            <p className="text-gray-600">
              <span className="font-semibold">Booking Name:</span> {booking.booking_name}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Travellers:</span> {booking.people}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Contact:</span> {booking.contact}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Dates:</span>{" "}
              {booking.startDate+" to "+booking.endDate}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Vehicle:</span>{" "}
              {booking.vehicle.join(", ")}
            </p>
          </div>
          <div>
            <button className="border p-3 rounded-md bg-[#df5353] text-white border-none hover:opacity-80 transition ease-in-out duration-700">Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserBooking;