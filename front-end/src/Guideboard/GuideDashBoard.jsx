import React, {useState} from 'react'
import NavigationBar from './NavigationBar'
import { Routes, Route } from 'react-router-dom';
import GuideHome from './GuideHome';
import GuideBooking from './GuideBooking';
import GuideUpdate from './GuideUpdate';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { setGuide } from '../features/guide/GuideSlice';
import { backendurl } from '../backendurl';
function GuideDashBoard() {
  const [data, setData] = useState({})
  const dispatch = useDispatch()
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
        const guideId = decodedToken.userId;

        const response = await fetch(
          `${backendurl}/guide/${guideId}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,// Include the token in the Authorization header
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const userData = await response.json();
        console.log(userData);
        dispatch(setGuide({guide:userData,token}))
        setData(userData);
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);
  const [expanded, setExpanded] = useState(true);
  return (
    <div className='flex'>
      <NavigationBar isExpanded={expanded} setIsExpanded={setExpanded} />
      <Routes>
        <Route path="/" element={<GuideHome />} />
        <Route path="bookings" element={<GuideBooking />} />
        <Route path="updateprofile" element={<GuideUpdate />} />
        {/* Add more nested routes as needed */}
      </Routes>
    </div>
  )
}

export default GuideDashBoard
