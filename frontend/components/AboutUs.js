import { StarIcon } from "@heroicons/react/20/solid";

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-b from-neutral-900 via-neutral-800 to-slate-300 text-neutral-100 py-20 pt-36 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h5 style={{ color: "#B6B024"}}>GENERAL CONTRACTORS IN EVANSVILLE IN</h5>
        <h1 className="text-3xl md:text-4xl font-semibold mb-8">
          Martin Construction &amp; Coatings
        </h1>
        <p className="mb-6 text-xl leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper
          nulla nisi, non faucibus elit congue nec. Proin bibendum, orci ut
          euismod suscipit, est diam interdum ex, sit amet rhoncus neque magna
          interdum sem.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper
          nulla nisi, non faucibus elit congue nec. Proin bibendum, orci ut
          euismod suscipit, est diam interdum ex, sit amet rhoncus neque magna
          interdum sem.
        </p>
        <p className="mb-6 text-xl leading-relaxed">
          Pellentesque a lacus tellus. Fusce blandit porttitor ligula, id
          efficitur massa viverra sed. Suspendisse vel aliquam turpis.
          Pellentesque a lacus tellus. Fusce blandit porttitor ligula, id
          efficitur massa viverra sed. Suspendisse vel aliquam turpis.
        </p>
        <p className="mb-6 text-xl leading-relaxed">
          Duis et justo odio. Fusce nec mattis dui, ac faucibus tellus. Integer
          vel ullamcorper nisi. Aliquam consequat risus ante, a tincidunt ante
          porttitor eget.
          Duis et justo odio. Fusce nec mattis dui, ac faucibus tellus. Integer
          vel ullamcorper nisi. Aliquam consequat risus ante, a tincidunt ante
          porttitor eget.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center mt-10">
          <div>
            <img
              src="/icons/google-logo.png"
              alt="Google Logo"
              className="h-8 w-auto mx-auto mb-2"
            />
            <h3 className="text-gray-600 font-semibold">5 STARS ON GOOGLE</h3>
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
          </div>
          <div>
            <img
              src="/icons/yelp-logo.png"
              alt="Yelp Logo"
              className="h-8 w-auto mx-auto mb-2"
            />
            <h3 className="text-gray-600 font-semibold">5 STARS ON YELP</h3>
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
          </div>
          <div>
            <img
              src="/icons/facebook-logo.png"
              alt="Facebook Logo"
              className="h-8 w-auto mx-auto mb-2"
            />
            <h3 className="text-gray-600 font-semibold">5 STARS ON FACEBOOK</h3>
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
          </div>
          {/* Add more platforms as needed */}
          <div>
            <img
              src="/icons/houzz-logo.png"
              alt="Houzz Logo"
              className="h-8 w-auto mx-auto mb-2"
            />
            <h3 className="text-gray-600 font-semibold">5 STARS ON HOUZZ</h3>
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
            <StarIcon className="w-5 h-5 text-yellow-400 inline" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
