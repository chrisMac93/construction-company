import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const calculateInteriorCost = (
  interiorTier,
  interiorSqFootage,
  interiorTierCosts
) => {
  const costPerSqFoot = interiorTierCosts[interiorTier];
  const totalCost = costPerSqFoot * interiorSqFootage;

  return totalCost;
};

const InteriorForm = ({ handleChange, formData }) => {
  const [interiorTiers, setInteriorTiers] = useState([]);

  useEffect(() => {
    const fetchInteriorTiers = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id; // Assuming there is at least one document in priceUpdates collection

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
    </>
  );
};

export default InteriorForm;
