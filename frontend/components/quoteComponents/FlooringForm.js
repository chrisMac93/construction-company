import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const calculateFlooringCost = (
  flooringMaterial,
  flooringSqFootage,
  flooringMaterialCosts
) => {
  if (!flooringMaterial || !flooringSqFootage || !flooringMaterialCosts) {
    return 0;
  }

  const costPerSqFoot = flooringMaterialCosts[flooringMaterial];
  const totalCost = costPerSqFoot * flooringSqFootage;

  return totalCost;
};

const FlooringForm = ({ handleChange, formData }) => {
  const [flooringMaterials, setFlooringMaterials] = useState([]);

  useEffect(() => {
    const fetchFlooringMaterials = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id; // Assuming there is at least one document in priceUpdates collection

      const flooringMaterialsCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/flooringMaterials`
      );
      const FlooringSnapshot = await getDocs(flooringMaterialsCollectionRef);
      const materials = [];
      const costs = {};

      FlooringSnapshot.forEach((doc) => {
        const materialData = doc.data();
        materials.push(materialData.name);
        costs[materialData.name] = materialData.price;
      });

      setFlooringMaterials(materials);
      handleChange({ target: { name: "flooringMaterialCosts", value: costs } });
    };

    fetchFlooringMaterials();
  }, []);

  return (
    <>
      <div className="form-control">
        <label htmlFor="flooringMaterial" className="block mb-2 font-semibold">
          Flooring Material
        </label>
        <select
          name="flooringMaterial"
          id="flooringMaterial"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          onChange={handleChange}
          value={formData.flooringMaterial}
        >
          <option value="">Select a Flooring Material</option>
          {flooringMaterials.map((flooringMaterial) => (
            <option key={flooringMaterial} value={flooringMaterial}>
              {flooringMaterial}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="flooringSqFootage" className="block mb-2 font-semibold">
          Square Footage
        </label>
        <input
          type="number"
          name="flooringSqFootage"
          id="flooringSqFootage"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          onChange={handleChange}
          value={formData.flooringSqFootage}
        />
      </div>
    </>
  );
};

export default FlooringForm;
