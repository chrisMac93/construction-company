import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
  where,
} from "firebase/firestore";
import { storage, firestore } from "../../lib/firebase";

import styles from "../../styles/Home.module.css";

const ImageHandler = () => {
  const [imageURLs, setImageURLs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [removeImagesMode, setRemoveImagesMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = async (file) => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    setLoading(true);

    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      console.log("Upload to storage successful.");

      const imageURL = await getDownloadURL(storageRef);
      console.log("Download URL retrieved:", imageURL);

      await saveImageURLToFirestore(imageURL);
      console.log("URL saved to Firestore.");

      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    console.log("Files selected:", e.target.files);
    const files = Array.from(e.target.files); // Convert FileList to an array
    files.forEach((file) => {
      handleImageUpload(file);
    });
  };
  
  const saveImageURLToFirestore = async (imageURL) => {
    const imagesRef = collection(firestore, "images");
    await addDoc(imagesRef, { url: imageURL });
  };

  const deleteImage = async (url) => {
    try {
      const urlObject = new URL(url);
      const pathSegments = urlObject.pathname.split("/");
      const fileName = decodeURIComponent(
        pathSegments[pathSegments.length - 1]
      );

      const imagesRef = collection(firestore, "images");
      const q = query(imagesRef, where("url", "==", url));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = doc(firestore, "images", querySnapshot.docs[0].id);
        await deleteDoc(docRef);
        console.log("Deleted image from Firestore:", url);

        const storageRef = ref(storage, `${fileName}`);
        await deleteObject(storageRef);
        console.log("Deleted image from Storage:", fileName);
      } else {
        console.log("Image not found in Firestore:", url);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const toggleRemoveImagesMode = () => {
    setRemoveImagesMode(!removeImagesMode);
    setSelectedImages([]);
  };

  const toggleImageSelection = (url) => {
    if (selectedImages.includes(url)) {
      setSelectedImages(
        selectedImages.filter((selectedUrl) => selectedUrl !== url)
      );
    } else {
      setSelectedImages([...selectedImages, url]);
    }
  };

  const deleteSelectedImages = async () => {
    for (const url of selectedImages) {
      await deleteImage(url);
    }
    setSelectedImages([]);
    setRemoveImagesMode(false);
  };

  useEffect(() => {
    const fetchImageURLs = async () => {
      const imagesRef = collection(firestore, "images");
      const q = query(imagesRef);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const urls = snapshot.docs.map((doc) => doc.data().url);
        setImageURLs(urls);
      });

      return () => unsubscribe();
    };

    fetchImageURLs();
  }, []);

  return (
    <div>
      <div className="flex items-center flex-row justify-between">
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            required
            multiple
            onChange={handleFileChange}
          />
          <span
            className={`inline-block px-2 py-2 bg-neutral-700 text-neutral-100 border border-neutral-500 ${styles.borderHov} rounded`}
          >
            Upload Image
          </span>
        </label>

        <div className="pt-6">
          <button
            onClick={toggleRemoveImagesMode}
            className={`text-neutral-800 font-bold py-2 px-4 rounded mb-6 ${
              styles.mcBackColor
            } ${styles.backHov} ${
              removeImagesMode ? "bg-opacity-100" : "bg-opacity-50"
            }`}
          >
            {removeImagesMode ? "Cancel Remove Images" : "Remove Images"}
          </button>
        </div>
      </div>

      {removeImagesMode && (
        <div className="flex items-center flex-row justify-center">
          <button
            onClick={deleteSelectedImages}
            className="bg-red-400 hover:bg-red-500 text-neutral-700 font-bold py-2 px-4 rounded mb-6 "
          >
            Confirm Delete
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {imageURLs.map((url, index) => (
          <div key={index} className="relative">
            <div
              onClick={
                removeImagesMode ? () => toggleImageSelection(url) : null
              }
              className={`border-4 border-transparent ${
                removeImagesMode && selectedImages.includes(url)
                  ? "border-red-500"
                  : ""
              }`}
            >
              <div className="w-24 h-48 object-cover">
                <Image
                  src={url}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              {removeImagesMode && selectedImages.includes(url) && (
                <div className="absolute top-0 left-0 w-full h-full bg-red-300 opacity-50"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageHandler;
