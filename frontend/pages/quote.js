import React from "react";
import { NextSeo } from "next-seo";

import Quote from "../components/Quote/Quote";

export default function QuoteForm() {
  return (
    <>
      <NextSeo
        title="Free Custom Quote Generator - Construction Company"
        description="Use our free custom quote generator to estimate the cost of your project. Select from our range of services, and get a real-time cost estimate as you customize your choices."
        openGraph={{
          // url: 'https://www.yourwebsite.com/quote',
          title: 'Free Custom Quote Generator - Comstruction Company',
          description: 'Use our free custom quote generator to estimate the cost of your project. Select from our range of services, and get a real-time cost estimate as you customize your choices.',
          site_name: 'Construction Company',
        }}
      />
      <Quote />
    </>
  );
}
