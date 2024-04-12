// App.js
import React, { Children } from "react";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import PlanTour from "./Pages/PlanTour";
import Join from "./Pages/Join";
import Contact from "./Pages/Contact";
import "./App.css";
import UserDashBoard from "./Userboard/UserDashBoard";
import GuideDashBoard from "./Guideboard/GuideDashBoard";
import HotelDashBoard from "./Hotelboard/HotelDashBoard";
import AgencyDashBoard from "./Agencyboard/AgencyDashBoard";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import GuideRegister from "./Pages/GuideRegister";
import HotelRegister from "./Pages/HotelRegister";
import AgencyRegister from "./Pages/HotelRegister";
import AboutUs from "./Pages/AboutUs";
import AdminDashBoard from "./Admin/AdminDashBoard";
import { AuthContexts } from "./FireBase/AuthContexts";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import PlaceDescreption from "./Pages/PlaceDescription";
import FakePaymentForm from "./Pages/FakePaymentForm";
import BookingDetailsCard from "./Pages/BookingDetailsCard";
import GuideSignUp from "./Pages/GuideSignUp";
import GuideSignIn from "./Pages/GuideSignIn";
import HotelSignUpComp from "./Pages/HotelSignUp";
import HotelSignIn from "./Pages/HotelSignIn";
import AgencySignUp from "./Pages/AgencySignUp";
import AgencySignIn from "./Pages/AgencySignIn";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/plantour",
    element: <PlanTour />,
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/guidesignup",
    element: <GuideSignUp />,
  },
  {
    path: "/guidesignin",
    element: <GuideSignIn />,
  },
  {
    path: "/hotelsignup",
    element: <HotelSignUpComp />,
  },
  {
    path: "/hotelsignin",
    element: <HotelSignIn />,
  },
  {
    path: "/agencysignup",
    element: <AgencySignUp />,
  },
  {
    path: "/agencysignin",
    element: <AgencySignIn />,
  },
  {
    path: "/userdashboard/*",
    element: (
      <PrivateRoute role={"user"}>
        <UserDashBoard />
      </PrivateRoute>
    ),
  },
  {
    path: "/guidedashboard/*",
    element: (
      <PrivateRoute role={"guide"}>
        <GuideDashBoard />
      </PrivateRoute>
    ),
  },
  {
    path: "/hoteldashboard/*",
    element: (
      <PrivateRoute role={"hotel"}>
        <HotelDashBoard />
      </PrivateRoute>
    ),
  },
  {
    path: "/agencydashboard/*",
    element: (
      <PrivateRoute role={"agency"}>
        <AgencyDashBoard />
      </PrivateRoute>
    ),
  },

  {
    path: "/admindashboard/*",
    element: <AdminDashBoard />,
  },

  {
    path: "/guideregister",
    element: <GuideRegister />,
  },

  {
    path: "/place/:id/:name", // Use :id as a parameter in the path
    element: <PlaceDescreption />,
  },

  {
    path: "/paymentform/:id/:name", // Use :id as a parameter in the path
    element: <FakePaymentForm />,
  },
  {
    path: "/paymentform/tourdetails",
    element: <BookingDetailsCard />,
  },
]);

function App() {
  return (
    <AuthContexts>
      <RouterProvider router={Router} />
    </AuthContexts>
  );
}

export default App;
