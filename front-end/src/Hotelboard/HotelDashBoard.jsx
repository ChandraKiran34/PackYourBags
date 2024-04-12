import React, {useState,useEffect} from 'react'
import NavigationBar from './NavigationBar'
import { Routes, Route } from 'react-router-dom';
import HotelHome from './HotelHome';
import HotelBooking from './HotelBooking';
import HotelUpdate from './HotelUpdate';
import { setHotel } from "../features/hotel/HotelSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode'
function HotelDashBoard() {
  const [expanded, setExpanded] = useState(true);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserDetails = async () => {
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
          `http://localhost:9000/hotel/${hotelId}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const userData = await response.json();
        console.log(userData)
        dispatch(setHotel({hotel:userData,token}))
        setData(userData);
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <div className='flex'>
      <NavigationBar isExpanded={expanded} setIsExpanded={setExpanded} />
      <Routes>
        <Route path="/" element={<HotelHome />} />
        <Route path="bookings" element={<HotelBooking />} />
        <Route path="updateprofile" element={<HotelUpdate />} />
        {/* Add more nested routes as needed */}
      </Routes>
    </div>
  )
}

export default HotelDashBoard
