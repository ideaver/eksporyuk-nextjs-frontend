import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
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
          <meta content="EksporYuk" name="EksporYuk" />
          <meta content="EksporYuk" property="og:title" />
          <meta content="EksporYuk" property="og:description" />
          <meta content="%PUBLIC_URL%/fb-og-image.png" property="og:image" />
          <meta property="og:site_name" content="EksporYuk" />
          <meta content="EksporYuk" property="twitter:title" />
          <meta content="EksporYuk" property="twitter:description" />
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
