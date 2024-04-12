// UserHome.js

import React, { useState,useEffect } from "react";
import mussoorie from "../Assets/Mussoorie.jpg";
import tuticorin from "../Assets/Tuticorin.jpg";
import hampi from "../Assets/Hampi.jpg";
import { Link } from "react-router-dom";
import { FaEdit, FaLocationArrow, FaVoicemail } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaLocationCrosshairs, FaNoteSticky } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
function GuideHome() {
  // Assume you have user information, you can replace this with actual data
  // const userData = useSelector((state) => state.guide.data);
  const [loading, setLoading] = useState(false);
  const {guideData, token} = useSelector(state => state.guide)
  console.log(guideData)
  const [data, setData] = useState({})

  useEffect(()=>{
    setData(guideData)
    console.log(guideData?.email)
  }, [guideData])

  // console.log(userData);

  // const [guide, setGuide] = useState({
  //   name: userData?.name,
  //   email: userData?.email,
  //   location: userData.location,
  // });

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

  return (
    <div className="bg-white p-4 rounded ">
      <h2 className="text-2xl font-semibold mb-4">Welcome, {data?.name}!</h2>

      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
          {/* You can add a user profile picture here */}
          {/* <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" /> */}
        </div>

        <div>
          <p className="flex gap-2"><FaLocationArrow className="mt-1"/>{data?.location}</p>
          <p className="flex gap-2"><MdEmail className="mt-1"/>{data?.email}</p>

          {/* Add more user information as needed */}
        </div>
      </div>
      {/* <Link to={`/guidedashboard/updateprofile/${user.id}`} className="mt-4 text-blue-500"></Link> */}
      {/* <Link
        to={"/guidedashboard/updateprofile/"}
        className="mt-4 text-green-700"
      >
        <FaEdit className="ml-5" />
      </Link> */}
      <div>
        <h3 className="text-xl font-bold mt-9 mb-4">Top Rated Places</h3>
        <div className="grid grid-cols-3 gap-1">
          {topRatedPlaces.map((place, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded shadow">
              {/* Place Image */}
              <img src={place.image} className="mb-2 rounded-md" />

              {/* Place Details */}
              <h4 className="text-lg font-bold mb-2">{place.title}</h4>
              <p className="text-gray-600">{place.description}</p>
              {/* Add more details or customize as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GuideHome;
