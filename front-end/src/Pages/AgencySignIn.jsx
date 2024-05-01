import React, { useState } from "react";
import "../CSS/Signin.css"; // Import your CSS file
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useAuth } from "../FireBase/AuthContexts";
import { backendurl } from "../backendurl";
const AgencySignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  // const { role, signIn } = useAuth();

  // if (role == 'agency') {
  //   nav("/agencyDashboard");
  // }

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(backendurl + "/agency/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate user");
      }

      const { user, token } = await response.json();
      console.log(user);
      // dispatch(setUser({
      //   user,token
      // }));
      // You can store the token in localStorage or session storage for further use
      localStorage.setItem("token", token);
      navigate("/agencyDashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="sign_body">
      <Link to="/">
        {" "}
        <IoArrowBack className="absolute mt-5 ml-5 font-bold text-4xl text-white bg-black  rounded-3xl" />
      </Link>
      <div className="signuppage_card"></div>

      <div className="cont">
        <form className="form sign-in" onSubmit={loginUser}>
          <h2 className="head_h2">Welcome</h2>
          <label className="label_s">
            <input
              name="email"
              className="input_s"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="label_s">
            <input
              name="password"
              className="input_s"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="show-password">
            <input
              type="checkbox"
              name="checkbox1"
              id="check"
              className="check1 mt-[23px] mr-[10px]"
              onChange={handleCheckboxChange}
            />
            <label className="label_s check" htmlFor="check">
              Show Password
            </label>
          </div>
          <br />

          <button type="submit" className="submit_btn button-30">
            Sign In
          </button>
        </form>
        <Link to={"/forgotpassword"}>
          <p className="forgot-pass">Forgot password?</p>
        </Link>
        <div className="img">
          <div className="img__text m--up">
            <h3>Don't have an account? Please Sign up!</h3>
          </div>
          <div className="btn_2">
            <Link to={"/agencysignup"}>
              <button type="button" className="submit_btn2 ">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencySignIn;
