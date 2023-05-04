import { useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const calculateDrywallCost = (drywallPrice, drywallSqFootage) => {
  const totalCost = drywallPrice * drywallSqFootage;
  return totalCost;
};

const DrywallOption = ({ handleChange, formData }) => {
  useEffect(() => {
    const fetchDrywallPrice = async () => {
      const db = getFirestore();
      const priceUpdatesCollectionRef = collection(db, "priceUpdates");
      const priceUpdatesSnapshot = await getDocs(priceUpdatesCollectionRef);
      const priceUpdatesDocId = priceUpdatesSnapshot.docs[0].id;

      const drywallOptionCollectionRef = collection(
        db,
        `priceUpdates/${priceUpdatesDocId}/drywallOption`
      );
      const drywallSnapshot = await getDocs(drywallOptionCollectionRef);
      const price = drywallSnapshot.docs[0].data().price;

      handleChange({ target: { name: "drywallPricePerSqFoot", value: price } });
    };

    fetchDrywallPrice();
  }, []);

  return (
    <>
      <div className="form-group">
        <label htmlFor="drywallSqFootage" className="block mb-2">
          Square Footage
        </label>
        <input
          type="number"
          className="w-full p-3 bg-neutral-700 rounded-md text-neutral-100"
          id="drywallSqFootage"
          name="drywallSqFootage"
          value={formData.drywallSqFootage}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default DrywallOption;
