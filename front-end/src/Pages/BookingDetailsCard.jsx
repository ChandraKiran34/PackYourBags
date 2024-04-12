// BookingDetailsCard.jsx

import React,{useState} from 'react';
import { FaCar, FaHotel, FaPerson } from 'react-icons/fa6';
import { RiGuideFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Hampi from '../Assets/Hampi.jpg'
import { useSelector } from 'react-redux';
const BookingDetailsCard = () => {

  const bookingData = useSelector((state) => state.booking.data);
  console.log(bookingData)
  const [bookingDetails, setBookingDetails] = useState({
      hotel:bookingData?.hotel,
      agency: bookingData?.agency,
      guide: bookingData?.guide,
      location: bookingData?.location,
      no_persons:bookingData?.numberOfPersons,
      totalPrice: bookingData?.totalPrice, // Assuming a fixed price for now
    });
  return (
    <div className="max-w-md mx-auto bg-[#fff] rounded-xl overflow-hidden shadow-lg p-6 mb-6">
      {/* Hotel Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Tour Details</h2>
        <img src={Hampi} alt={bookingDetails.hotel} className="w-full h-88 object-cover mb-2" />
        <p className="text-gray-700 font-semibold">{bookingData?.location}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl text-[#52aaea] font-[400] mb-2 flex gap-2 underline"><FaHotel />Hotel Details</h2>
        <p>{bookingDetails?.hotel}</p>
        {/* Add guide details here */}
      </div>

      {/* Guide Section */}
      <div className="mb-4">
        <h2 className="text-xl text-[#52aaea] font-[400] mb-2 flex gap-1 underline"><RiGuideFill />Guide Details</h2>
        <p>{bookingDetails?.guide}</p>
        {/* Add guide details here */}
      </div>

      {/* Travel Agency Section */}
      <div className="mb-4">
        <h2 className="text-xl text-[#52aaea] font-[400] mb-2 flex gap-2 underline"><FaCar />Travel Agency Details</h2>
        <p>{bookingDetails?.agency}</p>
        {/* Add travel agency details here */}
      </div>
      <div>
        <h2 className="text-xl font-[500] mb-2 flex gap-2 underline"><FaPerson /> No of Persons</h2>
        <p className="text-green-500 text-xl font-semibold">{bookingDetails?.no_persons}</p>
      </div>

      {/* Total Price Section */}
      {/* <div>
        <h2 className="text-xl font-[500] mb-2">Total Price</h2>
        <p className="text-green-500 text-xl font-semibold">₹{bookingDetails?.totalPrice}</p>
      </div> */}
      

      {/* Buttons Section */}
      <div className="flex justify-between mt-4">
        <Link to='/' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
          Go to Home
        </Link>
        <Link to='/userdashboard' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default BookingDetailsCard;
