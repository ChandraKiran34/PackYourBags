import React from 'react';
import "./Styles/ServicesCount.css"
import  hotel from "../AboutUs/Resources/hotel.png"
import  travels from "../AboutUs/Resources/travelling.png"
import  guides from "../AboutUs/Resources/travelguide.png"
import {motion} from 'framer-motion'
import { useInView } from "react-intersection-observer";

const ServicesCount = () => {

 


  const [ref,inView] = useInView({triggerOnce:true})
  const serviceCounts = [
    { count: '691+', title: 'Hotels', image: hotel },
    { count: '250+', title: 'Guides', image:guides },
    { count: '120+', title: 'Travel agency', image: travels},
  ];

  return (
    <motion.div
    initial={{x:100, opacity:0}} 
    animate={inView ? {x:0, opacity:1} : "hidden"} 
    ref={ref}
    transition={{ease:"easeIn",duration: 0.5, delay:0.3}}
    
     className="services-count">
      {serviceCounts.map((service, index) => (
        <div className='count-items' key={index}>
          <img src={service.image} alt={service.title} />
          <p>{service.count}</p>
          <h4>{service.title}</h4>
        </div>
      ))}
    </motion.div> 
  );
};

export default ServicesCount;
