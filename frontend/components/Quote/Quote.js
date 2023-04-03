import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { sendQuoteEmail } from "../../utils/emailService";

import ProjectForm from "./ProjectForm";
import { calculateEstimate } from "./EstimateCalculator";

import ContactForm from "../quoteComponents/ContactForm";
import ProjectTypes from "./ProjectTypes";

const Quote = () => {
  const [formData, setFormData] = useState({
    //WholeHomeForm attributes
    tier: "",
    wholeHomeSqFootage: "",
    // InteriorForm attributes
    tier: "",
    interiorSqFootage: "",
    //ExteriorForm attributes
    tier: "",
    exteriorSqFootage: "",
    // FlooringForm attributes
    flooringMaterial: "",
    flooringSqFootage: "",
    // EpoxyForm attributes
    epoxyMaterial: "",
    epoxySqFootage: "",
    // ConcreteForm attributes
    concreteMaterial: "",
    concreteSqFootage: "",
    // RoofingForm attributes
    roofingMaterial: "",
    roofingSqFootage: "",
    // DeckForm attributes
    deckMaterial: "",
    deckSqFootage: "",
    deckLighting: false,
    deckHandrails: false,
    // PatioForm attributes
    patioMaterial: "",
    patioSqFootage: "",
    patioLighting: false,
    patioHandrails: false,
    // DrywallForm attributes
    drywallMaterial: "",
    drywallSqFootage: "",
    size: "",
    thickness: "",
    // KitchenForm attributes
    flooringIncluded: false,
    island: false,
    islandBaseMaterial: "",
    islandCountertop: "",
    islandStovetop: false,
    countertops: false,
    countertopMaterial: "",
    kitchenCabinets: false,
    cabinetMaterial: "",
    appliances: false,
    plumbing: false,
    lighting: false,
    // BathroomForm attributes
    sinkNeeded: false,
    sinkCabinetMaterial: "",
    sinkType: "",
    toiletNeeded: false,
    toiletType: "",
    showerTubNeeded: false,
    showerTubType: "",
    flooringNeeded: false,
    // ContactForm attributes
    contactInfo: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const [showContactForm, setShowContactForm] = useState(false);
  const [estimate, setEstimate] = useState(null);

  const handleEstimate = (calculatedCost) => {
    setEstimate(calculatedCost);
    setShowContactForm(true);
  };

  useEffect(() => {
    const relevantAttributes = {
      flooring: ["flooringMaterial", "flooringSqFootage"],
      bath: [
        "sinkCabinetMaterial",
        "sinkType",
        "toiletType",
        "showerTubType",
        "flooringMaterial",
        "flooringSqFootage",
        "plumbing",
        "lighting",
      ],
      // Add other project types and their relevant attributes
    };

    const shouldCalculateEstimate = relevantAttributes[
      formData.projectType
    ]?.some((attribute) => formData[attribute]);

    if (shouldCalculateEstimate) {
      calculateEstimate(formData, handleEstimate);
    }
  }, [formData]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Calculate the estimate based on the form data

  const submitQuote = () => {
    sendQuoteEmail(formData, estimate);
  };

  return (
    <div className="quote bg-gradient-to-b from-neutral-900 via-neutral-800 to-slate-300 text-neutral-100 mt-24 py-15 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-3xl md:text-4xl font-semibold mb-8 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get A Quote
        </motion.h1>
        <motion.form
          className="space-y-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <ProjectTypes formData={formData} handleChange={handleChange} />
          <ProjectForm formData={formData} handleChange={handleChange} />
          {showContactForm && (
            <motion.div
              className="text-xl text-neutral-100  font-semibold mt-8 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="font-bold">YOUR ESTIMATE IS</p>{" "}
              <h1 className="font-bold text-2xl text-green-700">
                ${estimate}!
              </h1>
              <p className="text-neutral-500 font-bold italic">
                **This is a quote only and does not include taxes or fees**
              </p>
              <h1
                className="font-bold text-2xl pt-14"
                style={{ color: "#B6B024" }}
              >
                Fill Out The Form Below To Get Started!
              </h1>
              <div className="py-12">
                <ContactForm
                  handleChange={handleChange}
                  formData={formData}
                  submitQuote={submitQuote}
                />
              </div>
            </motion.div>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default Quote;
