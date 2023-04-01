import React from "react";
import FlooringForm from "./FlooringForm";
import { calculateFlooringCost } from "./FlooringForm";
import { renderSwitch } from "./RenderSwitch";

export const calculateKitchenCost = (formData) => {
  const cabinetMaterialsCost = {
    "Solid wood": 100,
    Particleboard: 60,
    "MDF (medium density fiberboard)": 80,
    Plywood: 85,
    Metal: 110,
    Laminate: 70,
    Melamine: 75,
    Thermofoil: 90,
  };

  const countertopMaterialsCost = {
    "Natural Stone": 100,
    "Solid-Surfaces": 80,
    "Engineered Stone": 110,
    Concrete: 90,
    "Plastic Laminate": 60,
    "Ceramic Tile": 70,
    Wood: 85,
  };

  let totalCost = 0;

  if (formData.flooringIncluded) {
    totalCost += 10 * formData.sqFootage; // Assuming $10 per sqft for flooring
  }

  if (formData.island) {
    totalCost += 1500; // Assuming a fixed cost for island base
    totalCost += cabinetMaterialsCost[formData.islandBaseMaterial] || 0;
    totalCost += countertopMaterialsCost[formData.islandCountertop] || 0;

    if (formData.islandStovetop) {
      totalCost += 1200; // Assuming a fixed cost for stovetop
    }
  }

  if (formData.countertops) {
    totalCost += 50 * formData.sqFootage; // Assuming $50 per sqft for countertops
    totalCost += countertopMaterialsCost[formData.countertopMaterial] || 0;
  }

  if (formData.cabinets) {
    totalCost += 75 * formData.sqFootage; // Assuming $75 per sqft for cabinets
    totalCost += cabinetMaterialsCost[formData.cabinetMaterial] || 0;
  }

  if (formData.appliances) {
    totalCost += 5000; // Assuming a fixed cost for appliances
  }

  if (formData.plumbing) {
    totalCost += 2000; // Assuming a fixed cost for plumbing
  }

  if (formData.lighting) {
    totalCost += 1500; // Assuming a fixed cost for lighting
  }

  return totalCost;
};

const KitchenForm = ({ handleChange, formData }) => {
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

  const countertopMaterials = [
    "Natural Stone",
    "Solid-Surfaces",
    "Engineered Stone",
    "Concrete",
    "Plastic Laminate",
    "Ceramic Tile",
    "Wood",
  ];

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-lg font-bold">
          Please check any options you would like to be included in your quote
        </h1>
      </div>
      <div className="form-control">
        {renderSwitch(
          "flooringIncluded",
          "flooringIncluded",
          formData.flooringIncluded,
          handleChange
        )}
        <label htmlFor="flooringIncluded" className="ml-1 text-lg">
          Flooring Included
        </label>
      </div>
      {formData.flooringIncluded && (
        <FlooringForm handleChange={handleChange} formData={formData} />
      )}
      <div className="form-control">
        {renderSwitch("island", "island", formData.island, handleChange)}
        <label htmlFor="island" className="ml-1 text-lg">
          Island Included
        </label>
      </div>
      {formData.island && (
        <>
          <div className="form-control">
            <label htmlFor="islandBaseMaterial">Island Base Material</label>
            <select
              name="islandBaseMaterial"
              id="islandBaseMaterial"
              className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
              value={formData.islandBaseMaterial}
              onChange={handleChange}
            >
              <option value="">Select a material</option>
              {cabinetMaterials.map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="islandCountertop">Island Countertop</label>
            <select
              name="islandCountertop"
              id="islandCountertop"
              className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
              value={formData.islandCountertop}
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
          <div className="form-control">
            {renderSwitch(
              "islandStovetop",
              "islandStovetop",
              formData.islandStovetop,
              handleChange
            )}
            <label htmlFor="islandStovetop" className="ml-1 text-lg">
              Stovetop
            </label>
          </div>
        </>
      )}
      <div className="form-control">
        {renderSwitch(
          "countertops",
          "countertops",
          formData.countertops,
          handleChange
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
        {renderSwitch("cabinets", "cabinets", formData.cabinets, handleChange)}
        <label htmlFor="cabinets" className="ml-1 text-lg">
          Updated Cabinets
        </label>
      </div>
      {formData.cabinets && (
        <div className="form-control">
          <label htmlFor="cabinetMaterial">Cabinet Material</label>
          <select
            name="cabinetMaterial"
            id="cabinetMaterial"
            className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
            value={formData.cabinetMaterial}
            onChange={handleChange}
          >
            <option value="">Select a material</option>
            {cabinetMaterials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="form-control">
        {renderSwitch(
          "appliances",
          "appliances",
          formData.appliances,
          handleChange
        )}
        <label htmlFor="appliances" className="ml-1 text-lg">
          Appliances
        </label>
      </div>
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

export default KitchenForm;
