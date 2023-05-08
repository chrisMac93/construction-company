import React from "react";
import WhoWeAre from "../components/OtherComponents/WhoWeAre";
import Gallery from "../components/OtherComponents/Gallery";
import Jumbotron from "../components/OtherComponents/Jumbotron";
import Services from "../components/OtherComponents/Services";
import Testimonials from "../components/OtherComponents/Testimonials";
import WhyChooseUs from "../components/OtherComponents/WhyChooseUs";

export default function Home({
  whoWeAreRef,
  servicesRef,
  whyChooseUsRef,
  galleryRef,
  testimonialsRef,
  scrollToRef
}) {
  return (
    <div className="overflow-x-hidden">
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
