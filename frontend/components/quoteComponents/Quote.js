import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { sendEmail } from "../../utils/emailService";

import FlooringForm, {
  calculateFlooringCost,
} from "./FlooringForm";
import EpoxyForm, {
  calculateEpoxyCost,
} from "./EpoxyForm";
import DrywallForm, {
  calculateDrywallCost,
} from "./DrywallForm";
import ConcreteForm, {
  calculateConcreteCost,
} from "./ConcreteForm";
import DeckForm, {
  calculateDeckingCost,
} from "./DeckForm";
import PatioForm, {
  calculatePatioCost,
} from "./PatioForm";
import KitchenForm, {
  calculateKitchenCost,
} from "./KitchenForm";
import BathroomForm, {
  calculateBathroomCost,
} from "./BathroomForm";
import RoofingForm, {
  calculateRoofingCost,
} from "./RoofingForm";
import ContactForm from "./ContactForm";

const Quote = () => {
  const [formData, setFormData] = useState({
    // Initial attributes
    projectType: "",
    tier: "",
    sqFootage: "",
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
    dryWallSize: "",
    drywallThickness: "",
    // KitchenForm attributes
    flooringIncluded: false,
    island: false,
    islandBaseMaterial: "",
    islandCountertop: "",
    islandStovetop: false,
    countertops: false,
    countertopMaterial: "",
    cabinets: false,
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

  useEffect(() => {
    if (formData.sqFootage) {
      calculateEstimate();
    }
  }, [formData]);

  const renderProjectForm = () => {
    switch (formData.projectType) {
      case "flooring":
        return <FlooringForm handleChange={handleChange} formData={formData} />;
      case "epoxy":
        return <EpoxyForm handleChange={handleChange} formData={formData} />;
      case "drywall":
        return <DrywallForm handleChange={handleChange} formData={formData} />;
      case "concrete":
        return <ConcreteForm handleChange={handleChange} formData={formData} />;
      case "deck":
        return <DeckForm handleChange={handleChange} formData={formData} />;
      case "patio":
        return <PatioForm handleChange={handleChange} formData={formData} />;
      case "kitchen":
        return <KitchenForm handleChange={handleChange} formData={formData} />;
      case "bath":
        return <BathroomForm handleChange={handleChange} formData={formData} />;
      case "roofing":
        return <RoofingForm handleChange={handleChange} formData={formData} />;
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
  
    if (name.startsWith("contactInfo.")) {
      const contactInfoKey = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        contactInfo: { ...prevState.contactInfo, [contactInfoKey]: inputValue },
      }));
    } else if (name === "name" || name === "email" || name === "phone") {
      setFormData((prevState) => ({
        ...prevState,
        contactInfo: { ...prevState.contactInfo, [name]: inputValue },
      }));
    } else if (type === 'checkbox') {
      setFormData((prevState) => ({ ...prevState, [name]: inputValue }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: inputValue }));
    }
  };

  // Calculate the estimate based on the form data
  const calculateEstimate = () => {
    let cost = 0;

    if (
      formData.projectType === "whole-home" ||
      formData.projectType === "interior-remodel" ||
      formData.projectType === "exterior-remodel"
    ) {
      switch (formData.tier) {
        case "basic":
          cost =
            formData.projectType === "whole-home"
              ? 100
              : formData.projectType === "interior-remodel"
              ? 75
              : 80;
          break;
        case "premium":
          cost =
            formData.projectType === "whole-home"
              ? 150
              : formData.projectType === "interior-remodel"
              ? 112.5
              : 120;
          break;
        case "luxury":
          cost =
            formData.projectType === "whole-home"
              ? 200
              : formData.projectType === "interior-remodel"
              ? 150
              : 160;
          break;
        default:
          break;
      }

      const total = cost * parseFloat(formData.sqFootage);
      setEstimate(total);
      setShowContactForm(true);
    } else {
      // Handle other project types

      switch (formData.projectType) {
        case "flooring":
          cost = calculateFlooringCost(
            formData.flooringMaterial,
            formData.flooringSqFootage
          );
          break;
        case "deck":
          cost = calculateDeckingCost(
            formData.deckMaterial,
            formData.deckSqFootage,
            formData.deckLighting,
            formData.deckHandrails
          );
          break;
        case "patio":
          cost = calculatePatioCost(
            formData.patioMaterial,
            formData.patioSqFootage,
            formData.patioLighting,
            formData.patioHandrails
          );
          break;
        case "drywall":
          cost = calculateDrywallCost(
            formData.drywallMaterial,
            formData.dryWallSize,
            formData.drywallThickness,
            formData.drywallSqFootage
          );
          break;
        case "epoxy":
          cost = calculateEpoxyCost(
            formData.epoxyMaterial,
            formData.epoxySqFootage
          );
          break;
        case "kitchen":
          cost = calculateKitchenCost(formData);
          break;
        case "bath":
          cost = calculateBathroomCost(formData);
          break;
        case "concrete":
          cost = calculateConcreteCost(
            formData.concreteMaterial,
            formData.concreteSqFootage
          );
          break;
        case "roofing":
          cost = calculateRoofingCost(
            formData.roofingMaterial,
            formData.roofingSqFootage
          );
          break;
        default:
          break;
      }

      const total = cost;
      setEstimate(total);
      setShowContactForm(true);
    }
  };

  const submitQuote = () => {
    sendEmail(formData, estimate);
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
          <div className="form-control">
            <label htmlFor="projectType" className="block mb-2">
              Project Type
            </label>
            <motion.select
              name="projectType"
              id="projectType"
              className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
              onChange={handleChange}
              value={formData.projectType}
              whileFocus={{ scale: 1.05 }}
            >
              <option value="">Select a project type</option>
              <option value="whole-home">Whole Home Remodel</option>
              <option value="interior-remodel">Interior Remodel</option>
              <option value="exterior-remodel">Exterior Remodel</option>
              <option value="flooring">Flooring</option>
              <option value="deck">Deck</option>
              <option value="patio">Patio</option>
              <option value="drywall">Drywall</option>
              <option value="epoxy">Epoxy</option>
              <option value="kitchen">Kitchen</option>
              <option value="bath">Bath</option>
              <option value="concrete">Concrete</option>
              <option value="roofing">Roofing</option>
            </motion.select>
          </div>
          {formData.projectType === "whole-home" ||
          formData.projectType === "interior-remodel" ||
          formData.projectType === "exterior-remodel" ? (
            <>
              <div className="form-control">
                <label htmlFor="tier" className="block mb-2">
                  Tier
                </label>
                <motion.select
                  name="tier"
                  id="tier"
                  className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
                  onChange={handleChange}
                  value={formData.tier}
                  whileFocus={{ scale: 1.05 }}
                >
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxury</option>
                </motion.select>
              </div>
              <div className="form-control">
                <label htmlFor="sqFootage" className="block mb-2">
                  Square Footage
                </label>
                <input
                  type="number"
                  name="sqFootage"
                  id="sqFootage"
                  className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
                  onChange={handleChange}
                  value={formData.sqFootage}
                />
              </div>
            </>
          ) : null}
          {renderProjectForm()}
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
              
              <h1 className="font-bold text-2xl pt-14" style={{ color: "#B6B024"}}>
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
