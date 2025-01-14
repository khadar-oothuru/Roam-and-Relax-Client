import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaTeamspeak } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";

const FaqSpeak = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ x: 100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : "hidden"}
      transition={{ ease: "easeInOut", duration: 0.9, delay: 0.3 }}
      className="flex flex-col items-center justify-center mt-20 mb-4 h-48 w-4/5 rounded-lg shadow-lg bg-white p-8 border-2 border-[#001337]"
    >
      <h1 className="text-[#001337] text-2xl font-bold text-center mb-4">
        Haven’t found what you're looking for?
      </h1>
      <div className="flex space-x-6">
        {/* Button 1: Orange Theme */}
        <button className="flex items-center space-x-2 bg-[#ff7c5b] text-white py-3 px-6 rounded-md border border-transparent hover:bg-white hover:text-[#ff7c5b] hover:border-[#ff7c5b] transition-colors">
          <FaTeamspeak size={24} /> <span>Speak With Us</span>
        </button>

        {/* Button 2: Blue Theme */}
        <Link to="/contact">
          <button className="flex items-center space-x-2 bg-[#001337] text-white py-3 px-6 rounded-md border border-transparent hover:bg-white hover:text-[#001337] hover:border-[#001337] transition-colors">
            <MdArrowForward size={24} /> <span>Contact Us</span>
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default FaqSpeak;
