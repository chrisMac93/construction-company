import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import useImages from "../../hooks/useImages";

SwiperCore.use([Autoplay]);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const images = useImages();

  useEffect(() => {
    const fetchData = async () => {
      const testimonialsRef = collection(firestore, "testimonials");
      const testimonialSnapshot = await getDocs(testimonialsRef);

      const testimonialData = testimonialSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          review: data.review,
          titleForImage: data.titleForImage,
        };
      });

      const combinedData = testimonialData.map((testimonial) => {
        return {
          ...testimonial,
          image: images[testimonial.titleForImage],
        };
      });

      setTestimonials(combinedData);
    };

    if (Object.keys(images).length > 0) {
      fetchData();
    }
  }, [images]);

  return (
    <section className="bg-gradient-to-b from-neutral-900 via-neutral-800 to-slate-300 w-full mx-auto pt-28">
      <h1 className="text-center text-3xl font-bold mb-5 text-neutral-200">
        Testimonials
      </h1>
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
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center justify-center max-w-md mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="md:w-24 md:h-24 w-28 h-28 border-2 rounded-full border-neutral-300 overflow-hidden mb-4">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name}'s avatar`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-bold mb-4 md:text-neutral-300">
                  {testimonial.name}
                </h3>
                <p className="px-4 text-lg font-semibold text-neutral-800">
                  "{testimonial.review}"
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
