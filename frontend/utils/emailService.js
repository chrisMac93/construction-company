import emailjs from "@emailjs/browser";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../lib/firebase";

export const Apply = async (formData) => {
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  const file = formData.get("resume");
  const storageInstance = getStorage(app);
  const fileRef = ref(storageInstance, `resumes/${file.name}`);

  await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(fileRef);

  data.download_link = downloadURL;

  return emailjs
    .send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_APPLY_TEMPLATE_ID,
      data,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then(
      (result) => {
        console.log("Email sent successfully!", result);
      },
      (error) => {
        console.error("Failed to send email.", error);
      }
    );
};

export const sendQuoteEmail = (objectData, estimate) => {
  // Modify the objectData to include the estimate
  objectData.estimate = estimate;

  // Convert nested objects to dot notation
  const flattenedData = {};
  for (const key in objectData) {
    if (typeof objectData[key] === "object") {
      for (const subKey in objectData[key]) {
        if (objectData[key][subKey]) {
          flattenedData[`${key}.${subKey}`] = objectData[key][subKey];
        }
      }
    } else if (objectData[key]) {
      flattenedData[key] = objectData[key];
    }
  }

  return emailjs
    .send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_QUOTE_TEMPLATE_ID, // Use a different template ID for the Quote component
      flattenedData,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then(
      (result) => {
        console.log("Email sent successfully!", result);
      },
      (error) => {
        console.error("Failed to send email.", error);
      }
    );
};
