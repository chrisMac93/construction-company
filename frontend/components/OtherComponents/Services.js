import { useState, useEffect } from "react";
import Image from "next/image";
import { InView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../lib/firebase";

SwiperCore.use([Autoplay]);

const Services = () => {
  const [servicesList, setServicesList] = useState([]);

  const fetchServicesWithImages = async () => {
    const servicesSnap = await getDocs(collection(firestore, "services"));
    const servicesData = servicesSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const imagesSnap = await getDocs(collection(firestore, "images"));
    const imagesData = imagesSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const matchedServices = servicesData.map((service) => {
      const matchedImage = imagesData.find(
        (image) => image.title === service.title
      );
      return { ...service, image: matchedImage ? matchedImage.url : "" };
    });

    return matchedServices;
  };

  useEffect(() => {
    const fetchAndSetServices = async () => {
      const fetchedServices = await fetchServicesWithImages();
      setServicesList(fetchedServices);
    };

    fetchAndSetServices();
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-slate-300 via-neutral-800 to-neutral-900 pt-24 py-12">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 mx-auto">
        <h2 className="text-3xl md:text-4xl text-neutral-200 font-semibold mb-8 text-center">
          Our Services
        </h2>
        <Swiper
          spaceBetween={30}
          loop={false}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="text-neutral-100"
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              slidesPerGroup: 1,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 1,
            },
          }}
          // pagination={{
          //   clickable: true,
          // }}
        >
          {servicesList.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center max-w-md mx-auto">
                <div className="relative w-full h-48 overflow-hidden rounded-md mb-4 transition-transform duration-300 ease-in-out transform hover:scale-110">
                  <InView as="div" triggerOnce>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                  </InView>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p>{service.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Services;
