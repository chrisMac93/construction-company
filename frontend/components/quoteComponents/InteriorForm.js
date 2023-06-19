import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { calculateDrywallCost } from "./drywallOption";
import DrywallOption from "./drywallOption";
import FlooringForm from "./FlooringForm";
import { calculateFlooringCost } from "./FlooringForm";
import { renderSwitch } from "./RenderSwitch";

import styles from "../../styles/Home.module.css";

export const calculateInteriorCost = (formData, lightingCost, plumbingCost) => {
  let totalCost = 0;

  if (formData.interiorFlooringIncluded) {
    totalCost += calculateFlooringCost(
      formData.flooringMaterial,
      formData.flooringSqFootage,
      formData.flooringMaterialCosts
    );
  }

  if (formData.interiorDrywallIncluded) {
    totalCost += calculateDrywallCost(
      formData.drywallPricePerSqFoot,
      formData.drywallSqFootage
    );
  }

  if (formData.includeLighting) {
    totalCost += lightingCost;
  }

  if (formData.includePlumbing) {
    totalCost += plumbingCost;
  }

  return totalCost;
};

const InteriorForm = ({ handleChange, formData }) => {
  const [lightingCost, setLightingCost] = useState(0);
  const [plumbingCost, setPlumbingCost] = useState(0);

  useEffect(() => {
    const fetchInteriorServices = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id;

      const interiorCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/interior`
      );
      const interiorSnapshot = await getDocs(interiorCollectionRef);
      const services = [];
      const costs = {};

      interiorSnapshot.forEach((doc) => {
        const serviceTypeData = doc.data();
        services.push(serviceTypeData.name);
        costs[serviceTypeData.name] = serviceTypeData.price;
      });

      setLightingCost(costs.lighting);
      setPlumbingCost(costs.plumbing);
    };

    fetchInteriorServices();
  }, []);

  const handleSwitchChange = (e) => {
    const { name, value, cost } = e.target;
    let updatedCost = value ? parseInt(cost) : 0;

    if (name === "includeLighting") {
      handleChange({
        target: {
          name: "lightingCost",
          value: updatedCost,
        },
      });
    }

    if (name === "includePlumbing") {
      handleChange({
        target: {
          name: "plumbingCost",
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
      <div className="form-group mt-4">
        <label
          htmlFor="interiorFlooringIncluded"
          className="flex items-center cursor-pointer"
        >
          {renderSwitch(
            "interiorFlooringIncluded",
            "interiorFlooringIncluded",
            formData.interiorFlooringIncluded,
            handleChange
          )}
          <span className="ml-3 mb-1 text-neutral-100 font-semibold">
            Do You Need Flooring?
          </span>
        </label>
      </div>
      {formData.interiorFlooringIncluded && (
        <FlooringForm handleChange={handleChange} formData={formData} />
      )}
      <div className="form-group mt-4">
        <label
          htmlFor="interiorDrywallIncluded"
          className="flex items-center cursor-pointer"
        >
          {renderSwitch(
            "interiorDrywallIncluded",
            "interiorDrywallIncluded",
            Boolean(formData.interiorDrywallIncluded),
            handleChange
          )}
          <span className="ml-3 mb-1 text-neutral-100 font-semibold">
            Do You Need Drywall?
          </span>
        </label>
      </div>
      {formData.interiorDrywallIncluded && (
        <DrywallOption handleChange={handleChange} formData={formData} />
      )}

      <div>
        {renderSwitch(
          "includeLighting",
          "includeLighting",
          formData.includeLighting,
          handleSwitchChange,
          lightingCost
        )}
        <span className="ml-3 mb-1 text-neutral-100 font-semibold">
          Do You Need Lighting?
        </span>
      </div>
      <div>
        {renderSwitch(
          "includePlumbing",
          "includePlumbing",
          formData.includePlumbing,
          handleSwitchChange,
          plumbingCost
        )}
        <span className="ml-3 mb-1 text-neutral-100 font-semibold">
          Do You Need Plumbing?{" "}
          <span className="font-bold italic text-neutral-400">
            (this service will be subcontracted)
          </span>
        </span>
      </div>
    </>
  );
};

export default InteriorForm;
