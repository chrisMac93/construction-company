import { motion } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

const MobileMenu = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  scrollToRef,
  aboutUsRef,
  servicesRef,
  whyChooseUsRef,
  galleryRef,
  testimonialsRef,
  mobileMenuControls,
}) => {

  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileMenuControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      });
    }
  }, [isMobileMenuOpen, mobileMenuControls]);

  return (
    <motion.div
      className={`${
        isMobileMenuOpen ? "block" : "hidden"
      } absolute w-full bg-gradient-to-r from-slate-300 via-neutral-800 to-neutral-900 lg:hidden ${
        styles.dropdownMenu
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={mobileMenuControls}
    >
      {/* Place your mobile menu links/buttons here */}
      <ul className="list-style-none mr-auto flex flex-col pl-0 text-center lg:text-left lg:flex lg:flex-row lg:space-x-2 lg:items-center lg:mr-auto">
        <li className="p-2">
          <Link
            href="/"
            onClick={() => toggleMobileMenu()}
            className="p-0 text-white font-bold opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          >
            Home
          </Link>
        </li>
        <li className="p-2">
          <button
            onClick={() => {
              scrollToRef(aboutUsRef);
              toggleMobileMenu();
            }}
            className="p-0 text-white font-bold opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          >
            About Us
          </button>
        </li>
        <li className="p-2">
          <button
            onClick={() => {
              scrollToRef(servicesRef);
              toggleMobileMenu();
            }}
            className="p-0 text-white font-bold opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          >
            Services
          </button>
        </li>
        <li className="p-2">
          <button
            onClick={() => {
              scrollToRef(whyChooseUsRef);
              toggleMobileMenu();
            }}
            className="p-0 text-white font-bold opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          >
            Why Choose Us
          </button>
        </li>
        <li className="p-2">
          <button
            onClick={() => {
              scrollToRef(testimonialsRef);
              toggleMobileMenu();
            }}
            className="p-0 text-white font-bold opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          >
            Testimonials
          </button>
        </li>
        <li className="p-2">
          <button
            onClick={() => {
              scrollToRef(galleryRef);
              toggleMobileMenu();
            }}
            className="p-0 white font-bold opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          >
            Gallery
          </button>
        </li>
        <li className="p-2">
          <Link
            href="/quote"
            className="font-bold disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
            style={{ color: "#B6B024" }}
            onClick={() => toggleMobileMenu()}
          >
            Get a Quote
          </Link>
        </li>
      </ul>
      {/* Copy the list items from the Navbar.js to here */}
    </motion.div>
  );
};

export default MobileMenu;
