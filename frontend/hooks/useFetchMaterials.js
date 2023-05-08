import GetMaterialsRef from "../components/Admin/PriceUpdates/GetMaterialsRef";
import { onSnapshot } from "firebase/firestore";

const useFetchMaterials = (
  setMaterials,
  setHandrails,
  setLighting,
  setCountertops,
  setIncluded,
  setKitchenCabinets,
  setRoofing,
  setSiding,
  setLandscaping
) => {
  async function fetchMaterials(materialType) {
    let unsubscribeMaterials,
      unsubscribeHandrails,
      unsubscribeLighting,
      unsubscribeCountertops,
      unsubscribeIncluded,
      unsubscribeCabinets,
      unsubscribeRoofing,
      unsubscribeSiding,
      unsubscribeLandscaping;

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
    } else if (materialType == "exterior") {
      const roofingRef = await GetMaterialsRef(materialType, "roofing");
      const sidingRef = await GetMaterialsRef(materialType, "siding");
      const landscapingRef = await GetMaterialsRef(materialType, "landscaping");

      unsubscribeRoofing = onSnapshot(roofingRef, (snapshot) => {
        const roofingData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRoofing(roofingData);
      });
      unsubscribeSiding = onSnapshot(sidingRef, (snapshot) => {
        const sidingData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSiding(sidingData);
      });
      unsubscribeLandscaping = onSnapshot(landscapingRef, (snapshot) => {
        const landscapingData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLandscaping(landscapingData);
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
      unsubscribeRoofing && unsubscribeRoofing();
      unsubscribeSiding && unsubscribeSiding();
      unsubscribeLandscaping && unsubscribeLandscaping();
    };
  }

  return fetchMaterials;
};

export default useFetchMaterials;
