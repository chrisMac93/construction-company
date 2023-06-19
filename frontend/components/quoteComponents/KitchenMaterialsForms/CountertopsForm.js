import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const calculateCounterTopCost = (
  counterTopMaterial,
  counterTopSqFootage,
  counterTopMaterialCosts
) => {
  if (!counterTopMaterial || !counterTopSqFootage || !counterTopMaterialCosts) {
    return 0;
  }

  const totalCost =
    counterTopSqFootage * counterTopMaterialCosts[counterTopMaterial];

  return totalCost;
};

const CountertopsForm = ({ handleChange, formData }) => {
  const [countertopMaterials, setCountertopMaterials] = useState([]);

  useEffect(() => {
    const fetchCountertopMaterials = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id;

      const kitchenMaterialsCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/kitchenMaterials`
      );
      const kitchenMaterialsSnapshot = await getDocs(
        kitchenMaterialsCollectionRef
      );
      const kitchenMaterialsDocId = kitchenMaterialsSnapshot.docs[0].id;

      const countertopMaterialsCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/kitchenMaterials/${kitchenMaterialsDocId}/countertopMaterials`
      );

      const countertopMaterialsSnapshot = await getDocs(
        countertopMaterialsCollectionRef
      );
      const materials = [];
      const costs = {};

      countertopMaterialsSnapshot.forEach((doc) => {
        const countertopData = doc.data();
        materials.push(countertopData.name);
        costs[countertopData.name] = countertopData.price;
      });

      setCountertopMaterials(materials);
      handleChange({
        target: { name: "countertopMaterialCosts", value: costs },
      });
    };

    fetchCountertopMaterials();
  }, [handleChange]);

  return (
    <>
      <div className="form-control">
        <label htmlFor="countertopMaterial" className="block mb-2">
          Countertop Material
        </label>
        <select
          name="countertopMaterial"
          id="countertopMaterial"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          onChange={handleChange}
          value={formData.countertopMaterial}
        >
          <option value="">Select a material</option>
          {countertopMaterials.map((countertopMaterial) => (
            <option key={countertopMaterial} value={countertopMaterial}>
              {countertopMaterial}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="countertopSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          name="countertopSqFootage"
          id="countertopSqFootage"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          value={formData.countertopSqFootage}
          onChange={handleChange}
          step="0.01"
        />
      </div>
    </>
  );
};

export default CountertopsForm;
