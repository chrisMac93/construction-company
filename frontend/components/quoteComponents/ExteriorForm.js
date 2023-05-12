import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { renderSwitch } from "./RenderSwitch";

import styles from "../../styles/Home.module.css";

export const calculateExteriorCost = (
  formData,
  roofingMaterial,
  sidingMaterial,
  roofingSqFootage,
  sidingSqFootage,
  roofingMaterialCosts,
  sidingMaterialCosts,
  landscapingCost
) => {
  let totalCost = 0;

  const roofingCost = roofingSqFootage * roofingMaterialCosts[roofingMaterial];
  console.log("Roofing Data: ", roofingMaterialCosts[roofingMaterial]);
  const sidingCost = sidingSqFootage * sidingMaterialCosts[sidingMaterial];

  if (formData.roofingIncluded && roofingMaterial) {
    totalCost += roofingCost;
  }

  if (formData.sidingIncluded && sidingMaterial) {
    totalCost += sidingCost;
  }

  if (formData.landscapingIncluded) {
    totalCost += landscapingCost;
  }

  return totalCost;
};

const ExteriorForm = ({ handleChange, formData }) => {
  const [roofingMaterials, setRoofingMaterials] = useState([]);
  const [sidingMaterials, setSidingMaterials] = useState([]);
  const [landscapingCost, setLandscapingCost] = useState(0);

  useEffect(() => {
    const fetchExterior = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id;

      const exteriorRef = collection(
        db,
        "priceUpdates",
        priceUpdatesDocId,
        "exterior"
      );

      const exteriorSnapshot = await getDocs(exteriorRef);

      const exteriorDocId = exteriorSnapshot.docs[0].id;

      const roofingMaterialsRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/exterior/${exteriorDocId}/roofing`
      );

      const sidingMaterialsRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/exterior/${exteriorDocId}/siding`
      );

      const landscapingRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/exterior/${exteriorDocId}/landscaping`
      );

      const roofingSnapshot = await getDocs(roofingMaterialsRef);
      const sidingSnapshot = await getDocs(sidingMaterialsRef);
      const landscapingSnapshot = await getDocs(landscapingRef);

      const roofingMaterials = [];
      const roofingCosts = {};
      const sidingMaterials = [];
      const sidingCosts = {};
      const landscapingCost = {};

      roofingSnapshot.forEach((doc) => {
        const materialData = doc.data();
        roofingMaterials.push(materialData.name);
        roofingCosts[materialData.name] = materialData.price;
      });

      sidingSnapshot.forEach((doc) => {
        const materialData = doc.data();
        sidingMaterials.push(materialData.name);
        sidingCosts[materialData.name] = materialData.price;
      });

      landscapingSnapshot.forEach((doc) => {
        const landscapingData = doc.data();
        landscapingCost[landscapingData.name] = landscapingData.price;
      });

      setRoofingMaterials(roofingMaterials);
      setSidingMaterials(sidingMaterials);
      setLandscapingCost(landscapingCost);
      console.log("Roofing Cost:", roofingCosts);
      console.log("Siding Cost:", sidingCosts);
      console.log("Landscaping Cost:", landscapingCost);
    };

    fetchExterior();
  }, []);

  const handleSwitchChange = (e) => {
    const { name, value, cost } = e.target;
    let updatedCost = value ? parseInt(cost) : 0;

    if (name === "landscapingIncluded") {
      handleChange({
        target: {
          name: "landscapingCost",
          value: updatedCost,
        },
      });
    }
    console.log("Updated Cost", updatedCost);
    handleChange(e);
  };

  return (
    <>
      <div className="flex justify-center">
        <h1 className={`text-lg font-bold ${styles.mcColor}`}>
          Please check any options you would like to be included in your quote
        </h1>
      </div>
      <div className="form-control">
        {renderSwitch(
          "roofingIncluded",
          "roofingIncluded",
          formData.roofingIncluded,
          handleChange
        )}
        <label htmlFor="roofingIncluded" className="ml-1 text-lg">
          Do You Need Roofing?
        </label>
      </div>
      {formData.roofingIncluded && (
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
      )}
      <div className="form-control">
        {renderSwitch(
          "sidingIncluded",
          "sidingIncluded",
          formData.sidingIncluded,
          handleChange
        )}
        <label htmlFor="sidingIncluded" className="ml-1 text-lg">
          Do You Need Siding?
        </label>
      </div>
      {formData.sidingIncluded && (
        <>
          <div className="form-control">
            <label htmlFor="sidingMaterial" className="block mb-2">
              Siding Material
            </label>
            <select
              name="sidingMaterial"
              id="sidingMaterial"
              className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
              onChange={handleChange}
              value={formData.sidingMaterial}
            >
              <option value="">Select a material</option>
              {sidingMaterials.map((sidingMaterial) => (
                <option key={sidingMaterial} value={sidingMaterial}>
                  {sidingMaterial}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="sidingSqFootage" className="block mb-2">
              Square Footage
            </label>
            <input
              type="number"
              name="sidingSqFootage"
              id="sidingSqFootage"
              className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
              value={formData.sidingSqFootage}
              onChange={handleChange}
              step="0.01"
            />
          </div>
        </>
      )}
      <div className="form-control">
        {renderSwitch(
          "landscapingIncluded",
          "landscapingIncluded",
          formData.landscapingIncluded || false,
          handleSwitchChange,
          landscapingCost["Landscaping"]
        )}
        <span className="ml-3 mb-1 text-neutral-100 font-semibold">
          Do You Need Landscaping?
        </span>

        <span className={`ml-3 font-bold italic ${styles.mcColor}`}>
          (This service will require more information to be provided by you.)
        </span>
      </div>
    </>
  );
};

export default ExteriorForm;
