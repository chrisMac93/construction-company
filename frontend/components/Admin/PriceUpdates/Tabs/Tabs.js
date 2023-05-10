import React from "react";

const Tabs = ({ selectedTab, onTabChange }) => {
  const tabs = [
    { label: "Interior", value: "interior" },
    { label: "Drywall", value: "drywallOption" },
    { label: "Exterior", value: "exterior" },
    { label: "Flooring", value: "flooringMaterials" },
    { label: "Epoxy", value: "epoxyMaterials" },
    { label: "Coatings", value: "coatingsMaterials" },
    { label: "Concrete", value: "concreteMaterials" },
    { label: "Deck/Patio", value: "deckMaterials" },
    { label: "Kitchen", value: "kitchenMaterials" },
    { label: "Bathroom", value: "bathroomTiers" },
  ];

  const renderTabs = () => {
    return (
      <div className="flex mb-8 justify-center">
        <div className="flex py-2 px-4 space-x-4 tab-container">
          {tabs.map(({ label, value }) => (
            <button
              key={value}
              className={`p-2 ${selectedTab === value && "font-bold"}`}
              onClick={() => onTabChange(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return renderTabs();
};

export default Tabs;
