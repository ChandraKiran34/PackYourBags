import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Register.css"; // Import your CSS file
import validateForm from "./validateForm";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        num_vehicles: "",
        location: "",
    });

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateForm(
            formData.name,
            formData.email,
            formData.phoneNumber,
            formData.password,
            formData.location,
            formData.num_vehicles
        );

        if (validationError) {
            setErrorMessage(validationError);
            // setmessage(validationError);
        } else {
            // Form submission logic goes here
            alert("Form submitted successfully!");
            console.log("Form Data:", formData);
            // Redirect to home page ('/')
            navigate("/signin");
        }
    };

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
                            <h2 className="head_h2">Join US</h2>
                            <label className="label_s">
                                <input
                                    className="input_s"
                                    type="text"
                                    placeholder="Hotel Name"
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
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="checkbox"
                                    name="checkbox"
                                    id="check"
                                    className="check2 mt-8"
                                    onChange={handleCheckboxChange}
                                />
                            </label>
                            <label className="label_s">
                                <input
                                    className="input_s"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="confirm Password"
                                    name="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="checkbox"
                                    name="checkbox"
                                    id="check"
                                    className="check2 mt-8"
                                    onChange={handleCheckboxChange}
                                />
                            </label>
                            <label className="label_s">
                                <input
                                    className="input_s"
                                    type="number"
                                    placeholder="Total no. of vehicles"
                                    name="num_vehicles"
                                    min="10"
                                    value={formData.num_vehicles}
                                    onChange={handleInputChange}
                                />
                            </label>

                            <label className="label_s">
                                <select
                                    className="dropdown_s"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select your location</option>
                                    <option value="city1">City 1</option>
                                    <option value="city2">City 2</option>
                                    <option value="city3">City 3</option>
                                    {/* Add more options as needed */}
                                </select>
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

export default SignUp;
