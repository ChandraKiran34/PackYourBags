import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaPhone, FaUser } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
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
        setUserData(response.data.users);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    fetchAllDetails();
  }, []);

  const handleRemoveUser = async (userId) => {
    try {
      console.log(userId)
      // Send a DELETE request to your backend API to delete the user by ID
      await axios.delete(`${backendurl}/admin/deleteuser/${userId}`);
      
      // Update the user data in state by filtering out the deleted user
      setUserData(prevData => prevData.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // const userData = [
  //   {
  //     name: "sai teja",
  //     mobileNumber: "9494339652",
  //     email: "saiteja.p21@iiits.in",
  //     currentBookings: ["Booking 1", "Booking 2"],
  //   },
  //   {
  //     name: "Apparao",
  //     mobileNumber: "9494339654",
  //     email: "apparao.s21@iiits.in",
  //     currentBookings: ["Booking 1", "Booking 2"],
  //   },
  //   {
  //     name: "chandra",
  //     mobileNumber: "9494336895",
  //     email: "chandra.b21@iiits.in",
  //     currentBookings: ["Booking 1", "Booking 2"],
  //   },
  //   {
  //     name: "satwik",
  //     mobileNumber: "9110364244",
  //     email: "satwik.p21@iiits.in",
  //     currentBookings: ["Booking 1", "Booking 2"],
  //   },
  // ];

  return (
    <div className="bg-white p-6  ml-7">
      <h1 className="font-bold text-4xl p-5">Registered Users</h1>
      <ul className="flex">
        {userData?.map((data, index) => (
          <div className="border border-r-2 w-[20vw] p-4" key={index}>
            <h2 className="text-xl  mb-4 flex">
              <FaUser className="mr-2 font-[400]" />
              <h1 className="font-semibold">{data?.name}</h1>
            </h2>
            <p className="text-gray-600 mb-2 flex">
              <FaPhone className="mt-1" />
              <p className="pl-1">Mobile Number: {data?.phoneNumber}</p>
            </p>
            <p className="text-gray-600 mb-2 flex">
              <MdEmail className="mt-1" />
              <p className="pl-1">Email: {data?.email}</p>
            </p>
            {/* <div>
              <p className="text-gray-600 font-semibold mb-2 ">
                Current Bookings:
              </p>
              <ul className=" pl-6">
                {data.currentBookings.map((booking, index) => (
                  <li key={index} className="flex">
                    <CiLocationOn className="mt-1 font-[600]" />
                    <li className="ml-2">{booking}</li>
                  </li>
                ))}
              </ul>
            </div> */}
            <button className="p-3 border rounded ml-[4.5rem] mt-[2rem] bg-[#f85451] text-white font-semibold"
             onClick={() => handleRemoveUser(data?._id)}>
              Remove
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AdminUser;
