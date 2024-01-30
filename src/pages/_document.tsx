import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta content="YDDS Cash Plan" name="YDDS Cash Plan" />
          <meta content="YDDS Cash Plan" property="og:title" />
          <meta content="YDDS Cash Plan" property="og:description" />
          <meta content="%PUBLIC_URL%/fb-og-image.png" property="og:image" />
          {/* <meta
                          property="og:url"
                          content="https://ui8.net/pickolab-studio/products/finlab---finance-dashboard-ui"
                      /> */}
          <meta property="og:site_name" content="YDDS Cash Plan" />
          <meta content="YDDS Cash Plan" property="twitter:title" />
          <meta content="YDDS Cash Plan" property="twitter:description" />
          <meta
            content="%PUBLIC_URL%/twitter-card.png"
            property="twitter:image"
          />
          <meta property="og:type" content="Article" />
          <meta content="summary" name="twitter:card" />
          <meta name="twitter:site" content="@ui8" />
          <meta name="twitter:creator" content="@ui8" />
          <meta property="fb:admins" content="132951670226590" />

          <meta name="theme-color" content="#000000" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body className="app">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
