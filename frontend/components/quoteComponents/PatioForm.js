import React from "react";
import { renderSwitch } from "./RenderSwitch";

export const calculatePatioCost = (
  material,
  sqFootage,
  lighting,
  handrails
) => {
  const materialCosts = {
    "Hardwood Patio Materials": 15,
    "Redwood Patio": 12,
    Cedar: 10,
    "Bamboo Patio Materials": 8,
    Mahogany: 18,
    "Pressure-Treated Pine": 7,
    "Composite, Plastic & PVC": 12,
    "Aluminum Patio": 15,
    "Fiberglass Patio Materials": 14,
    "Cement Board or Concrete Patio": 13,
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

const PatioForm = ({ handleChange, formData }) => {
  const patioMaterials = [
    "Hardwood Patio Materials",
    "Redwood Patio",
    "Cedar",
    "Bamboo Patio Materials",
    "Mahogany",
    "Pressure-Treated Pine",
    "Composite, Plastic & PVC",
    "Aluminum Patio",
    "Fiberglass Patio Materials",
    "Cement Board or Concrete Patio",
    "Solid Stone",
    "Rubber",
  ];

  return (
    <>
      <div className="form-control mb-4">
        <label htmlFor="patioMaterial" className="block mb-2">
          Patio Material:
        </label>
        <select
          name="patioMaterial"
          id="patioMaterial"
          value={formData.patioMaterial}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        >
          <option value="">Select a patio material</option>
          {patioMaterials.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control mb-4">
        <label htmlFor="sqFootage" className="block mb-2">
          Square Footage:
        </label>
        <input
          type="number"
          name="sqFootage"
          id="sqFootage"
          value={formData.sqFootage}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
      <div className="form-control mb-4">
      {renderSwitch("handrails", "handrails", formData.handrails || false, handleChange)}
        <label className="ml-1 text-lg">Do you want handrails?</label>
      </div>
      <div className="form-control">
      {renderSwitch("lighting", "lighting", formData.lighting || false, handleChange)}
        <label className="ml-1 text-lg">Do you want lighting?</label>
      </div>
    </>
  );
};

export default PatioForm;
