import React, { useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import Home from "./index";

function MyApp({ Component, pageProps }) {
  const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);
  const galleryRef = useRef(null);
  const testimonialsRef = useRef(null);
  const quoteRef = useRef(null);
  const whyChooseUsRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Martin Construction & Coatings</title>
        {/* Add any other common meta tags, styles, or scripts here */}
      </Head>
      <div className="flex flex-col min-h-screen">
        <Navbar
          scrollToRef={scrollToRef}
          aboutUsRef={aboutUsRef}
          servicesRef={servicesRef}
          whyChooseUsRef={whyChooseUsRef}
          galleryRef={galleryRef}
          testimonialsRef={testimonialsRef}
          quoteRef={quoteRef}
        />
        <main className="flex-grow bg-neutral-900 text-neutral-100">
          {Component === Home ? (
            <Home
              aboutUsRef={aboutUsRef}
              servicesRef={servicesRef}
              whyChooseUsRef={whyChooseUsRef}
              galleryRef={galleryRef}
              testimonialsRef={testimonialsRef}
              quoteRef={quoteRef}
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
