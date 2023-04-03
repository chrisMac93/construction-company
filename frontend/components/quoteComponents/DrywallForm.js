import React from "react";

export const calculateDrywallCost = (
  drywallMaterial,
  size,
  thickness,
  drywallSqFootage
) => {
  const drywallMaterialCosts = {
    standard: 1,
    mold_resistant: 1.5,
    moisture_resistant: 1.6,
    fire_resistant: 1.8,
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
  const totalCost =
    baseCostPerSqFoot *
    sizeCostMultiplier *
    thicknessCostMultiplier *
    drywallSqFootage;
  const roundedTotalCost = parseFloat(totalCost.toFixed(2));

  return roundedTotalCost;
};

const DrywallForm = ({ handleChange, formData }) => {
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
          <option value="standard">Standard</option>
          <option value="mold_resistant">Mold Resistant</option>
          <option value="moisture_resistant">Moisture-Resistant</option>
          <option value="fire_resistant">Fire-Resistant</option>
          <option value="soundproof">SoundProof</option>
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
          <option value="4x8">4x8 ft</option>
          <option value="4x10">4x10 ft</option>
          <option value="4x12">4x12 ft</option>
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
          <option value="1/4">1/4-Inch</option>
          <option value="3/8">3/8-Inch</option>
          <option value="1/2">1/2-Inch</option>
          <option value="5/8">5/8-Inch</option>
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
