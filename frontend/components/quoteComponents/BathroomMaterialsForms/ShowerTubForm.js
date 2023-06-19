import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const calculateShowerTubCost = (showerTubType, showerTubCost) => {
  if (!showerTubType || !showerTubCost) {
    return 0;
  }

  const totalCost = showerTubCost[showerTubType];

  return totalCost;
};

const ShowerTubForm = ({ handleChange, formData }) => {
  const [showerTubTypes, setShowerTubTypes] = useState([]);

  useEffect(() => {
    const fetchShowerTubTypes = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id; // Assuming there is at least one document in priceUpdates collection

      const bathroomTiersCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/bathroomTiers`
      );
      const bathroomTiersSnapshot = await getDocs(bathroomTiersCollectionRef);
      const bathroomTiersDocId = bathroomTiersSnapshot.docs[0].id;

      const showerTubTypesCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/bathroomTiers/${bathroomTiersDocId}/showerTubType`
      );

      const showerTubTypesSnapshot = await getDocs(showerTubTypesCollectionRef);
      const types = [];
      const costs = {};

      showerTubTypesSnapshot.forEach((doc) => {
        const showerTubData = doc.data();
        types.push(showerTubData.name);
        costs[showerTubData.name] = showerTubData.price;
      });

      setShowerTubTypes(types);
      handleChange({ target: { name: "showerTubCost", value: costs } });
    };

    fetchShowerTubTypes();
  }, [handleChange]);

  return (
    <>
      <div className="form-control">
        <label htmlFor="showerTubType" className="block mb-2">
          showerTub Type
        </label>
        <select
          name="showerTubType"
          id="showerTubType"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          onChange={handleChange}
          value={formData.showerTubType}
        >
          <option value="">Select a showerTub Type</option>
          {showerTubTypes.map((showerTubType) => (
            <option key={showerTubType} value={showerTubType}>
              {showerTubType}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};


export default ShowerTubForm;
