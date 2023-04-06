import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { renderSwitch } from "./RenderSwitch";

export const calculateDeckCost = (
  deckMaterial,
  deckSqFootage,
  deckLighting,
  deckHandrails,
  deckMaterialCosts,
  handrailsCost,
  lightingCost
) => {
  const deckLightingCostPerSqFoot = lightingCost;
  const deckHandrailsCostPerSqFoot = handrailsCost;

  const costPerSqFoot = deckMaterialCosts[deckMaterial];
  let totalCost = costPerSqFoot * deckSqFootage;

  if (deckLighting) {
    totalCost += deckLightingCostPerSqFoot * deckSqFootage;
  }

  if (deckHandrails) {
    totalCost += deckHandrailsCostPerSqFoot * deckSqFootage;
  }

  return totalCost;
};

const DeckForm = ({ handleChange, formData }) => {
  const [deckMaterials, setDeckMaterials] = useState([]);
  const [handrailsCost, setHandrailsCost] = useState(0);
  const [lightingCost, setLightingCost] = useState(0);

  useEffect(() => {
    const fetchDeckMaterials = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id; // Assuming there is at least one document in priceUpdates collection

      const deckMaterialsCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/deckMaterials`
      );

      const deckMaterialsSnapShot = await getDocs(deckMaterialsCollectionRef);
      const deckMaterialsDocId = deckMaterialsSnapShot.docs[0].id; // Assuming there is at least one document in deckMaterials collection

      const deckingMaterialsCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/deckMaterials/${deckMaterialsDocId}/deckingMaterials`
      );
      const deckHandrailsCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/deckMaterials/${deckMaterialsDocId}/deckHandrails`
      );
      const deckLightingCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/deckMaterials/${deckMaterialsDocId}/deckLighting`
      );

      const deckingMaterialsSnapshot = await getDocs(
        deckingMaterialsCollectionRef
      );
      const deckHandrailsSnapshot = await getDocs(deckHandrailsCollectionRef);
      const deckLightingSnapshot = await getDocs(deckLightingCollectionRef);

      const materials = [];

      const costs = {};

      deckingMaterialsSnapshot.forEach((doc) => {
        const materialData = doc.data();
        materials.push(materialData.name);
        costs[materialData.name] = materialData.price;
      });

      deckHandrailsSnapshot.forEach((doc) => {
        const handrailsData = doc.data();
        setHandrailsCost(handrailsData.price);
      });

      deckLightingSnapshot.forEach((doc) => {
        const lightingData = doc.data();
        setLightingCost(lightingData.price);
      });

      setDeckMaterials(materials);
      handleChange({ target: { name: "deckMaterialCosts", value: costs } });
    };

    fetchDeckMaterials();
  }, []);

  const handleSwitchChange = (e) => {
    const { name, cost } = e.target;

    if (name === "deckHandrails") {
      handleChange({ target: { name: "handrailsCost", value: cost } });
    } else if (name === "deckLighting") {
      handleChange({ target: { name: "lightingCost", value: cost } });
    }

    handleChange(e);
  };

  return (
    <>
      <div className="form-control">
        <label htmlFor="deckMaterial" className="block mb-2">
          Deck Material
        </label>
        <select
          name="deckMaterial"
          id="deckMaterial"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          value={formData.deckMaterial}
          onChange={handleChange}
        >
          <option value="">Select a deck Material</option>
          {deckMaterials.map((deckMaterial) => (
            <option key={deckMaterial} value={deckMaterial}>
              {deckMaterial}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="deckSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          name="deckSqFootage"
          id="deckSqFootage"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          value={formData.deckSqFootage}
          onChange={handleChange}
        />
      </div>
      <div className="form-control mb-4">
        {renderSwitch(
          "deckHandrails",
          "deckHandrails",
          formData.deckHandrails || false,
          handleSwitchChange,
          handrailsCost
        )}
        <label className="ml-1 text-lg">Do you want handrails?</label>
      </div>
      <div className="form-control">
        {renderSwitch(
          "deckLighting",
          "deckLighting",
          formData.deckLighting || false,
          handleSwitchChange,
          lightingCost
        )}
        <label className="ml-1 text-lg">Do you want lighting?</label>
      </div>
    </>
  );
};

export default DeckForm;
