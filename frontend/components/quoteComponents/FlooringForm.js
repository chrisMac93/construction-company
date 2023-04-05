import React from "react";

export const calculateFlooringCost = (flooringMaterial, flooringSqFootage) => {
    const flooringMaterialCosts = {
      "Ceramic Tile": 5,
      "Marble Tile": 10,
      "Porcelain Tile": 6,
      "Solid Hardwood": 8,
      "Engineered Hardwood": 7,
      "Vinyl Tile Flooring": 4,
      "Vinyl Plank Flooring": 4.5,
      "Vinyl Sheet Flooring": 3,
      "Laminate Floor Tiles": 2.5,
      "Laminate Wood Flooring": 3.5,
    };
  
    const costPerSqFoot = flooringMaterialCosts[flooringMaterial];
    const totalCost = costPerSqFoot * flooringSqFootage;
    
    return totalCost;
  };

const FlooringForm = ({ handleChange, formData }) => {
    const flooringMaterials = [
        "Ceramic Tile",
        "Marble Tile",
        "Porcelain Tile",
        "Solid Hardwood",
        "Engineered Hardwood",
        "Vinyl Tile Flooring",
        "Vinyl Plank Flooring",
        "Vinyl Sheet Flooring",
        "Laminate Floor Tiles",
        "Laminate Wood Flooring",
    ];

    return (
      <>
        <div className="form-control">
          <label htmlFor="flooringMaterial" className="block mb-2">
            Flooring Material
          </label>
          <select
            name="flooringMaterial"
            id="flooringMaterial"
            className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
            onChange={handleChange}
            value={formData.flooringMaterial}
          >
             <option value="">Select a Flooring Material</option>
            {flooringMaterials.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="flooringSqFootage" className="block mb-2">
            Square Footage
          </label>
          <input
            type="number"
            name="flooringSqFootage"
            id="flooringSqFootage"
            className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
            onChange={handleChange}
            value={formData.flooringSqFootage}
          />
        </div>
      </>
    );
  };

    export default FlooringForm;