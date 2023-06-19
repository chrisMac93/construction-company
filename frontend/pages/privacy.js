import React from "react";

const Privacy = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 mx-auto">
      <h1 className="text-3xl md:text-4xl text-neutral-200 font-semibold mb-8 text-center mt-12">
        Privacy Policy
      </h1>
      <div className="text-neutral-100 space-y-6">
        <p>
          Your privacy is important to us. It is Construction Company policy to respect your privacy
          regarding any information we may collect from you across our
          website, and other sites we own and operate.
        </p>
        <p>
          We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we are collecting it and how it will be used.
        </p>
        {/* Add more paragraphs as necessary */}
        {/* ... */}
      </div>
    </div>
  );
};

export default Privacy;