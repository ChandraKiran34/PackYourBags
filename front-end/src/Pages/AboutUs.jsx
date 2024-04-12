import AboutUsTop from "../AboutUs/AboutUsTop";
import AboutUsCards from "../AboutUs/AboutUsCards";
import AboutUsBlog from "../AboutUs/AboutUsBlog";
import AboutUsServices from "../AboutUs/AboutUsServices";
import ServicesCount from "../AboutUs/ServicesCount";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <AboutUsTop />

      <AboutUsServices />
      <AboutUsBlog />

      <ServicesCount />

      <AboutUsCards />

      <Footer />
    </>
  );
};

export default AboutUs;
