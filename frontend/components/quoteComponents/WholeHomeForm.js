import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const calculateWholeHomeCost = (wholeHomeTier, wholeHomeSqFootage, wholeHomeTierCosts) => {
    
    const costPerSqFoot = wholeHomeTierCosts[wholeHomeTier];
    const totalCost = costPerSqFoot * wholeHomeSqFootage;
    
    return totalCost;
};

const WholeHomeForm = ({ handleChange, formData }) => {
  const [wholeHomeTiers, setWholeHomeTiers] = useState([]);

  useEffect(() => {
    const fetchWholeHomeTiers = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id; // Assuming there is at least one document in priceUpdates collection

      const wholeHomeCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/wholeHomeTiers`
      );
      const wholeHomeSnapshot = await getDocs(wholeHomeCollectionRef);
      const tiers = [];
      const costs = {};

      wholeHomeSnapshot.forEach((doc) => {
        const tierData = doc.data();
        tiers.push(tierData.name);
        costs[tierData.name] = tierData.price;
      });

      setWholeHomeTiers(tiers);
      handleChange({ target: { name: "wholeHomeTierCosts", value: costs } });
    };

    fetchWholeHomeTiers();
  }, []);

  return (
    <>
      <div>
        <label htmlFor="wholeHomeTier" className="block mb-2">Tier</label>
        <select
          name="wholeHomeTier"
          id="wholeHomeTier"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          value={formData.wholeHomeTier}
          onChange={handleChange}
        >
          <option value="">Select a Tier</option>
          {wholeHomeTiers.map((type) => (
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
