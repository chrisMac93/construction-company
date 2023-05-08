import { collection, getFirestore, getDocs } from "firebase/firestore";

const GetMaterialsRef = async (materialType, nestedMaterialType) => {
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

  if (materialType === "kitchenMaterials") {
    const kitchenMaterialsRef = collection(
      db,
      `priceUpdates/${priceUpdatesDocId}/${materialType}`
    );
    const kitchenMaterialsSnapshot = await getDocs(kitchenMaterialsRef);
    const kitchenMaterialsDocId = kitchenMaterialsSnapshot.docs[0].id;

    if (nestedMaterialType) {
      return collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/${materialType}/${kitchenMaterialsDocId}/${nestedMaterialType}`
      );
    }
  }

  if (materialType === "exterior") {
    const exteriorRef = collection(
      db,
      `priceUpdates/${priceUpdatesDocId}/${materialType}`
    );
    const exteriorSnapshot = await getDocs(exteriorRef);
    const exteriorDocId = exteriorSnapshot.docs[0].id;

    if (nestedMaterialType) {
      return collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/${materialType}/${exteriorDocId}/${nestedMaterialType}`
      );
    }
  }

  return collection(db, `priceUpdates/${priceUpdatesDocId}/${materialType}`);
};

export default GetMaterialsRef;
