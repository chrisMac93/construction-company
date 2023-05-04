import { useState, useEffect } from "react";
import {
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import GetMaterialsRef from "./GetMaterialsRef";
import useFetchMaterials from "../../../hooks/useFetchMaterials";
import { DeckPatioExtras } from "./DeckPatioExtras";
import MaterialListItem from "./MaterialListItem";
import Tabs from "./Tabs";
import KitchenMaterialTabs from "./KitchenMaterialTabs";
import AddMaterialForm from "./AddMaterialForm";

const PriceUpdates = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedTab, setSelectedTab] = useState("coatingsMaterials");
  const [handrails, setHandrails] = useState([]);
  const [lighting, setLighting] = useState([]);
  const [countertops, setCountertops] = useState([]);
  const [included, setIncluded] = useState([]);
  const [kitchenCabinets, setKitchenCabinets] = useState([]);
  const [selectedKitchenTab, setSelectedKitchenTab] = useState("countertops");

  const fetchMaterials = useFetchMaterials(
    setMaterials,
    setHandrails,
    setLighting,
    setCountertops,
    setIncluded,
    setKitchenCabinets
  );

  useEffect(() => {
    let cleanup;
  
    (async () => {
      cleanup = await fetchMaterials(selectedTab);
    })();
  
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [selectedTab]);

  const handleDeleteMaterial = async (id, nestedMaterialType) => {
    try {
      let materialsRef;
      if (nestedMaterialType) {
        materialsRef = await GetMaterialsRef(selectedTab, nestedMaterialType);
      } else {
        materialsRef = await GetMaterialsRef(selectedTab);
      }
      const materialRef = doc(materialsRef, id);
      await deleteDoc(materialRef);
      setMaterials(materials.filter((material) => material.id !== id));
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  const handleUpdateMaterial = async (id, price, nestedMaterialType) => {
    try {
      let materialRef;
      if (nestedMaterialType) {
        const materialsRef = await GetMaterialsRef(
          selectedTab,
          nestedMaterialType
        );
        materialRef = doc(materialsRef, id);
      } else if (selectedTab === "deckMaterials") {
        const materialsRef = await GetMaterialsRef(
          selectedTab,
          "deckingMaterials"
        );
        materialRef = doc(materialsRef, id);
      } else {
        const materialsRef = await GetMaterialsRef(selectedTab);
        materialRef = doc(materialsRef, id);
      }

      await updateDoc(materialRef, { price });

      const updateState = (arr) =>
        arr.map((material) =>
          material.id === id ? { ...material, price } : material
        );

      if (nestedMaterialType === "deckHandrails") {
        setHandrails(updateState(handrails));
      } else if (nestedMaterialType === "deckLighting") {
        setLighting(updateState(lighting));
      } else if (nestedMaterialType === "countertopMaterials") {
        setCountertops(updateState(countertops));
      } else if (nestedMaterialType === "included") {
        setIncluded(updateState(included));
      } else if (nestedMaterialType === "kitchenCabinetMaterials") {
        setKitchenCabinets(updateState(kitchenCabinets));
      } else {
        setMaterials(updateState(materials));
      }
    } catch (error) {
      console.error("Error updating material:", error);
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      {/* {renderTabs()} */}
      <Tabs selectedTab={selectedTab} onTabChange={handleTabChange} />
      {/* Add Material Form */}
      <AddMaterialForm
        selectedTab={selectedTab}
        selectedKitchenTab={selectedKitchenTab}
        materials={materials}
        setMaterials={setMaterials}
        GetMaterialsRef={GetMaterialsRef}
      />
      {selectedTab === "deckMaterials" && (
        <div>
          <h3 className="text-2xl font-semibold mt-8 mb-4 text-center">
            Handrails & lighting
          </h3>
          <DeckPatioExtras
            data={handrails}
            onUpdatePrice={(id, price) =>
              handleUpdateMaterial(id, price, "deckHandrails")
            }
          />
          <DeckPatioExtras
            data={lighting}
            onUpdatePrice={(id, price) =>
              handleUpdateMaterial(id, price, "deckLighting")
            }
            className="mt-4"
          />
        </div>
      )}
      {selectedTab === "kitchenMaterials" && (
        <div>
          <KitchenMaterialTabs
            selectedKitchenTab={selectedKitchenTab}
            onKitchenTabChange={setSelectedKitchenTab}
          />
          <h3 className="text-2xl font-semibold mt-8 mb-4 text-center">
            Included Kitchen Add-ons
          </h3>
          <ul className="space-y-4">
            {included.map((item) => (
              <li
                key={item.id}
                className="bg-neutral-700 p-4 rounded-md flex justify-between items-center"
              >
                <span>
                  {item.name} - ${item.price}
                </span>
                <div className="flex">
                  <input
                    type="number"
                    step="any"
                    value={item.price}
                    onChange={(e) =>
                      handleUpdateMaterial(item.id, e.target.value, "included")
                    }
                    className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100 mr-4"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Material List */}
      <h3 className="text-2xl font-semibold my-8 text-center">
        {selectedTab === "interiorTiers"
          ? "Interior"
          : selectedTab === "exteriorTiers"
          ? "Exterior"
          : selectedTab === "epoxyMaterials"
          ? "Epoxy"
          : selectedTab === "coatingsMaterials"
          ? "Coatings"
          : selectedTab === "deckMaterials"
          ? "Deck/Patio"
          : selectedTab === "kitchenMaterials"
          ? "Kitchen"
          : selectedTab === "concreteMaterials"
          ? "Concrete"
          : "Flooring"}
      </h3>
      <ul className="space-y-4">
        {selectedTab === "kitchenMaterials"
          ? selectedKitchenTab === "countertops"
            ? countertops.map((material) => (
                <MaterialListItem
                  key={material.id}
                  material={material}
                  handleUpdateMaterial={(id, value) =>
                    handleUpdateMaterial(id, value, "countertopMaterials")
                  }
                  handleDeleteMaterial={(id) =>
                    handleDeleteMaterial(id, "countertopMaterials")
                  }
                />
              ))
            : kitchenCabinets.map((material) => (
                <MaterialListItem
                  key={material.id}
                  material={material}
                  handleUpdateMaterial={(id, value) =>
                    handleUpdateMaterial(id, value, "kitchenCabinetMaterials")
                  }
                  handleDeleteMaterial={(id) =>
                    handleDeleteMaterial(id, "kitchenCabinetMaterials")
                  }
                />
              ))
          : materials.map((material) => (
              <MaterialListItem
                key={material.id}
                material={material}
                handleUpdateMaterial={(id, value) =>
                  handleUpdateMaterial(id, value)
                }
                handleDeleteMaterial={(id) =>
                  handleDeleteMaterial(
                    id,
                    selectedTab === "deckMaterials" ? "deckingMaterials" : null
                  )
                }
              />
            ))}
      </ul>
    </>
  );
};

export default PriceUpdates;
