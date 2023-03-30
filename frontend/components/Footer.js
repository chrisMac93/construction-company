import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "../styles/Home.module.css";

const Footer = () => {
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
                src="/gallery/Logo/MC&C_Logo.png" // Replace with your logo path
                alt="Logo"
                width={250}
                height={167}
              />
            </Link>
            {/* Other Links */}
            <div className="mt-4 font-bold text-lg sm:mt-0 sm:ml-6 flex flex-col">
              <Link href="/" className="opacity-60 hover:opacity-80">Home</Link>
              <Link href="/terms" className="opacity-60 hover:opacity-80">Terms & Conditions</Link>
              <Link href="/privacy" className="opacity-60 hover:opacity-80">Privacy Policy</Link>
              <Link href="/careers" className="opacity-60 hover:opacity-80">Careers</Link>
              <Link href="/quote" className={`${styles.mcColor} ${styles.hov}`}>Get a Quote</Link>
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
              >
                <FaFacebook className="mx-auto h-full w-4" />
              </Link>

              <Link
                className="m-1 h-9 w-9 rounded-full border-2 opacity-60 hover:opacity-80"
                href="https://www.twitter.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter className="mx-auto h-full w-4" />
              </Link>

              <Link
                className="m-1 h-9 w-9 rounded-full border-2 opacity-60 hover:opacity-80"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="mx-auto h-full w-4" />
              </Link>

              <Link
                className="m-1 h-9 w-9 rounded-full border-2 opacity-60 hover:opacity-80"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="mx-auto h-full w-4" />
              </Link>
            </div>
            <div className="text-sm opacity-60">
              <p className="font-bold">Email</p>
              <p>martinconstruction0911@gmail.com</p>
              <p className="font-bold">Phone</p>
              <p>(812) 204-2757</p>
              <p className="font-bold">Hours of Operation</p>
              <p>Monday-Friday 6AM - 6PM, Saturday and Sunday 6AM - 12PM</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" my-2 text-lg text-neutral-200">
        © 2023 Copyright:
        <Link href="/"> Martin Construction & Coatings</Link>
      </div>
    </footer>
  );
};

export default Footer;
