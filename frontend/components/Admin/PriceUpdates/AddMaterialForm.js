import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import GetMaterialsRef from "./GetMaterialsRef";

import styles from "../../../styles/Home.module.css";

const AddMaterialForm = ({
  selectedTab,
  selectedKitchenTab,
  materials,
  setMaterials,
  getMaterialsRef,
}) => {
  const [newMaterial, setNewMaterial] = useState({ name: "", price: null });

  const handleAddMaterial = async () => {
    try {
      let materialsRef;
      let nestedMaterialType = null;

      if (selectedTab === "deckMaterials") {
        nestedMaterialType = "deckingMaterials";
      } else if (selectedTab === "kitchenMaterials") {
        nestedMaterialType =
          selectedKitchenTab === "countertops"
            ? "countertopMaterials"
            : selectedKitchenTab === "cabinets"
            ? "kitchenCabinetMaterials"
            : null;
      }

      materialsRef = await GetMaterialsRef(selectedTab, nestedMaterialType);

      const newDoc = await addDoc(materialsRef, {
        ...newMaterial,
        price: parseFloat(newMaterial.price),
      });
      setMaterials([...materials, { id: newDoc.id, ...newMaterial }]);
      setNewMaterial({ name: "", price: null });
    } catch (error) {
      console.error("Error adding new material:", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddMaterial();
      }}
      className="bg-neutral-700 p-6 rounded-md space-y-6"
    >
      <h3 className="text-2xl font-semibold mb-4 text-center">
        {selectedTab === "interiorTiers"
          ? "Add Interior Tier"
          : selectedTab === "exteriorTiers"
          ? "Add Exterior Tier"
          : selectedTab === "epoxyMaterials"
          ? "Add Epoxy Material"
          : selectedTab === "coatingsMaterials"
          ? "Add Coatings Material"
          : selectedTab === "deckMaterials"
          ? "Add Deck/Patio Material"
          : selectedTab === "kitchenMaterials"
          ? `Add Kitchen ${
              selectedKitchenTab === "countertops" ? "Countertop" : "Cabinet"
            } Material`
          : selectedTab === "concreteMaterials"
          ? "Add Concrete Material"
          : "Add Flooring Material"}
      </h3>
      <div>
        <label htmlFor="name" className="block mb-2">
          {selectedTab === "interiorTiers" || selectedTab === "exteriorTiers"
            ? "Tier Name:"
            : "Material Name:"}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={newMaterial.name}
          onChange={(e) =>
            setNewMaterial({ ...newMaterial, name: e.target.value })
          }
          required
          className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
        />
      </div>
      <div>
        <label htmlFor="price" className="block mb-2">
          {selectedTab === "interiorTiers" || selectedTab === "exteriorTiers"
            ? "Tier Price:"
            : "Material Price:"}
        </label>
        <input
          type="number"
          id="price"
          name="price"
          step="any"
          value={newMaterial.price !== null ? newMaterial.price.toString() : ""}
          onChange={(e) =>
            setNewMaterial({
              ...newMaterial,
              price: parseFloat(e.target.value) || null,
            })
          }
          required
          className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
        />
      </div>
      <button
          type="submit"
          className={`w-full p-3 rounded-md text-neutral-800 ${styles.mcBackColor} ${styles.backHov}`}
        >
          {selectedTab === "interiorTiers" || selectedTab === "exteriorTiers"
            ? "Add Tier"
            : "Add Material"}
        </button>
    </form>
  );
};

export default AddMaterialForm;
