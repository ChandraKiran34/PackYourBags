import { FaLocationDot } from "react-icons/fa6";
import "../CSS/PlaceCard.css";
import {motion} from 'framer-motion'
import { useInView } from "react-intersection-observer";
const PlaceCard = ({ title, image, spots, state, delay }) => {


  const [ref,inView] = useInView({triggerOnce:true})

  return (
    <motion.div
    initial={{y:100, opacity:0}} 
    animate={inView ? {y:0, opacity:1} : "hidden"} 
    ref={ref}
    transition={{ease:"easeIn",duration: 0.5, delay: delay}}
     className="place-card">
      <div className="place-image">
        <img src={image} alt={title} />
      </div>
      <div className="place-details">
        <h3 className="place-title font-bold">
          <span className="flex ">
            <FaLocationDot className="icon-place" />
            {title},{state}
          </span>
        </h3>
        <p className="place-spots">
          <strong> Tourist Spots:</strong> {spots}
        </p>
      </div>
    </motion.div>
  );
};

export default PlaceCard;
