import { NextSeo } from 'next-seo';
import AboutUs from '../components/OtherComponents/AboutUs';

const AboutUsPage = () => {
  return (
    <>
      <NextSeo
        title="About Us - Martin Construction &amp; Coatings"
        description="Learn more about Martin Construction &amp; Coatings, a family-owned business providing high-quality construction and coating services for over 20 years."
        openGraph={{
          title: 'About Us - Martin Construction &amp; Coatings',
          description: 'Learn more about Martin Construction &amp; Coatings, a family-owned business providing high-quality construction and coating services for over 20 years.',
          url: 'https://www.yourwebsite.com/about',
          type: 'website',
        }}
      />
      <main>
        <AboutUs />
      </main>
    </>
  );
};

export default AboutUsPage;
