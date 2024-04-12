import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from "../features/user/UserSlice";
import { jwtDecode } from 'jwt-decode'
function GuideUpdate() {
  // Get user data and token from Redux store
  const { userData, token } = useSelector(state => state.user);
  const dispatch = useDispatch();
  // Use state to manage form input values
  const [name, setName] = useState(userData?.name || ''); // Initialize with user's name
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || ''); // Initialize with user's phone number
  const [address, setAddress] = useState(userData?.address || ''); // Initialize with user's address
  const [language, setLanguage] = useState('Hindi,Telugu'); // Initialize with user's language


  const data1 = useSelector(state => state.user.userData)
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
      const travellerId = decodedToken.userId;
      
      const response = await fetch(`http://localhost:9000/auth/${travellerId}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, phoneNumber, address})
      });
      if (!response.ok) {
        throw new Error("Failed to update user details");
      }

         // Dispatch action to update Redux state
    dispatch(updateUserDetails({ name,email:data1?.email, phoneNumber, address}));
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
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your contact no."
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your location"
                required
              />
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
          <button className="border p-3 rounded-md bg-[#2a5aff] text-white border-none hover:opacity-80 transition ease-in-out duration-700" type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
}

export default GuideUpdate;
