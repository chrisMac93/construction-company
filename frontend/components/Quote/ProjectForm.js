import React from "react";
import FlooringForm from "../quoteComponents/FlooringForm";
import EpoxyForm from "../quoteComponents/EpoxyForm";
import ConcreteForm from "../quoteComponents/ConcreteForm";
import DeckPatioForm from "../quoteComponents/DeckPatioForm";
import KitchenForm from "../quoteComponents/KitchenForm";
import BathroomForm from "../quoteComponents/BathroomForm";
import InteriorForm from "../quoteComponents/InteriorForm";
import ExteriorForm from "../quoteComponents/ExteriorForm";
import CoatingsForm from "../quoteComponents/CoatingsForm";

const ProjectForm = ({ formData, handleChange }) => {
  switch (formData.projectType) {
    case "interior":
      return <InteriorForm handleChange={handleChange} formData={formData} />;
    case "exterior":
      return <ExteriorForm handleChange={handleChange} formData={formData} />;
    case "kitchen":
      return <KitchenForm handleChange={handleChange} formData={formData} />;
    case "bath":
      return <BathroomForm handleChange={handleChange} formData={formData} />;
    case "deckPatio":
      return <DeckPatioForm handleChange={handleChange} formData={formData} />;
    case "flooring":
      return <FlooringForm handleChange={handleChange} formData={formData} />;
    case "epoxy":
      return <EpoxyForm handleChange={handleChange} formData={formData} />;
    case "coatings":
      return <CoatingsForm handleChange={handleChange} formData={formData} />;
    case "concrete":
      return <ConcreteForm handleChange={handleChange} formData={formData} />;
    default:
      return null;
  }
};

export default ProjectForm;
