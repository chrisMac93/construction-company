import React from 'react';

const ExteriorMaterialTabs = ({ selectedExteriorTab, onExteriorTabChange }) => {
  return (
    <div className="flex justify-center space-x-4 my-4">
      <button
        onClick={() => onExteriorTabChange("roofing")}
        className={`p-3 rounded-md ${
          selectedExteriorTab === "roofing"
            ? "bg-neutral-600 text-neutral-100"
            : "bg-neutral-700 text-neutral-300"
        }`}
      >
        Roofing
      </button>
      <button
        onClick={() => onExteriorTabChange("siding")}
        className={`p-3 rounded-md ${
          selectedExteriorTab === "siding"
            ? "bg-neutral-600 text-neutral-100"
            : "bg-neutral-700 text-neutral-300"
        }`}
      >
        Siding
      </button>
    </div>
  );
};

export default ExteriorMaterialTabs;