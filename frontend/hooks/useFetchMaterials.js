import GetMaterialsRef from "../components/Admin/PriceUpdates/GetMaterialsRef";
import { onSnapshot } from "firebase/firestore";

const useFetchMaterials = (
  setMaterials,
  setHandrails,
  setLighting,
  setCountertops,
  setIncluded,
  setKitchenCabinets
) => {
  async function fetchMaterials(materialType) {
    let unsubscribeMaterials,
      unsubscribeHandrails,
      unsubscribeLighting,
      unsubscribeCountertops,
      unsubscribeIncluded,
      unsubscribeCabinets;

    const materialsRef = await GetMaterialsRef(materialType);
    unsubscribeMaterials = onSnapshot(materialsRef, (snapshot) => {
      const materials = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMaterials(materials);
    });

    if (materialType === "deckMaterials") {
      const handrailsRef = await GetMaterialsRef(materialType, "deckHandrails");
      const lightingRef = await GetMaterialsRef(materialType, "deckLighting");
      const deckingMaterialsRef = await GetMaterialsRef(
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
    } else if (materialType === "kitchenMaterials") {
      const countertopsRef = await GetMaterialsRef(
        materialType,
        "countertopMaterials"
      );
      const includedRef = await GetMaterialsRef(materialType, "included");
      const cabinetsRef = await GetMaterialsRef(
        materialType,
        "kitchenCabinetMaterials"
      );

      unsubscribeCountertops = onSnapshot(countertopsRef, (snapshot) => {
        const countertopData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCountertops(countertopData);
      });

      unsubscribeIncluded = onSnapshot(includedRef, (snapshot) => {
        const includedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIncluded(includedData);
      });

      unsubscribeCabinets = onSnapshot(cabinetsRef, (snapshot) => {
        const cabinetData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setKitchenCabinets(cabinetData);
      });
    }

    // Return a cleanup function
    return () => {
      unsubscribeMaterials && unsubscribeMaterials();
      unsubscribeHandrails && unsubscribeHandrails();
      unsubscribeLighting && unsubscribeLighting();
      unsubscribeCountertops && unsubscribeCountertops();
      unsubscribeIncluded && unsubscribeIncluded();
      unsubscribeCabinets && unsubscribeCabinets();
    };
  };

  return fetchMaterials;
};

export default useFetchMaterials;