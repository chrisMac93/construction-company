import React, { useRef, useEffect } from "react";
import { initializeAnalytics } from "../lib/firebase";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/globals.css";
import Navbar from "../components/OtherComponents/Navbar";
import Footer from "../components/OtherComponents/Footer";
import Head from "next/head";
import Home from "./index";

function MyApp({ Component, pageProps }) {
  const whoWeAreRef = useRef(null);
  const servicesRef = useRef(null);
  const galleryRef = useRef(null);
  const testimonialsRef = useRef(null);
  const whyChooseUsRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    try {
      initializeAnalytics();
    } catch (error) {
      console.error("An error occurred while initializing analytics.", error);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Construction Company</title>
        {/* Add any other common meta tags, styles, or scripts here */}
      </Head>
      <div className="flex flex-col min-h-screen">
        <Navbar
          navigateAndScroll={scrollToRef}
          whoWeAreRef={whoWeAreRef}
          servicesRef={servicesRef}
          whyChooseUsRef={whyChooseUsRef}
          galleryRef={galleryRef}
          testimonialsRef={testimonialsRef}
        />
        <main className="flex-grow bg-neutral-900 text-neutral-100">
          {Component === Home ? (
            <Home
              whoWeAreRef={whoWeAreRef}
              servicesRef={servicesRef}
              whyChooseUsRef={whyChooseUsRef}
              galleryRef={galleryRef}
              testimonialsRef={testimonialsRef}
              scrollToRef={scrollToRef}
            />
          ) : (
            <Component {...pageProps} />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
