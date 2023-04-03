import React from "react";

export const calculateEpoxyCost = (epoxyMaterial, epoxysqFootage) => {
    const epoxyMaterialCosts = {
      "100Solids": 6,
      "Water-Based": 4,
      "Solvent-Based": 5,
      "Heat-Cured": 8,
      "Two-Part": 7,
    };
  
    const costPerSqFoot = epoxyMaterialCosts[epoxyMaterial];
    const totalCost = costPerSqFoot * epoxysqFootage;
  
    return totalCost;
  };

const EpoxyForm = ({ handleChange, formData }) => {
  return (
    <>
      <div className="form-control mb-4">
        <label htmlFor="epoxyMaterial" className="block mb-2">
          Material
        </label>
        <select
          name="epoxyMaterial"
          id="epoxyMaterial"
          value={formData.epoxyMaterial}
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
        <label htmlFor="epoxysqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          name="epoxysqFootage"
          id="epoxysqFootage"
          value={formData.epoxysqFootage}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
    </>
  );
};

export default EpoxyForm;
