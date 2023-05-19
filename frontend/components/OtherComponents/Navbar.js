import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAnimation } from "framer-motion";
import useImages from "../../hooks/useImages";

import { logEvent } from "firebase/analytics";
import { analytics } from "../../lib/firebase";


import styles from "../../styles/Home.module.css";

const Navbar = ({
  navigateAndScroll,
  whoWeAreRef,
  servicesRef,
  whyChooseUsRef,
  galleryRef,
  testimonialsRef,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const controls = useAnimation();

  const router = useRouter();

  const images = useImages();
  const logoImage = images["logo"];

  const handleNavigateAndScroll = async (ref) => {
    if (router.pathname !== "/") {
      await router.push("/");
    }
    navigateAndScroll(ref);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed z-20 top-0 flex w-full flex-wrap items-center justify-between bg-gradient-to-r from-slate-300 via-neutral-800 to-neutral-900 py-3 text-neutral-200 shadow-lg lg:flex-wrap lg:justify-start">
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        handleNavigateAndScroll={handleNavigateAndScroll}
        whoWeAreRef={whoWeAreRef}
        servicesRef={servicesRef}
        whyChooseUsRef={whyChooseUsRef}
        galleryRef={galleryRef}
        testimonialsRef={testimonialsRef}
        mobileMenuControls={controls}
        toggleMobileMenu={toggleMobileMenu}
      />
      <div className="flex w-full flex-wrap items-center justify-between px-6">
        <div className="flex items-center">
          <Link
            href="/"
            className="disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          >
            <Image
              src={logoImage || "/Images/site/MC&C_Logo.PNG"}
              width={100}
              height={100}
              alt="Martin Construction &amp; Coatings Logo"
            />
          </Link>
        </div>
        <div className="block flex-grow items-center relative mt-0">
          <button
            className="block border-0 bg-transparent py-2 px-2.5 text-neutral-200 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 lg:hidden ml-auto"
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <span className="[&>svg]:w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          <ul
            className={`list-style-none mr-auto flex flex-col pl-0 text-center lg:text-left lg:flex lg:flex-row lg:space-x-2 lg:items-center lg:mr-auto ${
              isMobileMenuOpen ? "hidden" : ""
            } hidden lg:flex`}
          >
            <li className="p-2">
              <Link
                href="/"
                className="p-0 text-white font-bold opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
              >
                Home
              </Link>
            </li>
            <li className="p-2">
              <button
                onClick={() => {
                  handleNavigateAndScroll(whoWeAreRef);
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
                }}
                className="p-0 white font-bold opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
              >
                Gallery
              </button>
            </li>
            <li className="p-2">
              <Link
                href="/aboutUs"
                className="p-0 white font-bold opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
              >
                About Us
              </Link>
            </li>
            <li className="p-2">
              <Link
                href="/quote"
                className={`font-bold disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400 ${styles.mcColor} ${styles.hov}`}
              >
                <span onClick={() => logEvent(analytics, "quote_button_click")}>
                  Get a Quote
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
