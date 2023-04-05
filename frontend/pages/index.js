import React from "react";
import WhoWeAre from "../components/WhoWeAre";
import Gallery from "../components/Gallery";
import Jumbotron from "../components/Jumbotron";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home({
  whoWeAreRef,
  servicesRef,
  whyChooseUsRef,
  galleryRef,
  testimonialsRef,
  scrollToRef
}) {
  return (
    <div>
      <main>
        <section>
          <Jumbotron />
        </section>
        <section ref={whoWeAreRef}>
          <WhoWeAre />
        </section>
        <section ref={servicesRef}>
          <Services scrollToRef={scrollToRef} servicesRef={servicesRef}/>
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
