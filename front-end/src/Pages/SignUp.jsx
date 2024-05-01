import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import "../CSS/Signin.css";
import validateForm from "./validateForm";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { backendurl } from "../backendurl";

const SignUpComp = () => {
  

  // const handleCheckboxChange = () => {
  //   setShowPassword(!showPassword);
  // };
 const navigate = useNavigate(); // Use navigate function from useNavigate hook

  // State for form data and error message
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationError = validateForm(
      formData.name,
      formData.email,
      formData.phoneNumber,
      formData.password,
      formData.address
    );

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    // Submit form data to backend for user registration
    try {
      const response = await fetch(backendurl+"/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      // User registered successfully, redirect to signin page
      navigate("/signin");
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  // Function to handle input field changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <>
      <div className="sign_body">
        <Link to="/">
          {" "}
          <IoArrowBack className="absolute mt-5 ml-5 font-bold text-4xl text-white bg-black  rounded-3xl" />
        </Link>
        <div className="signuppage_card"></div>
        <div className="cont s--signup">
          <div className="img">
            <div className="img__text m--in">
              <h3>If you already have an account, just sign in.</h3>
            </div>
            <div className="btn_2">
              <Link to={"/signin"}>
                <button type="button" className="submit_btn2">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form sign-up">
              <h2 className="head_h2">Create your Account</h2>
              <label className="label_s">
                <input
                  className="input_s"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>

              <label className="label_s">
                <input
                  className="input_s"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label className="label_s">
                <input
                  className="input_s"
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </label>
              <label className="label_s">
                <input
                  className="input_s"
                  // type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {/* <input
                  type="checkbox"
                  name="checkbox"
                  id="check"
                  className="check2 mt-8"
                  onChange={handleCheckboxChange}
                /> */}
              </label>
              <label className="label_s">
                <input
                  className="input_s"
                  // type={showPassword ? "text" : "password"}
                  placeholder="confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                {/* <input
                  type="checkbox"
                  name="checkbox"
                  id="check"
                  className="check2 mt-8"
                  onChange={handleCheckboxChange}
                /> */}
              </label>
              <label className="label_s">
                <input
                  className="input_s"
                  type="text"
                  placeholder="(Address, pincode, state)"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </label>

              <button type="submit" className="submit_btn button-30">
                Sign Up
              </button>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpComp;
