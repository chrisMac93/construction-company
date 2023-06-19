import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../lib/firebase";

const useImages = () => {
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const db = getFirestore(app);
      const imagesCollection = await getDocs(collection(db, "images"));

      const imagesData = imagesCollection.docs.map((doc) => {
        const data = doc.data();
        return { [data.title]: data.url };
      });

      setImages(Object.assign({}, ...imagesData));
    };

    fetchImages();
  }, []);

  return images;
};

export default useImages;
