import React from "react";
import FlooringForm from "../quoteComponents/FlooringForm";
import EpoxyForm from "../quoteComponents/EpoxyForm";
import DrywallForm from "../quoteComponents/DrywallForm";
import ConcreteForm from "../quoteComponents/ConcreteForm";
import DeckForm from "../quoteComponents/DeckForm";
import PatioForm from "../quoteComponents/PatioForm";
import KitchenForm from "../quoteComponents/KitchenForm";
import BathroomForm from "../quoteComponents/BathroomForm";
import RoofingForm from "../quoteComponents/RoofingForm";
import WholeHomeForm from "../quoteComponents/WholeHomeForm";
import InteriorForm from "../quoteComponents/InteriorForm";
import ExteriorForm from "../quoteComponents/ExteriorForm";

const ProjectForm = ({ formData, handleChange }) => {
  switch (formData.projectType) {
    case "wholeHome":
      return <WholeHomeForm handleChange={handleChange} formData={formData} />;
    case "interior":
      return <InteriorForm handleChange={handleChange} formData={formData} />;
    case "exterior":
      return <ExteriorForm handleChange={handleChange} formData={formData} />;
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

export default ProjectForm;