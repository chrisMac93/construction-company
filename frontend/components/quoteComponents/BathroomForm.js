import React from "react";
import FlooringForm from "./FlooringForm";
import { calculateFlooringCost } from "./FlooringForm";
import { renderSwitch } from "./RenderSwitch";

export const calculateBathroomCost = (formData) => {
  const sinkTypeCosts = {
    Standard: 100,
    Premium: 150,
    Luxury: 200,
  };

  const toiletTypeCosts = {
    Standard: 200,
    Premium: 300,
    Luxury: 400,
  };

  const showerTubTypeCosts = {
    Standard: 500,
    Premium: 700,
    Luxury: 900,
  };

  let totalCost = 0;

  if (formData.bathFlooringNeeded) {
    totalCost += calculateFlooringCost(
      formData.flooringMaterial,
      formData.flooringSqFootage,
      formData.flooringMaterialCosts
    );
  }

  if (formData.bathSinkNeeded) {
    totalCost += sinkTypeCosts[formData.sinkType];
  }

  if (formData.toiletNeeded) {
    totalCost += toiletTypeCosts[formData.toiletType];
  }

  if (formData.showerTubNeeded) {
    totalCost += showerTubTypeCosts[formData.showerTubType];
  }

  if (formData.bathPlumbing) {
    totalCost += 2000; // Assuming a fixed cost for bathPlumbing
  }

  if (formData.bathLighting) {
    totalCost += 1500; // Assuming a fixed cost for bathLighting
  }

  return totalCost;
};

const BathroomForm = ({ handleChange, formData }) => {
  const sinkType = ["Standard", "Premium", "Luxury"];

  const toiletType = ["Standard", "Premium", "Luxury"];

  const showerTubType = ["Standard", "Premium", "Luxury"];

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-lg font-bold">
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
        <label className="ml-1 text-lg">Do you need flooring?</label>
      </div>

      {formData.bathFlooringNeeded && (
        <FlooringForm handleChange={handleChange} formData={formData} />
      )}

      <div className="form-control">
        {renderSwitch(
          "bathSinkNeeded",
          "bathSinkNeeded",
          formData.bathSinkNeeded,
          handleChange
        )}
        <label className="ml-1 text-lg">Do you need a Sink?</label>
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
              {sinkType.map((type) => (
                <option key={type} value={type}>
                  {type}
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
          formData.toiletNeeded,
          handleChange
        )}
        <label className="ml-1 text-lg">Do you need a toilet?</label>
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
              {toiletType.map((type) => (
                <option key={type} value={type}>
                  {type}
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
          formData.showerTubNeeded,
          handleChange
        )}
        <label className="ml-1 text-lg">Do you need a shower/tub?</label>
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
              {showerTubType.map((type) => (
                <option key={type} value={type}>
                  {type}
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
          formData.bathPlumbing,
          handleChange
        )}
        <label htmlFor="bathPlumbing" className="ml-1 text-lg">
          Plumbing
        </label>
      </div>
      <div className="form-control">
        {renderSwitch(
          "bathLighting",
          "bathLighting",
          formData.bathLighting,
          handleChange
        )}
        <label htmlFor="bathLighting" className="ml-1 text-lg">
          Lighting
        </label>
      </div>
    </>
  );
};

export default BathroomForm;
