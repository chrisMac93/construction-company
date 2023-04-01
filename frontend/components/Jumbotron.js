import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import useImages from "../hooks/useImages";

const Jumbotron = () => {

  const images = useImages();
  const bgImageUrl = images["Flooring"]
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div
      className="relative mt-16 w-full minus-navbar parallax"
      style={{ backgroundImage: `url(${bgImageUrl || "../gallery/Gallery/Services/flooring.jpg"})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col items-center text-center justify-center space-y-4 px-6 text-white">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          transition={{ duration: 1 }}
        >
          Martin Construction & Coatings
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-slate-300"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Where Quality Meets Affordability
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link href="/quote">
            <span
              className="px-8 py-3 text-lg sm:text-xl font-bold text-neutral-900 rounded hover:bg-neutral-200 transition duration-300 cursor-pointer"
              style={{ backgroundColor: "#B6B024" }}
            >
              Get a Quote
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Jumbotron;
