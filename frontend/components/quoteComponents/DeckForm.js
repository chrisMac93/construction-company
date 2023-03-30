import React from "react";
import { Switch } from "@headlessui/react";

export const calculateDeckingCost = (
  material,
  sqFootage,
  lighting,
  handrails
) => {
  const materialCosts = {
    "Hardwood Decking Materials": 15,
    "Redwood Decking": 12,
    Cedar: 10,
    "Bamboo Decking Materials": 8,
    Mahogany: 18,
    "Pressure-Treated Pine": 7,
    "Composite, Plastic & PVC": 12,
    "Aluminum Decking": 15,
    "Fiberglass Deck Materials": 14,
    "Cement Board or Concrete Deck": 13,
    "Solid Stone": 20,
    Rubber: 9,
  };

  const lightingCostPerSqFoot = 2;
  const handrailsCostPerSqFoot = 3;

  const costPerSqFoot = materialCosts[material];
  let totalCost = costPerSqFoot * sqFootage;

  if (lighting) {
    totalCost += lightingCostPerSqFoot * sqFootage;
  }

  if (handrails) {
    totalCost += handrailsCostPerSqFoot * sqFootage;
  }

  return totalCost;
};

const DeckForm = ({ handleChange, formData }) => {
  const deckMaterials = [
    "Hardwood Decking Materials",
    "Redwood Decking",
    "Cedar",
    "Bamboo Decking Materials",
    "Mahogany",
    "Pressure-Treated Pine",
    "Composite, Plastic & PVC",
    "Aluminum Decking",
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
          <option value="">Select a deck material</option>
          {deckMaterials.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
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
          value={formData.sqFootage}
          onChange={handleChange}
        />
      </div>
      <div className="form-control mb-4">
        <p className="mb-2">Do you want handrails?</p>
        <Switch.Group>
          <Switch.Label className="flex items-center">
            <Switch
              id="handrails"
              name="handrails"
              checked={formData.handrails}
              onChange={() =>
                handleChange({
                  target: { name: "handrails", value: !formData.handrails },
                })
              }
              className={`${
                formData.handrails ? "bg-B6B024" : "bg-gray-200"
              } relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none`}
            >
              <span className="sr-only">Handrails</span>
              <span
                className={`${
                  formData.handrails ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
            <span className="ml-3">Handrails</span>
          </Switch.Label>
        </Switch.Group>
      </div>
      <div className="form-control">
        <p className="mb-2">Do you want lighting?</p>
        <Switch.Group>
          <Switch.Label className="flex items-center">
            <Switch
              id="lighting"
              name="lighting"
              checked={formData.lighting}
              onChange={() =>
                handleChange({
                  target: { name: "lighting", value: !formData.lighting },
                })
              }
              className={`${
                formData.lighting ? "bg-B6B024" : "bg-gray-200"
              } relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none`}
            >
              <span className="sr-only">Lighting</span>
              <span
                className={`${
                  formData.lighting ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
            <span className="ml-3">Lighting</span>
          </Switch.Label>
        </Switch.Group>
      </div>
    </>
  );
};

export default DeckForm;
