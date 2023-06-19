import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const calculateToiletCost = (toiletType, toiletCost) => {
  if (!toiletType || !toiletCost) {
    return 0;
  }
  const totalCost = toiletCost[toiletType];

  return totalCost;
};

const ToiletForm = ({ handleChange, formData }) => {
  const [toiletTypes, setToiletTypes] = useState([]);

  useEffect(() => {
    const fetchtoiletTypes = async () => {
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

      const toiletTypesCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/bathroomTiers/${bathroomTiersDocId}/toiletType`
      );

      const toiletTypesSnapshot = await getDocs(toiletTypesCollectionRef);
      const types = [];
      const costs = {};

      toiletTypesSnapshot.forEach((doc) => {
        const toiletData = doc.data();
        types.push(toiletData.name);
        costs[toiletData.name] = toiletData.price;
      });

      setToiletTypes(types);
      handleChange({ target: { name: "toiletCost", value: costs } });
    };

    fetchtoiletTypes();
  }, [handleChange]);

  return (
    <>
      <div className="form-control">
        <label htmlFor="toiletType" className="block mb-2">
          Toilet Type
        </label>
        <select
          name="toiletType"
          id="toiletType"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          onChange={handleChange}
          value={formData.toiletType}
        >
          <option value="">Select a Toilet Type</option>
          {toiletTypes.map((toiletType) => (
            <option key={toiletType} value={toiletType}>
              {toiletType}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ToiletForm;
