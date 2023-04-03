import React from "react";

export const calculateConcreteCost = (concreteMaterial, concreteSqFootage) => {
    const concreteMaterialCosts = {
      "Normal Strength Concrete": 95,
      "Plain or Ordinary Concrete": 85,
      "Reinforced Concrete": 110,
      "Prestressed Concrete": 120,
      "Precast Concrete": 130,
      "Light-Weight Concrete": 100,
      "High-Density Concrete": 150,
      "Air Entrained Concrete": 105,
      "Ready Mix Concrete": 115,
      "Polymer Concrete": 140,
      "Polymer Cement Concrete": 125,
      "Polymer Impregnated Concrete": 135,
      "High-Strength Concrete": 145,
      "High-Performance Concrete": 160,
      "Self-Consolidated Concrete": 150,
      "Shotcrete Concrete": 130,
      "Pervious Concrete": 120,
      "Vacuum Concrete": 140,
      "Pumped Concrete": 135,
      "Stamped Concrete": 125,
      "Limecrete": 100,
      "Asphalt Concrete": 110,
      "Roller Compacted Concrete": 140,
      "Rapid Strength Concrete": 150,
      "Glass Concrete": 160,
    };
  
    const costPerSqFoot = concreteMaterialCosts[concreteMaterial];
    const totalCost = costPerSqFoot * concreteSqFootage;
  
    return totalCost;
  };

const ConcreteForm = ({ handleChange, formData }) => {
  const concreteTypes = [
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
        <label htmlFor="concreteType" className="block mb-2">Concrete Type</label>
        <select
          name="concreteType"
          id="concreteType"
          value={formData.concreteType}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        >
          <option value="">Select a concrete type</option>
          {concreteTypes.map((type) => (
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
