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
    wholeHomeTier: "",
    wholeHomeSqFootage: "",
    wholeHomeTierCosts: {},
    // InteriorForm attributes
    interiorTier: "",
    interiorSqFootage: "",
    interiorTierCosts: {},
    //ExteriorForm attributes
    exteriorTier: "",
    exteriorSqFootage: "",
    exteriorTierCosts: {},
    // FlooringForm attributes
    flooringMaterial: "",
    flooringSqFootage: "",
    flooringMaterialCosts: {},
    // EpoxyForm attributes
    epoxyMaterial: "",
    epoxySqFootage: "",
    epoxyMaterialCosts: {},
    // ConcreteForm attributes
    concreteMaterial: "",
    concreteSqFootage: "",
    concreteMaterialCosts: {},
    // RoofingForm attributes
    roofingMaterial: "",
    roofingSqFootage: "",
    roofingMaterialCosts: {},
    // DeckForm attributes
    deckMaterial: "",
    deckSqFootage: "",
    deckLighting: false,
    deckHandrails: false,
    deckMaterialCosts: {},
    handrailCost: "",
    lightingCost: "",
    // PatioForm attributes
    patioMaterial: "",
    patioSqFootage: "",
    patioLighting: false,
    patioHandrails: false,
    patioMaterialCosts: {},
    handrailCost: "",
    lightingCost: "",
    // DrywallForm attributes
    drywallMaterial: "",
    drywallSqFootage: "",
    size: "",
    thickness: "",
    // KitchenForm attributes
    flooringIncluded: false,
    island: false,
    islandSqFootage: "",
    islandBaseMaterial: "",
    islandCountertop: "",
    islandStovetop: false,
    countertops: false,
    countertopMaterial: "",
    kitchenCabinets: false,
    KitchenCabinetMaterial: "",
    kitchenSinkNeedeed: false,
    kitchenSink: false,
    kitchenSinkMaterial: "",
    appliances: false,
    kitchenPlumbing: false,
    kitchenLighting: false,
    // BathroomForm attributes
    bathSinkNeeded: false,
    bathSinkCabinetMaterial: "",
    bathSinkType: "",
    toiletNeeded: false,
    toiletType: "",
    showerTubNeeded: false,
    showerTubType: "",
    flooringNeeded: false,
    bathPlumbing: false,
    bathLighting: false,
    // ContactForm attributes
    contactInfo: {
      name: "",
      email: "",
      phone: "",
      message: "",
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
      wholeHome: ["wholeHomeTier", "wholeHomeSqFootage"],
      interior: ["interiorTier", "interiorSqFootage"],
      exterior: ["exteriorTier", "exteriorSqFootage"],
      flooring: ["flooringMaterial", "flooringSqFootage"],
      bath: [
        "bathSinkNeeded",
        "bathSinkCabinetMaterial",
        "bathSinkType",
        "toiletNeeded",
        "toiletType",
        "showerTubNeeded",
        "showerTubType",
        "flooringNeeded",
        "bathPlumbing",
        "bathLighting",
      ],
      kitchen: [
        "flooringMaterial",
        "flooringSqFootage",
        "island",
        "islandSqFootage",
        "islandBaseMaterial",
        "islandCountertop",
        "islandStovetop",
        "countertops",
        "countertopMaterial",
        "kitchenCabinets",
        "KitchenCabinetMaterial",
        "kitchenSink",
        "kitchenSinkMaterial",
        "appliances",
        "kitchenPlumbing",
        "kitchenLighting",
      ],
      drywall: [
        "drywallMaterial",
        "drywallSqFootage",
        "size",
        "thickness",
        "flooringMaterial",
        "flooringSqFootage",
      ],
      epoxy: ["epoxyMaterial", "epoxySqFootage"],
      concrete: ["concreteMaterial", "concreteSqFootage"],
      roofing: ["roofingMaterial", "roofingSqFootage"],
      deck: ["deckMaterial", "deckSqFootage", "deckLighting", "deckHandrails"],
      patio: [
        "patioMaterial",
        "patioSqFootage",
        "patioLighting",
        "patioHandrails",
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
    const inputValue = type === "checkbox" ? checked : value;

    if (name.includes("contactInfo")) {
      const contactInfoKey = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        contactInfo: {
          ...prevFormData.contactInfo,
          [contactInfoKey]: inputValue,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    }
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