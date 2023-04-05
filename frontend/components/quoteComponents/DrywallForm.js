import React from "react";

export const calculateDrywallCost = (
  drywallMaterial,
  size,
  thickness,
  drywallSqFootage
) => {
  const drywallMaterialCosts = {
    standard: 1,
    "mold resistant": 1.5,
    "moisture resistant": 1.6,
    "fire resistant": 1.8,
    soundproof: 2.2,
  };

  const sizeMultiplier = {
    "4x8": 1,
    "4x10": 1.25,
    "4x12": 1.5,
  };

  const thicknessMultiplier = {
    "1/4": 1,
    "3/8": 1.2,
    "1/2": 1.4,
    "5/8": 1.6,
  };

  const baseCostPerSqFoot = drywallMaterialCosts[drywallMaterial];
  const sizeCostMultiplier = sizeMultiplier[size];
  const thicknessCostMultiplier = thicknessMultiplier[thickness];
  const costPerSqFoot = baseCostPerSqFoot * sizeCostMultiplier * thicknessCostMultiplier;
  const totalCost = costPerSqFoot * drywallSqFootage;

  const roundedTotalCost = parseFloat(totalCost.toFixed(2));

  return roundedTotalCost;
};

const DrywallForm = ({ handleChange, formData }) => {

  const drywallMaterials = [
    "standard",
    "mold resistant",
    "moisture resistant",
    "fire resistant",
    "soundproof",
  ];

  const drywallSizes = [
    "4x8",
    "4x10",
    "4x12",
  ];

  const drywallThicknesses = [
    "1/4",
    "3/8",
    "1/2",
    "5/8",
  ];


  return (
    <>
      <div className="form-control mb-4">
        <label htmlFor="drywallMaterial" className="block mb-2">
          Material
        </label>
        <select
          name="drywallMaterial"
          id="drywallMaterial"
          value={formData.drywallMaterial}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        >
          <option value="">Select a material</option>
          {drywallMaterials.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
        </select>
      </div>
      <div className="form-control mb-4">
        <label htmlFor="size" className="block mb-2">
          Size
        </label>
        <select
          name="size"
          id="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        >
          <option value="">Select a size</option>
          {drywallSizes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
        </select>
      </div>
      <div className="form-control mb-4">
        <label htmlFor="thickness" className="block mb-2">
          Thickness
        </label>
        <select
          name="thickness"
          id="thickness"
          value={formData.thickness}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        >
          <option value="">Select a thickness</option>
          {drywallThicknesses.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="drywallSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          name="drywallSqFootage"
          id="drywallSqFootage"
          value={formData.drywallSqFootage}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
    </>
  );
};

export default DrywallForm;
