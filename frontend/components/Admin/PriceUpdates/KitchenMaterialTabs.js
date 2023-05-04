import React from 'react';

const KitchenMaterialTabs = ({ selectedKitchenTab, onKitchenTabChange }) => {
  return (
    <div className="flex justify-center space-x-4 my-4">
      <button
        onClick={() => onKitchenTabChange("countertops")}
        className={`p-3 rounded-md ${
          selectedKitchenTab === "countertops"
            ? "bg-neutral-600 text-neutral-100"
            : "bg-neutral-700 text-neutral-300"
        }`}
      >
        Countertops
      </button>
      <button
        onClick={() => onKitchenTabChange("cabinets")}
        className={`p-3 rounded-md ${
          selectedKitchenTab === "cabinets"
            ? "bg-neutral-600 text-neutral-100"
            : "bg-neutral-700 text-neutral-300"
        }`}
      >
        Cabinets
      </button>
    </div>
  );
};

export default KitchenMaterialTabs;