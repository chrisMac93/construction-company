import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools, faThumbsUp, faTruck, faScroll } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";

import styles from "../styles/Home.module.css";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: faTools,
      title: "High-Quality Workmanship",
      description:
        "Our team of professionals is dedicated to providing high-quality construction and coatings services.",
    },
    {
      icon: faThumbsUp,
      title: "Customer Satisfaction",
      description:
        "We prioritize customer satisfaction and work closely with our clients to meet their unique requirements.",
    },
    {
      icon: faTruck,
      title: "Timely Delivery",
      description:
        "We understand the importance of delivering projects on time and strive to meet deadlines without compromising on quality.",
    },
    {
      icon: faScroll,
      title: "Get a Quote",
      description:
        "We believe customers should have a clear idea of the cost of a project before it is started. You can click the link below to get a free quote!",
    },
  ];

  const [bgImageUrl, setBgImageUrl] = useState("");

  useEffect(() => {
    const storage = getStorage(app);
    const imageRef = ref(storage, "why-choose-us/image1.jpg");
    getDownloadURL(imageRef).then(setBgImageUrl);
  }, []);

  return (
    <section className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-24">
      <div
        className="absolute inset-0 h-full w-full py-20"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      ></div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 items-center justify-items-center">
          <div className="bg-gradient-to-br from-slate-300 via-neutral-800 to-neutral-900 text-neutral-100 p-8 rounded-md z-10 opacity-90">
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
              Why Choose Martin Construction & Coatings
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <div className={`text-3xl ${styles.mcColor}`}>
                    <FontAwesomeIcon icon={reason.icon} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-base leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-8">
              <Link
                href={"/quote"}
                className="px-8 py-3 text-lg sm:text-xl font-bold text-neutral-900 rounded hover:bg-neutral-200 transition duration-300"
                style={{ backgroundColor: "#B6B024" }}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
