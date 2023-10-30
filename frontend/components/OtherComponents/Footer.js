import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { FaFacebook, FaInstagram, FaSnapchatGhost } from "react-icons/fa";
import styles from "../../styles/Home.module.css";
import useImages from "../../hooks/useImages";

import { logEvent } from "firebase/analytics";
import { initializeAnalytics } from "../../lib/firebase";

const Footer = () => {
  const images = useImages();
  const logoImage = images["logo"];

  const analytics = initializeAnalytics();

  // const isMobile = () => {
  //   return (
  //     typeof window !== "undefined" &&
  //     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //       window.navigator.userAgent
  //     )
  //   );
  // };

  // const handleSocialLinkClick = (e, link) => {
  //   if (isMobile()) {
  //     e.preventDefault();
  //     window.open(link, "_blank");
  //   }
  // };

  const handleSocialLinkClick = (e, platform) => {
    e.preventDefault();
    const isAndroid = /Android/i.test(window.navigator.userAgent);
    const isiOS = /iPhone|iPad|iPod/i.test(window.navigator.userAgent);

    // Define the URLs and page IDs for each platform
    const fbLink = "https://www.facebook.com/MCandC0911";
    const fbPageId = "MCandC0911"; // Replace with the numeric page ID if needed
    const igLink = "https://www.instagram.com/martinconstruction_coatings/";
    const igUsername = "martinconstruction_coatings";
    const scUsername = "#"; // Replace with the actual Snapchat username

    if (platform === "facebook") {
      if (isAndroid) {
        window.open(`fb://facewebmodal/f?href=${fbLink}`, "_blank");
      } else if (isiOS) {
        window.open(`fb://page/${fbPageId}`, "_blank");
      } else {
        window.open(fbLink, "_blank");
      }
    } else if (platform === "instagram") {
      if (isAndroid || isiOS) {
        window.open(`instagram://user?username=${igUsername}`, "_blank");
      } else {
        window.open(igLink, "_blank");
      }
    } else if (platform === "snapchat") {
      if (isAndroid || isiOS) {
        window.open(`snapchat://add/${scUsername}`, "_blank");
      } else {
        // There isn't a direct web link for adding a user on Snapchat, you might need to link to the profile or a Snapchat landing page
        window.open(`https://www.snapchat.com/add/${scUsername}`, "_blank");
      }
    }
  };

  return (
    <footer className="bg-gradient-to-r from-slate-300 via-neutral-800 to-neutral-900 text-center text-white ">
      <div className="px-6 pt-6 max-w-5xl mx-auto">
        <div className="mb-6 flex justify-between w-full items-center flex-col sm:flex-row">
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center">
            {/* Logo */}
            <Link
              href="/"
              className="disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
            >
              <Image
                src={logoImage || "/Images/site/MC&C_Logo.PNG"}
                alt="Logo"
                width={250}
                height={167}
              />
            </Link>
            {/* Other Links */}
            <div className="mt-4 font-bold text-lg sm:mt-0 sm:ml-6 flex flex-col">
              <Link href="/" className="opacity-60 hover:opacity-80">
                Home
              </Link>
              <Link href="/terms" className="opacity-60 hover:opacity-80">
                Terms & Conditions
              </Link>
              <Link href="/careers" className="opacity-60 hover:opacity-80">
                Careers
              </Link>
              <Link href="/aboutUs" className="opacity-60 hover:opacity-80">
                About Us
              </Link>
              <Link href="/quote" className={`${styles.mcColor} ${styles.hov}`}>
                <span onClick={() => logEvent(analytics, "quote_button_click")}>
                  Get a Quote
                </span>
              </Link>
            </div>
          </div>
          {/* Social Links and Contact Info */}
          <div className="mt-6 sm:mt-0">
            <h1 className="text-2xl font-bold mb-4 opacity-60">Contact Us</h1>
            <div className="flex justify-center mb-4">
              <Link
                className="m-1 h-9 w-9 rounded-full border-2 opacity-60 hover:opacity-80"
                href="https://www.facebook.com/MCandC0911"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook - opens in new tab"
                onClick={(e) =>
                  handleSocialLinkClick(e, "facebook")
                }
              >
                <FaFacebook className="mx-auto h-full w-4" />
              </Link>

              <Link
                className="m-1 h-9 w-9 rounded-full border-2 opacity-60 hover:opacity-80"
                href="https://www.instagram.com/martinconstruction_coatings/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram - opens in new tab"
                onClick={(e) =>
                  handleSocialLinkClick(
                    e,
                    "instagram"
                  )
                }
              >
                <FaInstagram className="mx-auto h-full w-4" />
              </Link>

              <Link
                className="m-1 h-9 w-9 rounded-full border-2 opacity-60 hover:opacity-80"
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="Snapchat - opens in new tab"
                onClick={(e) => handleSocialLinkClick(e, "snapchat")}
              >
                <FaSnapchatGhost className="mx-auto h-full w-4" />
              </Link>
            </div>
            <div className="text-sm opacity-60">
              <p className="font-bold">Email</p>
              <p>
                <a href="mailto:martinconstruction0911@gmail.com">
                  martinconstruction0911@gmail.com
                </a>
              </p>
              <p className="font-bold">Phone</p>
              <p>
                <a href="tel:812-204-2757">812-204-2757</a>
              </p>
              <p className="font-bold">Hours of Operation</p>
              <p>
                Monday-Friday 6AM - 6PM
                <br /> Saturday 6AM - 12PM
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" my-2 text-lg text-neutral-200">
        © 2023 Copyright:
        <Link href="/"> Martin Construction &amp; Coatings</Link>
      </div>
    </footer>
  );
};

export default Footer;
