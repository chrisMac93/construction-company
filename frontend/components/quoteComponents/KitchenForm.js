import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import FlooringForm from "./FlooringForm";
import { calculateFlooringCost } from "./FlooringForm";
import { renderSwitch } from "./RenderSwitch";

export const calculateKitchenCost = (
  formData,
  countertopMaterialCosts,
  kitchenCabinetMaterialCosts,
  includedOptionsCosts
) => {
  // if (!formData) return 0;

  let totalCost = 0;

  if (formData.kitchenFlooringIncluded) {
    totalCost += calculateFlooringCost(
      formData.flooringMaterial,
      formData.flooringSqFootage,
      formData.flooringMaterialCosts
    );
  }
  // console.log("Cost after flooring:", totalCost);

  if (formData.countertops && formData.countertopMaterial) {
    console.log("formData.countertopMaterial:", formData.countertopMaterial);
    console.log("countertopMaterialCosts:", countertopMaterialCosts);
    if (
      countertopMaterialCosts &&
      countertopMaterialCosts[formData.countertopMaterial]
    ) {
      totalCost += countertopMaterialCosts[formData.countertopMaterial] * 15;
    }
  }
  // console.log("Cost after countertops:", totalCost);

  if (formData.kitchenCabinets && formData.kitchenCabinetMaterial) {
    console.log(
      "formData.kitchenCabinetMaterial:",
      formData.kitchenCabinetMaterial
    );
    console.log("kitchenCabinetMaterialCosts:", kitchenCabinetMaterialCosts);
    if (
      kitchenCabinetMaterialCosts &&
      kitchenCabinetMaterialCosts[formData.kitchenCabinetMaterial]
    ) {
      totalCost +=
        kitchenCabinetMaterialCosts[formData.kitchenCabinetMaterial] * 30;
    }
  }
  // console.log("Cost after kitchen cabinets:", totalCost);

  if (formData.island) {
    console.log("formData.island:", formData.island);
    if (includedOptionsCosts && includedOptionsCosts.island) {
      console.log("includedOptionsCosts.island:", includedOptionsCosts.island);
      totalCost += includedOptionsCosts.island;
    }
  }
  // console.log("Cost after island:", totalCost);

  if (formData.kitchenPlumbing) {
    console.log("formData.kitchenPlumbing:", formData.kitchenPlumbing);
    if (includedOptionsCosts && includedOptionsCosts.plumbing) {
      console.log(
        "includedOptionsCosts.plumbing:",
        includedOptionsCosts.plumbing
      );
      totalCost += includedOptionsCosts.plumbing;
    }
  }
  // console.log("Cost after kitchen plumbing:", totalCost);

  if (formData.kitchenLighting) {
    console.log("formData.kitchenLighting:", formData.kitchenLighting);
    if (includedOptionsCosts && includedOptionsCosts.lighting) {
      console.log(
        "includedOptionsCosts.lighting:",
        includedOptionsCosts.lighting
      );
      totalCost += includedOptionsCosts.lighting;
    }
  }
  console.log("Final Calculated Cost:", totalCost);
  return totalCost;
};

const KitchenForm = ({ handleChange, formData }) => {
  const [kitchenCabinetMaterials, setKitchenCabinetMaterials] = useState([]);
  const [kitchenCabinetMaterialCosts, setKitchenCabinetMaterialCosts] =
    useState({});
  const [countertopMaterials, setCountertopMaterials] = useState([]);
  const [countertopMaterialCosts, setCountertopMaterialCosts] = useState({});
  const [includedOptions, setIncludedOptions] = useState([]);
  const [includedOptionsCosts, setIncludedOptionsCosts] = useState({});
  const [calculatedCost, setCalculatedCost] = useState(0);
  const [switchChanged, setSwitchChanged] = useState(false);

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

      const newCountertopMaterialNames = [];
      const newKitchenCabinetMaterialNames = [];
      const newIncludedOptionNames = [];

      const newCountertopMaterialCosts = {};
      const newKitchenCabinetMaterialCosts = {};
      const newIncludedOptionsCosts = {};

      if (countertopMaterialsSnapshot.docs.length > 0) {
        countertopMaterialsSnapshot.docs.forEach((doc) => {
          const { name, price } = doc.data();
          newCountertopMaterialNames.push(name);
          newCountertopMaterialCosts[name] = price;
        });
        setCountertopMaterialCosts(newCountertopMaterialCosts);
        setCountertopMaterials(newCountertopMaterialNames);
      }

      if (kitchenCabinetMaterialsSnapshot.docs.length > 0) {
        kitchenCabinetMaterialsSnapshot.docs.forEach((doc) => {
          const { name, price } = doc.data();
          newKitchenCabinetMaterialNames.push(name);
          newKitchenCabinetMaterialCosts[name] = price;
        });
        setKitchenCabinetMaterialCosts(newKitchenCabinetMaterialCosts);
        setKitchenCabinetMaterials(newKitchenCabinetMaterialNames);
      }

      if (includedSnapshot.docs.length > 0) {
        includedSnapshot.docs.forEach((doc) => {
          const { name, price } = doc.data();
          newIncludedOptionNames.push(name);
          newIncludedOptionsCosts[name] = price;
        });
        setIncludedOptionsCosts(newIncludedOptionsCosts);
        setIncludedOptions(newIncludedOptionNames);
      }
    };

    fetchMaterialsData();
  }, []);

  useEffect(() => {
    if (switchChanged) {
      calculateCostAndUpdate();
      setSwitchChanged(false);
    }
  }, [
    formData,
    setCalculatedCost,
    countertopMaterialCosts,
    kitchenCabinetMaterialCosts,
    includedOptionsCosts,
    switchChanged,
  ]);

  const calculateCostAndUpdate = () => {
    const cost = calculateKitchenCost(
      formData,
      countertopMaterialCosts,
      kitchenCabinetMaterialCosts,
      includedOptionsCosts
    );
    setCalculatedCost(cost);
  };

  useEffect(() => {
    setSwitchChanged(true);
  }, [formData]);

  const handleSwitchChange = (e, cost) => {
    console.log("Running handleSwitchChange");
    const { name } = e.target;

    if (name === "kitchenCabinets") {
      handleChange({
        target: {
          name: "kitchenCabinetMaterialCosts",
          value: cost,
        },
      });
    }

    if (
      name === "island" ||
      name === "kitchenPlumbing" ||
      name === "kitchenLighting"
    ) {
      handleChange({
        target: {
          name: "includedOptionsCosts",
          value: cost,
        },
      });
    }

    if (name === "countertops") {
      handleChange({
        target: {
          name: "countertopMaterialCosts",
          value: cost,
        },
      });
    }

    handleChange(e);
  };

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-lg font-bold">
          Please check any options you would like to be included in your quote
        </h1>
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
          "countertops",
          "countertops",
          formData.countertops || false,
          (e) =>
            handleSwitchChange(
              e,
              countertopMaterialCosts[formData.countertopMaterial]
            )
        )}
        <label htmlFor="countertops" className="ml-1 text-lg">
          Updated Countertops
        </label>
      </div>
      {formData.countertops && (
        <div className="form-control">
          <label htmlFor="countertopMaterial">Countertop Material</label>
          <select
            name="countertopMaterial"
            id="countertopMaterial"
            className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
            value={formData.countertopMaterial}
            onChange={handleChange}
          >
            <option value="">Select a material</option>
            {countertopMaterials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="form-control">
        {renderSwitch(
          "kitchenCabinets",
          "kitchenCabinets",
          formData.kitchenCabinets || false,
          (e) =>
            handleSwitchChange(
              e,
              kitchenCabinetMaterialCosts[formData.kitchenCabinetMaterial]
            )
        )}
        <label htmlFor="kitchenCabinets" className="ml-1 text-lg">
          Updated Cabinets
        </label>
      </div>
      {formData.kitchenCabinets && (
        <div className="form-control">
          <label htmlFor="kitchenCabinetMaterial">Cabinet Material</label>
          <select
            name="kitchenCabinetMaterial"
            id="kitchenCabinetMaterial"
            className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
            value={formData.kitchenCabinetMaterial}
            onChange={handleChange}
          >
            <option value="">Select a material</option>
            {kitchenCabinetMaterials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="form-control">
        {renderSwitch("island", "island", formData.island || false, (e) =>
          handleSwitchChange(e, includedOptionsCosts[e.target.name])
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
          (e) => handleSwitchChange(e, includedOptionsCosts[e.target.name])
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
          (e) => handleSwitchChange(e, includedOptionsCosts[e.target.name])
        )}
        <label htmlFor="kitchenLighting" className="ml-1 text-lg">
          Lighting
        </label>
      </div>
    </>
  );
};

export default KitchenForm;
