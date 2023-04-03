import React from "react";

export const calculateRoofingCost = (roofingMaterial, roofingSqFootage) => {
  const roofingMaterialCosts = {
    "Rolled": 3,
    "BUR": 5,
    "Membrane": 7,
    "Asphalt Composite Shingles": 4,
    "Standing Seam Metal": 10,
    "Metal Shingles/shakes": 9,
    "Wood Shingles/Shakes": 8,
    "Clay Tile": 15,
    "Concrete Tile": 12,
    "Slate Shingles": 20,
    "Synthetic(Rubber) Slate Tile": 14,
  };

  const costPerSqFoot = roofingMaterialCosts[roofingMaterial];
  const totalCost = costPerSqFoot * roofingSqFootage;

  return totalCost;
};

const RoofingForm = ({ handleChange, formData }) => {
  const roofingMaterials = [
    "Rolled",
    "BUR",
    "Membrane",
    "Asphalt Composite Shingles",
    "Standing Seam Metal",
    "Metal Shingles/shakes",
    "Wood Shingles/Shakes",
    "Clay Tile",
    "Concrete Tile",
    "Slate Shingles",
    "Synthetic(Rubber) Slate Tile",
  ];

  return (
    <>
      <div className="form-control">
        <label htmlFor="roofingMaterial" className="block mb-2">
          Material
        </label>
        <select
          id="roofingMaterial"
          name="roofingMaterial"
          value={formData.roofingMaterial}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        >
          <option value="">Select a material</option>
          {roofingMaterials.map((roofingMaterial) => (
            <option key={roofingMaterial} value={roofingMaterial}>
              {roofingMaterial}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="roofingSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          id="roofingSqFootage"
          name="roofingSqFootage"
          value={formData.roofingSqFootage}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
    </>
  );
};

export default RoofingForm;