import React from "react";
import { useState } from "react";
import "../CSS/Contact.css";
import Chat from "../Assets/chat.png";
import { FaPhone } from "react-icons/fa6";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <>
    <Navbar />
    <h1 className=" text-2xl font-bold" style={{display:"flex",justifyContent:"center",marginTop:"1.5rem"}}>GET IN TOUCH WITH US</h1>1
      <div className="contact-container">
        <div className="contact-info">
          <img src={Chat} className="contact-image" alt="communication text"/>
          <div className="contact-form">
            <div>
              <h4>Name</h4>
              <input
                type="text"
                name="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <h4>Email</h4>
              <input
                type="text"
                name="contact-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

    
            <div>
              <h4>Message</h4>
              <textarea
                type="text"
                name="contact-email"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your email"
                rows="5"
              ></textarea>
            </div>
            <button>Send Message</button>
          </div>
        </div>
      </div>
      <div className="contact-cardContainer">
        <div className="card-contact">
          <div className="card-icon">
            <FaPhone />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h4>Mobile</h4>
            <p>+91 949-433-9653</p>
          </div>
        </div>
        <div className="card-contact">
          <div className="card-icon">
            <FaMapLocationDot />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h4>Address</h4>
            <p>IIIT Sricity,630 Gyan marg </p>
          </div>
        </div>
        <div className="card-contact">
          <div className="card-icon">
            <IoMailOpenOutline />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h4>Email</h4>
            <p>info@pkybags.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
