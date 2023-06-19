import { useState, useEffect } from "react";
import Image from "next/legacy/image";
import { InView } from "react-intersection-observer";
import Link from "next/link";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";


import { firestore } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../lib/firebase";


import "swiper/css";
import "swiper/css/pagination";
import "react-responsive-carousel/lib/styles/carousel.min.css";

SwiperCore.use([Pagination, Autoplay]);

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imageCollection = collection(firestore, "images");
      const imageSnapshot = await getDocs(imageCollection);
      const filteredImageUrls = imageSnapshot.docs
        .filter((doc) => doc.data().imageType.includes("Gallery"))
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
        Check out some of our recent projects below. We have worked on a wide
        variety of projects, from Whole Home Renovations to Epoxy Flooring.
        We are proud of the work we do, and we are confident you will be happy with
        the results.
        
      </p>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{
          type: "bullets",
          clickable: true,
          el: ".swiperPagination",
          bulletClass: "swiperPaginationBullet",
          bulletActiveClass: "swiperPaginationBulletActive",
          renderBullet: (index, className) => {
            return `<span class="${className}" style="background-color: ${
              className.includes("swiperPaginationBulletActive")
                ? "#B6B024"
                : "rgba(255, 255, 255, 0.5)"
            }; width: 10px; height: 10px; margin: 5px;"></span>`;
          },
        }}
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
            <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110 ">
              <InView as="div" triggerOnce>
                <Image
                  src={image}
                  alt="Gallery Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </InView>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiperPagination"></div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center mt-24">
          <Link
            href="/quote"
            className="px-8 py-3 text-lg sm:text-xl font-bold text-neutral-900 rounded hover:bg-neutral-200 transition duration-300"
            style={{ backgroundColor: "#B6B024" }}
          >
            <span onClick={() => logEvent(analytics, "quote_button_click")}>
              Get a Quote
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
