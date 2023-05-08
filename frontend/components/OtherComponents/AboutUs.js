import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import useImages from "../../hooks/useImages";

import styles from "../../styles/Home.module.css";

const AboutUs = () => {
  const images = useImages();
  const bgImageUrl = images["aboutUsT"];
  const bgImageUrl2 = images["aboutUsB"];
  const rightImageUrl = images["quote"];
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {/* Jumbotron with parallax image background */}
      <section
        className="relative bg-cover bg-center py-60 px-4 sm:px-8 md:px-16 lg:px-24 parallax"
        style={{
          backgroundImage: `url(${
            bgImageUrl || "/../../public/Images/site/epoxy2.jpg"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-neutral-800 bg-opacity-40 text-neutral-100 flex flex-col items-center justify-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            transition={{ duration: 1 }}
          >
            About Us
          </motion.h1>
        </div>
      </section>

      {/* Who We Are, What We Do */}
      <section className="bg-neutral-900 text-neutral-100 py-16 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-semibold lg:mt-6">Who We Are</h3>
              <p className="mt-4 text-lg leading-relaxed">
                Martin Construction &amp; Coatings is a family-owned business
                that has been providing high-quality construction and coating
                services for over 20 years. Our team of skilled professionals is
                dedicated to ensuring customer satisfaction and delivering
                exceptional results on every project.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-semibold">What We Do</h3>
              <p className="mt-4 text-lg leading-relaxed">
                We specialize in a wide range of construction and coating
                services, including residential and commercial projects. Our
                expertise includes new construction, remodeling, renovations,
                repairs, and various coating applications.
              </p>
            </div>
            <div>
              <Image
                src={rightImageUrl || "/../../public/Images/site/quote.jpg"}
                width={500}
                height={500}
                alt="A picture"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-neutral-900 text-neutral-100 py-16 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-semibold mb-8">Our Approach</h3>
          <p className="text-lg leading-relaxed">
            At Martin Construction &amp; Coatings, our approach is rooted in our
            commitment to quality and customer satisfaction. We understand the
            importance of listening to our clients needs and working closely
            with them throughout the entire process. Our experienced team is
            dedicated to delivering the highest level of craftsmanship, using
            the latest techniques and materials to ensure long-lasting results.
          </p>
          <p className="mt-6 text-xl font-semibold">Our approach includes:</p>
          <ul className="list-none mt-4 text-lg leading-relaxed">
            <li>
              Collaborating closely with clients to understand their needs and
              expectations
            </li>
            <li>Providing expert guidance and advice throughout the project</li>
            <li>
              Using high-quality materials and techniques to ensure durability
              and longevity
            </li>
            <li>
              Ensuring timely completion of projects while maintaining the
              highest standards of workmanship
            </li>
          </ul>
        </div>
      </section>

      {/* Our Vision & Our Mission */}
      <section className="bg-neutral-900 text-neutral-100 py-16 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <h3 className="text-3xl font-semibold">Our Vision</h3>
            <p className="mt-4 text-lg leading-relaxed">
              Our vision is to be a leading construction and coatings company,
              known for our commitment to quality, innovation, and customer
              satisfaction. We aim to build lasting relationships with our
              clients and partners, fostering a culture of collaboration and
              growth while remaining dedicated to the communities we serve.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-semibold">Our Mission</h3>
            <p className="mt-4 text-lg leading-relaxed">
              Our mission is to provide exceptional construction and coating
              services that exceed our clients expectations. We are committed to
              continuous improvement, utilizing the latest industry techniques
              and materials to deliver high-quality, sustainable results. Our
              team is dedicated to maintaining the highest standards of safety,
              integrity, and professionalism in every project we undertake.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="relative bg-cover bg-center py-20 px-4 sm:px-8 md:px-16 lg:px-24 parallax"
        style={{
          backgroundImage: `url(${
            bgImageUrl2 || "/../../public/Images/site/aboutBottom.jpg"
          })`,
        }}
      >
        <div className="bg-neutral-800 bg-opacity-70 text-neutral-100 py-20 px-4 sm:px-8 md:px-16 lg:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Interested in Working with Martin Construction &amp; Coatings?
          </h2>
          <p className="mt-4">
            Join our team of professionals and contribute to the success of our
            company. Click the button below to explore our career opportunities.
          </p>
          <div className="mt-8">
            <Link
              className={`text-neutral-800 font-semibold px-4 py-2 rounded-md ${styles.mcBackColor} ${styles.backHov}`}
              href="/careers"
            >
              View Careers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
