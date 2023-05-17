import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const calculateKitchenCabinetCost = (
  kitchenCabinetMaterial,
  kitchenCabinetSqFootage,
  kitchenCabinetMaterialCosts
) => {
  if (
    !kitchenCabinetMaterial ||
    !kitchenCabinetSqFootage ||
    !kitchenCabinetMaterialCosts
  ) {
    return 0;
  }

  const totalCost =
    kitchenCabinetSqFootage *
    kitchenCabinetMaterialCosts[kitchenCabinetMaterial];

  console.log(
    "kitchenCabinet Data: ",
    kitchenCabinetMaterialCosts[kitchenCabinetMaterial]
  );
  return totalCost;
};

const kitchenCabinetsForm = ({ handleChange, formData }) => {
  const [kitchenCabinetMaterials, setKitchenCabinetMaterials] = useState([]);

  useEffect(() => {
    const fetchKitchenCabinetMaterials = async () => {
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

      const kitchenCabinetMaterialsCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/kitchenMaterials/${kitchenMaterialsDocId}/kitchenCabinetMaterials`
      );

      const kitchenCabinetMaterialsSnapshot = await getDocs(
        kitchenCabinetMaterialsCollectionRef
      );
      const materials = [];
      const costs = {};

      kitchenCabinetMaterialsSnapshot.forEach((doc) => {
        const kitchenCabinetData = doc.data();
        materials.push(kitchenCabinetData.name);
        costs[kitchenCabinetData.name] = kitchenCabinetData.price;
      });

      setKitchenCabinetMaterials(materials);
      handleChange({
        target: { name: "kitchenCabinetMaterialCosts", value: costs },
      });
    };

    fetchKitchenCabinetMaterials();
  }, []);

  return (
    <>
      <div className="form-control">
        <label htmlFor="kitchenCabinetMaterial" className="block mb-2">
          kitchen Cabinet Material
        </label>
        <select
          name="kitchenCabinetMaterial"
          id="kitchenCabinetMaterial"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          onChange={handleChange}
          value={formData.kitchenCabinetMaterial}
        >
          <option value="">Select a material</option>
          {kitchenCabinetMaterials.map((kitchenCabinetMaterial) => (
            <option key={kitchenCabinetMaterial} value={kitchenCabinetMaterial}>
              {kitchenCabinetMaterial}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="kitchenCabinetSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          name="kitchenCabinetSqFootage"
          id="kitchenCabinetSqFootage"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          value={formData.kitchenCabinetSqFootage}
          onChange={handleChange}
          step="0.01"
        />
      </div>
    </>
  );
};

export default kitchenCabinetsForm;
