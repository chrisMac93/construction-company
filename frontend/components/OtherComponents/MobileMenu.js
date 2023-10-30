import { motion } from "framer-motion";
import { useEffect } from "react";

import { logEvent } from "firebase/analytics";
import { initializeAnalytics } from "../../lib/firebase";

import Link from "next/link";

import styles from "../../styles/Home.module.css";

const MobileMenu = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  handleNavigateAndScroll,
  whoWeAreRef,
  servicesRef,
  whyChooseUsRef,
  galleryRef,
  testimonialsRef,
  mobileMenuControls,
}) => {

  const analytics = initializeAnalytics();

  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileMenuControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
        display: "block",
      });
    } else {
      mobileMenuControls.start({
        opacity: 0,
        y: -20,
        transition: { duration: 0.3, ease: "easeIn" },
        transitionEnd: {
          display: "none",
        },
      });
    }
  }, [isMobileMenuOpen, mobileMenuControls]);

  return (
    <motion.div
      className={`${
        isMobileMenuOpen ? "block" : "hidden"
      } absolute w-full bg-gradient-to-r from-slate-300 via-neutral-800 to-neutral-900 lg:hidden ${
        styles.dropdownMenu
      } top-20`}
      initial={{ opacity: 0, y: -20, display: "none" }}
      animate={mobileMenuControls}
      exit={{
        opacity: 0,
        y: -20,
        transition: { duration: 0.3, ease: "easeIn" },
      }}
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
              handleNavigateAndScroll(whoWeAreRef);
              toggleMobileMenu();
            }}
            className="p-0 text-white font-bold opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          >
            Who We Are
          </button>
        </li>
        <li className="p-2">
          <button
            onClick={() => {
              handleNavigateAndScroll(servicesRef);
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
              handleNavigateAndScroll(whyChooseUsRef);
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
              handleNavigateAndScroll(testimonialsRef);
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
              handleNavigateAndScroll(galleryRef);
              toggleMobileMenu();
            }}
            className="p-0 white font-bold opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          >
            Gallery
          </button>
        </li>
        <li className="p-2">
          <Link
            href="/aboutUs"
            onClick={() => toggleMobileMenu()}
            className="p-0 text-white font-bold opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          >
            About Us
          </Link>
        </li>
        <li className="p-2">
          <Link
            href="/quote"
            className="font-bold disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
            style={{ color: "#B6B024" }}
            onClick={() => toggleMobileMenu()}
          >
            <span onClick={() => logEvent(analytics, "quote_button_click")}>
              Get a Quote
            </span>
          </Link>
        </li>
      </ul>
      {/* Copy the list items from the Navbar.js to here */}
    </motion.div>
  );
};

export default MobileMenu;
