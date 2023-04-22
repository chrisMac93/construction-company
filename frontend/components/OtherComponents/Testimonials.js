import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Pagination, Autoplay]);

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      position: "CEO",
      testimonial:
        "Martin Construction &amp; Coatings did an excellent job on our project. Their attention to detail and professional approach were impressive. We highly recommend them!",
      image: "/gallery/reviewPhotos/JohnDoe.jpg",
    },
    {
      name: "Jane Smith",
      position: "Homeowner",
      testimonial:
        "The team at Martin Construction &amp; Coatings transformed our home with a beautiful new paint job. They were prompt, professional, and a pleasure to work with.",
      image: "/gallery/reviewPhotos/JaneSmith.jpg",
    },
    {
      name: "Mike Johnson",
      position: "butthead",
      testimonial:
        "We've been working with Martin Construction &amp; Coatings for years, and they consistently deliver high-quality work. Their team is reliable and always goes the extra mile.",
      image: "/gallery/reviewPhotos/MichaelJohnson.jpg",
    },
    {
      name: "John Doe",
      position: "CEO",
      testimonial:
        "Martin Construction &amp; Coatings did an excellent job on our project. Their attention to detail and professional approach were impressive. We highly recommend them!",
      image: "/gallery/reviewPhotos/JohnDoe.jpg",
    },
    {
      name: "Jane Smith",
      position: "Homeowner",
      testimonial:
        "The team at Martin Construction &amp; Coatings transformed our home with a beautiful new paint job. They were prompt, professional, and a pleasure to work with.",
      image: "/gallery/reviewPhotos/JaneSmith.jpg",
    },
    {
      name: "Mike Johnson",
      position: "butthead",
      testimonial:
        "We've been working with Martin Construction &amp; Coatings for years, and they consistently deliver high-quality work. Their team is reliable and always goes the extra mile.",
      image: "/gallery/reviewPhotos/MichaelJohnson.jpg",
    },
    {
      name: "John Doe",
      position: "CEO",
      testimonial:
        "Martin Construction &amp; Coatings did an excellent job on our project. Their attention to detail and professional approach were impressive. We highly recommend them!",
      image: "/gallery/reviewPhotos/JohnDoe.jpg",
    },
    {
      name: "Jane Smith",
      position: "Homeowner",
      testimonial:
        "The team at Martin Construction &amp; Coatings transformed our home with a beautiful new paint job. They were prompt, professional, and a pleasure to work with.",
      image: "/gallery/reviewPhotos/JaneSmith.jpg",
    },
    {
      name: "Mike Johnson",
      position: "butthead",
      testimonial:
        "We've been working with Martin Construction &amp; Coatings for years, and they consistently deliver high-quality work. Their team is reliable and always goes the extra mile.",
      image: "/gallery/reviewPhotos/MichaelJohnson.jpg",
    },
    {
      name: "Mike Johnson",
      position: "butthead",
      testimonial:
        "We've been working with Martin Construction &amp; Coatings for years, and they consistently deliver high-quality work. Their team is reliable and always goes the extra mile.",
      image: "/gallery/reviewPhotos/MichaelJohnson.jpg",
    },
    {
      name: "Mike Johnson",
      position: "butthead",
      testimonial:
        "We've been working with Martin Construction &amp; Coatings for years, and they consistently deliver high-quality work. Their team is reliable and always goes the extra mile.",
      image: "/gallery/reviewPhotos/MichaelJohnson.jpg",
    },
    {
      name: "Mike Johnson",
      position: "butthead",
      testimonial:
        "We've been working with Martin Construction &amp; Coatings for years, and they consistently deliver high-quality work. Their team is reliable and always goes the extra mile.",
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
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="text-neutral-100"
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            centeredSlides: false,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center justify-center max-w-md mx-auto">
              <div className="flex flex-col md:flex-row items-center md:items-start overflow-hidden">
                <div className="flex-1 flex flex-col items-center m-6 md:mb-0">
                  <div className="md:w-24 md:h-24 w-28 h-28 border-2 rounded-full border-neutral-300 overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name}'s avatar`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="font-bold text-center md:text-neutral-600 mt-4">
                    {testimonial.name}
                  </h3>
                  <p className="text-center italic md:text-neutral-500 text-neutral-300">
                    {testimonial.position}
                  </p>
                </div>
                <div className="flex-0 px-4 md:m-4 md:px-1 text-lg font-semibold text-neutral-800 text-center md:text-neutral-100 md:text-start">
                  <p className="min-h-[3.5rem]">"{testimonial.testimonial}"</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
