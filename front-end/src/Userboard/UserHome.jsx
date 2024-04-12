import React, { useState, useEffect } from "react";
import mussoorie from "../Assets/Mussoorie.jpg";
import tuticorin from "../Assets/Tuticorin.jpg";
import hampi from "../Assets/Hampi.jpg";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { jwtDecode } from 'jwt-decode'
function UserHome() {
  const [loading, setLoading] = useState(false);
  const {userData, token} = useSelector(state => state.user)
  const [data, setData] = useState({})

  // const token = localStorage.getItem("token");
  //       if (token) {
  //         const decodedToken = jwtDecode(token);
  //         console.log(decodedToken)
  //         // Assuming the user ID is stored in the token payload under the key "userId"
          
  //         // console.log("User ID:", userId);
  //       } else {

  //         console.log("Token not found in localStorage");
  //       }

  useEffect(()=>{
    setData(userData)
    console.log(userData?.email)
  }, [userData])
  
// useEffect(() => {
//   const fetchUserDetails = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.log("Token not found in localStorage");
//         return; // Exit early if token is not found
//       }

//       const decodedToken = jwtDecode(token);
//       console.log(decodedToken)
//       const travellerId = decodedToken.userId;

//       const response = await fetch(`http://localhost:9000/auth/${travellerId}/dashboard`, {
//         headers: {
//           Authorization: `Bearer ${token}` // Include the token in the Authorization header
//         }
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch user details");
//       }

//       const userData = await response.json();
//       setData(userData);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   fetchUserDetails();
// }, []);


  const topRatedPlaces = [
    {
      id: 1,
      title: "Hampi",
      state: "Karnataka",
      description:
        "Residing place of the almighty Lord venkateswara an extremely nice place to have a spiritual experience with god ",
      spots:
        "Venkateswara swamy temple,varaha swamy temple,akasha ganga,zoo,Alipiri museum",
      image: hampi,
    },
    {
      id: 2,
      title: "Tuticorin",
      state: "kerala",
      description:
        "Famous for being one of the most exotic places to visit in Tamil Nadu, Kanyakumari is a paradise for experience-seekers",
      spots:
        "Vivekananda Rock Memorial, Kanyakumari Beach, Sarvani Shaktipeeth Shri Bhagavathy Temple, Mahatma Gandhi Mandapam",
      image: tuticorin,
    },
    {
      id: 3,
      title: "Mussoorie",
      state: "Uttarakhand",
      description:
        "Famous for being one of the most exotic places to visit in Tamil Nadu, Kanyakumari is a paradise for experience-seekers",
      spots:
        "Vivekananda Rock Memorial, Kanyakumari Beach, Sarvani Shaktipeeth Shri Bhagavathy Temple, Mahatma Gandhi Mandapam",
      image: mussoorie,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded">
      <h2 className="text-2xl font-semibold mb-4">Welcome, {data?.name}!</h2>

      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden"></div>

        <div>
          <p className="text-lg font-semibold">{data?.name}</p>
          <p className="text-gray-600">{data?.email}</p>
          <p>~~Traveller</p>
        </div>
      </div>
      <Link to={"/userdashboard/updateprofile/"} className="mt-4 text-blue-500">
        <FaEdit />
      </Link>
      <div>
        <h3 className="text-xl font-bold mt-9 mb-4">Top Rated Places</h3>
        <div className="grid grid-cols-3 gap-1">
          {topRatedPlaces.map((place, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded shadow">
              <img src={place.image} className="mb-2 rounded-md" />
              <h4 className="text-lg font-bold mb-2">{place.title}</h4>
              <p className="text-gray-600">{place.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    // <p>{data.name}</p>
  );
}

export default UserHome;
