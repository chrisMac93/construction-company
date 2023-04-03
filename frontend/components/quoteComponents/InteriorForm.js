import React from "react";

export const calculateInteriorCost = (tier, interiorSqFootage) => {
    const tierCosts = {
        Standard: 60,
        Premium: 82.5,
        Luxury: 112.5,
    };
    
    const costPerSqFoot = tierCosts[tier];
    const totalCost = costPerSqFoot * interiorSqFootage;
    
    return totalCost;
};

const InteriorForm = ({ handleChange, formData }) => {
  const tiers = ["Standard", "Premium", "Luxury"];

  return (
    <>
      <div>
        <label htmlFor="tier" className="block mb-2">Tier</label>
        <select
          name="tier"
          id="tier"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          value={formData.tier}
          onChange={handleChange}
        >
          <option value="">Select a Tier</option>
          {tiers.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="interiorSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          id="interiorSqFootage"
          name="interiorSqFootage"
          value={formData.interiorSqFootage}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default InteriorForm;