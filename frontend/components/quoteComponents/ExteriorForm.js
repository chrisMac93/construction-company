import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const calculateExteriorCost = (
  exteriorTier,
  exteriorSqFootage,
  exteriorTierCosts
) => {
  const costPerSqFoot = exteriorTierCosts[exteriorTier];
  const totalCost = costPerSqFoot * exteriorSqFootage;

  return totalCost;
};

const ExteriorForm = ({ handleChange, formData }) => {
  const [exteriorTiers, setExteriorTiers] = useState([]);

  useEffect(() => {
    const fetchExteriorTiers = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id; // Assuming there is at least one document in priceUpdates collection

      const exteriorCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/exteriorTiers`
      );
      const exteriorSnapshot = await getDocs(exteriorCollectionRef);
      const tiers = [];
      const costs = {};

      exteriorSnapshot.forEach((doc) => {
        const tierData = doc.data();
        tiers.push(tierData.name);
        costs[tierData.name] = tierData.price;
      });

      setExteriorTiers(tiers);
      handleChange({ target: { name: "exteriorTierCosts", value: costs } });
    };

    fetchExteriorTiers();
  }, []);

  return (
    <>
      <div>
        <label htmlFor="exteriorTier" className="block mb-2">
          Tier
        </label>
        <select
          name="exteriorTier"
          id="exteriorTier"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          value={formData.exteriorTier}
          onChange={handleChange}
        >
          <option value="">Select a Tier</option>
          {exteriorTiers.map((type) => (
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
