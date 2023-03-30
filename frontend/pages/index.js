import React from "react";
import AboutUs from "../components/AboutUs";
import Gallery from "../components/Gallery";
import Jumbotron from "../components/Jumbotron";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home({
  aboutUsRef,
  servicesRef,
  whyChooseUsRef,
  galleryRef,
  testimonialsRef,
}) {
  return (
    <div>
      <main>
        <section>
          <Jumbotron />
        </section>
        <section ref={aboutUsRef}>
          <AboutUs />
        </section>
        <section ref={servicesRef}>
          <Services />
        </section>
        <section ref={whyChooseUsRef}>
          <WhyChooseUs />
        </section>
        <section ref={testimonialsRef}>
          <Testimonials />
        </section>
        <section ref={galleryRef}>
          <Gallery />
        </section>
      </main>
    </div>
  );
}
