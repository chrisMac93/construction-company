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
  bathPlumbingCost,
  bathLightingCost
) => {
  let totalCost = 0;

  const showerTubPrice =
    showerTubType && showerTubCost.hasOwnProperty(showerTubType)
      ? showerTubCost[showerTubType]
      : 0;
  const sinkPrice = sinkType && sinkCost[sinkType] ? sinkCost[sinkType] : 0;
  const toiletPrice =
    toiletType && toiletCost[toiletType] ? toiletCost[toiletType] : 0;

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

  if (formData.showerTubNeeded) {
    totalCost += showerTubPrice;
  }

  console.log("Shower tub cost:", showerTubPrice);

  if (formData.sinkNeeded) {
    totalCost += sinkPrice;
  }

  console.log("Sink cost:", sinkPrice);

  if (formData.toiletNeeded) {
    totalCost += toiletPrice;
  }

  console.log("Toilet cost:", toiletPrice);

  if (formData.bathPlumbing) {
    totalCost += bathPlumbingCost;
  }

  if (formData.bathLighting) {
    totalCost += bathLightingCost;
  }

  console.log("Bathroom cost:", totalCost);
  return totalCost;
};

const BathroomForm = ({ handleChange, formData }) => {
  const [showerTubType, setShowerTubType] = useState([]);
  const [sinkType, setSinkType] = useState([]);
  const [toiletType, setToiletType] = useState([]);
  const [showerTubCost, setShowerTubCost] = useState({});
  const [sinkCost, setSinkCost] = useState({});
  const [toiletCost, setToiletCost] = useState({});
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

      setShowerTubType(showerTubTypeTiers);
      setSinkType(sinkTypeTiers);
      setToiletType(toiletTypeTiers);
      setShowerTubCost(showerTubCosts);
      setSinkCost(sinkCosts);
      setToiletCost(toiletCosts);
      setBathLightingCost(bathLightingCosts);
      setBathbathPlumbingCost(bathPlumbingCosts);

      // handleChange({
      //   target: { name: "showerTubCosts", value: showerTubCosts },
      // });
      // handleChange({ target: { name: "sinkCosts", value: sinkCosts } });
      // handleChange({ target: { name: "toiletCosts", value: toiletCosts } });

      console.log("ShowerTub Costs:", showerTubCosts);
      console.log("Sink Costs:", sinkCosts);
      console.log("Toilet Costs:", toiletCosts);
      console.log("Bath Lighting Costs:", bathLightingCosts);
      console.log("Bath Plumbing Costs:", bathPlumbingCosts);
    };

    fetchBathroomTiers();
  }, []);

  const handleTierSwitchChange = (e) => {
    const { name, checked } = e.target;

    if (name === "showerTubNeeded" && formData.showerTubType) {
      handleChange({
        target: {
          name: "showerTubCost",
          value: showerTubCost[showerTubType],
        },
      });
      console.log("ShowerTub price:", showerTubCost[showerTubType]);
    }

    if (name === "bathSinkNeeded") {
      handleChange({
        target: {
          name: "sinkCost",
          value: checked ? sinkCost[sinkType] : 0,
        },
      });

      console.log("Sink price:", sinkCost[sinkType]);
    }

    if (name === "toiletNeeded") {
      handleChange({
        target: {
          name: "toiletCost",
          value: checked ? toiletCost[toiletType] : 0,
        },
      });

      console.log("Toilet price:", toiletCost[toiletType]);
    }

    handleChange(e);
  };

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

    console.log("Updated cost:", updatedCost);

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
          handleTierSwitchChange
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
              {sinkType.map((sinkTier) => (
                <option key={sinkTier.name} value={sinkTier.name}>
                  {sinkTier.name}
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
          handleTierSwitchChange
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
              {toiletType.map((toiletTier) => (
                <option key={toiletTier.name} value={toiletTier.name}>
                  {toiletTier.name}
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
          handleTierSwitchChange
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
              {showerTubType.map((showerTubTier) => (
                <option key={showerTubTier.name} value={showerTubTier.name}>
                  {showerTubTier.name}
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
