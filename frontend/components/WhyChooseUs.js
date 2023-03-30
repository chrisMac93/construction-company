import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-24">
      <div
        className="absolute inset-0 h-full w-full py-20"
        style={{
          backgroundImage: "url('/gallery/image1.jpg')",
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
            <p className="mb-6 text-lg leading-relaxed text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              semper nulla nisi, non faucibus elit congue nec. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Nullam semper nulla nisi,
              non faucibus elit congue nec. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Nullam semper nulla nisi, non
              faucibus elit congue nec.
            </p>
            <p className="text-lg leading-relaxed text-center">
              Duis et justo odio. Fusce nec mattis dui, ac faucibus tellus.
              Integer vel ullamcorper nisi. Aliquam consequat risus ante, a
              tincidunt ante porttitor eget. Duis et justo odio. Fusce nec
              mattis dui, ac faucibus tellus. Integer vel ullamcorper nisi.
              Aliquam consequat risus ante, a tincidunt ante porttitor eget.
              Duis et justo odio. Fusce nec mattis dui, ac faucibus tellus.
              Integer vel ullamcorper nisi. Aliquam consequat risus ante, a
              tincidunt ante porttitor eget.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              semper nulla nisi, non faucibus elit congue nec. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Nullam semper nulla nisi,
              non faucibus elit congue nec. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Nullam semper nulla nisi, non
              faucibus elit congue nec.
            </p>
            <p className="text-lg leading-relaxed text-center">
              Duis et justo odio. Fusce nec mattis dui, ac faucibus tellus.
              Integer vel ullamcorper nisi. Aliquam consequat risus ante, a
              tincidunt ante porttitor eget. Duis et justo odio. Fusce nec
              mattis dui, ac faucibus tellus. Integer vel ullamcorper nisi.
              Aliquam consequat risus ante, a tincidunt ante porttitor eget.
              Duis et justo odio. Fusce nec mattis dui, ac faucibus tellus.
              Integer vel ullamcorper nisi. Aliquam consequat risus ante, a
              tincidunt ante porttitor eget.
            </p>
            <div className="flex justify-center mt-8">
            <button
              onClick={() => scrollToRef(quoteRef)}
              className="px-8 py-3 text-lg sm:text-xl font-bold text-neutral-900 rounded hover:bg-neutral-200 transition duration-300"
              style={{ backgroundColor: "#B6B024" }}
            >
              Get a Quote
            </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
