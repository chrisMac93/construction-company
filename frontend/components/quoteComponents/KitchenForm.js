import React from "react";
import { Switch, Listbox } from '@headlessui/react';
import FlooringForm from "./FlooringForm";

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

  const renderSwitch = (id, name, checked) => (
    <Switch
      id={id}
      name={name}
      checked={checked}
      onChange={(value) => handleChange({ target: { name, value } })}
      className={`${
        checked ? 'bg-indigo-600' : 'bg-gray-200'
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
    >
      <span className="sr-only">{name}</span>
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
      />
    </Switch>
  );

  return (
    <>
      <div className="form-control">
        <label htmlFor="flooringIncluded">Flooring Included</label>
        <input
          type="checkbox"
          name="flooringIncluded"
          id="flooringIncluded"
          checked={formData.flooringIncluded}
          onChange={handleChange}
        />
      </div>
      {formData.flooringIncluded && (
        <FlooringForm handleChange={handleChange} formData={formData} />
      )}
      <div className="form-control">
        <label htmlFor="island">Island</label>
        <input
          type="checkbox"
          name="island"
          id="island"
          checked={formData.island}
          onChange={handleChange}
        />
      </div>
      {formData.island && (
        <>
          <div className="form-control">
            <label htmlFor="islandBaseMaterial">Island Base Material</label>
            <select
              name="islandBaseMaterial"
              id="islandBaseMaterial"
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
              value={formData.islandCountertop}
              onChange={handleChange}
            >
              <option value="">Select a countertop material</option>
              {countertopMaterials.map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="islandStovetop">Stovetop</label>
            <input
              type="checkbox"
              name="islandStovetop"
              id="islandStovetop"
              checked={formData.islandStovetop}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      <div className="form-control">
        <label htmlFor="countertops">Updated Countertops</label>
        <input
          type="checkbox"
          name="countertops"
          id="countertops"
          checked={formData.countertops}
          onChange={handleChange}
        />
      </div>
      {formData.countertops && (
        <div className="form-control">
          <label htmlFor="countertopMaterial">Countertop Material</label>
          <select
            name="countertopMaterial"
            id="countertopMaterial"
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
        <label htmlFor="cabinets">Updated Cabinets</label>
        <input
          type="checkbox"
          name="cabinets"
          id="cabinets"
          checked={formData.cabinets}
          onChange={handleChange}
        />
      </div>
      {formData.cabinets && (
        <div className="form-control">
          <label htmlFor="cabinetMaterial">Cabinet Material</label>
          <select
            name="cabinetMaterial"
            id="cabinetMaterial"
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
        <label htmlFor="appliances">Appliances</label>
        <input
          type="checkbox"
          name="appliances"
          id="appliances"
          checked={formData.appliances}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="plumbing">Plumbing</label>
        <input
          type="checkbox"
          name="plumbing"
          id="plumbing"
          checked={formData.plumbing}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="lighting">Lighting</label>
        <input
          type="checkbox"
          name="lighting"
          id="lighting"
          checked={formData.lighting}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default KitchenForm;
