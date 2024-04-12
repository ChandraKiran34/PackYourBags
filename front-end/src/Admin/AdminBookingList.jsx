import React, { useState, useEffect } from "react";
import { CheckCircle, User, MapPin, Briefcase } from "react-feather";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../FireBase/config";
function AdminBookingList() {
  const Bookings = [
    {
      Traveller: "AppaRao",
      Guide: "Manikantha Rayudu",
      Hotel: "Mars Travels",
      Agency: "Akash Agency",
      date: "3-7-2004",
      duration: "10 days",
    },
    {
      Traveller: "chandra",
      Guide: "Surya",
      Hotel: "Madhu Travels",
      Agency: "Pardha Agency",
      date: "9-11-23",
      duration: "5 days",
    },
    {
      Traveller: "Satwik",
      Guide: "Srinivas",
      Hotel: "Madhavi Hotels",
      Agency: "Vijaya Agency",
      date: "8-10-23",
      duration: "6 days",
    },
    {
      Traveller: "Saiteja",
      Guide: "Shatanna",
      Hotel: "Teju uncle travels",
      Agency: "santner Agency",
      date: "4-6-2023",
      duration: "4 days",
    },
  ];

  const [bookingData, setBookingData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(collection(db, "bookings"));

        const res = await getDocs(q);
        if (res.docs.length != 0) {
          const data = res.docs.map((doc, id) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setBookingData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <p className="mb-4 font-semibold text-2xl">Current Booking List:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookingData?.map((booking, index) => (
          <div
            key={index}
            className="border p-4 rounded-md shadow-md transition-transform hover:scale-105 bg-white"
          >
            <div className="flex items-center mb-2">
              <User className="mr-2" size={15} />
              <p>Traveller mail: </p>
              <p>{booking?.user?.email}</p>
            </div>
            <div className="flex items-center mb-2">
              <MapPin className="mr-2" size={15} />
              <p>Guide: </p>
              <p>{booking?.guide}</p>
            </div>
            <div className="flex items-center mb-2">
              <Briefcase className="mr-2" size={15} />
              <p>Hotel: </p>
              <p>{booking?.hotel}</p>
            </div>
            <div className="flex items-center mb-2">
              <CheckCircle className="mr-2" size={15} />
              <p>Agency: </p>
              <p>{booking?.agency}</p>
            </div>
            <div className="flex items-center mb-2">
              <CheckCircle className="mr-2" size={15} />
              <p>No of Persons: </p>
              <p>{booking?.numberOfPersons}</p>
            </div>
            <div className="flex items-center mb-2">
              <MdAccessTime className="mr-2" size={15} />
              <p>Price: </p>
              <p>{booking?.totalPrice} Rs</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminBookingList;
