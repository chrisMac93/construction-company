import { useState, useEffect, useReducer } from "react";
import { motion } from "framer-motion";
import { sendQuoteEmail } from "../../utils/emailService";

import ProjectForm from "./ProjectForm";
import { calculateEstimate } from "./EstimateCalculator";

import ContactForm from "../quoteComponents/ContactForm";
import ProjectTypes from "./ProjectTypes";

const initialState = {
  // InteriorForm attributes
  lightingCost: 0,
  plumbingCost: 0,
  includeLighting: false,
  includePlumbing: false,
  interiorDrywallIncluded: false,
  interiorFlooringIncluded: false,
  //ExteriorForm attributes
  roofingIncluded: false,
  sidingIncluded: false,
  landscapingIncluded: false,
  roofingMaterial: "",
  roofingSqFootage: "",
  roofingMaterialCosts: {},
  sidingMaterial: "",
  sidingSqFootage: "",
  sidingMaterialCosts: {},
  landscapingCost: "",
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
  sinkCost: {},
  toiletCost: {},
  showerTubCost: {},
  bathPlumbingCost: "",
  bathLightingCost: "",
  // ContactForm attributes
  contactInfo: {
    name: "",
    email: "",
    phone: "",
    message: "",
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "setField":
      return { ...state, [action.field]: action.value };
    case "toggleField":
      return { ...state, [action.field]: !state[action.field] };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
};

const Quote = () => {
  const [formData, dispatch] = useReducer(formReducer, initialState);

  const [showEstimateForm, setShowEstimateForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    setShowEstimateForm(!!formData.projectType);
    setShowContactForm(!!formData.projectType);
  }, [formData.projectType]);

  const handleEstimate = (calculatedCost) => {
    setEstimate(calculatedCost);
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
      exterior: ["roofingIncluded", "sidingIncluded", "landscapingIncluded"],
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
  }, [formData.projectType]);

  const resetFormData = (projectType) => {
    dispatch({ type: "reset" });

    // Set project type after resetting
    dispatch({ type: "setField", field: "projectType", value: projectType });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    // Reset form data when project type changes
    if (name === "projectType") {
      resetFormData(inputValue);
      return;
    }

    if (name.includes("contactInfo")) {
      const contactInfoKey = name.split(".")[1];
      dispatch({
        type: "setField",
        field: "contactInfo",
        value: { ...formData.contactInfo, [contactInfoKey]: inputValue },
      });
    } else {
      dispatch({ type: "setField", field: name, value: inputValue });
    }
  };

  // Calculate the estimate based on the form data

  const submitQuote = () => {
    sendQuoteEmail(formData, estimate);
  };

  return (
    <div
      className="quote bg-gradient-to-l from-neutral-900 via-neutral-800 to-slate-300 text-neutral-100 mt-20 pt-12 px-4 sm:px-8 md:px-16 lg:px-24"
      style={{ minHeight: "calc(100vh - 4rem)" }} // Adjust the "4rem" value if you have a different height for your header
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-3xl md:text-4xl font-semibold mb-8 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get A Quote
        </motion.h1>
        <motion.p
          className="text-xl text-neutral-400  font-semibold italic mt-8 mb-3 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          Welcome to our quote generator. Select a project type below to get
          started.
        </motion.p>
        <motion.form
          className="space-y-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <ProjectTypes formData={formData} handleChange={handleChange} />
          {showEstimateForm && (
            <>
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
                  <p className="text-neutral-400 font-bold italic">
                    **This is a quote only and does not include taxes or fees**
                  </p>
                  <h1 className="font-bold text-2xl pt-14 text-neutral-100">
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
            </>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default Quote;
