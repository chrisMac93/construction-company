import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import useImages from "../../hooks/useImages";

import styles from "../../styles/Home.module.css";

const AboutUs = () => {
  const [teamMembers, setTeamMembers] = useState({
    CEO: {},
    foremen: [],
    workers: [],
  });

  const images = useImages();
  const bgImageUrl = images["Two"];
  const bgImageUrl2 = images["Four"];
  const rightImageUrl = images["Three"];
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const fetchTeamMembersWithImages = async () => {
    const teamSnap = await getDocs(collection(firestore, "team"));
    const teamData = teamSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const imagesSnap = await getDocs(collection(firestore, "images"));
    const imagesData = imagesSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const matchedTeam = {
      CEO: {},
      foremen: [],
      workers: [],
    };

    teamData.forEach((member) => {
      const matchedImage = imagesData.find(
        (image) => image.title === member.title
      );
      const memberWithImage = {
        ...member,
        image: matchedImage ? matchedImage.url : "",
      };

      if (member.role === "CEO") {
        matchedTeam.CEO = memberWithImage;
      } else if (member.role === "foreman") {
        matchedTeam.foremen.push(memberWithImage);
      } else if (member.role === "worker") {
        matchedTeam.workers.push(memberWithImage);
      }
    });

    return matchedTeam;
  };

  useEffect(() => {
    const fetchAndSetTeamMembers = async () => {
      const fetchedTeamMembers = await fetchTeamMembersWithImages();
      setTeamMembers(fetchedTeamMembers);
    };

    fetchAndSetTeamMembers();
  }, []);

  return (
    <div>
      {/* Jumbotron with parallax image background */}
      <section
        className="relative bg-cover bg-center py-60 px-4 sm:px-8 md:px-16 lg:px-24 parallax"
        style={{
          backgroundImage: `url(${
            bgImageUrl || "../gallery/Gallery/park.jpg"
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
      <section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-slate-300 text-neutral-100 py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold lg:mt-6">Who We Are</h3>
              <p className="mt-4">
                Martin Construction &amp; Coatings is a family-owned business that
                has been providing high-quality construction and coating
                services for over 20 years. Our team of skilled professionals is
                dedicated to ensuring customer satisfaction and delivering
                exceptional results on every project.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">What We Do</h3>
              <p className="mt-4">
                We specialize in a wide range of construction and coating
                services, including residential and commercial projects. Our
                expertise includes new construction, remodeling, renovations,
                repairs, and various coating applications.
              </p>
            </div>
            <div>
              <Image
                src={rightImageUrl || "/gallery/Gallery/estimate.jpg"}
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
      <section className="bg-gradient-to-bl from-slate-300 via-neutral-800 to-neutral-900 text-neutral-100 py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold mb-8">Our Approach</h3>
          <p>
            At Martin Construction &amp; Coatings, our approach is rooted in our
            commitment to quality and customer satisfaction. We understand the
            importance of listening to our clients needs and working closely
            with them throughout the entire process. Our experienced team is
            dedicated to delivering the highest level of craftsmanship, using
            the latest techniques and materials to ensure long-lasting results.
          </p>
          <p className="mt-6 ">Our approach includes:</p>
          <ul className=" list-none mt-4 ">
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
      <section className="bg-gradient-to-bl from-neutral-900 via-neutral-800 to-slate-300 text-neutral-100 py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Our Vision</h3>
            <p className="mt-4">
              Our vision is to be a leading construction and coatings company,
              known for our commitment to quality, innovation, and customer
              satisfaction. We aim to build lasting relationships with our
              clients and partners, fostering a culture of collaboration and
              growth while remaining dedicated to the communities we serve.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Our Mission</h3>
            <p className="mt-4">
              Our mission is to provide exceptional construction and coating
              services that exceed our clients expectations. We are committed
              to continuous improvement, utilizing the latest industry
              techniques and materials to deliver high-quality, sustainable
              results. Our team is dedicated to maintaining the highest
              standards of safety, integrity, and professionalism in every
              project we undertake.
            </p>
          </div>
        </div>
      </section>
      {/* Meet the Team */}
      <section className="bg-gradient-to-tl from-neutral-900 via-neutral-800 to-slate-300 text-neutral-100 py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold mb-8 text-center">
            Meet the Team
          </h1>
          {/* CEO */}
          <div className="text-center mb-3">
            <p className={`mt-2 text-xl font-bold ${styles.mcColor}`}>CEO</p>
            <p className="text-neutral-400 text-lg">
              {teamMembers.CEO.description}
            </p>
          </div>
          <div className="mb-8 flex flex-col items-center">
            <Image
              src={teamMembers.CEO.image || "/gallery/Gallery/mattyPoo.jpg"}
              alt={teamMembers.CEO.name || "CEO"}
              width={200}
              height={200}
              className="rounded-md object-cover w-60 h-60"
            />
            <h4 className="font-semibold mt-2 text-xl">
              {teamMembers.CEO.name}
            </h4>
          </div>
          {/* Foreman */}
          <div className="mb-8 flex flex-col items-center">
            <h4 className={`text-2xl font-semibold mb-4 ${styles.mcColor}`}>
              Foreman
            </h4>
            <div className="flex space-x-6">
              {teamMembers.foremen.map((foreman, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={
                      foreman.image ||
                      "/gallery/Gallery/reviewPhotos/foreman.jpg"
                    }
                    alt={foreman.name || "Foreman"}
                    width={200}
                    height={200}
                    className="rounded-md object-cover w-48 h-48"
                  />
                  <p className="mt-2 ">{foreman.name}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Workers */}
          <div className="mb-8 flex flex-col items-center">
            <h4 className={`text-2xl font-semibold mb-4 ${styles.mcColor}`}>
              Workers
            </h4>
            <div className="flex flex-row gap-4 justify-items-center">
              {teamMembers.workers.map((worker, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={
                      worker.image ||
                      "/gallery/Gallery/reviewPhotos/JohnDoe.jpg"
                    }
                    alt={worker.name || "Worker"}
                    width={150}
                    height={150}
                    className="rounded-md object-cover w-36 h-36"
                  />
                  <p className="mt-2 text-xl">{worker.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section
        className="relative bg-cover bg-center py-20 px-4 sm:px-8 md:px-16 lg:px-24 parallax"
        style={{
          backgroundImage: `url(${
            bgImageUrl2 || "../gallery/Gallery/park.jpg"
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
