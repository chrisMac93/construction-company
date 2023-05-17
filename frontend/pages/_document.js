import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Martin Construction &amp; Coatings offers a wide range of residential renovation services including interior/exterior remodel, kitchen and bathroom remodel/additions, deck/patio build or renovations, flooring, epoxy, coatings, concrete and more. We are located in Evansville, IN."
          />
          <meta
            name="keywords"
            content="Construction, Coatings, Renovation, Interior Remodel, Exterior Remodel, Kitchen Remodel, Bathroom Remodel, Deck, Patio, Flooring, Epoxy, Concrete, Evansville IN"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
