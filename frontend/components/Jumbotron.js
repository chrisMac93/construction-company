import Link from "next/link";
import React from "react";

const Jumbotron = ({scrollToRef, quoteRef}) => {
  return (
    <div
      className="relative mt-16 w-full minus-navbar parallax"
      style={{ backgroundImage: 'url("/gallery/image2.jpg")' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col items-center text-center justify-center space-y-4 px-6 text-white">
        <h1 className="text-4xl sm:text-5xl font-bold ">
          Martin Construction & Coatings
        </h1>
        <p className="text-lg sm:text-xl text-slate-300">
          Where Quality Meets Affordability
        </p>
        <Link
          href="/quote"
          className="px-8 py-3 text-lg sm:text-xl font-bold text-neutral-900 rounded hover:bg-neutral-200 transition duration-300"
          style={{ backgroundColor: "#B6B024"}}
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
};

export default Jumbotron;
