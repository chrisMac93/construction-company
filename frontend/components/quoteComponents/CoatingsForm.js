import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs} from "firebase/firestore";

export const calculateCoatingsCost = (coatingsMaterial, coatingsSqFootage, coatingsMaterialCosts) => {
  const costPerSqFoot = coatingsMaterialCosts[coatingsMaterial];
  const totalCost = costPerSqFoot * coatingsSqFootage;

  return totalCost;
};

const coatingsForm = ({ handleChange, formData }) => {
  const [coatingsMaterials, setCoatingsMaterials] = useState([]);

  useEffect(() => {
    const fetchCoatingsMaterials = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id; // Assuming there is at least one document in priceUpdates collection

      const coatingsMaterialsCollectionRef = collection(db, `priceUpdates/${priceUpdatesDocId}/coatingsMaterials`);
      const coatingsSnapshot = await getDocs(coatingsMaterialsCollectionRef);
      const materials = [];
      const costs = {};

      coatingsSnapshot.forEach((doc) => {
        const materialData = doc.data();
        materials.push(materialData.name);
        costs[materialData.name] = materialData.price;
      });

      setCoatingsMaterials(materials);
      handleChange({ target: { name: "coatingsMaterialCosts", value: costs } });
    };

    fetchCoatingsMaterials();
  }, []);

  return (
    <>
      <div className="form-control mb-4">
        <label htmlFor="coatingsMaterial" className="block mb-2">
          Material
        </label>
        <select
          name="coatingsMaterial"
          id="coatingsMaterial"
          value={formData.coatingsMaterial}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        >
          <option value="">Select a material</option>
          {coatingsMaterials.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="coatingsSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          name="coatingsSqFootage"
          id="coatingsSqFootage"
          value={formData.coatingsSqFootage}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
    </>
  );
};

export default coatingsForm;
