// HotelUpdate.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHotelDetails } from "../features/hotel/HotelSlice";
import { jwtDecode } from "jwt-decode";
import { updateAgencyDetails } from "../features/agency/AgencySlice";

function HotelUpdate() {
  // Use state to manage form input values
  const dispatch = useDispatch();
  const { agencyData, token } = useSelector((state) => state.agency);
  const [name, setName] = useState(agencyData?.name || ""); // Default name
  const [location, setLocation] = useState(agencyData?.location|| ""); // Default email
  const [phoneNumber, setPhoneNumber] = useState(agencyData?.phoneNumber || ""); // Default phone number
  const [numberOfVehiclesAvailable, setNumberOfVehiclesAvailable] = useState(agencyData?.numberOfVehiclesAvailable || "");

  const data1 = useSelector((state) => state.agency.agencyData);
  // Function to handle form submission
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found in localStorage");
        return; // Exit early if token is not found
      }

      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      const hotelId = decodedToken.id;

      const response = await fetch(
        `http://localhost:9000/agency/${hotelId}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            phoneNumber,
            numberOfVehiclesAvailable,
            location,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user details");
      }

      // Dispatch action to update Redux state
      dispatch(
        updateAgencyDetails({
          name,
          email: data1?.email,
          phoneNumber,
          numberOfVehiclesAvailable,
          location,
        })
      );
      // Handle successful update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded flex flex-col items-center mt-[7rem] ml-[13rem]">
      <h2 className="text-3xl font-semibold mb-6">Edit Profile</h2>
      {/* Form for updating user information */}
      <form onSubmit={handleSubmit}>
        <div className="flex gap-6">
          <div>
            {/* Name input */}
            <div className="w-96 ml-6 p-3 flex flex-col justify-between form-group">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                className="border p-2 rounded-md"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email input */}
            <div className="w-96 ml-6 p-3 flex flex-col justify-between form-group">
              <label htmlFor="location" className="font-semibold">
                Location
              </label>
              <input
                className="border p-2 rounded-md"
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location"
                required
              />
            </div>
          </div>
          <div>
            <div className="w-96 ml-6 p-3 flex flex-col justify-between form-group">
              <label htmlFor="phoneNumber" className="font-semibold">
                Contact Number
              </label>
              <input
                className="border p-2 rounded-md"
                type="tel" // Use type "tel" for phone numbers
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your contact no."
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}" // Example pattern for XXX-XXX-XXXX format
                required
              />
            </div>
            {/* No of rooms input */}
            <div className="w-96 ml-6 p-3 flex flex-col justify-between form-group">
              <label htmlFor="vehicles" className="font-semibold">
                Vehicles
              </label>
              <input
                type="number"
                className="border p-2 rounded-md"
                id="numberOfVehiclesAvailable"
                value={numberOfVehiclesAvailable}
                onChange={(e) => setNumberOfVehiclesAvailable(e.target.value)}
                placeholder="Enter the number of vehicles"
                min="10"
                required
              />
            </div>
          </div>
        </div>
        {/* Submit button */}
        <div className="ml-[22rem] p-3">
          <button
            className="border p-3 rounded-md bg-[#4B6F44] text-white border-none hover:opacity-80 transition ease-in-out duration-700"
            type="submit"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default HotelUpdate;
