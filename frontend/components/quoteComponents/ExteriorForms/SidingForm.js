import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const calculateSidingCost = (
  sidingMaterial,
  sidingSqFootage,
  sidingMaterialCosts
) => {
  if (!sidingMaterial || !sidingSqFootage || !sidingMaterialCosts) {
    return 0;
  }

  let totalCost = 0;

  const sidingCost = sidingSqFootage * sidingMaterialCosts[sidingMaterial];

  totalCost += sidingCost;

  return totalCost;
};

const SidingForm = ({ handleChange, formData }) => {
  const [sidingMaterials, setSidingMaterials] = useState([]);

  useEffect(() => {
    const fetchSiding = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id;

      const exteriorCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/exterior`
      );

      const exteriorSnapshot = await getDocs(exteriorCollectionRef);

      const exteriorDocId = exteriorSnapshot.docs[0].id;

      const sidingCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/exterior/${exteriorDocId}/siding`
      );

      const sidingSnapshot = await getDocs(sidingCollectionRef);

      const materials = [];

      const costs = {};

      sidingSnapshot.forEach((doc) => {
        const sidingDocData = doc.data();
        materials.push(sidingDocData.name);
        costs[sidingDocData.name] = sidingDocData.price;
      });

      setSidingMaterials(materials);
      handleChange({ target: { name: "sidingMaterialCosts", value: costs } });
    };

    fetchSiding();
  }, []);

  return (
    <>
      <div className="form-control">
        <label htmlFor="sidingMaterial" className="block mb-2">
          Siding Material
        </label>
        <select
          name="sidingMaterial"
          id="sidingMaterial"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          onChange={handleChange}
          value={formData.sidingMaterial}
        >
          <option value="">Select a material</option>
          {sidingMaterials.map((sidingMaterial) => (
            <option key={sidingMaterial} value={sidingMaterial}>
              {sidingMaterial}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="sidingSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          name="sidingSqFootage"
          id="sidingSqFootage"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          value={formData.sidingSqFootage}
          onChange={handleChange}
          step="0.01"
        />
      </div>
    </>
  );
};

export default SidingForm;
