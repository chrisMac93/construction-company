import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const calculateConcreteCost = (concreteMaterial, concreteSqFootage, concreteMaterialCosts) => {
  
    const costPerSqFoot = concreteMaterialCosts[concreteMaterial];
    const totalCost = costPerSqFoot * concreteSqFootage;
  
    return totalCost;
  };

const ConcreteForm = ({ handleChange, formData }) => {
  const [concreteMaterials, setConcreteMaterials] = useState([]);

  useEffect(() => {
    const fetchConcreteMaterials = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id; // Assuming there is at least one document in priceUpdates collection

      const concreteMaterialsCollectionRef = collection(db, `priceUpdates/${priceUpdatesDocId}/concreteMaterials`);
      const ConcreteSnapshot = await getDocs(concreteMaterialsCollectionRef);
      const materials = [];
      const costs = {};

      ConcreteSnapshot.forEach((doc) => {
        const materialData = doc.data();
        materials.push(materialData.name);
        costs[materialData.name] = materialData.price;
      });

      setConcreteMaterials(materials);
      handleChange({ target: { name: "concreteMaterialCosts", value: costs } });
    };

    fetchConcreteMaterials();
  }, []);

  return (
    <>
      <div className="form-control">
        <label htmlFor="concreteMaterial" className="block mb-2 font-semibold">Concrete Material</label>
        <select
          name="concreteMaterial"
          id="concreteMaterial"
          value={formData.concreteMaterial}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        >
          <option value="">Select a concrete type</option>
          {concreteMaterials.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="concreteSqFootage" className="block mb-2 font-semibold">Square Footage</label>
        <input
          type="number"
          name="concreteSqFootage"
          id="concreteSqFootage"
          value={formData.concreteSqFootage}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
    </>
  );
};

export default ConcreteForm;
