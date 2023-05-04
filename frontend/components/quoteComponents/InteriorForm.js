import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { calculateDrywallCost } from "./drywallOption";
import DrywallOption from "./drywallOption";
import { renderSwitch } from "./RenderSwitch";

export const calculateInteriorCost = (
  interiorTier,
  interiorSqFootage,
  interiorTierCosts,
  includeDrywall,
  drywallPricePerSqFoot,
  drywallSqFootage
) => {
  const costPerSqFoot = interiorTierCosts[interiorTier];
  const totalCost = costPerSqFoot * interiorSqFootage;

  if (includeDrywall) {
    return totalCost + calculateDrywallCost(drywallPricePerSqFoot, drywallSqFootage);
  }

  return totalCost;
};

const InteriorForm = ({ handleChange, formData }) => {
  const [interiorTiers, setInteriorTiers] = useState([]);

  useEffect(() => {
    const fetchInteriorTiers = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id;

      const interiorCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/interiorTiers`
      );
      const interiorSnapshot = await getDocs(interiorCollectionRef);
      const tiers = [];
      const costs = {};

      interiorSnapshot.forEach((doc) => {
        const tierData = doc.data();
        tiers.push(tierData.name);
        costs[tierData.name] = tierData.price;
      });

      setInteriorTiers(tiers);
      handleChange({ target: { name: "interiorTierCosts", value: costs } });
    };

    fetchInteriorTiers();
  }, []);
  

  return (
    <>
      <div>
        <label htmlFor="interiorTier" className="block mb-2">
          Tier
        </label>
        <select
          name="interiorTier"
          id="interiorTier"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          value={formData.interiorTier}
          onChange={handleChange}
        >
          <option value="">Select a Tier</option>
          {interiorTiers.map((type) => (
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
      <div className="form-group mt-4">
        <label
          htmlFor="includeDrywall"
          className="flex items-center cursor-pointer"
        >
          {renderSwitch(
            "includeDrywall",
            "includeDrywall",
            formData.includeDrywall,
            handleChange,
            formData.drywallPricePerSqFoot
          )}
          <span className="ml-3 mb-1 text-neutral-100 font-semibold">Do You Need Drywall?</span>
        </label>
      </div>
      {formData.includeDrywall && (
        <DrywallOption handleChange={handleChange} formData={formData} />
      )}
    </>
  );
};

export default InteriorForm;
