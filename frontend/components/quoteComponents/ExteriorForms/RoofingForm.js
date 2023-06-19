import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const calculateRoofingCost = (
  roofingMaterial,
  roofingSqFootage,
  roofingMaterialCosts
) => {
  if (!roofingMaterial || !roofingSqFootage || !roofingMaterialCosts) {
    return 0;
  }

  const totalCost = roofingSqFootage * roofingMaterialCosts[roofingMaterial];

  return totalCost;
};

const RoofingForm = ({ handleChange, formData }) => {
  const [roofingMaterials, setRoofingMaterials] = useState([]);

  useEffect(() => {
    const fetchRoofing = async () => {
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

      const roofingCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/exterior/${exteriorDocId}/roofing`
      );

      const roofingSnapshot = await getDocs(roofingCollectionRef);
      const materials = [];
      const costs = {};

      roofingSnapshot.forEach((doc) => {
        const roofingData = doc.data();
        materials.push(roofingData.name);
        costs[roofingData.name] = roofingData.price;
      });

      setRoofingMaterials(materials);
      handleChange({ target: { name: "roofingMaterialCosts", value: costs } });
    };

    fetchRoofing();
  }, [handleChange]);

  return (
    <>
      <div className="form-control">
        <label htmlFor="roofingMaterial" className="block mb-2">
          Roofing Material
        </label>
        <select
          name="roofingMaterial"
          id="roofingMaterial"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          onChange={handleChange}
          value={formData.roofingMaterial}
        >
          <option value="">Select a material</option>
          {roofingMaterials.map((roofingMaterial) => (
            <option key={roofingMaterial} value={roofingMaterial}>
              {roofingMaterial}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="roofingSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          name="roofingSqFootage"
          id="roofingSqFootage"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          value={formData.roofingSqFootage}
          onChange={handleChange}
          step="0.01"
        />
      </div>
    </>
  );
};

export default RoofingForm;
