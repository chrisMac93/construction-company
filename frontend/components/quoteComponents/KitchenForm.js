import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import DrywallOption from "./drywallOption";
import FlooringForm from "./FlooringForm";
import CountertopsForm from "./KitchenMaterialsForms/CountertopsForm";
import CabinetsForm from "./KitchenMaterialsForms/CabinetsForm";
import { calculateDrywallCost } from "./drywallOption";
import { calculateFlooringCost } from "./FlooringForm";
import { calculateCounterTopCost } from "./KitchenMaterialsForms/CountertopsForm";
import { calculateKitchenCabinetCost } from "./KitchenMaterialsForms/CabinetsForm";

import { renderSwitch } from "./RenderSwitch";

import styles from "../../styles/Home.module.css";

export const calculateKitchenCost = (
  formData,
  islandCost,
  plumbingCost,
  lightingCost
) => {
  let totalCost = 0;

  if (formData.kitchenFlooringIncluded) {
    totalCost += calculateFlooringCost(
      formData.flooringMaterial,
      formData.flooringSqFootage,
      formData.flooringMaterialCosts
    );
  }

  if (formData.kitchenDrywallIncluded) {
    totalCost += calculateDrywallCost(
      formData.drywallPricePerSqFoot,
      formData.drywallSqFootage
    );
  }

  if (formData.kitchenCountertopIncluded) {
    totalCost += calculateCounterTopCost(
      formData.countertopMaterial,
      formData.countertopSqFootage,
      formData.countertopMaterialCosts
    );
  }

  if (formData.kitchenCabinetIncluded) {
    totalCost += calculateKitchenCabinetCost(
      formData.kitchenCabinetMaterial,
      formData.kitchenCabinetSqFootage,
      formData.kitchenCabinetMaterialCosts
    );
  }

  if (formData.island) {
    totalCost += islandCost;
  }

  if (formData.kitchenPlumbing) {
    totalCost += plumbingCost;
  }

  if (formData.kitchenLighting) {
    totalCost += lightingCost;
  }

  return totalCost;
};

const KitchenForm = ({ handleChange, formData }) => {
  const [islandCost, setIslandCost] = useState(0);
  const [plumbingCost, setPlumbingCost] = useState(0);
  const [lightingCost, setLightingCost] = useState(0);

  useEffect(() => {
    const fetchMaterialsData = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id;

      const kitchenMaterialsCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/kitchenMaterials`
      );

      const kitchenMaterialsSnapShot = await getDocs(
        kitchenMaterialsCollectionRef
      );
      const kitchenMaterialsDocId = kitchenMaterialsSnapShot.docs[0].id;

      const includedCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/kitchenMaterials/${kitchenMaterialsDocId}/included`
      );

      const includedSnapshot = await getDocs(includedCollectionRef);

      const newIncludedOptionsCosts = {};

      includedSnapshot.docs.forEach((doc) => {
        const { name, price } = doc.data();
        newIncludedOptionsCosts[name] = price;
      });
      setIslandCost(newIncludedOptionsCosts.island);
      setPlumbingCost(newIncludedOptionsCosts.plumbing);
      setLightingCost(newIncludedOptionsCosts.lighting);
    };

    fetchMaterialsData();
  }, []);

  const handleSwitchChange = (e) => {
    const { name, value, cost } = e.target;
    let updatedCost = value ? parseInt(cost, 10) : 0;

    if (name === "island") {
      handleChange({
        target: {
          name: "islandCost",
          value: updatedCost,
        },
      });
    }

    if (name === "kitchenPlumbing") {
      handleChange({
        target: {
          name: "plumbingCost",
          value: updatedCost,
        },
      });
    }

    if (name === "kitchenLighting") {
      handleChange({
        target: {
          name: "lightingCost",
          value: updatedCost,
        },
      });
    }
    console.log("Updated Cost:", updatedCost);
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
          "kitchenCountertopIncluded",
          "kitchenCountertopIncluded",
          formData.kitchenCountertopIncluded,
          handleChange
        )}
        <label htmlFor="kitchenCountertopIncluded" className="ml-1 font-semibold">
          Updated Countertops?
        </label>
      </div>
      {formData.kitchenCountertopIncluded && (
        <CountertopsForm handleChange={handleChange} formData={formData} />
      )}
      <div className="form-control">
        {renderSwitch(
          "kitchenCabinetIncluded",
          "kitchenCabinetIncluded",
          formData.kitchenCabinetIncluded,
          handleChange
        )}
        <label htmlFor="kitchenCabinetIncluded" className="ml-1 font-semibold">
          Updated Cabinets?
        </label>
      </div>

      {formData.kitchenCabinetIncluded && (
        <CabinetsForm handleChange={handleChange} formData={formData} />
      )}
      <div className="form-control">
        {renderSwitch(
          "kitchenFlooringIncluded",
          "kitchenFlooringIncluded",
          Boolean(formData.kitchenFlooringIncluded),
          handleChange
        )}
        <label htmlFor="kitchenFlooringIncluded" className="ml-1 font-semibold">
          Flooring Included?
        </label>
      </div>
      {formData.kitchenFlooringIncluded && (
        <FlooringForm handleChange={handleChange} formData={formData} />
      )}
      <div className="form-control">
        {renderSwitch(
          "kitchenDrywallIncluded",
          "kitchenDrywallIncluded",
          Boolean(formData.kitchenDrywallIncluded),
          handleChange
        )}
        <label htmlFor="kitchenDrywallIncluded" className="ml-1 font-semibold">
          Drywall Included?
        </label>
      </div>
      {formData.kitchenDrywallIncluded && (
        <DrywallOption handleChange={handleChange} formData={formData} />
      )}
      <div className="form-control">
        {renderSwitch(
          "island",
          "island",
          formData.island || false,
          handleSwitchChange,
          islandCost
        )}
        <label htmlFor="island" className="ml-1 font-semibold">
          Island Included?
        </label>
      </div>
      <div className="form-control">
        {renderSwitch(
          "kitchenPlumbing",
          "kitchenPlumbing",
          formData.kitchenPlumbing || false,
          handleSwitchChange,
          plumbingCost
        )}
        <label htmlFor="kitchenPlumbing" className="ml-1 font-semibold">
          Do You Need Plumbing?{" "}
          <span className="font-bold italic text-neutral-400">
            (this service will be subcontracted)
          </span>
        </label>
      </div>
      <div className="form-control">
        {renderSwitch(
          "kitchenLighting",
          "kitchenLighting",
          formData.kitchenLighting || false,
          handleSwitchChange,
          lightingCost
        )}
        <label htmlFor="kitchenLighting" className="ml-1 font-semibold">
          Do You Need Lighting?
        </label>
      </div>
    </>
  );
};

export default KitchenForm;
