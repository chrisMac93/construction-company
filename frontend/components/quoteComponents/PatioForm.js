import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { renderSwitch } from "./RenderSwitch";

export const calculatePatioCost = (
  patioMaterial,
  patioSqFootage,
  patioLighting,
  patioHandrails,
  patioMaterialCosts,
  handrailsCost,
  lightingCost
) => {
  // const patioMaterialCosts = {
  //   "Hardwood Patio Materials": 15,
  //   "Redwood Patio": 12,
  //   Cedar: 10,
  //   "Bamboo Patio Materials": 8,
  //   Mahogany: 18,
  //   "Pressure-Treated Pine": 7,
  //   "Composite, Plastic & PVC": 12,
  //   "Aluminum Patio": 15,
  //   "Fiberglass Patio Materials": 14,
  //   "Cement Board or Concrete Patio": 13,
  //   "Solid Stone": 20,
  //   Rubber: 9,
  // };

  const patioLightingCostPerSqFoot = lightingCost;
  const patioHandrailsCostPerSqFoot = handrailsCost;

  const costPerSqFoot = patioMaterialCosts[patioMaterial];
  let totalCost = costPerSqFoot * patioSqFootage;

  if (patioLighting) {
    totalCost += patioLightingCostPerSqFoot * patioSqFootage;
  }

  if (patioHandrails) {
    totalCost += patioHandrailsCostPerSqFoot * patioSqFootage;
  }

  return totalCost;
};

const PatioForm = ({ handleChange, formData }) => {
  const [patioMaterials, setPatioMaterials] = useState([]);
  const [handrailsCost, setHandrailsCost] = useState(0);
  const [lightingCost, setLightingCost] = useState(0);

  // const patioMaterials = [
  //   "Hardwood Patio Materials",
  //   "Redwood Patio",
  //   "Cedar",
  //   "Bamboo Patio Materials",
  //   "Mahogany",
  //   "Pressure-Treated Pine",
  //   "Composite, Plastic & PVC",
  //   "Aluminum Patio",
  //   "Fiberglass Patio Materials",
  //   "Cement Board or Concrete Patio",
  //   "Solid Stone",
  //   "Rubber",
  // ];

  useEffect(() => {
    const fetchPatioMaterials = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id; // Assuming there is at least one document in priceUpdates collection

      const patioCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/patio`
      );

      const patioSnapShot = await getDocs(patioCollectionRef);
      const patioDocId = patioSnapShot.docs[0].id; // Assuming there is at least one document in deckMaterials collection

      const patioMaterialsCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/patio/${patioDocId}/patioMaterials`
      );
      const patioHandrailsCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/patio/${patioDocId}/patioHandrails`
      );
      const patioLightingCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/patio/${patioDocId}/patioLighting`
      );

      const patioMaterialsSnapshot = await getDocs(
        patioMaterialsCollectionRef
      );
      const patioHandrailsSnapshot = await getDocs(patioHandrailsCollectionRef);
      const patioLightingSnapshot = await getDocs(patioLightingCollectionRef);

      const materials = [];

      const costs = {};

      patioMaterialsSnapshot.forEach((doc) => {
        const materialData = doc.data();
        materials.push(materialData.name);
        costs[materialData.name] = materialData.price;
      });

      patioHandrailsSnapshot.forEach((doc) => {
        const handrailsData = doc.data();
        setHandrailsCost(handrailsData.price);
      });

      patioLightingSnapshot.forEach((doc) => {
        const lightingData = doc.data();
        setLightingCost(lightingData.price);
      });

      setPatioMaterials(materials);
      handleChange({ target: { name: "patioMaterialCosts", value: costs } });
    };

    fetchPatioMaterials();
  }, []);

  const handleSwitchChange = (e) => {
    const { name, cost } = e.target;

    if (name === "patioHandrails") {
      handleChange({ target: { name: "handrailsCost", value: cost } });
    } else if (name === "patioLighting") {
      handleChange({ target: { name: "lightingCost", value: cost } });
    }

    handleChange(e);
  };

  return (
    <>
      <div className="form-control mb-4">
        <label htmlFor="patioMaterial" className="block mb-2">
          Patio Material
        </label>
        <select
          name="patioMaterial"
          id="patioMaterial"
          value={formData.patioMaterial}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        >
          <option value="">Select a patio Material</option>
          {patioMaterials.map((patioMaterial) => (
            <option key={patioMaterial} value={patioMaterial}>
              {patioMaterial}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control mb-4">
        <label htmlFor="patioSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          name="patioSqFootage"
          id="patioSqFootage"
          value={formData.patioSqFootage}
          onChange={handleChange}
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
        />
      </div>
      <div className="form-control mb-4">
        {renderSwitch(
          "patioHandrails",
          "patioHandrails",
          formData.patioHandrails || false,
          handleSwitchChange,
          handrailsCost
        )}
        <label className="ml-1 text-lg">Do you want handrails?</label>
      </div>
      <div className="form-control">
        {renderSwitch(
          "patioLighting",
          "patioLighting",
          formData.patioLighting || false,
          handleSwitchChange,
          lightingCost
        )}
        <label className="ml-1 text-lg">Do you want lighting?</label>
      </div>
    </>
  );
};

export default PatioForm;
