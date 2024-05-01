import React, {useState,useEffect} from 'react'
import NavigationBar from './NavigationBar'
import { Routes, Route } from 'react-router-dom';
import AgencyHome from './AgencyHome';
import AgencyBooking from './AgencyBooking';
import AgencyUpdate from './AgencyUpdate';
import { setAgency } from "../features/agency/AgencySlice.js";
import { useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode'
import { backendurl } from '../backendurl.js';
function AgencyDashBoard() {
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
        const agencyId = decodedToken.id;
        
        const response = await fetch(
          `${backendurl}/agency/${agencyId}/dashboard`,
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
        dispatch(setAgency({agency:userData,token}))
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
        <Route path="/" element={<AgencyHome />} />
        <Route path="bookings" element={<AgencyBooking />} />
        <Route path="updateprofile" element={<AgencyUpdate />} />
        {/* Add more nested routes as needed */}
      </Routes>
    </div>
  )
}

export default AgencyDashBoard
