import React from 'react';

const BathroomTiersTabs = ({ selectedBathroomTab, onBathroomTabChange }) => {
  return (
    <div className="flex justify-center space-x-4 my-4">
      <button
        onClick={() => onBathroomTabChange("sinkType")}
        className={`p-3 rounded-md ${
          selectedBathroomTab === "sinkType"
            ? "bg-neutral-600 text-neutral-100"
            : "bg-neutral-700 text-neutral-300"
        }`}
      >
        Sink
      </button>
      <button
        onClick={() => onBathroomTabChange("showerTubType")}
        className={`p-3 rounded-md ${
          selectedBathroomTab === "showerTubType"
            ? "bg-neutral-600 text-neutral-100"
            : "bg-neutral-700 text-neutral-300"
        }`}
      >
        Shower/Tub
      </button>
      <button
        onClick={() => onBathroomTabChange("toiletType")}
        className={`p-3 rounded-md ${
          selectedBathroomTab === "toiletType"
            ? "bg-neutral-600 text-neutral-100"
            : "bg-neutral-700 text-neutral-300"
        }`}
      >
        Toilet
      </button>
    </div>
  );
};

export default BathroomTiersTabs;