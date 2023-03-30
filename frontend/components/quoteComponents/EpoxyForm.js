import React from "react";

export const calculateEpoxyCost = (material, sqFootage) => {
    const materialCosts = {
      "100Solids": 6,
      "Water-Based": 4,
      "Solvent-Based": 5,
      "Heat-Cured": 8,
      "Two-Part": 7,
    };
  
    const costPerSqFoot = materialCosts[material];
    const totalCost = costPerSqFoot * sqFootage;
  
    return totalCost;
  };

const EpoxyForm = ({ handleChange, formData }) => {
  return (
    <>
      <div className="form-control mb-4">
        <label htmlFor="material" className="block mb-2">
          Material:
        </label>
        <select
          name="material"
          id="material"
          value={formData.material}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        >
          <option value="">Select a material</option>
          <option value="100Solids">100% Solids</option>
          <option value="Water-Based">Water-Based</option>
          <option value="Solvent-Based">Solvent-Based</option>
          <option value="Heat-Cured">Heat-Cured</option>
          <option value="Two-Part">Two-Part</option>
        </select>
      </div>
      <div className="form-control">
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
    </>
  );
};

export default EpoxyForm;
