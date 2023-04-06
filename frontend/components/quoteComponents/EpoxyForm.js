import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";

export const calculateEpoxyCost = (epoxyMaterial, epoxySqFootage, epoxyMaterialCosts) => {
  const costPerSqFoot = epoxyMaterialCosts[epoxyMaterial];
  const totalCost = costPerSqFoot * epoxySqFootage;

  return totalCost;
};

const EpoxyForm = ({ handleChange, formData }) => {
  const [epoxyMaterials, setEpoxyMaterials] = useState([]);

  useEffect(() => {
    const fetchEpoxyMaterials = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id; // Assuming there is at least one document in priceUpdates collection

      const epoxyMaterialsCollectionRef = collection(db, `priceUpdates/${priceUpdatesDocId}/epoxyMaterials`);
      const epoxySnapshot = await getDocs(epoxyMaterialsCollectionRef);
      const materials = [];
      const costs = {};

      epoxySnapshot.forEach((doc) => {
        const materialData = doc.data();
        materials.push(materialData.name);
        costs[materialData.name] = materialData.price;
      });

      setEpoxyMaterials(materials);
      handleChange({ target: { name: "epoxyMaterialCosts", value: costs } });
    };

    fetchEpoxyMaterials();
  }, []);

  return (
    <>
      <div className="form-control mb-4">
        <label htmlFor="epoxyMaterial" className="block mb-2">
          Material
        </label>
        <select
          name="epoxyMaterial"
          id="epoxyMaterial"
          value={formData.epoxyMaterial}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        >
          <option value="">Select a material</option>
          {epoxyMaterials.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="epoxySqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          name="epoxySqFootage"
          id="epoxySqFootage"
          value={formData.epoxySqFootage}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
    </>
  );
};

export default EpoxyForm;
