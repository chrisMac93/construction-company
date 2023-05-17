import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const calculateSinkCost = (sinkType, sinkCost) => {
  if (!sinkType || !sinkCost) {
    return 0;
  }
  const totalCost = sinkCost[sinkType];

  console.log("Sink Cost: ", totalCost);
  return totalCost;
};

const SinkForm = ({ handleChange, formData }) => {
  const [sinkTypes, setSinkTypes] = useState([]);

  useEffect(() => {
    const fetchSinkTypes = async () => {
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

      const sinkTypesCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/bathroomTiers/${bathroomTiersDocId}/sinkType`
      );

      const sinkTypesSnapshot = await getDocs(sinkTypesCollectionRef);
      const types = [];
      const costs = {};

      sinkTypesSnapshot.forEach((doc) => {
        const sinkData = doc.data();
        types.push(sinkData.name);
        costs[sinkData.name] = sinkData.price;
      });

      setSinkTypes(types);
      handleChange({ target: { name: "sinkCost", value: costs } });
    };

    fetchSinkTypes();
  }, []);

  return (
    <>
      <div className="form-control">
        <label htmlFor="sinkType" className="block mb-2">
          Sink Type
        </label>
        <select
          name="sinkType"
          id="sinkType"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          onChange={handleChange}
          value={formData.sinkType}
        >
          <option value="">Select a Sink Type</option>
          {sinkTypes.map((sinkType) => (
            <option key={sinkType} value={sinkType}>
              {sinkType}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SinkForm;
