import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { sendQuoteEmail } from "../../utils/emailService";

import ProjectForm from "./ProjectForm";
import { calculateEstimate } from "./EstimateCalculator";

import ContactForm from "../quoteComponents/ContactForm";
import ProjectTypes from "./ProjectTypes";

const Quote = () => {
  const [formData, setFormData] = useState({
    // InteriorForm attributes
    lightingCost: 0,
    plumbingCost: 0,
    includeLighting: false,
    includePlumbing: false,
    interiorDrywallIncluded: false,
    interiorFlooringIncluded: false,
    //ExteriorForm attributes
    exteriorTier: "",
    exteriorSqFootage: "",
    exteriorTierCosts: {},
    // FlooringForm attributes
    flooringMaterial: "",
    flooringSqFootage: "",
    flooringMaterialCosts: {},
    // DrywallForm attributes
    includeDrywall: false,
    drywallSqFootage: "",
    drywallPricePerSqFoot: "",
    // EpoxyForm attributes
    epoxyMaterial: "",
    epoxySqFootage: "",
    epoxyMaterialCosts: {},
    // CoatingsForm attributes
    coatingsMaterial: "",
    coatingsSqFootage: "",
    coatingsMaterialCosts: {},
    // ConcreteForm attributes
    concreteMaterial: "",
    concreteSqFootage: "",
    concreteMaterialCosts: {},
    // DeckPatioForm attributes
    deckPatioMaterial: "",
    deckPatioSqFootage: "",
    deckPatioLighting: false,
    deckPatioHandrails: false,
    deckPatioMaterialCosts: {},
    handrailCost: "",
    lightingCost: "",
    // KitchenForm attributes
    kitchenFlooringIncluded: false,
    kitchenDrywallIncluded: false,
    kitchenCountertopIncluded: false,
    countertopMaterial: "",
    countertopSqFootage: "",
    countertopMaterialCosts: "",
    kitchenCabinetIncluded: false,
    kitchenCabinetMaterial: "",
    kitchenCabinetSqFootage: "",
    kitchenCabinetMaterialCosts: "",
    island: false,
    islandCost: "",
    kitchenPlumbing: false,
    plumbingCost: "",
    kitchenLighting: false,
    lightingCost: "",
    includedOptionsCosts: {},
    // BathroomForm attributes
    bathFlooringNeeded: false,
    bathDrywallNeeded: false,
    bathSinkNeeded: false,
    sinkType: "",
    toiletNeeded: false,
    toiletType: "",
    showerTubNeeded: false,
    showerTubType: "",
    bathPlumbing: false,
    bathLighting: false,
    sinkCost: "",
    toiletCost: "",
    showerTubCost: "",
    bathPlumbingCost: "",
    bathLightingCost: "",
    // bathroomTiers: {
    //   bathLighting: [],
    //   bathPlumbing: [],
    //   showerTubType: [],
    //   sinkType: [],
    //   toiletType: [],
    // },
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
      interior: [
        "includeLighting",
        "includePlumbing",        
        "interiorFlooringIncluded",
        "flooringSqFootage",
        "interiorDrywallIncluded",
        "drywallSqFootage",
      ],
      exterior: ["exteriorTier", "exteriorSqFootage"],
      flooring: ["flooringMaterial", "flooringSqFootage"],
      bath: [
        "bathSinkNeeded",
        "bathSinkType",
        "toiletNeeded",
        "toiletType",
        "showerTubNeeded",
        "showerTubType",
        "bathFlooringNeeded",
        "bathDrywallNeeded",
        "bathPlumbing",
        "bathLighting",
      ],
      kitchen: [
        "kitchenFlooringIncluded",
        "kitchenFlooringMaterial",
        "flooringSqFootage",
        "kitchenDrywallIncluded",
        "drywallSqFootage",
        "island",
        "countertops",
        "countertopMaterial",
        "countertopSqFootage",
        "kitchenCabinets",
        "KitchenCabinetMaterial",
        "kitchenCabinetSqFootage",
        "kitchenPlumbing",
        "kitchenLighting",
      ],

      epoxy: ["epoxyMaterial", "epoxySqFootage"],
      coatings: ["coatingsMaterial", "coatingsSqFootage"],
      concrete: ["concreteMaterial", "concreteSqFootage"],

      deckPatio: [
        "deckPatioMaterial",
        "deckPatioSqFootage",
        "deckPatioLighting",
        "deckPatioHandrails",
      ],
    };

    const shouldCalculateEstimate = relevantAttributes[
      formData.projectType
    ]?.some((attribute) => formData[attribute]);

    if (shouldCalculateEstimate) {
      calculateEstimate(formData, handleEstimate);
    }
  }, [formData]);

  useEffect(() => {
    // Reset formData when project type changes
    setEstimate(0);
    setFormData((prevFormData) => {
      const resetAttributes = Object.keys(prevFormData).filter(
        (attribute) => !["projectType", "contactInfo"].includes(attribute)
      );

      const newFormData = { ...prevFormData };
      resetAttributes.forEach((attribute) => {
        if (typeof prevFormData[attribute] === "string") {
          newFormData[attribute] = "";
        } else if (typeof prevFormData[attribute] === "boolean") {
          newFormData[attribute] = false;
        } else if (typeof prevFormData[attribute] === "object") {
          newFormData[attribute] = {};
        }
      });

      return newFormData;
    });
  }, [formData.projectType]);

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
