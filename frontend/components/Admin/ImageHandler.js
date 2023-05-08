import { useState, useEffect } from "react";
import Image from "next/image";
import { InView } from "react-intersection-observer";
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
  const [removeImagesMode, setRemoveImagesMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isTitleModalVisible, setIsTitleModalVisible] = useState(false);
  const [filesWithTitle, setFilesWithTitle] = useState([]);
  const [isSpecialType, setIsSpecialType] = useState([]);
  const [imageType, setImageType] = useState("Gallery");
  const [selectedTab, setSelectedTab] = useState("Gallery");

  const handleImageUpload = async (file, title, imageTypes) => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      const storageRef = ref(storage, `images/${file.name}`);
      const metadata = {
        contentType: file.type,
        cacheControl: "public, max-age=86400",
      };
      await uploadBytes(storageRef, file, metadata);
      console.log(
        "Upload to storage successful with cache control:",
        metadata.cacheControl
      );

      const imageURL = await getDownloadURL(storageRef);
      console.log("Download URL retrieved:", imageURL);

      for (const imageType of imageTypes) {
        await saveImageURLToFirestore(imageURL, title, imageType, file.name);
      }

      console.log("URL saved to Firestore.");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const openTitleModal = () => {
    setIsTitleModalVisible(true);
  };

  const handleCheckboxChange = (index, imageType, checked) => {
    const updatedIsSpecialType = { ...isSpecialType };
    if (checked) {
      if (updatedIsSpecialType[index]) {
        updatedIsSpecialType[index].push(imageType);
      } else {
        updatedIsSpecialType[index] = [imageType];
      }
    } else {
      updatedIsSpecialType[index] = updatedIsSpecialType[index].filter(
        (type) => type !== imageType
      );
    }
    setIsSpecialType(updatedIsSpecialType);
  };

  const handleTitleChange = (index, e) => {
    const updatedFilesWithTitle = [...filesWithTitle];
    updatedFilesWithTitle[index].title = e.target.value;
    setFilesWithTitle(updatedFilesWithTitle);
  };

  const handleTypeChange = (e) => {
    setImageType(e.target.value);
  };

  const handleTitleSubmit = () => {
    filesWithTitle.forEach(({ file, title }, index) => {
      const imageTypes = isSpecialType[index] || [];
      handleImageUpload(file, title, imageTypes);
    });
    setFilesWithTitle([]);
    setIsSpecialType({});
    setIsTitleModalVisible(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length === 0) {
      console.log("No files selected");
      return;
    }
    console.log("Files selected:", e.target.files);
    const files = Array.from(e.target.files); // Convert FileList to an array
    const filesWithTitle = files.map((file) => ({ file, title: "" }));
    setFilesWithTitle(filesWithTitle);
    setIsTitleModalVisible(true); // Open the title modal
  };

  const saveImageURLToFirestore = async (
    imageURL,
    title,
    imageType,
    fileName
  ) => {
    const imagesRef = collection(firestore, "images");
    await addDoc(imagesRef, { url: imageURL, title, imageType, fileName });
  };

  const deleteImage = async (url) => {
    try {
      const imagesRef = collection(firestore, "images");
      const q = query(imagesRef, where("url", "==", url));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        const fileName = docData.fileName;

        // Delete the image from Firestore
        const docRef = doc(firestore, "images", querySnapshot.docs[0].id);
        await deleteDoc(docRef);
        console.log("Deleted image from Firestore:", url);

        // Delete the image from Storage
        const storageRef = ref(storage, `images/${fileName}`);
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
      await deleteImage(url, selectedTab);
    }
    setSelectedImages([]);
    setRemoveImagesMode(false);
  };

  const fetchImageURLs = async (imageType) => {
    const imagesRef = collection(firestore, "images");
    const q = query(imagesRef, where("imageType", "==", imageType));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const urls = snapshot.docs.map((doc) => doc.data().url);
      setImageURLs(urls);
    });
    return () => unsubscribe();
  };

  useEffect(() => {
    fetchImageURLs(selectedTab);
  }, [selectedTab]);

  return (
    <div>
      {isTitleModalVisible && (
        <>
          <div className="fixed inset-0 bg-gray-500 opacity-50 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-neutral-700 p-6 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Enter image titles</h2>
              {filesWithTitle.map((fileWithTitle, index) => (
                <div key={index} className="mb-2">
                  <div className="flex items-center">
                    <img
                      src={URL.createObjectURL(fileWithTitle.file)}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <input
                      type="text"
                      placeholder="Enter title"
                      className="ml-2 px-2 py-1 border border-gray-300 rounded text-gray-700"
                      value={fileWithTitle.title}
                      onChange={(e) => handleTitleChange(index, e)}
                    />
                  </div>
                  <div className="flex flex-wrap items-center mt-2">
                    {["Gallery", "Services", "Testimonials", "Site"].map(
                      (collectionType) => (
                        <div key={collectionType} className="mr-2">
                          <input
                            type="checkbox"
                            id={`${collectionType}-${index}`}
                            name={`${collectionType}-${index}`}
                            checked={
                              isSpecialType[index]?.includes(collectionType) ||
                              false
                            }
                            onChange={(e) =>
                              handleCheckboxChange(
                                index,
                                collectionType,
                                e.target.checked
                              )
                            }
                          />
                          <label
                            htmlFor={`${collectionType}-${index}`}
                            className="ml-2"
                          >
                            {collectionType}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={handleTitleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
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
      <div className="flex items-center justify-center mb-4">
        {["Gallery", "Services", "Testimonials", "Site"].map((tab) => (
          <button
            key={tab}
            className={`mx-2 py-2 px-4 ${
              selectedTab === tab
                ? " bg-neutral-700 text-neutral-100"
                : " bg-neutral-500 text-neutral-100"
            } rounded`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
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
              <div className="w-24 h-48 ">
                <InView as="div" triggerOnce>
                  <Image
                    src={url}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg overflow-hidden"
                  />
                </InView>
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
