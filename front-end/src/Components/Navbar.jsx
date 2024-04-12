import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "../CSS/Navbar.module.css";
import { FaPerson, FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../features/user/UserSlice";
import { jwtDecode } from "jwt-decode";
const Navbar = () => {
  const [show, setShow] = useState(false);
  // const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);

  let role = "";

  if (token) {
    const decodedToken = jwtDecode(token);
    role = decodedToken.role;
  }

  const controlNavbar = () => {
    if (window.scrollY > 40) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      dispatch(clearUser());
      navigate("/signIn");
    } catch (error) {
      // console.log(error);
    }
  };
  console.log(role);
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);
  return (
    <nav className={classes.nav + " " + (show && classes.hidden)}>
      <Link to="/">
        <h1 className={classes["nav-h1"]} style={{ color: "white" }}>
          Pack{" "}
          <span
            style={{
              color: "#2A5AFF",
              fontWeight: "200",
              fontSize: "2rem",
              letterSpacing: "-0.1rem",
            }}
          >
            Your Bags
          </span>
        </h1>
      </Link>
      <ul className={classes["nav-ul"]}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/plantour">Plan Tour</Link>
        </li>
        {role !== "user" && (
          <li>
            <Link to="/join">Join</Link>
          </li>
        )}

        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          {token ? (
            <li className={classes.dropdown}>
              <span className={classes.dropdownLink} style={{ color: "white" }}>
                <FaUser />
              </span>
              {token && (
                <div className={classes.dropdownContent}>
                  <Link to="/userdashboard">Dashboard</Link>
                  <span onClick={handleLogout}>Logout</span>
                </div>
              )}
            </li>
          ) : (
            <Link to="/signin">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
