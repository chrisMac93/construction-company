import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import DrywallOption from "./drywallOption";
import FlooringForm from "./FlooringForm";
import SinkForm from "./BathroomMaterialsForms/SinkForm";
import ToiletForm from "./BathroomMaterialsForms/ToiletForm";
import ShowerTubForm from "./BathroomMaterialsForms/ShowerTubForm";
import { calculateShowerTubCost } from "./BathroomMaterialsForms/ShowerTubForm";
import { calculateToiletCost } from "./BathroomMaterialsForms/ToiletForm";
import { calculateFlooringCost } from "./FlooringForm";
import { calculateDrywallCost } from "./drywallOption";
import { calculateSinkCost } from "./BathroomMaterialsForms/SinkForm";

import { renderSwitch } from "./RenderSwitch";

import styles from "../../styles/Home.module.css";

export const calculateBathroomCost = (
  formData,
  bathPlumbingCost,
  bathLightingCost
) => {
  let totalCost = 0;

  if (formData.bathFlooringNeeded) {
    totalCost += calculateFlooringCost(
      formData.flooringMaterial,
      formData.flooringSqFootage,
      formData.flooringMaterialCosts
    );
  }

  if (formData.bathDrywallNeeded) {
    totalCost += calculateDrywallCost(
      formData.drywallPricePerSqFoot,
      formData.drywallSqFootage
    );
  }

  if (formData.bathSinkNeeded) {
    totalCost += calculateSinkCost(formData.sinkType, formData.sinkCost);
  }

  if (formData.toiletNeeded) {
    totalCost += calculateToiletCost(formData.toiletType, formData.toiletCost);
  }

  if (formData.showerTubNeeded) {
    totalCost += calculateShowerTubCost(
      formData.showerTubType,
      formData.showerTubCost
    );
  }

  if (formData.bathPlumbing) {
    totalCost += bathPlumbingCost;
  }

  if (formData.bathLighting) {
    totalCost += bathLightingCost;
  }

  return totalCost;
};

const BathroomForm = ({ handleChange, formData }) => {
  const [bathLightingCost, setBathLightingCost] = useState(0);
  const [bathPlumbingCost, setBathbathPlumbingCost] = useState(0);

  useEffect(() => {
    const fetchBathroomTiers = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id;

      const bathroomTiersCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/bathroomTiers`
      );
      const bathroomTiersSnapshot = await getDocs(bathroomTiersCollectionRef);
      const bathroomTiersDocId = bathroomTiersSnapshot.docs[0].id;

      const bathLightingCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/bathroomTiers/${bathroomTiersDocId}/bathLighting`
      );

      const bathPlumbingCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/bathroomTiers/${bathroomTiersDocId}/bathPlumbing`
      );

      const bathLightingSnapshot = await getDocs(bathLightingCollectionRef);
      const bathPlumbingSnapshot = await getDocs(bathPlumbingCollectionRef);

      const bathLightingCosts = {};
      const bathPlumbingCosts = {};

      bathLightingSnapshot.forEach((doc) => {
        bathLightingCosts[doc.data().name] = doc.data().price;
      });

      bathPlumbingSnapshot.forEach((doc) => {
        bathPlumbingCosts[doc.data().name] = doc.data().price;
      });

      setBathLightingCost(bathLightingCosts);
      setBathbathPlumbingCost(bathPlumbingCosts);
    };

    fetchBathroomTiers();
  }, []);

  const handleSwitchChange = (e) => {
    const { name, value, cost } = e.target;
    let updatedCost = value ? parseInt(cost) : 0;

    if (name === "bathPlumbing") {
      handleChange({
        target: {
          name: "bathPlumbingCost",
          value: updatedCost,
        },
      });
    }

    if (name === "bathLighting") {
      handleChange({
        target: {
          name: "bathLightingCost",
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
          "bathFlooringNeeded",
          "bathFlooringNeeded",
          formData.bathFlooringNeeded,
          handleChange
        )}
        <label className="ml-1 font-semibold">Flooring Included?</label>
      </div>

      {formData.bathFlooringNeeded && (
        <FlooringForm handleChange={handleChange} formData={formData} />
      )}
      <div className="form-control">
        {renderSwitch(
          "bathDrywallNeeded",
          "bathDrywallNeeded",
          Boolean(formData.bathDrywallNeeded),
          handleChange
        )}
        <label className="ml-1 font-semibold">Drywall Included?</label>
      </div>

      {formData.bathDrywallNeeded && (
        <DrywallOption handleChange={handleChange} formData={formData} />
      )}

      <div className="form-control">
        {renderSwitch(
          "bathSinkNeeded",
          "bathSinkNeeded",
          formData.bathSinkNeeded || false,
          handleChange
        )}
        <label className="ml-1 font-semibold">Sink Included?</label>
      </div>

      {formData.bathSinkNeeded && (
        <SinkForm handleChange={handleChange} formData={formData} />
      )}

      <div className="form-control">
        {renderSwitch(
          "toiletNeeded",
          "toiletNeeded",
          formData.toiletNeeded || false,
          handleChange
        )}
        <label className="ml-1 font-semibold">Toilet Included?</label>
      </div>

      {formData.toiletNeeded && (
        <ToiletForm handleChange={handleChange} formData={formData} />
      )}

      <div className="form-control">
        {renderSwitch(
          "showerTubNeeded",
          "showerTubNeeded",
          formData.showerTubNeeded || false,
          handleChange
        )}
        <label className="ml-1 font-semibold">Shower/Tub Included?</label>
      </div>
      {formData.showerTubNeeded && (
        <ShowerTubForm handleChange={handleChange} formData={formData} />
      )}
      <div className="form-control">
        {renderSwitch(
          "bathPlumbing",
          "bathPlumbing",
          formData.bathPlumbing || false,
          handleSwitchChange,
          bathPlumbingCost["plumbing"]
        )}
        <label htmlFor="bathPlumbing" className="ml-1 font-semibold">
          Do You Need Plumbing?{" "}
          <span className="font-bold italic text-neutral-400">
            (this service will be subcontracted)
          </span>
        </label>
      </div>
      <div className="form-control">
        {renderSwitch(
          "bathLighting",
          "bathLighting",
          formData.bathLighting || false,
          handleSwitchChange,
          bathLightingCost["lighting"]
        )}
        <label htmlFor="bathLighting" className="ml-1 font-semibold">
          Do You Need Lighting?
        </label>
      </div>
    </>
  );
};

export default BathroomForm;
