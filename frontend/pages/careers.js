// careers.js(Page):

import Careers from '../components/OtherComponents/Careers';
import { NextSeo } from 'next-seo';

const CareersPage = () => {
  return (
    <>
      <NextSeo
        title="Careers at Martin Construction & Coatings"
        description="Looking for a challenging and rewarding career in the construction industry? Check out our job listings and apply today."
        openGraph={{
          // url: 'https://www.yourwebsite.com/careers',
          title: 'Careers at  Martin Construction & Coatings',
          description: 'Looking for a challenging and rewarding career in the construction industry? Check out our job listings and apply today.',
          site_name: 'Martin Construction & Coatings',
        }}
      />
      <main>
        <Careers />
      </main>
    </>
  );
};

export default CareersPage;
