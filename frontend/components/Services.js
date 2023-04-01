import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../lib/firebase";

import styles from "../styles/Home.module.css";

const Services = ({ scrollToRef, servicesRef }) => {
  const [visibleServices, setVisibleServices] = useState(0);
  const [currentServices, setCurrentServices] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  const [servicesList, setServicesList] = useState([]);

  const fetchServicesWithImages = async () => {
    const servicesSnap = await getDocs(collection(firestore, "services"));
    const servicesData = servicesSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const imagesSnap = await getDocs(collection(firestore, "images"));
    const imagesData = imagesSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const matchedServices = servicesData.map((service) => {
      const matchedImage = imagesData.find(
        (image) => image.title === service.title
      );
      return { ...service, image: matchedImage ? matchedImage.url : "" };
    });

    return matchedServices;
  };

  useEffect(() => {
    const fetchAndSetServices = async () => {
      const fetchedServices = await fetchServicesWithImages();
      setServicesList(fetchedServices);
    };

    fetchAndSetServices();
  }, []);

  useEffect(() => {
    setCurrentServices(
      servicesList.slice(visibleServices, visibleServices + 6)
    );
  }, [visibleServices, servicesList]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };
  
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
  
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const loadMoreServices = () => {
    setFadeIn(false);
    setTimeout(() => {
      setVisibleServices((visibleServices + 6) % 12);
      setFadeIn(true);
    }, 500);
  
    // Scroll to the top of the Services component on small screens
    if (isSmallScreen) {
      scrollToRef(servicesRef);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-300 via-neutral-800 to-neutral-900 pt-36 py-12">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 mx-auto">
        <h2 className="text-3xl md:text-4xl text-neutral-200 font-semibold mb-8 text-center">
          Our Services
        </h2>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
            fadeIn ? `${styles.fadeIn}` : `${styles.fadeOut}`
          }`}
        >
          {currentServices.map((service) => (
            <div key={service.title} className=" text-neutral-100 ">
              <div className="relative w-full h-48 overflow-hidden rounded-md mb-4 transition-transform duration-300 ease-in-out transform hover:scale-110">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="text-xl text-center font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-center">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="">
          <button
            onClick={loadMoreServices}
            className={`mt-12 block mx-auto px-6 py-2 rounded-md text-lg font-semibold text-neutral-800 ${styles.mcBackColor}`}
          >
            {visibleServices === 0 ? "More" : "Previous"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
