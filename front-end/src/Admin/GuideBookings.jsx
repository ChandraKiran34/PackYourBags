import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backendurl } from "../backendurl";

const GuideBookings = () => {
  const { guideId } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        console.log("hi")
        const response = await axios.get(`${backendurl}+/admin/guideBookings/${guideId}`);
        console.log(response.data)
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [guideId]);

  return (
    <div>
      <h1>Bookings for Guide {guideId}</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <p>Traveller: {booking.travellerId.name}</p>
            <p>Email: {booking.travellerId.email}</p>
            {/* Other booking details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuideBookings;
