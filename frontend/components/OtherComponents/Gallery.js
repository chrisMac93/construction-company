import { useState, useEffect } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { firestore } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-responsive-carousel/lib/styles/carousel.min.css";

SwiperCore.use([Navigation, Autoplay]);

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imageCollection = collection(firestore, "images");
      const imageSnapshot = await getDocs(imageCollection);
      const filteredImageUrls = imageSnapshot.docs
        .filter((doc) => !doc.data().title.endsWith("#"))
        .map((doc) => doc.data().url);

      setImages(filteredImageUrls);
    };

    fetchImages();
  }, []);
  return (
    <section className="bg-gradient-to-b from-slate-300 via-neutral-800 to-neutral-900 w-full mx-auto px-6 pt-28 pb-24">
      <h2 className="text-center text-3xl font-bold text-neutral-800 mb-8">
        Our Work
      </h2>
      <p className="mb-6 text-md leading-relaxed text-center text-neutral-800 font-semibold text-xl">
        Check out some of our recent projects below. We've worked on a wide
        variety of projects, from Whole Home Renovations to Epoxy Flooring.
        We're proud of the work we do, and we're confident you'll be happy with
        the results.
      </p>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={false}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="w-full">
            <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110">
              <Image
                src={image}
                alt="Gallery Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center mt-24">
          <Link
            href="/quote"
            className="px-8 py-3 text-lg sm:text-xl font-bold text-neutral-900 rounded hover:bg-neutral-200 transition duration-300"
            style={{ backgroundColor: "#B6B024" }}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
