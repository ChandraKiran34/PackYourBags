// GuideUpdate.js

import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux';
import {updateGuideDetails} from '../features/guide/GuideSlice'
import {jwtDecode} from 'jwt-decode';
function GuideUpdate() {
  const { guideData, token } = useSelector(state => state.guide);
  // Use state to manage form input values
  const [name, setName] = useState(guideData?.name || ''); // Initialize with user's name
  const [phoneNumber, setPhoneNumber] = useState(guideData?.phoneNumber || ''); // Initialize with user's phone number
  const [location, setLocation] = useState(guideData?.location || ''); // Initialize with user's address
  const [language, setLanguage] = useState('Hindi,Telugu,English'); // Initialize with user's language


  const dispatch = useDispatch();

  const data1 = useSelector(state => state.guide.guideData)
  

  console.log(guideData);

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
      console.log(decodedToken)
      const guideId = decodedToken.userId;
      
      const response = await fetch(`http://localhost:9000/guide/${guideId}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, phoneNumber, location})
      });
      if (!response.ok) {
        throw new Error("Failed to update user details");
      }

         // Dispatch action to update Redux state
    dispatch(updateGuideDetails({ name,email:data1?.email, phoneNumber, location}));
      // Handle successful update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-6">Edit Profile</h2>
      {/* Form for updating user information */}
      <form onSubmit={handleSubmit}>
        <div className='flex gap-6'> 
          <div>
            {/* Name input */}
            <div className="w-96 ml-6 p-3 flex flex-col justify-between form-group">
              <label htmlFor="name" className="font-semibold">Name</label>
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

            <div className="w-96 ml-6 p-3 flex flex-col justify-between form-group">
              <label htmlFor="phoneNumber" className="font-semibold">Contact Number</label>
              <input
                className="border p-2 rounded-md"
                type="tel"  // Use type "tel" for phone numbers
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your contact no."
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"  // Example pattern for XXX-XXX-XXXX format
                required
              />
            </div>
          </div>
          <div>
            {/* Location input */}
            <div className="w-96 ml-6 p-3 flex flex-col justify-between form-group">
              <label htmlFor="location" className="font-semibold">Location:</label>
              <input
                className="border p-2 rounded-md"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              >
              </input>
            </div>

            {/* Languages input */}
            <div className="w-96 ml-6 p-3 flex flex-col justify-between form-group">
              <label htmlFor="language" className="font-semibold">Language</label>
              <textarea
                className="border p-2 rounded-md"
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Enter languages you speak"
                required
              />
            </div>
          </div>
        </div>
        {/* Submit button */}
        <div className="ml-[22rem] p-3">
          <button className="border p-3 rounded-md bg-[#4B6F44] text-white border-none hover:opacity-80 transition ease-in-out duration-700 font-semibold" type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
}

export default GuideUpdate;
