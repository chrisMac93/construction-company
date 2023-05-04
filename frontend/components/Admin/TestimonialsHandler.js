import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../../lib/firebase";

import styles from "../../styles/Home.module.css";

const TestimonialHandler = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    review: "",
    titleForImage: "",
  });

  useEffect(() => {
    const testimonialsRef = collection(firestore, "testimonials");
    const unsubscribe = onSnapshot(testimonialsRef, (snapshot) => {
      const testimonialsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestimonials(testimonialsData);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTestimonial = async () => {
    try {
      const testimonialsRef = collection(firestore, "testimonials");
      const newTestimonialWithTitle = {
        ...newTestimonial,
        titleForImage: newTestimonial.titleForImage,
      };
      const newDoc = await addDoc(testimonialsRef, newTestimonialWithTitle);
      setTestimonials([
        ...testimonials,
        { id: newDoc.id, ...newTestimonialWithTitle },
      ]);
      setNewTestimonial({
        name: "",
        review: "",
        titleForImage: "",
      });
    } catch (error) {
      console.error("Error adding new testimonial:", error);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    try {
      const testimonialRef = doc(firestore, "testimonials", id);
      await deleteDoc(testimonialRef);
      setTestimonials(
        testimonials.filter((testimonial) => testimonial.id !== id)
      );
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTestimonial();
        }}
        className="bg-neutral-700 p-6 rounded-md space-y-6"
      >
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Add Testimonial
        </h3>
        <div>
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newTestimonial.name}
            onChange={(e) =>
              setNewTestimonial({ ...newTestimonial, name: e.target.value })
            }
            required
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
          />
        </div>
        <div>
          <label htmlFor="review" className="block mb-2">
            Review:
          </label>
          <textarea
            id="review"
            name="review"
            value={newTestimonial.review}
            onChange={(e) =>
              setNewTestimonial({ ...newTestimonial, review: e.target.value })
            }
            required
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
          />
        </div>
        <div>
          <label htmlFor="title" className="block mb-2">
            Title:
          </label>
          <input
            type="text"
            id="titleForImage"
            name="titleForImage"
            value={newTestimonial.titleForImage}
            onChange={(e) =>
              setNewTestimonial({ ...newTestimonial, titleForImage: e.target.value })
            }
            required
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
          />
        </div>
        <button
          type="submit"
          className={`w-full p-3 rounded-md text-neutral-800 ${styles.mcBackColor} ${styles.backHov}`}
        >
          Add Testimonial
        </button>
      </form>
      <h3 className="text-2xl font-semibold my-8 text-center">Testimonials</h3>
      <ul className="space-y-4">
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.id}
            className="bg-neutral-700 p-4 rounded-md flex justify-between items-center"
          >
            <span>
              {testimonial.name} - {testimonial.review} - {testimonial.title}
            </span>
            <button
              type="button"
              className="bg-red-600 hover:bg-red-500 ml-1 p-2 rounded-md text-neutral-100"
              onClick={() => handleDeleteTestimonial(testimonial.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TestimonialHandler;
