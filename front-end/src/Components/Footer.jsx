import React from 'react';

import '../CSS/Footer.css'

import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <h1>PackYourBags</h1>
          <p style={{lineHeight:"35px"}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet voluptates maiores nam vitae iusto. Placeat rem sint voluptas natus exercitationem autem quod neque, odit laudantium reiciendis ipsa suscipit veritatis voluptate.
          </p>
        </div>

        <div className='social-media'>
          <h2>Follow us on:</h2>
          <ul className="social-links ">
            <li>
              <a href='https://www.iiits.ac.in/'>
                <FaFacebook  style={{color:"#2175fe"}}/>
              </a>
            </li>
            <li>
              <a href='https://www.iiits.ac.in/' >
                <FaXTwitter  style={{backgroundColor:"black",color:"white"}}/>
              </a>
            </li>
            <li>
              <a href='https://www.iiits.ac.in/'>
                <FaSquareInstagram style={{color: "rgb(149, 44, 152)"}}/>
              </a>
            </li>
            <li>
              <a href='https://www.iiits.ac.in/'>
                <FaYoutube style={{color:"ff0000",}} />
              </a>
            </li>
          </ul>
        </div>

        <div className='popular-places'>
          <h2>Popular Places:</h2>
          <ul >
            <li><a href='https://www.iiits.ac.in/'>Ooty</a></li>
            <li><a href='https://www.iiits.ac.in/'>Tirupati</a></li>
            <li><a href='https://www.iiits.ac.in/'>Hyderabad</a></li>
            <li><a href='https://www.iiits.ac.in/'>Kanyakumari</a></li>
            <li><a href='https://www.iiits.ac.in/'>Thiruvananthapuram</a></li>
          </ul>
        </div>

        <div>
          <h2>Subscribe for Notifications</h2>
          <form className="subscribe-form">
            <input type="email" placeholder="Enter Email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



