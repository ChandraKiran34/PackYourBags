import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setBooking } from "../features/booking/BookingSlice";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { backendurl } from "../backendurl";
const FakePaymentForm = () => {
  const dispatch = useDispatch();
  const { id, name } = useParams();
  const [bookingData, setBookingData] = useState({
    hotel: "",
    guide: "",
    agency: "",
    numberOfPersons: 1,
    location: name.split(",")[0].trim(), // Add location to the bookingData
  });

  const [paymentStatus, setPaymentStatus] = useState("booked");
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    password: "",
  });

  const [agencies, setAgencies] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [guides, setGuides] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    // Fetch agencies based on location
    
    // const fetchAutoFillData = async () => {
    //   const response = await axios
    //     .get(`http://localhost:9000/trips/autofilldata/${bookingData.location}`)
    //     .then((res) => {
    //       console.log(res);
    //       setHotels(res.data.hotels);
    //       setAgencies(res.data.agencies);
    //       setGuides(res.data.guides);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };
    const token = localStorage.getItem("token");
    if(!token)
    {
      alert('Sign in required to make a booking')
      nav('/signin');
      return;
    }
    const fetchAutoFillData = async () => {
      try {
        const response = await fetch(`${backendurl}/trips/autofilldata/${bookingData.location}`,{
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setHotels(data.hotels);
        setAgencies(data.agencies);
        setGuides(data.guides);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    

    fetchAutoFillData();
  }, [bookingData.location]);

  const handleBookingChange = (field, value) => {
    setBookingData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentData((prevData) => ({ ...prevData, [field]: value }));
  };

  const calculateTotalAmount = () => {
    const baseAmount = 5000;
    const totalAmount = baseAmount * bookingData.numberOfPersons;
    return totalAmount;
  };

  const handleHomeClick = () => nav("/");
  const handleDashboardClick = () => nav("/userdashboard");

  const handleProceed = async () => {
    try {
      const token = localStorage.getItem("token");

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      // Create trip details
      const tripData = {
        travellerId: userId,
        hotelId:
          hotels.find((hotel) => hotel.name === bookingData.hotel)?._id || null,

        guideId:
          guides.find((guide) => guide.name === bookingData.guide)?._id || null,

        agencyId:
          agencies.find((agency) => agency.name === bookingData.agency)?._id ||
          null,
          destinationId: id,
        // numberOfPersons: bookingData.numberOfPersons,
        // location: bookingData.location,

        // user: user.uid, // Assuming you have the user's unique ID available
        // totalPrice: calculateTotalAmount(),
        status: paymentStatus,
        timestamp: new Date(),
      };
      console.log(tripData)

      // Send trip data to backend to store in database
      const response = await fetch(backendurl+"/trips/createTrip", {
        method: 'POST', // Specify the method as POST
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Specify the content type of the request body
        },
        body: JSON.stringify(tripData),
      });
      console.log("Trip created successfully:", response);

      // Dispatch action to update booking state
      dispatch(setBooking(bookingData));

      // Reset payment status and data
      setPaymentStatus("success");
      setPaymentData({
        cardNumber: "",
        password: "",
      });

      // Redirect to payment success page or user dashboard
      nav("/paymentform/tourdetails");
    } catch (error) {
      console.error("Error creating trip:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  // const handleProceed = async () => {
  //   try {
  //     // Get the details of the logged-in user
  //     let currentUser = null;
  //     if (role === "user") {
  //       currentUser = { email: userData.email /* add other user details if needed */ };
  //     } else {
  //       // Fetch details from Redux or Firebase based on your implementation
  //       // ...

  //       // For demonstration, let's assume you have user details in Redux
  //       currentUser = userData; // Update with your actual Redux state structure
  //     }

  //     // Store booking details in the "bookings" collection
  //     const bookingsCollection = collection(db, "bookings");
  //     const newBooking = {
  //       ...bookingData,
  //       user: currentUser,
  //       totalPrice: calculateTotalAmount(),
  //       paymentStatus,
  //       paymentData,
  //       timestamp: serverTimestamp(),
  //     };
  //     const docRef = await addDoc(bookingsCollection, newBooking);

  //     setPaymentStatus("success");
  //     console.log("Booking stored with ID: ", docRef.id);

  //     dispatch(setBooking(bookingData))
  //     // For demonstration purposes, you can replace the following line with your navigation logic.
  //     alert("Payment successful! Redirecting to user dashboard.");

  //       nav('/paymentform/tourdetails');
  //   } catch (error) {
  //     console.error("Error storing booking details:", error);
  //   }
  // };

  return (
    <div className="max-w-[50vw] mx-auto p-8 pl-[5rem] pr-[5rem] mt-[4rem] bg-[#4ea7fb] shadow-inner rounded-md">
      <h1 className="text-black font-bold text-3xl ml-[12rem] mb-[3rem] underline-offset-2">
        Payment form
      </h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#141a15]">
          Choose Your Hotel
        </label>
        <select
          className="mt-1 p-2 border rounded-md w-full"
          onChange={(e) => handleBookingChange("hotel", e.target.value)}
        >
          <option value="">Select Hotel</option>
          {hotels?.map((hotel) => (
            <option key={hotel._id} value={hotel.name}>
              {hotel.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[#141a15]">
          Choose Your Guide
        </label>
        <select
          className="mt-1 p-2 border rounded-md w-full"
          onChange={(e) => handleBookingChange("guide", e.target.value)}
        >
          <option value="">Select Guide</option>
          {guides?.map((guide) => (
            <option key={guide._id} value={guide.name}>
              {guide.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[#141a15]">
          Choose Your Travel Agency
        </label>
        <select
          className="mt-1 p-2 border rounded-md w-full"
          onChange={(e) => handleBookingChange("agency", e.target.value)}
        >
          <option value="">Select Travel Agency</option>
          {agencies?.map((agency) => (
            <option key={agency._id} value={agency.name}>
              {agency.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[#141a15]">
          Number of Persons
        </label>
        <input
          type="number"
          min="1"
          max="4"
          value={bookingData.numberOfPersons}
          onChange={(e) =>
            handleBookingChange("numberOfPersons", e.target.value)
          }
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[#141a15]">
          Total Amount
        </label>
        <p className="mt-1 font-semibold">{calculateTotalAmount()} INR</p>
      </div>

      <hr className="my-4 border-t" />

      <div className="mb-4">
        <label className="block text-sm font-medium text-[#141a15]">
          Card Number
        </label>
        <input
          type="text"
          maxLength="12"
          value={paymentData.cardNumber}
          onChange={(e) => handlePaymentChange("cardNumber", e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[#141a15]">
          Password
        </label>
        <input
          type="password"
          value={paymentData.password}
          onChange={(e) => handlePaymentChange("password", e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div>
        <button
          className="px-4 py-2  flex justify-center items-center ml-[13rem] mt-[2rem] bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={handleProceed}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default FakePaymentForm;
