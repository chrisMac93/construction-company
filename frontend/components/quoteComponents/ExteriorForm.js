import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import RoofingForm from "./ExteriorForms/RoofingForm";
import SidingForm from "./ExteriorForms/SidingForm";
import { calculateRoofingCost } from "./ExteriorForms/RoofingForm";
import { calculateSidingCost } from "./ExteriorForms/SidingForm";

import { renderSwitch } from "./RenderSwitch";

import styles from "../../styles/Home.module.css";

export const calculateExteriorCost = (formData, landscapingCost) => {
  let totalCost = 0;

  if (formData.roofingIncluded) {
    totalCost += calculateRoofingCost(
      formData.roofingMaterial,
      formData.roofingSqFootage,
      formData.roofingMaterialCosts
    );
  }

  if (formData.sidingIncluded) {
    totalCost += calculateSidingCost(
      formData.sidingMaterial,
      formData.sidingSqFootage,
      formData.sidingMaterialCosts
    );
  }

  if (formData.landscapingIncluded) {
    totalCost += landscapingCost;
  }

  return totalCost;
};

const ExteriorForm = ({ handleChange, formData }) => {
  const [landscapingCost, setLandscapingCost] = useState(0);

  useEffect(() => {
    const fetchExterior = async () => {
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

      const landscapingRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/exterior/${exteriorDocId}/landscaping`
      );

      const landscapingSnapshot = await getDocs(landscapingRef);

      const landscapingCost = {};

      landscapingSnapshot.forEach((doc) => {
        const landscapingData = doc.data();
        landscapingCost[landscapingData.name] = landscapingData.price;
      });

      setLandscapingCost(landscapingCost);
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
        <label htmlFor="roofingIncluded" className="ml-1 font-semibold">
          Do You Need Roofing?
        </label>
      </div>
      {formData.roofingIncluded && (
        <RoofingForm handleChange={handleChange} formData={formData} />
      )}
      <div className="form-control">
        {renderSwitch(
          "sidingIncluded",
          "sidingIncluded",
          formData.sidingIncluded,
          handleChange
        )}
        <label htmlFor="sidingIncluded" className="ml-1 font-semibold">
          Do You Need Siding?
        </label>
      </div>
      {formData.sidingIncluded && (
        <SidingForm handleChange={handleChange} formData={formData} />
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
          Do You Need Landscaping?{" "}
        </span>

        <span className="font-bold italic text-neutral-400">
          (this service will be subcontracted)
        </span>
      </div>
    </>
  );
};

export default ExteriorForm;
