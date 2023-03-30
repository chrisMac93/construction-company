import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Pagination, Autoplay]);

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      position: "CEO, XYZ Company",
      testimonial:
        "Martin Construction & Coatings did an excellent job on our project. Their attention to detail and professional approach were impressive. We highly recommend them!",
      image: "/gallery/reviewPhotos/JohnDoe.jpg",
    },
    {
      name: "Jane Smith",
      position: "Homeowner",
      testimonial:
        "The team at Martin Construction & Coatings transformed our home with a beautiful new paint job. They were prompt, professional, and a pleasure to work with.",
      image: "/gallery/reviewPhotos/JaneSmith.jpg",
    },
    {
      name: "Michael Johnson",
      position: "Property Manager",
      testimonial:
        "We've been working with Martin Construction & Coatings for years, and they consistently deliver high-quality work. Their team is reliable and always goes the extra mile.",
      image: "/gallery/reviewPhotos/MichaelJohnson.jpg",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-neutral-900 via-neutral-800 to-slate-300 w-full mx-auto pt-28">
      <h1 className="text-center text-3xl font-bold mb-5 text-neutral-200">
        Testimonials
      </h1>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="text-neutral-100"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center justify-center max-w-md mx-auto">
              <p className="italic text-lg md:text-xl text-center mb-5">
                "{testimonial.testimonial}"
              </p>
              <img
                src={testimonial.image}
                alt={`${testimonial.name}'s avatar`}
                className="w-28 h-28 object-cover rounded-full border-2 border-neutral-100"
              />
              <h3 className="font-semibold text-xl text-center text-neutral-800">
                {testimonial.name}
              </h3>
              <p className="text-center text-neutral-600">{testimonial.position}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
