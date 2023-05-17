import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useImages from "../../hooks/useImages";

const WhoWeAre = () => {
  const images = useImages();
  const googleIcon = images["google"];
  const nextdoorIcon = images["nextdoor"];
  const facebookIcon = images["facebook"];
  const houzzIcon = images["houzz"];
  return (
    <section className="bg-gradient-to-b from-neutral-900 via-neutral-800 to-slate-300 text-neutral-100 py-20 pt-36 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h5 style={{ color: "#B6B024" }}>
          GENERAL CONTRACTORS IN EVANSVILLE IN
        </h5>
        <h1 className="text-3xl md:text-4xl font-semibold mb-8">
          Martin Construction &amp; Coatings
        </h1>
        <p className="mb-6 text-xl leading-relaxed">
          Martin Construction &amp; Coatings is a leading general contractor in
          Evansville, Indiana, with a reputation for providing outstanding
          services to our clients. We are dedicated to delivering high-quality
          craftsmanship and exceptional customer service to ensure that every
          project meets and exceeds our clients provision.
        </p>
        <p className="mb-6 text-xl leading-relaxed">
          Our team of experienced professionals specializes in a wide range of
          services, including home remodeling, interior and exterior
          renovations, flooring installation, deck and patio construction, epoxy
          floors and countertops, and more. We take pride in our attention to
          detail, commitment to using top-quality materials, and our ability to
          complete projects on time and within budget.
        </p>
        <p className="mb-6 text-xl leading-relaxed">
          At Martin Construction &amp; Coatings, we understand the importance of
          trust and communication in building lasting relationships with our
          clients. We work closely with you throughout the entire process,
          keeping you informed and involved every step of the way. Our ultimate
          goal is to bring your vision to life while providing an unparalleled
          experience that exceeds your expectations.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center mt-10">
          <div>
            <div className="mt-3">
              <img
                src={googleIcon || "/Images/site/google-logo.png"}
                alt="Google Logo"
                className="h-8 w-auto mx-auto mb-2"
              />
            </div>
            <h3 className="text-gray-600 font-semibold">5 STARS ON GOOGLE</h3>
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
          </div>
          <div>
            <img
              src={nextdoorIcon || "/Images/site/nextdoor-logo.png"}
              alt="NextDoor Logo"
              className="h-10 w-auto mx-auto mb-2"
            />
            <h3 className="text-gray-600 font-semibold">5 STARS ON NEXTDOOR</h3>
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
          </div>
          <div>
            <img
              src={facebookIcon || "/Images/site/facebook-logo.png"}
              alt="Facebook Logo"
              className="h-8 w-auto mx-auto mb-2"
            />
            <h3 className="text-gray-600 font-semibold">5 STARS ON FACEBOOK</h3>
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
          </div>
          {/* Add more platforms as needed */}
          <div>
            <img
              src={houzzIcon || "/Images/site/houzz3-logo.png"}
              alt="Houzz Logo"
              className="h-8 w-auto mx-auto mb-2"
            />
            <h3 className="text-gray-600 font-semibold">5 STARS ON HOUZZ</h3>
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="w-5 h-5 text-neutral-300 inline"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
