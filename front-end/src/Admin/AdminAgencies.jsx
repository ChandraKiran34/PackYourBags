import React,{ useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLocationArrow, FaPhone, FaUser } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { FaCar } from "react-icons/fa";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../FireBase/config";
import axios from "axios";

const AdminAgency = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchAllDetails() {
      try {
        const response = await axios.get('http://localhost:9000/admin/getDetails'); // Assuming your backend API endpoint is '/api/getAllDetails'
        console.log(response)
        setUserData(response.data.agencies);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    fetchAllDetails();
  }, []);


  const handleRemoveAgency = async (agencyId) => {
    try {
      console.log(agencyId)
      // Send a DELETE request to your backend API to delete the user by ID
      await axios.delete(`http://localhost:9000/admin/deleteagency/${agencyId}`);
      
      // Update the user data in state by filtering out the deleted user
      setUserData(prevData => prevData.filter(user => user._id !== agencyId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  // const userData = [
  //   {
  //     name: "sai teja travels",
  //     mobileNumber: "9494339652",
  //     email: "saiteja.p21@iiits.in",
  //     location: "New Delhi",
  //     total_vehicles: 136
  //   },
  //   {
  //     name: "Apparao travels",
  //     mobileNumber: "9494339654",
  //     email: "apparao.s21@iiits.in",
  //     location: "Tirupathi",
  //     total_vehicles: 136
  //   },
  //   {
  //     name: "chandra travels",
  //     mobileNumber: "9494336895",
  //     email: "chandra.b21@iiits.in",
  //     location: "Banguluru",
  //     total_vehicles: 136
  //   },
  //   {
  //     name: "satwik travels",
  //     mobileNumber: "9110364244",
  //     email: "satwik.p21@iiits.in",
  //     location: "Chennai",
  //     total_vehicles: 136
  //   },
  // ];

  return (
    <div className="bg-white p-6  ml-7">
      <h1 className="font-bold text-4xl p-5">Registered Travel Agencies</h1>
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
            <p className="text-gray-600 mb-2 flex ">
              <FaCar className="mt-1" />
              <p className="pl-1">Total Vehicles: {data?.numberOfVehiclesAvailable}</p>
            </p>
            <p className="text-gray-600 mb-2 flex ">
              <FaLocationArrow className="mt-1" />
              <p className="pl-1">Location: {data?.location}</p>
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
              <button className="p-2 border rounded mt-[2rem] bg-[#f85451] text-white font-semibold" onClick={() => handleRemoveAgency(data?._id)}>Remove</button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AdminAgency;
