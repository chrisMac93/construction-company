import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import DrywallOption from "./drywallOption";
import { calculateDrywallCost } from "./drywallOption";
import FlooringForm from "./FlooringForm";
import { calculateFlooringCost } from "./FlooringForm";
import { renderSwitch } from "./RenderSwitch";

import styles from "../../styles/Home.module.css";

export const calculateBathroomCost = (
  formData,
  showerTubType,
  showerTubCost,
  sinkType,
  sinkCost,
  toiletType,
  toiletCost,
  plumbingCost,
  lightingCost
) => {
  let totalCost = 0;

  const showerTubPrice = showerTubType ? showerTubCost[showerTubType] : 0;
  const sinkPrice = sinkType ? sinkCost[sinkType] : 0;
  const toiletPrice = toiletType ? toiletCost[toiletType] : 0;

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

  if (showerTubType) {
    totalCost += showerTubPrice;
  }

  console.log("Shower tub cost:", showerTubPrice);

  if (sinkType) {
    totalCost += sinkPrice;
  }

  console.log("Sink cost:", sinkPrice);

  if (toiletType) {
    totalCost += toiletPrice;
  }

  console.log("Toilet cost:", toiletPrice);

  if (formData.bathPlumbing) {
    totalCost += plumbingCost;
  }

  console.log("Plumbing cost:", plumbingCost);

  if (formData.bathLighting) {
    totalCost += lightingCost;
  }

  console.log("Lighting cost:", lightingCost);

  console.log("Bathroom cost:", totalCost);
  return totalCost;
};

const BathroomForm = ({ handleChange, formData }) => {
  const [showerTubTypeTiers, setShowerTubTypeTiers] = useState([]);
  const [sinkTypeTiers, setSinkTypeTiers] = useState([]);
  const [toiletTypeTiers, setToiletTypeTiers] = useState([]);
  const [showerTubCost, setShowerTubCost] = useState(0);
  const [sinkCost, setSinkCost] = useState(0);
  const [toiletCost, setToiletCost] = useState(0);
  const [bathLightingCost, setBathLightingCost] = useState(0);
  const [bathPlumbingCost, setBathPlumbingCost] = useState(0);

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

      const showerTubTypeCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/bathroomTiers/${bathroomTiersDocId}/showerTubType`
      );

      const sinkTypeCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/bathroomTiers/${bathroomTiersDocId}/sinkType`
      );

      const toiletTypeCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/bathroomTiers/${bathroomTiersDocId}/toiletType`
      );

      const bathLightingSnapshot = await getDocs(bathLightingCollectionRef);
      const bathPlumbingSnapshot = await getDocs(bathPlumbingCollectionRef);
      const showerTubTypeSnapshot = await getDocs(showerTubTypeCollectionRef);
      const sinkTypeSnapshot = await getDocs(sinkTypeCollectionRef);
      const toiletTypeSnapshot = await getDocs(toiletTypeCollectionRef);

      const showerTubTypeTiers = [];
      const sinkTypeTiers = [];
      const toiletTypeTiers = [];

      const showerTubCosts = {};
      const sinkCosts = {};
      const toiletCosts = {};
      const bathLightingCosts = {};
      const bathPlumbingCosts = {};

      showerTubTypeSnapshot.forEach((doc) => {
        showerTubTypeTiers.push(doc.data());
        showerTubCosts[doc.data().name] = doc.data().price;
      });

      sinkTypeSnapshot.forEach((doc) => {
        sinkTypeTiers.push(doc.data());
        sinkCosts[doc.data().name] = doc.data().price;
      });

      toiletTypeSnapshot.forEach((doc) => {
        toiletTypeTiers.push(doc.data());
        toiletCosts[doc.data().name] = doc.data().price;
      });

      bathLightingSnapshot.forEach((doc) => {
        bathLightingCosts[doc.data().name] = doc.data().price;
      });

      bathPlumbingSnapshot.forEach((doc) => {
        bathPlumbingCosts[doc.data().name] = doc.data().price;
      });

      setShowerTubTypeTiers(showerTubTypeTiers);
      setSinkTypeTiers(sinkTypeTiers);
      setToiletTypeTiers(toiletTypeTiers);
      setShowerTubCost(showerTubCosts);
      setSinkCost(sinkCosts);
      setToiletCost(toiletCosts);
      setBathLightingCost(bathLightingCosts);
      setBathPlumbingCost(bathPlumbingCosts);

      console.log("ShowerTub Costs:", showerTubCosts);
      console.log("Sink Costs:", sinkCosts);
      console.log("Toilet Costs:", toiletCosts);
      console.log("Bath Lighting Costs:", bathLightingCosts);
      console.log("Bath Plumbing Costs:", bathPlumbingCosts);
    };

    fetchBathroomTiers();
  }, []);

  const handleSwitchChange = (event) => {
    const { name, value } = event.target;
    console.log("handleChange name:", event.target.name);
    console.log("handleChange value:", event.target.value);

    let updatedCost = 0;

    if (name === "showerTubNeeded") {
      updatedCost =
        value && formData.showerTubType
          ? showerTubCost[formData.showerTubType]
          : 0;
    } else if (name === "bathSinkNeeded") {
      updatedCost =
        value && formData.sinkType ? sinkCost[formData.sinkType] : 0;
    } else if (name === "toiletNeeded") {
      updatedCost =
        value && formData.toiletType ? toiletCost[formData.toiletType] : 0;
    } else if (name === "bathLighting") {
      updatedCost = value ? bathLightingCost["lighting"] : 0;
    } else if (name === "bathPlumbing") {
      updatedCost = value ? bathPlumbingCost["plumbing"] : 0;
    }

    console.log("Updated cost:", updatedCost);

    handleChange(event);
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
        <label className="ml-1 text-lg">Flooring Included</label>
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
        <label className="ml-1 text-lg">Drywall Included</label>
      </div>

      {formData.bathDrywallNeeded && (
        <DrywallOption handleChange={handleChange} formData={formData} />
      )}

      <div className="form-control">
        {renderSwitch(
          "bathSinkNeeded",
          "bathSinkNeeded",
          formData.bathSinkNeeded || false,
          handleSwitchChange,
          sinkCost
        )}
        <label className="ml-1 text-lg">Sink Included</label>
      </div>

      {formData.bathSinkNeeded && (
        <div className="form-control">
          <label className="text-lg">
            Sink Type
            <select
              name="sinkType"
              value={formData.sinkType}
              onChange={handleChange}
              className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
            >
              <option value="">Select a Sink Tier</option>
              {sinkTypeTiers.map((sinkType) => (
                <option key={sinkType.name} value={sinkType.name}>
                  {sinkType.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <div className="form-control">
        {renderSwitch(
          "toiletNeeded",
          "toiletNeeded",
          formData.toiletNeeded || false,
          handleSwitchChange,
          toiletCost
        )}
        <label className="ml-1 text-lg">Toilet Included</label>
      </div>

      {formData.toiletNeeded && (
        <div className="form-control">
          <label className="text-lg">
            Toilet Type
            <select
              name="toiletType"
              value={formData.toiletType}
              onChange={handleChange}
              className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
            >
              <option value="">Select a Toilet Tier</option>
              {toiletTypeTiers.map((toiletType) => (
                <option key={toiletType.name} value={toiletType.name}>
                  {toiletType.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <div className="form-control">
        {renderSwitch(
          "showerTubNeeded",
          "showerTubNeeded",
          formData.showerTubNeeded || false,
          handleSwitchChange,
          showerTubCost
        )}
        <label className="ml-1 text-lg">Shower/Tub Included</label>
      </div>
      {formData.showerTubNeeded && (
        <div className="form-control">
          <label className="text-lg">
            Shower/Tub Type
            <select
              name="showerTubType"
              value={formData.showerTubType}
              onChange={handleChange}
              className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
            >
              <option value="">Select a Shower/Tub Tier</option>
              {showerTubTypeTiers.map((showerTubType) => (
                <option key={showerTubType.name} value={showerTubType.name}>
                  {showerTubType.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      <div className="form-control">
        {renderSwitch(
          "bathPlumbing",
          "bathPlumbing",
          formData.bathPlumbing || false,
          handleSwitchChange,
          bathPlumbingCost["plumbing"]
        )}
        <label htmlFor="bathPlumbing" className="ml-1 text-lg">
          Plumbing{" "}
          <span className={`font-bold italic ${styles.mcColor}`}>
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
        <label htmlFor="bathLighting" className="ml-1 text-lg">
          Lighting
        </label>
      </div>
    </>
  );
};

export default BathroomForm;
