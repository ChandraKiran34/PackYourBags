import React from 'react';
import "./Styles/AboutUsServices.css";
import  hotel from "../AboutUs/Resources/hotel.png"
import  travels from "../AboutUs/Resources/travelling.png"
import  guides from "../AboutUs/Resources/travelguide.png"
import  some from "../AboutUs/Resources/people.png"
import {motion} from 'framer-motion'
import { useInView } from "react-intersection-observer";
const AboutUsServices = () => {

  const [ref,inView] = useInView({triggerOnce:true})



  const services = [
      { id: 1, name: 'Hotel', image: hotel },
    { id: 2, name: 'Travels', image: travels },
    { id: 3, name: 'Guides', image: guides },
    { id: 4, name: 'AddSomething', image: some },
    // Add more services as needed
  ];

  return (
    <div className="aboutus-services">




<motion.div
    initial={{x:-100, opacity:0}} 
    animate={inView ? {x:0, opacity:1} : "hidden"} 
    ref={ref}
    transition={{ease:"easeIn",duration: 0.5, delay:0.3}}
    
     className="services">
        {services.map((service) => (
          <div className="services-items" key={service.id}>
            <img src={service.image} alt={service.name} />
            <h3>{service.name}</h3>
          </div>
        ))}
      </motion.div>

      <div className="services-right">

        <h1 >Our Services</h1>
       

     <p>
     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
     </p>
      </div>
    </div>
  );
};

export default AboutUsServices;
