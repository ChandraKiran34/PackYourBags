import "./Styles/AboutUsBlog.css"


import video from "../AboutUs/Resources/video button.gif";

const AboutUsBlog = () => {
  return (
    <div className="about-us-img-container">
      <div className="text-container">
        <p>
          Let's Explore The World <br />
          With Our <b>Pack Your Bags</b> 
        </p>
        <button>
          {" "}
          <img src={video} alt="" />{" "}
        </button>
      </div>
    </div>
  );
};

export default AboutUsBlog;