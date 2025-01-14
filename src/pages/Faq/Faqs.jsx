import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FaqSpeak from "./FaqSpeak";
import FaqQuestions from "./FaqsQuestions";

const Faqs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <>
      <div className="faq_page mx-auto flex flex-col items-center  bg-slate-50">
        {" "}
        {/* Add bg-slate-50 here */}
        <div className="faq_top bg-gradient-to-b from-[#ECF4F6] to-[#FBFCFD] w-full h-[520px] flex items-center justify-center">
          <motion.div
            ref={ref}
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : "hidden"}
            transition={{ ease: "easeInOut", duration: 0.9, delay: 0.3 }}
            className="formotion text-center"
          >
            <h1 className="text-6xl leading-[68px] font-extrabold text-[#001337] pb-1 mx-[370px] mt-[120px] mb-[200px]">
              Frequently asked questions
            </h1>

            <hr className="h-[1px] w-[80%] bg-[#b0b0b0] border-none mx-auto my-[50px] rounded-full" />
          </motion.div>
        </div>
        <FaqQuestions />
        <FaqSpeak />
      </div>
    </>
  );
};

export default Faqs;
