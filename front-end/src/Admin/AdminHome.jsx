import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import guides from "../AboutUs/Resources/travelguide.png";
import some from "../AboutUs/Resources/people.png";
import hotel from "../AboutUs/Resources/hotel.png";
import travels from "../AboutUs/Resources/travelling.png";
import AdminBookingList from "./AdminBookingList";
import { collection, getDocs, query, where } from "firebase/firestore";
import axios from "axios";
import { db } from "../FireBase/config";
function AdminHome() {
  // const [userData1, setData1] = useState();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchAllDetails() {
      try {
        const response = await axios.get('http://localhost:9000/admin/getDetails'); // Assuming your backend API endpoint is '/api/getAllDetails'
        // const {users,guides,hotels,agencies} = await response.data;
        setUserData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    fetchAllDetails();
  }, []);

  // const [userData2, setData2] = useState();

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const q = query(collection(db, "users"), where("role", "==", "guide"));

  //       const res = await getDocs(q);
  //       if (res.docs.length != 0) {
  //         const data = res.docs.map((doc, id) => ({
  //           ...doc.data(),
  //           id: doc.id,
  //         }));
  //         setData2(data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetch();
  // }, []);

  // const [userData3, setData3] = useState();

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const q = query(collection(db, "users"), where("role", "==", "agency"));

  //       const res = await getDocs(q);
  //       if (res.docs.length != 0) {
  //         const data = res.docs.map((doc, id) => ({
  //           ...doc.data(),
  //           id: doc.id,
  //         }));
  //         setData3(data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetch();
  // }, []);

  // const [userData4, setData4] = useState();

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const q = query(collection(db, "users"), where("role", "==", "hotel"));

  //       const res = await getDocs(q);
  //       if (res.docs.length != 0) {
  //         const data = res.docs.map((doc, id) => ({
  //           ...doc.data(),
  //           id: doc.id,
  //         }));
  //         setData4(data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetch();
  // }, []);






  

  return (
    <div className="p-4">
      <h1 className="font-bold text-3xl pb-3 mt-3 ">Welcome Admin,</h1>
      <h2 className="text-xl">Customer Analytics :</h2>
      <div className="flex mt-[1rem]">
        <Link to="/admindashboard/users">
          <div className="border flex items-center  p-1 justify-center flex-col gap-2 hover:shadow-lg">
            <img src={some} alt="people" className="w-[20%] " />
            <h1 className="font-bold"> Travellers </h1>
            <p>{userData?.users.length}</p>
          </div>
        </Link>
        <Link to="/admindashboard/guides">
          <div className="border flex items-center justify-center flex-col gap-2 hover:shadow-lg">
            <img src={guides} alt="guides" className="w-[20%]" />
            <h1 className="font-bold"> Guides </h1>
            <p>{userData?.guides.length}</p>
          </div>
        </Link>
        <Link to="/admindashboard/hotels">
          <div className="border flex items-center justify-center flex-col gap-2 hover:shadow-lg">
            <img src={hotel} alt="hotels" className="w-[20%]" />
            <h1 className="font-bold"> Hotels </h1>
            <p>{userData?.hotels.length}</p>
          </div>
        </Link>
        <Link to="/admindashboard/agencies">
          <div className="border flex items-center justify-center flex-col gap-2 hover:shadow-lg">
            <img src={travels} alt="travels" className="w-[20%]" />
            <h1 className="font-bold"> Travels </h1>
            <p>{userData?.agencies.length}</p>
          </div>
        </Link>
      </div>
      <div className="pt-5">
        <AdminBookingList />
      </div>
    </div>
  );
}

export default AdminHome;
