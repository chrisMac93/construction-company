import { useState, useEffect } from "react";

import styles from "../styles/Home.module.css";

const Services = () => {
  const [visibleServices, setVisibleServices] = useState(0);
  const [currentServices, setCurrentServices] = useState([]);
  const [fadeIn, setFadeIn] = useState(true);

  const servicesList = [
    {
      title: "Whole-Home Remodel",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/gallery/actual/whole-home.jpg",
    },
    {
      title: "Interior Remodel",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/gallery/actual/interior.jpg",
    },
    {
      title: "Exterior",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/gallery/actual/exterior.jpg",
    },
    {
      title: "Flooring",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/gallery/actual/flooring.jpg",
    },
    {
      title: "Deck Build",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/gallery/actual/deck.jpg",
    },
    {
      title: "Patio Build",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/gallery/image1.jpg",
    },
    {
      title: "Drywall",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/gallery/actual/interior.jpg",
    },
    {
      title: "Epoxy",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/gallery/actual/epoxy1.jpg",
    },
    {
      title: "Kitchen",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/gallery/actual/kitchen.jpg",
    },
    {
      title: "Bath",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/gallery/actual/bathroom.jpg",
    },
    {
      title: "Concrete Pour",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/gallery/actual/concrete.jpg",
    },
    {
      title: "Roofing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/gallery/actual/roofing.jpg",
    },
  ];

  useEffect(() => {
    setCurrentServices(
      servicesList.slice(visibleServices, visibleServices + 6)
    );
  }, [visibleServices]);

  const loadMoreServices = () => {
    setFadeIn(!fadeIn);
    setTimeout(() => {
      setVisibleServices((visibleServices + 6) % 12);
      setFadeIn(!fadeIn);
    }, 500);
  };
  return (
    <section className="relative bg-gradient-to-b from-slate-300 via-neutral-800 to-neutral-900 pt-36 py-12">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 mx-auto">
        <h2 className="text-3xl md:text-4xl text-neutral-200 font-semibold mb-8 text-center">
          Our Services
        </h2>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
            fadeIn ? "fade fade-in" : "fade"
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
            className={`mt-12 block mx-auto px-6 py-2 rounded-md text-neutral-800 ${styles.mcBackColor}`}
          >
            {visibleServices === 0 ? "Next" : "Previous"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
