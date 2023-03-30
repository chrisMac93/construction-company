import React from "react";

const ContactForm = ({ handleChange, formData, submitQuote }) => {
  return (
    <>
      <div className="form-control">
        <label htmlFor="contactInfo.name" className="block mb-2">
          Name:
        </label>
        <input
          type="text"
          id="contactInfo.name"
          name="contactInfo.name"
          value={formData.contactInfo.name}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
      <div className="form-control">
        <label htmlFor="contactInfo.email" className="block mb-2">
          Email:
        </label>
        <input
          type="email"
          id="contactInfo.email"
          name="contactInfo.email"
          value={formData.contactInfo.email}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
      <div className="form-control">
        <label htmlFor="contactInfo.phone" className="block mb-2">
          Phone:
        </label>
        <input
          type="tel"
          id="contactInfo.phone"
          name="contactInfo.phone"
          value={formData.contactInfo.phone}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
      <div className="form-control">
        <label htmlFor="contactInfo.message" className="block mb-2">
          Message:
        </label>
        <input
          type="text"
          id="contactInfo.message"
          name="contactInfo.message"
          value={formData.contactInfo.message}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
      <button
        onClick={submitQuote}
        className="w-full mt-6 py-3 text-neutral-800 font-bold rounded-md hover:bg-green-600 transition-colors duration-300"style={{ backgroundColor: "#B6B024"}}
      >
        Submit
      </button>
    </>
  );
};

export default ContactForm;
