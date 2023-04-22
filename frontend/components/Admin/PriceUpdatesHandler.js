import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import { DeckPatioExtras } from "./DeckPatioExtras";

import styles from "../../styles/Home.module.css";

const PriceUpdates = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({ name: "", price: "" });
  const [selectedTab, setSelectedTab] = useState("floorMaterials");
  const [handrails, setHandrails] = useState([]);
  const [lighting, setLighting] = useState([]);

  const getMaterialsRef = async (materialType, nestedMaterialType) => {
    const db = getFirestore();
    const priceUpdatesCollectionRef = collection(db, "priceUpdates");
    const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
    const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id;

    if (materialType === "deckMaterials" && nestedMaterialType) {
      const deckMaterialsRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/${materialType}`
      );
      const deckMaterialsSnapshot = await getDocs(deckMaterialsRef);
      const deckMaterialsDocId = deckMaterialsSnapshot.docs[0].id;

      return collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/${materialType}/${deckMaterialsDocId}/${nestedMaterialType}`
      );
    }

    return collection(db, `priceUpdates/${priceUpdatesDocId}/${materialType}`);
  };

  useEffect(() => {
    let unsubscribeMaterials, unsubscribeHandrails, unsubscribeLighting;

    const fetchMaterials = async (materialType) => {
      const materialsRef = await getMaterialsRef(materialType);
      unsubscribeMaterials = onSnapshot(materialsRef, (snapshot) => {
        const materials = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaterials(materials);
      });

      if (materialType === "deckMaterials") {
        const handrailsRef = await getMaterialsRef(
          materialType,
          "deckHandrails"
        );
        const lightingRef = await getMaterialsRef(materialType, "deckLighting");
        const deckingMaterialsRef = await getMaterialsRef(
          materialType,
          "deckingMaterials"
        );

        onSnapshot(deckingMaterialsRef, (snapshot) => {
          const deckingMaterials = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMaterials(deckingMaterials);
        });

        unsubscribeHandrails = onSnapshot(handrailsRef, (snapshot) => {
          const handrailsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setHandrails(handrailsData);
        });

        unsubscribeLighting = onSnapshot(lightingRef, (snapshot) => {
          const lightingData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLighting(lightingData);
        });
      }
    };

    fetchMaterials(selectedTab);
    return () => {
      unsubscribeMaterials && unsubscribeMaterials();
      unsubscribeHandrails && unsubscribeHandrails();
      unsubscribeLighting && unsubscribeLighting();
    };
  }, [selectedTab]);

  const handleAddMaterial = async () => {
    try {
      let materialsRef;
      if (selectedTab === "deckMaterials") {
        materialsRef = await getMaterialsRef(selectedTab, "deckingMaterials");
      } else {
        materialsRef = await getMaterialsRef(selectedTab);
      }
      const newDoc = await addDoc(materialsRef, newMaterial);
      setMaterials([...materials, { id: newDoc.id, ...newMaterial }]);
      setNewMaterial({ name: "", price: "" });
    } catch (error) {
      console.error("Error adding new material:", error);
    }
  };

  const handleDeleteMaterial = async (id, nestedMaterialType) => {
    try {
      let materialsRef;
      if (nestedMaterialType) {
        materialsRef = await getMaterialsRef(selectedTab, nestedMaterialType);
      } else {
        materialsRef = await getMaterialsRef(selectedTab);
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
        const materialsRef = await getMaterialsRef(
          selectedTab,
          nestedMaterialType
        );
        materialRef = doc(materialsRef, id);
      } else {
        const materialsRef = await getMaterialsRef(selectedTab);
        materialRef = doc(materialsRef, id);
      }

      await updateDoc(materialRef, { price });

      if (nestedMaterialType === "handrails") {
        setHandrails(
          handrails.map((material) =>
            material.id === id ? { ...material, price } : material
          )
        );
      } else if (nestedMaterialType === "lighting") {
        setLighting(
          lighting.map((material) =>
            material.id === id ? { ...material, price } : material
          )
        );
      } else {
        setMaterials(
          materials.map((material) =>
            material.id === id ? { ...material, price } : material
          )
        );
      }
    } catch (error) {
      console.error("Error updating material:", error);
    }
  };

  const renderTabs = () => {
    const tabs = [
      { label: "Whole-Home", value: "wholeHomeTiers" },
      { label: "Interior", value: "interiorTiers" },
      { label: "Exterior", value: "exteriorTiers" },
      { label: "Flooring", value: "flooringMaterials" },
      { label: "Epoxy", value: "epoxyMaterials" },
      { label: "Coatings", value: "coatingsMaterials" },
      { label: "Concrete", value: "concreteMaterials" },
      { label: "Deck/Patio", value: "deckMaterials" },
    ];

    return (
      <div className="flex mb-8 justify-center">
        {tabs.map(({ label, value }) => (
          <button
            key={value}
            className={`p-2 ${selectedTab === value && "font-bold"}`}
            onClick={() => setSelectedTab(value)}
          >
            {label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      {renderTabs()}
      {/* Add Material Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddMaterial();
        }}
        className="bg-neutral-700 p-6 rounded-md space-y-6"
      >
        <h3 className="text-2xl font-semibold mb-4 text-center">
          {selectedTab === "wholeHomeTiers"
            ? "Add Whole-Home Tier"
            : selectedTab === "interiorTiers"
            ? "Add Interior Tier"
            : selectedTab === "exteriorTiers"
            ? "Add Exterior Tier"
            : selectedTab === "epoxyMaterials"
            ? "Add Epoxy Material"
            : selectedTab === "coatingsMaterials"
            ? "Add Coatings Material"
            : selectedTab === "deckMaterials"
            ? "Add Deck/Patio Material"
            : selectedTab === "concreteMaterials"
            ? "Add Concrete Material"
            : "Add Flooring Material"}
        </h3>
        <div>
          <label htmlFor="name" className="block mb-2">
            {selectedTab === "wholeHomeTiers" ||
            selectedTab === "interiorTiers" ||
            selectedTab === "exteriorTiers"
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
            {selectedTab === "wholeHomeTiers" ||
            selectedTab === "interiorTiers" ||
            selectedTab === "exteriorTiers"
              ? "Tier Price:"
              : "Material Price:"}
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="any"
            value={newMaterial.price}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, price: e.target.value })
            }
            required
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
          />
        </div>
        <button
          type="submit"
          className={`w-full p-3 rounded-md text-neutral-800 ${styles.mcBackColor} ${styles.backHov}`}
        >
          {selectedTab === "wholeHomeTiers" ||
          selectedTab === "interiorTiers" ||
          selectedTab === "exteriorTiers"
            ? "Add Tier"
            : "Add Material"}
        </button>
      </form>
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
          />
        </div>
      )}
      {/* Material List */}
      <h3 className="text-2xl font-semibold my-8 text-center">
        {selectedTab === "wholeHomeTiers"
          ? "Whole-Home"
          : selectedTab === "interiorTiers"
          ? "Interior"
          : selectedTab === "exteriorTiers"
          ? "Exterior"
          : selectedTab === "epoxyMaterials"
          ? "Epoxy"
          : selectedTab === "coatingsMaterials"
          ? "Coatings"
          : selectedTab === "deckMaterials"
          ? "Deck/Patio"
          : selectedTab === "concreteMaterials"
          ? "Concrete"
          : "Flooring"}
      </h3>
      <ul className="space-y-4">
        {materials.map((material) => (
          <li
            key={material.id}
            className="bg-neutral-700 p-4 rounded-md flex justify-between items-center"
          >
            <span>
              {material.name} - ${material.price}
            </span>
            <div className="flex">
              <input
                type="number"
                step="any"
                value={material.price}
                onChange={(e) =>
                  handleUpdateMaterial(material.id, e.target.value)
                }
                className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100 mr-4"
              />
              <button
                onClick={() =>
                  handleDeleteMaterial(
                    material.id,
                    selectedTab === "deckMaterials"
                      ? "deckingMaterials"
                      : null
                  )
                }
                className="ml-4 p-3 bg-red-500 text-neutral-100 rounded-md hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PriceUpdates;
