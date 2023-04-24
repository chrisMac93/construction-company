import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { renderSwitch } from "./RenderSwitch";

export const calculateDeckPatioCost = (
  deckPatioMaterial,
  deckPatioSqFootage,
  deckPatioLighting,
  deckPatioHandrails,
  deckPatioMaterialCosts,
  handrailsCost,
  lightingCost
) => {
  const deckPatioLightingCostPerSqFoot = lightingCost;
  const deckPatioHandrailsCostPerSqFoot = handrailsCost;

  const costPerSqFoot = deckPatioMaterialCosts[deckPatioMaterial];
  let totalCost = costPerSqFoot * deckPatioSqFootage;

  if (deckPatioLighting) {
    totalCost += deckPatioLightingCostPerSqFoot * deckPatioSqFootage;
  }

  if (deckPatioHandrails) {
    totalCost += deckPatioHandrailsCostPerSqFoot * deckPatioSqFootage;
  }

  console.log("Deck/Patio Cost: ", totalCost);
  return totalCost;
};

const DeckPatioForm = ({ handleChange, formData }) => {
  const [deckPatioMaterials, setDeckPatioMaterials] = useState([]);
  const [handrailsCost, setHandrailsCost] = useState(0);
  const [lightingCost, setLightingCost] = useState(0);

  useEffect(() => {
    const fetchDeckPatioMaterials = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id; // Assuming there is at least one document in priceUpdates collection

      const deckPatioMaterialsCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/deckMaterials`
      );

      const deckPatioMaterialsSnapShot = await getDocs(deckPatioMaterialsCollectionRef);
      const deckPatioMaterialsDocId = deckPatioMaterialsSnapShot.docs[0].id; // Assuming there is at least one document in deckPatioMaterials collection

      const deckingMaterialsCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/deckMaterials/${deckPatioMaterialsDocId}/deckingMaterials`
      );
      const deckPatioHandrailsCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/deckMaterials/${deckPatioMaterialsDocId}/deckHandrails`
      );
      const deckPatioLightingCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/deckMaterials/${deckPatioMaterialsDocId}/deckLighting`
      );

      const deckingMaterialsSnapshot = await getDocs(
        deckingMaterialsCollectionRef
      );
      const deckPatioHandrailsSnapshot = await getDocs(deckPatioHandrailsCollectionRef);
      const deckPatioLightingSnapshot = await getDocs(deckPatioLightingCollectionRef);

      const materials = [];

      const costs = {};

      deckingMaterialsSnapshot.forEach((doc) => {
        const materialData = doc.data();
        materials.push(materialData.name);
        costs[materialData.name] = materialData.price;
      });

      deckPatioHandrailsSnapshot.forEach((doc) => {
        const handrailsData = doc.data();
        setHandrailsCost(handrailsData.price);
      });

      deckPatioLightingSnapshot.forEach((doc) => {
        const lightingData = doc.data();
        setLightingCost(lightingData.price);
      });

      setDeckPatioMaterials(materials);
      handleChange({ target: { name: "deckPatioMaterialCosts", value: costs } });
    };

    fetchDeckPatioMaterials();
  }, []);

  const handleSwitchChange = (e) => {
    const { name, cost } = e.target;

    if (name === "deckPatioHandrails") {
      handleChange({ target: { name: "handrailsCost", value: cost } });
    } else if (name === "deckPatioLighting") {
      handleChange({ target: { name: "lightingCost", value: cost } });
    }

    handleChange(e);
  };

  return (
    <>
      <div className="form-control">
        <label htmlFor="deckPatioMaterial" className="block mb-2">
          Deck/Patio Material
        </label>
        <select
          name="deckPatioMaterial"
          id="deckPatioMaterial"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          value={formData.deckPatioMaterial}
          onChange={handleChange}
        >
          <option value="">Select a Deck/Patio Material</option>
          {deckPatioMaterials.map((deckPatioMaterial) => (
            <option key={deckPatioMaterial} value={deckPatioMaterial}>
              {deckPatioMaterial}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="deckPatioSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          name="deckPatioSqFootage"
          id="deckPatioSqFootage"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          value={formData.deckPatioSqFootage}
          onChange={handleChange}
        />
      </div>
      <div className="form-control mb-4">
        {renderSwitch(
          "deckPatioHandrails",
          "deckPatioHandrails",
          formData.deckPatioHandrails || false,
          handleSwitchChange,
          handrailsCost
        )}
        <label className="ml-1 text-lg">Do you want handrails?</label>
      </div>
      <div className="form-control">
        {renderSwitch(
          "deckPatioLighting",
          "deckPatioLighting",
          formData.deckPatioLighting || false,
          handleSwitchChange,
          lightingCost
        )}
        <label className="ml-1 text-lg">Do you want lighting?</label>
      </div>
    </>
  );
};

export default DeckPatioForm;
