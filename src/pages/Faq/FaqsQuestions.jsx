import { faqsData, faqsDataOne, faqsDataTwo } from "./faqsData.js";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FaqQuestions = () => {
  const [refApplyForJob, inViewApplyForJob] = useInView({ triggerOnce: true });
  const [refTechnicalSupport, inViewTechnicalSupport] = useInView({
    triggerOnce: true,
  });
  const [refCareerServices, inViewCareerServices] = useInView({
    triggerOnce: true,
  });

  return (
    <div className="faqs_page">
      <div className="faqs_section mb-8">
        <motion.div
          ref={refApplyForJob}
          initial={{ y: 50, opacity: 0 }}
          animate={inViewApplyForJob ? { y: 0, opacity: 1 } : {}}
          transition={{ ease: "easeInOut", duration: 0.6 }}
          className="heading flex items-center mb-6"
        >
          <div className="border-t-4 border-orange-500 w-[30px] ml-[-30px] mr-3"></div>
          <h1 className="text-3xl font-bold text-[#001337] pb-1 text-left mr-4">
            Travel Booking FAQs
          </h1>
        </motion.div>
        <div className="join join-vertical w-full mx-auto">
          {faqsData.map((faq) => ( 
            <div className="collapse  bg-white border border-[#001337] mb-3" key={faq.id}>
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title text-[#ff7c5b] text-xl font-medium">
              {faq.Faq_Que}
            </div>
            <div className="collapse-content">
              <p>{faq.Faq_Ans}</p>
            </div>
          </div>
          ))}
        </div>
      </div>

      <div className="faqs_section mb-8">
        <motion.div
          ref={refTechnicalSupport}
          initial={{ y: 50, opacity: 0 }}
          animate={inViewTechnicalSupport ? { y: 0, opacity: 1 } : {}}
          transition={{ ease: "easeInOut", duration: 0.6 }}
          className="heading flex items-center mb-6"
        >
<div className="border-t-4 border-orange-500 w-[30px] ml-[-30px] mr-3"></div>     
    <h1 className="text-3xl font-bold text-[#001337] pb-1 text-left mr-4">
            Technical Support
          </h1>
        </motion.div>
        <div className="join join-vertical w-full mx-auto">
          {faqsDataOne.map((faq) => (
           <div className="collapse  bg-white border border-[#001337] mb-3" key={faq.id}>
           <input type="radio" name="my-accordion-1" />
           <div className="collapse-title text-[#ff7c5b] text-xl font-medium">
             {faq.Faq_Que}
           </div>
           <div className="collapse-content">
             <p>{faq.Faq_Ans}</p>
           </div>
         </div>
          ))}
        </div>
      </div>

      <div className="faqs_section mb-8">
        <motion.div
          ref={refCareerServices}
          initial={{ y: 50, opacity: 0 }}
          animate={inViewCareerServices ? { y: 0, opacity: 1 } : {}}
          transition={{ ease: "easeInOut", duration: 0.6 }}
          className="heading flex items-center mb-6"
        >
<div className="border-t-4 border-orange-500 w-[30px] ml-[-30px] mr-3"></div>
          <h1 className="text-3xl font-bold text-[#001337] pb-1 text-left mr-4">
            General Queries
          </h1>
        </motion.div>
        <div className="join join-vertical w-full mx-auto">
          {faqsDataTwo.map((faq) => (
            <div className="collapse  bg-white  border border-[#001337] mb-3" key={faq.id}>
              <input type="radio" name="my-accordion-1" />
              <div className="collapse-title text-[#ff7c5b] text-xl font-medium">
                {faq.Faq_Que}
              </div>
              <div className="collapse-content">
                <p>{faq.Faq_Ans}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqQuestions;
