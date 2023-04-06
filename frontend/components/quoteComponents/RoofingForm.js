import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const calculateRoofingCost = (roofingMaterial, roofingSqFootage, roofingMaterialCosts) => {

  const costPerSqFoot = roofingMaterialCosts[roofingMaterial];
  const totalCost = costPerSqFoot * roofingSqFootage;

  return totalCost;
};

const RoofingForm = ({ handleChange, formData }) => {
  const [roofingMaterials, setRoofingMaterials] = useState([]);

  useEffect(() => {
    const fetchRoofingMaterials = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id; // Assuming there is at least one document in priceUpdates collection

      const roofingMaterialsCollectionRef = collection(db, `priceUpdates/${priceUpdatesDocId}/roofingMaterials`);
      const roofingSnapshot = await getDocs(roofingMaterialsCollectionRef);
      const materials = [];
      const costs = {};

      roofingSnapshot.forEach((doc) => {
        const materialData = doc.data();
        materials.push(materialData.name);
        costs[materialData.name] = materialData.price;
      });

      setRoofingMaterials(materials);
      handleChange({ target: { name: "roofingMaterialCosts", value: costs } });
    };

    fetchRoofingMaterials();
  }, []);

  return (
    <>
      <div className="form-control">
        <label htmlFor="roofingMaterial" className="block mb-2">
          Material
        </label>
        <select
          id="roofingMaterial"
          name="roofingMaterial"
          value={formData.roofingMaterial}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
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
          id="roofingSqFootage"
          name="roofingSqFootage"
          value={formData.roofingSqFootage}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
    </>
  );
};

export default RoofingForm;