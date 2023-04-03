import React from "react";
import { renderSwitch } from "./RenderSwitch";

export const calculateDeckCost = (
  deckMaterial,
  deckSqFootage,
  deckLighting,
  deckHandrails
) => {
  const deckMaterialCosts = {
    "Hardwood Deck Materials": 15,
    "Redwood Deck": 12,
    Cedar: 10,
    "Bamboo Deck Materials": 8,
    Mahogany: 18,
    "Pressure-Treated Pine": 7,
    "Composite, Plastic & PVC": 12,
    "Aluminum Deck": 15,
    "Fiberglass Deck Materials": 14,
    "Cement Board or Concrete Deck": 13,
    "Solid Stone": 20,
    Rubber: 9,
  };

  const deckLightingCostPerSqFoot = 2;
  const deckHandrailsCostPerSqFoot = 3;

  const costPerSqFoot = deckMaterialCosts[deckMaterial];
  let totalCost = costPerSqFoot * deckSqFootage;

  if (deckLighting) {
    totalCost += deckLightingCostPerSqFoot * deckSqFootage;
  }

  if (deckHandrails) {
    totalCost += deckHandrailsCostPerSqFoot * deckSqFootage;
  }

  return totalCost;
};

const DeckForm = ({ handleChange, formData }) => {

  const deckMaterials = [
    "Hardwood Deck Materials",
    "Redwood Deck",
    "Cedar",
    "Bamboo Deck Materials",
    "Mahogany",
    "Pressure-Treated Pine",
    "Composite, Plastic & PVC",
    "Aluminum Deck",
    "Fiberglass Deck Materials",
    "Cement Board or Concrete Deck",
    "Solid Stone",
    "Rubber",
  ];

  return (
    <>
      <div className="form-control">
        <label htmlFor="deckMaterial" className="block mb-2">
          Deck Material
        </label>
        <select
          name="deckMaterial"
          id="deckMaterial"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          value={formData.deckMaterial}
          onChange={handleChange}
        >
          <option value="">Select a deck Material</option>
          {deckMaterials.map((deckMaterial) => (
            <option key={deckMaterial} value={deckMaterial}>
              {deckMaterial}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="deckSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          name="deckSqFootage"
          id="deckSqFootage"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          value={formData.deckSqFootage}
          onChange={handleChange}
        />
      </div>
      <div className="form-control mb-4">
      {renderSwitch("deckHandrails", "deckHandrails", formData.deckHandrails || false, handleChange)}
        <label className="ml-1 text-lg">Do you want handrails?</label>
      </div>
      <div className="form-control">
      {renderSwitch("deckLighting", "deckLighting", formData.deckLighting || false, handleChange)}
        <label className="ml-1 text-lg">Do you want lighting?</label>
      </div>
    </>
  );
};

export default DeckForm;
