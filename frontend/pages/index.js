import React from "react";
import WhoWeAre from "../components/OtherComponents/WhoWeAre";
import Gallery from "../components/OtherComponents/Gallery";
import Jumbotron from "../components/OtherComponents/Jumbotron";
import Services from "../components/OtherComponents/Services";
import Testimonials from "../components/OtherComponents/Testimonials";
import WhyChooseUs from "../components/OtherComponents/WhyChooseUs";
import { NextSeo } from "next-seo"; // Add this import

export default function Home({
  whoWeAreRef,
  servicesRef,
  whyChooseUsRef,
  galleryRef,
  testimonialsRef,
  scrollToRef,
}) {
  return (
    <div className="overflow-x-hidden">
      <NextSeo
        title="Martin Construction & Coatings"
        description="Martin Construction & Coatings offers a wide range of residential renovation services including interior/exterior remodel, kitchen and bathroom remodel/additions, deck/patio build or renovations, flooring, epoxy, coatings, concrete and more."
        openGraph={{
          title: "Martin Construction & Coatings",
          description:
            "Martin Construction & Coatings offers a wide range of residential renovation services including interior/exterior remodel, kitchen and bathroom remodel/additions, deck/patio build or renovations, flooring, epoxy, coatings, concrete and more.",
          images: [
            {
              url: "https://firebasestorage.googleapis.com/v0/b/martinconstructioncoatings.appspot.com/o/images%2Fhome.jpg?alt=media&token=233fc243-1c41-471e-8d65-75199e6cd037", // Replace with your OpenGraph image
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
          ],
        }}
      />
      <main>
        <section>
          <Jumbotron />
        </section>
        <section ref={whoWeAreRef}>
          <WhoWeAre />
        </section>
        <section ref={servicesRef}>
          <Services scrollToRef={scrollToRef} servicesRef={servicesRef} />
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
