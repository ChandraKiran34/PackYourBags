import React,{useState,useEffect} from "react";
import { MdEmail } from "react-icons/md";
import { FaPhone, FaUser } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { FaHotel } from "react-icons/fa";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../FireBase/config";
import axios from "axios";
import { backendurl } from "../backendurl";

const AdminUser = () => {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchAllDetails() {
      try {
        const response = await axios.get(backendurl+'/admin/getDetails'); // Assuming your backend API endpoint is '/api/getAllDetails'
        console.log(response)
        setUserData(response.data.hotels);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    fetchAllDetails();
  }, []);




  const handleRemoveHotel = async (hotelId) => {
    try {
      console.log(hotelId)
      // Send a DELETE request to your backend API to delete the user by ID
      await axios.delete(`${backendurl}/admin/deletehotel/${hotelId}`);
      
      // Update the user data in state by filtering out the deleted user
      setUserData(prevData => prevData.filter(user => user._id !== hotelId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  // const userData = [
  //   {
  //     name: "sai teja nivas",
  //     mobileNumber: "9494339652",
  //     email: "saiteja.p21@iiits.in",
  //     location: "New Delhi",
  //     total_rooms: 136
  //   },
  //   {
  //     name: "Apparao hotels",
  //     mobileNumber: "9494339654",
  //     email: "apparao.s21@iiits.in",
  //     location: "Tirupathi",
  //     total_rooms: 136
  //   },
  //   {
  //     name: "chandra stays",
  //     mobileNumber: "9494336895",
  //     email: "chandra.b21@iiits.in",
  //     location: "Banguluru",
  //     total_rooms: 136
  //   },
  //   {
  //     name: "satwik inn",
  //     mobileNumber: "9110364244",
  //     email: "satwik.p21@iiits.in",
  //     location: "Chennai",
  //     total_rooms: 136
  //   },
  // ];

  return (
    <div className="bg-white p-6  ml-7">
      <h1 className="font-bold text-4xl p-5">Registered Hotels</h1>
      <ul className="flex">
        {userData?.map((data, index) => (
          <div className="border border-r-2 w-[20vw] p-4" key={index}>
            <h2 className="text-xl  mb-4 flex">
              <FaUser className="mr-2 font-[400]" />
              <h1 className="font-semibold">{data.name}</h1>
            </h2>
            <p className="text-gray-600 mb-2 flex">
              <FaPhone className="mt-1" />
              <p className="pl-1">Mobile Number: {data.mobile}</p>
            </p>
            <p className="text-gray-600 mb-2 flex">
              <MdEmail className="mt-1" />
              <p className="pl-1">Email: {data.email}</p>
            </p>
            <p className="text-gray-600 mb-2 flex ">
              <CiLocationOn className="mt-1" />
              <p className="pl-1">Location: {data.location}</p>
            </p>
            <p className="text-gray-600 mb-2 flex ">
              <FaHotel className="mt-1" />
              <p className="pl-1">Total Rooms: {data.numberOfRoomsAvailable}</p>
            </p>
            {/* <ul className=" pl-6">
              {data.knownLang.map((language, index) => (
                <li key={index} className="flex">
                  <CiLocationOn className="mt-1 font-[600]" />
                  <li className="ml-2">{language}</li>
                </li>
              ))}
            </ul> */}
            <div className="flex justify-center items-center">
              <button className="p-2 border rounded mt-[2rem] bg-[#f85451] text-white font-semibold">View Bookings</button>
              <button className="p-2 border rounded mt-[2rem] bg-[#f85451] text-white font-semibold" onClick={() => handleRemoveHotel(data?._id)}>Remove</button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AdminUser;
