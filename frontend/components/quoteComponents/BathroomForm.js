import React from "react";
import FlooringForm from "./FlooringForm";
import { calculateFlooringCost } from "./FlooringForm";

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
    totalCost += calculateFlooringCost(formData.material, formData.sqFootage);
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
        <label>
          Do you need a sink?
          <input
            type="checkbox"
            name="sinkNeeded"
            checked={formData.sinkNeeded}
            onChange={handleChange}
          />
        </label>
      </div>

      {formData.sinkNeeded && (
        <>
          <div className="form-control">
            <label>
              Sink Type:
              <select
                name="sinkType"
                value={formData.sinkType}
                onChange={handleChange}
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
        <label>
          Do you need a toilet?
          <input
            type="checkbox"
            name="toiletNeeded"
            checked={formData.toiletNeeded}
            onChange={handleChange}
          />
        </label>
      </div>

      {formData.toiletNeeded && (
        <div className="form-control">
          <label>
            Toilet Type:
            <select
              name="toiletType"
              value={formData.toiletType}
              onChange={handleChange}
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
        <label>
          Do you need a shower/tub?
          <input
            type="checkbox"
            name="showerTubNeeded"
            checked={formData.showerTubNeeded}
            onChange={handleChange}
          />
        </label>
      </div>

      {formData.showerTubNeeded && (
        <div className="form-control">
          <label>
            Shower/Tub Type:
            <select
              name="showerTubType"
              value={formData.showerTubType}
              onChange={handleChange}
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
        <label>
          Do you need flooring?
          <input
            type="checkbox"
            name="flooringNeeded"
            checked={formData.flooringNeeded}
            onChange={handleChange}
          />
        </label>
      </div>

      {formData.flooringNeeded && (
        <>
          <FlooringForm handleChange={handleChange} formData={formData} />
        </>
      )}
    </>
  );
};

export default BathroomForm;
