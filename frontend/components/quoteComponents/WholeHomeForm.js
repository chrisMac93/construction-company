import React from "react";

export const calculateWholeHomeCost = (tier, wholeHomeSqFootage) => {
    const tierCosts = {
        Standard: 75,
        Premium: 100,
        Luxury: 150,
    };
    
    const costPerSqFoot = tierCosts[tier];
    const totalCost = costPerSqFoot * wholeHomeSqFootage;
    
    return totalCost;
};

const WholeHomeForm = ({ handleChange, formData }) => {
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
        <label htmlFor="wholeHomeSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          id="wholeHomeSqFootage"
          name="wholeHomeSqFootage"
          value={formData.wholeHomeSqFootage}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default WholeHomeForm;
