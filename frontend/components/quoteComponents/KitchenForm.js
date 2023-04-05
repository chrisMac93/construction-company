import React from "react";
import FlooringForm from "./FlooringForm";
import { calculateFlooringCost } from "./FlooringForm";
import { renderSwitch } from "./RenderSwitch";

export const calculateKitchenCost = (formData) => {
  const kitchenCabinetMaterialsCost = {
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

  const kitchenSinkMaterialsCost = {
    Porcelain: 100,
    "Stainless steel": 150,
    Ceramic: 120,
    Glass: 200,
    Granite: 250,
    Marble: 300,
    Stone: 350,
    Wood: 400,
  };

  let totalCost = 0;

  if (formData.flooringIncluded && formData.flooringMaterial) {
    totalCost += calculateFlooringCost(
      formData.flooringMaterial,
      formData.flooringSqFootage
    );
  }

  if (
    formData.island &&
    (formData.islandBaseMaterial || formData.islandCountertop)
  ) {
    let islandBaseCost = formData.islandBaseMaterial
      ? kitchenCabinetMaterialsCost[formData.islandBaseMaterial] / 10
      : 0;

    let islandCountertopCost = formData.islandCountertop
      ? countertopMaterialsCost[formData.islandCountertop] / 10
      : 0;

    if (formData.islandStovetop) {
      islandCountertopCost *= 0.2; // Reduce the islandCountertopCost by 80%
      totalCost += 1200; // Assuming a fixed cost for stovetop
    }

    let islandCostPerSqFt = islandBaseCost + islandCountertopCost;
    totalCost += islandCostPerSqFt * formData.islandSqFootage;
  }

  if (formData.countertops && formData.countertopMaterial) {
    totalCost += countertopMaterialsCost[formData.countertopMaterial] * 15 || 0;
  }

  if (formData.kitchenCabinets && formData.kitchenCabinetMaterial) {
    totalCost +=
      kitchenCabinetMaterialsCost[formData.kitchenCabinetMaterial] * 30 || 0;
  }

  if (formData.kitchenSink && formData.kitchenSinkMaterial) {
    totalCost += 1000; // Assuming a fixed cost for kitchen sink
    totalCost += kitchenSinkMaterialsCost[formData.kitchenSinkMaterial];
  }

  if (formData.appliances) {
    totalCost += 5000; // Assuming a fixed cost for appliances
  }

  if (formData.kitchenPlumbing) {
    totalCost += 2000; // Assuming a fixed cost for kitchenPlumbing
  }

  if (formData.kitchenLighting) {
    totalCost += 1500; // Assuming a fixed cost for kitchenLighting
  }

  return totalCost;
};

const KitchenForm = ({ handleChange, formData }) => {
  const kitchenCabinetMaterials = [
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

  const kitchenSinkMaterials = [
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
            <label htmlFor="islandSqFootage" className="block mb-2">
              Island Square Footage
            </label>
            <input
              type="number"
              name="islandSqFootage"
              id="islandSqFootage"
              value={formData.islandSqFootage}
              onChange={handleChange}
              className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
            />
          </div>
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
              {kitchenCabinetMaterials.map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="islandCountertop">Island Countertop Material</label>
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
        {renderSwitch(
          "kitchenCabinets",
          "kitchenCabinets",
          formData.kitchenCabinets,
          handleChange
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
        {renderSwitch(
          "kitchenSink",
          "kitchenSink",
          formData.kitchenSink,
          handleChange
        )}
        <label htmlFor="kitchenSink" className="ml-1 text-lg">
          Sink
        </label>
      </div>
      {formData.kitchenSink && (
        <div className="form-control">
          <label htmlFor="kitchenSinkMaterial">Sink Material</label>
          <select
            name="kitchenSinkMaterial"
            id="kitchenSinkMaterial"
            className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
            value={formData.kitchenSinkMaterial}
            onChange={handleChange}
          >
            <option value="">Select a material</option>
            {kitchenSinkMaterials.map((material) => (
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
        {renderSwitch(
          "kitchenPlumbing",
          "kitchenPlumbing",
          formData.kitchenPlumbing,
          handleChange
        )}
        <label htmlFor="kitchenPlumbing" className="ml-1 text-lg">
          Plumbing
        </label>
      </div>
      <div className="form-control">
        {renderSwitch(
          "kitchenLighting",
          "kitchenLighting",
          formData.kitchenLighting,
          handleChange
        )}
        <label htmlFor="kitchenLighting" className="ml-1 text-lg">
          Lighting
        </label>
      </div>
    </>
  );
};

export default KitchenForm;
