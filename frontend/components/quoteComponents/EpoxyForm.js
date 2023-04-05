import React from "react";

export const calculateEpoxyCost = (epoxyMaterial, epoxySqFootage) => {
    const epoxyMaterialCosts = {
      "100Solids": 6,
      "Water-Based": 4,
      "Solvent-Based": 5,
      "Heat-Cured": 8,
      "Two-Part": 7,
    };
  
    const costPerSqFoot = epoxyMaterialCosts[epoxyMaterial];
    const totalCost = costPerSqFoot * epoxySqFootage;
  
    return totalCost;
  };

const EpoxyForm = ({ handleChange, formData }) => {

  const epoxyMaterials = [
    "100Solids",
    "Water-Based",
    "Solvent-Based",
    "Heat-Cured",
    "Two-Part",
  ];

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
          {epoxyMaterials.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="epoxySqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          name="epoxySqFootage"
          id="epoxySqFootage"
          value={formData.epoxySqFootage}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
    </>
  );
};

export default EpoxyForm;
