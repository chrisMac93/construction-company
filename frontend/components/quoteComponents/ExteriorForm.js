import React from "react";

export const calculateExteriorCost = (tier, exteriorSqFootage) => {
    const tierCosts = {
        Standard: 40,
        Premium: 55,
        Luxury: 82.5,
    };
    
    const costPerSqFoot = tierCosts[tier];
    const totalCost = costPerSqFoot * exteriorSqFootage;
    
    return totalCost;
};

const ExteriorForm = ({ handleChange, formData }) => {
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
        <label htmlFor="exteriorSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          id="exteriorSqFootage"
          name="exteriorSqFootage"
          value={formData.exteriorSqFootage}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default ExteriorForm;