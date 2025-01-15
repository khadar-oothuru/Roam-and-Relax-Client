import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", `${import.meta.env.VITE_WEB3FORMS_ACCESS_KEY}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        toast.success("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResult("An error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#001337] p-8 lg:p-16">
      <form
        onSubmit={onSubmit}
        className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-[#ff7c5b]">
          Contact Us
        </h1>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Your message"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#001337] text-white p-3 rounded-lg hover:bg-[#ff7c5b] transition-all"
        >
          Submit
        </button>
{/* 
        {result && (
          <p className="mt-4 text-center text-lg font-medium text-[#001337]">
            {result}
          </p>
        )} */}
      </form>
    </div>
  );
};

export default ContactUs;
