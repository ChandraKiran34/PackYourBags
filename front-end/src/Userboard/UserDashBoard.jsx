import React,{useState,useEffect} from "react";
import NavigationBar from "./NavigationBar";
import { Routes, Route } from "react-router-dom";
import UserHome from "./UserHome";
import UserBooking from "./UserBooking";
import UserUpdate from "./UserUpdate";
import UserWish from "./UserWish";
import { setUser } from "../features/user/UserSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode'
function UserDashBoard() {
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
        const travellerId = decodedToken.userId;

        const response = await fetch(
          `http://localhost:9000/auth/${travellerId}/dashboard`,
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
        dispatch(setUser({user:userData,token}))
        setData(userData);
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <div className="flex">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<UserHome  />} />
        <Route path="bookings" element={<UserBooking />} />
        <Route path="updateprofile" element={<UserUpdate />} />
        <Route path="wishlist" element={<UserWish />} />
        {/* Add more nested routes as needed */}
      </Routes>
    </div>
  );
}

export default UserDashBoard;
