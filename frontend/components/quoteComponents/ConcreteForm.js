import React from "react";

export const calculateConcreteCost = (concreteMaterial, concreteSqFootage) => {
    const concreteMaterialCosts = {
      "Normal Strength Concrete": 9.5,
      "Plain or Ordinary Concrete": 8.5,
      "Reinforced Concrete": 11,
      "Prestressed Concrete": 12,
      "Precast Concrete": 13,
      "Light-Weight Concrete": 10,
      "High-Density Concrete": 15,
      "Air Entrained Concrete": 10.5,
      "Ready Mix Concrete": 11.5,
      "Polymer Concrete": 14,
      "Polymer Cement Concrete": 12.5,
      "Polymer Impregnated Concrete": 13.5,
      "High-Strength Concrete": 14.5,
      "High-Performance Concrete": 16,
      "Self-Consolidated Concrete": 15,
      "Shotcrete Concrete": 13,
      "Pervious Concrete": 12,
      "Vacuum Concrete": 14,
      "Pumped Concrete": 13.5,
      "Stamped Concrete": 12.5,
      "Limecrete": 10,
      "Asphalt Concrete": 11,
      "Roller Compacted Concrete": 14,
      "Rapid Strength Concrete": 15,
      "Glass Concrete": 16,
    };
  
    const costPerSqFoot = concreteMaterialCosts[concreteMaterial];
    const totalCost = costPerSqFoot * concreteSqFootage;
  
    return totalCost;
  };

const ConcreteForm = ({ handleChange, formData }) => {
  const concreteMaterials = [
    "Normal Strength Concrete",
    "Plain or Ordinary Concrete",
    "Reinforced Concrete",
    "Prestressed Concrete",
    "Precast Concrete",
    "Light-Weight Concrete",
    "High-Density Concrete",
    "Air Entrained Concrete",
    "Ready Mix Concrete",
    "Polymer Concrete",
    "Polymer Cement Concrete",
    "Polymer Impregnated Concrete",
    "High-Strength Concrete",
    "High-Performance Concrete",
    "Self-Consolidated Concrete",
    "Shotcrete Concrete",
    "Pervious Concrete",
    "Vacuum Concrete",
    "Pumped Concrete",
    "Stamped Concrete",
    "Limecrete",
    "Asphalt Concrete",
    "Roller Compacted Concrete",
    "Rapid Strength Concrete",
    "Glass Concrete",
  ];

  return (
    <>
      <div className="form-control">
        <label htmlFor="concreteMaterial" className="block mb-2">Concrete Type</label>
        <select
          name="concreteMaterial"
          id="concreteMaterial"
          value={formData.concreteMaterial}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        >
          <option value="">Select a concrete type</option>
          {concreteMaterials.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="concreteSqFootage" className="block mb-2">Square Footage</label>
        <input
          type="number"
          name="concreteSqFootage"
          id="concreteSqFootage"
          value={formData.concreteSqFootage}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
    </>
  );
};

export default ConcreteForm;
