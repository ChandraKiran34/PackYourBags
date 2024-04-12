import React from 'react'

import Ab from "../AboutUs/Resources/Ab-pic.png"
import ani1 from "../AboutUs/Resources/ani1.jpg"
import ani2 from "../AboutUs/Resources/ani2.jpg"
import ani3 from "../AboutUs/Resources/ani3.jpg"
import "../AboutUs/Styles/AboutUsTop.css"

const AboutUsTop = () => {
  
  return ( 
    <div className='aboutus-top'>

     <div className='aboutus-left'>  {/* <div style={{ backgroundImage: `url(${Ab})` }} className='about-content'> */}
    <h1>About Us</h1>
    <p>Welcome to <b>Pack your Bags</b>, your gateway to unforgettable adventures and unparalleled travel experiences. Our journey began with a shared passion for exploration and a commitment to sharing the world's wonders with you.
      At our Pack your Bags, we believe in the transformative power of travel. Our dedicated team of professionals, including expert tour guides, creative minds, and customer support enthusiasts, works tirelessly to curate exceptional trips that go beyond ordinary sightseeing. We aim to provide you with immersive experiences that leave lasting memories.
    </p>
    {/* <p>Join us in discovering the beauty of our planet, one destination at a time. Explore, learn, and create cherished memories with us. Welcome to the world of [Your Website Name], where every journey is an opportunity to connect with diverse cultures, explore stunning landscapes, and embrace the thrill of travel.
    </p> */}
  </div>
  <div className='aboutus-right'>

<img src={ani1} alt="" />
<img src={ani2} alt="" />
<img src={ani3} alt="" />
  </div>
    
    </div>
   );
}
 
export default AboutUsTop;
