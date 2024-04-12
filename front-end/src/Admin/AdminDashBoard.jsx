import {useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";
import AdminUser from "./AdminUser";
import Home from "../Pages/Home";
import SideBar from "./SideBar";
import AdminHome from "./AdminHome";
import AdminBookingList from "./AdminBookingList";
import AdminGuides from "./AdminGuides";
import AdminAgency from "./AdminAgencies";
import AdminHotels from "./AdminHotels";
import AdminReviews from "./AdminReviews";
import AddPlace from "./AddPlace";
function AdminDashBoard() {
 
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="flex">
      <SideBar isExpanded={expanded} setIsExpanded={setExpanded} />
      <div className={expanded ? "max-w-[85vw]" : "max-w-[95vw]"}>
        <Routes>
          <Route path="/" element={<AdminHome />}></Route>
          <Route path="users" element={<AdminUser />} />
          <Route path="guides" element={<AdminGuides/>} />
          <Route path="hotels" element={<AdminHotels/>} />
          <Route path="agencies" element={<AdminAgency/>} />
          <Route path="reviews" element={<AdminReviews/>} />
          <Route path="logout" element={<Home />} />
          <Route path="addPlace" element={<AddPlace />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashBoard;
