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

const ServicesHandler = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const servicesRef = collection(firestore, "services");
    const unsubscribe = onSnapshot(servicesRef, (snapshot) => {
      const serviceData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(serviceData);
    });

    return () => unsubscribe();
  }, []);

  // const handleAddService = async () => {
  //   try {
  //     const servicesRef = collection(firestore, "services");
  //     const newDoc = await addDoc(servicesRef, newService);
  //     setServices([...services, { id: newDoc.id, ...newService }]);
  //     setNewService({
  //       title: "",
  //       description: "",
  //     });
  //   } catch (error) {
  //     console.error("Error adding new service:", error);
  //   }
  // };

  const handleAddService = async () => {
    try {
      const servicesRef = collection(firestore, "services");
      const newServiceWithTitle = {
        ...newService,
        title: newService.title,
      };
      const newDoc = await addDoc(servicesRef, newServiceWithTitle);
      setServices([...services, { id: newDoc.id, ...newServiceWithTitle }]);
      setNewService({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding new service:", error);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const serviceRef = doc(firestore, "services", id);
      await deleteDoc(serviceRef);
      setServices(services.filter((service) => service.id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddService();
        }}
        className="bg-neutral-700 p-6 rounded-md space-y-6"
      >
        <h3 className="text-2xl font-semibold mb-4 text-center">Add Services</h3>
        <div>
          <label htmlFor="title" className="block mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newService.title}
            onChange={(e) =>
              setNewService({ ...newService, title: e.target.value })
            }
            required
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
            required
            className="w-full p-3 bg-neutral-600 rounded-md text-neutral-100"
          />
        </div>
        <button
          type="submit"
          className={`w-full p-3 rounded-md text-neutral-800 ${styles.mcBackColor} ${styles.backHov}`}
        >
          Add Service
        </button>
      </form>
      <h3 className="text-2xl font-semibold my-8 text-center">Services</h3>
      <ul className="space-y-4">
        {services.map((service) => (
          <li
            key={service.id}
            className="bg-neutral-700 p-4 rounded-md flex justify-between items-center"
          >
            <span>
              {service.title} - {service.description} -{" "}
            </span>
            <button
              type="button"
              className="bg-red-600 hover:bg-red-500 ml-1 p-2 rounded-md text-neutral-100"
              onClick={() => handleDeleteService(service.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ServicesHandler;
