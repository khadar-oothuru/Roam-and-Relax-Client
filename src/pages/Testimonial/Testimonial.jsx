import TestimonialCard from "./TestimonialCard";
import classes from "../Testimonial/Styles/Testimonialstyles.module.css";
import team1 from "../Testimonial/Resources/team-1.jpg";
import team2 from "../Testimonial/Resources/team-2.jpg";
import team3 from "../Testimonial/Resources/team-3.jpg";
import heading from "../Testimonial/Resources/tilt.png";
import { motion } from "framer-motion";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      heading: heading,
      quote:
        "Roam and Relax transformed our honeymoon into an unforgettable adventure! Every detail was meticulously planned, and we couldn't have asked for a better experience.",
      imageSrc: team1,
      altText: "Customer Photo 1",
      name: "Emily and Daniel",
    },
    {
      id: 2,
      heading: heading,
      quote:
        "The team at Roam and Relax made sure our family vacation was stress-free and packed with fun. From the accommodations to the activities, everything was perfect!",
      imageSrc: team2,
      altText: "Customer Photo 2",
      name: "The Williams Family",
    },
    {
      id: 3,
      heading: heading,
      quote:
        "As a solo traveler, I felt supported and safe throughout my journey. Roam and Relax provided the best recommendations for destinations and local experiences.",
      imageSrc: team3,
      altText: "Customer Photo 3",
      name: "Michael T.",
    },
  ];

  return (
    <div className={classes.testimonial_container}>
      <div className={classes.testimonial_top}>
        <h1> What They Say ?</h1>
        <p>
          At <span className="text-[#001337] font-bold">Roam and Relax</span>, our mission is to create 
          experiences that leave lasting impressions. Here’s what our happy travelers have to say about their journeys with us.
        </p>
      </div>
      <div className={classes.testimonial_bottom}>
        <motion.div
          initial={{ x: 100, y: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          <TestimonialCard testimonials={testimonials} />
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonial;
