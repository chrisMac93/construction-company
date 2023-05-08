import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import DrywallOption from "./drywallOption";
import { calculateDrywallCost } from "./drywallOption";
import FlooringForm from "./FlooringForm";
import { calculateFlooringCost } from "./FlooringForm";
import { renderSwitch } from "./RenderSwitch";

import styles from "../../styles/Home.module.css";

export const calculateKitchenCost = (
  formData,
  countertopMaterial,
  countertopMaterialCosts,
  kitchenCabinetMaterial,
  kitchenCabinetMaterialCosts,
  islandCost,
  plumbingCost,
  lightingCost
) => {
  let totalCost = 0;

  const countertopMaterialPrice = countertopMaterialCosts[countertopMaterial];
  const kitchenCabinetMaterialPrice =
    kitchenCabinetMaterialCosts[kitchenCabinetMaterial];

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

  if (countertopMaterial) {
    totalCost += countertopMaterialPrice * formData.countertopSqFootage;
  }

  if (kitchenCabinetMaterial) {
    totalCost += kitchenCabinetMaterialPrice * formData.kitchenCabinetSqFootage;
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
  const [kitchenCabinetMaterials, setKitchenCabinetMaterials] = useState([]);
  const [countertopMaterials, setCountertopMaterials] = useState([]);
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

      const countertopCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/kitchenMaterials/${kitchenMaterialsDocId}/countertopMaterials`
      );
      const kitchenCabinetCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/kitchenMaterials/${kitchenMaterialsDocId}/kitchenCabinetMaterials`
      );
      const includedCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/kitchenMaterials/${kitchenMaterialsDocId}/included`
      );

      const countertopMaterialsSnapshot = await getDocs(
        countertopCollectionRef
      );

      const kitchenCabinetMaterialsSnapshot = await getDocs(
        kitchenCabinetCollectionRef
      );

      const includedSnapshot = await getDocs(includedCollectionRef);

      const countertopMaterials = [];
      const kitchenCabinetMaterials = [];

      const countertopMaterialCosts = {};
      const kitchenCabinetMaterialCosts = {};
      const newIncludedOptionsCosts = {};

      countertopMaterialsSnapshot.docs.forEach((doc) => {
        const materialsData = doc.data();
        countertopMaterials.push(materialsData.name);
        countertopMaterialCosts[materialsData.name] = materialsData.price;
      });

      kitchenCabinetMaterialsSnapshot.docs.forEach((doc) => {
        const materialsData = doc.data();
        kitchenCabinetMaterials.push(materialsData.name);
        kitchenCabinetMaterialCosts[materialsData.name] = materialsData.price;
      });

      includedSnapshot.docs.forEach((doc) => {
        const { name, price } = doc.data();
        newIncludedOptionsCosts[name] = price;
      });
      setIslandCost(newIncludedOptionsCosts.island);
      setPlumbingCost(newIncludedOptionsCosts.plumbing);
      setLightingCost(newIncludedOptionsCosts.lighting);
      setCountertopMaterials(countertopMaterials);
      setKitchenCabinetMaterials(kitchenCabinetMaterials);
      console.log("Countertop Material Costs:", countertopMaterialCosts);
      console.log(
        "Kitchen Cabinet Material Costs:",
        kitchenCabinetMaterialCosts
      );
    };

    fetchMaterialsData();
  }, []);

  const handleMaterialsSwitchChange = (e) => {
    const { name } = e.target;
    console.log("Switch name:", name);

    if (name === "kitchenCountertopIncluded") {
      console.log("Selected Countertop Material:", formData.countertopMaterial);
      console.log(
        "Material Cost:",
        formData.countertopMaterialCosts[formData.countertopMaterial]
      );
      handleChange({
        target: {
          name: "countertopMaterialCosts",
          value: formData.countertopMaterialCosts[formData.countertopMaterial],
        },
      });
    }

    if (name === "kitchenCabinetsIncluded") {
      console.log(
        "Selected Cabinet Material:",
        formData.kitchenCabinetMaterial
      );
      console.log(
        "Material Cost:",
        formData.kitchenCabinetMaterialCosts[formData.kitchenCabinetMaterial]
      );
      handleChange({
        target: {
          name: "kitchenCabinetMaterialCosts",
          value:
            formData.kitchenCabinetMaterialCosts[
              formData.kitchenCabinetMaterial
            ],
        },
      });
    }

    handleChange(e);
  };

  const handleSwitchChange = (e) => {
    const { name, value, cost } = e.target;
    let updatedCost = value ? parseInt(cost, 10) : 0;

    if (name === "kitchenCountertopIncluded") {
      handleChange({
        target: {
          name: "countertopMaterialCosts",
          value: updatedCost,
        },
      });
    }

    if (name === "kitchenCabinetsIncluded") {
      handleChange({
        target: {
          name: "kitchenCabinetMaterialCosts",
          value: updatedCost,
        },
      });
    }

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
          handleMaterialsSwitchChange
        )}
        <label htmlFor="kitchenCountertopIncluded" className="ml-1 text-lg">
          Updated Countertops
        </label>
      </div>
      {formData.kitchenCountertopIncluded && (
        <>
          <div className="form-control">
            <label htmlFor="countertopMaterial" className="block mb-2">
              Countertop Material
            </label>
            <select
              name="countertopMaterial"
              id="countertopMaterial"
              className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
              onChange={handleChange}
              value={formData.countertopMaterial}
            >
              <option value="">Select a material</option>
              {countertopMaterials.map((countertopMaterial) => (
                <option key={countertopMaterial} value={countertopMaterial}>
                  {countertopMaterial}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="countertopSqFootage" className="block mb-2">
              Countertop Square Footage
            </label>
            <input
              type="number"
              name="countertopSqFootage"
              id="countertopSqFootage"
              className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
              value={formData.countertopSqFootage}
              onChange={handleChange}
              step="0.01"
            />
          </div>
        </>
      )}
      <div className="form-control">
        {renderSwitch(
          "kitchenCabinetIncluded",
          "kitchenCabinetIncluded",
          formData.kitchenCabinetIncluded,
          handleMaterialsSwitchChange
        )}
        <label htmlFor="kitchenCabinetIncluded" className="ml-1 text-lg">
          Updated Cabinets
        </label>
      </div>

      {formData.kitchenCabinetIncluded && (
        <>
          <div className="form-control">
            <label htmlFor="kitchenCabinetMaterial" className="block mb-2">
              Cabinet Material
            </label>
            <select
              name="kitchenCabinetMaterial"
              id="kitchenCabinetMaterial"
              className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
              value={formData.kitchenCabinetMaterial}
              onChange={handleChange}
            >
              <option value="">Select a material</option>
              {kitchenCabinetMaterials.map((kitchenCabinetMaterial) => (
                <option
                  key={kitchenCabinetMaterial}
                  value={kitchenCabinetMaterial}
                >
                  {kitchenCabinetMaterial}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="kitchenCabinetSqFootage" className="block mb-2">
              Cabinet Square Footage
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
      )}
      <div className="form-control">
        {renderSwitch(
          "kitchenFlooringIncluded",
          "kitchenFlooringIncluded",
          Boolean(formData.kitchenFlooringIncluded),
          handleChange
        )}
        <label htmlFor="kitchenFlooringIncluded" className="ml-1 text-lg">
          Flooring Included
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
        <label htmlFor="kitchenDrywallIncluded" className="ml-1 text-lg">
          Drywall Included
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
        <label htmlFor="island" className="ml-1 text-lg">
          Island Included
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
        <label htmlFor="kitchenPlumbing" className="ml-1 text-lg">
          Plumbing{" "}
          <span className={`font-bold italic ${styles.mcColor}`}>
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
        <label htmlFor="kitchenLighting" className="ml-1 text-lg">
          Lighting
        </label>
      </div>
    </>
  );
};

export default KitchenForm;
