import React from "react";
import FlooringForm from "./FlooringForm";
import { calculateFlooringCost } from "./FlooringForm";
import { renderSwitch } from "./RenderSwitch";

export const calculateBathroomCost = (formData) => {
  const sinkCabinetCosts = {
    "Solid wood": 300,
    Particleboard: 100,
    "MDF (medium density fiberboard)": 150,
    Plywood: 200,
    Metal: 250,
    Laminate: 120,
    Melamine: 130,
    Thermofoil: 180,
  };

  const sinkTypeCosts = {
    Porcelain: 100,
    "Stainless steel": 150,
    Ceramic: 120,
    Glass: 200,
    Granite: 250,
    Marble: 300,
    Stone: 350,
    Wood: 400,
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

  if (formData.sinkNeeded) {
    totalCost +=
      sinkCabinetCosts[formData.sinkCabinetMaterial] +
      sinkTypeCosts[formData.sinkType];
  }

  if (formData.toiletNeeded) {
    totalCost += toiletTypeCosts[formData.toiletType];
  }

  if (formData.showerTubNeeded) {
    totalCost += showerTubTypeCosts[formData.showerTubType];
  }

  if (formData.flooringNeeded) {
    totalCost += calculateFlooringCost(
      formData.flooringMaterial,
      formData.flooringSqFootage
    );
  }

  if (formData.plumbing) {
    totalCost += 2000; // Assuming a fixed cost for plumbing
  }

  if (formData.lighting) {
    totalCost += 1500; // Assuming a fixed cost for lighting
  }

  return totalCost;
};

const BathroomForm = ({ handleChange, formData }) => {
  const cabinetMaterials = [
    "Solid wood",
    "Particleboard",
    "MDF (medium density fiberboard)",
    "Plywood",
    "Metal",
    "Laminate",
    "Melamine",
    "Thermofoil",
  ];

  const sinkMaterialTypes = [
    "Porcelain",
    "Stainless steel",
    "Ceramic",
    "Glass",
    "Granite",
    "Marble",
    "Stone",
    "Wood",
  ];

  return (
    <>
      <div className="form-control">
        {renderSwitch(
          "flooringIncluded",
          "flooringIncluded",
          formData.flooringIncluded,
          handleChange
        )}
        <label className="ml-1 text-lg">Do you need flooring?</label>
      </div>

      {formData.flooringIncluded && (
        <FlooringForm handleChange={handleChange} formData={formData} />
      )}
      <div className="form-control">
        {renderSwitch(
          "sinkNeeded",
          "sinkNeeded",
          formData.sinkNeeded,
          handleChange
        )}
        <label className="ml-1 text-lg">Do you need a sink?</label>
      </div>

      {formData.sinkNeeded && (
        <>
          <div className="form-control">
            <label className="text-lg">
              Sink Cabinet Material
              <select
                name="sinkCabinetMaterial"
                value={formData.sinkCabinetMaterial}
                onChange={handleChange}
                className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
              >
                <option value="">Select a Cabinet Material</option>
                {cabinetMaterials.map((material) => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-control">
            <label className="text-lg">
              Sink Type
              <select
                name="sinkType"
                value={formData.sinkType}
                onChange={handleChange}
                className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
              >
                <option value="">Select a Sink Type</option>
                {sinkMaterialTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </>
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
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="Luxury">Luxury</option>
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
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="Luxury">Luxury</option>
            </select>
          </label>
        </div>
      )}
      <div className="form-control">
        {renderSwitch("plumbing", "plumbing", formData.plumbing, handleChange)}
        <label htmlFor="plumbing" className="ml-1 text-lg">
          Plumbing
        </label>
      </div>
      <div className="form-control">
        {renderSwitch("lighting", "lighting", formData.lighting, handleChange)}
        <label htmlFor="lighting" className="ml-1 text-lg">
          Lighting
        </label>
      </div>
    </>
  );
};

export default BathroomForm;
