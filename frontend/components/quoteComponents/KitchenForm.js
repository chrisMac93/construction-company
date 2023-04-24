import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import FlooringForm from "./FlooringForm";
import { calculateFlooringCost } from "./FlooringForm";
import { renderSwitch } from "./RenderSwitch";

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
  const kitchenCabinetMaterialPrice = kitchenCabinetMaterialCosts[kitchenCabinetMaterial];

  if (formData.kitchenFlooringIncluded) {
    totalCost += calculateFlooringCost(
      formData.flooringMaterial,
      formData.flooringSqFootage,
      formData.flooringMaterialCosts
    );
  }

  if (countertopMaterial) {
    totalCost += countertopMaterialPrice * 15;
  }
  console.log(
    "value of countertop material",
    countertopMaterialPrice
  );
  console.log("total cost after countertops:", totalCost);

  if (kitchenCabinetMaterial) {
    totalCost +=
      kitchenCabinetMaterialPrice * 30 || 0;
  }
  console.log(
    "value of cabinet material",
    kitchenCabinetMaterialPrice
  );

  if (formData.island) {
    totalCost += islandCost;
  }
  // console.log("Cost after island:", totalCost);

  if (formData.kitchenPlumbing) {
    totalCost += plumbingCost;
  }
  // console.log("Cost after kitchen plumbing:", totalCost);

  if (formData.kitchenLighting) {
    totalCost += lightingCost;
  }
  // console.log("Final Calculated Cost:", totalCost);
  return totalCost;
};

const KitchenForm = ({ handleChange, formData }) => {
  const [kitchenCabinetMaterials, setKitchenCabinetMaterials] = useState([]);
  const [countertopMaterials, setCountertopMaterials] = useState([]);
  const [islandCost, setIslandCost] = useState(0);
  const [plumbingCost, setPlumbingCost] = useState(0);
  const [lightingCost, setLightingCost] = useState(0);

  useEffect(() => {
    console.log("Running useEffect for fetching materials data");
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
      handleChange({
        target: {
          name: "countertopMaterialCosts",
          value: countertopMaterialCosts,
        },
      });
      handleChange({
        target: {
          name: "kitchenCabinetMaterialCosts",
          value: kitchenCabinetMaterialCosts,
        },
      });
    };

    fetchMaterialsData();
  }, []);

  const handleSwitchChange = (e) => {
    const { name, cost } = e.target;

    if (name === "island") {
      handleChange({
        target: {
          name: "islandCost",
          value: cost,
        },
      });
    }

    if (name === "kitchenPlumbing") {
      handleChange({
        target: {
          name: "plumbingCost",
          value: cost,
        },
      });
    }

    if (name === "kitchenLighting") {
      handleChange({
        target: {
          name: "lightingCost",
          value: cost,
        },
      });
    }
    handleChange(e);
  };

  return (
    <>
      <div className="w-full text-center">
        <label htmlFor="countertops" className="text-lg font-semibold">
          Updated Countertops
        </label>
      </div>
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
      <div className="w-full text-center">
        <label htmlFor="kitchenCabinets" className="text-lg font-semibold">
          Updated Cabinets
        </label>
      </div>

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
            <option key={kitchenCabinetMaterial} value={kitchenCabinetMaterial}>
              {kitchenCabinetMaterial}
            </option>
          ))}
        </select>
      </div>
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
          Plumbing
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
